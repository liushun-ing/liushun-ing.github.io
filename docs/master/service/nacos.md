# Nacos入门

之前写的一个Spring cloud + nacos的[入门案例](https://liushun-ing.github.io/home/tech/java/6.html)

## Nacos简介

Nacos是阿里的一个开源产品，它是针对微服务架构中的服务发现、配置管理、服务治理的综合型解决方案。

官网介绍：

> Nacos 致力于帮助您发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，帮助您实现动态服务发现、服务配置管理、服务及流量管理。 Nacos 帮助您更敏捷和容易地构建、交付和管理微服务平台。Nacos 是构建以“服务”为中心的现代应用架构的服务基础设施。

如何安装之前的笔记已经记载过了，默认的端口为8848，登陆的账号密码默认为nacos

单机模式时nacos默认使用嵌入式数据库实现数据的存储，若想使用外部mysql存储nacos数据，需要在配置文件里面配置数据源，并在数据库新建nacos_config，并执行安装包里面给的sql文件。

## 单体架构到微服务

### 单体架构

Web应用程序发展的早期，大部分web工程师将所有的功能模块打包到一起并放在一个web容器中运行，所有功能模块使用同一个数据库，同时，它还提供API或者UI访问的web模块等。

尽管也是模块化逻辑，但是最终它还是会打包并部署为单体式应用，这种将所有功能都部署在一个web容器中运行的系统就叫做**单体架构**（也叫：巨石型应用）。

单体架构有很多好处：

- **开发效率高**：模块之间交互采用本地方法调用，并节省微服务之间的交互讨论时间与开发成本。
- **容易测试**：IDE都是为开发单个应用设计的、容易测试——在本地就可以启动完整的系统。
- **容易部署**：运维成本小，直接打包为一个完整的包，拷贝到web容器的某个目录下即可运行。

但是，上述的好处是有条件的，它适用于小型简单应用，对于大规模的复杂应用，就会展现出来以下的不足：

- **复杂性逐渐变高，可维护性逐渐变差** ：所有业务模块部署在一起，复杂度越来越高，修改时牵一发动全身。
- **版本迭代速度逐渐变慢**：修改一个地方就要将整个应用全部编译、部署、启动时间过长、回归测试周期过长。
- **阻碍技术创新**：若更新技术框架，除非你愿意将系统全部重写，无法实现部分技术更新。
- **无法按需伸缩**：通过冗余部署完整应用的方式来实现水平扩展，无法针对某业务按需伸缩。

### 微服务

许多大型公司，通过采用微服务架构解决了上述问题。其思路不是开发一个巨大的单体式的应用，而是将应用分解为小的、互相连接的微服务。

一个微服务一般完成某个特定的功能，比如订单服务、用户服务等等。每一个微服务都是完整应用，都有自己的业务逻辑和数据库。一些微服务还会发布API给其它微服务和应用客户端使用。

每一个业务模块都使用独立的服务完成，这种微服务架构模式也影响了应用和数据库之间的关系，不像传统多个业务模块共享一个数据库，微服务架构每个服务都有自己的数据库。

微服务架构的好处：

- 分而治之，职责单一；易于开发、理解和维护、方便团队的拆分和管理
- 可伸缩；能够单独的对指定的服务进行伸缩
- 局部容易修改，容易替换，容易部署，有利于持续集成和快速迭代
- 不会受限于任何技术栈

## Nacos集群部署

3个或3个以上Nacos节点才能构成集群

（1）安装3个以上Nacos

我们可以复制之前已经解压好的nacos文件夹，分别命名为nacos、nacos1、nacos2

（2）配置集群配置文件

在所有nacos目录的conf目录下，有文件 cluster.conf.example ，将其命名为 cluster.conf ，并将每行配置成ip:port。（请配置3个或3个以上节点）

```conf
\# ip:port
127.0.0.1:8848
127.0.0.1:8849
127.0.0.1:8850
```

然后分别以cluster模式启动，他会自动搭建集群，然后选举一个leader，如果leader挂了，会自动选举新的leader

客户端配置多个节点即可

```yml
spring:
  application:
    name: xxxx
  cloud:
    nacos:
      config:
      	server‐addr: 127.0.0.1:8848,127.0.0.1:8849,127.0.0.1:8850
```

此外，还可以通过配置文件，使nacos有多个数据源，也就是配置多个mysql

```conf
spring.datasource.platform=mysql
db.num=2
db.url.0=jdbc:mysql://127.0.0.1:3306/nacos_config?characterEncoding=utf8&autoReconnect=true
db.url.1=jdbc:mysql://127.0.0.1:3306/nacos_config?characterEncoding=utf8&autoReconnect=true
db.user=root
db.password=root
```



## 配置管理

### 配置

应用程序在启动和运行的时候往往需要读取一些配置信息，配置基本上伴随着应用程序的整个生命周期，比如：数据库连接参数、启动参数等。

配置主要有以下几个特点：

**配置是独立于程序的只读变量**：配置对于程序是只读的，程序通过读取配置来改变自己的行为，但是程序不应该去改变配置

**配置伴随应用的整个生命周期**：配置贯穿于应用的整个生命周期，应用在启动时通过读取配置来初始化，在运行时根据配置调整行为。比如：启动时需要读取服务的端口号、系统在运行过程中需要读取定时策略执行定时任务等。

**配置可以有多种加载方式**：常见的有程序内部hard code，配置文件，环境变量，启动参数，基于数据库等

**配置需要治理**：同一份程序在不同的环境（开发，测试，生产）、不同的集群（如不同的数据中心）经常需要有不同的配置，所以需要有完善的环境、集群配置管理

### 配置中心

在微服务架构中，当系统从一个单体应用，被拆分成分布式系统上一个个服务节点后，配置文件也必须跟着迁移（分割），这样配置就分散了，不仅如此，分散中还包含着冗余。配置中心将配置从各应用中剥离出来，对配置进行统一管理，应用自身不需要自己去管理配置。

<img src="./nacos.assets/%E6%88%AA%E5%B1%8F2024-03-1221.27.25.png" alt="截屏2024-03-12 21.27.25" style="zoom:50%;" />

总得来说，配置中心就是一种**统一管理各种应用配置的基础服务组件**。

一个合格的配置中心需要满足如下特性：

- 配置项容易读取和修改
- 分布式环境下应用配置的可管理性，即提供远程管理配置的能力
- 支持对配置的修改的检视以把控风险
- 可以查看配置修改的历史记录
- 不同部署环境下应用配置的隔离性

### nacos配置管理模型

对于Nacos配置管理，通过Namespace、group、Data ID能够定位到一个配置集。

配置集(Data ID)

在系统中，一个配置文件通常就是一个配置集，一个配置集可以包含了系统的各种配置信息，例如，一个配置集可能包含了数据源、线程池、日志级别等配置项。每个配置集都可以定义一个有意义的名称，就是配置集的ID即Data ID。

配置分组(Group)

配置分组是对配置集进行分组，通过一个有意义的字符串（如 Buy 或 Trade ）来表示，不同的配置分组下可以有相同的配置集（Data ID）。当在 Nacos 上创建一个配置时，如果未填写配置分组的名称，则配置分组的名称默认采用 DEFAULT_GROUP 。配置分组的常见场景：可用于区分不同的项目或应用，例如：学生管理系统的配置集可以定义一个group为：STUDENT_GROUP。

命名空间(Namespace)

命名空间（namespace）可用于进行不同环境的配置隔离。例如可以隔离开发环境、测试环境和生产环境，因为它们的配置可能各不相同，或者是隔离不同的用户，不同的开发人员使用同一个nacos管理各自的配置，可通过namespace隔离。不同的命名空间下，可以存在相同名称的配置分组(Group) 或 配置集。

java获取配置集，先添加nacos‐client依赖

nacos服务地址，必须指定；namespace，如不指定默认public；group，如不指定默认 DEFAULT_GROUP；dataId，必须指定

```java
// 初始化配置服务，
String serverAddr = "127.0.0.1:8848";
String namespace = "ee247dde‐d838‐425c‐b371‐029dab26232f"; //开发环境
String group = "DEFAULT_GROUP"; //默认组
String dataId = "nacos‐simple‐demo.yaml";
Properties properties = new Properties();
properties.put("serverAddr", serverAddr);
properties.put("namespace", namespace);
ConfigService configService = NacosFactory.createConfigService(properties);
//获取配置，并输出控制台
String content = configService.getConfig(dataId, group, 5000);
System.out.println(content);
```

### nacos配置监听

```java
ConfigService configService = NacosFactory.createConfigService(properties);
//获取配置,String dataId, String group, long timeoutMs
String content = configService.getConfig(dataId, group, 5000);
System.out.println(content);
//添加监听String dataId, String group, Listener listener
configService.addListener(dataId, group, new Listener() {
  public Executor getExecutor() {
    return null;
  }
  public void receiveConfigInfo(String s) {
    //当配置发生变化时的响应
    System.out.println(s);
  }
});
```

### nacos分布式应用配置

<img src="./nacos.assets/%E6%88%AA%E5%B1%8F2024-03-1221.54.10.png" alt="截屏2024-03-12 21.54.10" style="zoom:50%;" />

用户通过Nacos Server的控制台集中对多个服务的配置进行管理。

各服务统一从Nacos Server中获取各自的配置，并监听配置的变化。

使用Spring Cloud Alibaba Nacos Config在Spring Cloud应用中集成Nacos，通过Spring cloud原生方式快捷的获取配置内容。

Spring Cloud是什么：

> Spring Cloud是一系列框架的有序集合。它利用Spring Boot的开发便利性巧妙地简化了分布式系统基础设施的开发，如服务发现注册、配置中心、消息总线、负载均衡、断路器、数据监控等，都可以用Spring Boot的开发风格做到一键启动和部署。Spring Cloud并没有重复制造轮子，它只是将目前各家公司开发的比较成熟、经得起实际考验的服务框架组合起来，集成最多的组件要属Netflix公司，通过Spring Boot风格进行再封装屏蔽掉了复杂的配置和实现原理，最终给开发者留出了一套简单易懂、易部署和易维护的分布式系统开发工具包。

Spring Cloud Alibaba Nacos Config是什么：

> Spring Cloud Alibaba Nacos Discovery是Spring Cloud Alibaba的子项目，而Spring Cloud Alibaba是阿里巴巴公司提供的开源的基于Spring cloud的微服务套件合集，它致力于提供微服务开发的一站式解决方案，可以理解为spring cloud是一套微服务开发的标准 ，spring cloud alibaba与spring cloud Netflix是实现。使用 Spring Cloud Alibaba方案，开发者只需要添加一些注解和少量配置，就可以将 Spring Cloud 应用接入阿里分布式应用解决方案，通过阿里中间件来迅速搭建分布式应用系统。

由于Nacos是阿里的中间件，因此，若开发Spring cloud微服务应用，使用Spring Cloud Alibaba Nacos Config来集成Nacos的配置管理功能是比较明智的选择。

**父工程**

引入Spring cloud的相关依赖，进行统一管理，这样子工程只需要继承父工程，便会自动引入该依赖，不需要重复配置

```xml
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>com.alibaba.cloud</groupId>
      <artifactId>spring‐cloud‐alibaba‐dependencies</artifactId>
      <version>2.1.0.RELEASE</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring‐cloud‐dependencies</artifactId>
      <version>Greenwich.RELEASE</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring‐boot‐dependencies</artifactId>
      <version>2.1.3.RELEASE</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
```

**子工程**

只需要引入自身特定的依赖即可

```xml
<dependencies>
  <dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring‐cloud‐starter‐alibaba‐nacos‐config</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring‐boot‐starter‐web</artifactId>
  </dependency>
</dependencies>
```

bootstrap.yml

这里建议使用bootstrap.yaml，而不是application.yaml

bootstrap.yml 和 application.yml 都可以用来配置参数。

在 Spring Boot 中有两种上下文，一种是 bootstrap，另外一种是 application。bootstrap 是系统级的资源配置项，application是用户级的资源配置项。boostrap 由父 ApplicationContext 加载，比 applicaton 优先加载。bootstrap 具有更高优先级，它不会被本地配置覆盖。

bootstrap 主要用于负责从外部源加载配置属性并解析。也就是比如nacos之类的微服务的注册中心、配置中心。

```yml
server:
	port: 56010 #启动端口 命令行注入
spring:
	application:
		name: service1
	cloud:
		nacos:
			config:
				server‐addr: 127.0.0.1:8848 # 配置中心地址
				file‐extension: yaml #最终的配置id为service1.yaml，由两者拼接而成
				namespace: c67e4a97‐a698‐4d6d‐9bb1‐cfac5f5b51c4 # 开发环境
				group: TEST_GROUP # 测试组
```

引入相关Spring cloud依赖并做好配置之后，nacos上的配置就会自动加载到程序中了



**扩展配置**

以上的配置只可以从nacos加载一个配置文件，Spring Cloud Alibaba Nacos Config可支持自定义 Data Id 的配置，也就是支持加载多个配置集

```yml
spring:
	application:
		name: service2
	cloud:
		nacos:
			config:
        server‐addr: 127.0.0.1:8848
        # config external configuration
        # 1、Data Id 在默认的组 DEFAULT_GROUP,不支持配置的动态刷新
        ext‐config[0]:
        	data‐id: ext‐config‐common01.properties
        # 2、Data Id 不在默认的组，不支持动态刷新
        ext‐config[1]:
          data‐id: ext‐config‐common02.properties
          group: GLOBALE_GROUP
        # 3、Data Id 既不在默认的组，也支持动态刷新
        ext‐config[2]:
          data‐id: ext‐config‐common03.properties
          group: REFRESH_GROUP
          refresh: true
```

此外还支持共享data id配置

```yml
spring:
  cloud:
    nacos:
      config:
        shared‐dataids: ext‐config‐common01.properties,ext‐config‐common02.properties
        refreshable‐dataids: ext‐config‐common01.properties
```

优先级问题：

Spring Cloud Alibaba Nacos Config 目前提供了三种配置能力从 Nacos 拉取相关的配置。

A: 通过 spring.cloud.nacos.config.shared-dataids 支持多个共享 Data Id 的配置

B: 通过 spring.cloud.nacos.config.ext-config[n].data-id 的方式支持多个扩展 Data Id 的配置，多个Data Id 同时配置时，他的优先级关系是 spring.cloud.nacos.config.ext-config[n].data-id 其中 n 的值越大，优先级越高。

C: 通过内部相关规则(应用名、扩展名 )自动生成相关的 Data Id 配置

当三种方式共同使用时，他们的一个优先级关系是:C > B >A



## 服务发现

### 介绍

在微服务架构中，整个系统会按职责能力划分为多个服务，通过服务之间协作来实现业务目标。代码中免不了要进行服务间的远程调用，服务的消费方要调用服务的生产方，为了完成一次请求，消费方需要知道服务生产方的网络位置(IP地址和端口号)。

<img src="./nacos.assets/%E6%88%AA%E5%B1%8F2024-03-1222.36.47.png" alt="截屏2024-03-12 22.36.47" style="zoom:50%;" />

上图中服务实例本身并不记录服务生产方的网络地址，所有服务实例内部都会包含**服务发现客户端**。

（1）在每个服务启动时会向**服务发现中心**上报自己的网络位置。这样，在服务发现中心内部会形成一个**服务注册表**，**服务注册表**是服务发现的核心部分，是包含所有服务实例的网络地址的数据库。

（2）**服务发现客户端**会定期从**服务发现中心**同步**服务注册表** ，并缓存在客户端。

（3）当需要对某服务进行请求时，服务实例通过该注册表，定位目标服务网络地址。若目标服务存在多个网络地址，则使用负载均衡算法从多个服务实例中选择出一个，然后发出请求。

总结一下，在微服务环境中，由于服务运行实例的网络地址是不断动态变化的，服务实例数量的动态变化 ，因此无法使用固定的配置文件来记录服务提供方的网络地址，必须使用动态的服务发现机制用于实现微服务间的**相互感知**。各服务实例会上报自己的网络地址，这样服务中心就形成了一个完整的服务注册表，各服务实例会通过**服务发现中心**来获取访问目标服务的网络地址，从而实现**服务发现**的机制。

### Spring cloud服务协作流程

Spring Cloud 常见的集成方式是使用Feign+Ribbon技术来完成服务间远程调用及负载均衡的

<img src="./nacos.assets/%E6%88%AA%E5%B1%8F2024-03-1222.42.54.png" alt="截屏2024-03-12 22.42.54" style="zoom:50%;" />

（1）在微服务启动时，会向服务发现中心上报自身实例信息，这里ServiceB 包含多个实例。每个实例包括：IP地址、端口号信息。

（2）微服务会定期从Nacos Server(服务发现中心)获取服务实例列表。

（3）当ServiceA调用ServiceB时，ribbon组件从本地服务实例列表中查找ServiceB的实例，如获取了多个实例如Instance1、Instance2。这时ribbon会通过用户所配置的**负载均衡策略**从中选择一个实例。

（4）最终，Feign组件会通过ribbon选取的实例发送http请求。Feign集成了Ribbon，Feign使用Ribbon完成调用实例的负载均衡。



#### 负载均衡概念

**负载均衡**就是将用户请求（流量）通过一定的策略，分摊在多个服务实例上执行，它是系统处理高并发、缓解网络压力和进行服务端扩容的重要手段之一。它分为**服务端负载均衡**和**客户端负载均衡**。

服务端：在负载均衡器中维护一个可用的服务实例清单，当客户端请求来临时，负载均衡服务器按照某种配置好的规则(**负载均衡算法**)从可用服务实例清单中选取其一去处理客户端的请求。这就是服务端负载均衡。

例如Nginx，通过Nginx进行负载均衡，客户端发送请求至Nginx，Nginx通过负载均衡算法，在多个服务器之间选择一个进行访问。即在服务器端再进行负载均衡算法分配。

客户端：Ribbon，就属于客户端负载均衡。在ribbon客户端会有一个服务实例地址列表，在发送请求前通过负载均衡算法选择一个服务实例，然后进行访问，即在客户端就进行负载均衡算法分配。客户端本身会维护一个服务注册表，而不是通过访问负载均衡器去分发。

一般的策略有：轮询，随机，响应时间，是否故障，连接数量等等

#### Feign介绍

Feign是Netflix开发的声明式、模板化的HTTP客户端， Feign可以帮助我们更快捷、优雅地调用HTTP API。Feign的英文表意为“假装，伪装，变形”， 可以理解为将HTTP报文请求方式伪装为简单的java接口调用方式。Feign默认集成了Ribbon，可以直接使用

如seviceB暴露了一个接口

```java
@GetMapping(value = "/service") //暴露服务
public String service(){
	return "provider invoke";
}
```

其他服务可以如下使用：

1、引入依赖

还需要在spring cloud 启动类中标注@EnableFeignClients，表明此项目开启Feign客户端

```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring‐cloud‐starter‐openfeign</artifactId>
</dependency>
```

2、声明Feign客户端

新建一个包，创建如下接口就行，添加注解，并指明需要调用的服务名

```java
@FeignClient(value = "serviceB")
public interface ServiceBAgent {
  /**
  * 根据用户名查询账号信息
  * @param username 用户名
  * @return 账号信息
  */
  @GetMapping(value = "/service")
  public String service();
}
```

3、业务调用

```java
@Autowired
private ServiceBAgent serviceBAgent;
//....略
serviceBAgent.service();
//....略
```

在业务调用时，feign减少了与业务无关的http请求相关代码的编写，使业务逻辑清晰。分析一下Feign做了哪些事儿：

在声明Feign客户端之后，Feign会根据@FeignClient注解使用java的动态代理技术生成代理类，在这里我们指定@FeignClient value为serviceB，则说明这个类的远程目标为spring cloud的服务名称为serviceB的微服务。

serviceB的具体访问地址，Feign会交由ribbon获取，若该服务有多个实例地址，ribbon会采用指定的负载均衡策略选取实例。Ribbon的实例列表来源是由Spring cloud的服务发现中心提供（可以为Nacos）

Feign兼容spring的web注解（如：@GetMapping），它会分析声明Feign客户端方法中的Spring注解，得出Http请求method、参数信息以及返回信息结构。

当业务调用Feign客户端方法时，会调用代理类，根据以上分析结果，由代理类完成实际的参数封装、远程http请求，返回结果封装等操作。



### nacos分布式服务发现

搭建父工程和之前一样，子工程需要导入的依赖变了，不是配置的依赖，而是发现的依赖了

```xml
<dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring‐cloud‐starter‐alibaba‐nacos‐discovery</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring‐boot‐starter‐web</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring‐cloud‐starter‐openfeign</artifactId>
</dependency>
```

配置文件里面也是配置服务发现的配置

```yml
server:
  port: 56010 #启动端口
    spring:
      application:
        name: quickstart‐provider
  cloud:
    nacos:
      discovery:
      	server‐addr: 127.0.0.1:8848
      	namespace: a1f8e863‐3117‐48c4‐9dd3‐e9ddc2af90a8 # 开发环境
				cluster‐name: DEFAULT # 默认集群，可不填写
```

然后给启动类添加@EnableDiscoveryClient注解，从Spring Cloud Edgware开始，`@EnableDiscoveryClient可省略。只需加上相关依赖，并进行相应配置，即可将微服务注册到服务发现组件上。

然后就可以基于此构建微服务，并且相互之间调用了

### 数据模型

Nacos在经过阿里内部多年生产经验后提炼出的数据模型，则是一种服务-集群-实例的三层模型，这样基本可以满足服务在所有场景下的数据存储和管理。

<img src="./nacos.assets/%E6%88%AA%E5%B1%8F2024-03-1223.20.32.png" alt="截屏2024-03-12 23.20.32" style="zoom:50%;" />

**命名空间(Namespace)**

用于进行租户粒度的配置隔离，命名空间不仅适用于nacos的配置管理，同样适用于服务发现。Namespace 的常用场景之一是不同环境的配置的区分隔离，例如开发测试环境和生产环境的资源（如配置、服务）隔离等。

**服务**

提供给客户端的软件功能，通过预定义接口网络访问。

**服务名**

服务提供的标识，通过该标识可以唯一确定其指代的服务。

**实例**

提供一个或多个服务的具有可访问网络地址（IP:Port）的进程，启动一个服务，就产生了一个服务实例。

**元信息**

Nacos数据（如配置和服务）描述信息，如服务版本、权重、容灾策略、负载均衡策略、鉴权配置、各种自定义标签 (label)，从作用范围来看，分为服务级别的元信息、集群的元信息及实例的元信息。

**集群**

服务实例的集合，服务实例组成一个默认集群, 集群可以被进一步按需求划分，划分的单位可以是虚拟集群，相同集群下的实例才能相互感知。



## 网关gateway

原来的单体架构，所有的服务都是本地的，UI可以直接调用，现在按功能拆分成独立的服务，跑在独立的一般都在独立的虚拟机上的 Java进程了。客户端UI如何访问？他的后台有N个服务，前台就需要记住管理N个服务，一个服务下线/更新/升级，前台就要重新部署，这明显不服务我们拆分的理念，特别当前台是移动应用的时候，通常业务变化的节奏更快。另外，N个小服务的调用也是一个不小的网络开销。

![截屏2024-03-12 23.24.44](./nacos.assets/%E6%88%AA%E5%B1%8F2024-03-1223.24.44.png)

有了网关作为服务统一入口，就可以避免上述问题，不仅如此，服务网关是在微服务前边设置一道屏障，请求先到服务网关，网关会对请求进行过虑、校验、路由等处理。有了服务网关可以提高微服务的安全性，网关校验请求的合法性，请求不合法将被拦截，拒绝访问。

- 提供统一服务入口，让微服务对前台透明
- 聚合后台的服务，节省流量，提升性能
- 提供安全，过滤，流控等API管理功能

简单的网关就只需要做好配置文件，然后将该网关注册到nacos，并启动就好了

配置文件里面配置服务分发和负载均衡，跨域等的细节，如：

将请求为 /application1/ 开头的请求路由至 application1 服务，保留请求url中的 /application1/ 。

```java
zuul:
  routes:
    application1:
      stripPrefix: false
      path: /application1/**
```

或者采用Spring cloud Gateway

```yml
spring:
  application:
    name: gateway
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
    gateway:
      discovery:
        locator:
          # 让gateway通过服务发现组件找到其他微服务
          enabled: true
      #跨域配置
      globalcors:
        cors-configurations:
          '[/**]':
            allowedOrigins: "*"
            allowedMethods: "*"
            allowedHeaders: "*"
```

还可以配置分发原则

```yml
server:
  # 统一的访问入口
  port: 9999
spring:
  application:
    name: nacos-gateway
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
    gateway:
      discovery:
        locator:
          enabled: true #开启表示根据微服务名称映射，就是微服务名称拼接到url中可以直接访问，但是不推荐这么使用 容易暴露微服务 默认false，开启后可以通过ip:port/服务名称/接口地址进行服务转发
      enabled: true #默认开启网关true，关闭网关false
      # 这里就是配置微服务的访问，可以实现负载均衡等功能
      routes:
        - id: service1 #路由的ID，没有固定规则但要求唯一，建议配合服务名
          uri: http://localhost:8081  #匹配后提供服务的路由地址
          predicates:
            - Path=/service1/**  #断言，路径相匹配的进行路由转发
        - id: service2
          uri: http://localhost:8082
          predicates:
            - Path=/service2/**

```

