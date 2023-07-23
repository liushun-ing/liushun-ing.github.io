# Sass

## 配置

vscode需要安装sass和live sass compiler

配置：在setting.json中追加以下内容

```json
/* 压缩设置 */
"liveSassCompile.settings.formats": [
    // This is Default.
    {
        "format": "expanded", // nested, expanded, compact, compressed
        "extensionName": ".css",
        // "savePath": "~/../css" // 为 null 表示当前目录
        "savePath": null
    }
],
/* 排除目录 */
"liveSassCompile.settings.excludeList": [
    "/**/node_modules/**",
    "/.vscode/**"
],
/* 是否生成对应的map */
"liveSassCompile.settings.generateMap": false,
/* 是否添加兼容前缀 如： -webkit- , -moz- ... */
"liveSassCompile.settings.autoprefix": [
    "> 1%",
    "last 2 versions"
],
"liveSassCompile.settings.watchOnLaunch": true,
```



## 注释

支持标准的 Css 的注释语法，单行注释 “//” 与多行注释 “/* */”。注释在 .scss 中的规则：

1. 单行注释，不会解析到 .css 文件中；
2. 如果选择的输出格式是 compressed ，则所有的注释信息都不会解析出来；
3. 在多行注释中添加 “!”，则可保留这条注释到压缩文件中，此方法主要用于文件的版权声明；
4. 多行注释中可以添加插值语句 (interpolation)

```scss
// 单行注释

/*
 * 多行注释 */

/*!
 * 版权声明
 * 作者: #{#author} */
```



## 语法特性

### 选择器嵌套 (Nested Selector)

存在和less一致的选择器嵌套



### 属性嵌套

属性嵌套大括号前面必须要括号

```scss
.div {
    font: {
        size: 16px;
        weight: bold;
    }
}

// 编译后
.div {
  font-size: 16px;
  font-weight: bold;
}
```



### 父选择器

存在&父选择器符号

```scss
a {
    color: #333;
    &:hover {
        text-decoration: underline;
        color: red;
    }
}
.top {
    border: 1px #ccc solid;
    &-left {
        float: left;
        width: 200px;
    }
}
```



### 占位符选择器%

有时需要定义一套样式，但并不给某个元素使用，必须在需要调用的时候才启用此样式库，使用 “%foo” 占位，通过 “@extend” 进行调用。%foo 名称可自己定义，前面需加上符号 “%“

```scss
// scss 代码编辑
.button%buttonStyle {
    width: 100px;
    height: 36px;
    display: inline-block;
}
.btn-default {
    @extend %buttonStyle;
    background-color: #333;
    color: #fff;
}
.btn-success {
    @extend %buttonStyle;
    background-color: #eee;
    color: green;
}

// 编译后的 css
.button.btn-default, .button.btn-success {
  width: 100px;
  height: 36px;
  display: inline-block;
}
.btn-default {
  background-color: #333;
  color: #fff;
}
.btn-success {
  background-color: #eee;
  color: green;
}
```





## 变量

### 变量的声明

使用符号 `$` 定义变量，变量名称可自己命名，赋值方法与 Css 相同。如：`$color: red;`

变量的定义与使用需有先后顺序，即先定义变量，然后再使用变量，书写的顺序则是将定义变量写在前面，使用变量写在后面。

```scss
// scss 代码编辑
$color: #f00;
.container {
    color: $color;
}

// 编译后的 css
.container {
  color: #f00;
}
```

### 变量的命名规则

1. 用符号 “$” 开头，后面跟随变量名称；
2. 变量名称需使用字母开头，中间可使用字母、数字、中横线（连接符）、下划线；
3. 支持大/小写字母。

如果多个单词的连接，可以使用横线 “-“、下划线 “_” 或驼峰式的命名形式，需要注意的是，如果同样的单词，分别采用横线与下划线来连接，此名称相当于是同一个名称，在解析时，会采用最后一个声明的变量来解析。因此在命名的时候建议统一使用一个符号。

