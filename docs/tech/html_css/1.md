# HMTL基础

## 1、实体

```html
<!-- 特殊字符需要用实体（转义字符） -->
<!-- & 实体名字 ;
    如: &nbsp; 空格
    &lt; 小于
    &gt; 大于
    &copy; 版权符号
-->
<p>
    a&lt;b&gt;c  <!-- a<b<c -->
</p>
```

[w3c教程链接](https://www.w3school.com.cn/html/html_entities.asp)

## 2、meta标签

位于head中

可以模仿成熟网站是怎么写的

```html
<meta charset="UTF-8">
<!--
    meta主要用于设置网页中的一些元数据，元数据不是给用户看
    charset指定网页的字符集
    name指定的数据的名称
    content 指定的数据的内容
        keywords表示网站的关键字，可以同时指定多个关键字，关键字间使用,隔开
        <meta name="Keywords" content="网上购物,网上商城,手机,笔记本">

        description用于指定网站的描述
        <meta name= "description" content="京东JD.COM-专业的综合网上购物网站">
        描述会显示在搜素引擎的搜索的结果中

        title标签的内容会作为搜索结果的超链接上的文字显示
-->
<meta name="keywords" content="HTML5,前端,cSS3">
<meta name="description" content="这是一个非常不错的网站">
<!-- <meta http-equiv="refresh" content="3;url=https://www.mozilla.org">
将页面重定向到另一个网站 -->
<meta http-equiv="refresh" content="3;url=https://ww.baidu.com">
```

## 3、块元素和行内元素

```html
<!--
    块元素(block element)
        -在网页中一般通过块元素来对页面进行布局行内元素（inline element）
        -行内元素主要用来包裹文字
        -一般情况下会在块元素中放行内元素，而不会在行内元素中放块元素
		-块元素中基本上什么都能放
        - p元素中不能放任何的块元素
    浏览器在解析网页时,会自动对网页中不符合规范的内容进行修正
    比如:
        标签写在了根元素的外部
        p元素中嵌套了块元素
        根元素中出现了除head和body以外的子元素... ...
-->

```

## 4、布局元素

- header表示网页的头部
- main表示网页的主体部分(一个页面中只会有一个main)
- footer表示网页的底部
- nav表示网页中的导航
- aside和主体相关的其他内容（侧边栏)article表示一个独立的文章
- section表示一个独立的区块,上边的标签都不能表示时使用section
- div没有语义，就用来表示一个区块，目前来讲div还是我们主要的布局元素
- span行内元素，没有任何的语义，一般用于在网页中选中文字

## 5、列表

- 有序列表，使用ol标签来创建有序列表
  - 使用li表示列表项
- 无序列表,使用ul标签来创建无序列表
  - 使用li表示列表项
- 定义列表,使用dl标签来创建一个定义列表
  - 使用dt来表示定义的内容
  - 使用dd来对内容进行解释说明
- 列表之间可以互相嵌套

```jtml
定义列表：类似于blockqueto
dt
	dd
	dd
	dd
```

## 6、超链接

- 跳转到新的页面

  ```html
  <a href="url" target="_blank"></a>
  新打开一个页面
  <a href="url" target="_seft"></a>
  在该页面跳转
  
  url可以是一个外部链接，也可以是一个相对路径，用于跳转到项目的其他页面
  ```

- 跳转到该页面的某个地方

  ```html
  <a href="#"></a> 
  回到页面顶部
  <a href="#id"></a>
  跳转到id标记的标签
  ```

- 保留占位符

  ```HTML
  <a href="javascript:;"></a>
  保留占位符，但是点击时不会发生任何跳转
  ```


## 7、音视频标签

audio标签用来向页面中引入一个外部的音频文件的，视频文件就是video，使用与audio一样

音视频文件引入时，默认情况下不允许用户自己控制播放停止

属性:

- controls是否允许用户控制播放
- autoplay音频文件是否自动播放
  - 如果设置了autoplay 则音乐在打开页面时会自动播放
    但是目前来讲大部分浏览器都不会自动对音乐进行播放
