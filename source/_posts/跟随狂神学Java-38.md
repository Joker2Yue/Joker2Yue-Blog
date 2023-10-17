---
title: 跟随狂神学Java-38，SpringBoot
date: 2023/08/12 04:02:22
tags:
  - Java
  - 狂神
  - Spring
  - SpringBoot
  - 必看
categories:
  - [跟随狂神学Java]
  - [必看]
  - [技术]
  - [Java]
cover: https://resource.joker2yue.cn/blog/images/coverImg/Spring/SpringBoot.png
keywords:
  - Spring框架
  - Spring Boot
  - 微服务
  - 单体应用架构
  - 微服务架构
  - 自动配置
  - 主程序
  - SpringApplication
  - SpringBoot配置
  - YAML
  - JSR303数据校验
  - SpringBoot Web开发
  - 静态资源导入
  - Thymeleaf
  - MVC配置
  - 员工管理系统
  - 页面国际化
  - 用户权限拦截
  - 添加员工
  - 404页面
  - Swagger
  - 前后端分离
  - 异步任务
  - 邮件任务
  - 定时任务
  - 全局异常捕获
  - 分布式系统
  - RPC
  - Dubbo
ai:
  - 这份笔记总结了《跟随狂神学Java》的内容，包括历史回顾、学习安排、Spring、SpringBoot、微服务、第一个SpringBoot程序、SpringBoot配置、SpringBoot Web开发、Thymeleaf模板引擎、MVC配置原理、员工管理系统、整合JDBC、整合Druid数据源、整合Mybatis、整合SpringSecurity、Swagger、异步任务、邮件任务、定时任务、全局捕获异常、分布式系统和Dubbo等主题。
  - 这份笔记以《跟随狂神学Java》为主题，涵盖了Java开发中的多个关键概念和技术。首先，它回顾了Java的历史和学习安排，为读者提供了一个学习Java的框架。然后，它深入介绍了Spring框架，解释了什么是Spring以及它如何简化Java开发。接着，它探讨了SpringBoot，阐述了其主要优点和用途。此外，它引入了微服务架构，解释了微服务与单体应用的区别以及如何构建微服务。笔记还包括了如何创建第一个SpringBoot项目，包括项目的创建、代码编写、打包和配置文件。它还解释了SpringBoot的原理，包括自动配置和主程序。随后，笔记详细介绍了SpringBoot的配置、静态资源导入、模板引擎（Thymeleaf）、MVC配置、员工管理系统和Web应用的搭建。接下来，笔记介绍了如何整合JDBC、Druid数据源、MyBatis和Spring Security，以及如何使用Swagger进行API文档的生成和管理。此外，它还讨论了异步任务、邮件任务、定时任务和全局异常处理等主题。最后，笔记引入了分布式系统的概念，包括RPC和Dubbo框架。
  - 这篇笔记总结了跟随狂神学Java的课程内容，包括历史回顾、Spring框架、Spring Boot、微服务、Spring Boot Web开发、Swagger、异步任务、分布式系统等多个主题。这些主题涵盖了Java开发的核心概念和实际应用，包括Spring框架的使用、Spring Boot快速开发、微服务架构、Web开发、API文档生成、异步任务处理以及分布式系统等方面的知识。这份笔记提供了学习Java开发的基本路线和知识点，是一份很好的学习资源。
---
# 跟随狂神学Java

**第三十八：微服务-SpringBoot**