```scss
// scss 代码编辑
$color: #f00;
$border_color: #0ff;
$border-color: #ff0;
$borderColor: #00f;
.container {
    color: $color;
    border-color: $border_color;
}

// 编译后的 css
.container {
  color: #f00;
  border-color: #ff0;
}
```

### 变量的默认值

可以使用 “!default” 为每个变量设置一个默认值，如果该变量没有被重新定义过，则会将该变量解析为默认值，如果已经有过定义，则会取其以定义过的值。以下代码已经有定义过该变量，因此获取的是定义过的值，默认值不会覆盖之前已经定义过的值。

```scss
// scss 代码编辑
$color: #333;
$color: #666 !default;
.container {
    color: $color;
}

// 编译后的 css
.container {
  color: #333;
}
```

### 变量的作用域

#### 局部变量

在选择器中定义的变量，只能在该选择器或该选择器的子选择器中使用

```scss
// scss 代码编辑
.container {
    $font-size: 16px;
    font-size: $font-size;
    .wrapper {
        font-size: $font-size;
    }
}

// 编译后的 css
.container {
  font-size: 16px;
}

.container .wrapper {
  font-size: 16px;
}
```

#### 全局变量

定义后的变量，可以在全局范围内使用，全局变量的定义有两种形式：

1、直接定义在最外面的变量，即是全局变量

```scss
// scss 代码编辑
$font-size: 16px;
.container {
    font-size: $font-size;
}
.footer {
    font-size: $font-size;
}

// 编译后的 css
.container {
  font-size: 16px;
}

.footer {
  font-size: 16px;
}
```

2、在选择器中定义的变量后面增加 “!global”，注意，!global 需添加在分号前，与变量值使用空格分割。

```scss
// scss 代码编辑
.container {
    $font-size: 16px !global;
    font-size: $font-size;
}
.footer {
    font-size: $font-size;
}

// 编译后的 css
.container {
  font-size: 16px;
}

.footer {
  font-size: 16px;
}
```



## 数据类型

> 数据类型

Scss 支持以下几种主要的数据类型：

1. 字符串（ 有引号或无引号的字符串 ）：”foo”, ‘bar’, baz, …
2. 数字：1, 2.5, 18px, 30%, 9a, …
3. 颜色：blue, #00ff00, rgba(0, 0, 0, .1)
4. 布尔型：true, false
5. 空值：null
6. 数组 (list)， 用逗号或空格分割：1em 2em 2.5em 或 Helvetica, Arial, sans-serif, …
7. maps，相当于 JavaScript 中的 object：key1: value1, key2: value2, …

判断数据类型的方式: type-of($value)

```scss
$layer-index: 10;
$font-base-family: 'Open Sans', Helvetica, sans-serif;
$top-bg-color: rgba(0,0,0,.1);
$block-base-padding: 6px 10px 6px 10px;
$blank-mode: true;
$var: null //值null是其类型的唯一值。他表示缺少值，通常由函数返回以指示缺少结果
$color-map: (color1: #f00, color2: #0f0, color3: #00f);
$fonts: (serif: "Helvetica Neue", monospace: "Consolas");
```



### 字符串 (Strings)

支持有引号的字符串与无引号的字符串，有引号的字符串，无论单引号还是双引号，编译后都为双引号，无引号的字符串编译后同样没有引号。如果一段话由多个单词组成，并且包含空格，需要将引号加上。

```scss
// scss 代码编辑
$string1: "Sample 1";
$string2: 'Sample 2';
$string3: red;
body {
    content: $string1;
    content: $string2;
    color: $string3;
}

// 编译后的 css
body {
  content: "Sample 1";
  content: "Sample 2";
  color: red;
}
```

### 数字 (Numbers)

1. 支持数字或带单位的数字，
2. 支持整数或小数
3. 支持正数与负数

```scss
$number1: 30;
$number2: 6.9;
$number3: 16px;
$number4: 32a; // 不规范，但不会报错
// 注：数字后接的任何字母都会视为单位，单位会和数字当作一个整体进行计算
```