- loop音乐是否循环播放

```html
<audio src="./source/audio.mp3" controls autoplay loop></audio>
<!--除了通过src来指定外部文件的路径以外，还可以通过source来指定文件-->
<audio controls>
    对不起，您的浏览器不支持播放音频!请升级浏览器!
    <source src="./source/audio.mp3">
    <source src="./source/audio.ogg">
    <embed src="./source/audio.ogg" type="audio/mp3" width="300" height="100"></embed>
</audio>
<!--浏览器会自动匹配第一个能用的资源，进行显示，如果都不支持，就会显示那段文字-->
<!--ie8不支持audio标签，需要使用embed标签,必须指定宽高，并且会强制自动播放-->
```

# CSS基础

## 1、选择器

### 交集选择器

- 作用：选中同时符合多个条件的元素
- 语法：选择器1选择器2选择器3...
- 注意点：交集选择器中如果有元素选择器，必须使用元素选择器开头

### 并集选择器

- 作用：同时选择多个选择器对应的元素
- 语法：选择器1，选择器2，选择器3

### 关系选择器

#### 关系

- 父元素
  - 直接包含子元素的元素叫做父元素

- 子元素
  - -直接被父元素包含的元素是子元素

- 祖先元素
  - -直接或间接包含后代元素的元素叫做祖先元素
  - -一个元素的父元素也是它的祖先元素

- 后代元素
  - -直接或间接被祖先元素包含的元素叫做后代元素
  - -子元素也是后代元素

- 兄弟元素
  - -拥有相同父元素的元素是兄弟元素

#### 选择器

##### 子元素选择器

作用：选定指定父元素的指定子元素

语法：父元素 > 子元素

##### 后代选择器

作用：选中指定父元素内的指定后代元素

语法：父元素 子元素（空格）

##### 兄弟选择器

选择紧挨着的第一个兄弟：当前元素 + 下一个元素

选择后面的所有兄弟：当前元素 ~ 下一个元素

### 属性选择器

[属性名]选择含有指定属性的元素

[属性名=属性值]选择含有指定属性和属性值的元素

[属性名^=属性值]选择属性值以指定值开头的元素

[属性名$=属性值]选择属性值以指定值结尾的元素

[属性名*=属性值]选择属性值中含有某值的元素的元素

```css
p[title=abc] {
    color: red;
}

<p title="abc"></p>
```

## 2、伪类

### 定义

伪类（不存在的类，特殊的类）

-伪类用来描述一个元素的特殊状态

- 比如:第一个子元素、被点击的元素、鼠标移入的元素...

### 顺序伪类

-伪类一般情况下都是使用:开头

- :first-child第一个子元素
- :last-child最后一个子元素
- :nth-child()选中第n个子元素

特殊值:

- n 第n个n的范围e到正无穷
- 2n 或 even 表示选中偶数位的元素
- 2n+1 或 odd 表示选中奇数位的元素

-以上这些伪类都是根据所有的子元素进行排序

- :first-of-type
- :last-of-type
- :nth-of-type()

-这几个伪类的功能和上述的类似，不通点是他们是在同类型元素中进行排序

- :not() 否定伪类

-将符合条件的元素从选择器中去除

### 超链接伪类

```css
// :link 未访问过的链接
a:link {
    
}

// :visited 访问过的链接
a:visited {
    // 只能改颜色，保护隐私
}
```

### 鼠标伪类

```css
// :hover 鼠标移入
a:hover{
    
}
// :active 鼠标点击
a:active{
    
}
```

## 3、伪元素

### 定义

伪元素：表示页面中一些特殊的并不真实存在的元素（特殊的位置）

使用：   双冒号 :: 开头

### 常用的伪元素

```css
::first-letter 第一个字母
::first-line   第一行
::selection    访问网页时，鼠标选中的内容
::before       元素开始位置
::after        元素结束位置
/* before和after需要使用content，否则需要会没有效果 */
div::after{
    content: 'haha';
    color: red
}
```

## 4、样式优先级

