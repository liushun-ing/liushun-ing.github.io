import{_ as e,o as a,c as s,a as r}from"./app-5a5db9de.js";const n={},p=r(`<h1 id="react应用-基于react脚手架" tabindex="-1"><a class="header-anchor" href="#react应用-基于react脚手架" aria-hidden="true">#</a> React应用(基于React脚手架)</h1><h2 id="使用create-react-app创建react应用" tabindex="-1"><a class="header-anchor" href="#使用create-react-app创建react应用" aria-hidden="true">#</a> 使用create-react-app创建react应用</h2><h3 id="react脚手架" tabindex="-1"><a class="header-anchor" href="#react脚手架" aria-hidden="true">#</a> react脚手架</h3><ul><li><p>xxx脚手架: 用来帮助程序员快速创建一个基于xxx库的模板项目</p><ul><li>包含了所有需要的配置（语法检查、jsx编译、devServer…）</li><li>下载好了所有相关的依赖</li><li>可以直接运行一个简单效果</li></ul></li><li><p>react提供了一个用于创建react项目的脚手架库: create-react-app</p></li><li><p>项目的整体技术架构为: react + webpack + es6 + eslint</p></li><li><p>使用脚手架开发的项目的特点: <strong>模块化, 组件化, 工程化</strong></p></li></ul><h2 id="创建项目并启动" tabindex="-1"><a class="header-anchor" href="#创建项目并启动" aria-hidden="true">#</a> 创建项目并启动</h2><p><strong>第一步</strong>，全局安装：npm i -g create-react-app</p><p><strong>第二步</strong>，切换到想创项目的目录，使用命令：create-react-app 项目名</p><p><strong>第三步</strong>，进入项目文件夹：cd 项目名</p><p><strong>第四步</strong>，启动项目：npm start</p><h2 id="脚手架项目结构" tabindex="-1"><a class="header-anchor" href="#脚手架项目结构" aria-hidden="true">#</a> 脚手架项目结构</h2><p>public ---- 静态资源文件夹</p><p>​ favicon.icon ------ 网站页签图标</p><p>​ <strong>index.html --------</strong> <strong>主页面</strong></p><p>​ logo192.png ------- logo图</p><p>​ logo512.png ------- logo图</p><p>​ manifest.json ----- 应用加壳的配置文件</p><p>​ robots.txt -------- 爬虫协议文件</p><p>src ---- 源码文件夹</p><p>​ App.css -------- App组件的样式</p><p>​ <strong>App.js --------- App组件</strong></p><p>​ App.test.js ---- 用于给App做测试</p><p>​ index.css ------ 样式</p><p>​ <strong>index.js -------</strong> <strong>入口文件</strong></p><p>​ logo.svg ------- logo图</p><p>​ reportWebVitals.js</p><p>​ --- 页面性能分析文件(需要web-vitals库的支持)</p><p>​ setupTests.js</p><p>​ ---- 组件单元测试的文件(需要jest-dom库的支持)</p><h2 id="组件模块化方式" tabindex="-1"><a class="header-anchor" href="#组件模块化方式" aria-hidden="true">#</a> 组件模块化方式</h2><h3 id="方式一" tabindex="-1"><a class="header-anchor" href="#方式一" aria-hidden="true">#</a> 方式一</h3><p>这种方式引入时更简单，感觉也方便些</p><p>将文件夹命名为<strong>组件名</strong>，大写开头</p><p>新建文件<code>index.jsx</code>，表示组件定义文件，和文件<code>index.css</code>，用于写样式，如果有其他的js文件，可以自行新建</p><p>引入时，直接<code>import xxx/xxx/xx/组件名</code></p><h3 id="方式二" tabindex="-1"><a class="header-anchor" href="#方式二" aria-hidden="true">#</a> 方式二</h3><p>将文件夹命名为<strong>组件名</strong>，大写开头</p><p>新建文件<code>组件名.jsx</code>，表示组件定义文件（定义为jsx文件用于与其他js文件区分），和文件<code>组件名.css</code>，用于写样式(样式污染问题下面解决)，如果有其他的js文件，可以自行新建</p><p>引入时，直接<code>import xxx/xxx/xx/组件名（文件夹）/组件名（组件）</code></p><h3 id="区别" tabindex="-1"><a class="header-anchor" href="#区别" aria-hidden="true">#</a> 区别</h3><p>如果命名的是<code>index</code>，就只需要引入文件名，会自动去找<code>index.js</code>文件</p><h2 id="样式模块化" tabindex="-1"><a class="header-anchor" href="#样式模块化" aria-hidden="true">#</a> 样式模块化</h2><h3 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h3><p>如果不进行样式模块化，可能多个样式文件中的样式就会重叠，发生覆盖</p><h3 id="解决" tabindex="-1"><a class="header-anchor" href="#解决" aria-hidden="true">#</a> 解决</h3><p>1、使用less编写样式</p><p>将所有样式写在模块名下面</p><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token selector">模块名</span><span class="token punctuation">{</span>
    <span class="token selector">xxx</span><span class="token punctuation">{</span>
        
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、使用module</p><p>将样式文件重命名为<code>index.module.css</code>,</p><p>引入时：<code>import 模块名 from &#39;/index.module.css&#39;</code></p><p>使用：className = {模块名.xxx}</p><h2 id="功能界面的组件化编码流程-通用" tabindex="-1"><a class="header-anchor" href="#功能界面的组件化编码流程-通用" aria-hidden="true">#</a> 功能界面的组件化编码流程（通用）</h2><ul><li>拆分组件: 拆分界面,抽取组件</li><li>实现静态组件: 使用组件实现静态页面效果</li><li>实现动态组件 <ul><li>动态显示初始化数据 <ul><li>数据类型</li><li>数据名称</li><li>保存在哪个组件?</li></ul></li><li>交互(从绑定事件监听开始)</li></ul></li></ul>`,53),i=[p];function t(d,c){return a(),s("div",null,i)}const l=e(n,[["render",t],["__file","3.html.vue"]]);export{l as default};
