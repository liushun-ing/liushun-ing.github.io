/**
 * 中间展示数据
 */
const JavaScript = [
  {
    title: "js基础知识",
    brief:
      "JavaScript（简称“JS”）是一种具有函数优先的轻量级，解释型或即时编译型的编程语言。本文是学习js基础教程过程中所做的笔记。包含this、构造函数、原型等方面的知识...",
    creationTime: "2022-01-20",
    href: "./js/2",
  },
  {
    title: "js高级知识",
    brief:
      "本文是在学习完js基础教程之后，对js的进一步深入了解，涉及到原型、闭包、执行上下文、对象创建、继承等js高级知识...",
    creationTime: "2022-02-22",
    href: "./js/3",
  },
  {
    title: "ES6知识",
    brief:
      "ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布了。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。本文是学习阮一峰ES教程时所做的笔记...",
    creationTime: "2022-02-26",
    href: "./js/4",
  },
  {
    title: "js小知识",
    brief:
      "本文主要用于记载一些在编程过程中所遇到的一些js的小知识，增强记忆......",
    creationTime: "2022-02-06",
    href: "./js/1",
  },
];

const HTML_CSS = [
  {
    title: "HTML和CSS基础",
    brief:
      "本文是学习HTML和CSS系列教程过程中所做的笔记，前半部分记录了HTML的标签、元素等相关知识，后半部分记录了CSS的选择器、伪类、定位、变形等基础知识...",
    creationTime: "2022-02-08",
    href: "./html&css/1",
  },
  {
    title: "CSS小知识",
    brief: "本文主要用于记录编写页面过程中所遇到的一些css样式问题...",
    creationTime: "2022-02-08",
    href: "./html&css/2",
  },
];

const JAVA = [
  {
    title: "MyBatis",
    brief:
      "MyBatis是一款优秀的持久层框架，它支持自定义SQL、存储过程以及高级映射。MyBatis免除了几乎所有的 JDBC 代码以及设置参数和获取结果集的工作...",
    creationTime: "2021-07-20",
    href: "./java/Mybatis",
  },
  {
    title: "Spring",
    brief:
      "Spring是一个轻量级的控制反转(IOC)和面向切面(AOP)的容器框架。轻量——从大小与开销两方面而言Spring都是轻量的；控制反转...",
    creationTime: "2021-07-28",
    href: "./java/Spring",
  },
  {
    title: "SpringMVC",
    brief:
      "Spring MVC是Spring Framework的一部分，是基于Java实现MVC的轻量级Web框架。Spring的web框架围绕DispatcherServlet[调度Servlet ]设计...",
    creationTime: "2021-08-10",
    href: "./java/SpringMVC",
  },
  {
    title: "SpringBoot",
    brief:
      "构建一个个功能独立的微服务应用单元，可以使用springboot，其可以帮我们快速构建一个应用;其设计目的是用来简化新Spring应用的初始搭建以及开发过程",
    creationTime: "2021-08-25",
    href: "./java/SpringBoot",
  },
  {
    title: "SpringCloud微服务搭建和调用",
    brief:
      "记录了自己学者使用springcloud来搭建微服务的过程，作为以后使用微服务提供一个搭建思路，也实现了微服务间的简单调用....",
    creationTime: "2021-06-18",
    href: "./java/6",
  },
  {
    title: "问题总结",
    brief:
      "用来记录自己在写java项目时遇到的一些问题，如依赖注入失败，日期转换等....还需要多记录....",
    creationTime: "2021-04-20",
    href: "./java/5",
  },
];

const MiniProgram = [
  {
    title: "MiniProgram小知识",
    brief:
      "本文主要用于记录微信小程序开发过程中所遇到的一些问题，汲取的一些教训，方便之后复习，如自定义组件、Towxml工具的使用、如何封装request...",
    creationTime: "2021-12-28",
    href: "./miniProgram/1",
  },
  {
    title: "MiniProgram部分语法",
    brief: "本文是学习小程序教程时，记录的一小部分语法知识...",
    creationTime: "2021-10-11",
    href: "./miniProgram/2",
  },
];

