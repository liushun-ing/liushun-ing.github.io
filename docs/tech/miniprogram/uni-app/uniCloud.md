# UniCloud使用

## 1 引言

### 1.1 什么是UniCloud

`uniCloud` 是 DCloud 联合阿里云、腾讯云，为开发者提供的基于 serverless 模式和 js 编程的云开发平台。

`uniCloud`是DCloud在阿里云和腾讯云的serverless服务上封装而成的。

它包含IaaS层（由阿里云和腾讯云提供硬件和网络）和PaaS层（由DCloud提供开发环境）。

开发者可以自主选择uniCloud的硬件和网络资源的供应商，在阿里云版和腾讯云版之间切换。



### 1.2 什么是serverless

serverless是目前很火的概念，它是下一代云技术，是真正的“云”。

传统的云服务，让开发者免于购买实体服务器硬件，改为购买虚拟机。但开发者仍然要自己装操作系统、web服务器、数据库，自己处理热备，自己新购服务器来应对高并发，自己抗DDOS攻击...这不是成熟的“云”！

真正的云计算，就像用水用电，没有复杂的门槛，即用即有、按需付费。serverless的云，真正的把计算、存储的能力进行了云化，开发者只需要按量租用这些计算和存储能力，再也不用关心扩容和攻击。开发者不再有“服务器”的概念，因为没有一台具体的机器。

当用户量激增时，开发者什么都不用做，系统自动承载更高并发。开发者只需要按照对资源的消耗付费即可。同理，如果没有用户使用，即没有资源消耗，则根本无需为云资源付费。云端庞大的serverless资源池，有无数个node进程待命。当手机用户发起请求时，serverless系统会调配闲置的资源来运行开发者相应的云函数。

serverless在国外兴起，但国内的发展速度已经超过了国外。微信、支付宝、百度、抖音、快应用联盟都上线了自己的serverless云开发。目前国内已经有超过60万开发者在使用serverless云开发，包括腾讯、阿里、DCloud的很多自有业务都在使用。



## 2 基本概念

### 2.1 服务空间

一个服务空间对应一整套独立的云开发资源，包括数据库、存储空间、云函数等资源。服务空间之间彼此隔离。

每个服务空间都有一个全局唯一的space ID。

创建服务空间后，在同样的 `uniCloud` 目录右键菜单中关联该服务空间。只有项目关联好服务空间后，才能上传云函数、操作服务空间下的数据库、存储等资源。

> 应用和服务空间的关系

每个uni-app应用都有一个appid，每个服务空间都有一个spaceid。

服务空间和手机端项目是多对多绑定关系。同DCloud账号下，一个应用可以关联到多个服务空间。一个服务空间也可以被多个项目访问。



### 2.2 数据库

`uniCloud` 提供了 2 个 nosql 数据库。

- JSON文档型云数据库

  uniCloud阿里云版的云数据库就是 MongoDB 的 serverless版；uniCloud腾讯云版的云数据库是兼容 MongoDB 的自研数据库。

  数据库中的每条记录都是一个 JSON 格式的对象。一个数据库可以有多个集合（相当于关系型数据中的表），集合可看做一个 JSON 数组，数组中的每个对象就是一条记录，记录的格式是 JSON 对象。

- redis 数据库

  redis 是一种可以运行在内存中的键值对数据库，它的能力没有MongoDB强大，但由于可运行在内存中，它的性能远超常规数据库。redis 也使用 json 方式 key/value 键值对存储数据。

如果开发者需要其他数据库，比如 mysql、ElasticSearch、数据湖，这些数据库没有在uniCloud的服务空间内置，云函数中通过 nodejs 的 api 可以访问这些远程数据库。



### 2.3 云函数/云对象

云函数即在云端（服务器端）运行的函数。从 HBuilderX 3.4起，新增了云函数的扩展版，云对象。

开发者无需购买、搭建服务器，只需编写代码并部署到云端即可在客户端（App/Web/小程序等）调用，同时云函数之间也可互相调用。

一个云函数的写法与一个在本地定义的 `JavaScript` 方法无异，代码运行在云端 `Node.js` 中。当云函数被客户端调用时，定义的代码会被放在 `Node.js` 运行环境中执行。

开发者可以如在 `Node.js` 环境中使用 `JavaScript` 一样在云函数中进行网络请求等操作，也可以使用 node_modules。 DCloud提供了 uniCloud对象内置在云函数/云对象中

云对象本质是对云函数的一种封装，可以对象化的方式使用云服务。



## 3 云函数/云对象

### 3.1 简介

> 介绍

云函数是运行在云端的 `JavaScript` 代码，是基于 `Node.js` 的扩展。

在常规的 `Node API` 基础上，uniCloud的云函数环境内置了`uniCloud`对象，这个对象内置了网络、数据库等各种API。每个云函数是一个js包，在云函数被调用时，由 serverless 调度系统分配硬件资源启动一个 node 环境来运行这个云函数。

每个云函数是一个目录，其中普通云函数有`index.js`入口文件，云对象的入口文件则是`index.obj.js`。云函数的配置文件和 npm规范相同，在云函数目录下可新建一个 package.json 来存放配置。uniCloud云函数扩展了 package.json，增加了一些特有的配置项。

云函数启动后实例会保留一段时间（如15分钟），超过保留期后若该云函数一直没有被再调用，那这个实例会被释放。所以云函数有**冷启动**的概念。不过由于js实例的启动要比php和java更快，所以js更适合serverless方式。

HBuilderX中uniCloud项目的云函数均在项目的`uniCloud/cloudfunctions`目录下，目录结构如下：

