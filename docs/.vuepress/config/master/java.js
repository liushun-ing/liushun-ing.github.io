export const JavaNavBar = {
  text: 'Java Engineering',
  children: [
    { text: 'Redis', link: '/master/redis/' },
    { text: 'MySQL', link: '/master/mysql/' },
    { text: 'JVM', link: '/master/jvm/' },
    { text: 'MyBatis', link: '/master/mybatis/' },
  ]
}

export const JavaSideBar = {
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
  '/master/mysql/': [
    {
      text: 'MySQL',
      children: [
        '/master/mysql/README.md',
        '/master/mysql/base.md',
        '/master/mysql/progress_section_1.md',
        '/master/mysql/progress_section_2.md',
        '/master/mysql/progress_section_3.md',
        '/master/mysql/progress_section_4.md',
        '/master/mysql/progress_section_5.md',
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