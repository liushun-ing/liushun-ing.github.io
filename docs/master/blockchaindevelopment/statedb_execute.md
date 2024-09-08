# StateDB

**`core.state.statedb.go`**



## 交易执行的StateDB

这里主要是因为项目开发过程中需要拿到一条合约交易的内部交易的细节，也就是这些内部交易的转账情况。浏览器上提供了查看内部交易的选项，但是目前的 geth 却没有现成接口可以获取这部分数据，debug.traceTransaction返回的是交易执行过程中的堆栈信息，并不能直观的获取到内部交易的细节，因此需要分析交易执行过程中 stateDB 的执行逻辑，以及该交易执行的结果是如何保存的。

==先知==

```go
type StateDB struct {
	db             Database
	prefetcherLock sync.Mutex
	prefetcher     *triePrefetcher
	trie           Trie
	noTrie         bool
	hasher         crypto.KeccakState
	snaps          *snapshot.Tree    // Nil if snapshot is not available
	snap           snapshot.Snapshot // Nil if snapshot is not available

	// originalRoot is the pre-state root, before any changes were made.
	// It will be updated when the Commit is called.
	originalRoot common.Hash
	expectedRoot common.Hash // The state root in the block header
	stateRoot    common.Hash // The calculation result of IntermediateRoot

	// These maps hold the state changes (including the corresponding
	// original value) that occurred in this **block**.
  // 第一部分
	AccountMux     sync.Mutex                                // Mutex for accounts access
	StorageMux     sync.Mutex                                // Mutex for storages access
	accounts       map[common.Hash][]byte                    // The mutated accounts in 'slim RLP' encoding
	storages       map[common.Hash]map[common.Hash][]byte    // The mutated slots in prefix-zero trimmed rlp format
	accountsOrigin map[common.Address][]byte                 // The original value of mutated accounts in 'slim RLP' encoding
	storagesOrigin map[common.Address]map[common.Hash][]byte // The original value of mutated slots in prefix-zero trimmed rlp format

	// This map holds 'live' objects, which will get modified while processing
	// a state transition.
  // 第二部分
	stateObjects         map[common.Address]*stateObject
	stateObjectsPending  map[common.Address]struct{}            // State objects finalized but not yet written to the trie
	stateObjectsDirty    map[common.Address]struct{}            // State objects modified in the current execution
	stateObjectsDestruct map[common.Address]*types.StateAccount // State objects destructed in the block along with its previous value

	// The refund counter, also used by state transitioning.
	refund uint64 // gas 返利的统计，这个在之前提到过，释放内存是奖励 gas。

	// The tx context and all occurred logs in the scope of transaction.
  // 第三部分
	thash   common.Hash
	txIndex int
	logs    map[common.Hash][]*types.Log
	logSize uint

	// Journal of state modifications. This is the backbone of
	// Snapshot and RevertToSnapshot.
  // 第四部分
	journal        *journal
	validRevisions []revision
	nextRevisionId int
}
```

StateDB对象比较重要的属性如上。主要可以分为四部分

第一部分：账户和合约存储的相关数据，这些数据是编码之后字节数据，并且可以看到 accounts 和 storages 的类型是 common.Hash，而 common.Hash一般用于 trie 层的数据表示，是树中节点的 key 和 value 的存储了，我们一般用不到，他其实是用作缓存使用。

第二部分：stateObjects 开头的数据，这部分是保存了当前 StateDB 相关联的stateObjects 的数据，这部分和我们常使用的数据是相关的。

第三部分：是在执行交易时，记录的当前交易的序号，日志等等

第四部分：记录的是执行某个交易是记录的变化，以及生成的快照的序号和版本等信息，他只是 id，真正的快照是 snap 相关字段存储的。

总结：stateDB 管理了当前区块状态相关的 stateObjects 的数据，以及交易执行的各种信息。

