---
title: 跟随狂神学Java-40，SpringCloud Netflix
date: 2023/08/22 04:02:22
tags:
  - Java
  - 狂神
  - Spring
  - SpringCloud
  - 分布式
  - 必看
categories:
  - [跟随狂神学Java]
cover: /images/coverImg/Spring/SpringCloud.jpg
keywords:
  - 背景
  - 传统架构
  - 微服务架构
  - 分布式架构
  - 分布式
  - SOA
  - 微服务架构
  - 优缺点
  - 技术栈
  - 常见问题
  - IT公司
  - SpringCloud
  - SpringCloud Netflix
  - SpringBoot
  - Dubbo
  - 远程调用
  - Eureka
  - CAP原则
  - Zookeeper
  - Ribbon
  - Feign
  - Hystrix
  - 注册中心
  - 服务注册
  - 服务发现
  - 服务治理
  - 服务熔断
  - 服务降级
  - Dashboard监控
  - Zuul
  - Spring Cloud Config
ai:
  - 这篇文章介绍了微服务架构演变、Spring Cloud及相关组件，包括Eureka、Ribbon、Feign、Hystrix、Zuul、Config。
  - 这篇文章详细探讨了微服务架构发展历程，介绍Spring Cloud及其核心组件，如Eureka、Ribbon、Feign、Hystrix、Zuul、Config，以及它们在构建分布式系统中的应用。
  - 这篇文章详细讨论了微服务架构的演变，包括传统架构、分布式架构、SOA、微服务架构，分析了微服务架构的优缺点和技术栈。还介绍了Spring Cloud及其关键组件，如Eureka、Ribbon、Feign、Hystrix、Zuul、Config，以及它们在构建分布式系统中的作用。同时，文章提及了服务熔断、降级、监控和配置管理等关键概念。
---
# 跟随狂神学Java

**第四十：微服务-SpringCloud Netflex**

