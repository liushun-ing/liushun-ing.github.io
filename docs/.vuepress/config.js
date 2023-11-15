import { copyCodePlugin } from 'vuepress-plugin-copy-code2'
import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search'
import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon'

export default defineUserConfig({
  // 站点配置
  base: '/home/',
  lang: 'zh-CN',
  dest: `home`,
  head: [['link', { rel: 'icon', href: '/imgs/favicon.ico' }]],
  title: '不愿飞的蜂鸟首页',
  description: 'Five的垃圾库',
  theme: defaultTheme({
    navbar: [
      {
        text: 'Five研究生',
        link: '/master/',
        children: [
          { text: 'Daily', link: '/master/daily/' },
          { text: 'Ubuntu', link: '/master/ubuntu/' },
        ],
      },
      {
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
      },
      {
        text: 'Five课程',
        link: '/course/',
        children: [
          { text: '操作系统', link: '/course/operating_system/' },
          { text: '计算机网络技术', link: '/course/computer_network/' },
          {
            text: '数据结构和算法',
            link: '/course/datastructure_and_algorithm/',
          },
        ],
      },
      {
        text: 'GitHub',
        link: 'https://github.com/liushun-ing',
      },
    ],
    sidebar: {
      // 研究生部分
      '/master/daily/': [
        {
          text: 'Daily',
          children: ['/master/daily/README.md', '/master/daily/23_Nov.md'],
        },
      ],
      '/master/ubuntu/': [
        {
          text: 'Ubuntu',
          children: [
            '/master/ubuntu/system_usage.md',
            '/master/ubuntu/python_usage.md',
          ],
        },
      ],
      
      // 技术部分
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
          children: [
            '/tech/node/README.md',
            '/tech/node/1.md',
            '/tech/node/2.md',
          ],
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

      // 课程部分
      '/course/operating_system/': [
        {
          text: '操作系统',
          children: [
            '/course/operating_system/README.md',
            '/course/operating_system/1.md',
            '/course/operating_system/2.md',
            '/course/operating_system/3.md',
            '/course/operating_system/4.md',
            '/course/operating_system/5.md',
            '/course/operating_system/6.md',
            '/course/operating_system/7.md',
            '/course/operating_system/8.md',
            '/course/operating_system/9.md',
            '/course/operating_system/10.md',
            '/course/operating_system/11.md',
            '/course/operating_system/12.md',
            '/course/operating_system/13.md',
            '/course/operating_system/14.md',
          ],
        },
      ],
      '/course/computer_network/': [
        {
          text: '计算机网络',
          children: [
            '/course/computer_network/README.md',
            '/course/computer_network/1.md',
            '/course/computer_network/2.md',
            '/course/computer_network/3.md',
            '/course/computer_network/4.md',
            '/course/computer_network/5.md',
            '/course/computer_network/6.md',
          ],
        },
      ],
      '/course/datastructure_and_algorithm/': [
        {
          text: '数据结构与算法',
          children: [
            '/course/datastructure_and_algorithm/README.md',
            '/course/datastructure_and_algorithm/sort_and_search.md',
            '/course/datastructure_and_algorithm/tree.md',
            '/course/datastructure_and_algorithm/other_tree.md',
            '/course/datastructure_and_algorithm/graph.md',
            '/course/datastructure_and_algorithm/string.md',
            '/course/datastructure_and_algorithm/algorithms.md',
            '/course/datastructure_and_algorithm/c++.md',
            '/course/datastructure_and_algorithm/leetcode.md',
          ],
        },
      ],
    },
  }),
  plugins: [
    // https://vuepress-theme-hope.github.io/v2/copy-code/zh/
    copyCodePlugin({
      // 插件选项
      pure: true,
    }),
    externalLinkIconPlugin({
      locales: {
        '/': {
          openInNewWindow: 'open in new window',
        },
        '/zh/': {
          openInNewWindow: '在新窗口打开',
        },
      },
    }),
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search',
        },
        '/zh/': {
          placeholder: '搜索',
        },
      },
    }),
  ],
})