内联样式 > id选择器 > 类和伪类选择器 > 元素选择器 > 通配选择器 > 继承的样式

在某个样式后面添加`!important`，则此样式具有最高优先级

## 5、文档流

文档流（normal flow)

- -网页是一个多层的结构，一层摞着一层

- -通过cSS可以分别为每一层来设置样式

- -作为用户来讲只能看到最顶上一层

- -这些层中，最底下的一层称为文档流,文档流是网页的基础

  ​	我们所创建的元素默认都是在文档流中进行排列

-对于我们来元素主要有两个状态

- 在文档流中
- 不在文档流中（脱高文档流）

-元素在文档流中有什么特点:

-块元素

- -块元素会在页面中独占一行(自上向下垂直排列)
- -默认宽度是父元素的全部（会把父元素撑满)
- -默认高度是被内容撑开(子元素)

-行内元素

- -行内元素不会独占页面的一行，只占自身的大小
- -行内元素在页面中左向右水平排列，如果一行之中不则元素会换到第二行继续自左向右排列
- -行内元素的默认宽度和高度都是被内容撑开

## 6、高度塌陷和BFC

```html
<div>
    <div class="box1">
        <div class="box2"></div>
        <div class="box3"></div>
    </div>
</div>
当box2设置浮动之后，box1就会产生高度塌陷
解决方法有可以为父元素box1设置overflow
或者增加一个空的box3，设置clear:both; 用结构解决表现问题
或者使用伪元素box1的最后一个位置
.box1::after{
	content: '';
	display: block;   // 默认是行内元素，要转换为块元素
	clear: both;
}
```

### 高度塌陷

在浮动布局中,父元素的高度默认是被子元素撑开的,

当子元素浮动后，其会完全脱高文档流，子元素从文档流中脱离将会无法撑起父元素的高度，导致父元素的高度丢失

父元素高度丢失以后，其下的元素会自动上移，导致页面的布局混乱

所以高度塌陷是浮动布局中比较常见的一个问题，这个问题我们必须要进行处理!

### BFC

**BFC(Block Formatting Context）块级格式化环境**

BFC是一个css中的一个隐含的属性,可以为一个元素开启BFC

开启BFC该元素会变成一个独立的布局区域

-元素开启BFC后的特点:

- 1.开启BFc的元素不会被浮动元素所覆盖
- 2.开启BFc的元素子元素和父元素外边距不会重叠
- 3.开启BFc的元素可以包含浮动的子元素

-可以通过一些特殊方式来开启元素的BFC;

- 1、设置元素的浮动
- 2、将元素设置为行内块元素（不推荐)
- 3、将元素的overflow设置为一个非visible的值
      -常用的方式为元素设置overflow:hidden开启其BFC以使其可以包含浮动元素

### clear

如果我们不希望某个元素因为其他元素浮动的影响而改变位置，可以通过clear属性来清除浮动元素对当前元素所产生的影响

-作用:

- 清除浮动元素对当前元素所产生的影响

-可选值:

- left 清除左侧浮动元素对当前元素的影响
- right 清除右侧浮动元素对当前元素的影响
- both 清除两侧中最大影响的那侧

原理:

- 设置清除浮动以后，浏览器会自动为元素添加一个**上外边距**，以使其位置不受其他元素的影响

## 7、clearfix

专门用来解决高度塌陷和父子元素外边距重叠的问题

```css
// 这样可以解决父子元素外边距重叠问题
::before{
    content: '';
    display: table;
}

// 最终解决方案
.clearfix::before,
.clearfix::after{
    content: '';
    display: table;
    clear: both;
}

添加这样一个样式，然后为需要的元素添加一个clearfixl
```

## 8、定位

### 定位（position)

- -定位是一种更加高级的布局手段
- -通过定位可以将元素摆放到页面的任意位置
- -使用position属性来设置定位

可选值:

- static默认值，元素是静止的没有开启定位
- relative开启元素的相对定位
- absolute开启元素的绝对定位
- fixed开启元素的固定定位
- sticky开启元素的粘滞定位

