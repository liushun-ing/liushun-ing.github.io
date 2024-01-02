export const masterNavBar = {
  text: 'Five研究生',
  link: '/master/',
  children: [
    { text: 'Daily', link: '/master/daily/' },
    { text: 'Ubuntu', link: '/master/ubuntu/' },
    { text: 'GNN', link: '/master/GNN/' },
    { text: 'Python', link: '/master/python/' },
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
}