import{_ as a,o as s,c as e,a as n}from"./app-5a5db9de.js";const i="/home/assets/image-20220508205208952-5b4a0536.png",l="/home/assets/image-20220508205310214-d2964214.png",t="/home/assets/image-20220508215018965-92090580.png",r="/home/assets/image-20220508215150894-3d2b3890.png",d="/home/assets/image-20220508215222903-a45a6d8e.png",p="/home/assets/image-20220508215344385-05188a7a.png",c="/home/assets/image-20220508215626377-d449f958.png",o="/home/assets/image-20220508215645997-3e14db3e.png",m="/home/assets/image-20220508215838255-e2f38ab4.png",v="/home/assets/image-20220508220516854-154a8162.png",u="/home/assets/image-20220508220539843-1001b9a0.png",b="/home/assets/image-20220508221305978-9efdb94b.png",h="/home/assets/image-20220508221357114-ae281a08.png",g={},k=n(`<h1 id="centos基本操作" tabindex="-1"><a class="header-anchor" href="#centos基本操作" aria-hidden="true">#</a> centos基本操作</h1><h2 id="_1-查看端口、进程情况" tabindex="-1"><a class="header-anchor" href="#_1-查看端口、进程情况" aria-hidden="true">#</a> 1 查看端口、进程情况</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>、检查端口被哪个进程占用
<span class="token function">netstat</span> <span class="token parameter variable">-lnp</span> 查看所有列表
<span class="token function">netstat</span> -lnp<span class="token operator">|</span><span class="token function">grep</span> <span class="token number">88</span>   <span class="token comment">#88请换为你的apache需要的端口，如：80</span>
SSH执行以上命令，可以查看到88端口正在被哪个进程使用。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+i+`" alt="image-20220508205208952"></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">2</span>、查看进程的详细信息

<span class="token function">ps</span> <span class="token number">1777</span>
SSH执行以上命令。查看相应进程号的程序详细路径。如下图。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+l+`" alt="image-20220508205310214"></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">3</span>、杀掉进程
<span class="token function">kill</span> <span class="token parameter variable">-9</span> <span class="token number">24983</span>    <span class="token comment">#杀掉pid为24983的进程</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-配置java环境" tabindex="-1"><a class="header-anchor" href="#_2-配置java环境" aria-hidden="true">#</a> 2 配置java环境</h2><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><p>首先用yum命令看一下是否有自带的java环境</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum list installed <span class="token operator">|</span><span class="token function">grep</span> <span class="token function">java</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果有的话，就需要删掉</p><p>查看yum库中的java安装包</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> list java*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装JDK</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> java-1.8.0-openjdk*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查找java安装路径</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">which</span> <span class="token function">java</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><img src="`+t+`" alt="image-20220508215018965" style="zoom:80%;"><p>查看安装的依赖文件</p><p>执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ls</span> <span class="token parameter variable">-lrt</span> /usr/bin/java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><img src="`+r+`" alt="image-20220508215150894" style="zoom:80%;"><p>执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ls</span> <span class="token parameter variable">-lrt</span> /etc/alternatives/java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><img src="`+d+`" alt="image-20220508215222903" style="zoom:80%;"><p>可以看到jvm目录，进入该目录</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /usr/lib/jvm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看该目录下的文件</p><img src="`+p+`" alt="image-20220508215344385" style="zoom:80%;"><h3 id="配置环境变量" tabindex="-1"><a class="header-anchor" href="#配置环境变量" aria-hidden="true">#</a> 配置环境变量</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vi</span> /etc/profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最底部添加</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span>/usr/lib/jvm/java-1.8.0
<span class="token builtin class-name">export</span> <span class="token assign-left variable">JRE_HOME</span><span class="token operator">=</span><span class="token variable">$JAVA_HOME</span>/jre  
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$JAVA_HOME</span>/bin:<span class="token variable">$JRE_HOME</span>/bin
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CLASSPATH</span><span class="token operator">=</span>.:<span class="token variable">$JAVA_HOME</span>/lib/dt.jar:<span class="token variable">$JAVA_HOME</span>/lib/tools.jar:<span class="token variable">$JRE_HOME</span>/lib
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新加载配置</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">source</span> /etc/profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="检查配置" tabindex="-1"><a class="header-anchor" href="#检查配置" aria-hidden="true">#</a> 检查配置</h3><img src="`+c+'" alt="image-20220508215626377" style="zoom:80%;"><img src="'+o+`" alt="image-20220508215645997" style="zoom:80%;"><h3 id="删除已有的环境" tabindex="-1"><a class="header-anchor" href="#删除已有的环境" aria-hidden="true">#</a> 删除已有的环境</h3><p>查询</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token function">java</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><img src="`+m+`" alt="image-20220508215838255" style="zoom:80%;"><p>使用yum卸载</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> remove <span class="token function">java</span> java-1.8.0-openjdk-1.8.0.322.b06-1.el7_9.x86_64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者使用rpm删除</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">rpm</span> <span class="token parameter variable">-e</span> <span class="token parameter variable">--nodeps</span> java-1.8.0-openjdk-1.8.0.322.b06-1.el7_9.x86_64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>find查看是否还有相关残余文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">find</span> / <span class="token parameter variable">-name</span> <span class="token function">java</span>
<span class="token function">find</span> / <span class="token parameter variable">-name</span> jdk
<span class="token function">find</span> / <span class="token parameter variable">-name</span> jre
<span class="token function">find</span> / <span class="token parameter variable">-name</span> gcj
//如果有,利用rm删除
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-部署springboot项目" tabindex="-1"><a class="header-anchor" href="#_3-部署springboot项目" aria-hidden="true">#</a> 3 部署springboot项目</h2><p>打包springboot项目为jar包</p><p>再服务器建立一个<code>javaWorkspace</code></p><p>然后再每个工程建立一个单独的文件夹</p><img src="`+v+'" alt="image-20220508220516854" style="zoom:80%;"><img src="'+u+`" alt="image-20220508220539843" style="zoom:80%;"><p>将打包好的jar包放进对应的文件夹里面</p><p>进行该文件夹，运行程序（记得给运行端口开放防火墙）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">nohup</span> <span class="token function">java</span> <span class="token parameter variable">-jar</span> smtpClient-0.0.1-SNAPSHOT.jar <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以nohup模式运行，就会将控制台打印的信息全部存入nohop.out中，不会打印在控制台了。</p><p>如果想要关闭程序，可以利用上面的杀死进程方法关闭程序；</p><h2 id="_4-centos默认占用25端口问题" tabindex="-1"><a class="header-anchor" href="#_4-centos默认占用25端口问题" aria-hidden="true">#</a> 4 centos默认占用25端口问题</h2><p>查看端口情况</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">netstat</span> <span class="token parameter variable">-tan</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><img src="`+b+`" alt="image-20220508221305978" style="zoom:80%;"><p>查看pid</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">netstat</span> <span class="token parameter variable">-tanp</span> <span class="token comment">#带PID名</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><img src="`+h+`" alt="image-20220508221357114" style="zoom:80%;"><p>他之前25端口是由一个master程序占用</p><p>查一下这个程序位置</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">find</span> / <span class="token parameter variable">-name</span> master <span class="token comment">#查了一下位置</span>
/usr/libexec/postfix/master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>停止服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl stop postfix <span class="token comment">#停止服务</span>
systemctl disable postfix <span class="token comment">#禁止开机启动</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>之后就可以自己使用了</p>`,73),_=[k];function f(x,j){return s(),e("div",null,_)}const A=a(g,[["render",f],["__file","other_tutorial.html.vue"]]);export{A as default};