### 相对定位:

#### 相对定位

-当元素的position属性值设置为relative时则开启了元素的相对定位

#### 相对定位的特点:

- 1.元素开启相对定位以后，如果不设置偏移量元素不会发生任何的变化
- 2.相对定位是参照于元素在文档流中的位置进行定位的
- 3.相对定位会提升元素的层级
- 4.相对定位不会使元素脱离文档流
- 5.相对定位不会改变元素的性质块还是块，行内还是行内

#### 偏移量（offset)

-当元素开启了定位以后，可以通过偏移量来设置元素的位置

- top
  - -定位元素和定位位置上边的距高
- bottom
  - -定位元素和定位位置下边的距离
  - -定位元素垂直方向的位置由top和bottom两个属性来控制
  - 通常情况下我们只会使用其中一
  - top值越大，定位元素越向下移动
  - bottom值越大，定位元素越向上移动

- left
  - -定位元素和定位位置的左侧距高

- right
  - -定位元素和定位位置的右侧距高
  - -定位元素水平方向的位置由left和right两个届性控制
    通常情况下只会使用一个
  - left越大元素越靠右
  - right越大元素越靠左

### 绝对定位

#### 绝对定位

当元素的position属性值设置为absolute时，则开启了元素的绝对定位

#### 绝对定位的特点;

- 1.开启绝对定位后，如果不设置偏移量元素的位置不会发生变化
- 2.开启绝对定位后，元素会从文档流中脱离
- 3.绝对定位会改变元素的性质，行内变成块，块的宽高被内容撑开
- 4.绝对定位会使元素提升一个层级
- 5.绝对定位元素是相对于其包含块进行定位的

#### 包含块( containing block )

-正常情况下:

包含块就是离当前元素最近的祖先块元素

-绝对定位的包含块

- 包含块就是离它最近的开启了定位的祖先元素，
- 如果所有的祖先元素都没有开启定位则根元素就是它的包含块
- html（根元素、初始包含块)

### 粘滞定位

-当元素的position属性设置为sticky时则开启了元素的粘滞定位

-粘滞定位和相对定位的特点基本一致,

不同的是粘滞定位可以在元素到达某个位置时将其固定

```css
position: fixed; 
top: 10px;
// 固定在10px的位置，这种方式兼容性差，一般不采用
```

### 层级

对于开启了定位元素，可以通过z-index属性来指定元素的层级

z-index需要一个整数作为参数,值越大元素的层级越高，元素的层级越高越优先显示

如果元素的层级一样，则优先显示靠下的元素

祖先的元素的层级再高也不会盖住后代元素

## 9、字体

### 自提供字体

```css
/* font-face可以将服务器中的字体直接提供给用户去使用*/
@font-face {
	/*指定字体的名字*/
    font-family : 'myfont' ;
    /*服务器中字体的路径*/
	src: url( './font/zCOOLKuaiLe-Regular.ttf');
}

// 使用
div{
    font-family: myf
}

```

### 文本对齐

```css
/*水平对齐*/
text-align: 
	center  居中对齐，两边可能会留空
	left	左对齐，左边不留空，默认值
	right	右对齐，右边不留空
	justify	两端对齐，通过调整间距，是两边都不留空

/*垂直对齐*/
vertical-align:
	baseline	默认值，基线对齐
	top			顶部对齐
	bottom		底部对齐
	middle		居中对齐，这个一般的居中对齐，是有一个特定的标准，x对齐
```

### 文本常用样式

```css
/*装饰*/
text-decoration:
	none	无
	underline	下划线
	line-through	删除线
	overline	上划线
可以在后面追加颜色，形式等等，但是ie不支持
text-decoration: underline red dotted;

/*一行文字，多余省略号,四个属性，缺一不可*/
div{
	width: 200px;
    white-space: nowrap;
    /*
    	white-space:设置网页如何处理空白
    	normal: 正常
    	nowrap: 不换行
    	pre: 保留空白，即html中如何写的，就如何显示
    */
    overflow: hidden;
    /*w*/
    text-overflow: ellipsis;
}
```