### 颜色 (Colors)

Css 原有颜色类型，包括十六进制、RGB、RGBA、HSL、HSLA和色彩单词

### 布尔型 (Booleans)

只有两个值 “true” 和 “false”，只有自身是 false 或 null 才会返回 false，其他一切都会返回 true，主要用于逻辑判断。

### 空值 (Null)

只有一个值 “null”，如 “$name: null;”。由于他为空，因此不能使用它与任何类型进行运算，主要用于逻辑判断。

### 数组 (Lists)

通过空格或半角逗号分割的一系列的值，数组中还可以包含子数组，如下方的 “$list2” 和 “$list3″，当数组被编译为 css 时，圆括号不会被添加

```scss
$list1: 1px 2px 3px 4px; //一维数字
$list2: 1px 2px, 3px 4px; //二维数字
$list3: (1px 2px) (3px 4px); //二维数字
// 指定数组中的某个值进行调用
nth($list, 2);
```

### 映射 (Maps)

Maps 必须被圆括号包裹，可以映射任何键值对

```scss
$map: (
  key1: value1,
  key2: value2,
  key3: value3
)
```

#### 映射函数

返回 Map 中 key 所对应的值( value )。如没有对应的 key，则返回 null 值。

```scss
map-get(map, key)

$font-sizes: ("small": 12px, "normal": 18px, "large": 24px)
map-get($font-sizes, "small")
结果: 12px
```

判断 map 是否有对应的 key，存在返回 true，否则返回 false

```scss
map-has-key(map, key)

实例:
$font-sizes: ("small": 12px, "normal": 18px, "large": 24px)
map-has-key($font-sizes, "big")
结果: false
```

返回 map 中所有的 key 组成的队列

```scss
map-keys(map)

实例:
$font-sizes: ("small": 12px, "normal": 18px, "large": 24px)
map-keys($font-sizes)
结果: "small", "normal", "large"
```

合并两个 map 形成一个新的 map 类型，即将 *map2* 添加到 *map1*的尾部

```scss
map-merge(map1, map2)

实例:
$font-sizes: ("small": 12px, "normal": 18px, "large": 24px)
$font-sizes2: ("x-large": 30px, "xx-large": 36px)
map-merge($font-sizes, $font-sizes2)
结果: "small": 12px, "normal": 18px, "large": 24px, "x-large": 30px, "xx-large": 36px
```

移除 *map* 中的 keys，多个 key 使用逗号隔开

```scss
map-remove(map, keys...)

实例:
$font-sizes: ("small": 12px, "normal": 18px, "large": 24px)
map-remove($font-sizes, "small")
结果: ("normal": 18px, "large": 24px)
map-remove($font-sizes, "small", "large")
结果: ("normal": 18px)
```

返回 *map* 中所有的 value 并生成一个队列

```scss
map-values(map)

实例:
$font-sizes: ("small": 12px, "normal": 18px, "large": 24px)
map-values($font-sizes)
结果: 12px, 18px, 24px
```



## 文件导入

使用 @import 进行文件的导入

### 导入 .scss 文件

导入 .scss 文件的方式，使用 @import ” 进行导入，文件名可以有 .scss 后缀，也可以省略

```scss
// 方法1
@import 'main.scss';

// 方法2
@import 'main';
```

注：导入的 .scss 文件，由于该文件内的代码会重新在发生导入的文件中生成，所以无需再单独生成一个被导入的文件的 .css 文件，解决的方法是在被导入的文件名前增加一个下划线 “_” 的符号，这样可以保证该文件不会被编译生成 .css 文件，而在导入该文件时，前面的下划线可以写也可以省略：

```scss
// 以下代码表示将导入一个名为 “_main.scss” 的文件
// 方法1
@import 'main';

// 方法2
@import '_main';
```

