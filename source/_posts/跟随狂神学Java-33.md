---
title: 跟随狂神学Java-33，SpringFramework
date: 2023/07/28 04:02:22
tags:
  - Java
  - 狂神
  - SSM
  - Spring
  - SpringFramework
  - Spring框架
  - 必看
categories:
  - [跟随狂神学Java]
  - [必看]
  - [技术]
  - [Java]
cover: https://resource.joker2yue.cn/blog/images/coverImg/Spring/SpringFramework.png
keywords:
  - Spring
  - SpringFramework
  - IOC
  - DI
  - 配置注入
  - Bean
  - 自动装配
  - 注解
  - JavaConfig
  - 代理模式
  - AOP
  - Mybatis
  - 声明式事务管理
  - 持久化
  - CRUD操作
  - SQL
  - Web应用程序
  - Web服务器
  - MVC三层架构
  - MVC
  - JDBC
  - SSM
ai:
  - 这篇笔记深入介绍了Spring框架，包括其概念、优点、组成、IOC理论、依赖注入、作用域、自动装配、注解开发、代理模式、AOP、整合Mybatis、事务管理等主题。总结了Spring框架在Java应用中的关键作用和应用场景。关键词包括Spring、IOC、DI、AOP、Mybatis、事务管理等。
  - 这篇笔记涵盖了Spring框架的核心概念和应用，包括Spring的简介、优点、组成、IOC理论、依赖注入、作用域、自动装配、注解开发、JavaConfig开发、代理模式、AOP以及与Mybatis的整合和声明式事务管理。总结来说，笔记提供了全面的Spring知识，帮助读者理解如何利用Spring构建现代Java应用程序。
  - 这篇笔记涵盖了Spring框架的核心概念和应用，包括IOC容器、依赖注入、Bean配置、自动装配、注解开发、代理模式、AOP（面向切面编程）、整合Mybatis、声明式事务管理等内容。它提供了对Spring框架的全面理解和实际运用指导。
---
# 跟随狂神学Java

**第三十三：Spring**

