# 面经

## 滴滴日常一面

自我介绍

一些基本情况：位置，实习时间等，项目是干嘛的，做过一些什么东西（聊得很少，项目太垃圾了）

为什么要用cs架构？随便说了个前后端分离，寄

cs和bs架构有什么不一样？不记得bs是啥了，寄

cs怎么向bs迁移，需要做些什么？答了个前端需要重写，后端不需要咋变，寄

数据库：

对数据库了解多少？

设计和使用数据库一般有哪些步骤？每一步主要干什么？需求，概念设计，逻辑设计，物理设计，使用和维护

生成表之类的是手写的还是机器生成的，对sql熟不熟悉？手写的，算挺熟悉

见过索引吗？乱说一堆

索引的作用是什么？答加快查询

还有其他功能？答保证唯一性

对排序和分组有影响吗，为什么有影响？不会，乱说

对索引的实现又什么理解，索引的逻辑结构，索引怎么建立的？不会，乱说

前缀索引是什么，他什么情况会生效，针对int，string，int三个索引是什么情况？不知道，都听不懂他问的是什么意思，答了个前缀索引是建立在字符串类型上，去前几个字符构建索引

用的mysql是什么版本？8，然后他叹气，不知道啥情况

有注意过information schema吗？没

表的原信息保存在哪？怎么实现的？不会

这些信息表的可见性如何？基本不会，然后他问不下去了，转问java

用过java多久了？三年

集合了解吗？

了解TreeMap？答可以用于检索和排序

TreeMap和HashMap的区别？不太会，重复了之前的回答，只答了个排序

hashMap增加一个元素的流程是什么？

hashTable了解过吗？线程安全，底层数组+链表

HashMap线程不安全体现在哪？为什么hashTable可以保证线程安全？

synchronized和lock有什么区别？他应该是想听答底层原理，但我没想到

synchronized方法可以访问非synchronized方法吗？我说不可以，他说再去思考一下

synchronized和volatile关键字有什么区别？

synchronized能保证可见性吗？

可见性是指的什么，底层原理？

java框架用过哪些？

IOC和DI的关系？

IOC依赖注入怎么实现的？

Spring运行需要容器吗？springboot需要吗？他启动的什么服务？都需要，我答了个Spring不需要，尬死，寄

mybatis的缓存和orm？不知道

抛开redis缓存这种概念，一般的缓存需要具备哪些功能？存储和拿取，容量，过期策略（重要）

用java设计缓存用什么数据结构，为什么用他？ConcurentHashMap，查询o(1)

使用ConcurentHashMap和用redis做缓存有什么区别？内存占用，前者无法分布式（重点，当时没想到）

ConcurentHashMap和用redis缓存那个快，为什么？

你用redis做过什么东西？只是跟着视频写了一些代码，寄

反问？

实习主要做什么，有什么难题？

因为它本身是做数据分析，所以用的mysql多，所以mysql和线程问的多

有什么建议：

java基础没什么问题，基本的软件工程知识，如cs，bs啥的，以及其他的原理需要多去了解：数据库，框架Springboot Springmvc，Spring cloud，ribbon，拦截器，消息队列，设计模式等等，说我简历写的也有点问题，很多知识没加上去，导致他不敢问

实习有几面，大概什么时候有下一步通知？