导入文件同样也可以写入选择器中，写入选择器后，导入的文件中的所有变量将只适用于该选择器，同时导入的文件中的所有选择器前也会增加发生导入的选择器前的名称：

```scss
.container {
    @import 'main';
    color: $color; 
}
```



### 导入普通的 .css 文件

以下几种方式，只会将文件作为普通的 css 语句进行引入

1. 文件拓展名为 .css
2. 文件名以 http:// 或 https:// 开头
3. 文件由 url() 的形式引入
4. @import 包含 media queries

```scss
@import 'main.css';
@import 'http://puji.design/main.css';
@import url(main);
@import 'landscape' screen and (orientation: landscape);
```

注：采用 @import ‘main.css’ 这种形式引入文件，编译后，文件地址将为计算机的绝对地址，这样的引入形式慎用，建议采用 @import url(main) 的方式。



## 混合指令

混合指令用于定义可重复使用的样式。混合指令可以包含所有的 Css 规则与绝大部分 Sass 规则，甚至通过参数功能引入变量，输出多样化的样式。

### 定义与使用混合指令

使用 @mixin 定义混合指令以及使用 @include 进行调用

#### 基础写法

```scss
// scss 代码编辑
// 定义混合指令
@mixin name {
    width: 1200px;
    margin: 0 auto;
    height: 600px;
}

// 调用混合指令
.container {
    @include name;
}

// 编译后的 css
.container {
  width: 1200px;
  margin: 0 auto;
  height: 600px;
}
```

#### 混合指令中添加选择器

```scss
// scss 代码编辑
// 定义混合指令
@mixin name {
    .wrap {
        width: 1200px;
        margin: 0 auto;
        height: 600px;
    }
}
// 调用混合指令
.container {
    @include name;
}

// 编译后的 css
.container .wrap {
  width: 1200px;
  margin: 0 auto;
  height: 600px;
}
```

#### 带参数的混合指令

使用 $name 给参数命名，在调用的时候给参数赋值：

```scss
// scss 代码编辑
// 定义混合指令
@mixin flex-align($aligndirect) {
    -webkit-box-align: $aligndirect;
    -webkit-align-item: $aligndirect;
    -ms-flex-align: $aligndirect;
    align-items: $aligndirect;
}
// 调用混合指令
.container {
    @include flex-align(center);
}

// 编译后的 css
.container {
  -webkit-box-align: center;
  -webkit-align-item: center;
  -ms-flex-align: center;
  align-items: center;
}
```

参数可以写一个也可写多个，参数的数目与顺序需一一对应：

```scss
// scss 代码编辑
// 定义混合指令
@mixin block-padding($top, $right, $bottom, $left) {
    padding: $top, $right, $bottom, $left;
}
// 调用混合指令
.container {
    @include block-padding(8px, 36px, 12px, 36px)
}

// 编译后的 css
.container {
  padding: 8px, 36px, 12px, 36px;
}
```

给指定参数赋值，顺序可随意调整，如以下代码，编译后的 css 也是相同的结果：

```scss
// scss 代码编辑
// 定义混合指令
@mixin block-padding($top, $right, $bottom, $left) {
    padding: $top, $right, $bottom, $left;
}
// 调用混合指令
.container {
    @include block-padding($right:36px, $left:36px, $top:8px, $bottom:12px)
}
```

给参数添加默认值后，在调用时指定参数，未指定的参数将使用默认值：

```scss
// scss 代码编辑
// 定义混合指令
@mixin block-padding($top:0, $right:0, $bottom:0, $left:0) {
    padding: $top, $right, $bottom, $left;
}
// 调用混合指令
.container {
    @include block-padding($top:8px, $bottom:12px)
}

// 编译后的 css
.container {
  padding: 8px, 0, 12px, 0;
}
```

混合指令中的参数可设置为一个数组形式，以 “$name…” 表示：