const React = [
  {
    title: "React入门",
    brief:
      "学习React全家桶教程第一次笔记，主要记录了一些基础的概念，以及jsx语法扩展...",
    creationTime: "2022-02-28",
    href: "./react/1",
  },
  {
    title: "React面向组件编程",
    brief:
      "学习React全家桶教程第二次笔记，主要记录了组件的概念及分类，以及组件的三大属性，以及组件的生命周期介绍...",
    creationTime: "2022-03-01",
    href: "./react/2",
  },
  {
    title: "React应用(基于React脚手架)",
    brief:
      "学习React全家桶教程第三次笔记，主要介绍了一款常用的react脚手架create-react-app的使用...",
    creationTime: "2022-03-02",
    href: "./react/3",
  },
  {
    title: "React案例练习",
    brief:
      "学习React全家桶教程案例笔记，主要记录了一些教程中编写的案例，加深记忆...",
    creationTime: "2022-03-04",
    href: "./react/4",
  },
  {
    title: "React ajax",
    brief:
      "学习React全家桶教程第四次笔记，主要记录了react中axios的使用，以及消息订阅-发布机制的使用，方便组件间通信...",
    creationTime: "2022-03-05",
    href: "./react/5",
  },
  {
    title: "React路由",
    brief:
      "学习React全家桶教程第五次笔记，主要记录了路由的理解，和react5.x路由插件库react-router-dom的使用...",
    creationTime: "2022-03-06",
    href: "./react/6",
  },
  {
    title: "Redux",
    brief:
      "学习React全家桶教程第六次笔记，redux是一个专门用于做状态管理的JS库，用来集中式管理react应用中多个组件共享的状态，重点是react-redux的使用...",
    creationTime: "2022-03-07",
    href: "./react/7",
  },
  {
    title: "React扩展",
    brief:
      "学习React全家桶教程扩展，主要记录了一些语法用法的扩展，并且开始引入Hooks的使用来方便函数组件间通信...",
    creationTime: "2022-03-08",
    href: "./react/8",
  },
  {
    title: "React Router 6",
    brief:
      "学习React全家桶教程React Router 6笔记，主要介绍了一些router6版本的新的语法，并且介绍了很多新的Hooks，进一步方便了函数式组件的使用，函数式组件已经成为了趋势...",
    creationTime: "2022-03-09",
    href: "./react/9",
  },
];

const VUE = [
  {
    title: "vue封装axios api",
    brief:
      "本日志主要记录了自己在vue项目中如何学习封装axios, 进行代码封装和模块化, 实现更加方便的api管理...",
    creationTime: "2021-12-20",
    href: "./vue/api_tutorial",
  },
  {
    title: "vue问题合集",
    brief: "本文章主要用来整理记录自己在写vue项目时，遇到的一些问题...",
    creationTime: "2022-05-04",
    href: "./vue/basic_tutorial",
  },
];

const CentOS = [
  {
    title: "Centos防火墙操作",
    brief: "本日志主要整理了centos系统的一些防火墙的基本操作...",
    creationTime: "2022-04-27",
    href: "./centos/firewall_tutorial",
  },
  {
    title: "Centos7安装MySQL",
    brief: "本日志主要记录了自己如何在CentOS云服务器上安装mysql服务...",
    creationTime: "2022-04-23",
    href: "./centos/mysql_tutorial",
  },
  {
    title: "Centos7安装nginx",
    brief: "本日志主要记录了自己如何在CentOS云服务器上安装nignx服务...",
    creationTime: "2022-04-24",
    href: "./centos/nginx_tutorial",
  },
  {
    title: "Centos使用docker",
    brief:
      "本日志主要整理了在centos7上如何安装docker，并且使用如何使用docker来配置nginx和mysql镜像，并实例化容器对象，最终运行mysql和nginx服务...",
    creationTime: "2022-05-09",
    href: "./centos/docker_tutorial",
  },
  {
    title: "Centos基本操作",
    brief:
      "本日志主要整理了一些centos的基本操作，包括查看进程，杀死进程，配置java环境，如何部署springboot项目，25号占用等问题...",
    creationTime: "2022-04-29",
    href: "./centos/other_tutorial",
  },
];

