export const BackgroundNavBar = {
  text: '后端池',
  children: [
    { text: 'JAVA', link: '/tech/java/' },
    { text: 'Node', link: '/tech/node/' },
  ],
}

export const BackgroundSideBar = {
  '/tech/node/': [
    {
      text: 'Node',
      children: ['/tech/node/README.md', '/tech/node/1.md', '/tech/node/2.md'],
    },
  ],
  '/tech/java/': [
    {
      text: 'JAVA',
      children: [
        '/tech/java/README.md',
        '/tech/java/Spring.md',
        '/tech/java/SpringMVC.md',
        '/tech/java/Mybatis.md',
        '/tech/java/SpringBoot.md',
        '/tech/java/5.md',
        '/tech/java/6.md',
        '/tech/java/7.md',
      ],
    },
  ],
}