```scss
// scss 代码编辑
// 定义混合指令
@mixin linear-gradient($direction, $gradients...) {
    background-color: nth($gradients, 1);
    background-image: linear-gradient($direction, $gradients);
}
// 调用混合指令
.container {
    @include linear-gradient(to right, #f00, orange, yellow);
}

// 编译后的 css
.container {
  background-color: #f00;
  background-image: -webkit-gradient(linear, left top, right top, from(#f00), color-stop(orange), to(yellow));
  background-image: linear-gradient(to right, #f00, orange, yellow);
}
```



### 混合指令总结

1. 混合指令 ( @mixin ) 是可以重复使用的一组 Css 声明；
2. 有助于减少重复代码，只需声明一次就可以在文件中反复引用；
3. 包含所有 Css 规则以及绝大部分 Sass 规则，甚至通过参数引入变量；
4. 使用参数时，建议加上默认值。





## 继承指令

在不同的元素具有完全相同的样式与 Css 属性时，可以使用继承指令实现，继承指令 `@extend`

### 基本用法

```scss
// scss 代码编辑
.alert {
    margin: 8px 12px;
    width: 100%;
    font-size: 16px;
}
.alert-info {
    @extend .alert;
    background: rgb(238, 238, 238);
    color: rgb(54, 54, 54);
}
.alert-success {
    @extend .alert;
    background: rgb(225, 250, 242);
    color: rgb(13, 112, 79);
}
.alert-error {
    @extend .alert;
    background: rgb(250, 225, 225);
    color: rgb(112, 13, 18);
}

// 编译后的 css
.alert, .alert-info, .alert-success, .alert-error {
  margin: 8px 12px;
  width: 100%;
  font-size: 16px;
}

.alert-info {
  background: #eeeeee;
  color: #363636;
}

.alert-success {
  background: #e1faf2;
  color: #0d704f;
}

.alert-error {
  background: #fae1e1;
  color: #700d12;
}
```

一个选择器中可以实现多个继承的形式，如：

```scss
// scss 代码编辑
.alert {
    margin: 8px 12px;
    width: 100%;
    font-size: 16px;
}
.additional {
    border-radius: 4px;
}
.alert-info {
    @extend .alert;
    @extend .additional;
    background: rgb(238, 238, 238);
    color: rgb(54, 54, 54);
}

// 编译后的 css
.alert, .alert-info {
  margin: 8px 12px;
  width: 100%;
  font-size: 16px;
}

.additional, .alert-info {
  border-radius: 4px;
}

.alert-info {
  background: #eeeeee;
  color: #363636;
}
```

多层继承形式：

```scss
// scss 代码编辑
.alert {
    margin: 8px 12px;
    width: 100%;
    font-size: 16px;
}
.additional {
    @extend .alert;
    border-radius: 4px;
}
.alert-info {
    @extend .additional;
    background: rgb(238, 238, 238);
    color: rgb(54, 54, 54);
}

// 编译后的 css
.alert, .additional, .alert-info {
  margin: 8px 12px;
  width: 100%;
  font-size: 16px;
}

.additional, .alert-info {
  border-radius: 4px;
}

.alert-info {
  background: #eeeeee;
  color: #363636;
}
```



### 使用占位符选择器

使用占位符选择器的好处，是原始的代码不会在 Css 文件中编译，保持代码的简介干净

```scss
// scss 代码编辑 // alert编译后不会存在了
%alert {
    margin: 8px 12px;
    width: 100%;
    font-size: 16px;
}
.alert-info {
    @extend %alert;
    background: rgb(238, 238, 238);
    color: rgb(54, 54, 54);
}
.alert-success {
    @extend %alert;
    background: rgb(225, 250, 242);
    color: rgb(13, 112, 79);
}
.alert-error {
    @extend %alert;
    background: rgb(250, 225, 225);
    color: rgb(112, 13, 18);
}

// 编译后的 css
.alert-info, .alert-success, .alert-error {
  margin: 8px 12px;
  width: 100%;
  font-size: 16px;
}

.alert-info {
  background: #eeeeee;
  color: #363636;
}

.alert-success {
  background: #e1faf2;
  color: #0d704f;
}

.alert-error {
  background: #fae1e1;
  color: #700d12;
}
```