const OperatingSystem = [
  {
    title: "操作系统导论",
    brief:
      "操作系统课程导论章节笔记，记录了操作系统概念、结构、操作、存储结构等知识",
    creationTime: "2021-03-05",
    href: "./operating_system/1",
  },
  {
    title: "操作系统结构",
    brief:
      "操作系统课程结构章节笔记，记录了操作系统服务、系统调用、操作系统设计与实现、操作系统结构等知识",
    creationTime: "2021-03-15",
    href: "./operating_system/2",
  },
  {
    title: "进程",
    brief:
      "操作系统课程进程章节笔记，记录了进程概念、进程调度、进程运行、进程间通信、客户机与服务器之间的通信等知识",
    creationTime: "2021-03-24",
    href: "./operating_system/3",
  },
  {
    title: "多线程编程",
    brief:
      "操作系统课程多线程编程章节笔记，记录了多线程概念、多线程模型，以及多线程的一些问题，重点是多线程的多种模型...",
    creationTime: "2021-04-07",
    href: "./operating_system/4",
  },
  {
    title: "进程调度",
    brief:
      "操作系统课程进程调度章节笔记，记录了进程调度的基本概念、调度算法、线程调度等知识，重点是掌握各种进程调度算法...",
    creationTime: "2021-04-15",
    href: "./operating_system/5",
  },
  {
    title: "进程同步",
    brief:
      "操作系统课程进程同步章节笔记，记录了进程同步的背景、临界区问题、以及一些经典的进程同步问题、并给出了一些解决方案...",
    creationTime: "2021-04-23",
    href: "./operating_system/6",
  },
  {
    title: "死锁",
    brief:
      "操作系统课程死锁章节笔记，记录了死锁的概念、特征、以及经典的死锁预防、避免、检测算法，以及如何从死锁中恢复...",
    creationTime: "2021-04-30",
    href: "./operating_system/7",
  },
  {
    title: "内存管理策略",
    brief:
      "操作系统课程内存管理策略章节笔记，记录了内存管理的背景、以及如何进程内存管理等知识，重点是掌握交换、分页、分段、页表等内容...",
    creationTime: "2021-05-08",
    href: "./operating_system/8",
  },
  {
    title: "虚拟内存",
    brief:
      "操作系统课程虚拟内存章节笔记，记录了虚拟内存的概念、以及页面和帧置换、系统颠簸等知识，重点在于掌握和比较各种页面置换算法之间的异同点...",
    creationTime: "2021-05-17",
    href: "./operating_system/9",
  },
  {
    title: "文件系统接口",
    brief:
      "操作系统课程文件系统接口章节笔记，记录了关于文件、以及如何访问文件等知识...",
    creationTime: "2021-05-23",
    href: "./operating_system/10",
  },
  {
    title: "文件系统实现",
    brief:
      "操作系统课程文件系统实现章节笔记，记录了文件系统结构、实现、管理等知识，主要在于各种内存分配的方法...",
    creationTime: "2021-05-30",
    href: "./operating_system/11",
  },
  {
    title: "大容量存储器的结构",
    brief:
      "操作系统课程大容量存储器的结构章节笔记，记录了磁盘结构、磁盘调度、磁盘管理、交换空间管理等知识，重点在掌握磁盘调度的算法...",
    creationTime: "2021-06-11",
    href: "./operating_system/12",
  },
  {
    title: "I/O系统",
    brief:
      "操作系统课程I/O系统章节笔记，记录了有关I/O系统的轮询、中断、阻塞、缓冲等知识...",
    creationTime: "2021-06-20",
    href: "./operating_system/13",
  },
  {
    title: "期末重点复习",
    brief:
      "操作系统课程期末复习资料笔记，主要对一些比较重要的知识进行了汇总...",
    creationTime: "2021-07-11",
    href: "./operating_system/14",
  },
];

