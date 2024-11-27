export const JavaNavBar = {
  text: 'Java编程池',
  children: [
    { text: 'Redis', link: '/master/java/redis/' },
    { text: 'MySQL', link: '/master/java/mysql/' },
    { text: 'JVM', link: '/master/java/jvm/' },
    { text: 'MyBatis', link: '/master/java/mybatis/' },
  ]
}

export const JavaSideBar = {
  '/master/java/redis/': [
    {
      text: 'Redis',
      children: [
        '/master/java/redis/README.md',
        '/master/java/redis/1.md',
        '/master/java/redis/2.md',
        '/master/java/redis/3.md',
        '/master/java/redis/4.md',
      ],
    },
  ],
  '/master/java/mysql/': [
    {
      text: 'MySQL',
      children: [
        '/master/java/mysql/README.md',
        '/master/java/mysql/base.md',
        '/master/java/mysql/progress_section_1.md',
        '/master/java/mysql/progress_section_2.md',
        '/master/java/mysql/progress_section_3.md',
        '/master/java/mysql/progress_section_4.md',
        '/master/java/mysql/progress_section_5.md',
      ],
    },
  ],
  '/master/java/jvm/': [
    {
      text: 'JVM',
      children: [
        '/master/java/jvm/README.md',
        '/master/java/jvm/1.md',
        '/master/java/jvm/2.md',
        '/master/java/jvm/3.md',
        '/master/java/jvm/4.md',
      ],
    },
  ],
  '/master/java/mybatis/': [
    {
      text: 'MyBatis',
      children: [
        '/master/java/mybatis/README.md',
        '/master/java/mybatis/mybatis.md',
      ],
    },
  ],
}