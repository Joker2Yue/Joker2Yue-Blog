---
title: 跟随狂神学Java-41，SpringCloud Alibaba
date: 2023/08/24 04:02:22
tags:
  - Java
  - 狂神
  - Spring
  - SpringCloud
  - 分布式
  - 必看
categories:
  - [跟随狂神学Java]
  - [必看]
  - [技术]
  - [Java]
cover: https://resource.joker2yue.top/blog/images/coverImg/Spring/SpringCloud2.jpg
keywords:
  - 背景
  - 传统架构
  - 分布式架构
  - 分布式
  - SOA
  - 微服务架构
  - 优缺点
  - 技术栈
  - 常见问题
  - IT公司
  - SpringCloud
  - SpringCloud Alibaba
  - SpringBoot
  - Dubbo
  - 远程调用
  - 微服务架构
  - 注册中心
  - 服务注册
  - 服务发现
  - 服务治理
  - RPC调用
  - 分布式服务注册中心
  - Spring Cloud Alibaba
  - Nacos
  - 负载均衡算法
  - Ribbon
  - 本地负载均衡器
  - RestTemplate
  - OpenFeign
  - 分布式配置中心
  - 微服务网关
  - 网关过滤器
  - Zuul
  - Gateway
  - 全局Token过滤器
ai:
  - 本文介绍了微服务架构中的关键概念，包括注册中心、服务注册与发现、服务治理、RPC调用实现。讨论了常见的分布式服务注册中心，并解释了为什么要使用Spring Cloud Alibaba和Nacos。文章还包括手写负载均衡算法、Ribbon本地负载均衡器、使用RestTemplate实现负载均衡、OpenFeign客户端、基于Nacos实现分布式配置中心以及新一代服务网关Gateway的内容。
  - 本文介绍了微服务架构的基本概念，重点探讨了服务注册、服务发现、服务治理等方面的重要性。然后，讲解了Nacos作为分布式服务注册中心的使用，包括环境准备、负载均衡算法的手写实现以及Ribbon本地负载均衡器的应用。接着，文章介绍了如何使用RestTemplate和OpenFeign客户端实现负载均衡，并讨论了分布式配置中心的需求和Nacos的应用。最后，文章简要提及了微服务网关的概念和配置。
  - 本文介绍了微服务架构、Spring Cloud Alibaba、Nacos、负载均衡、OpenFeign、分布式配置中心、服务网关等关键概念和技术。文章着重讨论了Nacos的使用、负载均衡算法、Ribbon本地负载均衡、分布式配置中心的实现、服务网关的配置，为构建分布式系统提供了有用的指南。
---
# 跟随狂神学Java