> “计算机科学是一门让你学会如何思考的科学，而不是一门让你学会如何编程的科学。” 
>
> [【狂神说Java】Spring5最新完整教程IDEA版通俗易懂_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1WE411d7Dv/?vd_source=814489e71df641c4b2c0ff7d4659b2d0)
>
> [Spring Framework](https://spring.io/projects/spring-framework)
>
> [最全的Spring依赖注入方式，你都会了吗. - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/358526088)



#### Spring

---

##### 简介

* Spring：春天，给软件行业带来了春天

* 2002，首次推出了Spring框架的原型，interface21

* 在2004年3月24日，Spring Framework 1.0 final正式发布，以interface21框架为基础

* Rod Johnson 创始人

* Spring理念：使现有的技术更容易使用，本身是一个大杂烩，整合了现有的技术框架

  当你了解一个框架时，重要的是不仅要知道它做了什么，还要知道它做了什么。 它遵循的原则。以下是 Spring 框架的指导原则：

  - 提供各个级别的选择。Spring 允许您尽可能晚地推迟设计决策。 例如，您可以通过配置切换持久性提供程序，而无需更改 您的代码。许多其他基础设施问题和与 第三方 API。
  - 适应不同的观点。弹簧拥抱灵活性，不固执己见 关于应该如何做事。它支持广泛的应用需求 不同的观点。
  - 保持强大的向后兼容性。春天的演变得到了精心的管理 强制在版本之间进行一些重大更改。弹簧支持精心挑选的范围 JDK 版本和第三方库，以方便应用程序的维护 依赖于 Spring 的库。
  - 关心 API 设计。Spring 团队投入了大量的思想和时间来制作 API 直观且经得起许多版本和多年的考验。
  - 为代码质量设定高标准。Spring 框架非常重视 有意义、最新且准确的 javadoc。这是极少数可以声称的项目之一 干净的代码结构，包之间没有循环依赖关系。

* 其他信息：

  * SSH：Struct2+Spring+Hibernate
  * SSM：SpringMVC+Spring+Mybatis

* 官网：[Spring Framework](https://spring.io/projects/spring-framework#overview)

* 官方下载地址：



~~~xml
<!-- https://mvnrepository.com/artifact/org.springframework/spring-webmvc -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.3.29</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.springframework/spring-jdbc -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.3.29</version>
</dependency>
~~~



---

##### 优点

* Spring是一个免费的开源的框架（容器）
* Spring是一个轻量级、非入侵式的框架
* **控制反转（IOC），面向切面编程（AOP）**
* 支持事务，对框架整合的支持

总结：

* ==Spring  就是一个轻量级的控制反转 (IOC) 和面向切面编程（AOP）的框架！==

---

##### 组成

<img src="./跟随狂神学Java-33.assets/image-20230723203930341.png" alt="image-20230723203930341" style="zoom:67%;" />

* **核心容器（Spring Core）**

  核心容器提供Spring框架的基本功能。Spring以bean的方式组织和管理Java应用中的各个组件及其关系。Spring使用BeanFactory来产生和管理Bean，它是工厂模式的实现。BeanFactory使用控制反转(IoC)模式将应用的配置和依赖性规范与实际的应用程序代码分开。

* **应用上下文（Spring Context）**

  Spring上下文是一个配置文件，向Spring框架提供上下文信息。Spring上下文包括企业服务，如JNDI、EJB、电子邮件、国际化、校验和调度功能。

* **Spring面向切面编程（Spring AOP）**

  通过配置管理特性，Spring AOP 模块直接将面向方面的编程功能集成到了 Spring框架中。所以，可以很容易地使 Spring框架管理的任何对象支持 AOP。Spring AOP 模块为基于 Spring 的应用程序中的对象提供了事务管理服务。通过使用 Spring AOP，不用依赖 EJB 组件，就可以将声明性事务管理集成到应用程序中。

* **JDBC和DAO模块（Spring DAO）**

  JDBC、DAO的抽象层提供了有意义的异常层次结构，可用该结构来管理异常处理，和不同数据库供应商所抛出的错误信息。异常层次结构简化了错误处理，并且极大的降低了需要编写的代码数量，比如打开和关闭链接。

* **对象实体映射（Spring ORM）**

  Spring框架插入了若干个ORM框架，从而提供了ORM对象的关系工具，其中包括了Hibernate、JDO和 IBatis SQL Map等，所有这些都遵从Spring的通用事物和DAO异常层次结构。

* **Web模块（Spring Web）**

  Web上下文模块建立在应用程序上下文模块之上，为基于web的应用程序提供了上下文。所以Spring框架支持与Struts集成，web模块还简化了处理多部分请求以及将请求参数绑定到域对象的工作。

* **MVC模块（Spring Web MVC）**

  MVC框架是一个全功能的构建Web应用程序的MVC实现。通过策略接口，MVC框架变成为高度可配置的。MVC容纳了大量视图技术，其中包括JSP、POI等，模型来有JavaBean来构成，存放于m当中，而视图是一个街口，负责实现模型，控制器表示逻辑代码，由c的事情。Spring框架的功能可以用在任何J2EE服务器当中，大多数功能也适用于不受管理的环境。Spring的核心要点就是支持不绑定到特定J2EE服务的可重用业务和数据的访问的对象，毫无疑问这样的对象可以在不同的J2EE环境，独立应用程序和测试环境之间重用。

---

##### 拓展

<img src="./跟随狂神学Java-33.assets/image-20230723204250508.png" alt="image-20230723204250508" style="zoom: 50%;" />

* **SpringBoot**
  * 一个快速开发的脚手架
  * 基于SpringBoot可以快速的开发单个微服务
  * 约定大于配置
* **SpringCloud**
  * 是基于SpringBoot实现的

因为现在大多数公司都在使用SpringBoot进行快速开发，学习SpringBoot的前提，需要完全掌握Spring及SpringMVC



弊端：发展了太久，违背了原来的理念，配置十分繁琐，人称”配置地地狱



#### IOC理论推导

---

IoC：

* 控制反转IoC（Inversion 偶发 Control 控制），是一种设计思想，DI（依赖注入）是实现IoC的一种方法
* 反转就是：获得依赖对象的方式反转了
* 控制：谁来控制对象的创建，传统应用程序的对象是由程序本身控制创建的，使用Spring之后，对象是由Spring来创建的
* 一句话总结：对象由Spring来创建，管理 ，装配

原来的开发架构：

* UserDao接口
* UseDaoImpl实现类
* UserService业务接口
* UerServiceImpl业务实现类

在之前的业务中，用户的需求可能会影响我们原来的代码，这个时候我们只能根据用户的需求手动修改源代码。如果代码量很大，那么代价也会很大



我们使用一个set接口实现（已经发生了革命性的变化）

~~~java
private UserDao userDao;

//利用set实现动态实现值的注入
public void setUserDao(UserDao userDao) {
    this.userDao = userDao;
}
~~~

* 之前，程序是主动创建对象，控制权在程序员手上
* 使用了set注入后，程序不再具有主动性，而是变成了被动的接收对象



这种思想，从本质上解决了问题，我们程序员不用再去管理对象的创建了，系统的耦合性大大降低，可以专注于业务的实现上。这就是IOC的原型

![image-20230724121335037](./跟随狂神学Java-33.assets/image-20230724121335037.png)

![image-20230724121756859](./跟随狂神学Java-33.assets/image-20230724121756859.png)





#### HelloSpring

---

代码:

* Hello.java

  ~~~java
  package com.joker_yue.pojo;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/24 12:20
   */
  public class Hello {
      private String Str;
  
      public String getStr() {
          return Str;
      }
  
      public void setStr(String str) {
          Str = str;
      }
  
      @Override
      public String toString() {
          return "Hello{" +
                  "Str='" + Str + '\'' +
                  '}';
      }
  }
  ~~~

* beans.xml

  ~~~xml
  <?xml version="1.0" encoding="UTF-8"?>
  <beans xmlns="http://www.springframework.org/schema/beans"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:util="http://www.springframework.org/schema/util"
         xsi:schemaLocation="http://www.springframework.org/schema/beans
          https://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/util https://www.springframework.org/schema/util/spring-util.xsd">
  
      <!--
          使用Spring来创建对象，在Spring中，这些都称为Bean
          类型  变量名=new 类型()
          Hello hello=new Hello()
          id = 变量名
          class = new的对象
          property相当于给对象中的属性设置一个值
      -->
      <bean id="hello" class="com.joker_yue.pojo.Hello">
          <property name="Str" value="Hello Spring"/>
      </bean>
  
  </beans>
  ~~~

* Test

  ~~~java
  import com.joker_yue.pojo.Hello;
  import org.springframework.context.ApplicationContext;
  import org.springframework.context.support.ClassPathXmlApplicationContext;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/24 12:29
   */
  public class MyTest {
      public static void main(String[] args) {
          // 获取Spring的上下文对象
          ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
          // 我们的对象现在Spring中管理了，想要使用，直接去里面取出来就可以
          Hello hello = (Hello)context.getBean("hello");  // 从容器中拿出对象
          System.out.println(hello.getStr());
      }
  }
  ~~~



#### IOC通过配置注入 (DI) 创建对象的方式

---

1. 使用无参构造创建对象，默认

   无配置文件

2. 如果要使用有参构造创建对象

   1.  下标赋值（在构造函数参数中的下标）

      ~~~xml
      <!-- 第一种，通过下标赋值 -->
      <bean id="user" class="com.joker_yue.pojo.User">
          <constructor-arg index="0" value="joker"/>
      </bean>
      ~~~

   2. 类型，不建议使用

      ~~~xml
      <!-- 第二种，通过属性赋值，不建议使用 -->
      <bean id="user" class="com.joker_yue.pojo.User">
          <constructor-arg type="java.lang.String" value="joker"/>
      </bean>
      ~~~

   3. 参数

      ~~~xml
      <!-- 第三种，通过参数名赋值 -->
      <bean id="user" class="com.joker_yue.pojo.User">
              <constructor-arg name="name" value="joker"/>
      </bean>
      ~~~

      

   总结：在配置文件加载的时候，容器中管理的对象就已经初始化了

   ~~~java
   {
       // User user = new User();
       ApplicationContext context = new ClassPathXmlApplicationContext("bean.xml");
   
       User user = (User) context.getBean("user");
       User user2 = (User) context.getBean("user");
   
       System.out.println(user== user2);
   }
   ~~~



#### Spring配置

---

##### 别名

就是`<alias>`

~~~xml
<!--   别名   -->
<alias name="user" alias="userNew"/>
~~~

~~~java
User user = (User) context.getBean("user");
User user2 = (User) context.getBean("user2");
~~~

---

##### Bean的配置

~~~xml
<!--
    id: bean的唯一标识符，也就是相当于对象名
    class: bean对象的类
    name: 别名，相当于alias
 -->
<bean id="userT" class="com.joker_yue.pojo.UserT" name="user2,u2"/>
~~~

---

##### import

一般用于团队开发，可以将多个bean配置文件导入合并为一个

~~~xml

    <import resource="bean.xml"/>
    <import resource="bean2.xml"/>
    <import resource="bean3.xml"/>
~~~



#### 依赖注入（Dependency Injections，DI）

---

1. 构造器注入

   在创建对象的时候赋值。请想象有参构造

2. Set注入【重点】

   通过setter方法赋值，请想象setter方法

   * 依赖注入：Set注入

     * 依赖：bean对象的创建依赖于容器
     * 注入：bean对象中的所有属性，由容器来注入

     【环境搭建】

     1. 复杂类型

        Address.java

        ~~~java
        package com.joker_yue.pojo;
        
        /**
         * @author Joker
         * @version 1.0
         * @date 2023/7/25 11:39
         */
        public class Address {
            private String address;
        
            public String getAddress() {
                return address;
            }
        
            public void setAddress(String address) {
                this.address = address;
            }
        }
        ~~~

        Student.java

        ~~~java
        package com.joker_yue.pojo;
        
        import java.util.*;
        
        /**
         * @author Joker
         * @version 1.0
         * @date 2023/7/25 11:39
         */
        public class Student {
            private String name;
            private Address address;
            private String[] books;
            private List<String> hobbies;
            private Map<String,String> card;
            private Set<String> games;
            private String wife;
            private Properties info;
        
            public String getName() {
                return name;
            }
        
            public void setName(String name) {
                this.name = name;
            }
        
            public Address getAddress() {
                return address;
            }
        
            public void setAddress(Address address) {
                this.address = address;
            }
        
            public String[] getBooks() {
                return books;
            }
        
            public void setBooks(String[] books) {
                this.books = books;
            }
        
            public List<String> getHobbies() {
                return hobbies;
            }
        
            public void setHobbies(List<String> hobbies) {
                this.hobbies = hobbies;
            }
        
            public Map<String, String> getCard() {
                return card;
            }
        
            public void setCard(Map<String, String> card) {
                this.card = card;
            }
        
            public Set<String> getGames() {
                return games;
            }
        
            public void setGames(Set<String> games) {
                this.games = games;
            }
        
            public String getWife() {
                return wife;
            }
        
            public void setWife(String wife) {
                this.wife = wife;
            }
        
            public Properties getInfo() {
                return info;
            }
        
            public void setInfo(Properties info) {
                this.info = info;
            }
        
            @Override
            public String toString() {
                return "Student{" +
                        "name='" + name + '\'' +
                        ", address=" + address +
                        ", books=" + Arrays.toString(books) +
                        ", hobbies=" + hobbies +
                        ", card=" + card +
                        ", games=" + games +
                        ", wife='" + wife + '\'' +
                        ", info=" + info +
                        '}';
            }
        }
        
        ~~~

        beans.xml

        ~~~xml
        <bean id="student" class="com.joker_yue.pojo.Student">
            <!-- 第一种，普通注入方式 -->
            <property name="name" value="Joker"/>
        </bean>
        ~~~

        测试类

        ~~~java
        public class MyTest {
            public static void main(String[] args) {
                ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
                Student student = (Student) context.getBean("student");
        
                String name = student.getName();
                System.out.println(name);
            }
        }
        ~~~

3. 完善注入信息

   ~~~xml
   <bean id="address" class="com.joker_yue.pojo.Address">
       <property name="address" value="北京"/>
   </bean>
   
   <bean id="student" class="com.joker_yue.pojo.Student">
       <!-- 第一种，普通注入方式 -->
       <property name="name" value="Joker"/>
       <!-- 第二种，Bean注入，ref -->
       <property name="address" ref="address"/>
   
   
       <!-- 数组注入, String[] books -->
       <property name="books">
           <array>
               <value>Java核心技术</value>
               <value>Java Web技术</value>
               <value>Java Web开发实战</value>
           </array>
       </property>
   
       <!-- List, List<String> hobbies -->
       <property name="hobbies">
           <list>
               <value>篮球</value>
               <value>足球</value>
               <value>代码</value>
           </list>
       </property>
   
       <!-- Map, Map<String, String> card -->
       <property name="card">
           <map>
               <entry key="身份证" value="1234567890"/>
               <entry key="银行卡" value="1234567890"/>
           </map>
       </property>
   
       <!-- Set, Set<String> games -->
       <property name="games">
           <set>
               <value>LOL</value>
               <value>PVZ</value>
               <value>CS</value>
           </set>
       </property>
   
       <!-- Null，下面两种都可以 -->
       <!-- <property name="wife" value=""/> -->
       <property name="wife">
           <null/>
       </property>
   
       <property name="info">
           <props>
               <prop key="学号">123456</prop>
               <prop key="性别">男</prop>
               <prop key="username">jack</prop>
               <prop key="password">123456</prop>
           </props>
       </property>
   
   </bean>
   ~~~

   

4. 扩展方式

   通过p命名空间和c命名空间进行注入

   ~~~xml
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns:p="http://www.springframework.org/schema/p"
          xmlns:c="http://www.springframework.org/schema/c"
          xsi:schemaLocation="http://www.springframework.org/schema/beans
           https://www.springframework.org/schema/beans/spring-beans.xsd">
   
       <!-- p命名空间注入，可以直接注入属性的值，property -->
       <bean id="user" class="com.joker_yue.pojo.User" p:name="Joker" p:age="18"/>
   
       <!-- c命名空间注入，通过构造器注入属性的值，constructor -->
       <bean id="user2" class="com.joker_yue.pojo.User" c:age="18" p:name="Joker"/>
   </beans>
   ~~~

   测试：

   ~~~java
   @Test
   public void testP(){
       ApplicationContext context = new ClassPathXmlApplicationContext("userBeans.xml");
       User user = context.getBean("user", User.class);
       System.out.println(user);
   }
   ~~~

   注意点：p命名空间和c命名空间不能直接使用，需要导入xml约束

   ~~~xml
   xmlns:p="http://www.springframework.org/schema/p"
   xmlns:c="http://www.springframework.org/schema/c"
   ~~~

   

#### Bean的作用域

---

| Scope                                                        | Description                                                  |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [singleton](https://docs.spring.io/spring-framework/docs/5.3.29/reference/html/core.html#beans-factory-scopes-singleton) | (Default) Scopes a single bean definition to a single object instance for each Spring IoC container. |
| [prototype](https://docs.spring.io/spring-framework/docs/5.3.29/reference/html/core.html#beans-factory-scopes-prototype) | Scopes a single bean definition to any number of object instances. |
| [request](https://docs.spring.io/spring-framework/docs/5.3.29/reference/html/core.html#beans-factory-scopes-request) | Scopes a single bean definition to the lifecycle of a single HTTP request. That is, each HTTP request has its own instance of a bean created off the back of a single bean definition. Only valid in the context of a web-aware Spring `ApplicationContext`. |
| [session](https://docs.spring.io/spring-framework/docs/5.3.29/reference/html/core.html#beans-factory-scopes-session) | Scopes a single bean definition to the lifecycle of an HTTP `Session`. Only valid in the context of a web-aware Spring `ApplicationContext`. |
| [application](https://docs.spring.io/spring-framework/docs/5.3.29/reference/html/core.html#beans-factory-scopes-application) | Scopes a single bean definition to the lifecycle of a `ServletContext`. Only valid in the context of a web-aware Spring `ApplicationContext`. |
| [websocket](https://docs.spring.io/spring-framework/docs/5.3.29/reference/html/web.html#websocket-stomp-websocket-scope) | Scopes a single bean definition to the lifecycle of a `WebSocket`. Only valid in the context of a web-aware Spring `ApplicationContext`. |

1. 单例模式singleton：默认，同一对象，在同一作用域中，只会存在一份

   ~~~xml
   <bean id="user2" class="com.joker_yue.pojo.User" c:age="18" c:name="Joker" scope="singleton"/>
   ~~~

2. 原型模式prototype：每次从容器中get的时候，都会产生一个新对象

   ~~~xml
   <bean id="user2" class="com.joker_yue.pojo.User" c:age="18" c:name="Joker" scope="prototype"/>
   ~~~

3. 其余的，request，session，application这几个只能在web开发中使用



#### Bean的自动装配

---

* 自动装配是Spirng满足bean依赖的一种方式
* Spring会在上下文中寻找，并自动给bean装配属性



Spring中有三种装配的方式

1. 在xml中显式配置
2. 在java中显示配置
3. 隐式的自动装配bean【重要的】

---

##### 背景

环境搭配

* 一个人有两个宠物

---

##### 自动装配

在之前，我们这样写beans.xml

  ~~~xml
  <bean id="dog" class="com.joker_yue.pojo.Dog"/>
  <bean id="cat" class="com.joker_yue.pojo.Cat"/>
  
  <bean id="people" class="com.joker_yue.pojo.People">
      <property name="dog" ref="dog"/>
      <property name="cat" ref="cat"/>
      <property name="name" value="Joker"/>
  </bean>
  
  ~~~



通过名称自动装配

  ~~~xml
  <bean id="dog" class="com.joker_yue.pojo.Dog"/>
  <bean id="cat" class="com.joker_yue.pojo.Cat"/>
  
  <!--
  byName:会自动查找容器上下文中，和自己对象set方法后面值对应的bean id
  setDog()、setCat()
  -->
  <bean id="people" class="com.joker_yue.pojo.People" autowire="byName">
      <property name="name" value="Joker"/>
  </bean>
  ~~~

* 这样做是错误的：

  ~~~xml
  <bean id="dog111" class="com.joker_yue.pojo.Dog"/>
  <bean id="cat222" class="com.joker_yue.pojo.Cat"/>
  <bean id="people" class="com.joker_yue.pojo.People" autowire="byName">
      <property name="name" value="Joker"/>
  </bean>
  ~~~

  

通过类型自动装配

  ~~~xml
  <bean id="dog" class="com.joker_yue.pojo.Dog"/>
  <bean id="cat" class="com.joker_yue.pojo.Cat"/>
  
  <!--
  byType: 会自动在容器上下文中查找，和自己对象属性类型相同的bean
  private com.joker_yue.pojo.Dog dog;
  private com.joker_yue.pojo.Cat cat;
  -->
  <bean id="people" class="com.joker_yue.pojo.People" autowire="byType">
      <property name="name" value="Joker"/>
  </bean>
  ~~~

* 这样做是正确的：

  ~~~xml
  <bean id="dog111" class="com.joker_yue.pojo.Dog"/>
  <bean id="cat222" class="com.joker_yue.pojo.Cat"/>
  
  <!--
  byType: 会自动在容器上下文中查找，和自己对象属性类型相同的bean
  private com.joker_yue.pojo.Dog dog;
  private com.joker_yue.pojo.Cat cat;
  -->
  <bean id="people" class="com.joker_yue.pojo.People" autowire="byType">
      <property name="name" value="Joker"/>
  </bean>
  ~~~

* 这样做是错误的

  ~~~xml
  <bean id="dog" class="com.joker_yue.pojo.Dog"/>
  <bean id="dog111" class="com.joker_yue.pojo.Dog"/>
  <bean id="cat" class="com.joker_yue.pojo.Cat"/>
  
  <!--
  byType: 会自动在容器上下文中查找，和自己对象属性类型相同的bean
  private com.joker_yue.pojo.Dog dog;
  private com.joker_yue.pojo.Cat cat;
  -->
  <bean id="people" class="com.joker_yue.pojo.People" autowire="byType">
      <property name="name" value="Joker"/>
  </bean>
  ~~~

  

---

##### 总结

* byName的时候，需要保证所有bean的ID唯一，并且这个bean需要和自动注入的属性的set方法的值一致
  * 如果`setDog()`，那么`<bean id="dog"    .../>`
* byType的时候，需要保证所有bean的class唯一，并且这个bean需要和自动注入的属性的类型一样
  * 如果在People类中`private Dog dog;`，那么`<bean ...   class="Dog"/>`



----

##### 使用注解实现自动装配

JDK从1.5支持注解，Spring从2.5开始支持注解实现自动装配

要使用注解须知：

1. 导入约束。context约束

2. ==配置注解的支持` <context:annotation-config/>`==

   ~~~xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
           https://www.springframework.org/schema/beans/spring-beans.xsd
           http://www.springframework.org/schema/context
           https://www.springframework.org/schema/context/spring-context.xsd">
   
       <context:annotation-config/>
   
   </beans>
   ~~~

   **@Autowired**

   直接在属性上使用即可，也可以在setter方法上使用

   使用Autowired之后就可以不用编写Set方法了，前提是自动装配的属性在IOC（Spring）容器中存在，且命名符合byName规范



其他：

  ~~~java
  @Nullable //字段标记了这个注解，说明这个字段可以为null
  ~~~

* 如果定义了如下

  ~~~java
  @Autowired (required = false)
  ~~~

  说明这个对象可以为null，否则不允许为空



如果@Atuowired自动装配的环境比较复杂，自动装配无法通过一个注解完成的时候 ，我们可以使用`@Qualifier(value="xxx")`去配合@Autowired的使用，指定唯一的一个bean对象注入。（比如有一个dog和一个dog222，你可以指定走dog222而不是dog）

~~~java
@Autowired
@Qualifier(value = "dog222")
private Dog dog;
@Autowired
@Qualifier(value = "cat111")
private Cat cat;
private String name;
~~~

~~~xml
<bean id="dog222" class="com.joker_yue.pojo.Dog"/>
<bean id="cat111" class="com.joker_yue.pojo.Cat"/>
~~~



@Resource注解

~~~java
public class People{
	@Resource(name="cat111")
    private Cat cat;
    
    @Resource
    private Dog dog;
    
}
~~~



小结：

* @Autowired和@Resource都是用来自动装配的，都可以放在属性字段上
* @Autowired通过byType实现，而且必须要求这个对象存在
* @Resource默认通过byName实现，如果找不到就通过byTpe实现，都找不到就报错





#### 使用注解开发

---

在Spring4之后，要使用注解开发，必须要保证AOP的包导入

<img src="./跟随狂神学Java-33.assets/image-20230726123723938.png" alt="image-20230726123723938" style="zoom:67%;" />

使用注解需要导入context约束，增加注解的支持（以下内容放在applicationContext.xml）

~~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">

    <context:annotation-config/>

</beans>
~~~~

---

##### Bean

你可以在类上标明注解`@Component`，表明这个类是一个组件，并且已经被Spring接管

~~~java
// Component注解
// 加了这个注解相当于<bean id="user" class="com.joker_yue.pojo.User">
@Component
public class User{}
~~~

你可以在成员上加`@Value`，则可以给其赋值

~~~java
/*相当于
    <bean id="user" class="com.joker_yue.pojo.User">
        <property name="name" value="joker"/>
    </bean>
*/
@Value("joker")
public String name;
~~~

当然，在Set方法上也是可以的

~~~java
@Value("joker")
public void setName(String name) {
    this.name = name;
}
~~~

---

##### 衍生的注解

`@Compoennt`有几个衍生的注解，我们在web开发中，会按照MVC三层架构分层

* dao 【@Repository】和`@Component`一样，都代表会被注册到Spring中，但是dao层我们习惯于使用`@Repository`
* service【@Service】
* controller【@Controller】

这四个注解功能一样，都是代表将某个类注册到Spring容器中，装配Bean

----

##### 自动装配注解

* @Autowired: 依赖注入
  * 如果Autowired注解不能唯一自动装配上属性，则需要使用@Qualifier(value = "xxx")
* @Nullable: 字段标记了这个注解，说明这个字段可以为null
* @Resource: 自动装配，通过名字，类型

---

##### 作用域注解

* @Scope("prototype")

---

##### 小结

xml与注解

* xml更加万能，适用于任何场合，维护更加方便
* 注解 不是自己的类使用不了，维护相对复杂

最佳实践

* xml用来管理注解
* 注解用来完成属性的注入
* 我们在使用的过程中，只需要让注解生效就可以了



#### 使用JavaConfig（注解）进行开发

---

也就是使用Java的方式配置Spring，完全不使用Spring的xml配置了，全交给Java来做

JavaConfig是Spring的一个子项目，在Spring4后，他成为了一个核心功能



代码：

* User.java

  ~~~java
  package com.joker_yue.pojo;
  
  import org.springframework.beans.factory.annotation.Value;
  import org.springframework.stereotype.Component;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/26 13:16
   */
  // @Component注解表明一个类会作为组件类，并告知Spring要为这个类创建bean。
  @Component
  public class User {
      @Value("joker")
      private String name;
  
      public String getName() {
          return name;
      }
  
      public void setName(String name) {
          this.name = name;
      }
  
      @Override
      public String toString() {
          return "User{" +
                  "name='" + name + '\'' +
                  '}';
      }
  }
  ~~~

* JokerConfig.java。作用相当于applicationContext.xml

  ~~~java
  package com.joker_yue.config;
  
  import com.joker_yue.pojo.User;
  import org.springframework.context.annotation.Bean;
  import org.springframework.context.annotation.ComponentScan;
  import org.springframework.context.annotation.Configuration;
  import org.springframework.context.annotation.Import;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/26 14:50
   */
  
  // 相当于<bean id="config" class="com.joker_yue.config.JokerConfig">
  // @Configuration 也会被Spring容器托管，注册到容器中，因为它本来就是一个@Component
  // @Configuration 代表这个一个配置类，就和我们之前看的beans.xml一样
  @Configuration
  @ComponentScan("com.joker_yue.pojo")
  @Import(com.joker_yue.config.JokerConfig2.class)
  public class JokerConfig {
  
      // 注册一个bean，就相当于我们之前写的一个bean标签
      // 这个方法的名字，就相当于bean标签中id的属性
      // 这个方法的返回值，就相当于bean标签中class的属性
      @Bean
      public User getUser(){
          return new User();  // 就是要返回要注入到bean的对象
      }
  }
  ~~~

  ~~~java
  package com.joker_yue.config;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/26 15:07
   */
  public class JokerConfig2 {
  
  }
  ~~~

* Test

  ~~~java
  import com.joker_yue.config.JokerConfig;
  import com.joker_yue.pojo.User;
  import org.springframework.context.ApplicationContext;
  import org.springframework.context.annotation.AnnotationConfigApplicationContext;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/26 14:53
   */
  public class MyTest {
      public static void main(String[] args) {
          // 如果完全使用了配置类，我们就只能通过AnnotationConfig上下文来获取容器，通过配置类的class对象加载
          ApplicationContext context = new AnnotationConfigApplicationContext(JokerConfig.class);
          User user = (User) context.getBean("getUser");
          System.out.println(user);
      }
  }
  ~~~

在SpringBoot中，这种纯Java的配置方式随处可见



#### 代理模式

---

为什么要学习代理模式？

* 因为这就是Spring AOP的底层实现
* 【Spring AOP 和 Spring MVC】

代理模式的分类：

* 23种设计模式之一
* 静态代理
* 动态代理

![image-20230726152802221](./跟随狂神学Java-33.assets/image-20230726152802221.png)

---

##### 静态代理

角色分析：

* 抽象角色：一般会使用接口或者抽象类来实现

* 真实角色：被代理的角色

* 代理角色：代理真实角色，我们一般会做一些附属操作，

  比如中介去收房租，婚介去收钱

* 客户：访问代理对象的人



一个例子：

* 中介所里不只有一个房东，而每次你要找房只需要让中介所提供一位房东即可，然后中介所让房东给你提供房子的信息

* 代码：

  1. 接口：

     ~~~java
     package com.joker_yue.demo01;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/7/26 15:34
      */
     
     //租房的接口
     public interface Rent {
         public void rent();
     }
     ~~~

  2. 真实角色

     ~~~java
     package com.joker_yue.demo01;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/7/26 15:34
      */
     // 房东
     public class Host implements Rent {
     
         @Override
         public void rent() {
             System.out.println("房东要出租房子");
         }
     }
     ~~~

  3. 代理角色

     ~~~java
     package com.joker_yue.demo01;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/7/26 15:36
      */
     public class Proxy implements Rent {
         private Host host;
     
         public Proxy() {
         }
     
         public Proxy(Host host) {
             this.host = host;
         }
     
         @Override
         public void rent() {
             // 通过房东来实现租房
             host.rent();
         }
     }
     ~~~

  4. 客户端访问代理角色

     ~~~java
     package com.joker_yue.demo01;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/7/26 15:35
      */
     public class Client {
         public static void main(String[] args) {
             Host host = new Host();
     
             // 代理房东
             Proxy proxy = new Proxy(host);
             proxy.rent();
     
         }
     }
     ~~~

* 当然，中介不可能只帮你租房子，他可能还会收中介费啥的

  代码：

  ~~~java
  package com.joker_yue.demo01;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/26 15:36
   */
  public class Proxy implements Rent {
      private Host host;
  
      public Proxy() {
      }
  
      public Proxy(Host host) {
          this.host = host;
      }
  
      @Override
      public void rent() {
          // 通过房东来实现租房
          host.rent();
  
          this.fare();
          this.seeHouse();
          this.sign();
      }
  
      // 看房子
      public void seeHouse(){
          System.out.println("中介带你看房子");
      }
      // 收中介费
      public void fare(){
          System.out.println("收中介费");
      }
      // 签合同
      public void sign(){
          System.out.println("签合同");
      }
  }
  ~~~

  ~~~java
  package com.joker_yue.demo01;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/26 15:35
   */
  public class Client {
      public static void main(String[] args) {
  
          // 房东要租房子
          Host host = new Host();
  
          // 代理，中介帮房东租房子，但是中介（代理角色）一般会有一些附属操作
          Proxy proxy = new Proxy(host);
  
          // 你找中介租房，不用面对房东，直接找中介租房即可
          proxy.rent();
  
      }
  }
  ~~~



代理模式的好处：

* 可以使真实角色的操作更加纯粹，不用去关注一些公共的业务
* 公共业务也就交给了代理角色，实现了业务的分工
* 公共业务发生拓展的时候，方便集中管理

缺点：

* 一个真实角色就会产生一个代理角色，代码量会翻倍，开发效率会变低

---

##### 加深理解

 聊聊AOP![image-20230726161012122](./跟随狂神学Java-33.assets/image-20230726161012122.png)

现在有一套业务

* UserService接口

  ~~~java
  package com.joker_yue.demo02;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/26 15:54
   */
  public interface UserService {
      public void add();
      public void delete();
      public void update();
      public void query();
  }
  ~~~

* UserServiceImpl.java

  ~~~java
  package com.joker_yue.demo02;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/26 15:56
   */
  
  // 真实对象
  public class UserServiceImpl implements UserService {
  
      @Override
      public void add() {
          System.out.println("增加了一个用户");
      }
  
      @Override
      public void delete() {
          System.out.println("删除了一个用户");
      }
  
      @Override
      public void update() {
          System.out.println("修改了一个用户");
      }
  
      @Override
      public void query() {
          System.out.println("查询了一个用户");
      }
  }
  ~~~

* Client.java

  ~~~java
  package com.joker_yue.demo02;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/26 15:58
   */
  public class Client {
      public static void main(String[] args) {
          UserServiceImpl userService = new UserServiceImpl();
          userService .add();
      }
  }
  
  ~~~

现在希望每次调用接口中的方法都打印一行log，但是不能改动原有的（UserService, UserServiceImpl）代码。我们可以使用代理

* UserServiceProxy.java

  ~~~java
  package com.joker_yue.demo02;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/26 16:02
   */
  public class UserServiceProxy implements UserService {
  
      private UserService userService;
  
      public void setUserService(UserService userService) {
          this.userService = userService;
      }
  
      @Override
      public void add() {
          log("add");
          userService.add();
      }
  
      @Override
      public void delete() {
          log("delete");
          userService.delete();
      }
  
      @Override
      public void update() {
          log("update");
          userService.update();
      }
  
      @Override
      public void query() {
          log("query");
          userService.query();
      }
  
  
      // 日志方法
      public void log(String msg) {
          System.out.println("[Debug] 使用了" + msg + "方法");
  
      }
  }
  ~~~

* Client.java

  ~~~java
  package com.joker_yue.demo02;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/26 15:58
   */
  public class Client {
      public static void main(String[] args) {
          UserServiceImpl userService = new UserServiceImpl();
  
          UserServiceProxy proxy = new UserServiceProxy();
          proxy.setUserService(userService);
  
          proxy .add();
      }
  }
  ~~~

---

##### 动态代理

* 动态代理和静态代理角色一样
* 动态代理的代理类是动态生成的，不是我们直接写好的 
* 动态代理分为两大类，基于接口的动态代理；基于类的动态代理
  * 基于接口：JDK 动态代理【学习这个】
  * 基于类：cglib
  * Java字节码实现：javasist

需要了解两个类：Proxy：代理，InvocationHandler：调用处理程序



动态代理的好处：

* 可以使真实角色的操作更加纯粹，不用去关注一些公共的业务
* 公共业务也就交给了代理角色，实现了业务的分工
* 公共业务发生拓展的时候，方便集中管理
* 一个动态代理类代理的是一个接口，一般就是对应一类业务
* 一个动态代理类可以代理多个类，只要是实现了一个接口即可



~~~java
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 * @author Joker
 * @version 1.0
 * @date 2023/7/26 16:31
 */

// 一会通过这个类自动生成代理类
public class ProxyInvocationHandler implements InvocationHandler {

    /*
      InvocationHandler handler = new MyInvocationHandler(...);
     Class<?> proxyClass = Proxy.getProxyClass(Foo.class.getClassLoader(), Foo.class);
     Foo f = (Foo) proxyClass.getConstructor(InvocationHandler.class).
                     newInstance(handler);
     */

    // 被代理的接口
    private Object target;

    public void setTarget(Object target) {
        this.target = target;
    }

    // 生成得到代理类
    public Object getProxy( ) {
        return Proxy.newProxyInstance(this.getClass().getClassLoader(),
                target.getClass().getInterfaces(), this);
    }

    // 处理代理示例，并返回结果
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // 动态代理的本质，就是使用反射机制实现
        Object result = method.invoke(target, args);

        return result;
    }

}

~~~





#### AOP

---

##### 什么是AOP

* AOP（Aspect Oriented Programming，面向切面编程）是一种编程范式，用于将程序中的横切关注点与核心业务逻辑分离，从而使得代码更加模块化、可重用和易于维护。横切关注点是指那些与核心业务逻辑无关，但是在程序中需要被处理的一些问题，例如日志记录、事务管理、安全控制等。AOP通过将这些横切关注点抽象成切面（Aspect），并将它们与核心业务逻辑进行解耦，从而实现了代码的分层和模块化。

* 在AOP中，切面是一个横跨多个对象的关注点，它可以包含一些通用的代码，例如日志记录、异常处理、事务管理等。切面可以通过一些特定的注解或配置来定义，然后在程序运行时自动地将切面织入到核心业务逻辑中。这样，当程序执行到某个切点（Join Point）时，切面就会被自动地执行，从而实现了横切关注点的处理。
* AOP是一种非常重要的编程范式，它可以帮助开发人员更好地管理和维护程序，提高代码的可读性、可维护性和可重用性。在Java开发中，Spring框架提供了强大的AOP支持，可以帮助开发人员轻松地实现AOP编程，从而提高程序的质量和效率。

---

##### AOP在Spring中的作用

**==提供声明式事务；允许用户自定义切面==**

* 横切关注点：跨越应用程序多个模块的方法或功能。即是，与我们业务逻辑无关的，但是我们需要关注的是部分，就是横切关注点。如日志，安全，缓存，事务等等...
* 切面 (ASPECT) ：横切关注点被模块化的特殊对象。即，它是一个类。（比如Log类）
* 通知 (Advice)：切面必须要完成的工作。即，它是类中的一个方法。（比如Log类中的方法）
* 目标 (Target)：被通知对象。（一个接口或者一个方法）
* 代理 (Proxy)：向目标对象应用通知之后创建的对象。（代理类）
* 切入点 (PointCut) ：切面通知执行的"地点"的定义。
* 连接点 (JointPoint) ：与切入点匹配的执行点。



![image-20230726171723526](./跟随狂神学Java-33.assets/image-20230726171723526.png)

SpringAOP中，通过Advice定义横切逻辑，Spring中支持5种类型的Advice：

![image-20230726172331311](./跟随狂神学Java-33.assets/image-20230726172331311.png)

即AOP 在 不改变原有代码的情况下，去增加新的功能

---

##### 使用Spring实现AOP

【重点】使用AOP织入，需要导入一个依赖包

~~~xml
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.6</version>
</dependency>
~~~



**方式一：使用Spring的接口【主要SpringAPI接口实现】**

操作：需要两个类，并在xml中配置

* UserService.java

  ~~~java
  package com.joker_yue.service;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/26 17:27
   */
  public interface UserService {
      public void add();
      public void delete();
      public void update();
      public void select();
  }
  ~~~

* UserServiceImpl.java

  ~~~java\
  package com.joker_yue.service;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/26 17:28
   */
  public class UserServiceImpl implements UserService {
  
      @Override
      public void add() {
          System.out.println("增加了一个用户");
      }
  
      @Override
      public void delete() {
          System.out.println("删除了一个用户");
      }
  
      @Override
      public void update() {
          System.out.println("修改了一个用户");
      }
  
      @Override
      public void select() {
          System.out.println("查询了一个用户");
      }
  }
  ~~~

* Log.java

  ~~~java
  package com.joker_yue.log;
  
  import org.springframework.aop.MethodBeforeAdvice;
  
  import java.lang.reflect.Method;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/26 17:29
   */
  public class Log implements MethodBeforeAdvice {
      // method：要执行的目标对象的方法
      // args：目标对象方法的参数
      // target：目标对象
      @Override
      public void before(Method method, Object[] args, Object target) throws Throwable {
          System.out.println(target.getClass().getName()+"的"+method.getName()+"被执行...");
      }
  }
  ~~~

* AfterLog.java

  ~~~java
  package com.joker_yue.log;
  
  import org.springframework.aop.AfterReturningAdvice;
  
  import java.lang.reflect.Method;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/26 17:32
   */
  public class AfterLog implements AfterReturningAdvice {
      // returnValue：目标对象方法的返回值
      @Override
      public void afterReturning(Object returnValue, Method method, Object[] args, Object target) throws Throwable {
          System.out.println("执行了"+method.getName()+"方法，返回结果为"+returnValue);
      }
  }
  ~~~

* applicationContext.java

  ~~~java
  <?xml version="1.0" encoding="UTF-8"?>
  <beans xmlns="http://www.springframework.org/schema/beans"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns:context="http://www.springframework.org/schema/context"
         xmlns:aop="http://www.springframework.org/schema/aop"
         xsi:schemaLocation="http://www.springframework.org/schema/beans
          https://www.springframework.org/schema/beans/spring-beans.xsd
          http://www.springframework.org/schema/context
          https://www.springframework.org/schema/context/spring-context.xsd
          http://www.springframework.org/schema/aop
          https://www.springframework.org/schema/aop/spring-aop.xsd">
  
      <context:annotation-config/>
  
      <!-- 注册bean -->
      <bean id="userService" class="com.joker_yue.service.UserServiceImpl"/>
      <bean id="log" class="com.joker_yue.log.Log"/>
      <bean id="afterLog" class="com.joker_yue.log.AfterLog"/>
  
      <!-- 方式1，使用原生的API接口 -->
      <!-- 配置aop：需要导入AOP的约束 -->
      <aop:config>
          <!-- 切入点：pointcut，表达式：expression，execution(要执行的位置！* * *） -->
          <aop:pointcut id="piontcut" expression="execution(* com.joker_yue.service.*.*(..))"/>
  
          <!--  执行环绕    -->
          <aop:advisor advice-ref="afterLog" pointcut-ref="piontcut"/>
          <aop:advisor advice-ref="log" pointcut-ref="piontcut"/>
      </aop:config>
  </beans>
  ~~~

* Test

  ~~~java
  import com.joker_yue.service.UserService;
  import org.springframework.context.ApplicationContext;
  import org.springframework.context.support.ClassPathXmlApplicationContext;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/26 21:20
   */
  public class MyTest {
      public static void main(String[] args) {
          ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
  
          // 动态代理的是接口:注意点
          UserService userService =(UserService) context.getBean("userService");
  
          userService.add();
  
  
      }
  }
  ~~~

  

  

**方式二：自定义类【主要是切面定义】**

操作：只需要一个类的两个方法，需要在xml中配置

* execution表达式：

  ~~~xml
  execution(* com.sample.service.impl..*.*(..))
  ~~~

  

  **解释如下：**

  | **符号**                    | **含义**                                                 |
  | --------------------------- | -------------------------------------------------------- |
  | **execution（） **          | **表达式的主体； **                                      |
  | **第一个”\*“符号**          | **表示返回值的类型任意； **                              |
  | **com.sample.service.impl** | **AOP所切的服务的包名，即，我们的业务部分**              |
  | **包名后面的”..“**          | **表示当前包及子包**                                     |
  | **第二个”\*“**              | **表示类名，\*即所有类。此处可以自定义，下文有举例**     |
  | **.\*(..)**                 | **表示任何方法名，括号表示参数，两个点表示任何参数类型** |

* 代码

  * DIYPointCut.java

    ~~~java
    package com.joker_yue.diy;
    
    /**
     * @author Joker
     * @version 1.0
     * @date 2023/7/27 14:36
     */
    public class DIYPointCut {
        public void before(){
            System.out.println("==========方法执行前=========");
        }
        public void after(){
            System.out.println("==========方法执行后=========");
        }
    }
    
    ~~~

  * applicationContext.xml

    ~~~xml
    <!-- 注册bean -->
    <bean id="userService" class="com.joker_yue.service.UserServiceImpl"/>
    
    <!--   方式2，自定义类   -->
    <bean id="diy" class="com.joker_yue.diy.DIYPointCut"/>
        <aop:config>
            <!-- 自定义切面，ref要引用的类 -->
            <aop:aspect ref="diy">
            <!--   切入点   -->
                <aop:pointcut id="pointcut" expression="execution(* com.joker_yue.service.UserServiceImpl.*(..))"/>
            <!--   通知   -->
                <aop:before method="before" pointcut-ref="pointcut"/>
                <aop:after method="after" pointcut-ref="pointcut"/>
            </aop:aspect>
        </aop:config>
    ~~~

  * Test

    （没改）



**方式三：通过注解实现**

操作：需要一个类，在xml中开启注解支持

代码：

* AnnotationPointCut.java

  ~~~java
  package com.joker_yue.diy;
  
  import org.aspectj.lang.ProceedingJoinPoint;
  import org.aspectj.lang.annotation.After;
  import org.aspectj.lang.annotation.Around;
  import org.aspectj.lang.annotation.Aspect;
  import org.aspectj.lang.annotation.Before;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/27 15:48
   */
  @Aspect // 标记此类为切面
  public class AnnotationPointCut {
  
      @Before("execution(* com.joker_yue.service.UserServiceImpl.*(..))")
      public void before(){
          System.out.println("==========方法执行前=========");
      }
      @After("execution(* com.joker_yue.service.UserServiceImpl.*(..))")
      public void after(){
          System.out.println("==========方法执行后=========");
      }
  
      // 在环绕增强中，我们可以给定一个参数，代表我们要获取处理切入的点
      @Around("execution(* com.joker_yue.service.UserServiceImpl.*(..))")
      public void around(ProceedingJoinPoint jp) throws Throwable {
          System.out.println("==========环绕前=========");
  
          // 执行方法
          Object proceed = jp.proceed();
  
          System.out.println("==========环绕后=========");
      }
  }
  
  ~~~

* applicationcontext.xml

  ~~~xml
  <!-- 注册bean -->
  <bean id="userService" class="com.joker_yue.service.UserServiceImpl"/>
  
  <!-- 方式三，通过注解 -->
  <bean id="annotationPointCut" class="com.joker_yue.diy.AnnotationPointCut"/>
  <!-- 开启注解支持！ JDK（默认proxy-target-class="false"），填写true时使用cglib -->
  <aop:aspectj-autoproxy/>
  ~~~

注意：使用环绕执行时，需要传递参数，参数类型为`ProceedingJoinPoint`。同时，环绕执行相当于过滤器



#### 整合Mybatis

---

##### 回忆Mybatis

1. 编写实体类
2. 编写核心配置文件
3. 编写接口
4. 编写Mapper.xml
5. 测试

---

##### Mybatis-Spring

什么是Mybatis-Spring？

* MyBatis-Spring 会帮助你将 MyBatis 代码无缝地整合到 Spring 中。它将允许 MyBatis 参与到 Spring 的事务管理之中，创建映射器 mapper 和 `SqlSession` 并注入到 bean 中，以及将 Mybatis 的异常转换为 Spring 的 `DataAccessException`。 最终，可以做到应用代码不依赖于 MyBatis，Spring 或 MyBatis-Spring。

在整合之前得把Mybatis那部分写好

* 接口 UserMapper.java

  ~~~java
  package com.joker_yue.mapper;
  
  import com.joker_yue.pojo.User;
  
  import java.util.List;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/27 16:38
   */
  public interface UserMapper {
      public List<User> selectUser();
  }
  ~~~

* Mapper UserMapper.xml

  ~~~xml
  <?xml version="1.0" encoding="UTF-8" ?>
  <!DOCTYPE mapper
          PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
          "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
  <mapper namespace="com.joker_yue.mapper.UserMapper">
      <select id="selectUser"  resultType="com.joker_yue.pojo.User">
          select * from user
      </select>
  </mapper>
  ~~~

  

---

##### 整合方式一：通过xml 

![image-20230728111053615](./跟随狂神学Java-33.assets/image-20230728111053615.png)

官方文档说明：

* 要创建工厂 bean，将下面的代码放到 Spring 的 XML 配置文件中：

  ```xml
  <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource" />
  </bean>
  ```

* `SqlSessionFactory` 有一个唯一的必要属性：用于 JDBC 的 `DataSource`。这可以是任意的 `DataSource` 对象，它的配置方法和其它 Spring 数据库连接是一样的。

* `SqlSessionTemplate` 是 MyBatis-Spring 的核心。作为 `SqlSession` 的一个实现，这意味着可以使用它无缝代替你代码中已经在使用的 `SqlSession`。 `SqlSessionTemplate` 是线程安全的，可以被多个 DAO 或映射器所共享使用。

* 可以使用 `SqlSessionFactory` 作为构造方法的参数来创建 `SqlSessionTemplate` 对象。

  ```xml
  <bean id="sqlSession" class="org.mybatis.spring.SqlSessionTemplate">
    <constructor-arg index="0" ref="sqlSessionFactory" />
  </bean>
  ```



步骤：

1. 编写数据源

   ~~~xml
   <!-- DataSource: 使用Spring的数据源替换Mybatis的配置 c3p0 dbcp druid
       我们这里使用Spring提供的JDBC：org.springframework.jdbc.datasource.DriverManagerDataSource
   -->
   <bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
       <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"/>
       <property name="url" value="jdbc:mysql://localhost:3306/mybatis?useSSL=true&amp;useUnicode=true&amp;characterEncoding=UTF-8"/>
       <property name="username" value="root"/>
       <property name="password" value="root"/>
   </bean>
   ~~~

2. sqlSessionFactory

   ~~~xml
   <!-- sqlSessionFactory -->
   <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
       <property name="dataSource" ref="dataSource"/>
       <!-- 绑定Mybatis配置文件 -->
       <property name="configLocation" value="classpath:mybatis-config.xml"/>
       <property name="mapperLocations" value="classpath:com/joker_yue/mapper/*.xml"/>
   </bean>
   ~~~

3. sqlSessionTemplate

   ~~~xml
   <!-- sqlSessionTemplate：就是我们使用的SqlSession ，就不需要SqlSessionFactoryBuilder和SqlSessionFactory了-->
   <!-- 步骤：
        1. 通过sqlSession生成sqlSession
        2. 通过唯一的构造方法把sqlSessionFactory传进去-->
   <bean id="sqlSession" class="org.mybatis.spring.SqlSessionTemplate">
       <!-- 只能使用构造器注入sqlSessionFactory，因为它没有set方法 -->
       <constructor-arg index="0" ref="sqlSessionFactory"/>
   </bean>
   ~~~

4. 需要给接口加实现类

   接口：

   ~~~java
   package com.joker_yue.mapper;
   
   import com.joker_yue.pojo.User;
   
   import java.util.List;
   
   /**
    * @author Joker
    * @version 1.0
    * @date 2023/7/27 16:38
    */
   public interface UserMapper {
       public List<User> selectUser();
   }
   ~~~

   实现类：

   ~~~java
   package com.joker_yue.mapper;
   
   import com.joker_yue.pojo.User;
   import org.mybatis.spring.SqlSessionTemplate;
   
   import java.util.List;
   
   /**
    * @author Joker
    * @version 1.0
    * @date 2023/7/27 17:34
    */
   public class UserMapperImpl implements UserMapper{
       // 我们的所有操作，在原来都是用sqlSession来执行，在原来。现在都使用SqlSessionTemplate
       private SqlSessionTemplate sqlSession;
   
       public void setSqlSession(SqlSessionTemplate sqlSession) {
           this.sqlSession = sqlSession;
       }
   
       @Override
       public List<User> selectUser() {
           UserMapper mapper = sqlSession.getMapper(UserMapper.class);
           return mapper.selectUser();
       }
   }
   ~~~

5. 将自己写的实现类，注入到Spring中

   ~~~xml
   <bean id="userMapper" class="com.joker_yue.mapper.UserMapperImpl">
       <property name="sqlSession" ref="sqlSession"/>
   </bean>
   ~~~



---

##### 整合方式二：通过继承SqlSessionDaoSupport类直接获得SqlSession

![image-20230728112449887](./跟随狂神学Java-33.assets/image-20230728112449887.png)

代码：

* UserMapperImpl2.java

  ~~~java
  package com.joker_yue.mapper;
  
  import com.joker_yue.pojo.User;
  import org.apache.ibatis.session.SqlSession;
  import org.mybatis.spring.support.SqlSessionDaoSupport;
  
  import java.util.List;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/28 11:12
   */
  public class UserMapperImpl2 extends SqlSessionDaoSupport implements UserMapper {
      @Override
      public List<User> selectUser() {
          SqlSession sqlSession = getSqlSession();
          UserMapper mapper = sqlSession.getMapper(UserMapper.class);
          return mapper.selectUser();
      }
  }
  ~~~

* applicationContext.xml

  ~~~xml
  <bean id="userMapper2" class="com.joker_yue.mapper.UserMapperImpl2">
      <property name="sqlSessionFactory" ref="sqlSessionFactory"/>
  </bean>
  ~~~



#### Spring声明式事务

----

##### 回顾事务

* 把一组业务当成一个业务来做。要么都成功，要么都失败
* 事务在项目开发中十分重要，涉及到数据一致性问题，不得马虎
* 确保完整性和一致性



事务的ACID原则

* 原子性
* 一致性
* 隔离性
  * 多个业务可能操作同一个资源，确保其操作时互相隔离，不hi影响数据的正确性，防止数据损坏
* 持久性
  * 事务一旦提交，无论系统发生什么问题，结果都不会再被影响，被持久化的写到存储器中

---

##### Spring中的事务管理

* 声明式事务：AOP
* 编程式事务：需要在代码中，进行事务的管理

事务可选项

| propagation属性 | 事务属性-传播行为                               | 含义                                                         |
| --------------- | ----------------------------------------------- | ------------------------------------------------------------ |
| REQUIRED        | TransactionDefinition.PROPAGATION_REQUIRED      | 如果当前没有事务，就新建一个事务，如果已经存在一个事务，则加入到这个事务中。这是最常见的选择。 |
| SUPPORTS        | TransactionDefinition.PROPAGATION_SUPPORTS      | 支持当前事务，如果当前没有事务，就以非事务方式执行。         |
| MANDATORY       | TransactionDefinition.PROPAGATION_MANDATORY     | 表示该方法必须在事务中运行，如果当前事务不存在，则会抛出一个异常。 |
| REQUIRES_NEW    | TransactionDefinition.PROPAGATION_REQUIRES_NEW  | 表示当前方法必须运行在它自己的事务中。一个新的事务将被启动。如果存在当前事务，在该方法执行期间，当前事务会被挂起。 |
| NOT_SUPPORTED   | TransactionDefinition.PROPAGATION_NOT_SUPPORTED | 表示该方法不应该运行在事务中。如果当前存在事务，就把当前事务挂起。 |
| NEVER           | TransactionDefinition.PROPAGATION_NEVER         | 表示当前方法不应该运行在事务上下文中。如果当前正有一个事务在运行，则会抛出异常。 |
| NESTED          | TransactionDefinition.PROPAGATION_NESTED        | 如果当前存在事务，则在嵌套事务内执行。如果当前没有事务，则执行与PROPAGATION_REQUIRED类似的操作。 |

思考：为什么需要事务？

* 如果不配置事务，可能存在数据提交不一致的情况
* 如果不在Spring中配置声明式事务，就需要在代码中手动配置
* 事务在项目的开发中十分重要，涉及到数据的一致性和完整性的问题，不容马虎



步骤：

1. 导入命名空间：tx、AOP

   ~~~xml
   <beans 
   xmlns:tx="http://www.springframework.org/schema/tx"
   xmlns:aop="http://www.springframework.org/schema/aop"
   
   xsi:schemaLocation="http://www.springframework.org/schema/tx
   http://www.springframework.org/schema/tx/spring-tx.xsd
   http://www.springframework.org/schema/aop
   https://www.springframework.org/schema/aop/spring-aop.xsd"/>
   
   
       <!-- AOP织入 -->
       <aop:aspectj-autoproxy/>
   ~~~

2. 配置事务

   ~~~xml
   
   <!--   配置声明式事务   -->
   <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
       <property name="dataSource" ref="dataSource"/>
   </bean>
   
   <!--   结合AOP实现事务的织入   -->
   <!--   配置事务的类   -->
   <tx:advice id="txAdvice" transaction-manager="transactionManager">
       <!-- 给哪些方法配置事务，配置事务的传播特性：propagation -->
       <tx:attributes>
           <tx:method name="add" propagation="REQUIRED"/>
           <tx:method name="delete" propagation="REQUIRED"/>
           <tx:method name="update" propagation="REQUIRED"/>
           <tx:method name="query" read-only="true"/>
           <tx:method name="*" propagation="REQUIRED"/>
       </tx:attributes>
   </tx:advice>
   
   <!--   配置事务切入   -->
   <aop:config>
       <aop:pointcut id="txPointCut" expression="execution(* com.joker_yue.mapper.*.*(..))"/>
       <aop:advisor advice-ref="txAdvice" pointcut-ref="txPointCut"/>
   </aop:config>
   
   ~~~

   