## 运算符

### 相等运算符

所有数据类型都支持等号运算符，等于使用 “==” 表示，不等于使用 “!=” 表示

```scss
// scss 代码编辑
$color: 1;
.container {
    @if $color == 1 {
        color: red;
    }
    @else {
        color: blue;
    }
}

// 编译后的 css
.container {
  color: red;
}
// scss 代码编辑
$color: "red";
.container {
    @if $color != "red" {
        color: red;
    }
    @else {
        color: blue;
    }
}

// 编译后的 css
.container {
  color: blue;
}
```

### 关系（比较）运算符

关系运算符只支持数字，使用的符号分别是大于号 “>”，小于号 “<“，大于等于号 “>=” 与小于等于号 “<=” ，返回值 “true” 或 “false”，主要应用于条件判断

```scss
$a: 1 > 2; //false
$a: 1 < 2; //true
$a: 1 >= 2; //false
$a: 1 <= 2; //true
```

### 布尔运算符

布尔运算符包含三种形式，分别是与 “and”、 或”or”、 非”not”。

```scss
// scss 代码编辑
$width: 100;
$height: 200;
$last: false;
div {
    // 两个条件都满足时
    @if $width > 50 and $height < 300 {
        font-size: 16px;
    }
    @else {
        font-size: 20px;
    }
    // 任意条件满足时
    @if $width > 200 or $height < 300 {
        color: red;
    }
    @else {
        color: blue;
    }
    // 判断是否为真
    @if not $last {
        line-height: 2em;
    }
    @else {
        line-height: 1em;
    }
}

// 编译后的 css
div {
  font-size: 16px;
  color: red;
  line-height: 2em;
}
```

### 数字运算符

数字运算符包含加”+”，减”-“，乘”*”，除”/”与取模”%”，取模即是两个数字相除取余数。

#### 基本用法

```scss
// 纯数字相加
$plus1: 30 + 30; //60
$plus2: 30px + 30; //60px
$plus3: 30% + 30%; //60%
$plus4: 30px + 30pt; //70px
$plus5: 30px + 30pt + 30pc; //550px

//纯数字相减
$minus1: 60 - 30; //30
$minus2: 60px - 30; //30px
$minus3: 60% - 30%; //30%
$minus4: 60px - 30pt; //20px
$minus5: 60px - 30pt - 30pc; //-460px

//纯数字相乘
$multipl1: 60 * 30; //1800
$multipl2: 60px * 30; //1800px
$multipl3: 60% * 30; //1800%
$multipl4: 60px * 30 * 30; //54000px

//纯数字相除
$division1: (60 / 30); //2
$division2: (60px / 30); //2px
$division3: (60% / 30%); //2
$division4: (60px / 30pt); //1.5
$division5: (60px / 30 / 30); //0.06667px

//纯数字取模
$modulo1: 60 % 9; //6
$modulo2: 60px % 9; //6px
$modulo3: 60% % 9%; //6%
$modulo4: 60px % 9pt; //0px
$modulo5: 60px % 9 % 5; //1px
```

#### 混合用法

```scss
// 数字，字符串相加
$plus1: a + b; //ab
$plus2: "a" + "b"; //"ab"
$plus3: 'a' + 'b'; //"ab"
$plus4: 'a' + b; //"ab"
$plus5: a + 'b'; //ab
$plus6: 'a' + 1; //"a1"
$plus7: "1" + a; //"1a"

// 数字，字符串相减
$minus1: a - b; //a-b
$minus2: "a" - "b"; //"a"-"b"
$minus3: 'a' - 'b'; //"a"-"b"
$minus4: 'a' - b; //"a"-b
$minus5: a - 'b'; //a-"b"
$minus6: 'a' - 1; //"a"-1
$minus7: "1" - a; //"1"-a
$minus8: 1 - "a"; //1-"a"

// 数字无法与纯字符串相乘

// 数字无法与纯字符串相除

// 数字无法与纯字符串取模
```

