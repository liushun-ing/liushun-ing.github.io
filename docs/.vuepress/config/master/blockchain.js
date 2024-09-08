export const BlockChainNavBar = {
  text: 'Block Chain Internship',
  children: [
    { text: 'ethereum', link: '/master/ethereum/' },
    { text: 'block chain developement', link: '/master/blockchaindevelopment/' },
    { text: 'docker', link: '/master/docker/' },
    { text: 'golang', link: '/master/golang/' },
    { text: 'prometheus', link: '/master/prometheus/' },
  ]
}

export const BlockChainSideBar = {
  '/master/blockchaindevelopment/': [
    {
      text: 'Development',
      children: [
        '/master/blockchaindevelopment/README.md',
        '/master/blockchaindevelopment/statedb_execute.md',
        '/master/blockchaindevelopment/gas_fee.md',
      ]
    }
  ],
  '/master/ethereum/': [
    {
      text: 'Block Chain Ethereum',
      children: [
        '/master/ethereum/README.md',
        '/master/ethereum/ethereum_base.md',
        '/master/ethereum/account.md',
        '/master/ethereum/block.md',
        '/master/ethereum/node_client.md',
        '/master/ethereum/contract.md',
        '/master/ethereum/transaction.md',
        '/master/ethereum/gas.md',
        '/master/ethereum/crypto_base.md',
        '/master/ethereum/consensus.md',
        '/master/ethereum/evm.md',
        '/master/ethereum/hd_wallet.md',
        '/master/ethereum/jsonrpc.md',
        '/master/ethereum/mpt.md',
        '/master/ethereum/rlp.md',
        '/master/ethereum/statedb.md',
        '/master/ethereum/leveldb.md',
        '/master/ethereum/mev.md',
        '/master/ethereum/go_ethereum.md',
      ],
    },
  ],
  '/master/docker/': [
    {
      text: 'Docker',
      children: [
        '/master/docker/README.md',
        '/master/docker/intro.md',
        '/master/docker/image_construct.md',
        '/master/docker/compose.md'
      ],
    },
  ],
  '/master/golang/': [
    {
      text: 'Golang',
      children: [
        '/master/golang/README.md',
        '/master/golang/goweb.md',
        '/master/golang/protobuf.md',
        '/master/golang/rpc.md',
        '/master/golang/websocket.md',
        '/master/golang/sse.md',
        '/master/golang/gin.md',
        '/master/golang/distributed.md',
        '/master/golang/gorm_1.md',
        '/master/golang/gorm_2.md',
        '/master/golang/test.md',
      ],
    },
  ],
  '/master/prometheus/': [
    {
      text: 'Prometheus',
      children: [
        '/master/prometheus/README.md',
        '/master/prometheus/intro.md',
        '/master/prometheus/promql.md',
        '/master/prometheus/alert.md',
        '/master/prometheus/exporter.md',
        '/master/prometheus/clustering.md',
        '/master/prometheus/servicediscovery.md',
      ],
    },
  ],
}