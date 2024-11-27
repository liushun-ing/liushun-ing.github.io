export const AppMpNavbar = {
  text: '小程序池',
  children: [
    { text: '微信小程序', link: '/tech/miniprogram/wxmini' },
    { text: 'uni-app', link: '/tech/miniprogram/uni-app/' },
  ],
}

export const AppMpSideBar = {
  '/tech/miniprogram/uni-app/': [
    {
      text: 'uni-app',
      children: [
        '/tech/miniprogram/uni-app/README.md',
        '/tech/miniprogram/uni-app/uniCloud.md',
        '/tech/miniprogram/uni-app/uniTips',
      ],
    },
  ],
  '/tech/miniprogram/wxmini/': [
    {
      text: '微信小程序',
      children: [
        '/tech/miniprogram/wxmini/README.md',
        '/tech/miniprogram/wxmini/1.md',
        '/tech/miniprogram/wxmini/2.md',
      ],
    },
  ],
}