const ComputerNetworkTechnology = [
  {
    title: "计算机网络和因特网",
    brief:
      "计算机网络技术课程计算机网络和因特网章节笔记，记录了网络资源、网络核心、各种时延、协议层次等知识...",
    creationTime: "2022-03-06",
    href: "./computer_network/1",
  },
  {
    title: "应用层",
    brief:
      "计算机网络技术课程应用层章节笔记，记录了应用层协议原理、进程通信、HTTP服务、缓存、邮件传输协议、DNS、套接字编程等知识...",
    creationTime: "2022-04-02",
    href: "./computer_network/2",
  },
  {
    title: "运输层",
    brief:
      "计算机网络技术课程运输层章节笔记：运输层的两种协议TCP和UDP、以及可靠数据传输协议的构建、涉及回退N步和选择重传和TCP的拥塞控制原理等知识...",
    creationTime: "2022-04-25",
    href: "./computer_network/3",
  },
  {
    title: "网络层数据平面",
    brief:
      "计算机网络技术课程网络层章节笔记，记录了网络层数据平面的基础知识，如路由器结构和功能、IPv4和IPv6数据报格式定义、IPv4编址和子网分配，DHCP协议寻址等等...",
    creationTime: "2022-05-10",
    href: "./computer_network/4",
  },
  {
    title: "网络层控制平面",
    brief:
      "计算机网络技术课程网络层章节笔记，记录了网络层控制平面的一些基础知识，如两种路由选择算法、因特网AS内部和AS之间的路由选择协议、ICMP协议等等...",
    creationTime: "2022-05-20",
    href: "./computer_network/5",
  },
  {
    title: "链路层和局域网",
    brief:
      "计算机网络技术课程链路层和局域网章节笔记，记录了链路层的基本概念、交换机和路由器的区别、MAC地址，以及MAC协议还有最重要的ARP协议...",
    creationTime: "2022-06-08",
    href: "./computer_network/6",
  },
];

const DatastructureAndAlgorithm = [
  {
    title: "排序和查找",
    brief:
      "主要记录了数据结构众多排序算法（冒泡、选择、快速、桶）和查找算法（二分、二叉树、顺序、散列）的基本思想和概念，以及伪代码...",
    creationTime: "2022-05-10",
    href: "./datastructure_and_algorithm/sort_and_search",
  },
  {
    title: "树",
    brief:
      "主要记录了数据结构树的一些知识，包括树的存储结构，二叉搜索树、平衡二叉树的一些基本概念，以及树的应用（哈夫曼编码，堆树）等等...",
    creationTime: "2022-05-15",
    href: "./datastructure_and_algorithm/tree",
  },
  {
    title: "其他树结构",
    brief:
      "主要记录了数据结构其他树的一些概念，如B树，B+树，以及红黑树，主要用于了解，没有深入研究...",
    creationTime: "2022-05-20",
    href: "./datastructure_and_algorithm/other_tree",
  },
  {
    title: "图",
    brief:
      "主要记录了数据结构图的一些知识，包括图的物理存储方式，图的数据结构，图的遍历算法，图的应用（最短路径、拓扑排序）等等知识...",
    creationTime: "2022-05-30",
    href: "./datastructure_and_algorithm/graph",
  },
  {
    title: "串",
    brief:
      "主要记录了数据结构串的一些知识，包括传的基本知识，最重要的就是串的匹配算法————KMP...",
    creationTime: "2022-06-03",
    href: "./datastructure_and_algorithm/string",
  },
  {
    title: "算法",
    brief:
      "主要记录了算法的一些知识，包括动态规划、贪心算法的基本思想和一些经典实例...",
    creationTime: "2022-06-08",
    href: "./datastructure_and_algorithm/algorithms",
  },
  {
    title: "c++用法",
    brief:
      "主要记录了c++的stl中常用数据结构，如vector,stack,map,heap的使用...",
    creationTime: "2022-06-20",
    href: "./datastructure_and_algorithm/c++",
  },
]

export {
  JavaScript,
  HTML_CSS,
  JAVA,
  MiniProgram,
  VUE,
  CentOS,
  OperatingSystem,
  ComputerNetworkTechnology,
  React,
  DatastructureAndAlgorithm
};