1. 字符串相加时，如果前面一个值带引号，计算的结果同样带引号，反之；
2. 数字与字符串混合相加时，第一位有引号或第一位是数字，且后最后一位有引号时，结果必定有引号

#### 除法运算情景

如果直接在值之间使用 “/” ，不可被视为除法运算，仅当一下三种情况时会以除法进行运算：

1. 如果值或值的一部分是变量或函数的返回值
2. 如果值被圆括号包裹
3. 如果值是算数表达式的一部分

```scss
// scss 代码编辑
$width: 100px;
div {
    width: $width / 2; //使用变量
    z-index: round($number: 10) / 2; //使用函数
    height: (500px / 2); //使用圆括号
    margin-left: 5px + 8/2; //使用了+表达式
}

// 编译后的 css
div {
  width: 50px;
  z-index: 5;
  height: 250px;
  margin-left: 9px;
}
```

#### 规则总结

1. 运算符号与值之间建议使用空格隔开；
2. 数字可以只声明其中一个符号或单位，计算的结果将以声明的符号或单位进行编译，声明单位或符号时，**建议在第一个数字上进行声明**；
3. 当不同符号且符号之间不可以进行换算时，无法计算出结果，如 20px + 10%无计算，”px” + “pt” 则可进行计算；
4. 当不同单位进行运算，结果会显示以运算公式开头的数字设置的单位；
5. 在乘法运算时，只需为一个数字声明单位，为多个数字声明同样或不同的单位都会报错；
6. 在除法运算时，如需声明单位，单位建议标注在除号前面的值；
7. 书写公式时，建议将所有公式都使用圆括号包裹。

#### 书写建议示范

```scss
// scss 代码编辑
.plus {
    width: (30 + 30);
    width: (30% + 30);
    width: (30px + 30pt);
    width: (30px + 30pt + 30pc);
}
.minus {
    width: (60 - 30);
    width: (60% - 30);
    width: (60px - 30pt);
    width: (60px - 30pt - 30pc);
}
.multipl {
    width: (60 * 30);
    width: (60% * 30);
    width: (60px * 30);
    width: (60px * 30 * 30);
}
.division {
    width: (60 / 30);
    width: (60% / 30);
    width: (60px / 30);
    width: (60px / 30pt / 30);
}
.modulo {
    width: (60 % 9);
    width: (60% % 9);
    width: 60% % 9%;
    width: 60px % 6pt % 0.12;
}

// 编译后的 css
.plus {
  width: 60;
  width: 60%;
  width: 70px;
  width: 550px;
}
.minus {
  width: 30;
  width: 30%;
  width: 20px;
  width: -460px;
}
.multipl {
  width: 1800;
  width: 1800%;
  width: 1800px;
  width: 54000px;
}
.division {
  width: 2;
  width: 2%;
  width: 2px;
  width: 0.05;
}
.modulo {
  width: 6;
  width: 6%;
  width: 6%;
  width: 0.04px;
}
```

### 字符串运算

使用加号”+” 可连接字符串，如字符串前面带引号后面不带，编译出的结果会带引号，反之。

```scss
// scss 代码编辑
.container {
    content: "Foo" + bar;
    font-family: sans- + "serif";
}

// 编译后的 css
.container {
  content: "Foobar";
  font-family: sans-serif;
}
```





## 插值语句

常使用于选择器、属性名、属性值、注释等地。如下示例，`font: #{$font-size}/#{$line-height} Helvetica`当两个变量使用 “/” 时，程序会自动运算出值，如使用插值语句，则可避免运算出结果

```scss
// scss 代码编辑
$author: 'PUJI Design';
$class-name: danger;
$attr: color;
$font-size: 16px;
$line-height: 30px;

/*
 * 插值语句示例
 * @author: #{$author} */
a.#{$class-name} {
    font: #{$font-size}/#{$line-height} Helvetica;
    font-#{$attr}: red;
}

// 编译后的 css
/*
 * 插值语句示例
 * @author: PUJI Design */
a.danger {
  font: 16px/30px Helvetica;
  font-color: red;
}
```



