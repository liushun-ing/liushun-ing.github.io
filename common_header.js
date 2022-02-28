let header = document.createElement('header');
header.innerHTML = `
    <div class="header clearfix">
        <div class="top-wrapper clearfix">
            <div class="name-wrapper">
                <span class="name">刘 顺</span>
                <span class="welcome">Welcome to liushun-ing's blog!</span>
            </div>
            <div class="back-wrapper">
                <a class="github" target="_blank" href="https://github.com/liushun-ing">
                    <i class="iconfont icon-github"></i>Github
                </a>
                <a class="github" target="_self" href="/catalogue/index.html">
                    <i class="iconfont icon-catalogue"></i>Catalogue
                </a>
                <a class="home" target="_self" href="/index.html">
                    <i class="iconfont icon-home"></i>Home
                </a>
            </div>            
        </div>
    </div>
`
//插入到最前面
document.body.insertBefore(header, document.body.firstElementChild);