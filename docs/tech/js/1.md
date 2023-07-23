# js小知识

## 1、拼接数组

```js
list1 = list1.concat(list2);
```



## 2、替换对象的键名称

将对象数组中的id替换为new_id

```js
let obj = [{id:1,name:"张三"},{id:2,name:"李四"}].map(function (item) {
    return{
        "new_id": item.id,
        "new_name": item.name
    }
})
```



## 3、常用math库

### 3.1 math.round

四舍五入，注意负数的四舍五入

```js
Math.round(-1.2) = -1.2
Math.round(-1.5) = -16
Math.round(-1.8) = -2
```

### 3.2 Math.ceil

向上取整，小数部分直接舍去，正数整数部分加一，负数整数部分不变

```js
Math.ceil(-16.5) = -16
Math.ceil(14.4) = 14
Math.ceil(-16.2) = -16
```

### 3.3 Math.floor

向下取整，小数部分直接不要，正数整数部分不变，负数整数部分加一

```js
Math.floor(3.7) = 3
Math.floor(-3.2) = -4
```

## 4、slice操作数组

```js
arr.slice(index, number);
// 删除从index开始的number个元素
arr.slice(index, number, object);
// 将从index开始的number个元素替换为object
arr.slice(index, 0, object);
// 在index开始的位置添加元素object
```

## 5、将一个对象按键赋值给另一个对象

只保留已有的键

```js
let obj = {
    name: "张三",
    age: "20"
}
let newObj = {
    name: "李四",
    age: "30",
    id: "4"
}
Object.keys(obj).forEach((key) => {
    obj[key] = newObj[key];
});
console.log(obj);  

//obj打印结果为如下：
{
	name: "李四",
    age: "30"
}
```

## 6、filter函数

filter()方法会创建一个新数组，原数组的每个元素传入回调函数中，回调函数中有return返回值，若返回值为true，这个元素保存到新数组中；若返回值为false，则该元素不保存到新数组中；原数组不发生改变。

使用filter函数去除数组的重复值

```js
'use strict';

var arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];
let r = arr.filter((item, index, self) => {
   　　return self.indexOf(item) === index;
　　});
console.log(r.toString());
// item是必选的，index和self是可选的
// apple,strawberry,banana,pear,orange
```

## 7、时间

Date() 返回当日的日期和时间。 

getDate() 从 Date 对象返回一个月中的某一天 (1 ~ 31)。 

getDay() 从 Date 对象返回一周中的某一天 (0 ~ 6)。 

getMonth() 从 Date 对象返回月份 (0 ~ 11)。 

getFullYear() 从 Date 对象以四位数字返回年份。 

getYear() 请使用 getFullYear() 方法代替。 

getHours() 返回 Date 对象的小时 (0 ~ 23)。 

getMinutes() 返回 Date 对象的分钟 (0 ~ 59)。 

getSeconds() 返回 Date 对象的秒数 (0 ~ 59)。 

getTime() 返回 1970 年 1 月 1 日至今的毫秒数。

```js
let date = new Date().getTime();   //当前时间戳
let date = new Date('yyyy-MM-dd HH:mm:ss').getTime();  //或者yyyy-MM-dd，特定时间的时间戳
```

## 8、js过滤对象数组的属性

一个对象数组，保留对象的某几个属性，但是不改变数组元素个数

利用数组的遍历，构建新对象并依次插入新数组

```js
handleSelectionChange(selection) {
      var newList = [];
      for (var i = 0; i < selection.length; i++) {
        var tempObj = {};
        tempObj.invoiceCode = selection[i].fpdm;
        tempObj.invoiceNum = selection[i].fphm;
        tempObj.validTax = selection[i].se;
        newList.push(tempObj);
      }
      this.oldList = newList;
}
```

## 9、对象字面量相互访问

这个与js执行环境有关

- 执行环境的类型有两种：全局(window)和局部(每一个函数), 没有其他类c语言中的块级作用域.
- 访问权限：内围环境具有外围环境数据的访问权限,外围环境却无法访问内围环境的数据
- 数据的归属：使用var声明的变量会自动添加到最近的环境中, 不使用var声明的变量会默认成为全局属性.
- 数据的查找：数据查找跟数据归属一样遵循"就进原则", 会先从最近的环境中查找, 找不到再向外一层查找, 直到最外层.

```js
// 正确形式
var promotePostNoticeTemplate = {
    noticeTitle: '荣誉通知',
    noticeContent: '',
    setPostTitle: function (title) {
        this.noticeContent = '恭喜您，您的帖子-' + title + '-已被选入中华楹联库。';
    }
};
// 错误形式
var promotePostNoticeTemplate = {
    noticeTitle: '荣誉通知',
    noticeContent: '恭喜您，您的帖子-' + this.noticeTitle + '-已被选入中华楹联库。'
};
// 这时，对象还没有创建，this为空
var promotePostNoticeTemplate = {
    noticeTitle: '荣誉通知',
    noticeContent: '恭喜您，您的帖子-' + noticeTitle + '-已被选入中华楹联库。'
};
// 它会从window(假设window是最近环境)上查找firstName这个属性, 而 window.firstName 是不存在的. 
```

## 10、替换\n为< br >

```js
//替换所有的换行符
string = string.replace(/\r\n/g, "<br>")
string = string.replace(/\n/g, "<br>");
 
//替换所有的空格（中文空格、英文空格都会被替换）
string = string.replace(/\s/g, "&nbsp;");
```

## 11、将markdown文本转换为纯文本

```js
// render为markdown文本
// vue的markdown编辑器这样就行了
let text = render.replace(/<\/?[^>]*>/g, "");

// 更多
/* 移除HTML标签代码 */
function removeHTMLTag(str) {
    str = str.replace(/(\n)/g, ""); 
    str = str.replace(/(\t)/g, ""); 
    str = str.replace(/(\r)/g, ""); 
    str = str.replace(/<\/?[^>]*>/g, "");  // 标签
    str = str.replace(/\s*/g, "");
     return str;
}
// 转意符换成普通字符
function escape2Html(str) { 
     var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'}; 
     return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];}); 
}
```

## 12、浏览器存储

window.sessionStorage（会话存储）：暂时储存，浏览器关闭之后会清除

window.localStorage （本地存储）：本地储存，浏览器关闭之后依旧不会清除，只能人为删除

存储的是一个字符串，不能存储对象，否则存储对象时，就会是[pbject, object]，不会是对象本身，需要用JSON.stringify()格式化为对象字符串形式，取出后在解析

```js
sessionStorage.setItem(key, value);
sessionStorage.getItem(key);
sessionStorage.setItem(key, JSON.stringify(object));
JSON.parse(sessionStorage.getItem(k))
```

