export const BackendNavBar = {
  text: '后端池',
  children: [
    { text: 'JAVA', link: '/tech/backend/java/' },
    { text: 'Node', link: '/tech/backend/node/' },
  ],
}

export const BackendSideBar = {
  '/tech/backend/node/': [
    {
      text: 'Node',
      children: ['/tech/backend/node/README.md', '/tech/backend/node/1.md', '/tech/backend/node/2.md'],
    },
  ],
  '/tech/backend/java/': [
    {
      text: 'JAVA',
      children: [
        '/tech/backend/java/README.md',
        '/tech/backend/java/Spring.md',
        '/tech/backend/java/SpringMVC.md',
        '/tech/backend/java/Mybatis.md',
        '/tech/backend/java/SpringBoot.md',
        '/tech/backend/java/5.md',
        '/tech/backend/java/6.md',
        '/tech/backend/java/7.md',
      ],
    },
  ],
}