> "真正的危险不是计算机开始像人一样思考，而是人开始像计算机一样思考。"
>
> [【狂神说Java】SpringBoot最新教程IDEA版通俗易懂_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1PE411i7CV/?vd_source=814489e71df641c4b2c0ff7d4659b2d0)
>
> [狂神公众号](https://dwz.cn/P1N121RT)
>
> [Spring Boot 中文文档 (springdoc.cn)](https://springdoc.cn/spring-boot/)
>
> [蚂蚁课堂]( www.mayikt.com)



#### 历史回顾与学习安排

---

##### 历史回顾

JavaSE：OOP思想

Mysql：持久化

HTML+CSS+JS+jQuery+框架：视图。做的不好看的原因是框架不熟练，css技能不好

SSM：框架，简化了我们的开发流程，但是随着版本迭代行新特性更新，配置也开始变得复杂



于是，有了SpringBoot，微服务架构

而后面服务越来越多，也就有了SpringCloud

---

##### 学习安排

<img src="./跟随狂神学Java-38.assets/image-20230806162654888.png" alt="image-20230806162654888" style="zoom:50%;" />





#### Spring

---

##### 什么是Spring

* 一个开源的框架，2003年兴起的一个轻量级Java开发框架。作者：Rod Johnson
* 它是为了解决企业级应用开发的复杂性而创建的，简化开发。

---

##### Spring是如何简化Java开发的

为了降低 Java 开发的复杂性， Spring 采用了以下 4 种关键策略：

1. 基于 POJO 的轻量级和最小侵入性编程
2. 通过IoC、依赖注入（DI）和面向接口实现松耦合
3. 基于切面 (AOP) 和惯例进行声明式编程
4. 通过切面和模版减少样式代码

---

##### 什么是SpringBoot

​	学过JavaWeb的同学就知道，开发一个web应用，从最初开始接触Servlet结合Tomcat，跑出一个HelloWolrld程序，是要经历特别多的步骤；后来就用了框架Struts，再后来是SpringMVC，到了现在的SpringBoot，过一两年又会有其他web框架出现；不知道你们有没经历过框架不断的演进，然后自已开发项自所有的技术也再不断的变化、改造，反正我是都经历过了，哈哈。言归止传，什么是SpringBoot呢，就是一个JavaWeb的开发框架，和SpringMVC类似，对比其他JavaWeb框架的好处，官方说是简化开发，约定大于配置，you can"just run"，能迅速的开发web应用，几行代码开发一个HTTP接口。

​	所有的技术框架的发展似乎都遵循了一条主线规律：从一个复杂应用场景衍生一种规范框架，人们只需要进行各种配置而不需要自已去实现它，这时候强大的配置功能成了优点；发展到一定程度之后，人们根据实际生产应用情况，选取其中实用功能和设计精华，重构出一些轻量级的框架；之后为了提高开友效率，嫌弃原先的各类配置过于林烦，于是开始提倡“约定大于配置”，进而衍生出一些一站式的解决方案。

​	是的这就是Java企业级应用->J2EE->Spring->SpringBoot的过程。

​	随着Spring不断的发展，涉及的领域越来越多，项目整合开发需要配合各种各样的文件，慢慢变得不那么易用简单，违背了最初的理念，甚至人称配置地狱。SpringBoot正是在这样的一个背景下被抽象出来的开发框架，目的为了让大家更容易的使用 Spring、更容易的集成各种常用的中间件、开源软件；

​	SpringBoot基于Spring开发，SpringBoot本身并不提供Spring框架的核心特性以及扩用功能，只是用于快速、敏捷地开发新一代基于 Spring框架的应用程序。也就是说，它并**不是用来替Spring 的解决方案，而是和 Spring 框架紧密结合用于提升 Spring 开发者体验的工具**。SpringBoot以约定大于配置的核心思想，默认帮我们进行了很多设置，多数SpringBoot应用只需要很少的Spring配置。同时它集成了大量常用的第三方库配置（例如 Redis、MongoDB、Jpa、RabbitMQ、Quartz等等），SpringBoot应用中这些第三方库几乎可以零配置的开箱即用

​	简单来说就是SpringBoot其实不是什么新的框架，它默认配置了很多框架的使用方式，就像maven整合了所有的iar包，SpringBoot整合了所有的框架。

​	SpringBoot出生名门，从一开始就站在一个比较高的起点，又经过这几年的发展，生态足够完善，SpringBoot已经当之无愧成为Java领域最热门的技术。

---

##### SpringBoot的主要优点

* 为所有的Spring开发者更快的入门
* 开箱即用，提供各种默认配置来简化项目配置
* 内嵌式容器简化Web项目
* 没有冗余代码和XML配置的要求





#### 微服务

---

##### 什么是微服务

​	微服务是一种架构风格，它要求我们在开发一个应用的时候，这个应用必须构建成一系列小服务的组合；可以通过http的方式进行互通。要说微服务架构，先得说说过去我们的单体应用架构。

---

##### 单体应用架构

​	所谓单体应用架构（all in none）是指，我们门将一入应用的中的所有应用服务者都封装在一入应用中。

​	无论是ERP、CRM或是其他什么系统，你都把数据库访问，Web访问，等等各个功能放到一个War包内。

* 这样做的好处是，易于开发和测试；也十分方便部署；当需要扩展时，只需要将war复制多份，然后放到多个服务器上，再做个负载均衡就可以了。

* 单体应用架构的缺点是，哪怕我要修改一个非常小的地方，我都需要停掉整个服务，重新打包、部署这个应用war包。特别是对于一个大型应用，我们不可能吧所有内容都放在一个应用里面，我们如何维护、如何分工合作都是问题。

---

##### 微服务架构

​	all in one的架构方式，我们把所有的功能单元放在一个应用里面。然后我们把整个应用部暑到服务器上。如果负载能力不行，我们将整个应用进行水平复制，进行扩展，然后在负载均衡。

​	所谓微服务架构，就是打破之前allinone的架构方式，把每个功能元素独立出来。把独立出来的功能元素的动态组合，需要的功能元素才去拿来组合，需要多一些时可以整合多个功能元素。所以微服务架构是对功能元索进行复制，而没有对整个应用进行复制。

​	这样做的好处是：

1. 节省了调用资源
2. 每个功能元素的服务都是一个可替换的、可独立升级的软件代码

<img src="./跟随狂神学Java-38.assets/image-20230806165852329.png" alt="image-20230806165852329" style="zoom: 33%;" />

---

##### 如何构建微服务

​	一个大型系统的微服务架构，就像一个复杂交织的神经网络，每一个神经元就是一个功能元素，它们各自完成自己的功能，然后通过htp相互请求调用。比如一个电商系统，查缓存、连数据库、浏览页面、结账、支付等服务都是一个个独立的功能服务，都被微化了，它们作为一个个微服务共同构建了一个庞大的系统。如果修改其中的一个功能，只需要更新升级其中一个功能服务单元即可。

​	但是这种庞大的系统架构给部署和运维带来很大的难度。于是，spring为我们带来了构建大型分布
式微服务的全套、全程产品：

* 构建一个个功能独立的微服务应用单元，可以使用SpringBoot，可以帮我们快速构建一个应用;
* 大型分布式网络服务的调用，这部分由SpringBoot来完成，实现分布式；
* 在分布式中间，进行流式数据计算、批处理，我们有SpringCloud, data flow。
* Spring为我们想清楚了整个从开始构建应用到大型分布式应用全流程方案





<img src="./跟随狂神学Java-38.assets/image-20230806171440211.png" alt="image-20230806171440211" style="zoom: 50%;" />









#### 第一个SpringBoot程序

---

##### 创建项目

你可以在官网[Spring Initializr](https://start.spring.io/)下载配置，解压后导入Idea。或者直接在Idea中新建Spring 项目

<img src="./跟随狂神学Java-38.assets/image-20230806200045847.png" alt="image-20230806200045847" style="zoom:50%;" />

<img src="./跟随狂神学Java-38.assets/image-20230806200004915.png" alt="image-20230806200004915" style="zoom:50%;" />



---

##### 第一行代码

1. 勾选模板创建SpringBoot项目，将会自动生成大致如下的目录结构：

   <img src="./跟随狂神学Java-38.assets/image-20230806200205354.png" alt="image-20230806200205354" style="zoom:50%;" />

2. 直接右上角运行，你可以在`localhost:8080`查看运行效果

   <img src="./跟随狂神学Java-38.assets/image-20230806200302521.png" alt="image-20230806200302521" style="zoom:50%;" />

3. 这里我们新建一个controller作为测试（HelloController.java）

   ~~~java
   package com.joker_yue.springbootlearn.controller;
   
   import org.springframework.web.bind.annotation.RequestMapping;
   import org.springframework.web.bind.annotation.RestController;
   
   /**
    *
    * @author Joker
    * @date 2023/8/6 19:49
    * @version 1.0
    */
   
   @RestController
   public class HelloController {
       // 接口就是http://localhost:8080/hello
       @RequestMapping("/hello")
       public String hello(){
           // 调用业务，接收前端参数
           return "hello,world";
       }
   }
   
   ~~~

   <img src="./跟随狂神学Java-38.assets/image-20230806200430466.png" alt="image-20230806200430466" style="zoom:50%;" />

---

##### 项目打包

我们可以将这个项目打包成一个jar包，以方便我们日后部署到其他地方

1. 点击Maven-生命周期-package，将会自动开始打包

   <img src="./跟随狂神学Java-38.assets/image-20230806200606621.png" alt="image-20230806200606621" style="zoom:50%;" />

2. 打包完成后将会输出相应信息

   <img src="./跟随狂神学Java-38.assets/image-20230806200650642.png" alt="image-20230806200650642" style="zoom:50%;" />

3. 如果报错没有主清单,在pom文件中新增

   ```xml
   <build>
       <plugins>
           <plugin>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-maven-plugin</artifactId>
               <executions>
                   <execution>
                       <goals>
                           <goal>repackage</goal>
                       </goals>
                   </execution>
               </executions>
               <configuration>
                   <mainClass>类路径，比如com.joker_yue.SpringBootLearn</mainClass>
                   <excludes>
                       <exclude>
                           <groupId>junit</groupId>
                           <artifactId>junit</artifactId>
                       </exclude>
                       <exclude>
                           <groupId>org.springframework.boot</groupId>
                           <artifactId>spring-boot-starter-test</artifactId>
                       </exclude>
                   </excludes>
               </configuration>
           </plugin>
       </plugins>
   </build>
   ```

4. 在target下会生成对应jar包

   ![image-20230806200727133](./跟随狂神学Java-38.assets/image-20230806200727133.png)

5. 使用`java -jar`命令运行jar包

   <img src="./跟随狂神学Java-38.assets/image-20230806200905781.png" alt="image-20230806200905781" style="zoom:50%;" />





---

##### 项目配置文件

1. 修改端口号

   你可以在application.properties中输入`server.port=8081`来讲端口号改成8081

2. 自定义banner

   你可以在application.properties同级目录下创建banner.txt，以自定义banner：[Spring Boot banner在线生成工具](https://www.bootschool.net/ascii)，只需要在banner.txt中放入你的banner就行

    <img src="./跟随狂神学Java-38.assets/image-20230806202652335.png" alt="image-20230806202652335" style="zoom: 80%;" />

   





#### 原理初探

---

##### 自动配置

1. pom.xml

   * 在pom.xml中，有一个父依赖，如下：

     ~~~xml
     <!-- 有一个父项目 -->
     <parent>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-parent</artifactId>
         <version>2.7.14</version>
         <relativePath/> <!-- lookup parent from repository -->
     </parent>
     ~~~

     你可以通过点击`artifactId`中来找到上一层父依赖

     最顶层的依赖为`spring-boot-dependencies-版本号.pom`，在那里，你可以看到所有的依赖项。这就是你不用手动去导入大量jar包的真相

   * 我们在写或者引入一些SpringBoot依赖的时候，不需要指定版本，因为有这些版本仓库

2. 启动器

   * 说白了就是SpringBoot的启动场景

     ~~~xml
     <!-- starter：启动器 -->
     <dependency>
         <!-- web依赖，tomcat，dispatcherServlet，serlvet等等 -->
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-web</artifactId>
     </dependency>
     ~~~

   * 比如`spring-boot-starter-web`，他就会自动帮我们导入web环境的所有依赖

   * SpringBoot会将所有的功能场景都变成一个个的启动器

   * 我们要使用什么功能，就需要找到对应的启动器就行了



---

##### 主程序

1. `@SpringBootApplication`

   ```java
   package com.joker_yue.springbootlearn;
   
   import org.springframework.boot.SpringApplication;
   import org.springframework.boot.autoconfigure.SpringBootApplication;
   
   // SpringBoot程序入口，不能动也不能删除
   // 本身就是Spring的一个组件
   
   // @SpringBootApplication 标注这个类是一个SpringBoot的应用
   
   @SpringBootApplication
   public class SpringBootLearnApplication {
   
       public static void main(String[] args) {
           // 讲SpringBoot应用启动
           SpringApplication.run(SpringBootLearnApplication.class, args);
       }
   
   }
   ```

2. 注解

     ~~~java
     @SpringBootConfiguration		SpringBoot的配置
         @Configuration				Spring配置类
         @Component					说明这是一个Spring的组件
         
     @EnableAutoConfiguration		自动配置
         @AutoConfigurationPackage	自动配置包
         	@Import(AutoConfigurationPackages.Registrar.class)	自动配置-包注册
         @Import(AutoConfigurationImportSelector.class)		自动配置导入选择
         
     ~~~

   * 自动配置的包
   
     <img src="./跟随狂神学Java-38.assets/image-20230807125855503.png" alt="image-20230807125855503" style="zoom:50%;" />

---

##### 原理图

![@SpringBootApplication](./跟随狂神学Java-38.assets/@SpringBootApplication.png)

---

##### 自动装配结论

SpringBoot的所有自动配置都在启动类中被扫描并加载，位置在`spring.factories`中。

但是这些配置不一定生效，要判断条件是否成立，只要导入了对应的start，就有对应的启动器了。有了启动器，我们自动装配就会生效，然后就配置成功了



1. SpringBoot在启动的时候，从类路径下`/META-INFO/spring.factories`中获取指定的值
2. 将这些自动配置的类导入容器，自动配置类就会生效，帮我们进行自动配置
3. 以前我们需要手动配置的东西，现在SpringBoot帮我们做了
4. 整个JavaEE，解决方案和自动配置，都在`spring-boot-autoconfigure-2.7.14.jar`这个包下
5. 他会将所有需要导入的组件，以类名的方式返回，这些组件就会被添加到容器
6. 容器中也会存在非常多的`xxxAutoConfiguration`的文件(@Bean)，就是这些类给容器中导入了这个场景需要的所有组件
7. 有了自动配置类，免去了我们手动编写配置文件的工作！

一旦这个配置类生效，这个配置类就会给容器中添加各种组件，这些组件的属性从对应的properties类中获取的，这些类里面的每一个属性又是和配置文件绑定的



1. SpringBoot启动时会加载大量的自动配置类
2. 我们看我们需要的功能有没有在SpringBoot默认写好的自动配置类中
3. 我们再来看这个自动配置类中到底配置了哪些组件（只要我们要用的组件存在其中，我们就不需要再手动配置了）
4. 给容器中自动配置类添加组件的时候，会从properties类中获取某些属性，我们只需要在配置文件中指定这些属性的值即可

~~~yaml
xxxAutoConfiguration，自动装配类，给容器中添加组件
xxx.properties,封装配置文件中相关属性
~~~



---

##### SpringApplication、Run

还记得程序的主入口吗？

~~~java
package com.joker_yue.springbootlearn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// SpringBoot程序入口，不能动也不能删除
// 本身就是Spring的一个组件

// @SpringBootApplication 标注这个类是一个SpringBoot的应用

@SpringBootApplication
public class SpringBootLearnApplication {

    public static void main(String[] args) {
        // 将SpringBoot应用启动
        // SpringApplication类
        // run方法：开启服务
        // 该方法返回一个ConfigurableApplicationContext对象
        // 参数一：应用入口的类   参数类：命令行参数
        SpringApplication.run(SpringBootLearnApplication.class, args);
    }

}
~~~

* SpringApplication.run方法分析

  * SpringApplication的实例化
  * run方法的执行

* **SpringApplication**

  这个类主要做了以下四件事情

  1. 推断应用的类型是普通的项目还是web项目
  2. 查找并加载所有可用初始化器，设置到initializers属性中
  3. 找出所有的应用程序监听器，设置到listener属性中
  4. 推断并设置main方法的定义类，找到运行的主类

  查看构造器

![37eec9bfafe420d064625e7a013399b8](./跟随狂神学Java-38.assets/37eec9bfafe420d064625e7a013399b8.jpg)







#### SpringBoot配置

---

##### 文件说明

官方的配置文件为`application.properties`或`application.yaml`

* properties

  * 语法结构：`key=value`

* yaml

  * 语法结构：`key: value`

  * 注意：中间有个空格

  * 你甚至可以用它来写对象，它真的很像json

    ~~~yaml
    # 对象
    student:
    	name: joker
    	age: 19
    
    # 行内对象
    student: {name: joker, age: 19}
    ~~~

  * 你还可以将它写数组

    ~~~yaml
    # 数组
    pets: 
     - cat
     - dog
     
     
    # 行内数组
    pets: [cat, dog, pig]
    ~~~



---

##### yaml给对象赋值

* 传统的赋值方式

  * Dog.java

    ~~~java
    package com.joker_yue.springbootlearn.pojo;
    
    import org.springframework.beans.factory.annotation.Value;
    import org.springframework.stereotype.Component;
    
    /**
     * @author Joker
     * @version 1.0
     * @date 2023/8/7 14:34
     */
    
    @Component
    public class Dog {
        @Value("旺财")
        private String name;
        @Value("2")
        private Integer age;
    
        public Dog() {
        }
    
        public Dog(String name, Integer age) {
            this.name = name;
            this.age = age;
        }
    
        public String getName() {
            return name;
        }
    
        public void setName(String name) {
            this.name = name;
        }
    
        public Integer getAge() {
            return age;
        }
    
        public void setAge(Integer age) {
            this.age = age;
        }
    
        @Override
        public String toString() {
            return "Dog{" +
                    "name='" + name + '\'' +
                    ", age=" + age +
                    '}';
        }
    }
    ~~~

  * 测试

    ~~~java
    package com.joker_yue.springbootlearn;
    
    import com.joker_yue.springbootlearn.pojo.Dog;
    import org.junit.jupiter.api.Test;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.boot.test.context.SpringBootTest;
    
    // 单元测试
    @SpringBootTest
    class SpringBootLearnApplicationTests {
    
    
        @Autowired
        private Dog dog;
    
    
        @Test
        void contextLoads() {
            System.out.println(dog);
        }
    }
    ~~~

* 现在我们使用application.yaml来进行装配

  * application.yaml

    ~~~yaml
    person:
        name: Joker
        age: 18
        happy: true
        birth: 2023/08/07
        maps: {k1: v1, k2: v2}
        lists:
          - code
          - music
          - girl
        dog:
          name: 旺财
          age: 3
    ~~~

  * person.java

    `@ConfigurationProperties`注解的作用是将配置文件(`application.yaml`)中的属性值绑定到Java类的对应属性上。在Spring Boot中，我们可以使用这个注解来方便地获取配置文件中的属性值，并将其映射到Java类中的属性上。

    ~~~java
    package com.joker_yue.springbootlearn.pojo;
    
    import org.springframework.boot.context.properties.ConfigurationProperties;
    import org.springframework.stereotype.Component;
    
    import java.util.Date;
    import java.util.List;
    import java.util.Map;
    
    /**
     * @author Joker
     * @version 1.0
     * @date 2023/8/7 14:37
     */
    @Component
    @ConfigurationProperties(prefix = "person") //
    public class Person {
        private String name;
        private Integer age;
        private boolean happy;
        private Date birth;
        private Map<String, Object> maps;
        private List<Object> lists;
        private Dog dog;
    
        public Person() {
        }
    
        public Person(String name, Integer age, boolean happy, Date birth, Map<String, Object> maps, List<Object> lists, Dog dog) {
            this.name = name;
            this.age = age;
            this.happy = happy;
            this.birth = birth;
            this.maps = maps;
            this.lists = lists;
            this.dog = dog;
        }
    
        public String getName() {
            return name;
        }
    
        public void setName(String name) {
            this.name = name;
        }
    
        public Integer getAge() {
            return age;
        }
    
        public void setAge(Integer age) {
            this.age = age;
        }
    
        public boolean isHappy() {
            return happy;
        }
    
        public void setHappy(boolean happy) {
            this.happy = happy;
        }
    
        public Date getBirth() {
            return birth;
        }
    
        public void setBirth(Date birth) {
            this.birth = birth;
        }
    
        public Map<String, Object> getMaps() {
            return maps;
        }
    
        public void setMaps(Map<String, Object> maps) {
            this.maps = maps;
        }
    
        public List<Object> getLists() {
            return lists;
        }
    
        public void setLists(List<Object> lists) {
            this.lists = lists;
        }
    
        public Dog getDog() {
            return dog;
        }
    
        public void setDog(Dog dog) {
            this.dog = dog;
        }
    
        @Override
        public String toString() {
            return "Person{" +
                    "name='" + name + '\'' +
                    ", age=" + age +
                    ", happy=" + happy +
                    ", birth=" + birth +
                    ", maps=" + maps +
                    ", lists=" + lists +
                    ", dog=" + dog +
                    '}';
        }
    }
    ~~~

    

  * 运行结果<img src="./跟随狂神学Java-38.assets/image-20230807150311239.png" alt="image-20230807150311239" style="zoom:50%;" />



当然，使用peoperties赋值也是可以的，但是会比较复杂

* person.properties

  ~~~properties
  name=joker_yue
  ~~~

* person.java

  ~~~java
  @PropertySource(value = "classpath:person.properties")
  @Component //注册bean
  public class Person {
  
      @Value("${name}")
      private String name;
  
      ......  
  }
  ~~~

* 测试

  <img src="./跟随狂神学Java-38.assets/image-20230807151604549.png" alt="image-20230807151604549" style="zoom:50%;" />



 在yaml配置文件中还可以编写占位符生成随机数

  ~~~yaml
  person:
      name: Joker${random.uuid}   # 随机uuid
      age: ${random.int}        # 随机int
      happy: true
      birth: 2023/08/07
      maps: {k1: v1, k2: v2}
      hello: world
      lists:
        - code
        - music
        - girl
      dog:
        name: ${person.hello:hello}旺财  # 占位符
        age: 3
  
  ~~~

  

* 运行结果<img src="./跟随狂神学Java-38.assets/image-20230807152715582.png" alt="image-20230807152715582" style="zoom:50%;" />

---

##### 松散绑定

例如Person类中有个lastName，yaml文件中的是lastname、last-name或者last_name，这些都能绑定到，就这么简单

---

##### JSR303数据校验

你需要依赖：

~~~xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
~~~



举个例子，有些数据校验比如说手机号、邮箱等，格式不对将无法通过校验。在SpringBoot中我们可以使用`
@Validated`注解来进行数据校验，像这样

~~~java
@Component
@ConfigurationProperties(prefix = "person")
@Validated
public class Person {

    @Email(message = "邮箱格式不正确")
    private String name;
    ...
}
~~~



常见参数

~~~java
@NotNull(message="名字不能为空")
private String userName;
@Max(value=120,message="年龄最大不能查过120")
private int age;
@Email(message="邮箱格式错误")
private String email;

空检查
@Null       验证对象是否为null
@NotNull    验证对象是否不为null, 无法查检长度为0的字符串
@NotBlank   检查约束字符串是不是Null还有被Trim的长度是否大于0,只对字符串,且会去掉前后空格.
@NotEmpty   检查约束元素是否为NULL或者是EMPTY.
    
Booelan检查
@AssertTrue     验证 Boolean 对象是否为 true  
@AssertFalse    验证 Boolean 对象是否为 false  
    
长度检查
@Size(min=, max=) 验证对象（Array,Collection,Map,String）长度是否在给定的范围之内  
@Length(min=, max=) string is between min and max included.

日期检查
@Past       验证 Date 和 Calendar 对象是否在当前时间之前  
@Future     验证 Date 和 Calendar 对象是否在当前时间之后  
@Pattern    验证 String 对象是否符合正则表达式的规则	正则表达式

.......等等
除此以外，我们还可以自定义一些数据校验规则
~~~



---

##### 多环境配置以及配置文件位置

* 配置文件位置

  你可以将`application.yaml`配置文件放在以下位置（按照读取顺序优先级排列）

  * `file:./config/`

    <img src="./跟随狂神学Java-38.assets/image-20230807160433461.png" alt="image-20230807160433461" style="zoom: 67%;" />

  * `file:./`

    <img src="./跟随狂神学Java-38.assets/image-20230807160504760.png" alt="image-20230807160504760" style="zoom:67%;" />

  * `classpath:/config/`

    <img src="./跟随狂神学Java-38.assets/image-20230807160607303.png" alt="image-20230807160607303" style="zoom:67%;" />

  * `classpath:/`

    <img src="./跟随狂神学Java-38.assets/image-20230807160632260.png" alt="image-20230807160632260" style="zoom:67%;" />

  **==同个路径下，yml>yaml>properties，可以在spring-boot-starter-partent里找到。==**

* 多环境配置

  * 你可以将文件以`application-[filename].yaml`的方式命名，这样不同的配置文件将会对应不同的环境，就像这样<img src="./跟随狂神学Java-38.assets/image-20230807162704358.png" alt="image-20230807162704358"  />

  * 你也可以通过yaml来一次性配置多个环境

    ~~~yaml
    # SpringBoot 的多环境配置，可以选择激活哪一个配置
    server:
      port: 8081
    spring:
      profiles:
        active: dev
    ---
    server:
      port: 8082
    spring:
      profiles: dev
    ---
    server:
      port: 8083
    spring:
      profiles: test
    ~~~

    

    ![image-20230807163130909](./跟随狂神学Java-38.assets/image-20230807163130909.png)



参考：

* [SpringBoot配置文件优先级（全）_方猿的博客-CSDN博客](https://blog.csdn.net/renshengrushui/article/details/118762841)
* [Spring Boot 配置文件的加载优先级总结-腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1695094)





#### SpringBoot Web开发

---

##### 静态资源导入

1. **webjars**

   你可以在maven中导入对应的依赖来获取对应的静态资源

   ![image-20230807202155608](./跟随狂神学Java-38.assets/image-20230807202155608.png)

   访问方式如下

   <img src="./跟随狂神学Java-38.assets/image-20230807202655247.png" alt="image-20230807202655247"  />

2. **固定位置支持**

   * SpringBoot支持以下位置：(按照优先级排序)

     1. `classpath:/META-INF/resources/`
     2. ``classpath:/resources/``
     3. `classpath:/static/`
     4. `classpath:/public/`

     你在`localhost/8080`下输入`xxx.js`，只要上述4个位置中有，就能访问得到

   

3. **自定义位置**

   * 不建议使用，因为你需要将上述4个地址手动加入配置，否则4个地址将会失效

     ~~~yaml
     spring:
       mvc:
       	# URL响应地址（Springboot默认为/**)
         static-path-pattern: /SystemData/**
       web:
         resources:
           # 静态文件地址，保留官方内容后，进行追加
           static-locations: classpath:/static,classpath:/public,classpath:/resources,classpath:/META-INF/resources,file:SystemData
     ~~~

     参考：[Springboot多种方法处理静态资源：设置并访问静态资源目录_springboot 添加静态目录_Mintimate的博客-CSDN博客](https://blog.csdn.net/weixin_43890033/article/details/120928070)

   

---

##### 首页定制

默认目录：

* 你可以将首页放在resources目录下或者其下任意一个文件夹中

  <img src="./跟随狂神学Java-38.assets/image-20230807205752995.png" alt="image-20230807205752995" style="zoom:50%;" />

Controller跳转

* 在templates目录下的所有页面，只能通过Controller来跳转，需要模板引擎Thymeleaf的支持，见下一章



修改默认图标

* 你可以在`application.yaml`中写入

  ~~~yaml
  # 关闭默认图标
  spring:
    mvc:
      favicon:
        enabled: false
  ~~~

* 然后再将图标`favicon.ico`放入`public`文件夹中即可





---

##### 模板引擎-Thymeleaf

你需要导入如下依赖

~~~xml
<!-- Thymeleaf -->
<dependency>
    <groupId>org.thymeleaf</groupId>
    <artifactId>thymeleaf-spring5</artifactId>
</dependency>
<dependency>
    <groupId>org.thymeleaf.extras</groupId>
    <artifactId>thymeleaf-extras-java8time</artifactId>
</dependency>
~~~

* 你只需要使用Thymeleaf，将html放在templetes下，写好对应Controller就行

  * IndexController.java

    ~~~java
    @Controller
    public class IndexController {
        @RequestMapping("/index")
        public String index(Model model){
            model.addAttribute("msg","Hello Spring Boot!");
            return "test";
        }
    }
    ~~~

  * test.html

    ~~~html
    <!DOCTYPE html>
        <!-- 导入 xmlns:th="http://www.thymeleaf.org" 约束 -->
    <html lang="en" xmlns:th="http://www.thymeleaf.org">
    <head>
        <meta charset="UTF-8" >
        <title>Title</title>
    </head>
    <body>
    <!--所有的html元素都可以被thymeleaf接管。th:元素名-->
    <h1 th:text="${msg}"></h1>
    </body>
    </html>
    ~~~



---

##### Thymeleaf语法

- 简单表达式：
  - 变量表达式：`${...}`
  - 选择变量表达式：`*{...}`
  - 消息表达式：`#{...}`
  - 链接网址表达式：`@{...}`
  - 片段表达式：`~{...}`
- 文字
  - 文本文字：、,...`'one text'``'Another one!'`
  - 数字文字：、、、,...`0``34``3.0``12.3`
  - 布尔文字： ，`true``false`
  - 空文本：`null`
  - 文字标记：、、,...`one``sometext``main`
- 文本操作：
  - 字符串连接：`+`
  - 文字替换：`|The name is ${name}|`
- 算术运算：
  - 二元运算符：、、、、`+``-``*``/``%`
  - 减号（一元运算符）：`-`
- 布尔运算：
  - 二元运算符： ，`and``or`
  - 布尔取反（一元运算符）： ，`!``not`
- 比较和平等：
  - 比较器： ， ， ， （， ， ， ，`>``<``>=``<=``gt``lt``ge``le`)
  - 相等运算符：， （，`==``!=``eq``ne`)
- 条件运算符：
  - 如果-那么：`(if) ? (then)`
  - 如果-那么-否则：`(if) ? (then) : (else)`
  - 违约：`(value) ?: (defaultvalue)`
- 特殊令牌：
  - 非运营：`_`



| 次序 | 特征                 | 属性                                       |
| :--- | :------------------- | :----------------------------------------- |
| 1    | 片段包含             | `th:insert` `th:replace`                   |
| 2    | 片段迭代             | `th:each`                                  |
| 3    | 条件评估             | `th:if` `th:unless` `th:switch` `th:case`  |
| 4    | 局部变量定义         | `th:object` `th:with`                      |
| 5    | 常规属性修改         | `th:attr` `th:attrprepend` `th:attrappend` |
| 6    | 特定属性修改         | `th:value` `th:href` `th:src` `...`        |
| 7    | 文本（标签正文修改） | `th:text` `th:utext`                       |
| 8    | 片段规格             | `th:fragment`                              |
| 9    | 片段去除             | `th:remove`                                |

参考：[Tutorial: Using Thymeleaf](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html)



---

##### MVC配置原理

1. 扩展MVC配置（了解即可）

   * 你可以在类上加入@Configuration，并将此类实现WebMvcConfiguration接口以扩展MVC配置

   * 可重写的方法如下图

     <img src="./跟随狂神学Java-38.assets/image-20230808135627585.png" alt="image-20230808135627585" style="zoom:50%;" />

   * 自定义视图解析器

     你可以`implements ViewResolver`，然后重写`resolveViewName`方法，再注册bean就可以装配进SpringBoot

     ~~~java
     @Bean
     public ViewResolver myViewResolver() {
         return new MyViewResolver();
     }
     ~~~

2. 扩展SpringMVC 

   * 视图跳转

     ~~~java
     package com.joker_yue.springbootlearn.config;
     
     import org.springframework.context.annotation.Configuration;
     import org.springframework.web.servlet.config.annotation.EnableWebMvc;
     import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
     import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/8/8 13:52
      */
     // 如果我们要扩展MVC，官方建议我们这样使用！
     @Configuration
     @EnableWebMvc // 这玩意导入了一个类，DelegatingWebMvcConfiguration:这个类会从容器中获取所有的webmvcconfig。如果你加了这个注解，你需要全部重写SpringMVC的配置
     public class MyMVCConfig implements WebMvcConfigurer {
     
         // 视图跳转
         @Override
         public void addViewControllers(ViewControllerRegistry registry) {
             registry.addViewController("/joker").setViewName("test");
         }
     }
     ~~~

   * 在SpringBoot中，有非常多的xxxConfiguration帮助我们进行扩展配置，只要看见了这个东西，我们就需要注意了！





#### 员工管理系统

---

##### 目录结构

将资源文件放入后，目录结构如图：

<img src="./跟随狂神学Java-38.assets/image-20230808170200882.png" alt="image-20230808170200882" style="zoom: 33%;" />



---

##### 首页定制

1. 视图跳转

   * Controller实现视图解析：Index.java

     ~~~java
     package com.joker_yue.controller;
     
     import org.springframework.stereotype.Controller;
     import org.springframework.web.bind.annotation.RequestMapping;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/8/8 16:42
      */
     @Controller
     public class IndexController {
         @RequestMapping({"/", "/index.html"})
         public String index() {
             return "index";
         }
     }
     ~~~

   * 自定义MVC实现视图跳转：MyMvcController.java

     ~~~java
     package com.joker_yue.config;
     
     import org.springframework.context.annotation.Configuration;
     import org.springframework.web.servlet.config.annotation.EnableWebMvc;
     import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
     import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/8/8 16:45
      */
     // 如果我们要扩展MVC，官方建议我们这样使用！
     @Configuration
     public class MyMvcController implements WebMvcConfigurer {
     
         // 视图跳转
         @Override
         public void addViewControllers(ViewControllerRegistry registry) {
             registry.addViewController("/").setViewName("index");
             registry.addViewController("/index.html").setViewName("index");
         }
     }
     ~~~

2. 修改资源匹配地址

   首页的所有静态资源都需要使用Thymeleaf接管

   你可以将资源目录上加上`@{}`，就像这样

   ~~~html
   @{/css/bootstrap.min.css}
   ~~~

   这样的话，所有默认位置的地址都能匹配到

---

##### 页面国际化

* 通用配置

  1. 在`resources`下新建文件夹`i18n`

  2. 在`i18n`下新建几个文件，如下：

     <img src="./跟随狂神学Java-38.assets/image-20230808173303867.png" alt="image-20230808173303867" style="zoom:67%;" />

  3. 你可以点击下方【资源包】来一次性配置多个properties文件，需要 Resource Bundle Editor 插件

     ![image-20230808173411515](./跟随狂神学Java-38.assets/image-20230808173411515.png)

  4. 编辑器效果如图

     <img src="./跟随狂神学Java-38.assets/image-20230808173437689.png" alt="image-20230808173437689" style="zoom:50%;" />

  5. 写好后如图

     <img src="./跟随狂神学Java-38.assets/image-20230808174111405.png" alt="image-20230808174111405" style="zoom:50%;" />

  6. 在配置文件中定义国际化文件的位置

     ~~~yaml
     # 国际化配置
     spring:
       messages:
         basename: i18n.login
     ~~~

  7. 在index.html中的切换语言按钮上定义

     ~~~html
     <a class="btn btn-sm" th:href="@{/index.html(l='zh_CH')}">中文</a>
     <a class="btn btn-sm" th:href="@{/index.html(l='en_US')}">English</a>
     ~~~

* 自定义

  1. 说到底，国际化的实现还是通过解析前端发送过来的参数做到的。所以我们可以自定义解析规则。

  2. 自定义组件：MyLocaleResolver.java

     ~~~java
     package com.joker_yue.config;
     
     import org.springframework.util.StringUtils;
     import org.springframework.web.servlet.LocaleResolver;
     
     import javax.servlet.http.HttpServletRequest;
     import javax.servlet.http.HttpServletResponse;
     import java.util.Locale;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/8/8 19:45
      */
     public class MyLocaleResolver implements LocaleResolver {
         // 解析请求
         @Override
         public Locale resolveLocale(HttpServletRequest request) {
             // 获取请求中的语言参数
             String language = request.getParameter("l");
             System.out.println("Debug==>"+language);
             Locale locale = Locale.getDefault();    // 如果没有就使用默认的
             // 如果请求的链接携带了国际化的参数
             if(!StringUtils.isEmpty(language)){
                 // 比如传过来的是zh_CN
                 String[] split = language.split("_");   // 将会分解为ch和CN
                 // 国家 地区
                 locale = new Locale(split[0],split[1]);
             }
             return locale;
         }
     
         @Override
         public void setLocale(HttpServletRequest request, HttpServletResponse response, Locale locale) {
     
         }
     }
     ~~~

  3. 然后再去自定义的MVC中配置下就可以了，配置到Spring容器中。

     ~~~java
     // 自定义国际化组件
     @Bean
     public LocaleResolver localeResolver(){
         return new MyLocaleResolver();
     }
     ~~~

     

----

##### 判断用户登录

* 编写业务：LoginController.java

  ~~~java
  package com.joker_yue.controller;
  
  import org.springframework.stereotype.Controller;
  import org.springframework.ui.Model;
  import org.springframework.util.StringUtils;
  import org.springframework.web.bind.annotation.RequestMapping;
  import org.springframework.web.bind.annotation.RequestParam;
  import org.springframework.web.bind.annotation.ResponseBody;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/8/8 20:04
   */
  @Controller
  public class LoginController {
      @RequestMapping("/user/login")
      public String login(@RequestParam("username") String username, @RequestParam("password") String password, Model model) {
          // 具体的业务
          if (!StringUtils.isEmpty(username) && "123456".equals(password)) {
              // 登录成功
              return "dashboard";
          } else {
              // 告诉用户登陆失败
              model.addAttribute("msg", "用户名或密码错误");
              return "index";
          }
      }
  }
  ~~~

* 判断后端返回消息是否为空

  ~~~html
  <!--  登录消息回显，判断返回消息是否为空，为空，不显示代码  -->
  <p style="color: red" th:text="${msg}" th:if="${!#strings.isEmpty(msg)}"></p>
  ~~~

* 由于地址栏不好看我们得改下

  <img src="./跟随狂神学Java-38.assets/image-20230808202306980.png" alt="image-20230808202306980" style="zoom:50%;" />

  1. LoginController.java：重定向路径

     ~~~java
     package com.joker_yue.controller;
     
     import org.springframework.stereotype.Controller;
     import org.springframework.ui.Model;
     import org.springframework.util.StringUtils;
     import org.springframework.web.bind.annotation.RequestMapping;
     import org.springframework.web.bind.annotation.RequestParam;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/8/8 20:04
      */
     @Controller
     public class LoginController {
         @RequestMapping("/user/login")
         public String login(@RequestParam("username") String username, @RequestParam("password") String password, Model model) {
             // 具体的业务
             if (!StringUtils.isEmpty(username) && "123456".equals(password)) {
                 // 重定向路径
                 return "redirect:/main.html";
             } else {
                 // 告诉用户登陆失败
                 model.addAttribute("msg", "用户名或密码错误");
                 return "index";
             }
         }
     }
     ~~~

  2. MyMvcController：修改视图解析器

     ~~~java
     package com.joker_yue.config;
     
     import org.springframework.context.annotation.Bean;
     import org.springframework.context.annotation.Configuration;
     import org.springframework.web.servlet.LocaleResolver;
     import org.springframework.web.servlet.config.annotation.EnableWebMvc;
     import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
     import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/8/8 16:45
      */
     // 如果我们要扩展MVC，官方建议我们这样使用！
     @Configuration
     public class MyMvcController implements WebMvcConfigurer {
     
         // 视图跳转
         @Override
         public void addViewControllers(ViewControllerRegistry registry) {
             registry.addViewController("/").setViewName("index");
             registry.addViewController("/index.html").setViewName("index");
             // 如果是main，映射到dashboard
             registry.addViewController("/main.html").setViewName("dashboard");
         }
     
         // 自定义国际化组件
         @Bean
         public LocaleResolver localeResolver(){
             return new MyLocaleResolver();
         }
     }
     ~~~

  3. 现在地址栏好看了

     ![image-20230808202737780](./跟随狂神学Java-38.assets/image-20230808202737780.png)



---

##### 用户权限拦截

* 自定义过滤器：LoginHandlerInterceptor.java

  ~~~java
  package com.joker_yue.config;
  
  import org.springframework.web.servlet.HandlerInterceptor;
  
  import javax.servlet.http.HttpServletRequest;
  import javax.servlet.http.HttpServletResponse;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/8/8 20:42
   */
  public class LoginHandlerInterceptor implements HandlerInterceptor {
      @Override
      public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
          // 登录成功后，应该有用户的Session
          Object loginUser = request.getSession().getAttribute("loginUser");
          if (loginUser == null) {
              request.setAttribute("msg", "没有权限，请先登录");
              request.getRequestDispatcher("/index.html").forward(request, response);
              return false;
          }
          return true;
      }
  }
  ~~~

* 将过滤器添加到解析器中：MyMvcController.java

  ~~~java
  @Override
  public void addInterceptors(InterceptorRegistry registry) {
      registry.addInterceptor(new LoginHandlerInterceptor())
              .addPathPatterns("/**")
              .excludePathPatterns("/index.html", "/", "/user/login"
              ,"/css/**", "/js/**", "/img/**");
  }
  ~~~



----

##### 展示员工列表

1. 提取公共页面
   * ` th:fragment="sidebar"`
   * `<div th:insert="~{common/commons::topbar}"></div>`
   * 如果要传递参数，可以直接使用()传参，判断接收即可
2. 列表循环展示



---

##### 添加员工

1. 按钮提交
2. 跳转添加页面
3. 添加员工成功
4. 返回首页



---

##### 404

你只需要在`templates`下建一个`error`文件夹，然后将html放进去就行

<img src="./跟随狂神学Java-38.assets/image-20230810154851243.png" alt="image-20230810154851243" style="zoom:50%;" />



#### 如何快速搭建一个Web应用

---

1. 前端搞定：页面长什么样子，以做数据库设计
2. 设计数据库
3. 前端让它们能够自动运行，独立化工程
4. 数据接口如何对接：JSON，对象 all in one
5. 前后端联调测试！

​	

你需要：

* 一套自己熟悉的后台模板：工作必要。比如X-Admin
* 前端框架：至少自己能够通过前端框架，组合出来一个网站页面
* 让这个网站能够独立运行



#### 整合

---

##### 整合JDBC使用

~~~java
package com.joker_yue.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * @author Joker
 * @version 1.0
 * @date 2023/8/10 17:39
 */
@RestController
public class JDBCController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    // 查询数据库的所有信息
    // 没有实体类，数据库中的东西如何获取？ 可以使用Map
    @GetMapping("/userList")
    public List<Map<String,Object>> userList(){
        String sql = "select * from user";
        List<Map<String, Object>> maps = jdbcTemplate.queryForList(sql);
        return maps;
    }

    @GetMapping("/addUser")
    public String addUser(){
        String sql = "insert into mybatis.user(id,name,pwd) values(6,'ming','123')";
        jdbcTemplate.update(sql);
        return "success";
    }

    @GetMapping("/updateUser/{id}")
    public String updateUser(@PathVariable("id") Integer id){
        String sql = "update mybatis.user set name=?,pwd=? where id="+id;

        Object[] params = new Object[]{"ming",123456};
        jdbcTemplate.update(sql,params);

        return "ok_update";
    }

    @GetMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable("id") Integer id){
        String sql = "delete from mybatis.user where id=?";
        jdbcTemplate.update(sql,id );
        return "ok_delete";
    }
}
~~~





---

##### 整合Druid数据源

* pom.xml

  ~~~xml
  <!-- Druid -->
  <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>druid</artifactId>
      <version>1.2.8</version>
  </dependency>
  
  <!-- log4j -->
  <dependency>
      <groupId>log4j</groupId>
      <artifactId>log4j</artifactId>
      <version>1.2.17</version>
  </dependency>
  ~~~

  

* application.yaml

  ~~~yaml
  # JDBC链接源
  spring:
    datasource:
      url: jdbc:mysql://localhost:3306/mybatis?useSSL=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
      username: root
      password: root
      driver-class-name: com.mysql.cj.jdbc.Driver
      type: com.alibaba.druid.pool.DruidDataSource
  
      #SpringBoot默认是不注入这些的，需要自己绑定
      #druid数据源专有配置
      initialSize: 5
      minIdle: 5
      maxActive: 20
      maxWait: 60000
      timeBetweenEvictionRunsMillis: 60000
      minEvictableIdleTimeMillis: 300000
      validationQuery: SELECT 1 FROM DUAL
      testWhileIdle: true
      testOnBorrow: false
      testOnReturn: false
      poolPreparedStatements: true
  
      #配置监控统计拦截的filters，stat：监控统计、log4j：日志记录、wall：防御sql注入
      #如果允许报错，java.lang.ClassNotFoundException: org.apache.Log4j.Properity
      #则导入log4j 依赖就行
      filters: stat,wall,log4j
      maxPoolPreparedStatementPerConnectionSize: 20
      useGlobalDataSourceStat: true
      connectionoProperties: druid.stat.mergeSql=true;druid.stat.slowSqlMillis=500
  ~~~

* DruidConfig.java

  ~~~java 
  package com.joker_yue.config;
  
  import com.alibaba.druid.pool.DruidDataSource;
  import com.alibaba.druid.support.http.StatViewServlet;
  import org.springframework.boot.context.properties.ConfigurationProperties;
  import org.springframework.boot.web.servlet.ServletRegistrationBean;
  import org.springframework.context.annotation.Bean;
  import org.springframework.context.annotation.Configuration;
  
  import javax.sql.DataSource;
  import java.util.HashMap;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/8/11 13:02
   */
  @Configuration
  public class DruidConfig {
  
      // 绑定Spring数据源
      @ConfigurationProperties(prefix = "spring.datasource")
      @Bean
      public DataSource druidDataSource() {
          return new DruidDataSource();
      }
  
      // 后台监控：相当于web.xml
      // 因为SpringBoot内置了Servlet，没有web.xml，替代方法：ServletRegistrationBean
      @Bean
      public ServletRegistrationBean statViewServlet() {
          ServletRegistrationBean<StatViewServlet> bean = new ServletRegistrationBean<>(new StatViewServlet(), "/druid/*");
          // 后台需要有人登录，账号密码配置
          HashMap<String, String> initParams = new HashMap<>();
  
          // 增加配置：用户名和密码。这两条的key不能乱写，是固定的
          initParams.put("loginUsername", "admin");    // 登录的key是固定的
          initParams.put("loginPassword", "123456");   // 密码的key也是固定的
  
          // 增加配置：允许谁能访问
          initParams.put("allow", "127.0.0.1");    // 为空，所有人都可以访问
  
          // 增加配置：禁止谁能访问
          // initParams.put("deny","244.178.44.111");
  
          bean.setInitParameters(initParams);
  
          return bean;
      }
  }
  
  ~~~

* 你可以访问`http://localhost:8080/druid`来进入监控页面

* 配置过滤器

  ~~~java
  // Filter
  @Bean
  public FilterRegistrationBean webStartFilter(){
      FilterRegistrationBean<Filter> bean = new FilterRegistrationBean<>();
  
      bean.setFilter(new WebStatFilter());
  
      // 可以设置请求
      HashMap<String, String> initParams = new HashMap<>();
      // 这些东西不进行统计
      initParams.put("exclusions", "*.js,*.css,/druid/*");
  
      bean.setInitParameters(initParams);
  
      return bean;
  }
  ~~~

  

  

---

##### 整合Mybatis

* pom.xml：整合包

  ~~~xml
  <!-- mybatis starter -->
  <dependency>
      <groupId>org.mybatis.spring.boot</groupId>
      <artifactId>mybatis-spring-boot-starter</artifactId>
      <version>2.1.3</version>
  </dependency>
  ~~~

* applicatin.properties：配置文件
  ~~~properties
  spring.datasource.username=root
  spring.datasource.password=root
  spring.datasource.url=jdbc:mysql://localhost:3306/mybatis?useUnicode=true&characterEncoding=utf-8&useSSL=true&serverTimezone=UTC
  spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
  
  # 整合Mybatis
      # Mybatis别名
      mybatis.type-aliases-package=com.joker_yue.pojo
      mybatis.mapper-locations=classpath:mapper/*.xml
  
  ~~~

* 导入Mapper，下方两种任选其一

  1. 在Mapper类中使用注解标明本类为Mapper类（Dao层）

     ~~~Java
     package com.joker_yue.mapper;
     
     import com.joker_yue.pojo.User;
     import org.apache.ibatis.annotations.Mapper;
     import org.springframework.stereotype.Repository;
     
     import java.util.List;
     
     @Mapper // 加上此注解，说明本类为一个Mybatis的一个Mapper类:Dao
     @Repository // 将数据访问层（DAO层）的类标识为Spring Bean
     public interface UserMapper {
         List<User> queryUserList();
     
     }
     
     ~~~

  2. 在需要使用Mapper的类中（Service层）

     ~~~java
     package com.joker_yue;
     
     import org.junit.jupiter.api.Test;
     import org.mybatis.spring.annotation.MapperScan;
     import org.springframework.beans.factory.annotation.Autowired;
     import org.springframework.boot.test.context.SpringBootTest;
     
     import javax.sql.DataSource;
     
     @SpringBootTest
     @MapperScan("com.joker_yue.mapper")
     class SpringBootMybatisApplicationTests {
     
         @Autowired
         DataSource dataSource;
     
         @Test
         void contextLoads() {
             System.out.println(dataSource.getClass());
         }
     
     }
     ~~~

* UserMapper.xml

  ~~~xml
  <?xml version="1.0" encoding="UTF-8" ?>
  <!DOCTYPE mapper
          PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
          "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
  <mapper namespace="com.joker_yue.mapper.UserMapper">
  
      <!-- <cache/> -->
  
      <select id="queryUserList" resultType="User">
          select * from user
      </select>
  
      <select id="selectUserById" resultType="User">
          select * from user where id = #{id}
      </select>
  
      <insert id="addUser" parameterType="User">
          insert into user (name, pwd) values (#{name}, #{pwd})
      </insert>
  
      <update id="updateUser" parameterType="User">
          update user set name = #{name}, pwd = #{pwd} where id = #{id}
      </update>
  
      <delete id="deleteUser" parameterType="int">
          delete from user where id = #{id}
      </delete>
  </mapper>
  ~~~

* UserController.java

  ~~~java
  package com.joker_yue.controller;
  
  import com.joker_yue.mapper.UserMapper;
  import com.joker_yue.pojo.User;
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.web.bind.annotation.GetMapping;
  import org.springframework.web.bind.annotation.RestController;
  
  import java.util.List;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/8/11 14:31
   */
  @RestController
  public class UserController {
      @Autowired
      private UserMapper userMapper;
  
      @GetMapping("queryUserList")
      public List<User> queryUserList(){
          List<User> userList = userMapper.queryUserList();
          for (User user : userList) {
              System.out.println(user);
          }
          return userList;
      }
  }
  ~~~

  

---

##### 整合SpringSecurity

​	Spring Security是针对 Spring 项目的安全框架，也是 Spring Boot 底层安全模块默认的技术选型，他可以实现强大的Web安全控制，对于安全控制，我们仅需要引入 spring-boot-starter-security 模块，进行少量的配置，即可实现强大的安全管理！

​	在web开发中，安全第一位。现在我们会的也就是过滤器，拦截器

​	它是功能性需求：不是，这是非功能性需求

​	做网站：安全应该在什么时候考虑：设计之初

​	记住几个类：

* WebSecurityConfigurerAdapter: 自定义 Security 策略
*  AuthenticationManagerBuilder: 自定义认证策略
*  @EnableWebSecurity: 开启 WebSecurity 模式， @Enablexxxx 开启某个功能



市面上比较知名的一些安全架构：

* Shiro
* SpringSecurity
* 它们很像，除了类不一样，名字不一样，功能几乎都是类似的
* 功能：认证，授权（认证authentication,授权authorization）



代码：

* SecurityConfig.java

  ~~~java
  package com.joker_yue.config;
  
  import org.springframework.context.annotation.Configuration;
  import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
  import org.springframework.security.config.annotation.web.builders.HttpSecurity;
  import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
  import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
  import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/8/11 16:05
   */
  @Configuration
  @EnableWebSecurity
  public class SecurityConfig extends WebSecurityConfigurerAdapter {
      // 链式编程
      // 授权规则
      @Override
      public void configure(HttpSecurity http) throws Exception {
  
          // 首页所有人都可以访问，功能页只对有权限的人开放
          http.authorizeRequests()
                  .antMatchers("/").permitAll()
                  .antMatchers("/level1/**").hasRole("vip1")
                  .antMatchers("/level2/**").hasRole("vip2")
                  .antMatchers("/level3/**").hasRole("vip3");
  
          // 没有权限会自动跳转到登录页面。需要注册请求"/login"，如果登录错误git，就会跳转到"login?error"
          http.formLogin().loginPage("/toLogin");
          /*
          * 你可以将登录请求设置为如下，同时还能自定义接收的参数
          * http.formLogin().loginPage("/toLogin").loginProcessingUrl("/login").usernameParameter("username").passwordParameter("pwd");
          */
          // 开启了注销功能
          // 注销后指定跳转到首页
          http.logout().logoutSuccessUrl("/");
  
          // 关闭跨站攻击
          http.csrf().disable();
  
          // 开启记住我功能  Cookie的实现。自动清除Cookie：14天
          // 自定义接收的参数
          http.rememberMe().rememberMeParameter("remember");
      }
  
      // 认证规则
      /*
       * 密码编码：PasswordEncoder
       * 在Spring Security 5.0+中，新增了很多的加密方式。
       * 如果你不选择一种加密方式，那么明文密码将会不安全，会报500错误
       *  */
  
      @Override
      protected void configure(AuthenticationManagerBuilder auth) throws Exception {
          // 这些数据应该从数据库中读。我们现在是在内存中虚拟了角色
          auth.inMemoryAuthentication()
                  .passwordEncoder(new BCryptPasswordEncoder())   // 添加密码加密
                  .withUser("joker").password(new BCryptPasswordEncoder().encode("123456")).roles("vip2", "vip3")
                  .and()
                  .withUser("root").password(new BCryptPasswordEncoder().encode("123456")).roles("vip1", "vip2", "vip3")
                  .and()
                  .withUser("guest").password(new BCryptPasswordEncoder().encode("123456")).roles("vip1");
      }
  }
  ~~~

* login.html

  ~~~html
  
          <div style="text-align: center">
              <h1 class="header">登录</h1>
          </div>
  
          <div class="ui placeholder segment">
              <div class="ui column very relaxed stackable grid">
                  <div class="column">
                      <div class="ui form">
                          <!--如果要使用toLogin，则http.formLogin().loginPage("/toLogin");  配置一致。同时<form th:action="@{/toLogin}" method="post">
                              如果非要使用login，则http.formLogin().loginPage("/toLogin").loginProcessingUrl("/login");  同时<form th:action="@{/login}" method="post">。 /toLogin是地址栏显示的请求地址，实际内部请求地址为/login
                          -->
                          <form th:action="@{/toLogin}" method="post">
                              <div class="field">
                                  <label>工号</label>
                                  <div class="ui left icon input">
                                      <input type="text" placeholder="请输入工号..." name="username">
                                      <i class="user icon"></i>
                                  </div>
                              </div>
                              <div class="field">
                                  <label>密码</label>
                                  <div class="ui left icon input">
                                      <input type="password" placeholder="请输入密码..." name="password">
                                      <i class="lock icon"></i>
                                  </div>
                              </div>
                              <div class="field">
                                  <input type="checkbox" name="remember">记住我
                              </div>
                              <input type="submit" class="ui blue submit button"/>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
  ~~~

* index.html

  ~~~html
  <!--主容器-->
  <div class="ui container">
  
      <div class="ui segment" id="index-header-nav" th:fragment="nav-menu">
          <div class="ui secondary menu">
              <a class="item" th:href="@{/index}">首页</a>
  
              <!--登录注销-->
              <div class="right menu">
                  <!--如果没有登录-->
                  <div sec:authorize="!isAuthenticated()">
                      <a class="item" th:href="@{/toLogin}">
                          <i class="address card icon"></i> 登录
                      </a>
                  </div>
                  <div sec:authorize="isAuthenticated()">
                      <!--如果登录：用户名，注销-->
                      <!--注销-->
                      <a class="item">
                          <!-- 获得用户名和用户权限 -->
                          用户名：<span sec:authentication="name"></span>
                          角色：<span sec:authentication="principal.authorities"></span><!--SpringSecurity5获取角色的方式-->
                      </a>
                  </div>
                  <div sec:authorize="isAuthenticated()">
                      <!--如果登录：用户名，注销-->
                      <!--注销-->
                      <a class="item" th:href="@{/logout}">
                          <i class="sign-out icon"></i> 注销
                      </a>
                  </div>
  
  
              </div>
          </div>
      </div>
  
      <div class="ui segment" style="text-align: center">
          <h3>Spring Security Study by 秦疆</h3>
      </div>
  
      <div>
          <br>
          <div class="ui three column stackable grid">
              <!--菜单根据用户角色动态实现-->
              <div class="column" sec:authorize="hasRole('vip1')">
                  <div class="ui raised segment">
                      <div class="ui">
                          <div class="content">
                              <h5 class="content">Level 1</h5>
                              <hr>
                              <div><a th:href="@{/level1/1}"><i class="bullhorn icon"></i> Level-1-1</a></div>
                              <div><a th:href="@{/level1/2}"><i class="bullhorn icon"></i> Level-1-2</a></div>
                              <div><a th:href="@{/level1/3}"><i class="bullhorn icon"></i> Level-1-3</a></div>
                          </div>
                      </div>
                  </div>
              </div>
  
              <div class="column">
                  <div class="ui raised segment" sec:authorize="hasRole('vip2')">
                      <div class="ui">
                          <div class="content">
                              <h5 class="content">Level 2</h5>
                              <hr>
                              <div><a th:href="@{/level2/1}"><i class="bullhorn icon"></i> Level-2-1</a></div>
                              <div><a th:href="@{/level2/2}"><i class="bullhorn icon"></i> Level-2-2</a></div>
                              <div><a th:href="@{/level2/3}"><i class="bullhorn icon"></i> Level-2-3</a></div>
                          </div>
                      </div>
                  </div>
              </div>
  
              <div class="column">
                  <div class="ui raised segment" sec:authorize="hasRole('vip3')">
                      <div class="ui">
                          <div class="content">
                              <h5 class="content">Level 3</h5>
                              <hr>
                              <div><a th:href="@{/level3/1}"><i class="bullhorn icon"></i> Level-3-1</a></div>
                              <div><a th:href="@{/level3/2}"><i class="bullhorn icon"></i> Level-3-2</a></div>
                              <div><a th:href="@{/level3/3}"><i class="bullhorn icon"></i> Level-3-3</a></div>
                          </div>
                      </div>
                  </div>
              </div>
  
          </div>
      </div>
  
  </div>
  ~~~

  

#### Swagger

----

##### 了解前后端分离

前后端分离时代：

* 后端：后端控制层，服务层，数据访问层	（由后端团队开发）
* 前端：前端控制层，视图层（由前端团队开发）。
  * 伪造后端数据。 json 已经存在了，可以不需要后端，前端工程依旧能够跑起来，做一个演示的效果
* 前后端如何交互：API
* 前后端相互独立，松耦合
* 前后端甚至可以部署在不同的服务器上



产生一个问题：

* 前后端集成联调，前端人员和后端人员无法做到"即时协商，尽早解决”，最终导致问题集中爆发

解决方案：

* 指定schema【计划的提纲】，实时更新最新的API，降低集成风险

* 早些年：指定word计划文档

* 前后端分离：

  * 前端测试后端接口：Postman
  * 后端提供接口，需要实时更新最新的消息及改动

  

---

##### 了解Swagger的作用和概念

* 号称世界上最流行的API框架
* RestFul API，文档在线生成自动生成工具。API文档与代码同步更新
* 直接运行，可以在线测试API接口
* 支持多种语言：Java，PHP等

官网：[API Documentation & Design Tools for Teams | Swagger](https://swagger.io/)



---

##### 在项目中使用Swagger

[SpringBoot教程(十六) | SpringBoot集成swagger（全网最全）_一缕82年的清风的博客-CSDN博客](https://blog.csdn.net/lsqingfeng/article/details/123678701)

* 集成Swagger

  1. 导入依赖

     ~~~xml
     <!-- Swagger -->
     <dependency>
         <groupId>io.springfox</groupId>
         <artifactId>springfox-swagger2</artifactId>
         <version> 2.9.2</version>
     </dependency>
     <!-- SwaggerUI -->
     <dependency>
         <groupId>io.springfox</groupId>
         <artifactId>springfox-swagger-ui</artifactId>
         <version>2.9.2</version>
     </dependency>
     ~~~

  2. 编写Hello工程

  3. 编写SwaggerConfig.java开启Swagger

     ~~~java
     package com.joker_yue.config;
     
     import org.springframework.context.annotation.Configuration;
     import springfox.documentation.swagger2.annotations.EnableSwagger2;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/8/12 15:15
      */
     @Configuration
     @EnableSwagger2     // 开启Swagger2
     public class SwaggerConfig {
     }
     ~~~

     

  4. 测试运行

     建议降级SpringBoot为2.5.6

     ![image-20230812155321501](./跟随狂神学Java-38.assets/image-20230812155321501.png)

* 配置Swagger

  1. 你可以配置Swagger页面上的信息：SwaggerConfig.java

     ~~~java
     package com.joker_yue.config;
     
     import org.springframework.context.annotation.Bean;
     import org.springframework.context.annotation.Configuration;
     import springfox.documentation.service.ApiInfo;
     import springfox.documentation.service.Contact;
     import springfox.documentation.spi.DocumentationType;
     import springfox.documentation.spring.web.plugins.Docket;
     import springfox.documentation.swagger2.annotations.EnableSwagger2;
     
     import java.util.ArrayList;
     
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/8/12 15:15
      */
     @Configuration
     @EnableSwagger2     // 开启Swagger2
     public class SwaggerConfig {
         // 配置Swagger Docket的Bean实例
         @Bean
         public Docket docket(){
             return new Docket(DocumentationType.SWAGGER_2)
                     .apiInfo(apiInfo());     // ApiInfo可以配置swagger-ui.html上的显示信息
         }
     
         private ApiInfo apiInfo(){
             // 作者信息
             Contact joker = new Contact("Joker", "www.github.com/Joker2Yue", "Joker2Yue@outlook.com");
             return new ApiInfo(
                    "Joker自定义的Swagger",
                     "Joker_Never_Plays_Jokes.",
                     "1.0",
                     "www.github.com/Joker2Yue",
                     joker,
                     "Apache 2.0",
                     "http://www.apache.org/licenses/LICENSE-2.0",
                     new ArrayList());
         }
     }
     ~~~

     ![image-20230812160733448](./跟随狂神学Java-38.assets/image-20230812160733448.png)

  2. 配置扫描接口

     ~~~java
     @Bean
         public Docket docket() {
             return new Docket(DocumentationType.SWAGGER_2)
                     .apiInfo(apiInfo())     // ApiInfo可以配置swagger-ui.html上的显示信息
                     .enable(true)  // 是否启用Swagger
                     .select()               // 扫描接口
                     // RequestHandlerSelectors：配置要扫描接口的方式
                     // basePackage：配置要扫描的包；
                     // any():配置扫描全部的包；
                     // none：都不扫描；
                     // withClassAnnotation：扫描类上的注解
                     // withMethodAnnotation：扫描方法上的注解
                     // .apis(RequestHandlerSelectors.withClassAnnotation(RestController.class))   //只会扫描类上有RestController的类，给它生成接口
                     .apis(RequestHandlerSelectors.basePackage("com.joker_yue.controller"))
                     // .paths()过滤什么路径
                     .paths(PathSelectors.ant("/joker/**"))
                     .build()
                     ;
         }
     ~~~

  3. 配置是否启动Swagger

     ~~~java
     // 配置Swagger Docket的Bean实例
     @Bean
     public Docket docket(Environment environment) {
         // 获取环境，以动态设置Swagger的开启和关闭
         Profiles profiles = Profiles.of("dev","test");
         // 通过environment.acceptsProfiles()方法判断是否处在自己设定的环境内
         boolean flag = environment.acceptsProfiles(profiles);
     
         return new Docket(DocumentationType.SWAGGER_2)
                 .apiInfo(apiInfo())     // ApiInfo可以配置swagger-ui.html上的显示信息
                 .groupName("呜呜呜")
                 .enable(flag)  // 是否启用Swagger
                 .select()      // 扫描接口
                 // RequestHandlerSelectors：配置要扫描接口的方式
                 // basePackage：配置要扫描的包；
                 // any():配置扫描全部的包；
                 // none：都不扫描；
                 // withClassAnnotation：扫描类上的注解
                 // withMethodAnnotation：扫描方法上的注解
                 // .apis(RequestHandlerSelectors.withClassAnnotation(RestController.class))   //只会扫描类上有RestController的类，给它生成接口
                 .apis(RequestHandlerSelectors.basePackage("com.joker_yue.controller"))
                 // .paths()过滤什么路径
                 .paths(PathSelectors.ant("/joker/**"))
                 .build()
                 ;
     }
     ~~~

  4. 你可以自定义组。在swagger页面中查看效果

     ~~~java
     @Bean
     public Docket docket1(){
         return new Docket(DocumentationType.SWAGGER_2).groupName("A");
     }
     
     @Bean
     public Docket docket2(){
         return new Docket(DocumentationType.SWAGGER_2).groupName("B");
     }
     
     @Bean
     public Docket docket3(){
         return new Docket(DocumentationType.SWAGGER_2).groupName("C");
     }
     ~~~

     <img src="./跟随狂神学Java-38.assets/image-20230812203819685.png" alt="image-20230812203819685"  />

  5. 你可以在Controller中定义测试

     ~~~java
     package com.joker_yue.controller;
     
     import com.joker_yue.pojo.User;
     import io.swagger.annotations.ApiOperation;
     import io.swagger.annotations.ApiParam;
     import org.springframework.web.bind.annotation.*;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/8/12 15:11
      */
     @RestController
     public class HelloController {
         @PostMapping("/hello")
         public String hello() {
             return "hello";
         }
     
         // 只要我们的接口中，返回值中存在实体类，它就会被扫描到Swagger中
         @PostMapping("/user")
         public User user(){
             return new User();
         }
     
         @GetMapping(value = "/userhello")
         @ApiOperation(value = "获取用户信息")
         public String userhello(@ApiParam("用户名") String username){
             return "hello"+username;
         }
     }
     ~~~

     ![image-20230812204112896](./跟随狂神学Java-38.assets/image-20230812204112896.png)

总结

1. 可以通过Swagger给一些比较难理解的属性或者接口增加注释信息
2. 接口文档实时更新
3. 可以在线测试





#### 任务

---

##### 异步任务

* 平常我们处理多线程任务，需要自己手动编写。但是Spring给我们提供了注解，我们拿过来就可以开启异步任务

* 它其实就是多线程封装的

* 异步执行方法有可能会非常消耗cpu的资源，所以大的项目建议使用Mq异步实现

  1. 假装有一个业务：AsyncService.java

     在这里我们使用注解**==`@Async`==**表明这是一个异步方法

     ~~~java
     package com.joker_yue.service;
     
     import org.springframework.scheduling.annotation.Async;
     import org.springframework.stereotype.Service;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/8/12 21:05
      */
     @Service
     public class AsyncService {
         @Async  // 告诉Spring，这是一个异步的方法。
         public void hello(){
             try {
                 Thread.sleep(3000);
             } catch (InterruptedException e) {
                 throw new RuntimeException(e);
             }
     
             System.out.println("数据正在处理...");
         }
     }
     ~~~

  2. 来一个Controller：AsyncController.java

     ~~~java
     package com.joker_yue.controller;
     
     import com.joker_yue.service.AsyncService;
     import org.springframework.beans.factory.annotation.Autowired;
     import org.springframework.web.bind.annotation.RequestMapping;
     import org.springframework.web.bind.annotation.RestController;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/8/12 21:06
      */
     @RestController
     public class AsyncController {
         @Autowired
         AsyncService asyncService;
     
         @RequestMapping("/hello")
         public String hello() {
             asyncService.hello();   // 停止3s，转圈
             return "OK";
         }
     }
     ~~~

  3. 在程序主入口使用注解**==`@EnableAsync`==**开启异步

     ~~~java
     package com.joker_yue;
     
     import org.springframework.boot.SpringApplication;
     import org.springframework.boot.autoconfigure.SpringBootApplication;
     import org.springframework.scheduling.annotation.EnableAsync;
     
     @EnableAsync    //开启异步功能
     @SpringBootApplication
     public class SpringBootTaskApplication {
     
         public static void main(String[] args) {
             SpringApplication.run(SpringBootTaskApplication.class, args);
         }
     
     }
     ~~~

* 异步处理失效的处理+整合线程池

  * 如果异步注解写当前自己类，有可能aop会失效，无法拦截注解，最终导致异步注解失效，需要经过代理类调用接口；所以需要将异步的代码单独抽取成一个类调用接口。
  * 如果没有整合线程池，频繁的创建线程会非常的浪费资源

  1. 将方法抽取到一个单独的类

     ~~~java
     import lombok.extern.slf4j.Slf4j;
     import org.springframework.scheduling.annotation.Async;
     import org.springframework.stereotype.Component;
     
     /**
      * @ClassName MemberServiceAsync
      * @Author 蚂蚁课堂余胜军 QQ644064779 www.mayikt.com
      * @Version V1.0
      **/
     @Slf4j
     @Component
     public class MemberServiceAsync {
         @Async
         public String smsAsync() {
             log.info(">02<");
             try {
                 log.info(">正在发送短信..<");
                 Thread.sleep(3000);
             } catch (Exception e) {
     
             }
             log.info(">03<");
             return "短信发送完成!";
         }
     }
     ~~~

  2. 在需要调用此方法的类中代理

     ~~~java
     @RestController
     @Slf4j
     public class MemberService {
         @Autowired
         private MemberServiceAsync memberServiceAsync;
         
     	@RequestMapping("addMember")
         public String addMember(){
             log.info(">01<");
             memberServiceAsync.sms();
             log.info(">04<");
             return "用户注册成功"
         }
     }
     ~~~

  3. 配置线程池ThreadPoolConfig.java

     ~~~java
     
     import org.springframework.context.annotation.Bean;
     import org.springframework.context.annotation.Configuration;
     import org.springframework.core.task.TaskExecutor;
     import org.springframework.scheduling.annotation.EnableAsync;
     import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
     
     import java.util.concurrent.ThreadPoolExecutor;
     
     @Configuration
     @EnableAsync
     public class ThreadPoolConfig {
     
         /**
          * 每秒需要多少个线程处理?
          * tasks/(1/taskcost)
          */
         private int corePoolSize = 3;
     
         /**
          * 线程池维护线程的最大数量
          * (max(tasks)- queueCapacity)/(1/taskcost)
          */
         private int maxPoolSize = 3;
     
         /**
          * 缓存队列
          * (coreSizePool/taskcost)*responsetime
          */
         private int queueCapacity = 10;
     
         /**
          * 允许的空闲时间
          * 默认为60
          */
         private int keepAlive = 100;
     
         @Bean
         public TaskExecutor taskExecutor() {
             ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
             // 设置核心线程数
             executor.setCorePoolSize(corePoolSize);
             // 设置最大线程数
             executor.setMaxPoolSize(maxPoolSize);
             // 设置队列容量
             executor.setQueueCapacity(queueCapacity);
             // 设置允许的空闲时间（秒）
             //executor.setKeepAliveSeconds(keepAlive);
             // 设置默认线程名称
             executor.setThreadNamePrefix("thread-");
             // 设置拒绝策略rejection-policy：当pool已经达到max size的时候，如何处理新任务
             // CALLER_RUNS：不在新线程中执行任务，而是有调用者所在的线程来执行
             executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
             // 等待所有任务结束后再关闭线程池
             executor.setWaitForTasksToCompleteOnShutdown(true);
             return executor;
         }
     
     }
     ~~~

  4. 在需要进入线程池的任务中指定线程池的名称

     ~~~java
     
     import lombok.extern.slf4j.Slf4j;
     import org.springframework.scheduling.annotation.Async;
     import org.springframework.stereotype.Component;
     
     /**
      * @ClassName MemberServiceAsync
      * @Author 蚂蚁课堂余胜军 QQ644064779 www.mayikt.com
      * @Version V1.0
      **/
     @Slf4j
     @Component
     public class MemberServiceAsync {
         @Async("taskExecutor")
         public String smsAsync() {
             log.info(">02<");
             try {
                 log.info(">正在发送短信..<");
                 Thread.sleep(3000);
             } catch (Exception e) {
     
             }
             log.info(">03<");
             return "短信发送完成!";
         }
     }
     
     ~~~

     

---

##### 邮件任务

1. 导入依赖

   ~~~xml
   <!-- Mail -->
   <dependency>
       <groupId>org.springframework.boot.</groupId>
       <artifactId>spring-boot-starter-mail</artifactId>
       <version>2.7.14</version>
   </dependency>
   ~~~

2. application.properties

   ~~~properties
   spring.mail.username=joker_yue@qq.com
   spring.mail.password=别偷看密码吼吼
   spring.mail.host=smtp.qq.com
   spring.mail.port=465
   # 开启加密验证
   spring.mail.properties.mail.smtp.ssl.enable=true
   ~~~

3. Test.java

   ~~~java
   package com.joker_yue;
   
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.boot.test.context.SpringBootTest;
   import org.springframework.mail.SimpleMailMessage;
   import org.springframework.mail.javamail.JavaMailSenderImpl;
   import org.springframework.mail.javamail.MimeMessageHelper;
   
   import javax.mail.MessagingException;
   import javax.mail.internet.MimeMessage;
   
   @SpringBootTest
   class SpringBootTaskApplicationTests {
   
       @Autowired
       JavaMailSenderImpl mailSender;
   
       @Test
       void contextLoads() {
           // 一个简单的邮件
           SimpleMailMessage simpleMessage = new SimpleMailMessage();
           simpleMessage.setSubject("测试邮件");
           simpleMessage.setText("测试邮件内容");
           simpleMessage.setFrom("joker_yue@qq.com");
           simpleMessage.setTo("joker_yue@qq.com");
           mailSender.send(simpleMessage);
       }
   
       @Test
       void contextLoads2() throws MessagingException {
           // 一个复杂的邮件
           MimeMessage mimeMailMessage = mailSender.createMimeMessage();
           // 组装
           MimeMessageHelper helper = new MimeMessageHelper(mimeMailMessage, true, "UTF-8");
           // 设置主题
           helper.setSubject("测试邮件");
           // 设置文本，后面一个参数为是否解析为html
           helper.setText("<p style='color:red;'>测试邮件内容</p>", true);
           // 附件
           // helper.addAttachment("1.jpg",new File("1.jpg"));
   
           // 接收者
           helper.setTo("joker_yue@qq.com");
   
           // 发送人
           helper.setFrom("joker_yue@qq.com");
   
           mailSender.send(mimeMailMessage);
       }
   }
   ~~~

   

---

##### 定时任务

需要用到：
~~~java
TaskScheduler	任务调度
TaskExecutor	任务执行
~~~

```java
@EnableScheduling   // 开启定时功能
```

代码：

1. ScheduleService.java

   使用`@Scheduling`注解

   星期一到星期天之间的任何时间的第0秒就会执行

   ~~~java
   package com.joker_yue.service;
   
   import org.springframework.scheduling.annotation.Scheduled;
   import org.springframework.stereotype.Service;
   
   /**
    * @author Joker
    * @version 1.0
    * @date 2023/8/13 14:40
    */
   @Service
   public class ScheduledService {
       //在一个指定的时间执行
       //需要cron表达式
       // 分别为秒 分 时 日 月 星期
       @Scheduled(cron = "0 * * * * 0-7")      // 表示星期一到星期天之间的任何时间的第0秒就会执行
       public void hello(){
           System.out.println("hello被执行");
       }
   }
   ~~~

2. 主入口，加上`@EnableScheduling`注解

   ~~~java
   package com.joker_yue;
   
   import org.springframework.boot.SpringApplication;
   import org.springframework.boot.autoconfigure.SpringBootApplication;
   import org.springframework.scheduling.annotation.EnableAsync;
   import org.springframework.scheduling.annotation.EnableScheduling;
   
   @EnableAsync    // 开启异步功能
   @SpringBootApplication
   @EnableScheduling   // 开启定时功能
   public class SpringBootTaskApplication {
   
       public static void main(String[] args) {
           SpringApplication.run(SpringBootTaskApplication.class, args);
       }
   
   }
   ~~~

   

Cron表达式：[cron表达式语法规则及常见示例_cron 规则_Kuo-Teng的博客-CSDN博客](https://blog.csdn.net/itigoitie/article/details/130047946)





#### 全局捕获异常

---

##### 注解说明

@ExceptionHandler 表示拦截异常

* @ControllerAdvice 是 controller 的一个辅助类，最常用的就是作为全局异常处理的切面类
* @ControllerAdvice 可以指定扫描范围
* @ControllerAdvice 约定了几种可行的返回值，如果是直接返回 model 类的话，需要使用 @ResponseBody 进行 json 转换
  * 返回 String，表示跳到某个 view
  * 返回 modelAndView
  * 返回 model + @ResponseBody

---

##### 代码

~~~java
@ControllerAdvice
public class MayiktExceptionHandler {

    /**
     * 拦截运行异常出现的错误~~~
     *
     * @return
     */
    @ExceptionHandler(RuntimeException.class)
    @ResponseBody
    public Map<Object, Object> exceptionHandler() {
        Map<Object, Object> map = new HashMap<>();
        map.put("error", "500");
        map.put("msg", "系统出现错误~");
        return map;
    }
}
~~~

---

##### 结果

<img src="./跟随狂神学Java-38.assets/image-20230815130917348.png" alt="image-20230815130917348" style="zoom:50%;" />



#### 分布式

---

##### 什么是分布式系统

”分布式系统（Distribute System）是若干独立计算机的集合，这些计算机对于用户来说就像单个相关系统“

<img src="./跟随狂神学Java-38.assets/image-20230813145551617.png" alt="image-20230813145551617" style="zoom:67%;" />



---

##### 什么是RPC

​	RPC（Remote Procedure Call，远程过程调用）是一种计算机通信协议，它允许一个计算机程序调用另一个地址空间（通常是不同的机器）的子程序或函数，就像是本地调用一样，而不需要开发人员显式地处理远程通信的细节。它允许程序调用另一个地址空间（通常是共享网络的另一台机器上）的过程或函数，而不用程序员显式编码这个远程调用的细节，即程序员无论是调用本地的还是远程的函数，本质上编写的调用代码基本相同。

​	也就是说两台服务器A，B，一个应用部署在A服务器上，想要调用B服务器上应用提供的函数/方法，由于不在一个内存空间，不能直接调用，需要通过网络来表达调用的语义和传达调用的数据。为什么要用RPC呢？就是无法在一个进程内，至一个计算机内通过本地调用的方式完成的需求，比如不同的系统间的通讯，甚至不同的组织间的通讯，由于计算能力需要横向扩展，需要在多台机器组成的集群上部署应用。RPC就是要像调用本地的函数一样去调远程函数

​	更多信息：[RPC是什么，看完你就知道了 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/187560185)



---

##### Dubbo

官方文档：[Apache Dubbo](https://cn.dubbo.apache.org/zh-cn/)

​	Apache Dubbo 是一款 RPC 服务开发框架，用于解决微服务架构下的服务治理与通信问题，官方提供了 Java、Golang 等多语言 SDK 实现。使用 Dubbo 开发的微服务原生具备相互之间的远程地址发现与通信能力， 利用 Dubbo 提供的丰富服务治理特性，可以实现诸如服务发现、负载均衡、流量调度等服务治理诉求。Dubbo 被设计为高度可扩展，用户可以方便的实现流量拦截、选址的各种定制逻辑。

​	在云原生时代，Dubbo 相继衍生出了 Dubbo3、Proxyless Mesh 等架构与解决方案，在易用性、超大规模微服务实践、云原生基础设施适配、安全性等几大方向上进行了全面升级。

​	首先有一店里要有汉堡包（register），然后消费者点餐（subscribe），最后消费者取餐（invoke）

<img src="./跟随狂神学Java-38.assets/image-20230813151904469.png" alt="image-20230813151904469" style="zoom: 33%;" />

* Zookeeper：注册中心
* Dubbo-admin：监控后台，查看我们注册了哪些服务，哪些服务被消费了
* Dubbo：jar包