## 10、雪碧图

雪碧图用于解决图片加载闪烁的问题

做法：将所有图片合并保存在一张大图片中，然后通过background-position来调整图片显示的区域，从而避免加载图片慢的问题，称为css-Sprite

```css
a:link{
    display: block;
    width: 93px;
    height: 30px;
    background-image: url('./xxx/xx.png');
}
a:hover{
    background-position: -93px 0;
}
a:active{
    background-position: -186px 0;
}
```

特点：一次性将多个图片加载进页面，降低请求的次数，加快访问速度，提升用户体验。

## 11、过渡(transition)

### 定义

通过过渡可以指定一个属性发生变化时的切换方式

通过过渡可以创建一些非常好的效果，提升用户的体验

### 使用

```css
/*
transition-property:指定要执行过渡的属性
多个属性间使用,隔开
如果所有属性都需要过渡，则使用a11关键字
大部分属性都支持过渡效果，注意过渡时必须是从一个有效数值向另外一个有效数值进行过渡
*/
transition-property: height , width;
transition-property: all;

/*
transition-duration:指定过渡效果的持续时间时间单位,s和ms 1s = 1000ms
*/
transition-duration: 100ms,2s;
transition-duration: 2s;

/*
transition-timing-function:过渡的时序函数
指定过渡的执行的方式
可选值:
ease默认值,慢速开始，先加速,再减速
linear匀速运动
ease-in加速运动
ease-out减速运动
ease-in-out先加速后减速

cubic-bezier() 来指定时序函数
https://cubic-bezier.com  这个网站可以生成贝塞尔曲线

steps() 分步执行过渡效果
可以设置一个第二个值:
end ,在时间结束时执行过渡(默认值)
start ,在时间开始时执行过渡
*/
transition-timing-function: cubic-bezier(.24, .95, .82, -0.88);
transition-timing-function: steps(2, start);

/*
transition-delay:过渡效果的延迟，等待一段时间后在执行过渡
*/
transition-delay: 2s;

/*
transition可以同时设置过渡相关的所有属性，只有一个要求，如果要写延迟，则两个时间中第一个是持续时间
*/
transition: 2s margin-left 1s cubic-bezier(.24, .95, .82, -0.88);

```

### 练习

```css
/*一张图片，多帧切换，可以实现动图效果*/
.box1{
    height: 200px;
    width: 200px;
    margin: 0 auto;
    background-image: url(image);
    background-position: 0 0;
    transition: 0.3s steps(3);
}
.box1:hover{
    background-position: -600px;
}
```

## 12、动画(animation)

### 定义

动画和过渡类似,都是可以实现一些动态的效果，

不同的是过渡需要在某个属性发生变化时才会触发，动画可以自动触发动态效果

设置动画效果，必须先要设置一个关键帧，关键帧设置了动画执行每一个步骤

```css
/*名字可以随便取*/
@keyframes test {
	/*to表示动画的开始位置也可以使用0%*/
    to{
		margin-left: 0;
        background-color: red;
    }
	/*from动画的结束位置也可以使用100%*/
    from{
		margin-left: 700px;
        background-color: blue;
    }
    /*可以进行多种设置*/
    /*动画进行到20%，60%，表示动画进行的进度*/
    20%, 60%, {
        margin-top: 400px;
        animation-timing-function: ease-in;
    }
    40%{
   		margin-top: 100px;
    }
    80%{
        margin-top: 200px;
    }

}
```

### 使用

