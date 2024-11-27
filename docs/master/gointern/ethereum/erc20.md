# ERC-20代币

## 什么叫做代币？

代币可以在以太坊中表示任何东西：

- 在线平台中的信誉积分
- 游戏中一个角色的技能
- 彩票卷
- 金融资产类似于公司股份的资产
- 像美元一样的法定货币
- 一盎司黄金
- 及更多...

以太坊的这种强大特点必须以强有力的标准来处理， ERC-20 标准允许开发者构建可与其他产品和服务互相操作的代币应用程序。



## 什么是 ERC-20？

ERC-20 提出了一个同质化代币的标准，换句话说，它们具有一种属性，使得每个代币都与另一个代币（在类型和价值上）完全相同。 

[ERC-20](https://ethereum.org/zh/developers/docs/standards/tokens/erc-20/)是以太坊上最重要的[智能合约标准](https://ethereum.org/zh/developers/docs/standards/)之一。它已经成为以太坊区块链上用于可替换代币实现的所有智能合约的技术标准。

ERC-20定义了所有可替换的以太坊代币都应该遵守的通用规则列表。 因此，该代币标准使所有类型的开发者能够准确预测新代币在更大的以太坊系统中将如何工作。 这简化了开发者的任务，只要代币遵循规则，每次发布新的代币时就不需要重做每个新项目。

像 ERC-20 这样的标准，其目的是允许符合标准的多种代币，都可以在应用程序之间进行互操作，例如钱包和分布式交易所。 为实现这个目的，要创建一个 [接口](https://www.geeksforgeeks.org/solidity-basics-of-interface/)。 任何需要使用代币合约的代码 可以在接口中使用相同的定义，并且与使用它的所有代币合约兼容。无论是像 MetaMask 这样的钱包、 诸如 etherscan.io 之类的去中心化应用程序，或一种不同的合约，例如流动资金池。

这里以接口的形式介绍了ERC-20必须实现的函数。

```solidity
pragma solidity ^0.6.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```



## 接口定义

### 取值器

```solidity
function totalSupply() external view returns (uint256);
```

返回存在的代币数量。 此函数是一个取值器，不会修改合约的状态。 请记住，Solidity中没有浮点数。 因此，大多数代币都会采用18位小数，并且会返回总供应量和其他结果，如下所示：1个代币100000000000000000。 你需要在处理代币时格外注意，并不是每个代币都有18位小数。

```solidity
function balanceOf(address account) external view returns (uint256);
```

返回地址拥有的代币数量(`account`)。 此函数是一个取值器，不会修改合约的状态。

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

ERC-20标准使一个地址能够允许另一个地址从中检索代币。 此取值器返回允许`spender`代表`owner`花费的剩余代币数量。 此函数是一个取值器，不会修改合约的状态，并且默认应返回0。

一般也还会有其他三个函数，分别用来获取代币名字，标志，位数。

```solidity
// Returns the name of the token.
function name() public view returns (string)
// Returns the symbol of the token, usually a shorter version of the name.
function symbol() public view returns (string)
// Returns the number of decimals used to get its user representation.
// For example, if `decimals` equals `2`, a balance of `505` tokens should
// be displayed to a user as `5.05` (`505 / 10 ** 2`).
// Tokens usually opt for a value of 18, imitating the relationship between
// Ether and Wei. This is the default value returned by this function, unless
// it's overridden.
function decimals() public view returns (uint8)
```



### 函数

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

将`amount`的代币从函数调用者地址(`msg.sender`) 移动到`recipient`接收者地址。 此函数发出Transfer`事件。 如果可进行转账，它将返回true。(这个相当于是发币)

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

设置允许`spender`从函数调用方(`msg.sender`)余额转账的`allowance`的数额。 此函数发出Approval事件。 此函数返回是否成功设置了余量。

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

使用余量机制将代币的`amount`从`sender`移动到`recipient`。 然后从调用者的余量中扣除该数额。 此函数发出`Transfer`事件。（这相当于转账）



### 事件

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

将代币（值）的数量从`from`地址发送到`to`地址时会发出此事件。

在铸造新代币时，转账通常会在 `from` 0x00..0000 地址进行，而在销毁代币时，转账会在 `to` 0x00..0000 地址进行。

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

当`owner`批准要由`spender`使用的代币数量(`value`)时，将发出此事件。





## 简单的实现

这里是一个[高质量的实现 OpenZepelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/README.adoc)

在这个简单实现中，并没有给出提供修改代币供应量的函数，所以，这种代币的总供应量就是确定的。

```solidity
pragma solidity ^0.8.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

// 实现接口
contract ERC20Basic is IERC20 {

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 10 ether;

	// 设置总量，也就是设置合约的创建者的代币数
   constructor() {
    balances[msg.sender] = totalSupply_;
   }

   function totalSupply() public override view returns (uint256) {
    return totalSupply_;
   }

    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }
    // 从合约调用者的代币中转移代币到指定账户
    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-numTokens;
        balances[receiver] = balances[receiver]+numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }
    // 这里应该是可以定义别人可以帮忙转账，但是会有一个 allowed 来规定他能替别人转的代币数的上限
    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner]-numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}
