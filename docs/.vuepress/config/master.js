export const masterNavBar = {
  text: 'Five研究生',
  link: '/master/',
  children: [
    // { text: 'Daily', link: '/master/daily/' },
    {
      text: 'Block Chain Internship',
      children: [
        { text: 'blockchain', link: '/master/blockchain/' },
        { text: 'docker', link: '/master/docker/' },
        { text: 'golang', link: '/master/golang/' },
      ]
    },
    {
      text: 'Deep Learning',
      children: [
        { text: 'Ubuntu', link: '/master/ubuntu/' },
        { text: 'GNN', link: '/master/GNN/' },
        { text: 'Python', link: '/master/python/' },
      ]
    },
    {
      text: 'Java Engineering',
      children: [
        { text: 'Spring', link: '/master/spring/' },
        { text: 'JVM', link: '/master/jvm/' },
        { text: 'Redis', link: '/master/redis/' },
        { text: 'JUC', link: '/master/juc/' },
        { text: 'Netty', link: '/master/netty/' },
        { text: 'Security', link: '/master/security/' },
        { text: 'Service', link: '/master/service/' },
        { text: 'MyBatis', link: '/master/mybatis/' }
      ]
    },
  ],
}

export const masterSideBar = {
  '/master/daily/': [
    {
      text: 'Daily',
      children: [
        '/master/daily/README.md',
        '/master/daily/23_Nov.md',
        '/master/daily/23_Dec.md',
        '/master/daily/24_Jan.md'
      ],
    },
  ],
  '/master/blockchain/': [
    {
      text: 'BlockChain',
      children: [
        '/master/blockchain/README.md',
        '/master/blockchain/account.md',
        '/master/blockchain/block.md',
        '/master/blockchain/consensus.md',
        '/master/blockchain/contract.md',
        '/master/blockchain/crypto_base.md',
        '/master/blockchain/ethereum_base.md',
        '/master/blockchain/evm.md',
        '/master/blockchain/gas.md',
        '/master/blockchain/go_ethereum.md',
        '/master/blockchain/hd_wallet.md',
        '/master/blockchain/jsonrpc.md',
        '/master/blockchain/mpt.md',
        '/master/blockchain/node_client.md',
        '/master/blockchain/rlp.md',
        '/master/blockchain/statedb.md',
        '/master/blockchain/transaction.md',
        '/master/blockchain/leveldb.md',
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
        '/master/golang/gin.md',
        '/master/golang/gorm.md'
      ],
    },
  ],
  '/master/ubuntu/': [
    {
      text: 'Ubuntu',
      children: [
        '/master/ubuntu/README.md',
        '/master/ubuntu/system_usage.md',
        '/master/ubuntu/python_usage.md',
        '/master/ubuntu/java_usage.md',
      ],
    },
  ],
  '/master/GNN/': [
    {
      text: 'GNN',
      children: [
        '/master/GNN/README.md',
        '/master/GNN/base_concept.md',
        '/master/GNN/pytorch_usage.md',
        '/master/GNN/python_usage.md',
      ],
    },
  ],
  '/master/python/': [
    {
      text: 'Python',
      children: [
        '/master/python/README.md',
        '/master/python/base_usage.md',
      ],
    },
  ],
  '/master/spring/': [
    {
      text: 'Spring',
      children: [
        '/master/spring/README.md',
        '/master/spring/springboot.md',
        '/master/spring/spring_annotation.md',
        '/master/spring/springboot_base.md',
      ],
    },
  ],
  '/master/jvm/': [
    {
      text: 'JVM',
      children: [
        '/master/jvm/README.md',
        '/master/jvm/1.md',
        '/master/jvm/2.md',
        '/master/jvm/3.md',
        '/master/jvm/4.md',
      ],
    },
  ],
  '/master/redis/': [
    {
      text: 'Redis',
      children: [
        '/master/redis/README.md',
        '/master/redis/1.md',
        '/master/redis/2.md',
        '/master/redis/3.md',
        '/master/redis/4.md',
      ],
    },
  ],
  '/master/juc/': [
    {
      text: 'JUC',
      children: [
        '/master/juc/README.md',
        '/master/juc/1.md',
      ],
    },
  ],
  '/master/netty/': [
    {
      text: 'Netty',
      children: [
        '/master/netty/README.md',
        '/master/netty/1.md',
        '/master/netty/2.md',
      ],
    },
  ],
  '/master/security/': [
    {
      text: 'Security',
      children: [
        '/master/security/README.md',
        '/master/security/jwt.md',
        '/master/security/shiro.md',
      ],
    },
  ],
  '/master/service/': [
    {
      text: 'Service',
      children: [
        '/master/service/README.md',
        '/master/service/jwt.md',
        '/master/service/shiro.md',
      ],
    },
  ],
  '/master/mybatis/': [
    {
      text: 'MyBatis',
      children: [
        '/master/mybatis/README.md',
        '/master/mybatis/mybatis.md',
      ],
    },
  ],
}