```css
/* 
animation-name:要对当前元素生效的关键帧的名字
*/
animation-name: test;
/*animation-duration:动画的执行时间*/
animation-duration: 4s;
/*
动画的延时
*/
animation-delay: 2s;
/*
动画执行函数
*/
animation-timing-function: ease-in-out;
/*
animation-iteration-count动画执行的次数
可选值:
整数 次数
infinite 无限执行
*/
animation-iteration-count: 15;

/*
animation-direction
指定动画运行的方向
可选值:
normal 默认值 从 from 向 to 运行每次都是这样
reverse 从 to 向 from 运行每次都是这样
alternate 从 from 向 to 运行重复执行动画时反向执行
alternate-reverse 从 to 向 from 运行重复执行动画时反向执行
*/
animation-direction: alternate-reverse;
/*
animation-play-state:设置动画的执行状态可选值:
running 默认值动画执行
paused动画暂停
*/
animation-play-state: paused;
/*
animation-fill-mode: 动画的填充模式
可选值;
none 默认值动画执行完毕元素回到原来位置
forwards 动画执行完毕元素会停止在动画结束的位置
backwards 动画延时等待时,元素就会处于开始位置
both 结合了forwards和 backwards
*/
animation-fill-mode: both;

/*也可以直接用animation，一个设置所有属性，只不过要和过渡一样注意时间的顺序*/
```

## 13、变形(transform)

### 定义

变形就是指通过css来改变元素的形状或位置

变形不会影响到页面的布局

### 平移

#### 使用

```css
/*
transform用来设置元素的变形效果
-平移;
translateX()沿着x轴方向平移
translateY()沿着y轴方向平移
translateZ()沿着z轴方向平移
	-平移元素，百分比是相对于自身计算的
*/
transform: translateX(100px);
```

#### 用于居中布局

```css
/*
这种居中方式只适用于大小确定的元素
top: 0;
left: 0;
bottom: 0;
right: 0;
margin: auto;
*/

/*这种可以适用于宽高不确定的元素*/
left: 50%;
top: 50%;
transform: translateX(-50%) translateY(-50%);
```

#### z轴平移

**产生一种类似变大的效果**

一般在全局设置一下视距

```css
html{
	/*设置当前网页的视距为800px，人眼距离网页的距高*/
    perspective: 800px;
}
.box1{
	width: 200px;
    height: 200px;
	background-color: #bfa;
    margin: 200px auto;
    /*
    z轴平移，调整元素在z轴的位置，正常情况就是调整元素和人眼之间的距离，距离越大，元素离人越近
    z轴平移属于立体效果（近大远小)，默认情况下网页是不支持透视，如果需要看见效果，必须要设置网页的视距
    */
    transition: 2s;
}
.box1:hover{
    transform: translateZ(20px);
}

```

### 旋转

也必须要设置视距，否则x,y轴旋转没有好的效果

#### 使用

```css
/*
通过旋转可以使元素沿着x，y或z旋转指定的角度
rotatex()
rotateY()
rotatez()
*/
transform: rotatez(.25turn);
/*要注意写的顺序，呈现的效果会不同*/
transform: rotateY(180deg) translatez(400px);
transform: translatez(400px) rotateY(180deg);
transform: rotateY(180deg);;
/*是否显示元素的背面*/
backface-visibility: hidden;
```

### 缩放

#### 使用

```css
/*变形的原点默认值center*/
transform-origin : 20px 20px;
/*
对元素进行缩放的函数:
scaleX() 水平方向缩放
scaleY() 垂直方向缩放
scalc()  双方向的缩放
*/
transform:scale(2);

```

## 14、媒体查询

Media Queries能在不同的条件下使用不同的样式，使页面在不同在终端设备下达到不同的渲染效果。

```css
/*
媒体特性:
width视口的宽度
height视口的高度
min-width视口的最小宽度（视口大于指定宽度时生效)
max-width视口的最大宽度（视口小于指定宽度时生效)
@media (max-width: 50Opx){
    body{
    background-color: #bfa;
    }
}
样式切换的分界点，我们称其为断点，也就是网页的样式会在这个点时发生变化一般比较常用的断点
小于768	超小屏幕 max-width=768px
大于768	小屏幕 min-width=768px
大于992	中型屏幕 min-width=992px
大于1200 	大屏幕 min-width=1200px
*/
/*and是并集，与的关系   ,逗号是交集，或的关系*/
@media only screen and (min-width: 500px) and (max-width: 700px){
    // 这里面就是重置样式
    body{
    	background-color:#bfa;
    }
}

```