## 一些指令

### @if

```scss
@mixin triangle($direction: top, $size: 30px, $border-color: black) {
  width: 0;
  height: 0;
  display: inline-block;
  border-width: $size;
  border-#{$direction}-width: 0;

  @if ($direction==top) {
    border-color: transparent transparent $border-color transparent;
    border-style: dashed dashed solid dashed;
  }

  @else if ($direction==right) {
    border-color: transparent transparent transparent $border-color;
    border-style: dashed dashed dashed solid;
  }

  @else if ($direction==bottom) {
    border-color: $border-color transparent transparent transparent;
    border-style: solid dashed dashed dashed;
  }

  @else if ($direction==left) {
    border-color: transparent $border-color transparent transparent;
    border-style: dashed solid dashed dashed;
  }
}
```



### @for

```scss
// 1-3
@for $i from 1 to 4 {
  .p#{$i} {
    width: 1epx*$i;
    height: 30px;
    background-color: red;
  }
}

//  1-4
@for $i from 1 through 4 {
  .p#{$i} {
    width: 1epx * $i;
    height: 30px;
    background-color: red;
  }
}
```



### @each

```scss
$color-list: red blue orange;
@each $color in $color-list {
  $index: index($color-list, $color);

  .p#{$index - 1} {
    background-color: $color;
  }
}

// css
.p0 {
  background-color: red;
}

.p1 {
  background-color: blue;
}

.p2 {
  background-color: orange;
}
```



### @while

```scss
$column: 12;

@while $column >0 {
  .col-sm-#{$column} {
    //width: $column / 12 * 100%;
    //width: $column / 12 * 100 + %; //会标红
    //width: $column / 12 * 100#{'%'};
    width: unquote($string: $column / 12 * 100 + "%");
  }

  $column: $column - 1;
}
```



### @function

```scss
/**
  *定义线性渐变
  *@param $direction方向
  *@param sgradients颜色过度的值列表
  */
@function background-linear-gradient($direction, $gradients...) {
  @return linear-gradient($direction, $gradients);
}

body {
  background-image: background-linear-gradient(to right, red, green, Oblue);
}
```

混入mixin和函数function的区别

- 混入mixin主要是通过传递参数的方式输出多样化的样式，为了可以现实代码复用。
- 函数的功能主要是通过传递参数后，经过函数内部的计算，最后@return输出一个值。



> 三元条件if函数的使用

```scss
$theme: light;
.container {
  color: if($theme == 'light', #000, #FFF);
}
```



### @use

从其他Sass样式表加载mixin ，function和变量，并将来自多个样式表的CSS组合在一起，@use加载的样式表被称为"模块”，多次引入只包含一次。@use也可以看作是对@import的增强

```scss
@use "uses/common" ;
@use "uses/global" as g1;
@use "uses/global" as g2;
body {
	font-size: common.$font-size;
	width: common.column-width(3, 12);
    @include common.bgcolor(#F08);
    @include g1.base(#Fe0);
	@include g2.base(#ee0);
}

```

- @use引入同一个文件多次，不会重复引入，而@import会重复引入
- @use引入的文件都是一个模块默认以文件名作为模块名，可通过as alias取别名
- @use引入多个文件时，每个文件都是单独的模块，相同变量名不会覆盖，通过模块名访问，而@import变量会被覆盖
- @use方式可通过@use 'xxx' as * 来取消命名空间，建议不要这么做
- @use模块内可通过`$-`来定义私有成员，也就是说或者`-`开头的Variables mixins functions不会被引入
- @use模块内变是可通过! default定义默认值，引入时可通用with (...）的方式修改
- 可定义-index.scss或_index.scss来合并多个scss文件，它@use默认加载文件