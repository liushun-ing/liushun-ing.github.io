import { copyCodePlugin } from 'vuepress-plugin-copy-code2'
import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search'
import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon'
import myTheme from './config/theme'

export default defineUserConfig({
  // 站点配置
  base: '/home/',
  lang: 'zh-CN',
  dest: `home`,
  head: [['link', { rel: 'icon', href: '/home/imgs/favicon.ico' }]],
  title: '不愿飞的蜂鸟首页',
  description: 'Five的垃圾库',
  theme: defaultTheme(myTheme),
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