```
|——— cloudfunctions               云函数目录
|   │───common                    云函数公用模块目录 详情
|   |   └──hello-common           云函数公用模块
|   |      │──index.js            公用模块代码
|   |      └──package.json        公用模块package.json
|   │───uni-clientDB-actions      （推荐用数据库触发器替代action云函数）
|   │      └──new_action.js       clientDB action代码 详情
|   │───function-name             云函数目录
|   │     │──index.js             云函数代码
|   │     └──package.json         包含云函数的配置信息，如url化、定时设置、可用内存等内容 详情
|   └───object-name               云对象目录
|         │──index.obj.js         云对象代码
|         └──package.json         包含云对象的配置信息，可用内存等内容 详情
```

> uniCloud响应体规范

`uniCloud响应体规范`（uniCloud response format），是DCloud制定的、服务器给客户端返回json数据的一种建议格式。云对象、clientDB、uni-id公共模块均支持此规范。

**由来**

uniCloud服务器给客户端返回的数据格式一般是json，但json的格式具体是什么没有约定。比如返回错误码，是叫`code`还是叫`errCode`？错误内容是`message`还是`errMsg`？内容的国际化如何处理？如果没有一套统一的格式，在客户端将无法编写有效的网络拦截器，无法统一处理错误。另外，如果不同的插件，云端返回的数据格式千差万别，那使用者整合这些插件也会非常麻烦。国际化更无法落地。

为此DCloud推出了`uniCloud响应体规范`。为了与uni-app前端的API错误回调风格统一，uniCloud响应体规范定义的云端返回信息（尤其是报错时）应包含`errCode`和`errMsg`。

- errCode

errCode在成功时应返回数字`0`，失败时应返回一个以插件id开头的“字符串”，每个单词以连字符（`-`）分割。做出这样的规定是为了防止不同插件之间出现重复错误码。以`'uni-id-account-banned'`错误码为例，`uni-id`为插件id，`account-banned`为错误缩写。

- errMsg

errMsg用于存放具体错误信息，包括展示给开发者、终端用户的错误信息

HBuilderX内使用代码块`returnu`可以快速输入以下代码（`HBuilderX 3.4.0`及以上版本）:

```js
return {
	errSubject: '', // HBuilderX 3.6.10新增 统一错误主题（模块）名称，字符串类型，存在多级模块时使用"::"分割，即"模块名称::二级模块名称"
	errCode: 0,
	errMsg: ''
}
```



### 3.2 普通云函数创建使用

callFunction方式云函数，也称之为普通云函数。

uni-app的前端代码，不再执行`uni.request`联网，而是通过`uniCloud.callFunction`调用云函数。

callFunction方式避免了服务器提供域名，不暴露固定ip，减少被攻击的风险。

`uniCloud.callFunction`可以在uni-app前端执行，也可以在uniCloud云函数中执行。也就是前端和云端都可以调用另一个云函数。



客户端callFunction调用云函数时，云函数通过入参接收客户端数据，通过头信息上下文获取客户端信息，经过业务逻辑处理后给客户端返回结果。

假使客户端代码调用云函数`hellocf`，并传递了`{a:1,b:2}`的数据，

```js
// 客户端调用云函数并传递参数
uniCloud.callFunction({
    name: 'hellocf',
    data: {a:1,b:2}
  })
  .then(res => {});
```

那么云函数侧的代码如下，将传入的两个参数求和并返回客户端，普通云函数返回给客户端的是json格式数据。返回结果包裹在**result**下。：

```js
// hellocf云函数index.js入口文件代码
'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	if (!event.a) {
		return {errCode : 1,errMsg : "参数a不能为空"}
	}
	if (!event.b) {
		return {errCode : 2,errMsg : "参数b不能为空"}
	}
	const c = event.a + event.b
	if (isNaN(c)) {
		return {errCode : 3,errMsg : "参数a和b无法求和"}
	}
	//返回数据给客户端
	return {sum:c,errCode : 1,errMsg : "0"}
}
// 返回结果如下
/*
{
	"errCode": 0,
	"errMsg": "",
	"header": {
		"access-control-expose-headers": "Date,x-fc-request-id,x-fc-error-type,x-fc-code-checksum,x-fc-invocation-duration,x-fc-max-memory-usage,x-fc-log-result,x-fc-invocation-code-version"
		"content-disposition": "attachment"
		"content-length": "38"
		"content-type": "application/json"
		"date": "Sat, 25 Jun 2022 19:28:34 GMT"
		"x-fc-code-checksum": "92066386860027743"
		"x-fc-instance-id": "c-62b761c4-5a85e238b3ce404c817d"
		"x-fc-invocation-duration": "23"
		"x-fc-invocation-service-version": "LATEST"
		"x-fc-max-memory-usage": "66.61"
		"x-fc-request-id": "80854b93-b0c7-43ab-ab16-9ee9f77ff41e"
		"x-serverless-request-id": "ac1403831656185314624173902"
		"x-serverless-runtime-version": "1.2.2"
	}
	"requestId": "ac1403831656185314624173902"
	"result": {sum: 3}
	"success": true
}
其中result是开发者云函数代码返回的数据，其余是云平台返回的。
注意：HBuilderX本地运行云函数时，如果没有系统错误，则只返回result，其他需要在云端运行云函数才会返回。
errCode为0时，success也是true。
	表示云函数在系统层面没有运行错误。可以正常返回result。前端callFunction会进入success回调
	如果开发者的业务有报错，可以在 result 里返回 errCode 和 errMsg。
errCode不为0时，success为false。
	表示云函数在系统层面报错了，比如联网失败、云函数超时、内存超限等错误。前端callFunction会进入fail回调
	发生系统错误时 result 里无法正常返回业务错误。errCode不为0时，还会返回errMsg。
requestId是云函数的请求id，线上运行时，可以在uniCloud web控制台的云函数日志中查看运行日志。
header是云厂商的一些信息，阿里云和腾讯云不同，上面示例代码是阿里云的header。
*/
```

云函数的传入参数有两个，一个是`event`对象，一个是`context`对象。