重要的是：stateDB 提供了诸如GetRoot, GetCodeSize, GetCodeHash, AddBalance, SetBalance, SetNonce等等方法，这些方法回去修改某个common.Address对象的账户的信息，这也说明了，交易执行过程中对某个账户信息的更新都是通过 StateDB 暴露的这些方法实现的。



==接下来，我们先来看 StateDB 与区块构建之间的配合。这里很重要==

1. 我们知道，Worker 通过 commitWork 函数提交从 builder 提供的Bid中竞价胜出的区块，在这个函数内部，有如下语句`bestBid := w.bidFetcher.GetBestBid(bestWork.header.ParentHash)`，这就是获取价值最高的Bid，然后构造成 bestWork 后（这个 bestWork 其实已经执行完所有用户交易了），使用`w.commit(bestWork, w.fullTaskHook, true, start)`提交。
2. 最终，在完成区块收益分配后，提交 task：`case w.taskCh <- &task{receipts: receipts, state: env.state, block: block, createdAt: time.Now()}`，也就是构建 task，然后添加到 taskCh 管道中。
3. 然后 worker 的 taskLoop 函数中，会从该通道取出 task，然后调用`w.engine.Seal(w.chain, task.block, w.resultCh, stopCh)`，Engine 尝试在该方法中使用本地签名凭证创建密封块。完成密封后，`case results <- block.WithSeal(header):`加入到 worker 的 `resultCh` 中。
4. 然后再 worker 的 resultLoop 函数中，会取出该通道的 result，进行各种处理，并最终`status, err := w.chain.WriteBlockAndSetHead(block, receipts, logs, task.state, true)`将该区块写入区块链，最终发布新区块生成事件`w.mux.Post(core.NewMinedBlockEvent{Block: block})`。
5. 然后继续深入，会调用`(bc *BlockChain) writeBlockWithState`函数，这个函数里面，就是调用 rawdb写数据库，然后也会调用`triedb.commit`函数提交 triedb 的改动，也会调用 `_, diffLayer, err := state.Commit(block.NumberU64(), bc.tryRewindBadBlocks, tryCommitTrieDB)` 函数提交 StateDB 的改动，最后会有`go bc.cacheDiffLayer(diffLayer, diffLayerCh)`将 diffLayer 缓存（他这里的缓存机制，以后在了解吧）。



==接下来就是 StateDB.Commit函数了==，这个函数里面内容有点多，先只能大致了解一下。

主要分为三部分：commitTrie，commitFunc，reset

- commitTrie：一是调用`StateIntermediateRoot`函数，遍历`stateObjectsPending`，提交到 Trie 中，然后得到新的状态树的 stateRoot；而是调用`handleDestruction`函数，遍历`stateObjectsDestruct`，删除需要销毁的账户；三是遍历`stateObjectsDirty`，依次调用 `stateObject.commit` 提交所有的账户修改。
- commitFunc：一是遍历`stateObjectsDirty`中的所有`dirtyCode`，提交所有改动的合约代码，而是调用`diffLayer.Destructs, diffLayer.Accounts, diffLayer.Storages = s.SnapToDiffLayer()`将所有`accounts和storages`的账户写到 diffLayer 中供 blockchain 做缓存。然后调用`s.snaps.Cap(s.expectedRoot, s.snaps.CapLimit())`，Keep n diff layers in the memory。这个 n 一般是 128。也就是快照只保存 128 个区块的。
- reset：会清空 StateDB 中保存的所有状态数据，为下一个区块的生产做准备。



==现在知道了 StateDB 提交区块的基本逻辑了，也知道所有修改的数据基本都保存在 StateObject开头的属性中，现在的问题就是这些数据怎么来的？所以接下来，就是分析交易的执行过程了，这些数据肯定是交易执行过程中不断更新的。== 

一条交易的提交都是调用`core.ApplyMessage`完成的，该方法调用`NewStateTransition(evm, msg, gp).TransitionDb()`（需要注意的是 evm 中就有 stateDB 对象）。