> "计算机的速度快、精确，但愚蠢；人类的速度慢、不准确，但聪明。当它们合作时，无比强大。"
>
> [【狂神说Java】SpringCloud最新教程IDEA版_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1jJ411S7xr/)
>
> [蚂蚁课堂](http://www.mayikt.com)
>
> [Spring Cloud Netflix 中文文档 参考手册 中文版](https://www.springcloud.cc/spring-cloud-netflix.html) 
>
> [Spring Cloud API 中文文档 参考手册 中文版](https://www.springcloud.cc/spring-cloud-dalston.html)
>
> [Spring Cloud中国社区](http://springcloud.cn/)
>
> [Joker2Yue/SpringCloudLearn: 学习SpringCloud的相关代码、笔记 (github.com)](https://github.com/Joker2Yue/SpringCloudLearn)



#### 背景-微服务架构演变过程

---

##### 传统架构

​	传统的架构，也就是为**单点应用**，也就是大家在早期所学习的JavaEE知识SSH或者SSM架构模式，会采用分层架构模式：数据库访问层、业务逻辑层、控制层，从前端到后台所有的代码都是一个开发者去完成。

​	该架构模式没有对我们业务逻辑代码实现拆分，所有的代码都写入到同一个工程中里面，适合于小公司开发团队或者个人开发。

​	这种架构模式最大的缺点，如果**该系统一个模块出现不可用、会导致整个系统无法使用**。

![img](./跟随狂神学Java-40.assets/clip_image002.jpg)

---

##### 分布式架构

​	分布式架构模式是基于传统的架构模式演变过来，将传统的单点项目根据业务模块实现**拆分**，一个商城系统会拆分为会员系统、订单系统、支付系统、秒杀系统等。 从而降低我们项目的耦合度，这种架构模式开始慢慢的适合于互联网公司开发团队。 



----

##### SOA面向服务架构

​	SOA架构模式也称作为：面向服务架构模式、俗称面向与接口开发，将共同存在的业务逻辑抽取成一个共同的服务，提供给其他的服务接口实现调用、服务与服务之间通讯采用rpc远程调用技术。

​	SOA架构模式特点：

1.  SOA架构通讯中，采用XML方式实现通讯、在高并发下通讯过程中协议存在非常大冗余性，所以在最后微服务架构模式中使用JSON格式替代了XML。
2. SOA架构模式实现方案为**WebService或者是ESB企业服务总线，底层通讯协议SOAP协议（Http+XML）**实现传输。

<img src="./跟随狂神学Java-40.assets/clip_image002-1692078729736-4.jpg" alt="img" style="zoom:50%;" />

---

##### 微服务架构

​	微服务架构基于SOA架构演变过来的， 比SOA架构模式粒度更加精细，让专业的人去做专业的事情（专注），目的是提高效率，每个服务与服务之间互不影响，微服务架构中每个服务必须独立部署、互不影响，微服务架构模式体现轻巧、轻量级、适合于互联网公司开发模式。 

​	微服务架构倡导应用程序设计程多个独立、可配置、可运行和可微服务的子服务。

​	服务与服务通讯协议采用Http协议，使用restful风格API形式来进行通讯，数据交换格式轻量级json格式通讯，整个传输过程中，采用二进制，所以http协议可以跨语言平台，并且可以和其他不同的语言进行相互的通讯，所以很多开放平台都采用http协议接口。

​	就目前而言，对于微服务，业内没有一个统一的说法。但通常而言，**微服务架构是一种架构模式，或者说是一种架构风格，它提倡将单一的应用程序划分成一组小的服务，每个服务运行在其独立的自已的进程内，服务之间互相协调，互相配置，为用户提供最终价值**。服务之间采用轻量级的通信机制互相沟通，每个服务都围绕着具体的业务进行构建，并且能够被独立的部署到生产环境中，另外，应尽量避免统一的，集中式的服务管理机制，对具体的一个服务而言，应根据业务上下文，选择合适的语言，工具对其进行构建，可以有一个非常轻量级的集中式管理来协调这些服务，可以使用不同的语言来编写服务，也可以使用不同的数据存储。

​	在传统的WebService架构中有如下问题:

1.  依赖中心化服务发现机制

2. 使用Soap通讯协议，通常使用XML格式来序列化通讯数据，xml格式非常喜欢重，比较占宽带传输。

3.  服务化管理和治理设施不完善



<center class="half">
    <img src="./跟随狂神学Java-40.assets/clip_image002-1692079042803-6.jpg" width="350"/><img src="./跟随狂神学Java-40.assets/clip_image002-1692079050365-8.jpg" width="450"/>
</center>





#### 微服务

---

##### 微服务架构优缺点

优点

* 单一职责原则

* 每个服务足够内聚，足够小，代码容易理解，这样能聚焦一个指定的业务功能或业务需求，
* 开发简单，开发效率提高，一个服务可能就是专一的只干一件事
* 微服务能够被小团队单独开发，这个小团队是2～5人的开发人员组成
* 微服务是松耦合的，是有功能意义的服务，无论是在开发阶段或署阶段都是独立的
* 微服务能使用不同的语言开发
* 易于和第三方集成，微服务允许容易且灵活的方式集成自动部署，通过持续集成工具，如jenkins，Hudson，bamboo
* 微服务易于被一个开发人员理解，修改和维护，这样小团队能够更关注自已的工作成果。无需通过合作才能体现价值。
* 微服务充许你利用融合最新技术。
* **微服务只是业务逻辑的代码，不会和HTML，CSS或其他界面混合**
* **每个微服务都有自己的存储能力，可以有自己的数据库，也可以有统一数据库**

缺点

* 开发人员要处理分布式系统的复杂性
* 多服务运维难度，随着服务的增加，运维的压力也在增大
* 系统部署依赖
* 服务间通信成本
* 数据一致性
* 系统集成测试
* 性能监控....

---

##### 微服务技术栈有哪些

| 微服务条目                              | 落地技术                                                     |
| --------------------------------------- | ------------------------------------------------------------ |
| 服务开发                                | SpringBoot,Spring,SpringMVC                                  |
| 服务配置与管理                          | Netflix公司的Archaius、阿里的Diamond等                       |
| 服务注册与发现                          | Eureka、Consul、Zookeeper等                                  |
| 服务调用                                | Rest、RPC、gRPC                                              |
| 服务熔断器                              | Hystrix、Envoy等                                             |
| 负载均衡                                | Ribbon、Nginx等                                              |
| 服务接口调用（客户端调用服务的简化工具) | Feign等                                                      |
| 消息队列                                | Kafka、RabbitMQ、ActiveMQ等                                  |
| 服务配置中心管理                        | SpringCloudConfig、Chef等                                    |
| 服务路由(API网关)                       | Zuul等                                                       |
| 服务监控                                | Zabbix、Nagios、Metrics、Specatator等                        |
| 全链路追踪                              | Zipkin、Brave、Dapper等                                      |
| 服务部署                                | Docker、OpenStack、Kubernetes等                              |
| 数据流操作开发包                        | SpringCloud Stream(封装与Redis，Rabbit，Kafka等发送接收消息) |
| 事件消息总线                            | SpringCloud Bus                                              |



---

##### 微服务架构中常见问题

1. 分布式服务注册中心（服务治理）Eureka、Zookeeper、Consule、Nacos、Redis、数据库等
   * 解决RPC远程调用过程中URL地址的问题
2. 分布式配置中心 SpringCloud Config、携程阿波罗、Nacos Config;
   * 遇到问题重新打jar包？不了
3. 分布式事务解决方案（MQ最终一致性/LCN（已经淘汰）/Seata（阿里背书））
4. 分布式任务调度平台(xxl-job、elastic job、阿里巴巴Scheduler)
   * 保证定时任务执行问题
5. 分布式日志采集系统ELK+Kafka
   * 采集日志麻烦的问题
6. 分布式服务追踪与调用链Zipkin、skywalking等。
   * 微服务之间相互调用
7. 分布式锁（Redis（Redisson）/Zookeeper（Curator）实现分布式锁）
8. 服务的接口保护（hystrix/sentinel）



---

##### 当前各大IT公司在使用的微服务架构

* 阿里：dubbo+HFS
* 京东：JSF
* 新浪：Motan
* 当当网Dubbox





#### SpringCloud概念

---

##### 为什么我们要使用SpringCloud

* 整体解决方案和框架成熟度
* 社区热度
* 可维护性
* 学习曲线

​	Springcloud并不是rpc 远程调用框架，而是一套全家桶的微服务解决框架，理念是解决我们在微服务架构中遇到的任何问题。例如：服务注册中心、分布式配置、服务保护等。

​	SpringCloud，基于SpringBoot提供了一套微服务解决方案，包括服务注册与发现，配置中心，全链路监控，服务网关，负载均衡，熔断器等组件，除了基于NetFlix的开源组件做高度抽象封装之外，还有一些选型中立的开源组件。

​	SpringCloud利用SpringBoot的开发便利性，巧妙地简化了分布式系统基础设施的开发，SpringCloud为开发人员提供了快速构建分布式系统的一些工具，包括**配置管理，服务发现，断路器，路由，微代理，事件总线，全局锁决策竞选，分布式会话等等**，他们都可以用SpringBoot的开发风格做到一键启动和部署。

​	SpringBoot并没有重复造轮子，它只是将自前各家公司开发的比较成熟，经得起实际考研的服务框架组合起来
通过SpringBoot风格进行再封装，屏蔽掉了复杂的配置和实现原理，**最终给开发者留出了一套简单易懂，易部署**
**和易维护的分布式系统开发工具包**。

​	SpringCloud是分布式微服务架构下的一站式解决方案，是各个微服务架构落地技术的集合体，俗称微服务全家桶。

​	SpringCloud 微服务架构思想

<img src="./跟随狂神学Java-40.assets/image-20230815151438836.png" alt="image-20230815151438836" style="zoom:80%;" />



---

##### SpringCloud和SpringBoot之间的关系

* SpringBoot专注于快速方便的开发单个个体微服务。
* Springcloud是关注全局的微服务协调整理治理框架，它将SpringBoot开发的一个个单体微服务整合并管理起来，为各个微服务之间提供：配置管理，服务发现，断路器，路由，微代理，事件总线，全局锁，决策竞选分布式会话等等集成服务。
* SpringBoot可以离开SpringClooud独立使用，开发项目，但是SpringCloud离不开SpringBoot，属于依赖关
  系
* **SpringBoot专注于快速、方便的开发单个个体微服务，Springcloud关注全局的服务治理框架**



---

##### SpringCloud和Dubbo之间的对比

|              | Dubbo         | Spring Cloud                 |
| ------------ | ------------- | ---------------------------- |
| 服务注册中心 | Zookeeper     | Spring Cloud Netfilx Eureka  |
| 服务调用方式 | RPC           | REST API                     |
| 服务监控     | Dubbo-monitor | Spring Boot Admin            |
| 断路器       | 不完善        | Spring Cloud Netflix Hystrix |
| 服务网关     | 无            | Spring Cloud Netflix Zuul    |
| 分布式配置   | 无            | Spring Cloud Config          |
| 服务跟踪     | 无            | Spring Cloud Sleuth          |
| 消息总线     | 无            | Spring Cloud Bus             |
| 数据流       | 无            | Spring Cloud Stream          |
| 批量任务     | 无            | Spring Cloud Task            |



**最大区别：SpringCloud抛弃了Dubbo的RPC通信，采用的是基于HTTP的REST方式。**

​	严格来说，这两种方式各有优劣。虽然从一定是程度上来说，后者牺性了服务调用的性能，但也避免了上面提到的原生RPC带来的问题。而且REST相比RPC更为灵活，服务提供方和调用方的依赖只依靠一纸契约，不存在代码级别的强依赖，这在强调快速演化的微服务环境下，显得更加合适

**品牌机与组装机的区别**

​	很明显，SpringCloud的功能比DUBBO**更加强大，涵盖面更广**，而且作为Spring的拳头项目，它也能够与SpringFramework、Spring Boot、Spring Data、Spring Batch等其他Spring项目**完美融合**，这些对于微服务而言是至关重要的。使用Dubbo构建的微服务架构就像组装电脑，各环节我们的选择**自由度很高**，但是最终结果很有可能因为一条内存质量不行就点不亮了，总是让人不怎么放心，但是如果你是一名高手，那这些都不是问题；而SprinCloud就像品牌机，在SpringSource的整合下，做了大量的兼容性测试，保证了机器拥有更高的稳定性，但是如果要在使用非原装组件外的东西，就需要对其基础有足够的了解。

**社区支持与更新力度**

​	最为重要的是，DUBBO停正了5年左石的更新，虽然2017.7重启了。对于技未发展的新需求，需要由开发者自行拓展升级（比如当当网弄出了DubboX），这对于很多想要采用微服务架构的中小软件组织，显然是不太合适的中小公司没有这么强大的技术能力去修改Dubbo源码+周边的一整套解决方案，并不是每一人公司都有阿里的大牛+真实的线上生产环境测试过。

**总结：**

​	**解决的问题域不一样：Dubbo的定位是一款RPC框架，SpringCloud的自标是微服务架构下的一站式解决方案**



---

##### SpringCloud能干什么

* Distributed/versioned configuration（分布式/版本控制配置）
* Serviceregistrationanddiscovery（服务注册与发现）
* Routing (路由)
* Service-to-service calls（服务到服务的调用）
* Loadbalancing（负载均衡配置）
* Circuit Breakers(断路器)
* Distributedmessaging（分布式消息管理）



---

##### 远程调用基本概念

协议为http，返回类型为json。状态码1000为调用接口成功，1002失败。

<img src="./跟随狂神学Java-40.assets/image-20230815140337121.png" alt="image-20230815140337121" style="zoom: 33%;" />

为什么需要接口：提供封装信息，被其他合作伙伴调用

什么是RPC：远程调用

地址栏参数：`接口协议:IP:端口/接口名称?接口参数`；80默认端口是可以省略的，如果接口参数只有一个也是可以直接写的

接口协议：可以使用netty手写RPC自定义协议。Dubbo底层就是基于Netty的；你也可以使用httpclient或okhttp测试http协议接口；以前的WebService底层是soap+http+xml；现在的微服务架构底层是http+json





####  SpringCloud-API、提供者、消费者

---

#####  依赖项

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.14</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.joker_yue</groupId>
    <artifactId>SpringCloudLearn</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>SpringCloudLearn</name>
    <description>SpringCloudLearn</description>

    <!-- 打包方式 pom-->
    <packaging>pom</packaging>

    <!-- 配置 -->
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <java.version>1.8</java.version>
        <junit.version>4.13.2</junit.version>
        <lombok.version>1.18.24</lombok.version>
        <log4j.version>1.2.17</log4j.version>
    </properties>

    <dependencyManagement>
        <dependencies>
        <!--   SpringCloud 的依赖   -->
            <!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-dependencies -->
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>Greenwich.SR6</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        <!--   SpringBoot 的依赖     -->
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>2.7.14</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        <!--  数据库    -->
            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
                <version>8.0.28</version>
            </dependency>
        <!--   数据源 Druid   -->
            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>druid</artifactId>
                <version>1.2.16</version>
            </dependency>
        <!--   SpringBoot的启动器   -->
            <dependency>
                <groupId>org.mybatis.spring.boot</groupId>
                <artifactId>mybatis-spring-boot-starter</artifactId>
                <version>2.3.1</version>
            </dependency>
        <!--   log4j   -->
            <dependency>
                <groupId>log4j</groupId>
                <artifactId>log4j</artifactId>
                <version>${log4j.version}</version>
            </dependency>
        <!--   junit   -->
            <dependency>
                <groupId>junit</groupId>
                <artifactId>junit</artifactId>
                <version>${junit.version}</version>
                <scope>test</scope>
            </dependency>
        <!--   lombok   -->
            <dependency>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>${lombok.version}</version>
                <scope>provided</scope>
            </dependency>
        <!--   logback 日志   -->
            <dependency>
                <groupId>ch.qos.logback</groupId>
                <artifactId>logback-core</artifactId>
                <version>1.2.3</version>
            </dependency>
        </dependencies>
    </dependencyManagement>

</project>

~~~



---

##### springcloud-api

* 说明
  * 提供实体类端口
  * 职责
    * 提供实体类
* 代码
  * com.joker_yue.springcloud.pojo.Dept

---

##### springcloud-provider-dept-8001

* 说明
  *  提供者服务端，端口号为8001
  * 职责
    * 提供数据库访问接口
      - dao
      - service
      - controller

* 代码
  * com.joker_yue.springcloud.dao.DeptDao
  * com.joker_yue.springcloud.service.DeptService
  * com.joker_yue.springcloud.service.DeptServiceImpl
  * com.joker_yue.springcloud.controller.DeptController
  * com.joker_yue.springcloud.DeptProvider_8001



---

##### springcloud-consumer-dept-80

* 说明
  * 消费者服务端。一般选择80端口，因为80端口可以省略端口号
  * 职责：
    * 不提供service层，于是我们需要其他的方式来解析用户输入的url，并转到提供者那边的端口进行操作
    * 做请求的处理，面向用户，解析其输入的url
  * 新东西：
    * 使用RestTemplate进行与提供者接口的调用
* 代码
  * com.joker_yue.springcloud.controller.DeptConsumerController
  * com.joker_yue.springcloud.config.ConfigBean
  * com.joker_yue.springcloud.DeptConsumer_80

当一个请求url的协议、域名、端口三者之间任意一个与当前页面url不同即为跨域





#### Eureka服务注册与发现

---

##### 什么是Eureka

* Netflix在设计Eureka时，遵循的就是AP原则

* Eureka是Netflix的一人子模块，也是核刻心模块之一。Eureka是一个基于REST的服务，用于定位服务，以实现云端中间层服务发现和故障转移，服务注册与发现对于微服务来说是非常重要的，有了服务发现与注册，只需要使用服务的标识符，就可以访问到服务，而不需要修改服务调用的配置文件了，功能类以于Dubbo的注册中心，比如Zookeeper;

---

##### 原理解释

<img src="./跟随狂神学Java-40.assets/image-20230816160309517.png" alt="image-20230816160309517" style="zoom: 50%;" />

* Eureka的基本架构

  * SpringCloud封装了NetFlix公司开发的Eureka模块来实现服务注册和发现（对比Zookeeper）

  * Eureka采用了c-S的架构设计，EurekaServer作为服务注册功能的服务器，他是服务注册中心

  * 而系统中的其他微服务。使用Eureka的客户端连接到EurekaServer并维持心跳连接。这样系统的维护人员就可以通过EurekaServer来监控系统中各个微服务是否正常运行，SpringCloud的一些其他模块（比如Zuul)就可以通过EurekaServer来发现系统中的其他微服务，并执行相关的逻辑；

* 和Dubbo架构对比

  * Eureka包含两个组件：EurekaServer和EurekaClient。
  * EurekaServer提供服务注册服务，各个节点启动后，会在EurekaServer中进行注册，这样EurekaServer中的服务注册表中将会村粗租所有可用服务节点的信息，服务节点的信息可以在界面中直观的看到。
  * EurekaClient是一个ava客户端，用于简化EurekaServer的交互，客户端同时也具备一个内置的，使用轮询负载算法的负载均衡器。在应用启动后，将会向EurekaServer发送心跳（默认周期为30秒）。如果Eureka Server在多个心跳周期内没有接收到某个节点的心跳，Eurekaberver将会从服务注册表中把这个服务节点移除掉（默认周期为90秒

* 三大角色

  * Eureka Server：提供服务的注册于发现
  * ServiceProvider：将自身服务注册到Eureka中，从而使消费方能够我到
  * ServiceConsumer：服务消费方从Eureka中获取注册服务列表，从而找到消费服务。

---

##### springcloud-eureka-7001

* 步骤：

  1. 导入依赖

     ```xml
     <!-- Eureka Server -->
     <dependency>
         <groupId>org.springframework.cloud</groupId>
         <artifactId>spring-cloud-starter-eureka-server</artifactId>
         <version>1.4.7.RELEASE</version>
     </dependency>
     ```

  2. 编写配置

     ```yaml
     server:
       port: 7001
     
     # Eureka配置
     eureka:
       instance:
         hostname: localhost # Eureka服务端的名字（实例名称）
       client:
         register-with-eureka: false   # 是否向Eureka注册中心注册自己。由于我们现在在写服务器，不用向自己注册自己
         fetch-registry: false   # 如果为false，表示自己为注册中心
         service-url: # 监控页面
           # 干掉默认URL： public static final String DEFAULT_URL = "http://localhost:8761" + DEFAULT_PREFIX + "/";
           defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/
     
     ```

  3. 开启功能

     ```java
     @EnableEurekaServer // 服务端的启动类，可以接收别人注册进来
     ```

  4. 配置类（额外）

* 说明

  *  Eureka注册中心服务器，端口默认是8761
  * 职责
    * 提供注册发现
  * 新东西
    * 使用Eureka

* 代码

  * com.joker_yue.EurekaServer_7001

* 启动结果

  ![image-20230816171730456](./跟随狂神学Java-40.assets/image-20230816171730456.png)

---

##### 将提供者注册进Eureka

* 步骤：

  1. 导入依赖

     ```xml
     <dependency>
         <groupId>org.springframework.cloud</groupId>
         <artifactId>spring-cloud-starter-eureka</artifactId>
         <version>1.4.7.RELEASE</version>
     </dependency>
     ```

  2. 编写配置

     ```yaml
     # Eureka的配置，服务注册到哪里
     eureka:
       client:
         service-url:
           defaultZone: http://localhost:7001/eureka # 注册地址
       instance:
         instance-id: springcloud-provider-dept8001 # 修改默认描
     ```

  3. 开启功能

     ```java
     @EnableEurekaClient // 在服务启动后自动将服务端注册到Eureka
     ```

  4. 配置类（额外）

* 启动结果

  * 显示的名字是application.yaml中spring.application.name

  ![image-20230816172813151](./跟随狂神学Java-40.assets/image-20230816172813151.png)



----

##### Eureka保护机制

一句话总结就是：**某时刻某一个微服务不可用，eureka不会立即清理，依旧会对该微服务的信息进行保存！**

- 默认情况下，当eureka server在一定时间内没有收到实例的心跳，便会把该实例从注册表中删除（**默认是90秒**），但是，如果短时间内丢失大量的实例心跳，便会触发eureka server的自我保护机制，比如在开发测试时，需要频繁地重启微服务实例，但是我们很少会把eureka server一起重启（因为在开发过程中不会修改eureka注册中心），**当一分钟内收到的心跳数大量减少时，会触发该保护机制**。可以在eureka管理界面看到Renews threshold和Renews(last min)，当后者（最后一分钟收到的心跳数）小于前者（心跳阈值）的时候，触发保护机制，会出现红色的警告：`EMERGENCY!EUREKA MAY BE INCORRECTLY CLAIMING INSTANCES ARE UP WHEN THEY'RE NOT.RENEWALS ARE LESSER THAN THRESHOLD AND HENCE THE INSTANCES ARE NOT BEGING EXPIRED JUST TO BE SAFE.`从警告中可以看到，eureka认为虽然收不到实例的心跳，但它认为实例还是健康的，eureka会保护这些实例，不会把它们从注册表中删掉。
- 该保护机制的目的是避免网络连接故障，在发生网络故障时，微服务和注册中心之间无法正常通信，但服务本身是健康的，不应该注销该服务，如果eureka因网络故障而把微服务误删了，那即使网络恢复了，该微服务也不会重新注册到eureka server了，因为只有在微服务启动的时候才会发起注册请求，后面只会发送心跳和服务列表请求，这样的话，该实例虽然是运行着，但永远不会被其它服务所感知。所以，eureka server在短时间内丢失过多的客户端心跳时，会进入自我保护模式，该模式下，eureka会保护注册表中的信息，不在注销任何微服务，当网络故障恢复后，eureka会自动退出保护模式。自我保护模式可以让集群更加健壮。
- 但是我们在开发测试阶段，需要频繁地重启发布，如果触发了保护机制，则旧的服务实例没有被删除，这时请求有可能跑到旧的实例中，而该实例已经关闭了，这就导致请求错误，影响开发测试。所以，在开发测试阶段，我们可以把自我保护模式关闭，只需在eureka server配置文件中加上如下配置即可：`eureka.server.enable-self-preservation=false`**【不推荐关闭自我保护机制】**



---

##### Eureka集群

* 我们现在只有一个注册中心，不安全，一个崩了全都崩了，得再搞两个

  <img src="./跟随狂神学Java-40.assets/image-20230816195133974.png" alt="image-20230816195133974" style="zoom: 33%;" />

* 步骤：

  1. 新建两个注册中心，springcloud-eureka-7002,springcloud-eureka-7003

  2. 将新的注册中心配置好

  3. 将集群进行关联，如springcloud-eureka-7001所示

     ```yml
     # 集群（关联）
     defaultZone: http://127.0.0.1:7002/eureka/,http://127.0.0.1:7003/eureka
     ```

  4. 在要注册的微服务中配置

     ```yaml
     # Eureka的配置，服务注册到哪里
     eureka:
       client:
         service-url:
           defaultZone: http://localhost:7001/eureka,http://localhost:7002/eureka,http://localhost:7003/eureka # 使用集群注册
       instance:
     ```

     



#### CAP原则

---

RDBMS（Mysql、Oracle、sqlServer）===> ACID

NoSQL（Redis、mongdb）===> CAP



ACID是什么

* A tomicity 原子性
* C onsistency 一致性
* I solation 隔离性
* D urability 持久性



CAP是什么

* C onsistency 强一致性
* A vailability 可用性
* P artition tolerance 分区容错性

CAP的三进二：CA、AP、CP



**CAP理论的核心**

* 一个分布式系统不可能同时很好的满足一致性、可用性、分区容错性三个需求
* 根据CAP原理，将NoSQL数据库分成了满足CA原则，满足CP原则和满足AP原则三大类：
  * CA：单点集群，满足一致性，可用性的系统，通常可扩展性较差
  * CP：满足一致性，分区容错性的系统，通常性能不是特别高
  * AP：满足可用性，分区容错性的系统，通常可能对一致性要求低一些

---

##### 作为服务中心，Eureka比Zookeeper好在哪里

​	著名的CAP理论指出，一个分布式系统不可能同时满足C（一致性）、A（可用性）、P（容错性）。

​	由于分区容错性P在分布式系统中是必须要保证的，因此我们门只能在A和C之间进行权衡。

* Zookeeper保证的是CP;
* Eureka保证的是AP；



---

##### Zookeeper保证的是CP

​	当向注册中心查询服务列表时，我们可以容忍注册中心返回的是几分钟以前的注册信息，但不能接收服务直接down掉不可用。也就是说，**服务注册功能对可用性的要求要高于一致性**。但zookeeper会出现这样一种情况，当master节点因为网络故障与其他节点失去联系时，剩余节点会重新进行leader选举。问题在于，选举leader的时间太长，30-120s，且选举期间整个zookeeper集群是不可用的，这就导致在选举期间注册服务瘫痪。在云部署的环境下，因为网络问题使得zookeeper集群失去master节点是较大概率发生的事件，虽然服务最终能够恢复，但是，漫长的选举时间导致注册长期不可用，是不可容忍的。



---

##### Eureka保证的是AP

​	Eureka看明白了这一点，因此在设计时就优先保证可用性。**Eureka各个节点都是平等的**，几个节点挂掉不会影响正常节点的工作，剩余的节点依然可以提供注册和查询服务。而Eureka的客户端在向某个Eureka注册时，如果发现连接失败，则会自动切换至其他节点，只要有一台Eureka还在，就能保住注册服务的可用性，只不过查到的信息可能不是最新的，除此之外，Eureka还有之中自我保护机制，如果在15分钟内超过85%的节点都没有正常的心跳，那么Eureka就认为客户端与注册中心出现了网络故障，此时会出现以下几种情况：

- Eureka不在从注册列表中移除因为长时间没收到心跳而应该过期的服务
- Eureka仍然能够接受新服务的注册和查询请求，但是不会被同步到其他节点上 (即保证当前节点依然可用)
- 当网络稳定时，当前实例新的注册信息会被同步到其他节点中

因此，Eureka可以很好的应对因网络故障导致部分节点失去联系的情况，而不会像zookeeper那样使整个注册服务瘫痪





#### Ribbon

---

##### Ribbon：基于客户端的负载均衡的工具

- Spring Cloud Ribbon 是基于Netflix Ribbon 实现的一套**==客户端==负载均衡的工具**。
- 简单的说，Ribbon 是 Netflix 发布的开源项目，主要功能是提供客户端的软件负载均衡算法，将 Netflix 的中间层服务连接在一起。Ribbon 的客户端组件提供一系列完整的配置项，如：连接超时、重试等。简单的说，就是在配置文件中列出 LoadBalancer (简称LB：负载均衡) 后面所有的及其，Ribbon 会自动的帮助你基于某种规则 (如简单轮询，随机连接等等) 去连接这些机器。我们也容易使用 Ribbon 实现自定义的负载均衡算法！

---

##### Ribbon能做什么

- LB，即负载均衡 (LoadBalancer) ，在微服务或分布式集群中经常用的一种应用。
- 负载均衡简单的说就是将用户的请求平摊的分配到多个服务上，从而达到系统的HA (高用)。
- 常见的负载均衡软件有 Nginx、Lvs 等等。
- Dubbo、SpringCloud 中均给我们提供了负载均衡，**SpringCloud 的负载均衡算法可以自定义**。
- 负载均衡简单分类：
  - 集中式LB
    - 即在服务的提供方和消费方之间使用独立的LB设施，如**Nginx(反向代理服务器)**，由该设施负责把访问请求通过某种策略转发至服务的提供方！
  - 进程式 LB
    - 将LB逻辑集成到消费方，消费方从服务注册中心获知有哪些地址可用，然后自己再从这些地址中选出一个合适的服务器。
    - **Ribbon 就属于进程内LB**，它只是一个类库，集成于消费方进程，消费方通过它来获取到服务提供方的地址！

---

##### 如何使用

1. 准备好集群

2. 修改消费者的配置类DeptConsumerController.java，将原有写死的配置修改为提供者的`spring.application.name`

   ```java
   // 做负载均衡我们不应该写死指定的http请求，应该spring.application.name
   // private static final String REST_URL_PREFIX = "http://localhost:8001";// 请求的地址常量
   // 主机名找不到的删除这个包spring-cloud-starter-netflix-ribbon，新版的自带负载均衡，删不掉的想办法删除，用这个就会出错
   private static final String REST_URL_PREFIX = "http://SPRINGCLOUD-PROVIDER-DEPT";
   ```
   
3. 也可以自定义负载均衡算法，在myRule包下自定义一个配置类，配置类中写负载均衡算法。

   注意：**该包不要和主启动类同级，要跟启动类所在包同级**

   <img src="./跟随狂神学Java-40.assets/image-20230817201427516.png" alt="image-20230817201427516" style="zoom: 67%;" />

   ```java
   package com.joker_yue.myrule;
   
   import com.netflix.loadbalancer.IRule;
   import com.netflix.loadbalancer.RandomRule;
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   
   /**
    * @author Joker
    * @version 1.0
    * @date 2023/8/17 19:52
    */
   
   @Configuration
   public class MyEurekaRule {
       // 自定义负载均衡算法
       // RoundRobinRule 轮询
       // RandomRule 随机
       // AvailabilityFilterRule：轮询，但是会过滤掉不可用的服务
       // Retry：会先按照轮询获取服务，如果服务获取失败，将会在指定的时间内重试
       @Bean
       public IRule myRule() {
           return new RandomRule();     // 用别人的
       }
   
   }
   ```

4. 然后去ConfigBean.java中加入注解`@LoadBalanced`开启负载均衡。

   * 此注解用于配置 `RestTemplate` 实例以使用 Ribbon 进行负载均衡。如果移除了这个注解，那么 `RestTemplate` 将不会使用 Ribbon 进行负载均衡，而是直接通过服务提供者的地址进行请求，不会考虑服务实例的可用性和负载情况。

   ```java
   @Configuration
   public class ConfigBean {   //@Configuration 注解 相当于applicationContext.xml
       // 配置负载均衡实现RestTemplate
   
       @Bean
       @LoadBalanced   // Ribbon负载均衡
       public RestTemplate getRestTemplate(){
           return new RestTemplate();
       }
   
   }
   ```

4. 然后去主启动类中加上注解，如下
   
   ```java
   // 在微服务启动的时候就能够加载我们自定义的ribbon类
   // name应该与微服务的名字一致，
   @RibbonClient(name = "SPRINGCLOUD-PROVIDER-DEPT", configuration = MyEurekaRule.class)
   ```

---

##### 使用自定义算法

1. 按照上面的配置，再创建一个MyRandomRule.java（名称自定义），在其中编写自定义的负载均衡算法

   <img src="./跟随狂神学Java-40.assets/image-20230821173252291.png" alt="image-20230821173252291" style="zoom: 67%;" />

2. MyRandomRule.javax需要`extend AbstractLoadBalancerRule `

   ```java
   public class MyRandomRule extends AbstractLoadBalancerRule
   ```

3. 然后去MyEurekaRule.java中return你的自定义算法

   ```java
   @Bean
   public IRule myRule() {
       // return new RandomRule();     // 用别人的
       return new MyRandomRule();      // 用自己的
   }
   ```
   
4. 注意：

   ​	在MyEurekaRule.java中，只是将自定义负载均衡的类进行注入。你可以不需要MyEurekaRule.java，直接在MyRandomRule.java中使用`@Component`进行注入也是可以的

---

##### 如何运行

* 至少一个注册中心
* 至少两个提供者
* 至少一个消费者



#### Feign

---

##### 什么是Feign

​	Feign是一个http请求调用的轻量级框架，可以以Java接口注解的方式调用Http请求。Feign通过处理注解，将请求模板化，当实际调用的时候，传入参数，根据参数再应用到请求上，进而转化成真正的请求，封装了http调用流程。

​	Feign是声明式Web Service客户端，它让微服务之间的调用变得更简单，类似controller调用service。SpringCloud集成了Ribbon和Eureka，可以使用Feigin提供负载均衡的http客户端

​	Feign，主要是社区版，大家都习惯面向接口编程。这个是很多开发人员的规范。调用微服务访问两种方法

1. 微服务名字 【ribbon】
2. 接口和注解 【feign】

---

##### Feign能干什么

- Feign旨在使编写Java Http客户端变得更容易
- 前面在使用**Ribbon** + **RestTemplate**时，利用**RestTemplate**对Http请求的封装处理，形成了一套模板化的调用方法。但是在实际开发中，由于对服务依赖的调用可能不止一处，往往一个接口会被多处调用，所以通常都会针对每个微服务自行封装一个客户端类来包装这些依赖服务的调用。所以，**Feign**在此基础上做了进一步的封装，由他来帮助我们定义和实现依赖服务接口的定义，在Feign的实现下，我们只需要创建一个接口并使用注解的方式来配置它 **(类似以前Dao接口上标注Mapper注解，现在是一个微服务接口上面标注一个Feign注解)**，即可完成对服务提供方的接口绑定，简化了使用Spring Cloud Ribbon 时，自动封装服务调用客户端的开发量。



**Feign默认集成了Ribbon**

- 利用**Ribbon**维护了MicroServiceCloud-Dept的服务列表信息，并且通过轮询实现了客户端的负载均衡，而与**Ribbon**不同的是，通过**Feign**只需要定义服务绑定接口且以声明式的方法，优雅而简单的实现了服务调用。

---

##### 为什么需要Feign

* 原来我们是使用服务名调用的微服务，不符合面向接口编程的规范

  ```java
  private static final String REST_URL_PREFIX = "http://SPRINGCLOUD-PROVIDER-DEPT";
  ```

* 我们需要调用接口



步骤：

* springcloud-api

  1. 新建service层，将Feign要访问的微服务ID和其下的url配置好

     ```java
     package com.joker_yue.springcloud.service;
     
     import com.joker_yue.springcloud.pojo.Dept;
     import org.springframework.cloud.openfeign.FeignClient;
     import org.springframework.stereotype.Component;
     import org.springframework.web.bind.annotation.GetMapping;
     import org.springframework.web.bind.annotation.PathVariable;
     import org.springframework.web.bind.annotation.PostMapping;
     
     import java.util.List;
     
     /**
      * Feign客户端的配置
      *
      * @author Joker
      * @version 1.0
      * @date 2023/8/17 21:02
      */
     // 参数：服务名
     @Component  // 为了能够注入Spring
     @FeignClient(value = "SPRINGCLOUD-PROVIDER-DEPT")   // 可以被服务直接调用
     public interface DeptClientService {
         @GetMapping("/dept/get/{id}")
         Dept queryById(@PathVariable("id") Long id);
     
         @GetMapping("/dept/list")
         List<Dept> queryAll();
     
         @PostMapping("/dept/add")
         boolean addDept(Dept dept);
     }
     ```

* springcloud-consumer-dept-feign

  1. Controller层修改为调用Feign：DeptConsumerController.java

     ```java
     package com.joker_yue.springcloud.controller;
     
     import com.joker_yue.springcloud.pojo.Dept;
     import com.joker_yue.springcloud.service.DeptClientService;
     import org.springframework.beans.factory.annotation.Autowired;
     import org.springframework.web.bind.annotation.PathVariable;
     import org.springframework.web.bind.annotation.RequestMapping;
     import org.springframework.web.bind.annotation.RestController;
     
     import java.util.List;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/8/16 14:32
      */
     @RestController
     public class DeptConsumerController {
     
         @Autowired
         private DeptClientService service;
     
         @RequestMapping("/consumer/dept/get/{id}")
         public Dept get(@PathVariable("id") Long id) {
             return this.service.queryById(id);
         }
     
         @RequestMapping("/consumer/dept/add")
         public boolean add(Dept dept) {
             return this.service.addDept(dept);
         }
     
         @RequestMapping("/consumer/dept/list")
         public List<Dept> list() {
             return this.service.queryAll();
         }
     
     }
     ```

  2. 主启动类标注开启Feign

     ```java
     package com.joker_yue.springcloud;
     
     import org.springframework.boot.SpringApplication;
     import org.springframework.boot.autoconfigure.SpringBootApplication;
     import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
     import org.springframework.cloud.openfeign.EnableFeignClients;
     import org.springframework.context.annotation.ComponentScan;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/8/16 14:54
      */
     @SpringBootApplication
     @EnableEurekaClient // 开启eureka
     @EnableFeignClients(basePackages = "com.joker_yue.springcloud") // 扫描Feign
     public class FeignDeptConsumer_80 {
         public static void main(String[] args) {
             SpringApplication.run(FeignDeptConsumer_80.class, args);
         }
     }
     ```



#### Hystrix

---

##### 分布式系统面临的问题

​	复杂分布式体系结构中的应用程序有数十个依赖关系，每个依赖关系在某些时候将不可避免失败！

**服务雪崩**

​	多个微服务之间调用的时候，假设微服务A调用微服务B和微服务C，微服务B和微服务C又调用其他的微服务，这就是所谓的“扇出”，如果扇出的链路上**某个微服务的调用响应时间过长，或者不可用**，对微服务A的调用就会占用越来越多的系统资源，进而引起系统崩溃，所谓的“雪崩效应”。

<img src="./跟随狂神学Java-40.assets/image-20230818145202202.png" alt="image-20230818145202202" style="zoom:50%;" />

​	对于高流量的应用来说，单一的后端依赖可能会导致所有服务器上的所有资源都在几十秒内饱和。比失败更糟糕的是，这些应用程序还可能导致服务之间的延迟增加，备份队列，线程和其他系统资源紧张，导致整个系统发生更多的级联故障，**这些都表示需要对故障和延迟进行隔离和管理，以达到单个依赖关系的失败而不影响整个应用程序或系统运行**。

​	我们需要，**弃车保帅**！

----

##### 什么是Hystix

​	**Hystrix**是一个应用于处理分布式系统的延迟和容错的开源库，在分布式系统里，许多依赖不可避免的会调用失败，比如超时，异常等，**Hystrix** 能够保证在一个依赖出问题的情况下，不会导致整个体系服务失败，避免级联故障，以提高分布式系统的弹性。

​	“**断路器**”本身是一种开关装置，当某个服务单元发生故障之后，通过断路器的故障监控 (类似熔断保险丝) ，**向调用方返回一个服务预期的，可处理的备选响应 (FallBack) ，而不是长时间的等待或者抛出调用方法无法处理的异常，这样就可以保证了服务调用方的线程不会被长时间，不必要的占用**，从而避免了故障在分布式系统中的蔓延，乃至雪崩。

<img src="./跟随狂神学Java-40.assets/image-20230818145859032.png" alt="image-20230818145859032" style="zoom: 50%;" />



---

##### Hytrix能做什么

- 服务降级
- 服务熔断
- 服务限流
- 接近实时的监控
- …

当一切正常时，请求流可以如下所示：

<img src="./跟随狂神学Java-40.assets/format,png.png" alt="format_png 2" style="zoom:50%;" />

当许多后端系统中有一个潜在阻塞服务时，它可以阻止整个用户请求：

<img src="./跟随狂神学Java-40.assets/format,png-1692342061273-8.png" alt="format_png 3" style="zoom:50%;" />

随着大容量通信量的增加，单个后端依赖项的潜在性会导致所有服务器上的所有资源在几秒钟内饱和。

应用程序中通过网络或客户端库可能导致网络请求的每个点都是潜在故障的来源。比失败更糟糕的是，这些应用程序还可能导致服务之间的延迟增加，从而备份队列、线程和其他系统资源，从而导致更多跨系统的级联故障。

<img src="./跟随狂神学Java-40.assets/format,png-1692342067377-11.png" alt="format_png 4" style="zoom:50%;" />

当使用**Hystrix**包装每个基础依赖项时，上面的图表中所示的体系结构会发生类似于以下关系图的变化。**每个依赖项是相互隔离的**，限制在延迟发生时它可以填充的资源中，并包含在回退逻辑中，该逻辑决定在依赖项中发生任何类型的故障时要做出什么样的响应：

<img src="./跟随狂神学Java-40.assets/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzU5MTk4MA==,size_16,color_FFFFFF,t_70#pic_center-1692342083362-14.png" alt="在这里插入图片描述" style="zoom:50%;" />



#### Hystrix服务熔断

---

##### 服务熔断是什么

**熔断机制是赌赢雪崩效应的一种微服务链路保护机制**。

​	当扇出链路的某个微服务不可用或者响应时间太长时，会进行服务的降级，**进而熔断该节点微服务的调用，快速返回错误的响应信息**。检测到该节点微服务调用响应正常后恢复调用链路。在SpringCloud框架里熔断机制通过Hystrix实现。Hystrix会监控微服务间调用的状况，当失败的调用到一定阀值缺省是**==5秒内20次调用失败，就会启动熔断机制==**。熔断机制的注解是：`@HystrixCommand`。

服务熔断解决如下问题：

- 当所依赖的对象不稳定时，能够起到快速失败的目的；
- 快速失败后，能够根据一定的算法动态试探所依赖对象是否恢复。

---

##### 服务熔断-步骤

* `springcloud-provider-dept-hystrix-8001`导入Hystrix依赖

  ```xml
  <!-- Hystrix -->
  <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
      <version>2.2.9.RELEASE</version>
  </dependency>
  ```

* `DeptController.java`指定解决方案

  ```java
  package com.joker_yue.springcloud.controller;
  
  import com.joker_yue.springcloud.pojo.Dept;
  import com.joker_yue.springcloud.service.DeptService;
  import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.web.bind.annotation.GetMapping;
  import org.springframework.web.bind.annotation.PathVariable;
  import org.springframework.web.bind.annotation.RestController;
  
  /**
   * 提供Restful服务
   *
   * @author Joker
   * @version 1.0
   * @date 2023/8/15 20:12
   */
  @RestController
  public class DeptController {
      @Autowired
      private DeptService deptService;
  
      @HystrixCommand(fallbackMethod = "hystrixGetDept")    // 出错调用
      @GetMapping("/dept/get/{id}")
      public Dept getDept(@PathVariable("id") Long id) {
          Dept dept = deptService.queryById(id);
          if (dept == null) {
              throw new RuntimeException("该ID:" + id + "不存在该Dept或信息无法找到");
          }
          return dept;
      }
  
      // 备选方案
      public Dept hystrixGetDept(@PathVariable("id") Long id) {
          return new Dept()
                  .setDeptno(id)
                  .setDname("该ID:" + id + "不存在该Dept或信息无法找到")
                  .setDb_source("no this database in MySQL");
      }
  
  
  }
  
  ```

* 主启动类上添加对熔断的支持

  ```java
  @EnableCircuitBreaker   // 熔断支持
  @EnableHystrix			// 你用这个也可以
  ```

  @EnableHystrix，它继承了@EnableCircuitBreaker，并对它进行了再封装

测试：

1. 开启打开springcloud-provider-dept-hystrix-8001；springcloud-eureka-7001,7002,7003；springcloud-consumer-dept-80。数据库中没有id为10的Dept

2. 测试`http://localhost/consumer/dept/get/10`

3. 没有配置的情况下：

   <img src="./跟随狂神学Java-40.assets/image-20230818173016923.png" alt="image-20230818173016923" style="zoom:50%;" />

4. 配置了服务熔断的情况下

   <img src="./跟随狂神学Java-40.assets/image-20230818173040116.png" alt="image-20230818173040116" style="zoom:50%;" />





#### Hystrix服务降级

---

##### 服务降级是什么

​	服务降级是指 当服务器压力剧增的情况下，根据实际业务情况及流量，对一些服务和页面有策略的不处理，或换种简单的方式处理，从而释放服务器资源以保证核心业务正常运作或高效运作。说白了，**就是尽可能的把系统资源让给优先级高的服务**。

​	资源有限，而请求是无限的。如果在并发高峰期，不做服务降级处理，一方面肯定会影响整体服务的性能，严重的话可能会导致宕机某些重要的服务不可用。所以，一般在高峰期，为了保证核心功能服务的可用性，都要对某些服务降级处理。比如当双11活动时，把交易无关的服务统统降级，如查看蚂蚁深林，查看历史订单等等。

​	服务降级主要用于什么场景呢？当整个微服务架构整体的负载超出了预设的上限阈值或即将到来的流量预计将会超过预设的阈值时，为了保证重要或基本的服务能正常运行，可以将一些 不重要 或 不紧急 的服务或任务进行服务的 延迟使用 或 暂停使用。

​	降级的方式可以根据业务来，可以延迟服务，比如延迟给用户增加积分，只是放到一个缓存中，等服务平稳之后再执行 ；或者在粒度范围内关闭服务，比如关闭相关文章的推荐。

​	**当某一时间内服务A的访问量暴增，而B和C的访问量较少，为了缓解A服务的压力，这时候需要B和C暂时关闭一些服务功能，去承担A的部分服务，从而为A分担压力，叫做服务降级**。

---

##### 服务降级需要考虑的问题

- 1）那些服务是核心服务，哪些服务是非核心服务
- 2）那些服务可以支持降级，那些服务不能支持降级，降级策略是什么
- 3）除服务降级之外是否存在更复杂的业务放通场景，策略是什么？

---

##### 自动降级分类

1. 超时降级：主要配置好超时时间和超时重试次数和机制，并使用异步机制探测回复情况

2. 失败次数降级：主要是一些不稳定的api，当失败调用次数达到一定阀值自动降级，同样要使用异步机制探测回复情况

3. 故障降级：比如要调用的远程服务挂掉了（网络故障、DNS故障、http服务返回错误的状态码、rpc服务抛出异常），则可以直接降级。降级后的处理方案有：默认值（比如库存服务挂了，返回默认现货）、兜底数据（比如广告挂了，返回提前准备好的一些静态页面）、缓存（之前暂存的一些缓存数据）

4. 限流降级：秒杀或者抢购一些限购商品时，此时可能会因为访问量太大而导致系统崩溃，此时会使用限流来进行限制访问量，当达到限流阀值，后续请求会被降级；降级后的处理方案可以是：排队页面（将用户导流到排队页面等一会重试）、无货（直接告知用户没货了）、错误页（如活动太火爆了，稍后重试）。

---

##### 服务降级-操作

1. 在springcloud-api模块下的service包中新建降级配置类DeptClientServiceFallBackFactory.java

   ~~~java
   package com.joker_yue.springcloud.service;
   
   import com.joker_yue.springcloud.pojo.Dept;
   import feign.hystrix.FallbackFactory;
   import org.springframework.stereotype.Component;
   
   import java.util.List;
   
   /**
    * 降级
    *
    * @author Joker
    * @version 1.0
    * @date 2023/8/18 16:15
    */
   @Component
   public class DeptClientServiceFallbackFactory implements FallbackFactory {
       @Override
       public Object create(Throwable throwable) {
           return new DeptClientService() {
   
               @Override
               public Dept queryById(Long id) {
                   return new Dept()
                           .setDeptno(id)
                           .setDname("该ID:" + id + "不存在该Dept或信息无法找到，服务端提供了降级的信息，这个服务现在已经被关闭")
                           .setDb_source("no this database in MySQL");
               }
   
               @Override
               public List<Dept> queryAll() {
                   return null;
               }
   
               @Override
               public boolean addDept(Dept dept) {
                   return false;
               }
           };
       }
   }
   
   ~~~

2. 在DeptClientService中指定降级配置类DeptClientServiceFallBackFactory

   ```java
   package com.joker_yue.springcloud.service;
   
   import com.joker_yue.springcloud.pojo.Dept;
   import org.springframework.cloud.openfeign.FeignClient;
   import org.springframework.stereotype.Component;
   import org.springframework.web.bind.annotation.GetMapping;
   import org.springframework.web.bind.annotation.PathVariable;
   import org.springframework.web.bind.annotation.PostMapping;
   
   import java.util.List;
   
   /**
    * Feign客户端的配置
    *
    * @author Joker
    * @version 1.0
    * @date 2023/8/17 21:02
    */
   // 参数：服务名
   @Component  // 为了能够注入Spring
   @FeignClient(value = "SPRINGCLOUD-PROVIDER-DEPT",fallbackFactory = DeptClientServiceFallbackFactory.class )   // 可以被服务直接调用。前一个参数为 服务名,后一个参数为降级实现类
   public interface DeptClientService {
       @GetMapping("/dept/get/{id}")
       Dept queryById(@PathVariable("id") Long id);
   
       @GetMapping("/dept/list")
       List<Dept> queryAll();
   
       @PostMapping("/dept/add")
       boolean addDept(Dept dept);
   }
   ```

3. 在`springcloud-consumer-dept-feign`中进行服务降级配置

   ```yaml
   server:
     port: 80
   #Eureka
   eureka:
     client:
       register-with-eureka: false # 不向eureka注册中心注册自己
       service-url:
         defaultZone: http://eureka7001.com:7001/eureka/,http://eureka7002.com:7002/eureka,http://eureka7003.com:7003/eureka
         #defaultZone: http://localhost:7001/eureka,http://localhost:7002/eureka,http://localhost:7003/eureka
   
   # Feign开启降级
   feign:
     hystrix:
       enabled: true
   ```

测试：

1. 打开springcloud-provider-dept-8001,8002,8003；springcloud-eureka-7001；springcloud-consumer-dept-feign

2. 测试访问`http://localhost/consumer/dept/get/3`

3. 关闭所有`springcloud-provider-dept`提供者

4. 重新访问

   1. 未配置服务降级

      <img src="./跟随狂神学Java-40.assets/image-20230818173637953.png" alt="image-20230818173637953" style="zoom:50%;" />

   2. 配置了

      <img src="./跟随狂神学Java-40.assets/image-20230818172055641.png" alt="image-20230818172055641" style="zoom:50%;" />





#### 服务降级和熔断的区别

---

​	**服务降级（Service Degradation）** 是一种应对高负载或部分故障情况下的一种策略。当系统的某些组件或服务出现问题，导致系统整体性能下降或无法正常响应时，为了保证系统的可用性，可以选择暂时关闭或降低一些非关键功能，从而减轻系统压力，保证核心功能的正常运行。

​	**熔断（Circuit Breaking）** 是一种应对服务故障的一种策略。当一个微服务或组件出现故障，无法正常提供服务时，熔断机制会暂时中断对该服务的请求，而不是让请求无限等待或导致整个系统的崩溃。通过熔断，系统可以快速失败并迅速恢复，不会因为一个服务的故障而影响到整个系统。

* 服务熔断：服务端，某个服务超时或者异常，就会引起熔断。相当于保险丝。
  * 这个服务是被迫走不了了
* 服务降级：客户端，从整体网站请求负载考虑，当某个服务熔断或者关闭后，用户依然能够发起请求，但是服务不会被调用。在客户端可以准备一个自己的服务回调FallbackFactory，返回一个默认的缺省值。整体的服务水平下降了
  * 这个是可以选择不走这个服务，好腾出资源给其他服务





#### Dashboard监控

---

##### 步骤

注意：不要按照狂神的来，老师的有问题！只有实现了 Hystrix 功能的方法，才能在dashboard 上看到调用效果！

* `springcloud-consumer-hystrix-dashboard`

  1. 导入依赖

     ~~~~xml
     <dependencies>
         <!-- 使用新的Netflix Eureka -->
         <dependency>
             <groupId>org.springframework.cloud</groupId>
             <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
         </dependency>
     
         <!-- hystrix -->
         <dependency>
             <groupId>org.springframework.cloud</groupId>
             <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
         </dependency>
         <!-- hystrix dashboard -->
         <dependency>
             <groupId>org.springframework.cloud</groupId>
             <artifactId>spring-cloud-starter-netflix-hystrix-dashboard</artifactId>
         </dependency>
         <!-- 实体类 -->
         <dependency>
             <groupId>com.joker_yue</groupId>
             <artifactId>springcloud-api</artifactId>
             <version>0.0.1-SNAPSHOT</version>
         </dependency>
         <!-- web -->
         <dependency>
             <groupId>org.springframework.boot</groupId>
             <artifactId>spring-boot-starter-web</artifactId>
         </dependency>
     </dependencies>
     ~~~~

  2. 配置文件

     ~~~yml
     server:
       port: 9001
     
     # 解决监控端Unable to connect to Command Metric Stream.
     hystrix:
       dashboard:
         proxy-stream-allow-list: "*"
     #    proxy-stream-allow-list: localhost # 也可以写成localhost，因为我们全部跑在本地
     ~~~

  3. 主启动类

     ~~~~java
     package com.joker_yue.springcloud;
     
     import org.springframework.boot.SpringApplication;
     import org.springframework.boot.autoconfigure.SpringBootApplication;
     import org.springframework.cloud.netflix.hystrix.dashboard.EnableHystrixDashboard;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/8/18 20:23
      */
     @SpringBootApplication
     @EnableHystrixDashboard // 开启Hystrix监控
     public class DeptConsumerDashboard_9001 {
         public static void main(String[] args) {
             SpringApplication.run(DeptConsumerDashboard_9001.class, args);
         }
     }
     ~~~~

* `springcloud-provider-dept-hystrix-8001`

  1. 主启动类

     ```java
     package com.joker_yue.springcloud;
     
     import com.netflix.hystrix.contrib.metrics.eventstream.HystrixMetricsStreamServlet;
     import org.springframework.boot.SpringApplication;
     import org.springframework.boot.autoconfigure.SpringBootApplication;
     import org.springframework.boot.web.servlet.ServletRegistrationBean;
     import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
     import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
     import org.springframework.cloud.netflix.hystrix.EnableHystrix;
     import org.springframework.context.annotation.Bean;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/8/15 21:00
      */
     // 启动类
     @SpringBootApplication
     @EnableEurekaClient // 在服务启动后自动将服务端注册到Eureka
     @EnableDiscoveryClient  // 服务发现
     // @EnableCircuitBreaker   // 熔断支持
     @EnableHystrix      // 开启Hystrix，已经实现了@EnableCircuitBreaker
     public class DeptProviderHystrix_8001 {
         public static void main(String[] args) {
             SpringApplication.run(DeptProviderHystrix_8001.class, args);
         }
     
         // 增加一个Servlet，用于发送监控数据。以方便Dashboard监控到
         @Bean
         public ServletRegistrationBean getServlet() {
             ServletRegistrationBean registrationBean = new ServletRegistrationBean(new HystrixMetricsStreamServlet());
             registrationBean.addUrlMappings("/actuator/hystrix.stream");
             return registrationBean;
     
         }
     }
     ```

* 测试

  1. 启动`springcloud-consumer-hystrix-dashboard`,`springcloud-eureka-7001`,`springcloud-provider-dept-hystrix-8001`

  2. 进入`http://localhost:9001/hystrix/`，输入如下:

     ![image-20230818210620594](./跟随狂神学Java-40.assets/image-20230818210620594.png)

  3. 运行成功

     ![image-20230818210452125](./跟随狂神学Java-40.assets/image-20230818210452125.png)

  4. 如果`http://localhost:8001/actuator/hystrix.stream`显示一直为`ping`，那么输入`http://localhost:8001/dept/get/1`发送Get请求过后重试

     



#### Zuul路由网关

---

##### 什么是Zuul

​	Zull包含了对请求的**路由**(用来跳转的)和**过滤**两个最主要功能：

​	其中**路由功能负责将外部请求转发到具体的微服务实例上，是实现外部访问统一入口的基础**，而**过滤器功能则负责对请求的处理过程进行干预，是实现请求校验，服务聚合等功能的基础**。Zuul和Eureka进行整合，将Zuul自身注册为 Eureka服务治理下的应用，同时从Eureka中获得其他服务的消息，也即以后的访问微服务都是通过Zuul跳转后获得。

​	比如我们现在都是`localhost:8080/`这样不好看不安全

<img src="./跟随狂神学Java-40.assets/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzU5MTk4MA==,size_16,color_FFFFFF,t_70#pic_center-1692422162118-17.png" alt="在这里插入图片描述" style="zoom: 67%;" />

**注意**：Zuul 服务最终还是会注册进 Eureka。官方名字叫Gateway

**提供**：代理 + 路由 + 过滤 三大功能！

----

##### 步骤

* `springcloud-zuul-9527`

  1. 导入依赖

     ~~~xml
     <dependencies>
         <!-- 使用新的Netflix Eureka -->
         <dependency>
             <groupId>org.springframework.cloud</groupId>
             <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
         </dependency>
         <!-- hystrix -->
         <dependency>
             <groupId>org.springframework.cloud</groupId>
             <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
         </dependency>
         <!-- hystrix dashboard -->
         <dependency>
             <groupId>org.springframework.cloud</groupId>
             <artifactId>spring-cloud-starter-netflix-hystrix-dashboard</artifactId>
         </dependency>
         <!-- Zuul -->
         <dependency>
             <groupId>org.springframework.cloud</groupId>
             <artifactId>spring-cloud-starter-netflix-zuul</artifactId>
         </dependency>
     
         <!-- 实体类 -->
         <dependency>
             <groupId>com.joker_yue</groupId>
             <artifactId>springcloud-api</artifactId>
             <version>0.0.1-SNAPSHOT</version>
         </dependency>
         <!-- web -->
         <dependency>
             <groupId>org.springframework.boot</groupId>
             <artifactId>spring-boot-starter-web</artifactId>
         </dependency>
     </dependencies>
     ~~~

  2. 配置文件

     ```yml
     server:
       port: 9527
     spring:
       application:
         name: springcloud-zuul
     
     eureka:
       client:
         service-url:
           defaultZone: http://eureka7001.com:7001/eureka/,http://eureka7002.com:7002/eureka,http://eureka7003.com:7003/eureka # 使用集群注册
           #defaultZone: http://localhost:7001/eureka,http://localhost:7002/eureka,http://localhost:7003/eureka # 使用集群注册
       instance:
         instance-id: zuul9527.com
         prefer-ip-address: true   # 显示真实IP
     
     info:
       app:
         name: joker-springcloud-zuul
         company.name: github.com/joker2yue
     ```

  3. 主启动类

     ```java
     package com.joker_yue.springcloud;
     
     import org.springframework.boot.SpringApplication;
     import org.springframework.boot.autoconfigure.SpringBootApplication;
     import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/8/19 13:35
      */
     @SpringBootApplication
     @EnableZuulProxy    // 开启Zuul
     public class ZuulApplication_9527 {
         public static void main(String[] args) {
             SpringApplication.run(ZuulApplication_9527.class, args);
         }
     }
     ```

* 测试

  1. 启动注册机+提供者+消费者+Dashboard+Zuul

  2. 输入`http://localhost:9527/springcloud-provider-dept/dept/get/1 `

  3. 成功如图：

     <img src="./跟随狂神学Java-40.assets/image-20230819134459691.png" alt="image-20230819134459691" style="zoom:67%;" />

     <img src="./跟随狂神学Java-40.assets/image-20230819142013929.png" alt="image-20230819142013929" style="zoom:67%;" />

* 修改路径

  * 觉得`http://localhost:9527/springcloud-provider-dept/dept/get/1`中的`springcloud-provider-dept`不好看？想改？你只需要加上如下配置：

  1. 配置

     ```yml
     zuul:
       routes:
         mydept.serviceId: springcloud-provider-dept # 要改的微服务名
         mydept.path: /mydept/**                     # 重新定义
     ```

  2. 测试结果

     <img src="./跟随狂神学Java-40.assets/image-20230819143847665.png" alt="image-20230819143847665" style="zoom:67%;" />

* 修改路径2

  * 原来的`springcloud-provider-dept`还是能访问，想让其不能访问，怎么办？

  1. 配置文件

     ~~~yml
     zuul:
       routes:
         mydept.serviceId: springcloud-provider-dept # 要改的微服务名
         mydept.path: /mydept/**                     # 重新定义
       ignored-services: springcloud-provider-dept # 不能访问的服务
     ~~~

  2. 测试结果

     <img src="./跟随狂神学Java-40.assets/image-20230819144403558.png" alt="image-20230819144403558" style="zoom:67%;" />

     <img src="./跟随狂神学Java-40.assets/image-20230819144415583.png" alt="image-20230819144415583" style="zoom:67%;" />

* 修改路径3

  * 想要个公共的访问路径前缀？

  1. 配置

     ```yml
     zuul:
       routes:
         mydept.serviceId: springcloud-provider-dept # 要改的微服务名
         mydept.path: /mydept/**                     # 重新定义
       ignored-services: springcloud-provider-dept # 不能访问的服务
       prefix: /joker # 前缀
     ```

  2. 测试结果

     <img src="./跟随狂神学Java-40.assets/image-20230819144630733.png" alt="image-20230819144630733" style="zoom:67%;" />

     <img src="./跟随狂神学Java-40.assets/image-20230819144647769.png" alt="image-20230819144647769" style="zoom:67%;" />





#### Spring Cloud Config 分布式配置

----

##### Dalston.RELEASE

​	**Spring Cloud Config为分布式系统中的外部配置提供服务器和客户端支持**。使用Config Server，您可以在所有环境中管理应用程序的外部属性。客户端和服务器上的概念映射与Spring `Environment`和`PropertySource`抽象相同，因此它们与Spring应用程序非常契合，但可以与任何以任何语言运行的应用程序一起使用。随着应用程序通过从开发人员到测试和生产的部署流程，您可以管理这些环境之间的配置，并确定应用程序具有迁移时需要运行的一切。服务器存储后端的默认实现使用git，因此它轻松支持标签版本的配置环境，以及可以访问用于管理内容的各种工具。很容易添加替代实现，并使用Spring配置将其插入。



---

##### 分布式系统面临的–配置文件问题

​	微服务意味着要将单体应用中的业务拆分成一个个子服务，每个服务的粒度相对较小，因此系统中会出现大量的服务，由于每个服务都需要必要的配置信息才能运行，所以一套集中式的，动态的配置管理设施是必不可少的。spring cloud提供了configServer来解决这个问题，我们每一个微服务自己带着一个application.yml，那上百个的配置文件修改起来，令人头疼！



---

##### 什么是Spring Cloud Config 分布式配置中心

<img src="./跟随狂神学Java-40.assets/image-20230819145417024.png" alt="image-20230819145417024" style="zoom:50%;" />

​	spring cloud config 为微服务架构中的微服务提供集中化的外部支持，配置服务器为各个不同微服务应用的所有环节提供了一个**中心化的外部配置**。

​	spring cloud config 分为**服务端**和**客户端**两部分。

​	服务端也称为 **分布式配置中心**，它是一个独立的微服务应用，用来连接配置服务器并为客户端提供获取配置信息，加密，解密信息等访问接口。

​	客户端则是**通过指定的配置中心来管理应用资源，以及与业务相关的配置内容，并在启动的时候从配置中心获取和加载配置信息**。配置服务器默认采用git来存储配置信息，这样就有助于对环境配置进行版本管理。并且可用通过git客户端工具来方便的管理和访问配置内容。

---

##### Spring Cloud Config 分布式配置中心能干嘛？

- 集中式管理配置文件
- 不同环境，不同配置，动态化的配置更新，分环境部署，比如 /dev /test /prod /beta /release
- 运行期间动态调整配置，不再需要在每个服务部署的机器上编写配置文件，服务会向配置中心统一拉取配置自己的信息
- 当配置发生变动时，服务不需要重启，即可感知到配置的变化，并应用新的配置
- 将配置信息以REST接口的形式暴露



---

##### Spring Cloud Config 分布式配置中心与GitHub整合

​	由于spring cloud config 默认使用git来存储配置文件 (也有其他方式，比如自持SVN 和本地文件)，但是最推荐的还是git ，而且使用的是 http / https 访问的形式。



----

##### 操作-服务端配置

* `springcloud-config-server-3344`

  1. 依赖

     ~~~xml
     <dependencies>
         <!-- Spring Boot Starter Web -->
         <dependency>
             <groupId>org.springframework.boot</groupId>
             <artifactId>spring-boot-starter-web</artifactId>
         </dependency>
         <!-- Eureka -->
         <dependency>
             <groupId>org.springframework.cloud</groupId>
             <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
         </dependency>
         <!-- Spring Cloud Config -->
         <dependency>
             <groupId>org.springframework.cloud</groupId>
             <artifactId>spring-cloud-config-server</artifactId>
             <version>4.0.3</version>
         </dependency>
     </dependencies>
     ~~~

  2. 配置文件

     ~~~yml
     server:
       port: 3344
     spring:
       application:
         name: springcloud-config-server-3344
         # 连接远程仓库
       cloud:
         config:
           server:
             git:
               # 注意是https的而不是ssh
               uri: https://github.com/Joker2Yue/SpringCloudLearn.git
               # 通过 config-server可以连接到git，访问其中的资源以及配置~
               default-label: main   # 分支名，Github将默认分支名改成main了
     ~~~

  3. 主启动类

     ~~~java
     package com.joker_yue.springcloud;
     
     import org.springframework.boot.SpringApplication;
     import org.springframework.boot.autoconfigure.SpringBootApplication;
     import org.springframework.cloud.config.server.EnableConfigServer;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/8/19 16:17
      */
     @SpringBootApplication
     @EnableConfigServer     // 开启服务中心配置
     public class ConfigServer_3344 {
         public static void main(String[] args) {
             SpringApplication.run(ConfigServer_3344.class, args);
         }
     }
     ~~~

  4. 测试，启动springcloud-config-server-3344

     ![image-20230819171224935](./跟随狂神学Java-40.assets/image-20230819171224935.png)



* 访问说明

  ~~~yml
  /{application}/{profile}[/{label}]
  /{application}-{profile}.yml
  /{label}/{application}-{profile}.yml
  /{application}-{profile}.properties
  /{label}/{application}-{profile}.properties
  ~~~

  所以以下访问均是可行的

  * http://localhost:3344/application/test/main

  * http://localhost:3344/application-test.yml
  * http://localhost:3344/main/application-test.yml
  * http://localhost:3344/application-test.properties
  * http://localhost:3344/main/application-test.properties



---

##### 操作-客户端配置（此操作用于测试）

* 关于bootstrap.yml

  <img src="./跟随狂神学Java-40.assets/image-20230819175056101.png" alt="image-20230819175056101" style="zoom:80%;" />

  * 与application.yml的区别是，**bootstrap.yml** 是系统级别的配置

* `springcloud-config-client-3355`

  1. 依赖

     ```xml
     <dependencies>
         <!-- Spring Boot Starter Web -->
         <dependency>
             <groupId>org.springframework.boot</groupId>
             <artifactId>spring-boot-starter-web</artifactId>
         </dependency>
         <!-- Spring Cloud Config -->
         <dependency>
             <groupId>org.springframework.cloud</groupId>
             <artifactId>spring-cloud-starter-config</artifactId>
             <version>2.2.8.RELEASE</version>
         </dependency>
     </dependencies>
     ```

  2. bootstrap.yml

     ```yml
     # 系统级别的配置
     spring:
       cloud:
         config:
           # 远程获得配置，组合起来就是http://localhost:3344/main/config-client-dev.yml
           uri: http://localhost:3344
           name: config-client # 需要从git上读取的资源名称，不需要后缀
           profile: dev # 读取配置
           label: main
     ```

  3. application.yml

     ```yml
     # 用户级别的配置
     spring:
       application:
         name: springcloud-config-client-3355
     ```

  4. ConfigClientController

     ```java
     package com.joker_yue.springcloud.controller;
     
     import org.springframework.beans.factory.annotation.Value;
     import org.springframework.web.bind.annotation.RequestMapping;
     import org.springframework.web.bind.annotation.RestController;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/8/19 19:02
      */
     @RestController
     public class ConfigClientController {
         @Value("${spring.application.name}")
         private String applicationName;
     
         @Value("${eureka.client.service-url.defaultZone}")
         private String eurekaServer;
     
         @Value("${server.port}")
         private String port;
     
         @RequestMapping("/config")
         public String getConfig() {
             return "applicationName:" + applicationName + ",eurekaServer:" + eurekaServer + ",port:" + port;
         }
     }
     ```

  5. 主启动类

     ```java
     package com.joker_yue.springcloud;
     
     import org.springframework.boot.SpringApplication;
     import org.springframework.boot.autoconfigure.SpringBootApplication;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/8/19 19:01
      */
     @SpringBootApplication
     public class ConfigClient_3355 {
         public static void main(String[] args) {
             SpringApplication.run(ConfigClient_3355.class, args);
         }
     }
     ```

* 测试

  1. 启动springcloud-eureka-7001；springcloud-config-server-3344；springcloud-config-client-3355

  2. 访问`http://localhost:8202/config`

  3. 成功案例

     ![image-20230819192221173](./跟随狂神学Java-40.assets/image-20230819192221173.png)

---

##### 操作-注册中心配置

* `config-eureka.yml`

  ```yml
  # 用于springcloud-config-eureka-7001 的远程配置文件
  spring:
    profiles:
      active: dev
  
  ---
  server:
    port: 7001
  
  # spring的配置
  spring:
    profiles: dev
    application:
      name: springcloud-config-eureka
  
  # Eureka配置
  eureka:
    instance:
      hostname: localhost # Eureka服务端的名字（实例名称）
    client:
      register-with-eureka: false   # 是否向Eureka注册中心注册自己。由于我们现在在写服务器，不用向自己注册自己
      fetch-registry: false   # 如果为false，表示自己为注册中心
      service-url: # 监控页面
        # 集群（关联）
        defaultZone: http://eureka7002.com/eureka/,http://eureka7003.com/eureka
        #defaultZone: http://localhost:7002/eureka,http://localhost:7003/eureka
  
  debug: false
  
  ---
  server:
    port: 7001
  
  # spring的配置
  spring:
    profiles: test
    application:
      name: springcloud-config-eureka
  
  # Eureka配置
  eureka:
    instance:
      hostname: localhost # Eureka服务端的名字（实例名称）
    client:
      register-with-eureka: false   # 是否向Eureka注册中心注册自己。由于我们现在在写服务器，不用向自己注册自己
      fetch-registry: false   # 如果为false，表示自己为注册中心
      service-url: # 监控页面
        # 集群（关联）
        defaultZone: http://eureka7002.com/eureka/,http://eureka7003.com/eureka
        #defaultZone: http://localhost:7002/eureka,http://localhost:7003/eureka
  
  debug: ture
  ```

* `springcloud-config-eureka-7001`

  1. 依赖

     ```xml
     <dependencies>
         <!-- Spring Cloud Config -->
         <dependency>
             <groupId>org.springframework.cloud</groupId>
             <artifactId>spring-cloud-starter-config</artifactId>
             <version>2.2.8.RELEASE</version>
         </dependency>
         <!-- 使用新的Netflix Eureka -->
         <dependency>
             <groupId>org.springframework.cloud</groupId>
             <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
         </dependency>
     </dependencies>
     ```

  2. `application.yml`

     ```yml
     spring:
       application:
         name: springcloud-config-eureka-7001
     ```

     `bootstrap.yml`

     ```yml
     # 系统级别的配置
     spring:
       cloud:
         config:
           # 远程获得配置，组合起来就是http://localhost:3344/main/config-eureka-dev.yml
           uri: http://localhost:3344
           name: config-eureka # 需要从git上读取的资源名称，不需要后缀
           profile: dev # 读取配置
           label: main
     ```

  3. 其他的搬运springcloud-eureka-7001

  4. 启动springcloud-config-server-3344；springcloud-eureka-7001

  5. 测试成功

     ![image-20230819195742346](./跟随狂神学Java-40.assets/image-20230819195742346.png)



---

##### 操作-提供者配置

* `config-dept.yml`

  ~~~yml
  # 用于springcloud-config-dept-8001 的远程配置文件
  spring:
    profiles:
      active: dev
  
  
  ---
  server:
    port: 8001
  # mybatis配置
  mybatis:
    type-aliases-package: com.joker_yue.springcloud.pojo
    config-location: classpath:mybatis/mybatis-config.xml
    mapper-locations: classpath:mybatis/mapper/*.xml
  
  # spring配置
  spring:
    profiles: dev
    application:
      name: springcloud-config-dept   # 3个服务的名字一样
    datasource:
      type: com.alibaba.druid.pool.DruidDataSource
      driver-class-name: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://localhost:3306/db01?useSSL=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
      username: root
      password: root
  
  
  debug: false
  
  # Eureka的配置，服务注册到哪里
  eureka:
    client:
      service-url:
        defaultZone: http://eureka7001.com:7001/eureka/,http://eureka7002.com:7002/eureka,http://eureka7003.com:7003/eureka # 使用集群注册
        #defaultZone: http://localhost:7001/eureka,http://localhost:7002/eureka,http://localhost:7003/eureka
    instance:
      instance-id: springcloud-provider-dept8001 # 修改默认描述信息
  #    prefer-ip-address: true
  
  # info配置
  info:
    app.name: joker-springcloud-prpvider-8001
    company.name: github.com/Joker2Yue
  
  
  ---
  server:
    port: 8001
  # mybatis配置
  mybatis:
    type-aliases-package: com.joker_yue.springcloud.pojo
    config-location: classpath:mybatis/mybatis-config.xml
    mapper-locations: classpath:mybatis/mapper/*.xml
  
  # spring配置
  spring:
    profiles: test
    application:
      name: springcloud-config-dept   # 3个服务的名字一样
    datasource:
      type: com.alibaba.druid.pool.DruidDataSource
      driver-class-name: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://localhost:3306/db02?useSSL=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
      username: root
      password: root
  
  
  debug: true
  
  # Eureka的配置，服务注册到哪里
  eureka:
    client:
      service-url:
        defaultZone: http://eureka7001.com:7001/eureka/,http://eureka7002.com:7002/eureka,http://eureka7003.com:7003/eureka # 使用集群注册
        #defaultZone: http://localhost:7001/eureka,http://localhost:7002/eureka,http://localhost:7003/eureka
    instance:
      instance-id: springcloud-provider-dept8001 # 修改默认描述信息
  #    prefer-ip-address: true
  
  # info配置
  info:
    app.name: joker-springcloud-prpvider-8001
    company.name: github.com/Joker2Yue
  
  ~~~

* `springcloud-config-dept-8001`

  1. 依赖：spring-cloud-starter-config

  2. `application.yml`

     ```yml
     spring:
       application:
         name: springcloud-config-dept-8001
     ```

  3. `bootstrap.yml`

     ```yml
     # 系统级别的配置
     spring:
       cloud:
         config:
           # 远程获得配置，组合起来就是http://localhost:3344/main/config-dept.yml
           uri: http://localhost:3344
           name: config-dept # 需要从git上读取的资源名称，不需要后缀
           profile: dev # 读取配置
           label: main
     ```

  4. 其余照搬springcloud-provider-dept-8001

  5. 测试成功

     ![image-20230819202052399](./跟随狂神学Java-40.assets/image-20230819202052399.png)