- `event`指的是触发云函数的事件。当客户端调用云函数时，`event`就是客户端调用云函数时传入的参数。
- `context` 对象包含了本次请求的上下文，包括客户端的ip、ua、appId等信息，以及云函数的环境情况、调用来源source等信息。



### 3.3 云对象

#### 3.3.1 背景和优势

20年前，restful接口开发开始流行，服务器编写接口，客户端调用接口，传输json。

现在，替代restful的新模式来了。云对象，服务器编写API，客户端调用API，不再开发传输json的接口。思路更清晰、代码更精简。



#### 3.3.2 示例

比如服务端编写一个云对象todo，该对象有add、get、remove、update等方法。客户端的js则可以直接import这个todo云对象，直接调用add等方法。

服务器示例代码如下

```js
// 云对象名：todo
module.exports = {
	add(title, content) {
		title = title.trim()
		content = content.trim()
		if(!title || !content) {
			return {
				errCode: 'INVALID_TODO',
				errMsg: 'TODO标题或内容不可为空'
			}
		}
		// ...其他逻辑
		return {
			errCode: 0,
			errMsg: '创建成功'
		}
	}
}
```

然后在客户端的js中，import这个todo对象，调用它的add方法

```js
const todo = uniCloud.importObject('todo') //第一步导入云对象
async function addTodo () {
	try {
		const res = await todo.add('title demo', 'content demo') //导入云对象后就可以直接调用该对象的方法了，注意使用异步await
		uni.showToast({
			title: '创建成功'
		})
	} catch (e) {
		// 符合uniCloud响应体规范，自动抛出此错误 
		uni.showModal({
			title: '创建失败',
			content: e.errMsg,
			showCancel: false
		})
	}
}
```

总结下云对象带来的好处：

