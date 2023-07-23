import{_ as p,r as n,o,c,b as i,d as l,e as a,w as r,a as s}from"./app-5a5db9de.js";const d="/home/assets/image-20220308231237618-0138fe6a.png",u={},k=s(`<h1 id="react扩展" tabindex="-1"><a class="header-anchor" href="#react扩展" aria-hidden="true">#</a> react扩展</h1><h2 id="_1-setstate" tabindex="-1"><a class="header-anchor" href="#_1-setstate" aria-hidden="true">#</a> 1. setState</h2><h3 id="setstate更新状态的2种写法" tabindex="-1"><a class="header-anchor" href="#setstate更新状态的2种写法" aria-hidden="true">#</a> setState更新状态的2种写法</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>	(1). setState(stateChange, [callback])------对象式的setState
            1.stateChange为状态改变对象(该对象可以体现出状态的更改)
            2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
					
	(2). setState(updater, [callback])------函数式的setState
            1.updater为返回stateChange对象的函数。
            2.updater可以接收到state和props。
            4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
总结:
		1.对象式的setState是函数式的setState的简写方式(语法糖)
		2.使用原则：
				(1).如果新状态不依赖于原状态 ===&gt; 使用对象方式
				(2).如果新状态依赖于原状态 ===&gt; 使用函数方式
				(3).如果需要在setState()执行后获取最新的状态数据, 
					要在第二个callback函数中读取
this.setState((state, props) =&gt; {
	console.log(state, props);
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_2-lazyload" tabindex="-1"><a class="header-anchor" href="#_2-lazyload" aria-hidden="true">#</a> 2. lazyLoad</h2><h3 id="路由组件的lazyload" tabindex="-1"><a class="header-anchor" href="#路由组件的lazyload" aria-hidden="true">#</a> 路由组件的lazyLoad</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// lazy和Suspense都是从React中引入，不是react-route-dom	</span>
<span class="token comment">//1.通过React的lazy函数配合import()函数动态加载路由组件 ===&gt; 路由组件代码会被分开打包</span>
	<span class="token keyword">const</span> Login <span class="token operator">=</span> <span class="token function">lazy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;@/pages/Login&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	
	<span class="token comment">//2.通过&lt;Suspense&gt;指定在加载得到路由打包文件前显示一个自定义loading界面</span>
    <span class="token comment">// fallback这里面也可以是一个组件，但是该组件不能懒加载</span>
	<span class="token operator">&lt;</span>Suspense fallback<span class="token operator">=</span><span class="token punctuation">{</span><span class="token operator">&lt;</span>h1<span class="token operator">&gt;</span>loading<span class="token operator">...</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">&gt;</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>Switch<span class="token operator">&gt;</span>
            <span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">&quot;/xxx&quot;</span> component<span class="token operator">=</span><span class="token punctuation">{</span>Xxxx<span class="token punctuation">}</span><span class="token operator">/</span><span class="token operator">&gt;</span>
            <span class="token operator">&lt;</span>Redirect to<span class="token operator">=</span><span class="token string">&quot;/login&quot;</span><span class="token operator">/</span><span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>Switch<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>Suspense<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_3-hooks" tabindex="-1"><a class="header-anchor" href="#_3-hooks" aria-hidden="true">#</a> 3. Hooks</h2><h4 id="_1-react-hook-hooks是什么" tabindex="-1"><a class="header-anchor" href="#_1-react-hook-hooks是什么" aria-hidden="true">#</a> 1. React Hook/Hooks是什么?</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>(1). Hook是React 16.8.0版本增加的新特性/新语法
(2). 可以让你在函数组件中使用 state 以及其他的 React 特性
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-三个常用的hook" tabindex="-1"><a class="header-anchor" href="#_2-三个常用的hook" aria-hidden="true">#</a> 2. 三个常用的Hook</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>(1). State Hook: React.useState()
(2). Effect Hook: React.useEffect()
(3). Ref Hook: React.useRef()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-state-hook" tabindex="-1"><a class="header-anchor" href="#_3-state-hook" aria-hidden="true">#</a> 3. State Hook</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
(2). 语法: const [xxx, setXxx] = React.useState(initValue)  
(3). useState()说明:
        参数: 第一次初始化指定的值在内部作缓存
        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
(4). setXxx()2种写法:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(value =&gt; newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">function</span> <span class="token function">Demo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 只能分开写，如果状态中有多个值的话</span>
	<span class="token keyword">const</span> <span class="token punctuation">[</span>count<span class="token punctuation">,</span>setcount<span class="token punctuation">]</span> <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> <span class="token punctuation">[</span>name<span class="token punctuation">,</span>setName<span class="token punctuation">]</span> <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">usestate</span><span class="token punctuation">(</span><span class="token string">&#39;tom&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//setcount(count+1) 第一种写法</span>
        <span class="token function">setCount</span><span class="token punctuation">(</span><span class="token parameter">count</span> <span class="token operator">=&gt;</span> count<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">function</span> <span class="token function">changeName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&#39;jack&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">当前求和为: </span><span class="token punctuation">{</span>count<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">我的名字是: </span><span class="token punctuation">{</span>name<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onclick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>add<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">点我+1</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onclick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>changeName<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">点我改名</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-effect-hook" tabindex="-1"><a class="header-anchor" href="#_4-effect-hook" aria-hidden="true">#</a> 4. Effect Hook</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>(1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
(2). React中的副作用操作:
        发ajax请求数据获取
        设置订阅 / 启动定时器
        手动更改真实DOM
(3). 语法和说明: 
        useEffect(() =&gt; { 
          // 在此可以执行任何带副作用操作
          return () =&gt; { // 在组件卸载前执行
            // 在此做一些收尾工作, 比如清除定时器/取消订阅等
          }
        }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行
    	[]数组中为需要监测的值，这个值改变就会调用函数
    	如果不传第二个参数，就是默认监测所有state
(4). 可以把 useEffect Hook 看做如下三个函数的组合
        componentDidMount()    后面传一个空数组
        componentDidUpdate()	后面传一个带变量得数组
    	componentWillUnmount() 	第一个参数返回一个函数，这个函数就是卸载节点回调函数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code>React<span class="token punctuation">.</span><span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    	<span class="token function">setCount</span><span class="token punctuation">(</span><span class="token parameter">count</span> <span class="token operator">=&gt;</span> count<span class="token operator">+</span><span class="token number">1</span> <span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">1000</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    	<span class="token function">clearInterval</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-ref-hook" tabindex="-1"><a class="header-anchor" href="#_5-ref-hook" aria-hidden="true">#</a> 5. Ref Hook</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>(1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
(2). 语法: const refContainer = useRef()
(3). 作用:保存标签对象,功能与React.createRef()一样
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token comment">// 定义</span>
myref <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">useRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 使用 .current拿到节点</span>
myref<span class="token punctuation">.</span>current<span class="token punctuation">.</span>value
<span class="token comment">// 标记节点</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">ref</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>myref<span class="token punctuation">}</span></span><span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_4-fragment" tabindex="-1"><a class="header-anchor" href="#_4-fragment" aria-hidden="true">#</a> 4. Fragment</h2><h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> Component<span class="token punctuation">,</span> Fragment <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span>

<span class="token comment">// 如果有遍历，就可以使用Fragment，他有一个key属性</span>
<span class="token operator">&lt;</span>Fragment<span class="token operator">&gt;</span><span class="token operator">&lt;</span>Fragment<span class="token operator">&gt;</span>
<span class="token comment">// 也可以直接用一个空标签</span>
<span class="token operator">&lt;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span><span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="作用" tabindex="-1"><a class="header-anchor" href="#作用" aria-hidden="true">#</a> 作用</h3><blockquote><p>可以不用必须有一个真实的DOM根标签了</p><p>可以在创建一个组件时，将<strong>最外层的div</strong>换掉，就可以少几层标签嵌套</p></blockquote><hr><h2 id="_5-context" tabindex="-1"><a class="header-anchor" href="#_5-context" aria-hidden="true">#</a> 5. Context</h2><h3 id="理解" tabindex="-1"><a class="header-anchor" href="#理解" aria-hidden="true">#</a> 理解</h3><blockquote><p>一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信</p></blockquote><h3 id="使用-1" tabindex="-1"><a class="header-anchor" href="#使用-1" aria-hidden="true">#</a> 使用</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token number">1</span><span class="token punctuation">)</span> 创建Context容器对象：	
<span class="token keyword">const</span> XxxContext <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  	
<span class="token number">2</span><span class="token punctuation">)</span> 父组件渲染子组时，外面包裹xxxContext<span class="token punctuation">.</span>Provider<span class="token punctuation">,</span> 通过value属性给后代组件传递数据：	<span class="token operator">&lt;</span>xxxContext<span class="token punctuation">.</span>Provider value<span class="token operator">=</span><span class="token punctuation">{</span>数据<span class="token punctuation">}</span><span class="token operator">&gt;</span>		
    子组件    
<span class="token operator">&lt;</span><span class="token operator">/</span>xxxContext<span class="token punctuation">.</span>Provider<span class="token operator">&gt;</span>    
<span class="token number">3</span><span class="token punctuation">)</span> 后代组件读取数据：	
<span class="token comment">//第一种方式:仅适用于类组件 	  </span>
<span class="token keyword">static</span> contextType <span class="token operator">=</span> xxxContext  <span class="token comment">// 声明接收context	  </span>
<span class="token keyword">this</span><span class="token punctuation">.</span>context <span class="token comment">// 读取context中的value数据	  	</span>
<span class="token comment">//第二种方式: 函数组件与类组件都可以	  </span>
<span class="token operator">&lt;</span>xxxContext<span class="token punctuation">.</span>Consumer<span class="token operator">&gt;</span>	    
    <span class="token punctuation">{</span>	      
        <span class="token comment">// value就是context中的value数据</span>
        <span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span> <span class="token comment">// 要显示的内容 )	    </span>
	<span class="token punctuation">}</span>	  
<span class="token operator">&lt;</span><span class="token operator">/</span>xxxContext<span class="token punctuation">.</span>Consumer<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="`+d+'" alt="image-20220308231237618" style="zoom:67%;"><h3 id="注意" tabindex="-1"><a class="header-anchor" href="#注意" aria-hidden="true">#</a> 注意</h3><p>在应用开发中一般不用context, 一般都用它的封装react插件</p><hr><h2 id="_6-组件优化" tabindex="-1"><a class="header-anchor" href="#_6-组件优化" aria-hidden="true">#</a> 6. 组件优化</h2><h3 id="component的2个问题" tabindex="-1"><a class="header-anchor" href="#component的2个问题" aria-hidden="true">#</a> Component的2个问题</h3><blockquote><ol><li><p>只要执行setState(),即使不改变状态数据, 组件也会重新render() ==&gt; 效率低</p></li><li><p>只当前组件重新render(), 就会自动重新render子组件，纵使子组件没有用到父组件的任何数据 ==&gt; 效率低</p></li></ol></blockquote><h3 id="效率高的做法" tabindex="-1"><a class="header-anchor" href="#效率高的做法" aria-hidden="true">#</a> 效率高的做法</h3><blockquote><p>只有当组件的state或props数据发生改变时才重新render()</p></blockquote><h3 id="原因" tabindex="-1"><a class="header-anchor" href="#原因" aria-hidden="true">#</a> 原因</h3><blockquote><p>Component中的shouldComponentUpdate()总是返回true</p></blockquote><h3 id="解决" tabindex="-1"><a class="header-anchor" href="#解决" aria-hidden="true">#</a> 解决</h3><p>办法1:</p><p>重写shouldComponentUpdate()方法</p><p>比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false</p><p>办法2:</p><p>使用PureComponent</p><p>PureComponent重写了shouldComponentUpdate(),</p><p>只有state或props数据有变化才返回true</p><p>注意:</p><p>只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false</p><p>不要直接修改state数据, 而是要产生新数据项目中一般使用PureComponent来优化</p><hr><h2 id="_7-render-props" tabindex="-1"><a class="header-anchor" href="#_7-render-props" aria-hidden="true">#</a> 7. render props</h2><h3 id="如何向组件内部动态传入带内容的结构-标签" tabindex="-1"><a class="header-anchor" href="#如何向组件内部动态传入带内容的结构-标签" aria-hidden="true">#</a> 如何向组件内部动态传入带内容的结构(标签)?</h3><p>Vue中:</p>',61),v=s(`<p>React中:</p><p>使用children props: 通过组件标签体传入结构</p><p>使用render props: 通过组件标签属性传入结构,而且可以携带数据，一般用render函数属性</p><h3 id="children-props" tabindex="-1"><a class="header-anchor" href="#children-props" aria-hidden="true">#</a> children props</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span><span class="token constant">A</span><span class="token operator">&gt;</span>  
  <span class="token operator">&lt;</span><span class="token constant">B</span><span class="token operator">&gt;</span>xxxx<span class="token operator">&lt;</span><span class="token operator">/</span><span class="token constant">B</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span><span class="token constant">A</span><span class="token operator">&gt;</span>
<span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>children<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>问题: 如果B组件需要A组件内的数据, ==&gt; 做不到</p><h3 id="render-props" tabindex="-1"><a class="header-anchor" href="#render-props" aria-hidden="true">#</a> render props</h3><p><code>&lt;A render={(data) =&gt; &lt;C data={data}&gt;&lt;/C&gt;}&gt;&lt;/A&gt;</code></p><p>A组件: {this.props.render(内部state数据)}，通过调用函数来加载子组件</p><p>C组件: 读取A组件传入的数据显示 {this.props.data}</p><hr><h2 id="_8-错误边界" tabindex="-1"><a class="header-anchor" href="#_8-错误边界" aria-hidden="true">#</a> 8. 错误边界</h2><h4 id="理解-1" tabindex="-1"><a class="header-anchor" href="#理解-1" aria-hidden="true">#</a> 理解：</h4><p>错误边界(Error boundary)：用来捕获后代组件错误，渲染出备用页面</p><h4 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点：</h4><p>只能捕获<strong>后代组件生命周期</strong>产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误</p><h5 id="使用方式" tabindex="-1"><a class="header-anchor" href="#使用方式" aria-hidden="true">#</a> 使用方式：</h5><p>getDerivedStateFromError配合componentDidCatch</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 生命周期函数，一旦后代组件报错，就会触发</span>
<span class="token keyword">static</span> <span class="token function">getDerivedStateFromError</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>    
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 在render之前触发    </span>
    <span class="token comment">// 返回新的state    </span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>        
        <span class="token literal-property property">hasError</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>    
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">componentDidCatch</span><span class="token punctuation">(</span><span class="token parameter">error<span class="token punctuation">,</span> info</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>    
    <span class="token comment">// 统计页面的错误。发送请求发送到后台去    </span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">,</span> info<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 父组件使用错误边界，渲染错误情况y：</span>
<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>h2<span class="token operator">&gt;</span>我是Parent组件<span class="token operator">&lt;</span><span class="token operator">/</span>h2<span class="token operator">&gt;</span>
    <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>hasError <span class="token operator">?</span> <span class="token operator">&lt;</span>h2<span class="token operator">&gt;</span>当前网络不稳定，稍后再试<span class="token operator">&lt;</span><span class="token operator">/</span>h2<span class="token operator">&gt;</span> <span class="token operator">:</span> <span class="token operator">&lt;</span>child<span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-组件通信方式总结" tabindex="-1"><a class="header-anchor" href="#_9-组件通信方式总结" aria-hidden="true">#</a> 9. 组件通信方式总结</h2><h4 id="组件间的关系" tabindex="-1"><a class="header-anchor" href="#组件间的关系" aria-hidden="true">#</a> 组件间的关系：</h4><ul><li>父子组件</li><li>兄弟组件（非嵌套组件）</li><li>祖孙组件（跨级组件）</li></ul><h4 id="几种通信方式" tabindex="-1"><a class="header-anchor" href="#几种通信方式" aria-hidden="true">#</a> 几种通信方式：</h4><p>1.props： (1).children props (2).render props</p><p>2.消息订阅-发布： pubs-sub、event等等</p><p>3.集中式管理： redux、dva等等</p><p>4.conText: 生产者-消费者模式</p><h4 id="比较好的搭配方式" tabindex="-1"><a class="header-anchor" href="#比较好的搭配方式" aria-hidden="true">#</a> 比较好的搭配方式：</h4><p>父子组件：props</p><p>兄弟组件：消息订阅-发布、集中式管理</p><p>祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(开发用的少，封装插件用的多)</p>`,31);function m(h,b){const e=n("B"),t=n("A");return o(),c("div",null,[k,i("p",null,[l("使用slot技术, 也就是通过组件标签体传入结构 "),a(t,null,{default:r(()=>[a(e)]),_:1})]),v])}const x=p(u,[["render",m],["__file","8.html.vue"]]);export{x as default};
