# 公共部分



5cdae9d8116892012dad39f9e4b6d78b
这是secret
wx32cc79c3b0371b38
这是appid



### app.json公共配置文件

颜色只能是十六进制形式

其他选择访问https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#pages

```json
"pages":[
    "pages/index/index",
    "pages/logs/logs"
],
"window":{
    "backgroundTextStyle":"light",   // 下拉刷新框的风格，只有light 和 dark
    "navigationBarBackgroundColor": "#fff",   //导航栏背景颜色
    "navigationBarTitleText": "Weixin",   //小程序标题
    "navigationBarTextStyle":"black",   //标题颜色，只有白色和黑色
    "enablePullDownRefresh":true,   //开启下拉刷新
    "backgroundColor": "#abcdfe"   //刷新框的背景颜色
},
```



### tabbar

写在app.json中，和window同级，

```json
"tabBar": {
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "icon/_home.png",
        "selectedIconPath": "icon/home.png"
      },
      {
        "pagePath": "pages/img/img",
        "text": "图片",
        "iconPath": "icon/_img.png",
        "selectedIconPath": "icon/img.png"
      },
      {
        "pagePath": "pages/search/search",
        "text": "搜索",
        "iconPath": "icon/_search.png",
        "selectedIconPath": "icon/search.png"
      },
      {
        "pagePath": "pages/mine/mine",
        "text": "我的",
        "iconPath": "icon/_my.png",
        "selectedIconPath": "icon/my.png"
      }
    ],
    "color":"#eeff33",   //未选中颜色
    "selectedColor": "#225599",   //选中颜色
    "backgroundColor": "#000000",   //背景颜色
    "borderStyle": "white",
    "position": "bottom"   //位置
  },
```



### 页面配置

每一个小程序页面也可以使用 `.json` 文件来对本页面的窗口表现进行配置。页面中配置项在当前页面会覆盖 `app.json` 的 `window` 中相同的配置项

所以在pages字段中要将该页面放在index的上方，否则不会覆盖

属性同window



### sitemap配置

是在小程序发布时才会使用到

微信现已开放小程序内搜索，开发者可以通过 `sitemap.json` 配置，或者管理后台页面收录开关来配置其小程序页面是否允许微信索引。当开发者允许微信索引时，微信会通过爬虫的形式，为小程序的页面内容建立索引。当用户的搜索词条触发该索引时，小程序的页面将可能展示在搜索结果中。