1. 更清晰的逻辑
2. 更精简的代码
3. 更少的协作成本（以及矛盾~）
4. 客户端调用时在ide里有完善的代码提示，方法参数均可提示。（传输json可没法在ide里提示）
5. 默认支持[uniCloud响应体规范](https://uniapp.dcloud.net.cn/uniCloud/cf-functions#resformat)，方便错误拦截和统一处理



#### 3.3.3 客户端调用

客户端通过`uniCloud.importObject`方法获取云对象的实例，并可以通过此实例调用云对象内的方法。用法如下

```js
const todo = uniCloud.importObject('todo')
const res = await todo.add('title demo', 'content demo')
```

通过代码块`cco`可以快捷的输入以下代码：

```js
const todo = uniCloud.importObject('todo')
```

实际业务中需要考虑错误捕获，调用方式有两种：

1. try catch

```js
const todo = uniCloud.importObject('todo')
try {
	const res = await todo.add('title demo', 'content demo') //导入云对象后就可以直接调用该对象的方法了，注意使用异步await
	console.log(res)
} catch (e) {
	console.log(e.errCode)
	console.log(e.errMsg)
}
```

1. then catch(promise写法)

```js
const todo = uniCloud.importObject('todo')
todo.add('title demo', 'content demo').then(res => {
	console.log(res)
}).catch(e => {
	console.log(e.errCode)
	console.log(e.errMsg)
})
```





## 4 云数据库

### 4.1 基础概念

`uniCloud`提供了一个 JSON 格式的文档型数据库。顾名思义，数据库中的每条记录都是一个 JSON 格式的文档。

它是 nosql 非关系型数据库，如果您之前熟悉 sql 关系型数据库，那么两者概念对应关系如下表：

| 关系型              | JSON 文档型                                             |
| :------------------ | :------------------------------------------------------ |
| 数据库 database     | 数据库 database                                         |
| 表 table            | 集合 collection。但行业里也经常称之为“表”。无需特意区分 |
| 行 row              | 记录 record / doc                                       |
| 字段 column / field | 字段 field                                              |
| 使用sql语法操作     | 使用MongoDB语法或jql语法操作                            |

- 一个`uniCloud`服务空间，有且只有一个数据库；
- 一个数据库可以有多个表；
- 一个表可以有多个记录；
- 一个记录可以有多个字段。

### 4.2 数据表的3个组成部分

每个数据表，包含3个部分：

- data：数据内容
- index：索引
- schema：数据表格式定义

在uniCloud的web控制台可以看到一个数据表的3部分内容。

#### 4.2.1 data数据内容

data，就是存放的数据记录(record)。里面是一条一条的json文档。

record可以增删改查、排序统计。如输入一个json

```json
{
    "name": "张三",
    "birth_year": 2000,
    "tel": "13900000000",
    "email": "zhangsan@zhangsan.com",
    "intro": "擅于学习，做事严谨"
}
```

创建一条新记录，是不管在web控制台创建，还是通过API创建，每条记录都会自带一个`_id`字段用以作为该记录的唯一标志。

`_id`字段是每个数据表默认自带且不可删除的字段。同时，它也是数据表的索引。

阿里云使用的是标准的mongoDB，`_id`是自增的，后创建的记录的`_id`总是大于先生成的`_id`。传统数据库的自然数自增字段在多物理机的大型数据库下很难保持同步，大型数据库均使用`_id`这种长度较长、不会重复且仍然保持自增规律的方式。腾讯云使用的是兼容mongoDB的自研数据库，`_id`并非自增。

插入/导入数据时也可以自行指定`_id`而不使用自动生成的`_id`，这样可以很方便的将其他数据库的数据迁移到uniCloud云数据库。

#### 4.2.2 index数据库索引

所谓索引，是指在数据表的众多字段中挑选一个或多个字段，让数据库引擎优先处理这些字段。

设置为索引的字段，在通过该字段查询(where)或排序(orderBy)时可以获得更快的查询速度。

但设置过多索引也不合适，会造成数据新增和删除变慢。新建的表，默认只有一个索引`_id`。

索引分唯一型和非唯一型。

- 唯一型索引要求整个数据表多个记录的该字段的值不能重复。比如`_id`就是唯一型索引。

- 如果我们要根据name字段来查询，为了提升查询速度，此时可以把name字段设为非唯一索引。

**注意**

- 如果记录中已经存在多个记录某字段相同的情况，那么将该字段设为唯一型索引会失败。
- 如果已经设置某字段为唯一索引，在新增和修改记录时如果该字段的值之前在其他记录已存在，会失败。
- 假如记录中不存在某个字段，则对索引字段来说其值默认为 null，如果该索引字段设为唯一型索引，则不允许存在两个或以上的该字段为null或不存在该字段的记录。

#### 4.2.3 schema数据表格式定义

`DB Schema`是表结构描述。描述数据表有哪些字段、值域类型是什么、是否必填、数据操作权限等很多内容。

因为 MongoDB 的灵活性，理论上`DB Schema`不是必须的，使用传统 MongoDB API 操作数据库不需要`DB Schema`。但如果使用 JQL，那`DB Schema`就是必须的。



### 4.3 传统api操作数据库

#### 4.3.1 获取集合的引用

```js
const db = uniCloud.database();
// 获取 `user` 集合的引用
const collection = db.collection('user');
```

> 集合 Collection

通过 `db.collection(name)` 可以获取指定集合的引用，在集合上可以进行以下操作

| 类型     | 接口    | 说明                                                         |
| -------- | ------- | ------------------------------------------------------------ |
| 写       | add     | 新增记录（触发请求）                                         |
| 计数     | count   | 获取符合条件的记录条数                                       |
| 读       | get     | 获取集合中的记录，如果有使用 where 语句定义查询条件，则会返回匹配结果集 (触发请求) |
| 引用     | doc     | 获取对该集合中指定 id 的记录的引用                           |
| 查询条件 | where   | 通过指定条件筛选出匹配的记录，可搭配查询指令（eq, gt, in, ...）使用 |
|          | skip    | 跳过指定数量的文档，常用于分页，传入 offset                  |
|          | orderBy | 排序方式                                                     |
|          | limit   | 返回的结果集(文档数量)的限制，有默认值和上限值               |
|          | field   | 指定需要返回的字段                                           |

查询及更新指令用于在 `where` 中指定字段需满足的条件，指令可通过 `db.command` 对象取得。

1. 查询筛选指令 Query Command，以下指令挂载在 `db.command` 下

| 类型     | 接口 | 说明                               |
| -------- | ---- | ---------------------------------- |
| 比较运算 | eq   | 字段等于 ==                        |
|          | neq  | 字段不等于 !=                      |
|          | gt   | 字段大于 >                         |
|          | gte  | 字段大于等于 >=                    |
|          | lt   | 字段小于 <                         |
|          | lte  | 字段小于等于 <=                    |
|          | in   | 字段值在数组里                     |
|          | nin  | 字段值不在数组里                   |
| 逻辑运算 | and  | 表示需同时满足指定的所有条件       |
|          | or   | 表示需同时满足指定条件中的至少一个 |

1. 字段更新指令 Update Command，以下指令挂载在 `db.command` 下

| 类型 | 接口    | 说明                             |
| ---- | ------- | -------------------------------- |
| 字段 | set     | 设置字段值                       |
|      | remove  | 删除字段                         |
|      | inc     | 加一个数值，原子自增             |
|      | mul     | 乘一个数值，原子自乘             |
|      | push    | 数组类型字段追加尾元素，支持数组 |
|      | pop     | 数组类型字段删除尾元素，支持数组 |
|      | shift   | 数组类型字段删除头元素，支持数组 |
|      | unshift | 数组类型字段追加头元素，支持数组 |



> 记录 Record / Document

通过 `db.collection(collectionName).doc(docId)` 可以获取指定集合上指定 _id 的记录的引用，在记录上可以进行以下操作

| 接口 | 说明   |                                                              |
| ---- | ------ | ------------------------------------------------------------ |
| 写   | update | 局部更新记录(触发请求)只更新传入的字段。如果被更新的记录不存在，会直接返回更新失败 |
|      | set    | 覆写记录;会删除操作的记录中的所有字段，创建传入的字段。如果操作的记录不存在，会自动创建新的记录 |
|      | remove | 删除记录(触发请求)                                           |
| 读   | get    | 获取记录(触发请求)                                           |

**doc(docId)方法的参数只能是字符串，即数据库默认的`_id`字段。**

如需要匹配多个`_id`的记录，应使用where方法。可以在`where`方法里用`in`指令匹配一个包含`_id`的数组。



#### 4.3.2 添加数据

```js
// 单条插入数据
let res = await collection.add({
  name: 'Ben'
})
// 批量插入数据
let res = await collection.add([{
  name: 'Alex'
},{
  name: 'Ben'
},{
  name: 'John'
}])
```

响应参数

单条插入时

| 参数 | 类型   | 说明         |
| ---- | ------ | ------------ |
| id   | String | 插入记录的id |

批量插入时

| 参数 | 类型  | 说明                 |
| ---- | ----- | -------------------- |
| ids  | Array | 批量插入所有记录的id |



#### 4.3.3 获取数据

> 获取查询数量

`collection.count()`

```js
let res = await db.collection('goods').where({
  category: 'computer',
  type: {
    memory: 8,
  }
}).count()
```

**注意：**

- 数据量很大的情况下，带条件运算count全表的性能会很差，尽量使用其他方式替代，比如新增一个字段专门用来存放总数。不加条件时count全表不存在性能问题。



> 设置记录数量

`collection.limit()`

```js
let res = await collection.limit(1).get() // 只返回第一条记录
```

**注意**

- limit不设置的情况下默认返回100条数据；设置limit有最大值，腾讯云限制为最大1000条，阿里云限制为最大500条。



> 设置起始位置

`collection.skip(value)`

跳过指定的位置，从位置之后返回数据

```js
let res = await collection.skip(4).get()
```



> 对结果排序

`collection.orderBy(field, orderType)` 升序(asc) 或 降序(desc)

如果需要对嵌套字段排序，需要用 "点表示法" 连接嵌套字段，比如 style.color 表示字段 style 里的嵌套字段 color。

同时也支持按多个字段排序，多次调用 orderBy 即可，多字段排序时的顺序会按照 orderBy 调用顺序先后对多个字段排序

```js
let res = await collection.orderBy("name", "asc").get()
```

**注意**

- 排序字段存在多个重复的值时排序后的分页结果，可能会出现某条记录在上一页出现又在下一页出现的情况。这时候可以通过指定额外的排序条件比如`.orderBy("name", "asc").orderBy("_id", "asc")`来规避这种情况。



> 指定返回字段

`collection.field()`

从查询结果中，过滤掉不需要的字段，或者指定要返回的字段。使用示例

```js
collection.field({ 'age': true }) //只返回age字段、_id字段，其他字段不返回
```

**注意**

- field内指定是否返回某字段时，不可混用true/false。即{'a': true, 'b': false}是一种错误的参数格式
- 只有使用{ '_id': false }明确指定不要返回_id时才会不返回_id字段，否则_id字段一定会返回



> 添加查询条件

`collection.where()`

设置过滤条件，where 可接收对象作为参数，表示筛选出拥有和传入对象相同的 key-value 的文档。比如筛选出所有类型为计算机的、内存为 8g 的商品：

```js
let res = await db.collection('goods').where({
  category: 'computer',
  type: {
    memory: 8,
  }
}).get()
```

如果要表达更复杂的查询，可使用**高级查询指令**(见4.3.1)

```js
const dbCmd = db.command // 取指令
db.collection('goods').where({
  category: 'computer',
  type: {
    memory: dbCmd.gt(4).and(dbCmd.lt(32)), // 表示大于 4 小于32
      // 或者 dbCmd.and(dbCmd.gt(4), dbCmd.lt(32))
  }
})
```

`where` 还可以使用正则表达式来查询文档，比如一下示例查询所有`name`字段以ABC开头的用户

```js
db.collection('user').where({
  name: new RegExp('^ABC')  // 或者 /^ABC/
})
```

**按照数组内的值查询**

mongoDB内按照数组内的值查询可以使用多种写法，以下面的数据为例

```js
{
  arr:[{
    name: 'item-1',
  },{
    name: 'item-2',
  }]
}

{
  arr:[{
    name: 'item-3',
  },{
    name: 'item-4',
  }]
}
```

如果想查询arr内第一个元素的name为item-1的记录可以使用如下写法

```js
const res = await db.collection('test').where({
  'arr.0.name': 'item-1'
})

res = {
  data:[{
    arr:[{
      name: 'item-1',
    },{
      name: 'item-2',
    }]
  }]
}
```

如果想查询arr内某个元素的name为item-1的记录（可以是数组内的任意一条name为item-1）可以使用如下写法

```js
const res = await db.collection('test').where({
  'arr.name': 'item-1'
})

res = {
  data:[{
    arr:[{
      name: 'item-1',
    },{
      name: 'item-2',
    }]
  }]
}
```



#### 4.3.4 删除数据

**方式1 通过指定文档ID删除**

`collection.doc(_id).remove()`

```js
// 清理全部数据
let res = await collection.get()
res.data.map(async(document) => {
  return await collection.doc(document._id).remove();
});
```

**方式2 条件查找文档然后直接批量删除**

`collection.where().remove()`

```js
// 删除字段a的值大于2的文档
const dbCmd = db.command
let res = await collection.where({
  a: dbCmd.gt(2)
}).remove()

// 清理全部数据
const dbCmd = db.command
let res = await collection.where({
  _id: dbCmd.exists(true)
}).remove()
```

响应参数

| 字段    | 类型   | 必填 | 说明           |
| ------- | ------ | ---- | -------------- |
| deleted | Number | 否   | 删除的记录数量 |



#### 4.3.5 更新数据

> 更新指定文档

**使用腾讯云时更新方法必须搭配doc、where方法使用**

`collection.doc().update(Object data)`

**响应参数**

| 参数    | 类型   | 说明                                      |
| ------- | ------ | ----------------------------------------- |
| updated | Number | 更新成功条数，数据更新前后没变化时会返回0 |

```js
let res = await collection.doc('doc-id').update({
  name: "Hey",
  count: {
    fav: 1
  }
});
```

```json
// 更新前
{
  "_id": "doc-id",
  "name": "Hello",
  "count": {
    "fav": 0,
    "follow": 0
  }
}

// 更新后
{
  "_id": "doc-id",
  "name": "Hey",
  "count": {
    "fav": 1,
    "follow": 0
  }
}
```

更新数组时，已数组下标作为key即可，比如以下示例将数组arr内下标为1的值修改为 uniCloud

```js
let res = await collection.doc('doc-id').update({
  arr: {
    1: "uniCloud"
  }
})
```

```json
// 更新前
{
  "_id": "doc-id",
  "arr": ["hello", "world"]
}
// 更新后
{
  "_id": "doc-id",
  "arr": ["hello", "uniCloud"]
}
```



> 更新文档，如果不存在则创建

`collection.doc().set()`，没有写的字段都会删掉

**注意：**此方法会覆写已有字段，需注意与`update`表现不同，比如以下示例执行`set`之后`follow`字段会被删除

```js
let res = await collection.doc('doc-id').set({
  name: "Hey",
  count: {
    fav: 1
  }
})
```

```json
// 更新前
{
  "_id": "doc-id",
  "name": "Hello",
  "count": {
    "fav": 0,
    "follow": 0
  }
}

// 更新后
{
  "_id": "doc-id",
  "name": "Hey",
  "count": {
    "fav": 1
  }
}
```



> 批量更新文档

```js
collection.update()
const dbCmd = db.command
let res = await collection.where({name: dbCmd.eq('hey')}).update({
  age: 18,
})
```



> 更新并返回更新后的数据

此接口仅会操作一条数据，有多条数据匹配的情况下会只更新匹配的第一条并返回

```js
const db = uniCloud.database()
await db.collection('test').where({
  uid: '1'
}).updateAndReturn({
  score: db.command.inc(2)
})

// 更新前
{
  _id: 'xx',
  uid: '1',
  score: 0
}
// 更新后
{
  _id: 'xx',
  uid: '1',
  score: 2
}

// 接口返回值
{
  updated: 1,
  doc: {
    _id: 'xx',
    uid: '1',
    score: 2
  }
}
```

**注意**

- 使用updateAndReturn时，不可使用field方法
- 可以在事务中使用，可以使用`transaction.where().updateAndReturn()`以及`transaction.doc().updateAndReturn()`
- 不同于update接口，此接口返回的updated不表示数据真的进行了更新
- 腾讯云暂不支持`doc().updateAndReturn()`的写法可以使用`where().updateAndReturn()`替代



> 更新数组内指定下标的元素

```js
const res = await db.collection('query').doc('1').update({
  // 更新students[1]
  ['students.' + 1]: {
    name: 'wang'
  }
})
```

```js
// 更新前
{
  "_id": "1",
  "students": [
    {
      "name": "zhang"
    },
    {
      "name": "li"
    }
  ]
}

// 更新后
{
  "_id": "1",
  "students": [
    {
      "name": "zhang"
    },
    {
      "name": "wang"
    }
  ]
}
```



> 更新数组内匹配条件的元素

**注意：只可确定数组内只会被匹配到一个的时候使用**

```js
const res = await db.collection('query').where({
	'students.id': '001'
}).update({
  // 将students内id为001的name改为li，$代表where内匹配到的数组项的序号
	'students.$.name': 'li'
})
```

```js
// 更新前
{
  "_id": "1",
  "students": [
    {
      "id": "001",
      "name": "zhang"
    },
    {
      "id": "002",
      "name": "wang"
    }
  ]
}

// 更新后
{
  "_id": "1",
  "students": [
    {
      "id": "001",
      "name": "li"
    },
    {
      "id": "002",
      "name": "wang"
    }
  ]
}
```



> 更新操作符

- **set**

更新指令。用于设定字段等于指定值。这种方法相比传入纯 JS 对象的好处是能够指定字段等于一个对象：

```js
const dbCmd = db.command
let res = await db.collection('photo').doc('doc-id').update({
  count: dbCmd.set({
    fav: 1,
    follow: 1
  })
})
```



- **inc**

更新指令。用于指示字段自增某个值，这是个原子操作

在文章阅读数+1、收藏+1等很多场景会用到它。如给收藏的商品数量加一：

```js
const dbCmd = db.command

let res = await db.collection('user').where({
  _id: 'my-doc-id'
}).update({
  count: {
    fav: dbCmd.inc(1)
  }
})
```

```js
const dbCmd = db.command

let res = await db.collection('user').where({
  _id: 'my-doc-id'
}).update({
  count: {
    fav: dbCmd.inc(-1)
  }
})
```



- **mul**

更新指令。用于指示字段自乘某个值。

```js
const dbCmd = db.command

let res = await db.collection('user').where({
  _id: 'my-doc-id'
}).update({
  count: {
    fav: dbCmd.mul(10)
  }
})
```

```js
const dbCmd = db.command

let res = await db.collection('user').where({
  _id: 'my-doc-id'
}).update({
  count: {
    fav: dbCmd.mul(0.1)
  }
})
```



- **remove**

更新指令。用于表示删除某个字段。如某人删除了自己一条商品评价中的评分：

```js
const dbCmd = db.command
let res = await db.collection('comments').doc('comment-id').update({
  rating: dbCmd.remove()
})
```



- **push**

向数组尾部追加元素，支持传入单个元素或数组

```js
const dbCmd = db.command

let res = await db.collection('comments').doc('comment-id').update({
  // users: dbCmd.push('aaa')
  users: dbCmd.push(['c', 'd'])
})
```



- **pop**

删除数组尾部元素

```js
const dbCmd = db.command

let res = await db.collection('comments').doc('comment-id').update({
  users: dbCmd.pop()
})
```



- **unshift**

向数组头部添加元素，支持传入单个元素或数组。使用同push

```js
const dbCmd = db.command

let res = await db.collection('comments').doc('comment-id').update({
  // users: dbCmd.push('aaa')
  users: dbCmd.unshift(['c', 'd'])
})
```



- **shift**

删除数组头部元素。使用同pop

```js
const dbCmd = db.command

let res = await db.collection('comments').doc('comment-id').update({
  users: dbCmd.shift()
})
```





### 4.4 DB Schema

#### 4.4.1 DB Schema概述

`DB Schema`是基于 JSON 格式定义的数据结构的规范。

每张表/集合，都有一个表名.schema.json的文件，来描述表的信息、字段的信息。客户端访问数据库必须要有schema开通权限。



`DB Schema`有很多重要的作用：

- 描述数据表结构。一目了然的阅读每个表、每个字段的用途。
- 设置字段的默认值(defaultValue/forceDefaultValue)，比如服务器当前时间、当前用户id等。
- 设定字段值域能接受的格式(validator)，比如数字、字符串、布尔值，是否可为空，还可以指定的数据要求的正则格式，不符合的格式无法入库。
- 设定字段之间的约束关系(fieldRules)，比如字段结束时间需要晚于字段开始时间。
- 设定多个表的关联关系，字段间映射关系(foreignKey)，将多个表按一个虚拟联表直接查询，大幅简化联表查询。
- 设定数据操作权限(permission)。什么样的角色可以读/写哪些数据，都可以在这里配置。
- 根据schema自动生成前端界面（schema2code），包括列表、详情、新建和编辑页面，自动处理校验规则。

简单示例如下，字段可设置的属性见[官网](https://uniapp.dcloud.net.cn/uniCloud/schema.html)：

```json
{
	"bsonType": "object", // 固定节点
	"description": "表的描述",
	"required": ["name", "birth_year", "tel", "email"], // 必填字段
	"permission": { 
		"read": false, // 前端非admin的读取记录权限控制。默认值是false。true/false或者表达式
		"create": false, // 前端非admin的新增记录权限控制。默认值false，true/false或者表达式
		"update": false, // 前端非admin的更新记录权限控制。默认值false。true/false或者表达式
		"delete": false, // 前端非admin的删除记录权限控制。默认值false。true/false或者表达式
		"count": false // 前端非admin的求数权限控制。默认值是true。true/false或者表达式
	},
	"properties": { // 表的字段清单
		"_id": { // 字段名称，每个表都会带有_id字段
			"description": "ID，系统自动生成"
			// 这里还有很多字段属性可以设置
		},
        "name": {
			"bsonType": "string",
			"title": "姓名",
			"trim": "both",
			"minLength": 2,
			"maxLength": 17
		},
		"birth_year": {
			"bsonType": "int",
			"title": "出生年份",
			"minimum": 1950,
			"maximum": 2020
		},
		"tel": {
			"bsonType": "string",
			"title": "手机号码",
			"pattern": "^\\+?[0-9-]{3,20}$",
			"trim": "both"
		},
		"email": {
			"bsonType": "string",
			"title": "email",
			"format": "email",
			"trim": "both"
		},
		"address": {
			"bsonType": "object",
			"title": "地址",
			"required": ["city"],
			"properties": {
				"city": {
					"bsonType": "string",
					"title": "城市"
				},
				"street": {
					"bsonType": "string",
					"title": "街道",
					"trim": "both"
				}
			}
		},
		"intro":{
			"bsonType": "string",
			"title": "简介",
			"trim": "both"
		}
	},
	"fieldRules":[
		// 字段之间的约束关系。比如字段开始时间小于字段结束时间。也可以只校验一个字段。支持表达式
	]
}
```





## 5 云存储

### 5.1 概述

开发者使用`uniCloud`的云存储，无需再像传统模式那样单独去购买存储空间、CDN映射、流量采购等；

云存储的上传方式有3种：

1. web界面：即在https://unicloud.dcloud.net.cn/ web控制台，点击云存储，通过web界面进行文件上传。该管理界面同时提供了资源浏览、删除等操作界面。
2. 客户端API或组件上传：在前端js中编写`uniCloud.uploadFile`，或者使用uni ui的[FilePicker组件](https://ext.dcloud.net.cn/plugin?id=4079)，文件选择+上传均封装完毕。
3. 云函数上传文件到云存储：即在云函数js中编写`uniCloud.uploadFile`



### 5.2 客户端API

在uni-app前端进行云存储的操作（不是在云函数里操作），包括在前端上传、删除文件。

#### 5.2.1 uploadFile

直接上传文件到云存储。客户端上传文件到云函数、云函数再上传文件到云存储，这样的过程会导致文件流量带宽耗费较大。所以一般上传文件都是客户端直传。

```js
//前端代码
uni.chooseImage({
  count: 1,
  success(res) {
    console.log(res);
    if (res.tempFilePaths.length > 0) {
      let filePath = res.tempFilePaths[0]
      //进行上传操作

      // promise方式
      const result = await uniCloud.uploadFile({
        filePath: filePath,
        cloudPath: 'a.jpg',
        onUploadProgress: function(progressEvent) {
          console.log(progressEvent);
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
        }
      });

      // callback方式，与promise方式二选一即可
      uniCloud.uploadFile({
        filePath: filePath,
        cloudPath: 'a.jpg',
        onUploadProgress: function(progressEvent) {
          console.log(progressEvent);
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
        },
        success() {},
        fail() {},
        complete() {}
      });

    }
  }
});
```

响应参数

|   字段    |  类型  |                  说明                   |
| :-------: | :----: | :-------------------------------------: |
|  fileID   | String | 文件唯一 ID，用来访问文件，建议存储起来 |
| requestId | String |        请求序列号，用于错误排查         |



#### 5.2.2 getTempFileURL

在云函数中，把文件的fileid转换为临时URL。临时URL有有效期限制，避免其他人获取URL后可以持续访问该文件。

**响应参数**

|   字段    |      类型       |           说明           |
| :-------: | :-------------: | :----------------------: |
| fileList  | Array< Object > |    存储下载链接的数组    |
| requestId |     String      | 请求序列号，用于错误排查 |

**响应参数中的fileList**

|    字段     |  类型  |     说明     |
| :---------: | :----: | :----------: |
|   fileID    | String |   文件 ID    |
| tempFileURL | String | 文件访问链接 |

```javascript
// 客户端获取临时文件示例源码
// promise方式
uniCloud.getTempFileURL({
		fileList: ['cloud://test-28farb/a.png']
	})
	.then(res => {});

// callback方式，与promise方式二选一
uniCloud.getTempFileURL({
	fileList: ['cloud://test-28farb/a.png'],
	success() {},
	fail() {},
	complete() {}
});
```



#### 5.2.3 getFileInfo

**响应参数**

|   字段   |      类型       |        说明        |
| :------: | :-------------: | :----------------: |
| fileList | Array< Object > | 存储下载链接的数组 |

**响应参数中的fileList**

|    字段     |  类型  |               说明               |
| :---------: | :----: | :------------------------------: |
|   fileId    | string | 文件 ID（从文件url中解析出的id） |
|  gmtCreate  | number | 文件上传时间（精确到秒的时间戳） |
| gmtModified | number | 文件更改时间（精确到秒的时间戳） |
|    name     | string |           文件原始名称           |
|    size     | number |         文件大小（Byte）         |
|    type     | string |             文件类型             |
|     url     | string |           文件cdn链接            |



#### 5.2.4 chooseAndUploadFile

通过ui界面选择文件（图片/视频）并直接上传到云存储。

同时提供了选择回调事件，方便对选择后的图片进行压缩等二次处理，然后再上传。

> 回调方法

**onChooseFile(Object OnChooseFileRes)**

选择图片的回调事件。方便对选择后的图片进行压缩、裁剪等二次处理，然后再上传。

OnChooseFileRes结构如下

```js
{
  errMsg: '',
  tempFilePaths: [], // 临时文件路径数组，chooseVideo/chooseImage/chooseFile接口返回的tempFilePath组成的数组
  tempFiles: [] // 临时文件组成的数组
}
```

如果onChooseFile回调有返回值，此返回值会用来替换实际选择的文件，用以上传。可以在此回调内对文件进行额外的处理，通过在onChooseFile内返回一个promise来阻塞上传，在此期间可以对文件进行额外处理。

例：

```js
function cropImg(file) {
  return new Promise((resolve, reject) => {
    let ext
    let filePathProcessed = file.path // 处理结果
    // #ifdef H5
    ext = file.name.split('.').pop()
    resolve({
      path: filePathProcessed,
      ext,
      fileType: file.fileType
    })
    // #endif
    // #ifndef H5
    uni.getImageInfo({
      src: file.path,
      success(info) {
        ext = info.type.toLowerCase()
        resolve({
          path: filePathProcessed,
          ext,
          fileType: file.fileType
        })
      },
      fail(err) {
        reject(new Error(err.errMsg || '未能获取图片类型'))
      }
    })
    // #endif
  })
}

uniCloud.chooseAndUploadFile({
  type: 'image',
  onChooseFile(res) {
    const processAll = []
    for (let i = 0; i < res.tempFiles.length; i++) {
      processAll.push(cropImg(res.tempFiles[i]))
    }
    return Promise.all(processAll).then((fileList) => {
      let result = {
        tempFilePaths: []
      }
      result.tempFiles = fileList.map((fileItem, index) => {
        result.tempFilePaths.push(fileItem.path)
        return {
          path: fileItem.path,
          cloudPath: '' + Date.now() + index + '.' + fileItem.ext, // 云端路径，这里随便生成了一个
          fileType: fileItem.fileType
        }
      })
      return result
    })
  }
}).then(res => {
  console.log(res)
})
```



**OnUploadProgress(Object OnUploadProgressRes)**

上传进度的回调

OnUploadProgressRes结构如下

```js
{
  index: 0, // 触发此回调的文件序号
  loaded: 256, // 已上传大小
  total: 1024, // 总大小
  tempFilePath: '', // 本地临时文件路径
  tempFile: {} // 本地文件对象
}
```



> chooseAndUploadFile响应参数

成功回调内的响应参数形式如下

```js
{
  errMsg: '', // 错误信息
  tempFilePaths: [], // 本地临时文件路径组成的数组
  tempFiles: [] // 文件对象数组，每项上都被追加了一个url属性，值为文件上传得到的fileID
}
```



### 5.3 云函数API

在云函数中操作云存储文件（不是在前端），包括在云函数里上传、删除云存储文件。

#### 5.3.1 uniCloud.uploadFile

**云函数**内上传文件至云存储。

如果是从客户端上传文件，一般不建议先把文件从客户端上传到云函数，再由云函数上传到云存储，而是建议客户端直传云存储。

**请求参数**

| 字段                | 类型    | 必填 | 默认值 | 说明                                                         |
| ------------------- | ------- | ---- | ------ | ------------------------------------------------------------ |
| cloudPath           | string  | 是   | -      | 使用腾讯云时，表示文件的绝对路径，包含文件名。使用阿里云时，`cloudPath`为云端文件名，传`cloudPathAsRealPath: true`可以让cloudPath作为文件存储路径 |
| fileContent         | -       | 是   | -      | 文件内容，请看下方说明                                       |
| cloudPathAsRealPath | Boolean | 否   | false  | 是否以`cloudPath`作为云端文件绝对路径                        |

**说明**

- 腾讯云支持在fileContent内传[可读流](https://nodejs.org/api/stream.html#stream_class_stream_readable) 或buffer
- 阿里云支持在fileContent内传文件绝对路径或buffer

响应参数

| 字段      | 类型   | 必填 | 说明                                      |
| --------- | ------ | ---- | ----------------------------------------- |
| fileID    | fileID | 是   | 文件唯一 ID，用来访问文件，建议存储起来。 |
| requestId | string | 否   | 请求序列号，用于错误排查。                |

```javascript
// 云函数上传文件示例代码
const fs = require("fs");

let result = await uniCloud.uploadFile({
    cloudPath: "test-admin.jpeg",
    fileContent: fs.createReadStream(`${__dirname}/cos.jpeg`)
});
```



#### 5.3.2 uniCloud.deleteFile

**云函数**删除云存储文件。

删除云存储文件是高危操作，不建议在客户端操作，而建议在云函数中操作。

**响应参数**

| 字段      | 类型           | 必填 | 说明                       |
| --------- | -------------- | ---- | -------------------------- |
| fileList  | < Array >.object | 否   | 删除结果组成的数组。       |
| requestId | string         | 否   | 请求序列号，用于错误排查。 |

**fileList字段**

| 字段   | 类型   | 必填 | 说明      |
| ------ | ------ | ---- | --------- |
| fileID | string | 是   | 文件 ID。 |

```javascript
// 云函数删除文件示例代码
let result = await uniCloud.deleteFile({
    fileList: [
        "cloud://test-28farb/a.png" // 阿里云fileID是url形式，例：https://xxx.com/xxx.png
    ]
});
```