`TransitionDb`函数，我在另一篇已经分析过，我们直接进入到他是怎么修改交易影响的账户的信息的，交易转账是调用该函数完成的`evm.Context.Transfer(evm.StateDB, caller.Address(), addr, value)`。

```go
// Transfer subtracts amount from sender and adds amount to recipient using the given Db
func Transfer(db vm.StateDB, sender, recipient common.Address, amount *uint256.Int) {
	db.SubBalance(sender, amount)
	db.AddBalance(recipient, amount)
}
```

可以看到，该函数是调用的 vm.StateDB完成的，而vm.StateDB只有一个实现类，就是`core.state.StateDB`也就是，我们一直在分析的 StateDB。所以最终对账户状态的修改，都是调用StateDB 提供的函数。下面，我们以 AddBalance 为例，继续往下看。

```go
// AddBalance adds amount to the account associated with addr.
func (s *StateDB) AddBalance(addr common.Address, amount *uint256.Int) {
	stateObject := s.getOrNewStateObject(addr) 
  // 最终是if obj := s.stateObjects[addr]; obj != nil {return obj }
	if stateObject != nil {
		stateObject.AddBalance(amount)
	}
}

// AddBalance adds amount to s's balance.
// It is used to add funds to the destination account of a transfer.
func (s *stateObject) AddBalance(amount *uint256.Int) {
	// EIP161: We must check emptiness for the objects such that the account
	// clearing (0,0,0 objects) can take effect.
	if amount.IsZero() {
		if s.empty() {
			s.touch()
		}
		return
	}
	s.SetBalance(new(uint256.Int).Add(s.Balance(), amount))
}

func (s *stateObject) SetBalance(amount *uint256.Int) {
	s.db.journal.append(balanceChange{
		account: &s.address,
		prev:    new(uint256.Int).Set(s.data.Balance),
	})
	s.setBalance(amount)
}

func (s *stateObject) setBalance(amount *uint256.Int) {
	s.data.Balance = amount
}
```

到这里就清楚的知道了，对账户的修改，是从`stateObjects`中拿到账户，如果没有就创建一个，然后修改他的状态，并往 journal 中添加一条 balanceChange 修改记录。

```go
// journal contains the list of state modifications applied since the last state
// commit. These are tracked to be able to be reverted in the case of an execution
// exception or request for reversal.
type journal struct {
	entries []journalEntry         // Current changes tracked by the journal
	dirties map[common.Address]int // Dirty accounts and the number of changes
}
```

可以看到 journal 就是记录了交易执行过程中的所有状态的修改信息。然后他提供了 revert 函数，可以支持回滚。

==journal==

那journal 中的信息又是怎么到 stateObjectsDirty 中的呢。我们去到打包区块时，提交所有交易时，看他是怎么执行的。也就是`(w *worker) commitTransactions`函数，它里面是依次使用 `core.ApplyTransaction` 函数提交每一条交易。

```go
// Apply the transaction to the current state (included in the env).
result, err := ApplyMessage(evm, msg, gp)
if err != nil {
  return nil, err
}

// Update the state with pending changes.
var root []byte
if config.IsByzantium(blockNumber) {
  statedb.Finalise(true)
} else {
  root = statedb.IntermediateRoot(config.IsEIP158(blockNumber)).Bytes()
}
```

最终使用 ApplyMessage执行交易后，调用了 `statedb.Finalise` 函数，`IntermediateRoot`函数中调用了`statedb.Finalise`函数。我们就可以看到，在 Finalise 函数中，他遍历了 journal.dirties，将当前交易的改动全部提交到了`stateObjectsPending`和`stateObjectsDirty`中，然后调用`s.clearJournalAndRefund()`将当前的 journal 清空。

到这里就全明白了。=_=



> 总结：打包区块时，是从上一个区块的状态开始，依次执行每一条交易，每条交易的执行信息都会记录在journal 中，在交易执行完后，提交到 stateObjectsDirty 中，然后再所有交易执行完后，打包区块时，一次性进行提交。
>
> ==由此我们也可以知道，区块链中只保存某个区块的状态信息，是不会保存每条交易执行的临时信息，他的状态数据是以块为单位的。所以我们要拿到一条交易的执行信息是，只能从上一个块的状态开始，依次执行该块中在他之前的所有交易才能拿到。==



