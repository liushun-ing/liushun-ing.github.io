export const JavaSectionNavBar = {
  text: 'Java Section',
  children: [
    { text: 'Spring', link: '/trivia/spring/' },
    { text: 'JUC', link: '/trivia/juc/' },
    { text: 'Netty', link: '/trivia/netty/' },
    { text: 'Security', link: '/trivia/security/' },
    { text: 'Service', link: '/trivia/service/' },
  ]
}

export const JavaSectionSideBar = {
  '/trivia/spring/': [
    {
      text: 'Spring',
      children: [
        '/trivia/spring/README.md',
        '/trivia/spring/springboot.md',
        '/trivia/spring/spring_annotation.md',
        '/trivia/spring/springboot_base.md',
      ],
    },
  ],
  '/trivia/juc/': [
    {
      text: 'JUC',
      children: [
        '/trivia/juc/README.md',
        '/trivia/juc/1.md',
      ],
    },
  ],
  '/trivia/netty/': [
    {
      text: 'Netty',
      children: [
        '/trivia/netty/README.md',
        '/trivia/netty/1.md',
        '/trivia/netty/2.md',
      ],
    },
  ],
  '/trivia/security/': [
    {
      text: 'Security',
      children: [
        '/trivia/security/README.md',
        '/trivia/security/jwt.md',
        '/trivia/security/shiro.md',
      ],
    },
  ],
  '/trivia/service/': [
    {
      text: 'Service',
      children: [
        '/trivia/service/README.md',
        '/trivia/service/jwt.md',
        '/trivia/service/shiro.md',
      ],
    },
  ],
}