**第四十一：微服务-SpringCloud Alibaba**

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
> [Spring Cloud Alibaba 中文手册](https://github.com/alibaba/spring-cloud-alibaba/blob/master/README-zh.md)
>
> [什么是 Nacos](https://nacos.io/zh-cn/docs/what-is-nacos.html)
>
> [Spring Cloud中国社区](http://springcloud.cn/)
>
> [Joker2Yue/SpringCloudLearn: 学习SpringCloud的相关代码、笔记 (github.com)](https://github.com/Joker2Yue/SpringCloudLearn)



#### 概念

---

##### 微服务架构 中的名词

* 生产者（有的叫提供者） 提供接口
* 消费者（有的叫使用者） 调用生产者提供的接口
* 服务注册 生产者将提供的接口存放进注册中心
* 服务发现 消费者从注册中心找到需要的IP地址和端口号
* 服务治理 如何保证消费者每次拿到IP和端口号都是可用的

---

##### 注册中心的重要性

​	如果生产者提供的接口在不停变动，那么消费者中的配置就必须不停的手动修改。这样十分麻烦。

​	注册中心就是将生产者的服务IP和端口号进行存放，提供给消费者查询。

---

##### 服务注册-注册中心是如何存放生产者服务的IP和端口号的

* 底层

  ~~~java
  Map<String,List<String>>
  Map<服务的名称,存放多个该服务集群地址>
  ~~~

* 怎么注册的

  1. 每个服务都有自己的名称，当提供者启动时，将寻找注册中心，并将把服务名称和端口号一并注册到注册中心

  2. 由于同一个服务可能有多个提供者，比如提供者提供的服务名为`Joker-Provider`，服务的端口号有两个，`192.168.110.1:8080`，`192.168.110.2：8080`。它们将会以这种方式存入注册中心：

     ~~~java
     <Joker-Provider, <192.168.110.1:8080,192.168.110.2：8080>>
     ~~~

----

##### 服务发现-消费者是如何找到需要的服务IP和端口号的

​	之前生产者将服务名称、IP和端口号存放进入了注册中心。消费者可以直接在注册中心通过服务名来查找可用服务。

​	每次需要调用服务时，它会一次性拿回所有可用的IP+端口号到**本地**，然后在其中选择一个进行使用

---

##### 服务治理-如何保证消费者每次拿到的服务IP和端口号都是可用的

​	在RPC远程调用过程中，服务与服务之间依赖关系非常大，服务Url地址管理非常复杂，所以这时候需要对我们服务的url实现治理，通过服务治理可以实现服务注册与发现、负载均衡、容错等。

---

##### 【本地】实现RPC调用的理解

​	通过上述描述，已经了解到：注册中心仅仅是为消费者提供了生产者的服务IP和端口号。真正去执行服务调用的还是消费者。我们所说的本地是针对于消费者而言的。

​	我们可以通过Feign客户端或HttpClient执行RPC远程调用

---

##### 常见的分布式服务注册中心

​	Eureka、ZooKeeper、Consule、Nacos、Redis、数据库等。

​	因为它们是容器，可以存放服务的IP和端口号

----

##### 为什么需要使用SpringCloudAlibaba

* 为什么SpringCloudNetflix逐渐被SpringCloudAlibaba取代
  1. 社区活跃度：Spring Cloud Alibaba是由阿里巴巴开发和维护的，得到了阿里巴巴团队的长期支持和维护。相比之下，Spring Cloud Netflix的维护活动已经减少，社区支持相对较少。
  2. 功能丰富性：Spring Cloud Alibaba提供了更多的功能和组件，例如Nacos作为服务注册和配置中心、Sentinel作为流量控制和熔断降级的解决方案等。这些功能使得Spring Cloud Alibaba更加适合构建微服务架构。
  3. 性能和稳定性：Spring Cloud Alibaba在性能和稳定性方面进行了优化和改进。它通过使用更高效的组件和算法，提供了更好的性能和可靠性。
  4. 技术生态系统：Spring Cloud Alibaba与阿里巴巴的其他技术产品和解决方案集成紧密，可以更好地支持阿里巴巴的微服务架构和云原生应用开发。

* 第一代和第二代的区别：

  <img src="./跟随狂神学Java-41.assets/clip_image002.jpg" alt="img" style="zoom: 80%;" />

* 详细信息
  * SpringCloud第一代：
    * SpringCloud Config 分布式配置中心
    * SpringCloud Netflix 核心组件
    * Eureka:服务治理 
    * Hystrix:服务保护框架
    * Ribbon:客户端负载均衡器
    * Feign：基于ribbon和hystrix的声明式服务调用组件
    * Zuul: 网关组件,提供智能路由、访问过滤等功能。
  * SpringCloud第二代（自己研发）和优秀的组件组合：
    * Spring Cloud Gateway 网关
    * Spring Cloud Loadbalancer 客户端负载均衡器
    * Spring Cloud r4j(Resilience4J) 服务保护
    * Spring Cloud Alibaba Nacos 服务注册
    * Spring Cloud Alibaba Nacos 分布式配置中心
    * Spring Cloud Alibaba Sentinel服务保护 
    * SpringCloud Alibaba Seata分布式事务解决框架
    * Alibaba Cloud OSS 阿里云存储
    * Alibaba Cloud SchedulerX 分布式任务调度平台
    * Alibaba Cloud SMS 分布式短信系统



#### Nacos整合SpringCloud

---

##### 什么是Nacos

<img src="./跟随狂神学Java-41.assets/Nacos_Logo.png" alt="img" style="zoom: 33%;" />

* 官方文档：

  ​	[Nacos](https://nacos.io/zh-cn/docs/what-is-nacos.html)是 Dynamic Naming and Configuration Service的首字母简称，一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。**分布式配置中心**

  ​	Nacos 致力于帮助您发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，帮助您快速实现动态服务发现、服务配置、服务元数据及流量管理。

  ​	Nacos 帮助您更敏捷和容易地构建、交付和管理微服务平台。 Nacos 是构建以“服务”为中心的现代应用架构 (例如微服务范式、云原生范式) 的服务基础设施。

* Nacos2.0新特性

---

##### Nacos环境的准备

* Nacos可以在linux/windows/Mac版本上都可以安装，具体安装教程地址：[Nacos 快速开始](https://nacos.io/zh-cn/docs/quick-start.html)

* 运行
  双击运行，此操作将会默认让其以集群方式启动，而由于我们还没有配置集群，所以会Error。同时注意，路径不能有中文！

  ![image-20230820151207562](./跟随狂神学Java-41.assets/image-20230820151207562.png)

* 配置

  将Nacos以单机形式运行

  * 编辑startup.cmd，将如下`cluster`改成`standalone`
  * 重新运行

  运行成功案例

  <img src="./跟随狂神学Java-41.assets/image-20230820151044583.png" alt="image-20230820151044583" style="zoom:67%;" />

* 使用

  * 默认账户密码均为nacos
  * ![image-20230820151334609](./跟随狂神学Java-41.assets/image-20230820151334609.png)

* 包含功能

  * Nacos的Web管理系统
  * Nacos注册服务的API接口

* 手动实现服务注册与发现

  1. 实现服务注册【你可以使用此接口来向nacos注册服务】，其中nacos.naming.serviceName为可替换字段
      发送post请求：'http://127.0.0.1:8848/nacos/v1/ns/instance?serviceName=nacos.naming.serviceName&ip=20.18.7.10&port=8080'

  2. 实现服务发现【你可以使用此接口来查询指定的服务】，其中nacos.naming.serviceName为可替换字段

     http://127.0.0.1:8848/nacos/v1/ns/instance/list?serviceName=nacos.naming.serviceName

     详细步骤操作：https://nacos.io/zh-cn/docs/quick-start.html

* 心跳与续约

  * 在Nacos中，如果微服务在15s内没有向Nacos注册中心发送心跳，Nacos将会认为此地址为脏地址。
  * 如果30s内没有心跳，将会认为此微服务已down，并移除列表



---

##### 版本选择

​	[版本说明 · alibaba/spring-cloud-alibaba Wiki (github.com)](https://github.com/alibaba/spring-cloud-alibaba/wiki/版本说明)

​	本项目使用的依赖为：

<img src="./跟随狂神学Java-41.assets/image-20230821170359262.png" alt="image-20230821170359262" style="zoom:67%;" />

```xml
<dependencies>

    <!-- Spring Cloud -->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-dependencies</artifactId>
        <version>Hoxton.SR12</version>
        <type>pom</type>
        <scope>import</scope>
    </dependency>

    <!-- Spring Boot starter test -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>

    <!-- Spring Boot starter web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!--   Spring Cloud Alibaba Nacos  -->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        <version>2.2.9.RELEASE</version>
    </dependency>

</dependencies>
```





---

##### 生产者接口

* `member-producer-8081`

  代码

  ```java
  package com.joker_yue.service;
  
  import org.springframework.web.bind.annotation.RequestMapping;
  import org.springframework.web.bind.annotation.RestController;
  
  /**
   * 会员服务接口
   * @author Joker
   * @version 1.0
   * @date 2023/8/20 14:17
   */
  @RestController
  public class MemberService {
      /**
       * <p> 为会员服务提供接口 </p>
       * <p> 2023/8/20,14:21 </p>
       *
       * @return java.lang.String
       */
  
      @RequestMapping("/getMember")
      public String getMember(){
          return "我是会员服务接口...";
      }
  }
  ```

* 配置

  ```yml
  server:
    port: 8081	# member-producer-8082的是8082
  spring:
    application:
      name: member-producer # 在注册中心展示的服务名称
    cloud:
      nacos:
        discovery:
          server-addr: 127.0.0.1:8848 # Nacos服务注册中心地址
  ```

* 运行

  ![image-20230820155332572](./跟随狂神学Java-41.assets/image-20230820155332572.png)

  ![image-20230820155811330](./跟随狂神学Java-41.assets/image-20230820155811330.png)





----

##### 消费者接口

* `order-consumer-807x`

  1. 代码

     * OrderToMemberService.java

       ```java
       package com.joker_yue.service;
       
       import org.springframework.beans.factory.annotation.Autowired;
       import org.springframework.cloud.client.ServiceInstance;
       import org.springframework.cloud.client.discovery.DiscoveryClient;
       import org.springframework.web.bind.annotation.RequestMapping;
       import org.springframework.web.bind.annotation.RestController;
       import org.springframework.web.client.RestTemplate;
       
       import java.util.List;
       
       /**
        * @author Joker
        */
       @RestController
       public class OrderToMemberService {
       
           @Autowired
           private DiscoveryClient discoveryClient;
           @Autowired
           private RestTemplate restTemplate;
       
           /**
            * 订单服务调用到我们的会员服务接口
            *
            * @return
            */
           @RequestMapping("/orderToMember")
           public Object orderToMember() {
               // 1.根据服务名称从 注册中心获取集群列表地址
               List<ServiceInstance> instances = discoveryClient.getInstances("member-producer-808x");
               ServiceInstance serviceInstance = instances.get(0);
               // 会员服务的IP和端口
               String memberUrl = "http://" + serviceInstance.getHost() + ":" + serviceInstance.getPort() + "getMember";
       
               return restTemplate.getForObject(memberUrl, String.class);
           }
       
       }
       
       ```

     * 主启动类

       ```java
       package com.joker_yue;
       
       import org.springframework.boot.SpringApplication;
       import org.springframework.boot.autoconfigure.SpringBootApplication;
       import org.springframework.boot.web.client.RestTemplateBuilder;
       import org.springframework.context.annotation.Bean;
       import org.springframework.web.client.RestTemplate;
       
       /**
        * 消费者接口
        *
        * @author Joker
        * @version 1.0
        * @date 2023/8/20 16:06
        */
       @SpringBootApplication
       public class AppOrder {
           public static void main(String[] args) {
               SpringApplication.run(AppOrder.class, args);
           }
       
           /**
            * <p> 将RestTemplate注入Spring IoC容器中 </p>
            * <p> 2023/8/20,16:29 </p>
            * @param builder
            * @return org.springframework.web.client.RestTemplate
            */
       
           @Bean
           public RestTemplate restTemplate(RestTemplateBuilder builder) {
               return builder.build();
           }
       }
       ```

  2. 配置文件

     ```yml
     server:
       port: 8070
     spring:
       application:
         name: order-consumer-807x # 在注册中心展示的服务名称
         
       cloud:
         nacos:
           discovery:
             server-addr: 127.0.0.1:8848 # Nacos服务注册中心地址
     ```



* 关于Resttemplate

  ​	它是从Spring3.0开始支持的一个模板工具， 是 Spring Framework 提供的一个用于发送 HTTP 请求和接收 HTTP 响应方案的模板，可以发送各种 HTTP 请求，例如 GET、POST、PUT、DELETE 等，并且可以指定请求参数、请求头、请求体等。它还能够将响应的 JSON 数据（或其他格式）映射到 Java 对象中，使得处理返回的数据更加方便。它的底层是基于HttpClient封装的







#### 手写负载均衡算法

---

##### Tips

​	这里都是消费端实现的

* 步骤：

  1. 编写算法

  1. 将其应用到需要使用的地方

* 接口

  MyLoadBalance.java

  ```java
  package com.joker_yue.loadbalance;
  
  import org.springframework.cloud.client.ServiceInstance;
  
  /**
   * 自定义负载均衡算法-接口
   * @author Joker
   * @version 1.0
   * @date 2023/8/20 16:53
   */
  public interface MyLoadBalance {
      ServiceInstance getInstances(String serviceName);
  }
  ```

---

##### 轮询算法

* RoundLoadBalance.java

  ```java
  package com.joker_yue.loadbalance;
  
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.cloud.client.ServiceInstance;
  import org.springframework.cloud.client.discovery.DiscoveryClient;
  import org.springframework.stereotype.Component;
  
  import java.util.List;
  import java.util.concurrent.atomic.AtomicInteger;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/8/20 16:55
   */
  @Component  // 注入容器，使Bean生效
  public class RoundLoadBalance implements MyLoadBalance {
      @Autowired
      private DiscoveryClient discoveryClient;
      @Autowired
      private AtomicInteger atomicCounter;// 原子类计数器，保证安全性
  
      @Override
      public ServiceInstance getInstances(String serviceName) {
          // 1. 根据服务名称获取服务的集群地址列表
          List<ServiceInstance> instances = discoveryClient.getInstances(serviceName);
          // 2. 判断是否为空
          if (instances == null || instances.size() == 0) {
              return null;
          }
          // 3. 使用负载均衡的算法
          int index = atomicCounter.incrementAndGet() % instances.size(); // 轮询
          return instances.get(index);
  
      }
  }
  ```

* OrderToMemberService.java

  ```java
  package com.joker_yue.service;
  
  import com.joker_yue.loadbalance.RoundLoadBalance;
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.cloud.client.ServiceInstance;
  import org.springframework.cloud.client.discovery.DiscoveryClient;
  import org.springframework.web.bind.annotation.RequestMapping;
  import org.springframework.web.bind.annotation.RestController;
  import org.springframework.web.client.RestTemplate;
  
  import java.util.List;
  
  /**
   * @author Joker
   */
  @RestController
  public class OrderToMemberService {
  
      @Autowired
      private DiscoveryClient discoveryClient;
      @Autowired
      private RestTemplate restTemplate;
      @Autowired
      private RoundLoadBalance roundLoadBalance;
  
      /**
       * 订单服务调用到我们的会员服务接口
       *
       * @return
       */
      @RequestMapping("/orderToMember")
      public Object orderToMember() {
          // 1.根据服务名称从 注册中心获取集群列表地址，并将第0个进行使用
          // List<ServiceInstance> instances = discoveryClient.getInstances("member-producer-808x");
          // ServiceInstance serviceInstance = instances.get(0);
  
          // 将获取服务实例的规则搭配上负载均衡算法
          ServiceInstance serviceInstance = roundLoadBalance.getInstances("member-producer-808x");
  
          // 会员服务的IP和端口
          String memberUrl = "http://" + serviceInstance.getHost() + ":" + serviceInstance.getPort() + "/getMember";
  
          return "订单服务调用会员服务" + restTemplate.getForObject(memberUrl, String.class);
      }
  
  }
  ```

---

##### 随机算法

* RandomBalance.java

  ```java
  package com.joker_yue.loadbalance;
  
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.cloud.client.ServiceInstance;
  import org.springframework.cloud.client.discovery.DiscoveryClient;
  import org.springframework.stereotype.Component;
  
  import java.util.List;
  import java.util.Random;
  import java.util.concurrent.atomic.AtomicInteger;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/8/20 19:31
   */
  @Component
  public class RandomBalance implements MyLoadBalance {
      @Autowired
      private DiscoveryClient discoveryClient;
  
      @Override
      public ServiceInstance getInstances(String serviceName) {
          // 1. 根据服务名称获取服务的集群地址列表
          List<ServiceInstance> instances = discoveryClient.getInstances(serviceName);
          // 2. 判断是否为空
          if (instances == null || instances.size() == 0) {
              return null;
          }
          // 3. 使用负载均衡的算法
          int index = new Random().nextInt(instances.size()); // 生成从0到instances.size()-1的随机数
          return instances.get(index);
  
      }
  }
  ```

* OrderToMemberService.java

  ```java
  @RestController
  public class OrderToMemberService {
  
      @Autowired
      private RandomBalance randomBalance;
  	
      ...
  
          // 将获取服务实例的规则搭配上负载均衡-随机算法
          ServiceInstance serviceInstance = randomBalance.getInstances("member-producer-808x");
  
      ...
          
  }
  ```



----

##### 权重算法

* 引入

  * 其实轮询算法可以看作权重是1：1的权重算法

  * 比如，轮询两个，8080和8081。那么可想而知，第一次为8080，第二次为8081

  * 而后，将8080的权重设置为2，8081仍然为1，那么第一次与第二次仍然为8080，第三次为8081

  * 那么这个可以看作：

    ~~~java
    8080
    8080
    8081
    ~~~

  * 其中有两个8080，只有一个8081

* 如何获取服务实例权重的比例

  ![image-20230821135123911](./跟随狂神学Java-41.assets/image-20230821135123911.png)

  ![image-20230821135351467](./跟随狂神学Java-41.assets/image-20230821135351467.png)

* 代码

  1. WeightBalance.java

     ```java
     package com.joker_yue.loadbalance;
     
     import org.springframework.beans.factory.annotation.Autowired;
     import org.springframework.cloud.client.ServiceInstance;
     import org.springframework.cloud.client.discovery.DiscoveryClient;
     import org.springframework.stereotype.Component;
     
     import java.util.ArrayList;
     import java.util.List;
     import java.util.concurrent.atomic.AtomicInteger;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/8/21 13:58
      */
     @Component
     public class WeightLoadBalance implements MyLoadBalance {
         @Autowired
         private DiscoveryClient discoveryClient;
         @Autowired
         private AtomicInteger atomicCounter;    // 计数器
     
         @Override
         public ServiceInstance getInstances(String serviceName) {
             // 1. 根据服务的id名称，获取该服务的多个实例
             List<ServiceInstance> instances = discoveryClient.getInstances(serviceName);
             if (instances == null || instances.size() == 0) {
                 return null;
             }
     
             // 2. 配置权重
             ArrayList<ServiceInstance> newInstances = new ArrayList<>();    // 新的实例集
             // 循环遍历该服务名称的多个实例
             instances.forEach((services) -> {
                 // 获取该实例的权重
                 Double weight = Double.parseDouble(services.getMetadata().get("weight"));
                 // 按照权重，将其装载进新的实例集
                 for (int i = 0; i < weight; i++) {
                     newInstances.add(services);
                 }
             });
     
             // 3. 使用轮询的算法，遍历新的实例集并返回实例
             atomicCounter.incrementAndGet();    // 计数器自加
             return newInstances.get(atomicCounter.get() % newInstances.size());
         }
     }
     ```

  2. OrderToMemberService.java

     ```java
     @Autowired
     private WeightLoadBalance weightLoadBalance;
     
     // 将获取服务实例的规则搭配上负载均衡-权重算法
     ServiceInstance serviceInstance = weightLoadBalance.getInstances("member-producer-808x");
     ```







#### 故障转移

---

##### 原理

 在目标服务器出现故障的时候遍历尝试所有的服务实例，直到遇到一个能够实现服务的服务器。如果全部不通则失败

---

##### 代码

* OrderToMemberService.java

  ```java
  package com.joker_yue.service;
  
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.cloud.client.ServiceInstance;
  import org.springframework.cloud.client.discovery.DiscoveryClient;
  import org.springframework.web.bind.annotation.RequestMapping;
  import org.springframework.web.bind.annotation.RestController;
  import org.springframework.web.client.RestClientException;
  import org.springframework.web.client.RestTemplate;
  
  import java.util.List;
  
  /**
   * @author Joker
   */
  @RestController
  public class OrderToMemberService {
  
      @Autowired
      private DiscoveryClient discoveryClient;
      @Autowired
      private RestTemplate restTemplate;
  
      /**
       * 订单服务调用到我们的会员服务接口
       *
       * @return
       */
      @RequestMapping("/orderToMember")
      public Object orderToMemberFailover() {
          // 1.根据服务名称从 注册中心获取集群列表地址，并将第0个进行使用
          List<ServiceInstance> instances = discoveryClient.getInstances("member-producer-808x");
  
          // 2.遍历每一个服务实例
          for (int i = 0; i < instances.size(); i++) {
              try {
                  ServiceInstance serviceInstance = instances.get(i);
                  String memberUrl = "http://" + serviceInstance.getHost() + ":" + serviceInstance.getPort() + "/getMember";
                  return "订单服务调用会员服务" + restTemplate.getForObject(memberUrl, String.class);
              } catch (RestClientException e) {
                  System.err.println("[RPC远程调用发生故障]" + e.getMessage());
              }
          }
          return "fail";
      }
  
  }
  ```







#### Ribbon本地负载均衡器

---

##### 什么是本地负载均衡器，有哪些

​	消费者从注册中心上获取接口调用地址列表，本地实现负载均衡算法（轮询、随机、hash一致性、权重）来获取接口地址列表，采用算法获取选择一个接口地址实现本地RPC远程调用

​	本地负载均衡器可以自己写，Ribbon（SpringCloudNetflix，第一代），LoadBalancer（SpringCloud自己研发，第二代）

​	SpringCloudRest或者OpenFeign都是默认支持Ribbon的

---

##### 默认算法-轮询

* `order-consumer-8071`

  1. 依赖

     已经自带了ribbon

     <img src="./跟随狂神学Java-41.assets/image-20230821170932147.png" alt="image-20230821170932147" style="zoom:50%;" />

  2. `OrderToMemberService.java`中，将获取实例的方法设置为通过Ribbon进行查找，即可达到使用轮询算法的目的

     ```java
     @Autowired
     private LoadBalancerClient loadBalancerClient;
     
     // Ribbon 轮询 查找服务实例
     ServiceInstance serviceInstance = loadBalancerClient.choose("member-producer-808x");
     ```

     

---

##### 自带算法-随机

* 在`order-comsumer-8071`中新建`com.joker_yue.config.LoadBalanceConfig.java`

  <img src="./跟随狂神学Java-41.assets/image-20230821180314307.png" alt="image-20230821180314307" style="zoom: 50%;" />

* 在其中编写如下代码。目的是设置负载均衡的算法设置为随机

  ```java
  package com.joker_yue.config;
  
  import com.netflix.loadbalancer.RandomRule;
  import org.springframework.context.annotation.Bean;
  import org.springframework.context.annotation.Configuration;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/8/21 17:27
   */
  
  @Configuration
  public class LoadBalanceConfig {
      /**
       * <p> 使用随机算法 </p>
       * <p> 2023/8/21,17:59 </p>
       *
       * @return com.netflix.loadbalancer.RandomRule
       */
  
      @Bean
      public RandomRule randomRule() {
          return new RandomRule();
      }
  }
  
  ```

  即可使用自带的随机算法

---

##### 自定义算法-轮询

* 在`order-comsumer-8071`中新建`com.joker_yue.config.RibbonWeightLoadBalance.java`

  <img src="./跟随狂神学Java-41.assets/image-20230822124111354.png" alt="image-20230822124111354" style="zoom:50%;" />

* 在其中编写

  ```java
  package com.joker_yue.config;
  
  import com.alibaba.cloud.nacos.ribbon.NacosServer;
  import com.netflix.client.config.IClientConfig;
  import com.netflix.loadbalancer.AbstractLoadBalancerRule;
  import com.netflix.loadbalancer.ILoadBalancer;
  import com.netflix.loadbalancer.Server;
  import org.springframework.stereotype.Component;
  
  import java.util.ArrayList;
  import java.util.List;
  import java.util.concurrent.atomic.AtomicInteger;
  
  /**
   * 自定义的Ribbon权重均衡算法
   *
   * @author Joker
   * @version 1.0
   * @date 2023/8/21 20:18
   */
  
  @Component // 确保仅在SpringIoc容器中只注入一次，去隔壁的LoadBalanceConfig看看，如果已经注入，请删除此注解
  public class RibbonWeightLoadBalance extends AbstractLoadBalancerRule {
      // 原子计数器
      private AtomicInteger atomicCounter = new AtomicInteger(0);
  
      @Override
      public void initWithNiwsConfig(IClientConfig clientConfig) {
          // 初始化配置
      }
  
      @Override
      public Server choose(Object key) {
          return this.choose(getLoadBalancer(), key);
      }
  
      public Server choose(ILoadBalancer lb, Object key) {
          if (lb == null) {
              return null;
          }
  
          // 获取服务列表
          List<Server> upList = lb.getReachableServers(); // 获取正在活跃的服务器
          ArrayList<NacosServer> newNacosServers = new ArrayList<>(); // 新的Nacos集合
  
          // 遍历upList按照权重转载进newNacosServers
          upList.forEach((server) -> {
  
              // 将upList中的服务强转为NacosServer，因为 com.netflix.loadbalancer.Server中没有权重信息
              NacosServer nacosServer = (NacosServer) server;
              double weight = nacosServer.getInstance().getWeight();  // 获取权重
              for (int i = 0; i < weight; i++) {
                  newNacosServers.add(nacosServer);
              }
          });
          return newNacosServers.get(atomicCounter.incrementAndGet() % newNacosServers.size());
      }
  }
  ```

* 请注意，注入方式有以下两种，任选其一

  * `RibbonWeightLoadBalance`中使用`@Component`注入

  * `LoadBalanceConfig`中进行配置与注入

    ```java
    package com.joker_yue.config;
    
    import com.netflix.loadbalancer.IRule;
    import com.netflix.loadbalancer.RandomRule;
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    
    /**
     * @author Joker
     * @version 1.0
     * @date 2023/8/21 17:27
     */
    
    @Configuration
    public class LoadBalanceConfig {
    
        // 下方也可以进行注入
         @Bean
         public IRule myRule() {
             return new RibbonWeightLoadBalance();
         }
    }
    ```

​	

----

##### Nginx与本地负载均衡器的区别

* Nginx为服务器端的负载均衡
  * 一般用于Tomcat/jetty服务器
* 本地负载器为客户端的负载均衡
  * 一般用于微服务RPC远程调用，比如Dubbo，rest模板、OpenFeign或者RPC远程调用框架





#### 使用`@LoadBalanced`结合RestTemplate实现负载均衡

---

##### 回顾

​	我们上节也是负载均衡，方法是修改获取实例（`ServiceInstance`）的方式来达到负载均衡。这样做未免有些繁琐。我们可以通过另一种方式，使用`@LoadBalanced`结合`RestTemplate`进行负载均衡的实现。它们的区别如下：

1. **使用方式**：
   - `@LoadBalanced`：`@LoadBalanced` 是一个注解，用于标注在 `RestTemplate` 实例上。通过在 `RestTemplate` 上添加这个注解，你可以在使用 `RestTemplate` 发起 HTTP 请求时，自动实现负载均衡。这种方式相对简单，不需要显式地调用负载均衡的相关方法。
   - `loadBalancerClient.choose`：`loadBalancerClient` 是 Spring Cloud 提供的负载均衡客户端，可以通过它显式地选择一个服务实例。通过调用 `choose` 方法，你可以从服务实例列表中选择一个符合负载均衡策略的实例，然后使用该实例的信息构建请求。
2. **功能**：
   - `@LoadBalanced`：使用 `@LoadBalanced` 注解后，`RestTemplate` 会自动将服务名替换为实际的服务实例的 URL 地址，实现负载均衡。这样在代码层面不需要显式地处理实例的选择逻辑。
   - `loadBalancerClient.choose`：通过 `loadBalancerClient` 可以实现更灵活的实例选择。你可以通过调用 `choose` 方法手动选择一个实例，还可以通过它获取服务实例的元数据信息。这适用于那些需要更多控制权和定制性的场景。

---

##### 操作

* 在模块`load-balanced-order-consumer-8071`中

  * 目录结构

    <img src="./跟随狂神学Java-41.assets/image-20230823142435264.png" alt="image-20230823142435264" style="zoom:50%;" />

  * 代码

    * `OrderToMemberService`

      直接将获取服务的URL改成`http://服务名/你要的Mapping接口`即可

      ```java
      package com.joker_yue.service;
      
      import org.springframework.beans.factory.annotation.Autowired;
      import org.springframework.cloud.client.discovery.DiscoveryClient;
      import org.springframework.web.bind.annotation.RequestMapping;
      import org.springframework.web.bind.annotation.RestController;
      import org.springframework.web.client.RestTemplate;
      
      /**
       * @author Joker
       */
      @RestController
      public class OrderToMemberService {
      
          @Autowired
          private DiscoveryClient discoveryClient;
          @Autowired
          private RestTemplate restTemplate;
      
      
          /**
           * 订单服务调用到我们的会员服务接口
           *
           * @return
           */
          @RequestMapping("/orderToMember")
          public Object orderToMember() {
              // 要获取的服务链接
              String memberUrl = "http://" + "member-producer-808x" + "/getMember";
              return "订单服务调用会员服务" + restTemplate.getForObject(memberUrl, String.class);
          }
      
      }
      ```

    * `LoadBalancedAppOrder_8071`

      在`RestTemplate`上加入注解`@LoadBalanced`，这样就能够自动处理负载均衡

      ```java
      package com.joker_yue;
      
      import org.springframework.boot.SpringApplication;
      import org.springframework.boot.autoconfigure.SpringBootApplication;
      import org.springframework.boot.web.client.RestTemplateBuilder;
      import org.springframework.cloud.client.loadbalancer.LoadBalanced;
      import org.springframework.context.annotation.Bean;
      import org.springframework.web.client.RestTemplate;
      
      import java.util.concurrent.atomic.AtomicInteger;
      
      /**
       * 消费者接口
       *
       * @author Joker
       * @version 1.0
       * @date 2023/8/20 16:06
       */
      @SpringBootApplication
      public class LoadBalancedAppOrder_8071 {
          public static void main(String[] args) {
              SpringApplication.run(LoadBalancedAppOrder_8071.class, args);
          }
      
          /**
           * <p> 将RestTemplate注入Spring IoC容器中 </p>
           * <p> 2023/8/20,16:29 </p>
           * @param builder
           * @return org.springframework.web.client.RestTemplate
           */
          @Bean
          @LoadBalanced
          public RestTemplate restTemplate(RestTemplateBuilder builder) {
              return builder.build();
          }
      
      
      }
      ```

* 为方便演示，以单例模式启动Nacos，启动`load-balanced-order-consumer-8071`，`member-producer-8081`，`member-producer-8082`，在浏览器中输入http://localhost:8071/orderToMember查看结果

  



#### OpenFeign客户端

---

##### 与NetflixFeign的区别

1. **背景和发展**：
   - `Feign`：最初由 Netflix 开发，作为 Spring Cloud Netflix 项目的一部分。它提供了一种声明式的方式来定义和调用 HTTP 客户端，使得微服务之间的通信变得更加简单。然而，Netflix 在后来决定停止维护 `Feign`，因此原始的 `Feign` 已经不再维护。
   - `OpenFeign`：是 `Feign` 的一个重写版本，由 Spring Cloud 团队开发并维护。它在保留了原始 `Feign` 的声明式特性的基础上，对一些功能进行了增强和改进，并且与 Spring Cloud 的其他组件更好地集成。
2. **功能增强**：
   - `OpenFeign` 在原始 `Feign` 的基础上增加了对 Spring Cloud 注解的支持，例如 `@RequestMapping`、`@RequestParam` 等，使得使用起来更加类似于 Spring MVC。
   - `OpenFeign` 支持 Hystrix 熔断和 Ribbon 负载均衡的集成，可以更方便地实现容错和负载均衡的策略。
   - `OpenFeign` 支持对请求和响应的压缩，可以减小网络传输的数据量。
   - `OpenFeign` 支持多参数、`@PathVariable`、`@RequestHeader` 参数的映射。
3. **使用方式**：
   - `OpenFeign` 使用起来更加类似于 Spring MVC，你可以像编写 Controller 方法一样定义接口，然后在接口上使用注解来描述服务调用。
   - `Feign` 在使用时需要自己定义一个接口，并使用注解描述接口中的方法，然后通过工厂方法创建实例。
4. **依赖**：
   - `OpenFeign`：在使用 Spring Cloud 项目时，可以通过添加 `spring-cloud-starter-openfeign` 依赖来使用 `OpenFeign`。
   - `Feign`：原始的 `Feign` 依赖现在已经不再维护，不建议继续使用。推荐使用 `OpenFeign`。

---

##### 微服务项目结构基本实现

<img src="./跟随狂神学Java-41.assets/微服务项目的架构模式.png" alt="微服务项目的架构模式" style="zoom: 40%;" />

这种架构最大的优点：

* 对Feign实现复用机制

此部分代码存放于[Joker2Yue/SpringCloudLearn at feign (github.com)](https://github.com/Joker2Yue/SpringCloudLearn/tree/feign)











#### 基于Nacos实现分布式配置中心

---

##### 为什么需要分布式配置中心

​	传统项目存放在本地，一旦改动配置文件需要重启。以创建新的bean对象，注入新的属性值

​	而分布式配置中心很好的解决了这一问题。



---

##### 常见的分布式配置中心

* 携程的阿波罗（构建环境十分负载，因为底层的架构粒度拆分的十分细）
* SpringCloud Config（还不如自己写。因为它是将文件内容存放在git上）
* Nacos 分布式配置中心（轻量级）



---

##### Nacos分布式配置中心架构设计原理

* nacos-config-server.jar（其实是和Nacos注册中心合并的）
  1. 分布式配置中心的接口
  2. 管理系统页面

* 配置文件上传到分布式配置中心的名称必须是 服务名称.yml
* 上传之后将会持久化存放在db中



---

##### 操作-部署分布式配置中心

* 配置文件上传

  <img src="./跟随狂神学Java-41.assets/image-20230822133558659.png" alt="image-20230822133558659" style="zoom: 50%;" />

* `config-member-producer-8081`配置编写

  * `bootstrap.yml`

    ```yml
    spring:
      application:
        name: member-producer-808x # 在注册中心展示的服务名称
      cloud:
        nacos:
          config:
            server-addr: 127.0.0.1:8848 # Nacos Config服务端地址
            file-extension: yml # 文件扩展名
    ```

* 如果配置中心正常，启动对应服务后你将会在本地看到你上传的yml的缓存

  <img src="./跟随狂神学Java-41.assets/image-20230822140405224.png" alt="image-20230822140405224" style="zoom:50%;" />

* 配置中心宕机了？会继续使用之前缓存的yml

---

##### 操作-配置本地服务器刷新

* 如果我们将远程配置文件进行修改，那么本地缓存中的配置文件也会立即进行更新。可是现在本地的服务不会进行刷新，仍然需要手动重启进行更新bean

* 思路

  更新bean有两种方式

  1. 反射机制，难度较大。

  2. 刷新注解`@ResreshScope`

     如果在类上加上此注解，当检测到修改时，将会销毁对应属性的bean，并重新创建一个

  3. 将bean模式设置为原型（不推荐，可能占用服务器堆内存）

* 代码

  * `ConfigAppMember_8081.java.java`

  ```java
  package com.joker_yue.service;
  
  import org.springframework.beans.factory.annotation.Value;
  import org.springframework.cloud.context.config.annotation.RefreshScope;
  import org.springframework.context.annotation.Scope;
  import org.springframework.web.bind.annotation.RequestMapping;
  import org.springframework.web.bind.annotation.RestController;
  
  /**
   * 会员服务接口
   * @author Joker
   * @version 1.0
   * @date 2023/8/20 14:17
   */
  @RestController
  @RefreshScope   // 自动刷新
  // @Scope("prototype")    // 设置为原型
  public class MemberService {
      // 自动填写端口号
      @Value("${server.port}")
      private String serverPort;
      /**
       * <p> 为会员服务提供接口 </p>
       * <p> 2023/8/20,14:21 </p>
       *
       * @return java.lang.String
       */
      @RequestMapping("/getMember")
      public String getMember(){
          return " 我是会员服务接口..." + serverPort;
      }
  }
  
  ```

---

##### 服务器是怎么知道分布式配置中心的配置进行更新的？

* 策略有心跳、轮询或长轮询，推荐长轮询，节约服务器资源每隔一段时间比较一下是不是发生变化了

* 怎么知道配置文件发生变化的？md5

  服务器做md5，本地也做md5。进行比较	 





#### Nacos注册中心集群

---

##### 如何搭建

1. 将你的Nacos压缩包复制几份然后解压

   <img src="./跟随狂神学Java-41.assets/image-20230822171421512.png" alt="image-20230822171421512" style="zoom:50%;" />

2. 将`cluster.conf.example`重命名为`cluster.conf`，然后将IP写进去

   * IP：千万别写127.0.0.1。那写什么？控制台输入`ipconfig`，查看如下信息

     <img src="./跟随狂神学Java-41.assets/image-20230822171656619.png" alt="image-20230822171656619" style="zoom: 33%;" />

   * 端口：应该注意避开如下端口

     <img src="./跟随狂神学Java-41.assets/v2-b88b66f81dde9409ac42cbb811ebd7cd_1440w.png" alt="img" style="zoom: 50%;" />

   * 正确的IP示例如下

     ![image-20230822163332177](./跟随狂神学Java-41.assets/image-20230822163332177.png)

3. 搭建数据库-运行如下的sql

   <img src="./跟随狂神学Java-41.assets/image-20230822171842084.png" alt="image-20230822171842084" style="zoom:50%;" />

4. 修改自带的连接信息

   `application.properties`

   ~~~properties
   ### Default web server port:
   server.port=8748
   
   #*************** Config Module Related Configurations ***************#
   ### If use MySQL as datasource:
   # spring.datasource.platform=mysql
   
   ### Count of DB:
   db.num=1
   
   ### Connect URL of DB:
   db.url.0=jdbc:mysql://127.0.0.1:3306/nacos?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC
   db.user.0=root
   db.password.0=root
   ~~~

5. 同理，将其他三个也这样。但是注意，`application.properties`中`server.port`需要设置连接的端口

6. 运行

   ![image-20230822171526067](./跟随狂神学Java-41.assets/image-20230822171526067.png)



---

##### Nacos集群搭配Nginx实现负载均衡

* 为了实现高可用，保证一台down掉不会影响整体运行
* 数据如何同步？采用AP和CP模式
* CP raft算法

<img src="./跟随狂神学Java-41.assets/image-20230822174303730.png" alt="image-20230822174303730" style="zoom: 80%;" />



* Nginx配置

  ~~~json
  #gzip  on;
  upstream breakserver{
      server 192.168.1.102:8748 weight=1;
      server 192.168.1.102:8849 weight=1;
      server 192.168.1.102:8950 weight=1;
  }
  ~~~

  

---

##### 操作-使用Nacos注册中心集群进行注册

* `nacos-cluster-member-producer-8081`，`nacos-cluster-order-consumer-8071`

  * 配置文件

    ```yml
    server:
      port: 8081
    spring:
      application:
        name: member-producer-808x # 在注册中心展示的服务名称
      cloud:
        nacos:
          discovery:
            server-addr: 127.0.0.1:8748, 127.0.0.1:8849, 127.0.0.1:8950 # Nacos服务注册中心地址
    ```



---

##### Nacos与Eureka实现注册中心的区别

* CAP原则
  * **一致性（Consistency）** 同一时刻同一请求的不同实例返回的结果相同，这要求数据具有强一致性(Strong Consistency)
  * **可用性（Availability）** 所有读写请求在一定时间内得到正确的响应
  * **分区容错性（Partition tolerance）** 在网络异常情况下，系统仍能正常运作

* nacos从1.0开始就支持AP和CP模式 

  * AP

    ​	提供者注册进来了。而Nacos在将数据同步到其他节点的时候发生了延迟，消费者根据服务名称，有可能在这个注册中心中找不到接口地址。获取不到的情况下该如何解决呢？

    ​	办法：去注册中心集群的下一个进行查找即可

    ​	缺点是这样可能造成获取服务时的延迟，但如果注册中心遵循AP原则的话，小延迟是允许的。因为AP原则只保证可用性而不保证一致性

    ​	但是Nacos客户端启动时，会不会将所有服务全部注册到同一个注册中心上呢？不会，采用随机算法选择一个接口地址实现服务的注册，再将数据同步给其他节点

  * CP

    ​	如果你介意延迟，那么就采用CP模式，因为它底层是Raft选举算法

    > Raft 是一种共识算法，用于在分布式系统中维护一致性和可靠性。它的主要目标是确保在分布式系统中的节点之间达成一致的决策，即使在出现节点故障或网络分区的情况下也能够保持数据一致性。
    >
    > Raft 算法包含了一个选举过程，用于选出一个领导者节点，领导者节点负责处理客户端请求和驱动副本（复制节点）之间的数据同步。以下是 Raft 选举算法的关键步骤：
    >
    > 1. **选举触发**：当系统启动时，或者在现有的领导者节点出现故障时，集群中的节点会开始选举过程。
    > 2. **选举过程**：在选举过程中，每个节点都可以处于三种状态：**跟随者（Follower）**、**候选人（Candidate）**和**领导者（Leader）**。初始状态下，所有节点都是跟随者。当某个节点成为候选人后，它会增加当前的任期号并向其他节点发送选举请求。
    > 3. **投票**：在选举请求中，候选人会包含自己的任期号和候选人 ID。收到选举请求的节点会比较任期号，如果候选人的任期号大于自己的任期号，则会转变为跟随者状态，并投票给候选人。每个节点只能在一个任期内投票一次，如果收到了更大任期的请求，则会重置自己的投票。
    > 4. **选举胜利**：如果候选人收到了大多数节点的投票（超过半数），则它会成为新的领导者。新领导者会向其他节点发送心跳消息来表明自己的地位。
    > 5. **领导者维护**：一旦候选人成为领导者，它会处理客户端请求并定期发送心跳消息。心跳消息用于维持其他节点对领导者的认可，并防止其他节点发起新的选举。
    > 6. **节点崩溃**：如果领导者节点崩溃或变得不可达，其他节点会在超时后开始新的选举过程，重复上述步骤。





#### 新一代服务网关Gateway

---

#####  什么是微服务网关

* 微服务网关是整个微服务API请求的入口，可以实现日志拦截、权限控制、解决跨域问题、限流、熔断、负载均衡、黑名单与白名单拦截、授权等。

---

##### 为什么需要网关

1. **服务路由和负载均衡**：微服务架构中的服务通常会部署在多个实例上，微服务网关可以根据请求的内容将请求路由到适当的服务实例上，实现负载均衡。这使得系统能够有效地处理并发请求，提高了可用性和性能。
2. **统一入口**：微服务网关为所有微服务提供了一个统一的入口点。客户端无需知道每个微服务的具体地址和端口，只需通过微服务网关访问所有的服务，简化了客户端的调用方式。
3. **安全性和认证**：微服务网关可以集中处理身份验证和授权，确保只有经过认证的用户才能访问内部微服务。这减轻了每个微服务都需要实现安全机制的负担，同时也可以减少潜在的安全漏洞。
4. **请求转发和聚合**：微服务网关可以根据业务需求将一个请求转发到多个不同的微服务，然后将它们的响应聚合在一起返回给客户端。这有助于减少客户端的请求数量，降低网络延迟，并且能够更好地管理复杂的前端-后端通信逻辑。
5. **请求日志和监控**：微服务网关可以记录请求和响应的日志，以及服务的性能指标，从而实现对服务的监控和分析。这使得开发团队能够更好地理解系统的运行状况，并迅速发现和解决潜在问题。
6. **灰度发布和版本管理**：微服务网关可以实现灰度发布，即逐步将新版本的服务引入生产环境，以减少风险。同时，也可以基于不同的请求头或参数，将请求路由到不同版本的服务上，从而实现版本管理和演进。
7. **缓存和数据预处理**：微服务网关可以在请求到达实际的微服务之前，对数据进行缓存或预处理，从而减轻微服务的负担，提高响应速度。
8. **跨域请求处理**：微服务网关可以处理跨域请求，帮助前端应用从不同的域名或端口请求数据，提供更好的用户体验。

---

##### 过滤器与网关的区别

* 过滤器用于拦截单个服务

* 网关拦截整个的微服务

---

##### Zuul与Gateway有那些区别

1. **Zuul**：

   `Zuul` 是 Netflix 开发的一个较早的 API 网关组件，属于 Spring Cloud Netflix 第一代微服务网关。它充当了服务网关的角色，可以用于请求路由、请求过滤、负载均衡、服务聚合等。主要特点包括：

   - 路由功能：可以根据请求的路径将请求路由到相应的微服务实例。
   - 过滤功能：支持对请求和响应进行预处理和后处理，例如身份验证、日志记录、安全性等。
   - 负载均衡：可以结合 Ribbon 进行服务实例的负载均衡。
   - 集成了 Eureka 服务注册与发现，可以自动将请求路由到可用的服务实例。
   - 支持动态路由配置，可以实现灰度发布等功能。

2. **Gateway**：

   `Gateway` 是 Spring Cloud 自己研发的网关框架，用于构建基于 Spring 5、Project Reactor 和 Spring Boot 2 的 API 网关。与 `Zuul` 相比，`Gateway` 在性能、灵活性和功能方面进行了一些改进。主要特点包括：

   - 基于 Reactor 编程模型：采用非阻塞的编程方式，具有更好的性能和可扩展性。
   - 路由规则：使用基于 Predicate 和 Filter 的方式来定义路由规则和过滤器。
   - 动态路由：支持动态刷新路由配置，无需重启网关。
   - 更好的性能：`Gateway` 在性能方面相对 `Zuul` 有一定的优势，特别是在高并发场景下。
   - 支持 WebSocket 和 HTTP/2。
   - 更适合响应式编程模型。

3. **注意：**

   * Zuul底层是基于Servlet实现的，阻塞式的API， 不支持长连接。依赖组件SpringBoot-Web

   * SpringCloudGateway基于Spring5构建，能够实现响应式非阻塞式的API，支持长连接，能够更好的整合Spring体系的产品。依赖组件SpringBoot-WebFux

----

##### 配置网关

* 网关的端口一般是80或者443，原因如下：
  * **标准端口**：
    - **HTTP通信（非加密）**：80端口是标准的HTTP通信端口，大多数Web应用使用HTTP协议进行通信。当用户在浏览器中输入一个URL时，如果不指定端口号，浏览器会默认使用80端口来发送HTTP请求。
    - **HTTPS通信（加密）**：443端口是标准的HTTPS通信端口，HTTPS协议使用SSL/TLS加密来保护数据的安全传输。HTTPS通信需要进行加密和解密操作，所以使用了独立的端口来处理加密流程。
  * **防火墙和网络代理**：在大多数网络环境中，80和443端口通常是开放的，因为它们是标准的Web通信端口。这样可以确保网关可以通过企业防火墙、代理服务器等网络设备顺利地与外部通信。
  * **跨域请求问题**：浏览器对于跨域请求有一些限制，一般只允许通过标准的HTTP端口（80）和HTTPS端口（443）进行跨域通信，这可以减少一些安全风险。
  * **用户友好性**：80和443端口是默认的Web端口，大多数用户在输入URL时不会显式地添加端口号，所以使用标准端口可以简化用户访问的步骤。

---

#####  网关与Nginx的区别

* 相同点：都是可以实现对api接口的拦截，负载均衡、反向代理、请求过滤等，可以实现和网关一样的效果。

* 不同点：
  * Nginx采用C语言编写的
  * 微服务都是自己语言编写的 比如Gateway就是java写的。

毕竟Gateway属于Java语言编写的， 能够更好对微服务实现扩展功能，相比Nginx如果想实现扩展功能需要结合Nginx+Lua语言等。

Nginx实现负载均衡的原理：属于服务器端负载均衡器。

Gateway实现负载均衡原理：采用本地负载均衡器的形式。

---

##### 操作-实现网关

* `SpringCloudGateway`项目

  代码

  ```yml
  server:
    port: 80  # 指定网关的监听端口为80
  
  # 服务网关名称
  spring:
    application:
      name: joker-gateway  # 定义服务网关的应用名称
    cloud:
      gateway:
        discovery:
          locator:
            # 开启以服务id去注册中心上获取转发地址
            enabled: true
          # 路由策略
        routes:
          # 路由id
          - id: member  # 路由ID，用于标识该路由规则
            # 转发到如下地址
            uri: lb://member-producer-808x/  # 转发到名为"member-producer-808x"的服务，使用负载均衡策略
            filters:
              - StripPrefix=1  # 去除前缀
            # 匹配规则，
            predicates:
              - Path=/member/**  # 使用路径匹配规则，当请求路径匹配"/member/**"时触发该路由
      # Nacos配置
      nacos:
        discovery:
          server-addr: 127.0.0.1:8848
  ```

---

##### 操作-全局Token过滤器

* 实现`GlobalFilter`接口即可

  代码

  ```java
  package com.joker_yue.filter;
  
  import org.springframework.cloud.gateway.filter.GatewayFilterChain;
  import org.springframework.cloud.gateway.filter.GlobalFilter;
  import org.springframework.core.io.buffer.DataBuffer;
  import org.springframework.http.HttpStatus;
  import org.springframework.http.server.reactive.ServerHttpResponse;
  import org.springframework.stereotype.Component;
  import org.springframework.util.StringUtils;
  import org.springframework.web.server.ServerWebExchange;
  import reactor.core.publisher.Mono;
  
  /**
   * 网关全局过滤器
   * @author Joker
   * @version 1.0
   * @date 2023/8/23 21:08
   */
  @Component
  public class TokenGlobalFilter implements GlobalFilter {
      @Override
      public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
          // 如何获取参数？我们之前可以通过HttpServletRequest.getParameter()来获取
          String token = exchange.getRequest().getQueryParams().getFirst("token");
          if (StringUtils.isEmpty(token)) {
              ServerHttpResponse response = exchange.getResponse();   // 从响应中获取
              response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR); // 500
  
              String msg = "token is empty";
              DataBuffer msgBuffer = response.bufferFactory().wrap(msg.getBytes());
              return response.writeWith(Mono.just(msgBuffer));
          }
  
          // token不为空，直接转发到真实服务
          return chain.filter(exchange);
      }
  }
  ```