## debug.traceTransaction

其实上面的总结就概括了该 API 的原理。

```go
// TraceTransaction returns the structured logs created during the execution of EVM
// and returns them as a JSON object.
func (api *API) TraceTransaction(ctx context.Context, hash common.Hash, config *TraceConfig) (interface{}, error) {
	found, tx, blockHash, blockNumber, index, err := api.backend.GetTransaction(ctx, hash)
  // ...
	block, err := api.blockByNumberAndHash(ctx, rpc.BlockNumber(blockNumber), blockHash)
  // ...
	msg, vmctx, statedb, release, err := api.backend.StateAtTransaction(ctx, block, int(index), reexec)
	if err != nil {
		return nil, err
	}
  // ...
	txctx := &Context{
		BlockHash:   blockHash,
		BlockNumber: block.Number(),
		TxIndex:     int(index),
		TxHash:      hash,
	}
	return api.traceTx(ctx, msg, txctx, vmctx, statedb, config, isSystemTx)
}

// traceTx configures a new tracer according to the provided configuration, and
// executes the given message in the provided environment. The return value will
// be tracer dependent.
func (api *API) traceTx(ctx context.Context, message *core.Message, txctx *Context, vmctx vm.BlockContext, statedb *state.StateDB, config *TraceConfig, isSystemTx bool) (interface{}, error) {
	// Default tracer is the struct logger
	tracer = logger.NewStructLogger(config.Config)
  // ...
	vmenv := vm.NewEVM(vmctx, txContext, statedb, api.backend.ChainConfig(), vm.Config{Tracer: tracer, NoBaseFee: true})
	// Call Prepare to clear out the statedb access list
	statedb.SetTxContext(txctx.TxHash, txctx.TxIndex)
	if _, err = core.ApplyMessage(vmenv, message, new(core.GasPool).AddGas(message.GasLimit)); err != nil {
		return nil, fmt.Errorf("tracing failed: %w", err)
	}
	tracer.CaptureSystemTxEnd(intrinsicGas)
	return tracer.GetResult()
}
```

执行一个交易要先拿到 StateDB，` api.backend.StateAtTransaction(ctx, block, int(index), reexec)`，然后再调用 `core.ApplyMessage`。

```go
// stateAtTransaction returns the execution environment of a certain transaction.
func (eth *Ethereum) stateAtTransaction(ctx context.Context, block *types.Block, txIndex int, reexec uint64) (*core.Message, vm.BlockContext, *state.StateDB, tracers.StateReleaseFunc, error) {
	// Create the parent state database
	parent := eth.blockchain.GetBlock(block.ParentHash(), block.NumberU64()-1)
	if parent == nil {
		return nil, vm.BlockContext{}, nil, nil, fmt.Errorf("parent %#x not found", block.ParentHash())
	}
	// Lookup the statedb of parent block from the live database,
	// otherwise regenerate it on the flight.
	statedb, release, err := eth.stateAtBlock(ctx, parent, reexec, nil, true, false)
	if err != nil {
		return nil, vm.BlockContext{}, nil, nil, err
	}
	
	for idx, tx := range block.Transactions() {
    // ...
		// Assemble the transaction call message and return if the requested offset
		msg, _ := core.TransactionToMessage(tx, signer, block.BaseFee())
		txContext := core.NewEVMTxContext(msg)
		context := core.NewEVMBlockContext(block.Header(), eth.blockchain, nil)
		if idx == txIndex {
			return msg, context, statedb, release, nil
		}
		// Not yet the searched for transaction, execute on top of the current state
		vmenv := vm.NewEVM(context, txContext, statedb, eth.blockchain.Config(), vm.Config{})
		statedb.SetTxContext(tx.Hash(), idx)
		if _, err := core.ApplyMessage(vmenv, msg, new(core.GasPool).AddGas(tx.Gas())); err != nil {
			return nil, vm.BlockContext{}, nil, nil, fmt.Errorf("transaction %#x failed: %v", tx.Hash(), err)
		}
		// Ensure any modifications are committed to the state
		// Only delete empty objects if EIP158/161 (a.k.a Spurious Dragon) is in effect
		statedb.Finalise(vmenv.ChainConfig().IsEIP158(block.Number()))
	}
	return nil, vm.BlockContext{}, nil, nil, fmt.Errorf("transaction index %d out of range for block %#x", txIndex, block.Hash())
}
```

