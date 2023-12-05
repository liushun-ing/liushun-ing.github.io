export const techNavBar = {
  text: 'Five技术',
  link: '/tech/',
  children: [
    {
      text: 'foreground',
      children: [
        { text: 'JavaScript', link: '/tech/js/' },
        { text: 'TypeScript', link: '/tech/typescript/' },
        { text: 'HTML_CSS', link: '/tech/html_css/' },
        { text: 'Less_Sass', link: '/tech/less_sass/' },
        { text: 'React', link: '/tech/react/' },
        { text: 'Vue', link: '/tech/vue/' },
        { text: 'Vite', link: '/tech/vite/' },
        { text: 'Webpack', link: '/tech/webpack/' },
      ],
    },
    {
      text: 'background',
      children: [
        { text: 'JAVA', link: '/tech/java/' },
        { text: 'Node', link: '/tech/node/' },
      ],
    },
    {
      text: 'app.mp',
      children: [
        { text: 'MiniProgram', link: '/tech/miniProgram/' },
        { text: 'uni-app', link: '/tech/uni-app/' },
      ],
    },
    {
      text: 'server',
      children: [{ text: 'Centos', link: '/tech/centos/' }],
    },
  ],
}

export const techSideBar = {
  // foreground
  '/tech/js/': [
    {
      text: 'JavaScript',
      children: [
        '/tech/js/README.md',
        '/tech/js/1.md',
        '/tech/js/2.md',
        '/tech/js/3.md',
        '/tech/js/4.md',
        '/tech/js/5.md',
      ],
    },
  ],
  '/tech/typescript/': [
    {
      text: 'TypeScript',
      children: ['/tech/typescript/README.md', '/tech/typescript/1.md'],
    },
  ],
  '/tech/html_css/': [
    {
      text: 'HTML_CSS',
      children: [
        '/tech/html_css/README.md',
        '/tech/html_css/1.md',
        '/tech/html_css/2.md',
      ],
    },
  ],
  '/tech/less_sass/': [
    {
      text: 'Less_Sass',
      children: [
        '/tech/less_sass/README.md',
        '/tech/less_sass/less.md',
        '/tech/less_sass/sass.md',
      ],
    },
  ],
  '/tech/react/': [
    {
      text: 'React',
      children: [
        '/tech/react/README.md',
        '/tech/react/new.md',
        '/tech/react/1.md',
        '/tech/react/2.md',
        '/tech/react/3.md',
        '/tech/react/4.md',
        '/tech/react/5.md',
        '/tech/react/6.md',
        '/tech/react/7.md',
        '/tech/react/8.md',
        '/tech/react/9.md',
      ],
    },
  ],
  '/tech/vue/': [
    {
      text: 'Vue',
      children: [
        '/tech/vue/README.md',
        '/tech/vue/vue2.md',
        '/tech/vue/base_tutorial.md',
        '/tech/vue/api_tutorial.md',
        '/tech/vue/vue3_1.md',
        '/tech/vue/vue3_2.md',
        '/tech/vue/pinia.md',
      ],
    },
  ],
  '/tech/vite/': [
    {
      text: 'Vite',
      children: ['/tech/vite/README.md', '/tech/vite/1.md'],
    },
  ],
  '/tech/webpack/': [
    {
      text: 'Webpack',
      children: ['/tech/webpack/README.md', '/tech/webpack/1.md'],
    },
  ],
  // background
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
  // app.mp
  '/tech/uni-app/': [
    {
      text: 'uni-app',
      children: [
        '/tech/uni-app/README.md',
        '/tech/uni-app/uniCloud.md',
        '/tech/uni-app/uniTips',
      ],
    },
  ],
  '/tech/miniProgram/': [
    {
      text: 'MiniProgram',
      children: [
        '/tech/miniProgram/README.md',
        '/tech/miniProgram/1.md',
        '/tech/miniProgram/2.md',
      ],
    },
  ],
  // server
  '/tech/centos/': [
    {
      text: 'Centos',
      children: [
        '/tech/centos/README.md',
        '/tech/centos/docker_tutorial.md',
        '/tech/centos/mysql_tutorial.md',
        '/tech/centos/nginx_tutorial.md',
        '/tech/centos/firewall_tutorial.md',
        '/tech/centos/other_tutorial.md',
      ],
    },
  ],
}
