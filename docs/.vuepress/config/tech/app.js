export const AppMpNavbar = {
  text: '小程序池',
  children: [
    { text: 'MiniProgram', link: '/tech/miniProgram/' },
    { text: 'uni-app', link: '/tech/uni-app/' },
  ],
}

export const AppMpSideBar = {
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
}