可以看到，他就是拿到上一个区块的状态，然后依次执行完该条交易之前的所有交易，才能拿到该交易执行前的 StateDB 状态。



**所以，我们如果要拿到一条合约交易的内部交易的信息时，我们在调用 core.ApplyMessage之后，不能使用 Finalise 方法提交，直接去拿 journal 中的数据即可。**

```go
if _, err = core.ApplyMessage(vmenv, message, new(core.GasPool).AddGas(message.GasLimit)); err != nil {
  return nil, fmt.Errorf("tracing failed: %w", err)
}
accounts := statedb.GetRpcAccountChange()
result := struct {
  BalanceChanges map[common.Address]*state.RpcChangedAccount
}{
  BalanceChanges: accounts,
}
//resultJson := json.Marshal(result)
return &txTraceResult{
  TxHash: txctx.TxHash,
  Result: result,
  Error:  "",
}, nil
```

因为 journal 不是public的，所以需要自己在 stateDB 中写一个暴露函数。

```go
func (s *StateDB) GetRpcAccountChange() map[common.Address]*RpcChangedAccount {
	var accounts = make(map[common.Address]*RpcChangedAccount)
	for addr := range s.journal.dirties {
		obj, exist := s.stateObjects[addr]
		if !exist {
			continue
		}
		rca := &RpcChangedAccount{}
		if obj.origin != nil {
			rca.BeforeNonce = obj.origin.Nonce
			rca.BeforeBalance = obj.origin.Balance
		}
		rca.AfterNonce = obj.data.Nonce
		rca.AfterBalance = obj.data.Balance
		accounts[addr] = rca
	}
	return accounts
}
```

这样，拿到内部交易的信息的目的就达到了。我们可以清楚的知道一条合约交易内部影响的各个账号的余额变化情况。

下面是一个例子

```shell
> debug.traceTransaction("0x55074ba3b2f162a515eec3c8ea31bba4b7be80aeae3e1b052f1c3a46910f676a")
{
  result: {
    BalanceChanges: {
      0x1bc0631e1d71ff2571a559374ad98f9f3860a271: {
        AfterBalance: "1935374000000106",
        AfterNonce: 4,
        BeforeBalance: "1895374000000106",
        BeforeNonce: 4
      },
      0x2ee393c739036a7660ec11bf2101d537eb52f3ac: {
        AfterBalance: "17582841999999972",
        AfterNonce: 79,
        BeforeBalance: "18066852999999972",
        BeforeNonce: 78
      },
      0x9abae1b279a4be25aeae49a33e807cdd3ccffa0c: {
        AfterBalance: "1469977999999213",
        AfterNonce: 26,
        BeforeBalance: "1145977999999213",
        BeforeNonce: 26
      },
      0xbd268b9e9836aa1ae0806c6a89019aead5b825bc: {
        AfterBalance: "0",
        AfterNonce: 1,
        BeforeBalance: "0",
        BeforeNonce: 1
      },
      0xfffffffffffffffffffffffffffffffffffffffe: {
        AfterBalance: "120011000000000",
        AfterNonce: 0,
        BeforeBalance: null,
        BeforeNonce: 0
      }
    }
  },
  txHash: "0x55074ba3b2f162a515eec3c8ea31bba4b7be80aeae3e1b052f1c3a46910f676a"
}

```

