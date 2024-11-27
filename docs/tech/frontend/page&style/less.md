# less

## 注释

```less
/*
 * 编译css后可见注释
 */

// 编译后不可见注释
```



## 变量

```less
@w: 200px;
@border: 1px solid #fff;
@property: color;
@value: red;
@images: '../image';

// 用变量去定义一个属性名的时候，使用时需要加大括号
// 定义路径使用时需要在外围加引号
.box {
  width: @w;
  border: @border;
  @{property}: @value;
  background-@{property}: @value;
  background-image: url('@{images}/xxx.jpg');
}
```



## 混合

```less
@width: 208px;
@border: 5px solid #fe0;
.class {
  font: 20px/ 40px "微软雅黑";
  color: #fff;
  text-align: center;
  background: green;
  border: @border;
}
//混合写法，把另一个选择器的名字放在这个样式里，这个样式就会具有放入的选择器的样式
.box1 {
  width: @width;
  height: @width;
  .class;
}
.box2 {
  width: 300px;
  height: 300px;
  .class;
  .bg(red);
}

// 可以传递参数
.bg(@bg) {
  background: @bg;
}
// 带默认值
.bg(@bg: green) {
  background: @bg;
}

//混合带多个参数
.border2(@w:10px, @style:solid, @color:#000){
	border: @w @style @color;
}
.box5{
	height: 300px;
    .border2();
	.border2(@w:30px);
	.border2(@style:dotted);
    .border2(@color:#f00);
}
```



## 匹配模式

匹配模式就是当存在一些样式有多种选择时，而可选用匹配模式设置条件，然后简化书写

```less
//匹配模式
.triangle(top,@w:5px,@c:red){
	border-width: @w;
	border-color: transparent transparent @c transparent;
    border-style: dashed dashed solid dashed;
}
.triangle(right,@w:5px,@c:red){
	border-width: @w;
	border-color: transparent transparent transparent @c;
    border-style: dashed dashed dashed solid;
}
.triangle(bottom,@w:5px,@c:red){
	border-width: @w;
	border-color: @c transparent transparent transparent;
    border-style: solid dashed dashed dashed;
}
.triangle(left,@w:5px,@c:red){
	border-width: @w;
	border-color: transparent @c transparent transparent;
    border-style: dashed solid dashed dashed ;
}

//公用的样式，需要放到下面这个class里，第一个参数是固定的格式(@_),后面的参数与上面保持一致
.triangle(@_,@w:5px,@c:red){
	width: 0;
	height: 0;
	overflow: hidden;
}
.box2{
	.triangle(top,50px,green);
    .triangle(right,50px,green);
    .triangle(bottom,5opx,green);
    .triangle(left,50px,green);
}

.pos(r) {
	position: relative;
}
.pos(a) {
	position: absolute;
}
.pos(f){
	position: fixed;
}
.box4{
	.pos(r);
	.pos(a);
	.pos(f);
    left:10px;
    top:20px;
    width:200px;
    height:200px;
    background:red;
}

```



## 嵌套

嵌套就是可以按照div的标签结构去书写样式

```less
.box1 {
    .box2 {
        ul{
            li{
                
            }
        }
        // &表示父级选择器，这里也就是.box2
        &:hover {
            
        }
    }
}
```



## 运算

```less
@size:300px;

// 减号左右要加空格
.boxx {
  width: @size+100;
  height: @size - 100px;
  top: @size*2;
  bottom: (@size/3); // 编译后变成100px
  bottom: @size/3;  // 编译为300px/3
  // ~'' 包裹的样式不会编译解析
  filter: ~'alpha(opacity=50)';
}
```