```



### 销毁和发布法币

在上面简单实现中，并没有给出提供修改代币供应量的函数，所以，这种代币的总供应量就是确定的。

在 `OpenZepelin` 中就有这种机制，他提供了_mint 和 _burn 函数来发布代币和销毁代币，发布和销毁都是针对 0 地址进行

这两个函数（`_mint` 和 `_burn`）修改代币的总供应量。 它们都是内部函数，在原有合约中没有任何调用它们的函数。 因此，仅通过继承合约并添加你自己的逻辑， 来决定在什么条件下可以铸造新代币或消耗现有代币时， 它们才是有用的。

**注意：**每一个 ERC-20 代币都通过自己的业务逻辑来决定代币管理。 例如，一个固定供应总量的合约可能只在构造函数中调用 `_mint`，而从不调用 `_burn`。 一个销售代币的合约 将在支付时调用 `_mint`，并大概在某个时间点调用 `_burn`， 以避免过快的通货膨胀。

```solidity
/** @dev Creates `amount` tokens and assigns them to `account`, increasing
 * the total supply.
 *
 * Emits a {Transfer} event with `from` set to the zero address.
 *
 * Requirements:
 *
 * - `to` cannot be the zero address.
 */
function _mint(address account, uint256 amount) internal virtual {
    require(account != address(0), "ERC20: mint to the zero address");
    _beforeTokenTransfer(address(0), account, amount); // 钩子函数，其实就是普通函数，他的作用类似钩子函数而已
    _totalSupply = _totalSupply.add(amount);
    _balances[account] = _balances[account].add(amount);
    emit Transfer(address(0), account, amount);
}
```

当代币总数发生变化时，请务必更新 `_totalSupply`。

```solidity
/**
 * @dev Destroys `amount` tokens from `account`, reducing the
 * total supply.
 *
 * Emits a {Transfer} event with `to` set to the zero address.
 *
 * Requirements:
 *
 * - `account` cannot be the zero address.
 * - `account` must have at least `amount` tokens.
 */
function _burn(address account, uint256 amount) internal virtual {
    require(account != address(0), "ERC20: burn from the zero address");

    _beforeTokenTransfer(account, address(0), amount);

    _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
    _totalSupply = _totalSupply.sub(amount);
    emit Transfer(account, address(0), amount);
}
```

`_burn` 函数与 `_mint` 函数几乎完全相同，但它们的方向相反。





## 与 ERC20 通证交互

> 实际就是怎么买卖代币，通证就是代币，这就是 DiFi 的一种。

对于此智能合约，将创建一个真正虚拟的去中心化交易，使用上面编写的代码作为基础。  DEX 将在它的构造函数中实例化一个合约中的实例，并进行以下操作：

- 将通证换成 ETH
- 把 ETH 换成通证

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        // TODO
    }

    function sell(uint256 amount) public {
        // TODO
    }

}
```

新的 DEX 智能合约将部署 ERC-20 并生成总量供应。

在 DEX 中，需要有一个 ERC20 的实例，通过这个实例，来操作代币，并通过 buy 和 sell 两个函数来进行以太币和代币之间的转换。

- `buy`：用户可以发送 ETH 并在交易所中获得通证
- `sell`：用户可以决定发送通证换回 ETH



### BUY 函数

首先需要检查消息中包含的 ETH 数量，并验证合约中是否拥有足够的通证，以及消息中是否有一些 ETH。 如果合约拥有足够的通证，它将会向用户发送通证数量，并发出`Bought`事件。

请注意，如果在出错的情况下调用所需的函数，则发送的 ETH 将会直接还原并退回给用户。

为简单起见，只需将 1 个代币换成 1 个 Wei。

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "You need to send some ether");
    require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

在购买成功的情况下，应会在交易中看到两个事件：通证`Transfer`和`Bought`事件。



### SELL 函数

负责卖出的函数中。 用户需要调用由去中心化交易所 (DEX) 实例化的 ERC20Basic 代币判断用户是否具有足够的批准代币金额。 接着，可以调用 DEX 的 `sell` 函数并将代币换成以太币。 当调用 sell 函数时，会检查从调用者地址到合约地址的转账是否成功，然后将以太币发送回调用者地址。

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "You need to sell at least some tokens");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Check the token allowance");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount); // 以太币转账
    emit Sold(amount);
}
```

如果一切正常，在交易中可以看到两个事件（`Transfer` 和 `Sold`），并且代币余额和以太坊余额已更新。