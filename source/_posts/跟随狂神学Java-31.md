---
title: 跟随狂神学Java-31，JavaWeb
date: 2023/07/19 04:02:22
tags:
  - Java
  - 狂神
  - JavaWeb
  - 必看
categories:
  - [跟随狂神学Java]
  - [必看]
  - [技术]
  - [Java]
cover: https://resource.joker2yue.top/blog/images/coverImg/JavaWeb/01.webp
keywords:
  - JavaWeb
  - 基本概念
  - Web应用程序
  - 静态Web
  - 动态Web
  - Web服务器
  - HTTP协议
  - Maven
  - Servlet
  - JSP
  - JavaBean
  - MVC三层架构
  - MVC
  - 过滤器
  - 监听器
  - JDBC
  - SMBMS
ai:
  - 这篇文章介绍了MySQL数据库的基本概念、连接方法和数据操作语言。
  - 文章详细介绍了MySQL数据库，包括数据库类型、数据类型、字段属性、表的创建和修改，以及数据操作语言的使用。
  - 这篇文章介绍了JavaWeb开发的基本概念和一些关键技术，包括静态和动态web、Web服务器、HTTP协议、Maven项目管理工具、Servlet、JSP、JavaBean、MVC三层架构、过滤器、监听器、JDBC数据库连接、以及一个SMBMS项目的搭建和实现。文章主要围绕如何构建Web应用程序展开，涵盖了从前端到后端的多个方面的知识点。
---
# 跟随狂神学Java

**第三十一：JavaWeb**

> "真正的危险不是计算机开始像人一样思考，而是人开始像计算机一样思考。" 
>
> [【狂神说Java】JavaWeb入门到实战_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV12J411M7Sj/?vd_source=814489e71df641c4b2c0ff7d4659b2d0)



#### 基本概念

---

* web开发
  * web，网页的意思
  * 静态web
    * html，css
    * 提供给所有人看的数据，始终不会发生变化
  * 动态web
    * 会发生变化。每个人在不同时间，不同地点 看到的信息各不相同
    * 常用的技术栈，servlet/JSP，ASP，PHP

在Java中，动态资源开发的技术统称为JavaWeb



---

##### web应用程序

可以提供浏览器访问的程序

* a.html , b.html...多个web资源，这些web资源可以被外界访问，对外界提供服务
* 能访问到任何一个页面或者资源，都存在于这个世界一台计算机上
* URL
* 这个统一的web资源会被放在同一个文件夹下，web应用程序-->Tomcat服务器
* 一个web应用由多个部分组成（静态web，动态web）
  * html,css,js
  * jsp,servlet
  * Java程序
  * jar包
  * 配置文件(properties)

web应用程序编写完毕后，若想提供给外界访问，需要一个服务器来统一管理



---

##### 静态web

* `*.html`，`*.htm`是网页后缀

  ![image-20230706142840033](./跟随狂神学Java-31.assets/image-20230706142840033.png)

* 静态 web 存在的缺点

  *  Web 页面无法动态更新 ， 所有用户看到都是同一个页面 
    * 轮播图 ， 点击特效 ： 伪动态
    *  JavaScript [ 实际开发中 ， 它用的最多 ]
    * VBScript
  * 无法和数据库交互（数据无法



---

##### 动态web

页面会动态展示，web页面展示的效果因人而异

![image-20230706153238486](./跟随狂神学Java-31.assets/image-20230706153238486.png)

* 加入服务器的动态 web 资源出现了错误 ， 我们需要重新编写我们的后台程序，重新发布
  * 停机维护
* Web 页面可以动态更新 ， 所有用户看到不是同一个页面
* 它可以和数据库交互

![image-20230706154148093](./跟随狂神学Java-31.assets/image-20230706154148093.png)





#### Web服务器

---

##### 常见的Web服务器

**ASP**

* 微软：国内最早流行的是ASP
* 在HTML中嵌入了VB的脚本，ASP+COM
* 在ASP开发中，基本一个页面都有几千行代码，很混乱
* C#
* IIS

**php**

* 开发速度快，功能强大，跨平台，代码简单
* 无法承载大访问量

**JSP/Servlet**

* B/S：浏览器和服务器
* C/S：客户端和服务端

* Sun公司主推的B/S架构
* 基于Java语言的（所有的大公司，或者一些开源的组件，都是用的Java写的）
* 可以承载三高问题（三高：高并发，高可用，高性能）



服务器是一种被动的 操作，用来处理用户的一些请求和给用户一些响应信息



**IIS**

* 微软的，跑ASP，windows自带的

**Tomcat**

* Tomcat是由Apache软件基金会属下Jakarta项目开发的Servlet容器，按照Sun Microsystems提供的技术规范，实现了对Servlet和JavaServer Page（JSP）的支持，并提供了作为Web服务器的一些特有功能，如Tomcat管理和控制平台、安全局管理和Tomcat阀等。由于Tomcat本身也内含了HTTP服务器，因此也可以视作单独的Web服务器。但是，不能将Tomcat和Apache HTTP服务器混淆，Apache HTTP服务器是用C语言实现的HTTPWeb服务器；这两个HTTP web server不是捆绑在一起的。Apache Tomcat包含了配置管理工具，也可以通过编辑XML格式的配置文件来进行配置。



---

##### 请你谈谈网站是如何进行访问的 

1. 输入一个域名 ； 回车

2. 检直本机的 C:\Window s\System32\drivers\etc\hosts 配置文件下有没有这个域名映射

   1. 有 ： 直接返回对应的 ip 地址， 这个地址中 ， 有我们需要访问的 web 程序 ， 可以直接访问
      ~~~javascript
      127.0.0.1 		www.baidu.com
      ~~~

   2. 没有：去 DNS 服务器找， 找到的话就返回 ， 找不到就返回找不到 

      ![image-20230706160139941](./跟随狂神学Java-31.assets/image-20230706160139941.png)

   3. 配置环境变量





#### HTTP协议

---

##### 概念：

* 超文本传输协议（英语：HyperText Transfer Protocol，缩写：HTTP）是一种用于分布式、协作式和超媒体信息系统的应用层协议。HTTP是万维网的数据通信的基础。
* 设计HTTP最初的目的是为了提供一种发布和接收HTML页面的方法。通过HTTP或者HTTPS协议请求的资源由统一资源标识符（Uniform Resource Identifiers，URI）来标识。
* HTTP的发展是由蒂姆·伯纳斯-李于1989年在欧洲核子研究组织（CERN）所发起。HTTP的标准制定由万维网协会（World Wide Web Consortium，W3C）和互联网工程任务组（Internet Engineering Task Force，IETF）进行协调，最终发布了一系列的RFC，其中最著名的是1999年6月公布的 RFC 2616，定义了HTTP协议中现今广泛使用的一个版本——HTTP 1.1。
* 2014年12月，互联网工程任务组（IETF）的Hypertext Transfer Protocol Bis（httpbis）工作小组将HTTP/2标准提议递交至IESG进行讨论[2]，于2015年2月17日被批准。[3] HTTP/2标准于2015年5月以RFC 7540正式发表，取代HTTP 1.1成为HTTP的实现标准。

##### 相关：

* HTTP （ 超文本传输协议 ） 是一个简单的请求 · 响应协议 ， 它通常运行在 TCP 之上
  *  文本 ： html, 字符串 
  * 超文本 ： 图片 ， 音乐 ， 视频 ， 定位 ， 地图 
  *  80端口
* HTTPS：安全的
  * 443端口

##### 两个时代：

* HTTP1.0
  * HTTP/1.0 ： 客户端可以与 web 服务器连接后 ， 只能获得一个 web 资源 ， 断开连接
* HTTP2.0
  *  HTTP/1.1：客户端可以与 web 服务器连接后 ， 可以获得多个 web 资源 

---

##### 请求和相应：

* 请求：客户端-发请求-服务器

    ~~~xml
    请求 URL（Rquest URL）:https://www.baidu.com/
    请求方法（Request Method）:GET
    状态代码（Status Code）:200 OK
    远程地址（Remote Address）:127.0.0.1:7879
    ~~~

  * 请求行

    * 请求行中的请求方式：GET
    * 请求方式 Get,Post,HEAD,DELETE,PUT,TRACT...
      * get:  请求能够携带的参数较少，大小有限制，会在浏览器的URL地址中显示，不安全但是高效
      * post: 请求能够携带的参数较多，大小没有限制，不会在浏览器的URL地址中显示，安全但是不高效

  * 消息头

      ~~~java
      Accept				告诉浏览器它所支持的数据类型
      Accept-Encoding		编码格式
      Accept-Language		告诉浏览器语言环境
      Connection			告诉浏览器，请求完成还是保持连接
      Cache-Control		缓存控制
      HOST				主机
      ~~~

    * 

* 响应：服务器-响应-客户端

  ~~~java
  Cache-Control 	max-age=0		缓存控制
  Connection	keep-alive			连接
  Content-Encoding	gzip		编码类型
  Content-Type	text/html; charset=utf-8		
  ~~~

  * 响应体

      ~~~java
      Accept				告诉浏览器它所支持的数据类型
      Accept-Encoding		编码格式
      Accept-Language		告诉浏览器语言环境
      Connection			告诉浏览器，请求完成还是保持连接
      Cache-Control		缓存控制
      HOST				主机
      Reflush				告诉客户端多久刷新一次
      Location			让网页重新定位
      ~~~

  * 响应状态码

    * 200：请求响应成功

    * 3xx：重定向

    * 404：找不到资源‘

    * 5xx：服务器代码错误

      502：网关错误
  
* request和response的作用执行流程

  * Web服务器收到客户端的http请求，会针对每一次请求，分别创建一个用于代表请求的request对象、和代表响应的response对象。

  * 当需要获取客户机提交过来的数据时，找request对象就行了。

    当需要向客户机输出数据，找response对象。

当你的浏览器中止栏输入地址并回车的一瞬间，到页面能够展示出来 ， 经历了什么 ？





#### Maven

---

##### 为什么要学习Maven？

1. 在Javaweb开发过程中，通常需要使用大量jar包，为了避免手动导入
2. 如何能够让一个东西能够自动帮我导入需要的jar包
3. Maven只是一个工具，不能说是一个jar包



##### Maven项目架构管理工具及其一些配置

Maven的核心思想：**约定大于配置**

* 有约束，不要去违反

Maven会规定好如何去编写Java代码，

配置：

~~~html
<mirror>
    <id>nexus-aliyun</id>
    <mirrorOf>*</mirrorOf>
    <name>Nexus aliyun</name>
    <url>https://maven.aliyun.com/nexus/content/groups/public</url>
</mirror>
~~~

本地仓库：

~~~html
<localRepository>D:\Maven\repository</localRepository>
~~~



---

##### 在IDEA中使用maven

1. 启动IDEA

2. 创建一个Maven项目

   ![image-20230706170733142](./跟随狂神学Java-31.assets/image-20230706170733142.png)

3. Maven设置

   ![image-20230706171925542](./跟随狂神学Java-31.assets/image-20230706171925542.png)

   自动导入源码

   ![image-20230706172650776](./跟随狂神学Java-31.assets/image-20230706172650776.png)

   项目设置

   ![image-20230706200911819](./跟随狂神学Java-31.assets/image-20230706200911819.png)

   添加Tomcat服务器

   ![image-20230706201144698](./跟随狂神学Java-31.assets/image-20230706201144698.png)

   为什么会出现这个警告？

   我们访问一个网站，需要指定一个文件夹的名字

   ![image-20230706201713248](./跟随狂神学Java-31.assets/image-20230706201713248.png)

   修改默认应用程序上下文，如果设置为`/MavenLearn_war`，那么访问时将为`localhost:8080/MavenLearn_war`

   ![image-20230706201919904](./跟随狂神学Java-31.assets/image-20230706201919904.png)

   运行结果：

   ![image-20230706205217517](./跟随狂神学Java-31.assets/image-20230706205217517.png)

   这里可以查看Maven命令![image-20230707170230607](./跟随狂神学Java-31.assets/image-20230707170230607.png)





---

##### pom文件

~~~xml
<!--maven版本和头文件-->
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
<!--  这里是配置的GAV  -->
    <groupId>com.joker_yue</groupId>
    <artifactId>MavenLearn</artifactId>
    <version>1.0-SNAPSHOT</version>

<!--  packaging 项目的打包方式
      jar:java项目
      war:javaweb项目
  -->
    <packaging>war</packaging>
<!-- 名称   -->
    <name>MavenLearn Maven Webapp</name>
    <url>http://maven.apache.org</url>

<!--  依赖  -->
    <dependencies>
<!--    具体依赖的jar包    -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>3.8.1</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
<!--  项目构建用的东西  -->
    <build>
        <finalName>MavenLearn</finalName>
    </build>
</project>
~~~

Maven由于约定大于配置，之后可能会遇到我们写的配置文件无法导出或生效的问题，解决方案：在build中配置resources，防止资源导出失败

~~~xml
 <build>
        <resources>
            <resource>
                <directory>src/main/resources</directory>
                <includes>
                    <include>**/*.properties</include>
                    <include>**/*.xml</include>
                </includes>
                <filtering>true</filtering>
            </resource>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.properties</include>
                    <include>**/*.xml</include>
                </includes>
                <filtering>true</filtering>
            </resource>
        </resources>
    </build>
~~~

可以通过右键来显示图

![image-20230707150757767](./跟随狂神学Java-31.assets/image-20230707150757767.png)





---

##### 遇到的坑

1. pom无法同步

   3.6.2maven有此问题,降低版本

2. JDK兼容

   使用JDK18

3. 无法部署war

   重新检查运行配置

4. 我的配置:

   Tomact:9.0.40

   Maven:3.5.3

   JDK:![image-20230707151556556](./跟随狂神学Java-31.assets/image-20230707151556556.png)

5. 将IDEA中web.xml的版本设置为与Tomcat的推荐版本一致

   可以看到推荐版本为4.0

   ![image-20230707165740266](./跟随狂神学Java-31.assets/image-20230707165740266.png)

   ~~~xml
   <web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                         http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
            version="4.0"
            metadata-complete="true">
   </web-app>
   
   ~~~

6. 目录结构

   ![image-20230707170147436](./跟随狂神学Java-31.assets/image-20230707170147436.png)



##### Tomcat示例文件

---

可以通过这里查看示例代码![image-20230707170551222](./跟随狂神学Java-31.assets/image-20230707170551222.png)

可以通过这里导入依赖 ，也可以通过[Maven仓库](https://mvnrepository.com)导入![image-20230707170744476](./跟随狂神学Java-31.assets/image-20230707170744476.png)





#### Servlet

---

##### 什么是Servlet

* 是Sun公司用于开发动态网站的一门技术

* Sun公司在这些API中提供了一个接口叫做Sevlet。如果你想开发一个Servlet，只需要完成两个步骤：

  * 编写一个类，实现Servlet接口
  * 把开发好的Java类部署到web服务器中

  把实现了Servlet接口的Java程序叫做 Servlet



---

##### HelloServlet

1. 创建一个普通的Maven项目，删掉里面的src目录

   空的工程叫做主文件

2. 关于Maven父子关系的理解

   父项目中会多一个module

   ![image-20230707190233663](./跟随狂神学Java-31.assets/image-20230707190233663.png)

   ~~~xml
   <!--父模块中会有以下信息-->
   <modules>
           <module>Servlet-01</module>
       </modules>
   ~~~

   ~~~xml
   <!--子模块中会有以下信息-->
   <parent>
       <groupId>com.joker_yue</groupId>
       <artifactId>MavenLearn</artifactId>
       <version>1.0-SNAPSHOT</version>
   </parent>
   ~~~

   子项目可以直接使用父项目中的Java

   ~~~java
   son extend father
   ~~~

3. Maven环境优化

   1. 修改web.xml为最新的
   2. 将Maven的结构搭建完整

4. 编写一个Servlet程序

   1. 编写一个普通类

   2. 实现Servlet接口，直接继承HttpServlet

      ~~~java
      public class HelloServlet extends HttpServlet {
      
          //由于get和post只是请求实现的不同的方式，可以相互调用，业务逻辑都一样
          @Override
          protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
              //ServletOutputStream outputStream = resp.getOutputStream();
              PrintWriter writer = resp.getWriter();      //响应流
              writer.print("Hello world!");
          }
      
          @Override
          protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
              super.doPost(req, resp);
          }
      }
      ~~~

5. 编写Servlet的映射

   为什么需要映射：我们写的是映射，但是需要通过浏览器访问，而浏览器需要连接web服务器，所以我们需要在web服务中注册我们写的servlet，还需要给它一个浏览器能够访问的路径

   ~~~xml
   <!--注册Servlet-->
   <servlet>
       <servlet-name>helloServlet</servlet-name>
       <servlet-class>com.joker_yue.servlet.HelloServlet</servlet-class>
   </servlet>
   <!--配置servlet请求路径-->
   <servlet-mapping>
       <servlet-name>helloServlet</servlet-name>
       <url-pattern>/joker_yue</url-pattern>
   </servlet-mapping>
   ~~~

6. 配置Tomcat

   注意：配置项目发布的路径就可以了

7. 启动测试



#### Sevlet原理

---

servlet就是一个接口，定义了java类被浏览器访问到（被Tomcat识别）的规则，主要负责接收浏览器的请求，tomcat服务器调用servlet方法。步骤：创建 一个JavaEE项目，定义一个类实现servlet接口，重写方法，在web.xml中配置servlet。

servlet执行原理：当服务器接收到浏览器客户的请求之后，会解析请求的URL路径，获取访问的servlet的资源路径，找到项目，查找web.xml文件，是否有对应的标签体内容，如果有，则找到对应的标签内的全类名，tomcat会将字节码文件加载进内存，并且创建其对象，调用其方法。

<img src="https://img2018.cnblogs.com/blog/1168971/201904/1168971-20190411111053747-132608403.png" alt="img" style="zoom: 67%;" />

Servlet生命周期

<img src="https://img2018.cnblogs.com/blog/1168971/201904/1168971-20190411123348548-937154503.png" alt="img" style="zoom:67%;" />

---

##### Mapping问题

1. 一个Servlet可以指定一个映射路径

2. 一个Servlet可以指定多个映射路径

   ~~~xml
    <!--配置servlet请求路径-->
       <servlet-mapping>
           <servlet-name>helloServlet</servlet-name>
           <url-pattern>/joker_yue</url-pattern>
       </servlet-mapping>
       <servlet-mapping>
           <servlet-name>helloServlet</servlet-name>
           <url-pattern>/joker_yue1</url-pattern>
       </servlet-mapping><servlet-mapping>
           <servlet-name>helloServlet</servlet-name>
           <url-pattern>/joker_yue2</url-pattern>
       </servlet-mapping>
   ~~~

   

3. 一个Servlet可以指定通用映射路径

   ~~~xml
   <servlet-mapping>
           <servlet-name>helloServlet</servlet-name>
           <url-pattern>/joker_yue/*</url-pattern>
       </servlet-mapping>
   ~~~

   注意不要把通配的时候不要包含根目录

4. 指定一些后缀或者前缀

   ~~~xml
   <servlet-mapping>
           <servlet-name>helloServlet</servlet-name>
           <url-pattern>*.do</url-pattern>
       </servlet-mapping>
   ~~~

   注意，`*`前面不可加任何路径

5. 优先级问题

   指定了固有的映射路径优先级最高，如果找不到就走默认的处理请求

   ~~~xml
   <!--  404-->
     <servlet>
       <servlet-name>errorServlet</servlet-name>
       <servlet-class>com.joker_yue.servlet.ErrorServlet</servlet-class>
     </servlet>
     <!--配置servlet请求路径-->
     <servlet-mapping>
       <servlet-name>errorServlet</servlet-name>
       <url-pattern>/*</url-pattern>
     </servlet-mapping>
   ~~~

---

##### ServletContext

web容器在启动的时候，他会为每个web程序都创建一个对应的ServiceContext对象，它代表了当前的web应用

* 共享数据

  我在这个Servlet中保存的数据，可以在另一个Servlet拿到

  ~~~java
  public class HelloServlet extends HttpServlet {
      @Override
      protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
          ServletContext servletContext = this.getServletContext();
          String username = "Joker_Yue";
          servletContext .setAttribute("username", username);//将一个数据保存在ServletContext中，名字为username。值,username
  
      }
  }
  ~~~

  ~~~java
  public class GetServlet extends HttpServlet {
  
      @Override
      protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
          ServletContext context = this.getServletContext();
          String username = (String) context.getAttribute("username");
          resp.setContentType("text/html");
          resp.setCharacterEncoding("UTF-8");
          resp.getWriter().print("名字:"+username);
      }
  }
  
  ~~~

  ```xml
      <servlet>
        <servlet-name>HelloServlet</servlet-name>
        <servlet-class>com.joker_yue.servlet.HelloServlet</servlet-class>
      </servlet>
    <servlet-mapping>
        <servlet-name>HelloServlet</servlet-name>
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>
      
      <servlet>
          <servlet-name>getc</servlet-name>
          <servlet-class>com.joker_yue.servlet.GetServlet</servlet-class>
      </servlet>
      <servlet-mapping>
          <servlet-name>getc</servlet-name>
          <url-pattern>/getc</url-pattern>
      </servlet-mapping>
  ```

  

---

##### 获取初始化参数

~~~xml
 <!--  配置一些web应用的初始化参数  -->
    <context-param>
        <param-name>url</param-name>
        <param-value>jdbc:mysql://localhost:3306/mybatis</param-value>
    </context-param>
~~~

~~~java
 @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ServletContext servletContext = this.getServletContext();
        String url = servletContext.getInitParameter("url");
        resp.getWriter().print(url);
    }
~~~



---

##### 请求转发和重定向

这是请求转发：

 ![image-20230708130819551](./跟随狂神学Java-31.assets/image-20230708130819551.png)

这是重定向：

![image-20230708130902255](./跟随狂神学Java-31.assets/image-20230708130902255.png)

**实现请求转发**

~~~java
package com.joker_yue.servlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ServletTest04 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 进入了ServletTest04
        System.out.println("进入ServletTest04了");
        ServletContext servletContext = this.getServletContext();
        // RequestDispatcher requestDispatcher = servletContext.getRequestDispatcher("/gp");//转发的请求路径
        // requestDispatcher.forward(req, resp);   //调用Servlet实现请求转发
        //  当然也可以连写成下面这一句
        servletContext.getRequestDispatcher("/gp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }
}
~~~

* 面试题：重定向和转发的区别

  * 相同：页面都会跳转

    * 不同：

      * 请求转发的时候，页面的URL不会发生变化：307

      * 重定向的时候，url地址栏会发生变化：302

      * 在Servlet中，请求转发只能定位到项目内文件，而重定向可以定位到项目之外的。

        所以请求转发不需要写绝对路径，而重定向需要

  * 比喻：

    重定向：这事儿啊，你呀，问村长去

    转发：这事我去给你问问村长，问到了告诉你哈

---

##### 读取资源文件

Properties

* 在Java目录下新建properties
* 在resource目录下新建properties

发现：都被打包到了同一路径下：class，我们俗称为类路径

思路：需要一个文件流

~~~properties
username=root
password=12345

#classpath:类路径
~~~



~~~java
package com.joker_yue.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ServletTest05 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        InputStream is = this.getServletContext().getResourceAsStream("/WEB-INF/classes/db.properties");
        Properties prop = new Properties();
        prop.load(is);
        String username = prop.getProperty("username");
        String password = prop.getProperty("password");

        resp.getWriter().print("名字:"+username);
        resp.getWriter().print("密码:"+password);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }
}
~~~



---

##### HttpServletResponse

**响应：用于客户端向浏览器传递信息**

web服务器接收到客户端的Http请求，针对这个请求，分别创建一个代表请求的HttpSevletRequest对象，代表响应的一个httpServletResponse对象

* 如果我们要获取客户端请求过来的参数，找HttpServletRequest
* 如果要给客户端响应一些参数，找HttpServletResponse

**简单分类**

负责向浏览器发送数据的方法

~~~java
    public ServletOutputStream getOutputStream() throws IOException;
        
    public PrintWriter getWriter() throws UnsupportedEncodingException ;
~~~

负责向浏览器发送响应头的方法

~~~java
    public void setCharacterEncoding(String charset);
    public void setContentLength(int len);
    public void setContentLengthLong(long len);
    public void setContentType(String type);
    public void setDateHeader(String name, long date);
    public void addDateHeader(String name, long date);
    public void setHeader(String name, String value);   
    public void addHeader(String name, String value);
    public void setIntHeader(String name, int value);
    public void addIntHeader(String name, int value);
~~~

一些常量，响应的状态码

~~~java
    /*
     * Server status codes; see RFC 2068.
     */

    /**
     * Status code (100) indicating the client can continue.
     */
    public static final int SC_CONTINUE = 100;

    /**
     * Status code (101) indicating the server is switching protocols
     * according to Upgrade header.
     */
    public static final int SC_SWITCHING_PROTOCOLS = 101;

    /**
     * Status code (200) indicating the request succeeded normally.
     */
    public static final int SC_OK = 200;

    /**
     * Status code (201) indicating the request succeeded and created
     * a new resource on the server.
     */
    public static final int SC_CREATED = 201;

    /**
     * Status code (202) indicating that a request was accepted for
     * processing, but was not completed.
     */
    public static final int SC_ACCEPTED = 202;

    /**
     * Status code (203) indicating that the meta information presented
     * by the client did not originate from the server.
     */
    public static final int SC_NON_AUTHORITATIVE_INFORMATION = 203;

    /**
     * Status code (204) indicating that the request succeeded but that
     * there was no new information to return.
     */
    public static final int SC_NO_CONTENT = 204;

    /**
     * Status code (205) indicating that the agent <em>SHOULD</em> reset
     * the document view which caused the request to be sent.
     */
    public static final int SC_RESET_CONTENT = 205;

    /**
     * Status code (206) indicating that the server has fulfilled
     * the partial GET request for the resource.
     */
    public static final int SC_PARTIAL_CONTENT = 206;

    /**
     * Status code (300) indicating that the requested resource
     * corresponds to any one of a set of representations, each with
     * its own specific location.
     */
    public static final int SC_MULTIPLE_CHOICES = 300;

    /**
     * Status code (301) indicating that the resource has permanently
     * moved to a new location, and that future references should use a
     * new URI with their requests.
     */
    public static final int SC_MOVED_PERMANENTLY = 301;

    /**
     * Status code (302) indicating that the resource has temporarily
     * moved to another location, but that future references should
     * still use the original URI to access the resource.
     *
     * This definition is being retained for backwards compatibility.
     * SC_FOUND is now the preferred definition.
     */
    public static final int SC_MOVED_TEMPORARILY = 302;

    /**
    * Status code (302) indicating that the resource reside
    * temporarily under a different URI. Since the redirection might
    * be altered on occasion, the client should continue to use the
    * Request-URI for future requests.(HTTP/1.1) To represent the
    * status code (302), it is recommended to use this variable.
    */
    public static final int SC_FOUND = 302;

    /**
     * Status code (303) indicating that the response to the request
     * can be found under a different URI.
     */
    public static final int SC_SEE_OTHER = 303;

    /**
     * Status code (304) indicating that a conditional GET operation
     * found that the resource was available and not modified.
     */
    public static final int SC_NOT_MODIFIED = 304;

    /**
     * Status code (305) indicating that the requested resource
     * <em>MUST</em> be accessed through the proxy given by the
     * <code><em>Location</em></code> field.
     */
    public static final int SC_USE_PROXY = 305;

     /**
     * Status code (307) indicating that the requested resource 
     * resides temporarily under a different URI. The temporary URI
     * <em>SHOULD</em> be given by the <code><em>Location</em></code> 
     * field in the response.
     */
    public static final int SC_TEMPORARY_REDIRECT = 307;

    /**
     * Status code (400) indicating the request sent by the client was
     * syntactically incorrect.
     */
    public static final int SC_BAD_REQUEST = 400;

    /**
     * Status code (401) indicating that the request requires HTTP
     * authentication.
     */
    public static final int SC_UNAUTHORIZED = 401;

    /**
     * Status code (402) reserved for future use.
     */
    public static final int SC_PAYMENT_REQUIRED = 402;

    /**
     * Status code (403) indicating the server understood the request
     * but refused to fulfill it.
     */
    public static final int SC_FORBIDDEN = 403;

    /**
     * Status code (404) indicating that the requested resource is not
     * available.
     */
    public static final int SC_NOT_FOUND = 404;

    /**
     * Status code (405) indicating that the method specified in the
     * <code><em>Request-Line</em></code> is not allowed for the resource
     * identified by the <code><em>Request-URI</em></code>.
     */
    public static final int SC_METHOD_NOT_ALLOWED = 405;

    /**
     * Status code (406) indicating that the resource identified by the
     * request is only capable of generating response entities which have
     * content characteristics not acceptable according to the accept
     * headers sent in the request.
     */
    public static final int SC_NOT_ACCEPTABLE = 406;

    /**
     * Status code (407) indicating that the client <em>MUST</em> first
     * authenticate itself with the proxy.
     */
    public static final int SC_PROXY_AUTHENTICATION_REQUIRED = 407;

    /**
     * Status code (408) indicating that the client did not produce a
     * request within the time that the server was prepared to wait.
     */
    public static final int SC_REQUEST_TIMEOUT = 408;

    /**
     * Status code (409) indicating that the request could not be
     * completed due to a conflict with the current state of the
     * resource.
     */
    public static final int SC_CONFLICT = 409;

    /**
     * Status code (410) indicating that the resource is no longer
     * available at the server and no forwarding address is known.
     * This condition <em>SHOULD</em> be considered permanent.
     */
    public static final int SC_GONE = 410;

    /**
     * Status code (411) indicating that the request cannot be handled
     * without a defined <code><em>Content-Length</em></code>.
     */
    public static final int SC_LENGTH_REQUIRED = 411;

    /**
     * Status code (412) indicating that the precondition given in one
     * or more of the request-header fields evaluated to false when it
     * was tested on the server.
     */
    public static final int SC_PRECONDITION_FAILED = 412;

    /**
     * Status code (413) indicating that the server is refusing to process
     * the request because the request entity is larger than the server is
     * willing or able to process.
     */
    public static final int SC_REQUEST_ENTITY_TOO_LARGE = 413;

    /**
     * Status code (414) indicating that the server is refusing to service
     * the request because the <code><em>Request-URI</em></code> is longer
     * than the server is willing to interpret.
     */
    public static final int SC_REQUEST_URI_TOO_LONG = 414;

    /**
     * Status code (415) indicating that the server is refusing to service
     * the request because the entity of the request is in a format not
     * supported by the requested resource for the requested method.
     */
    public static final int SC_UNSUPPORTED_MEDIA_TYPE = 415;

    /**
     * Status code (416) indicating that the server cannot serve the
     * requested byte range.
     */
    public static final int SC_REQUESTED_RANGE_NOT_SATISFIABLE = 416;

    /**
     * Status code (417) indicating that the server could not meet the
     * expectation given in the Expect request header.
     */
    public static final int SC_EXPECTATION_FAILED = 417;

    /**
     * Status code (500) indicating an error inside the HTTP server
     * which prevented it from fulfilling the request.
     */
    public static final int SC_INTERNAL_SERVER_ERROR = 500;

    /**
     * Status code (501) indicating the HTTP server does not support
     * the functionality needed to fulfill the request.
     */
    public static final int SC_NOT_IMPLEMENTED = 501;

    /**
     * Status code (502) indicating that the HTTP server received an
     * invalid response from a server it consulted when acting as a
     * proxy or gateway.
     */
    public static final int SC_BAD_GATEWAY = 502;

    /**
     * Status code (503) indicating that the HTTP server is
     * temporarily overloaded, and unable to handle the request.
     */
    public static final int SC_SERVICE_UNAVAILABLE = 503;

    /**
     * Status code (504) indicating that the server did not receive
     * a timely response from the upstream server while acting as
     * a gateway or proxy.
     */
    public static final int SC_GATEWAY_TIMEOUT = 504;

    /**
     * Status code (505) indicating that the server does not support
     * or refuses to support the HTTP protocol version that was used
     * in the request message.
     */
    public static final int SC_HTTP_VERSION_NOT_SUPPORTED = 505;
~~~

**常见应用**

1. 向浏览器输出消息

2. 下载文件

   1. 要获取下载的文件路径
   2. 下载的文件名
   3. 想办法让浏览器支持下载我们需要的东西
   4. 获取下载文件的输入流
   5. 创建缓冲区
   6. 获取OutputStream
   7. 将FileOutputStream流写入到buffer缓冲区
   8. 使用OutputStream将缓冲区中的数据输出到客户端

   ~~~java
   package com.joker_yue.servlet;
   
   import javax.servlet.ServletException;
   import javax.servlet.ServletOutputStream;
   import javax.servlet.http.HttpServlet;
   import javax.servlet.http.HttpServletRequest;
   import javax.servlet.http.HttpServletResponse;
   import java.io.FileInputStream;
   import java.io.IOException;
   import java.net.URLEncoder;
   
   public class FileServlet extends HttpServlet {
       @Override
       protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
           // 1. 要获取下载的文件路径
           String realPath = "E:\\Program\\Idea\\JavaLearning\\src\\MavenLearn\\Servlet-Response\\src\\main\\resources\\下载.png";
           System.out.println("下载的文件的路径：" + realPath);
           // 2. 下载的文件名
           String fileName = realPath.substring(realPath.lastIndexOf("\\") + 1);
           // 3. 想办法让浏览器支持(Content-Disposition)下载我们需要的东西。使用URLEncoder转换编码
           resp.setHeader("Content-Disposition", "attachment;fileName=" + URLEncoder.encode(fileName, "UTF-8"));
           // 4. 获取下载文件的输入流
           FileInputStream in = new FileInputStream(realPath);
           // 5. 创建缓冲区
           int len = 0;
           byte[] buffer = new byte[1024];
           // 6. 获取OutputStream
           ServletOutputStream out = resp.getOutputStream();
           // 7. 将FileOutputStream流写入到buffer缓冲区
           while(in.read(buffer) != -1){
               out.write(buffer, 0, len);
           }
           in.close();
           out.close();
       }
   
       @Override
       protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
           super.doPost(req, resp);
       }
   }
   ~~~

**验证码功能**

验证怎么来的

* 前端实现

* 后端实现

  * 需要用到Java的图片类，生成一个图片

    ~~~java
    package com.joker_yue.servlet;
    
    import javax.imageio.ImageIO;
    import javax.servlet.ServletException;
    import javax.servlet.http.HttpServlet;
    import javax.servlet.http.HttpServletRequest;
    import javax.servlet.http.HttpServletResponse;
    import java.awt.*;
    import java.awt.image.BufferedImage;
    import java.io.IOException;
    import java.util.Random;
    
    public class ImageServlet extends HttpServlet {
        @Override
        protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
            //如何让浏览器3s自动刷新一次
            resp.setHeader("Refresh", "3");
    
            //在内存中创建一个图片
            BufferedImage image = new BufferedImage(80, 80, BufferedImage.TYPE_INT_RGB);
            //得到图片
            Graphics2D graphics =(Graphics2D) image.getGraphics();//笔
            //设置图片的背景颜色
            graphics.setColor(Color.white);
            graphics.fillRect(0, 0, 80, 20);
            //给图片写数据
            graphics.setColor(Color.BLUE);
            graphics.setFont(new Font("宋体", Font.BOLD, 20));
            graphics.drawString(makeNumber(),0,20);
    
            //告诉浏览器这个请求用图片的方式打开
            resp.setContentType("image/png");
            //网站存在缓存，不让浏览器缓存
            resp.setDateHeader("Expires",-1);
            resp.setHeader("Cache-Control","no-cache");
            resp.setHeader("Pragma","no-cache");
    
            //把图片写给浏览器
            ImageIO.write(image,"png",resp.getOutputStream());
    
    
    
        }
    
        //生成随机数
        private String makeNumber(){
            Random random = new Random();
            String num = String.valueOf(random.nextInt(9999999));
            // StringBuffer：拼接字符串
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < 7 - num.length(); i++) {
                sb.append("0");
            }
            num= sb.toString() + num;
            return num;
        }
    
        @Override
        protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
            super.doPost(req, resp);
        }
    }
    ~~~

**实现重定向**

一个web资源收到客户端A请求后，B会通知A客户端去访问另外一个web资源C，这个过程叫做重定向

常见场景：

* 用户登录成功跳转到另一个界面

  ~~~java
      public void sendRedirect(String location) throws IOException;
  ~~~

  ~~~java
  package com.joker_yue.servlet;
  
  import javax.servlet.ServletException;
  import javax.servlet.http.HttpServlet;
  import javax.servlet.http.HttpServletRequest;
  import javax.servlet.http.HttpServletResponse;
  import java.io.IOException;
  
  public class RedirectServlet extends HttpServlet {
      @Override
      protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
          resp.sendRedirect("/down/img");//要加项目路径'/down'
      }
  
      @Override
      protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
          super.doPost(req, resp);
      }
  }
  ~~~

* 分析：

  虽然只需一句就可以实现重定向

  ~~~java
  resp.sendRedirect("/down/img");//要加项目路径'/down'
  ~~~

  但是它其实做了这些：

  ~~~java
  //设置了要跳转的地址
  resp.setHeader("Location", "/down/img");//要加项目路径'/down'
  //设置了状态码302
  resp.setStatus(HttpServletResponse.SC_FOUND);
  ~~~

* 用户登录

    ~~~java
    package com.joker_yue.servlet;
    
    import javax.servlet.ServletException;
    import javax.servlet.http.HttpServlet;
    import javax.servlet.http.HttpServletRequest;
    import javax.servlet.http.HttpServletResponse;
    import java.io.IOException;
    
    public class RequestTest extends HttpServlet {
        @Override
        protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    
        }
    
        @Override
        protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
            // 处理请求
            String username = req.getParameter("username");
            String password = req.getParameter("password");
    
            System.out.println("username = " + username);
            System.out.println("password = " + password);
    
            // 重定向一定要注意路径问题，否则容易404
            resp.sendRedirect("/down/success.jsp");
        }
    }
    ~~~

    ~~~jsp
    <html>
    <body>
    <h2>Hello World!</h2>
    
    <%--这里提交的路径，需要寻找到项目的路径--%>
    <%-- ${pageContext.request.contextPath}/login代表当前项目--%>
    <form action="${pageContext.request.contextPath}/login" method="get">
        用户名：<input type="text" name="username"><br>
        密码：<input type="text" name="password"><br>
        <input type="submit">
    </form>
    </body>
    </html>
    
    ~~~

---

##### HttpServletRequest

**请求：要想接收浏览器发送过来的参数,通过request就可以了**

HttpServletRequest代表客户端的请求，用户通过Http协议访问服务器，HTTP请求中的所有信息将会被封装到HttpServletRequest![image-20230709140844447](./跟随狂神学Java-31.assets/image-20230709140844447.png)

**获取前端传递的参数**

![image-20230709141029530](./跟随狂神学Java-31.assets/image-20230709141029530.png)

**获取前端传递的参数，请求转发**

~~~java
package com.joker_yue.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

public class LoginServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 后台接收中文乱码问题
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");

        String username = req.getParameter("username");
        String password = req.getParameter("password");
        String[] hobbies = req.getParameterValues("hobby");
        System.out.println("=========================");
        System.out.println("username = " + username);
        System.out.println("password = " + password);
        System.out.println(Arrays.toString(hobbies));
        System.out.println("=========================");

        // 通过sendRedirect()方法重定向
        // resp.sendRedirect("/success.jsp");

        // 请求转发，转到success.jsp
        /* 说明：这里的/ 代表当前的web应用
         * 也就是这里的 /success.jsp 其实是 http://localhost:8080/request/success.jsp
         * success前面的/ 代替了很长一串目录
         * */
        // 因为转发是服务器内部的，不需要写绝对路径 （/是绝对路径）
        // 而重定向可以定位到项目之外，所以要写
        req.getRequestDispatcher("/success.jsp").forward(req, resp);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }
}
~~~

~~~jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>登录</title>
</head>
<body>
<h1>登录</h1>
<div style="text-align: center">
    <%--    这里表单表达的意思：以get方式提交表单，提交到login请求    --%>
    <form action="${pageContext.request.contextPath}/login" method="get">
        用户名:<input type="text" name="username"><br/>
        密码:<input type="password" name="password"><br/>
        爱好:
        <input type="checkbox" name="hobby" value="唱歌">唱歌
        <input type="checkbox" name="hobby" value="女孩">女孩
        <input type="checkbox" name="hobby" value="代码">代码
        <input type="checkbox" name="hobby" value="游戏">游戏
        
        <br/>
        <input type="submit" >
    </form>
</div>
</body>
</html>
~~~





#### Session、Cookie

---

cookie是监视器，session是会话



##### 会话

---

**会话**：用户打开一个浏览器，点击了很多超链接，访问多个web资源，关闭浏览器。这整个过程，可以看作一个会话

**有状态会话**：你能如何证明你是中国人。出生证：中国给你的；居住证：中国你来过

​					   一个网站怎么证明你来过： 服务端给客户端一个信件，客户端下次访问服务端带上信件就可以了。这个信件就是cookie。服务器登记客户端信息，下次来的时候匹配一下。这个信息就是session。





##### 保存会话的两种技术

---

**cookie**

* 客户端技术（响应，请求）

**session**

* 服务器技术，利用这个技术，可以保存用户的会话信息。我们可以把信息或者数据放在session中



**常见场景**

* 网站登录之后，你下次就不用再登录了，第二次访问直接就上去了



##### Cookie

---

1. 从请求中拿到Cookie

2. 服务器响应给客户端Cookie

   ~~~java
   Cookie[] cookies = req.getCookies();   // 获得cookie
   cookie.getName();	// 获得cookie中的key
   cookie.getValue();	// 获得cookie中的值
   Cookie cookie = new Cookie("lastVisit", System.currentTimeMillis() + ""); //新建一个cookie
   cookie.setMaxAge(24*60*60);  // 设置Cookie有效期
   resp.addCookie(cookie);		//响应给客户端一个Cookie
   ~~~

一个网站cookie是否存在上限？

* 一个cookie 只能保存一个信息
* 一个web站点可以给浏览器发送多个cookie。最多存放20个cookie
* cookie大小有限制，4kB
* 浏览器上限300个Cookie

删除Cookie：

* 不设置有效期，关闭浏览器，自动失效
* 设置有效期0

转码解码：

~~~java
Cookie cookie = new Cookie("username", URLEncoder.encode("九歌", "UTF-8"));
~~~

~~~java
out.write(URLDecoder.decode(cookie.getValue(), "UTF-8"));
~~~





##### Session

---

**什么是session**

* 服务器会给每一个用户（浏览器）创建Session（会话）
* 一个Session独占一个浏览器，只要浏览器没关，这个Session就存在
* 用户登录之后，整个网站它都可以访问    -->保存用户的信息

**cookie和session的区别**

* cookie是把用户的数据写给用户的浏览器，浏览器保存（可以保存多个）
* session是把用户的数据写到独占的Session对象中，服务器端保存（保存重要信息，避免资源浪费）
* session对象由服务器创建

**HttpSession类**

![image-20230709165808293](./跟随狂神学Java-31.assets/image-20230709165808293.png)

**Session在创建的时候做了什么**

~~~java
Cookie jsessionid = new Cookie("JSESSIONID", sessionId);
resp.addCookie(jsessionid);
~~~



**使用Session**

  ~~~java
  package com.joker_yue.servlet;
  
  import javax.servlet.ServletException;
  import javax.servlet.http.*;
  import java.io.IOException;
  
  // 创建Session
  public class SessionTest01 extends HttpServlet {
      @Override
      protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
          // 解决乱码
          req.setCharacterEncoding("UTF-8");
          resp.setContentType("text/html;charset=UTF-8");
  
          //得到Session
          HttpSession session = req.getSession();
  
          //给Session存东西
          session.setAttribute("username", new Person("Joker",19));
  
          //获取session的ID
          String sessionId = session.getId();
  
          //判断session是不是新创建的
          if (session.isNew()) {
              resp.getWriter().write("创建Session成功"+sessionId);
          }else {
              resp.getWriter().write("Session已经存在"+sessionId);
          }
  
          // Session在创建的时候做了什么事情
          Cookie jsessionid = new Cookie("JSESSIONID", sessionId);
          resp.addCookie(jsessionid);
  
  
      }
  
      @Override
      protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
          super.doGet(req, resp);
      }
  }
  
  ~~~

  ~~~java
  package com.joker_yue.servlet;
  
  import javax.servlet.ServletException;
  import javax.servlet.http.HttpServlet;
  import javax.servlet.http.HttpServletRequest;
  import javax.servlet.http.HttpServletResponse;
  import javax.servlet.http.HttpSession;
  import java.io.IOException;
  
  // 得到Session
  public class SessionTest02 extends HttpServlet {
      @Override
      protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
          super.doGet(req, resp);
      }
  
      @Override
      protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
          // 解决乱码
          req.setCharacterEncoding("UTF-8");
          resp.setContentType("text/html;charset=UTF-8");
  
          //得到Session
          HttpSession session = req.getSession();
  
          Person person = (Person) session.getAttribute("username");
          System.out.println(person.toString());
      }
  }
  
  ~~~

  ~~~java
  package com.joker_yue.servlet;
  
  public class Person {
      private String name;
      private int age;
  
      public String getName() {
          return name;
      }
  
      public void setName(String name) {
          this.name = name;
      }
  
      public int getAge() {
          return age;
      }
  
      public void setAge(int age) {
          this.age = age;
      }
  
      public Person(String name, int age) {
          this.name = name;
          this.age = age;
      }
  
      public Person() {
      }
  
      @Override
      public String toString() {
          return "Person{" +
                  "name='" + name + '\'' +
                  ", age=" + age +
                  '}';
      }
  }
  ~~~

  ~~~java
  package com.joker_yue.servlet;
  
  import javax.servlet.ServletException;
  import javax.servlet.http.HttpServlet;
  import javax.servlet.http.HttpServletRequest;
  import javax.servlet.http.HttpServletResponse;
  import javax.servlet.http.HttpSession;
  import java.io.IOException;
  
  // 注销Session
  public class SessionTest03 extends HttpServlet {
      @Override
      protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
          // 解决乱码
          req.setCharacterEncoding("UTF-8");
          resp.setContentType("text/html;charset=UTF-8");
  
          // 得到Session
          HttpSession session = req.getSession();
          Person person = (Person) session.getAttribute("username");
  
          // 手动注销Session
          session.invalidate();
      }
  
      @Override
      protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
          super.doGet(req, resp);
      }
  }
  
  ~~~

* ![image-20230709172619433](./跟随狂神学Java-31.assets/image-20230709172619433.png)



**设置Session超时**

* 在web.xml中：

  ~~~xml
  <!--   设置Session的超时时间   -->
      <session-config>
          <!-- 超时时间：15分钟 -->
          <session-timeout>15</session-timeout>
      </session-config>
  ~~~

**使用场景**

* 保存一个登录用户的信息
* 购物车信息
* 在整个网站中，经常会使用的数据，我们将他保存在session中



**注意：**

* Session在浏览器打开会话的一瞬间就创建了

  <img src="./跟随狂神学Java-31.assets/image-20230709170622183.png" alt="image-20230709170622183" style="zoom:50%;" />







#### JSP

---

##### 什么是JSP

Java Server Page：Java服务器端页面，也和Servlet一样，用于动态web技术

最大特点：

* 写jsp就像是写HTML
* 区别：
  * HTML只给用户提供静态数据
  * jsp页面中可以嵌入java代码，为用户提供动态数据



---

##### JSP原理

思路：jsp到底怎么执行的

* 代码层面没有任何问题

* 服务器内部工作

  tomcat中有一个work目录

  IDEA中使用Tomcat的会在IDEA中生成一个work目录

* jsp最终会被转成Java程序

* 浏览器向服务器发送请求，不管访问什么资源，其实都是在访问servlet

* jsp本质上就是一个Servlet

  ~~~java
  public abstract class HttpJspBase extends HttpServlet implements HttpJspPage
  ~~~

  ~~~java
  //初始化
      public void _jspInit() {
      }
  //销毁
      protected void _jspDestroy() {
      }
  //JSPService
      public void _jspService(HttpServletRequest var1, HttpServletResponse var2) 
  
  ~~~

  

1. 执行请求

2. 内置了一些对象

   ~~~java
   final javax.servlet.jsp.PageContext pageContext;		//页面上下文
   final javax.servlet.ServletContext application;			//applicationContext
   final javax.servlet.ServletConfig config;				//config
   javax.servlet.jsp.JspWriter out = null;					//out
   final java.lang.Object page = this;						//page：当前
   HttpServletRequest var1									//请求
   HttpServletResponse var2								//响应
   ~~~

   

3. 输出页面前增加的代码

   ~~~java
   response.setContentType("text/html; charset=UTF-8");		//设置响应的页面类型
   pageContext = _jspxFactory.getPageContext(this, request, response,null, false, 8192, true);			
   _jspx_page_context = pageContext;	
   application = pageContext.getServletContext();
   config = pageContext.getServletConfig();
   out = pageContext.getOut();
   _jspx_out = out;
   ~~~

4. 以上的这些对象我们可以直接在jsp页面中直接使用

5. 我们可以直接在`<% %>`中使用java代码

6. ![image-20230709201449181](./跟随狂神学Java-31.assets/image-20230709201449181.png)

---

##### JSP基础语法

**表达式**

~~~java
<%--JSP表达式
作用：用来将程序的输出，输出到客户端
<% 变量或者表达式 %>
--%>
<%= new java.util.Date()%>
~~~

**脚本片段**

~~~jsp
<%--  jsp脚本片段  --%>
    <%
        int sum = 0;
        for (int i = 0; i <= 100; i++) {
            sum += i;
        }
        out.println("<h1>Sum=" + sum + "</h1>");
    %>
~~~

**JSP脚本的再实现**

~~~jsp
 <%--脚本片段的再实现--%>
    <%
        int x = 10;
        out.println(x);
    %>
<p>这是一个JSP文档</p>
    <%
        //int x = 10;
        //你将无法再此处再定义x，因为上面已经定义
        out.println(x);
    %>
~~~

**在代码中嵌入HTML**

~~~jsp
<%--在代码中嵌入HJTML--%>
    <%
        for (int i = 0; i < 5; i++) {
    %>   
	<h1>Hello,World <%=i%></h1>
    <%
        }
    %>
~~~

**JSP声明**：会被编译到JSP生成的Java的类中，其他的会被生成到_jspService方法中

~~~jsp
<%--全局代码块--%>
    <%!
        static {
            System.out.println("Loading Servlet");
        }
        private int globalVar = 0;
        public void joker(){
            System.out.println("进入了方法Joker");
        }
    %>
~~~

也可以使用EL表达式（ExpressLanguage）

JSP的注释不会在客户端被查看到

**自定义错误页面**：在页面出错的时候将会自动定位到新页面

~~~jsp
<%--定制错误页面
    此段代码写在jsp中
    如果此jsp出现错误，将会自动定位到下述页面
    --%>
<%@ page errorPage="500.jsp" %>
~~~

~~~xml
<!-- 定制错误页面
此段代码写在wen.xml中
如果访问的页面出现错误，将会自动根据错误类型重定向
-->
<error-page>
    <error-code>404</error-code>
    <location>/404.jsp</location>
</error-page>
~~~

**网页拼接**

`@include`会将两个页面合二为一

<img src="./跟随狂神学Java-31.assets/image-20230710134932039.png" alt="image-20230710134932039" style="zoom:50%;" />

`jsp:include`本质还是三个页面

<img src="./跟随狂神学Java-31.assets/image-20230710135104510.png" alt="image-20230710135104510" style="zoom:50%;" />

---

##### JSP九大内置对象

~~~text
request内置对象
response内置对象
page内置对象
session内置对象
application内置对象
out内置对象
exception内置对象
config内置对象
pageContext内置对象
~~~

~~~jsp
<%--内置对象--%>
<%
    pageContext.setAttribute("name1", "Joker1");    //保存的数据只在一个页面中有效
    request.setAttribute("name2", "Joker2");        //保存的数据只在一次请求中有效，请求转发会携带这个数据，没有转发将会消失
    session.setAttribute("name3", "Joker3");        //保存的数据只在一次会话中有效，从打开浏览器到关闭浏览器
    application.setAttribute("name4", "Joker4");    //保存的数据只在服务器中有效，从打开服务器到关闭服务器
%>

<%
    //从pageContext中获取
    //作用域从底层到高层
    String name1 = (String) pageContext.getAttribute("name1");
    String name2 = (String) pageContext.getAttribute("name2");
    String name3 = (String) pageContext.getAttribute("name3");
    String name4 = (String) pageContext.getAttribute("name4");
    String name5 = (String) pageContext.getAttribute("name5");//不存在
%>

<%--使用EL表达式输出--%>
    <h1>取出的值:</h1>
    <h3>${name1}</h3>
    <h3>${name2}</h3>
    <h3>${name3}</h3>
    <h3>${name4}</h3>
    <h3>${name5}</h3>
<%--如果使用普通方法取出name5，会输出NULL--%>
    <h3><%=name5%></h3>
~~~

双亲委派机制：这层没找到就向上一层找，直到找到最顶层，没找到就会NULL



---

##### JSP标签，JSTL标签，EL表达式

EL表达式：${}

* 获取数据
* 执行运算
* 获取web开发的常用对象
* 调用Java方法

**JSP标签**

   ~~~jsp
   <h1>Page1</h1>
   <%--
   http://localhost:8080/jspTag.jsp?name=Joker&age=19
   --%>
   <%--页面跳转--%>
   <%-- 转发的时候可以写东西的  --%>
   <jsp:forward page="/jspTag2.jsp">
       <jsp:param name="name" value="Joker"/>
       <jsp:param name="age" value="19"/>
   </jsp:forward>
   ~~~

~~~jsp
<h1>Page2</h1>
<%--取出参数--%>
名字：<%=request.getParameter("name")%>
年龄:<%=request.getParameter("age")%>
</body>
~~~

**JSTL表达式**

JSTL标签库的使用就是为了弥补HTML标签的不足，它自定义了许多标签，可供我们使用，标签的功能和Java代码一样

核心标签是最常用的 JSTL标签。引用核心标签库的语法如下：

~~~jsp
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
~~~

![image-20230710161213483](./跟随狂神学Java-31.assets/image-20230710161213483.png)

JSTL使用步骤：

1. 导入对应的taglib

2. 使用其中的方法 

   ~~~JSP
   <%@ page contentType="text/html;charset=UTF-8" language="java" %>
   <%--引入JSTL--%>
   <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
   <html>
   <head>
       <title>Title</title>
   </head>
   <body>
   
   <h4>if测试</h4>
   
   <hr>
   
   <form action="coreIf.jsp" method="get">
       <input type="text" name="name" value="${param.name}">
       <%--  EL表达式获取表单中的数据     ${param.参数名}  --%>
       <input type="submit" value="提交">
   </form>
   
   <%--判断如果提交的是管理员则登录成功,否则登录失败--%>
   <%--<%--%>
   <%--    if (request.getParameter("name").equals("admin")) {--%>
   <%--        out.println("登录成功");--%>
   <%--    }--%>
   <%--%>--%>
   <c:if test="${param.name == 'admin'}" var="isAdmin">
       <c:out value="管理员登录成功"/>
   </c:if>
   
   <%--自闭合标签--%>
   <c:out value="${isAdmin}"/>
   
   </body>
   </html>
   ~~~

   ~~~jsp
   <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
   <%@ page contentType="text/html;charset=UTF-8" language="java" %>
   <html>
   <head>
       <title>Title</title>
   </head>
   <body>
   
   <%--定义一个变量--%>
   <c:set var="score" value="85"/>
   
   <c:choose>
     <c:when test="${score>=90}">
         <c:out value="优秀"/>
     </c:when>
     <c:when test="${score>=80}">
         <c:out value="良好"/>
     </c:when>
     <c:when test="${score>=70}">
         <c:out value="中等"/>
     </c:when>
     <c:when test="${score>=60}">
         <c:out value="及格"/>
     </c:when>
     <c:otherwise>
         <c:out value="不及格"/>
     </c:otherwise>
   </c:choose>
   
   </body>
   </html>
   ~~~

   ~~~jsp
   <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
   <%@ page import="java.util.ArrayList" %>
   <%@ page contentType="text/html;charset=UTF-8" language="java" %>
   <html>
   <head>
       <title>Title</title>
   </head>
   <body>
   <%
     ArrayList<String> people = new ArrayList<>();
     people.add(0,"Jack");
     people.add(1,"Tom");
     people.add(2,"Jerry");
     people.add(3,"Sam");
     people.add(4,"Lily");
     people.add(5,"Bob");
     request.setAttribute("list",people);
   %>
   
   <%--
   var:每次遍历出来的对象
   items：要遍历的对象
   --%>
   <c:forEach var="p" items="${list}" >
       <c:out value="${p}"/> <br>
   </c:forEach>
   
   <hr>
   <%--
   参数解释：
       var:每次遍历出来的对象
       items：要遍历的对象
       step：步长
       begin：起始值
       end：结束值
   --%>
   <c:forEach begin="1" end="5" step="2" var="i" items="${list}">
       <c:out value="${i}"/>
   </c:forEach>
   </body>
   </html>
   ~~~

   

---

##### JavaBean

实体类

JavaBean由特定的写法：

* 必须要有一个无参构造
* 属性必须私有化
* 必须要有对应的get/set

一般用来和数据库的字段做映射 ORM

ORM：对象关系映射

* 表-->类
* 字段-->属性
* 行记录-->对象

**people表：**

| id   | name   | age  | address |
| ---- | ------ | ---- | ------- |
| 1    | Joker1 | 18   | 湖南    |
| 2    | Joker2 | 19   | 湖南    |
| 3    | Joker3 | 20   | 湖南    |

~~~java
class People{
    private int id;
    private String name;
    private int age;
    private String address;
}

class A{
    new People(1,"Joker1",18,"湖南");
}
~~~





#### MVC三层架构

---

什么是MVC：Model模型，View视图，Controller控制器

以往的开发逻辑：

* 用户直接访问控制层，控制层就可以直接操作数据库

  ~~~text
  servlet--CRUD-->数据库
  弊端：程序十分臃肿，不利于维护	servlet的代码中：处理请求、响应、视图跳转、处理JDBC、处理业务代码、逻辑代码
  
  架构：没有什么是加一层解决不了的
  
  数据库有很多：Mysql、Oracle、SqlServer...我们只需要实现JDBC，就可以直接操作数据库
  ~~~

* ![image-20230710190622225](./跟随狂神学Java-31.assets/image-20230710190622225.png)

现在的开发逻辑：

* 用户只需要访问视图层
* ![image-20230710191530141](./跟随狂神学Java-31.assets/image-20230710191530141.png)



**Model**

* 业务处理：业务逻辑（Service）
* 数据持久层：CRUD（Dao）

**View**

* 展示数据
* 提供链接发起Servlet请求（a, form, img...)

**Controller（Servlet）**

* 接收用户的请求：（req：请求参数、Session信息...）

* 交给业务层处理对应的代码

* 控制视图的跳转

  ~~~text
  登录 ---> 接收用户的登录请求 ---> 处理用户的请求（获取用户登录的参数）--->交给业务层处理登录业务（判断用户登录名密码是否正确） ---> Dao层查询用户名和密码是否正确 ---> Dao查询数据库
  ~~~


**一些术语：**

* Dao:
  * DAO (DataAccessObjects **数据存取对象**)是指位于业务逻辑和持久化数据之间实现对持久化数据的访问。通俗来讲，就是**将数据库操作都封装起来**。
  
* Pojo:
  * POJO（Plain Ordinary Java Object）**简单的Java对象**，实际就是普通JavaBeans，是为了避免和EJB混淆所创造的简称。
  * 使用POJO名称是为了避免和EJB混淆起来, 而且简称比较直接. 其中有一些属性及其getter setter方法的类,没有业务逻辑，有时可以作为VO(value -object)或dto(Data Transform Object)来使用.当然,如果你有一个简单的运算属性也是可以的,但不允许有业务方法,也不能携带有connection之类的方法。
  
  

#### 过滤器

---

Filter：过滤器，用来过滤网站的数据

* 处理中文乱码

* 登录验证

  ![image-20230710192418722](./跟随狂神学Java-31.assets/image-20230710192418722.png)

Filter开发步骤：

1. 导包

2. 编写过滤器

   注意导包不要错，是servlet下的Filter

   实现Filter接口，重写对应的方法

   ~~~java
   package com.joker_yue.filter;
   
   import javax.servlet.*;
   import java.io.IOException;
   
   public class CharacterEncodingFilter implements Filter {
       //初始化
       // Web服务器启动了，过滤器就会同时启动
       @Override
       public void init(FilterConfig filterConfig) throws ServletException {
           System.out.println("CharacterEncodingFilter 已经初始化");
       }
   
       //过滤
       // Chain：链
       /*
       * 1. 过滤中的所有代码，在过滤特定请求的时候都会执行
       * 2. 必须要让过滤器继续通行
       *  */
       @Override
       public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
           servletRequest.setCharacterEncoding("UTF-8");
           servletResponse.setCharacterEncoding("UTF-8");
           servletResponse.setContentType("text/html;charset=UTF-8");
   
           System.out.println("CharacterEncodingFilter 执行前...");
           // 下面这行代码是固定死了的！！！不然全给你过滤了
           filterChain.doFilter(servletRequest, servletResponse);//让我们的请求继续走，如果不写，程序就停止了
           System.out.println("CharacterEncodingFilter 执行后...");
       }
   
       //销毁
       @Override
       public void destroy() {
           System.out.println("CharacterEncodingFilter 已经销毁");
       }
   }
   
   ~~~

   

3. 在web.xml中配置Filter过滤器

   ~~~xml
   <?xml version="1.0" encoding="UTF-8"?>
   <web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
            version="4.0">
   
   
     <servlet>
       <servlet-name>ShowServlet</servlet-name>
       <servlet-class>com.joker_yue.filter.ShowServlet</servlet-class>
     </servlet>
     <servlet-mapping>
       <servlet-name>ShowServlet</servlet-name>
       <url-pattern>/show</url-pattern>
     </servlet-mapping>
     <servlet-mapping>
       <servlet-name>ShowServlet</servlet-name>
       <url-pattern>/servlet/show</url-pattern>
     </servlet-mapping>
   
     <filter>
       <filter-name>CharacterEncodingFilter</filter-name>
       <filter-class>com.joker_yue.filter.CharacterEncodingFilter</filter-class>
     </filter>
     <filter-mapping>
       <filter-name>CharacterEncodingFilter</filter-name>
       <!-- 只要是/servlet/*的请求都会过滤 -->
       <url-pattern>/servlet/*</url-pattern>
     </filter-mapping>
   </web-app>
   ~~~

    

#### 监听器

---

实现监听器接口：（很多种）

1. 实现监听器接口

   ~~~java
   package com.joker_yue.listener;
   
   import javax.servlet.ServletContext;
   import javax.servlet.http.HttpSessionEvent;
   import javax.servlet.http.HttpSessionListener;
   
   // 统计网站在线人数监听：统计Session
   public class OnlineCountListener implements HttpSessionListener {
   
       // 创建Session监听：看你的一举一动
       // 一旦创建Session就会触发一次这个事件
       @Override
       public void sessionCreated(HttpSessionEvent httpSessionEvent) {
   
           System.out.println(httpSessionEvent.getSession().getId());
   
           ServletContext ctx = httpSessionEvent.getSession().getServletContext();
           Integer onlineCount = (Integer) ctx.getAttribute("OnlineCount");
           if (onlineCount == null) {
               onlineCount = Integer.valueOf("1");
           } else {
               int count = onlineCount.intValue();
               onlineCount = count + 1;
           }
           ctx.setAttribute("OnlineCount", onlineCount);
       }
   
       // 销毁Session监听
       // 一旦销毁Session就会触发一次这个事件
       @Override
       public void sessionDestroyed(HttpSessionEvent httpSessionEvent) {
           ServletContext ctx = httpSessionEvent.getSession().getServletContext();
           Integer onlineCount = (Integer) ctx.getAttribute("OnlineCount");
           if (onlineCount == null) {
               onlineCount = Integer.valueOf("0");
           } else {
               int count = onlineCount.intValue();
               onlineCount = count - 1;
           }
           ctx.setAttribute("OnlineCount", onlineCount);
       }
   
   
       /*
       * Session销毁方案
       * 1. 手动销毁   getSession().invalidate();
       * 2. 自动销毁   在web.xml中配置Session自动过期时间
       *  */
   }
   ~~~

   

2. 在web.xml中注册监听器

   ~~~xml
     <!-- 注册监听器 -->
     <listener>
       <listener-class>com.joker_yue.listener.OnlineCountListener</listener-class>
     </listener>
   ~~~

3. 看情况是否使用

   ~~~jsp
   <h1>当前有<span style="color: red"><%=getServletConfig().getServletContext().getAttribute("OnlineCount")%></span>人在线</h1>
   ~~~

   



#### 过滤器、监听器常见应用

---

监听器：图形化（GUI）编程中常使用

~~~java
package com.joker_yue.listener;

import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

public class TestPanel {
    public static void main(String[] args) {
        Frame frame = new Frame("摸鱼的一天");   //新建一个窗体
        Panel panel = new Panel(null);        //面板

        frame.setLayout(null);  //设置窗体布局

        frame.setBounds(300,300,500,500);  //设置窗体位置

        frame.setBackground(new Color(0,0,255));  //设置窗体背景颜色

        panel.setBounds(50,50,300,300);  //设置面板位置

        panel.setBackground(new Color(0,255,255));  //设置面板背景颜色

        frame.add(panel);  //将面板添加到窗体

        frame.setVisible(true);

        //监听事件，监听关闭事件
        frame.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                System.out.println("窗体正在尝试关闭");
                System.exit(0);
            } 
        });

    }
}
~~~

用户登录之后才能进入首页，用户注销之后就不能进入首页了 

1. 用户登录之后，向Session中放入用户的数据

2. 进入主页的之后要判断用户是否已经登录。要求：在过滤器中实现

   ~~~java
   @Override
   public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
       HttpServletRequest request = (HttpServletRequest) servletRequest;
       HttpServletResponse response = (HttpServletResponse) servletResponse;
   
       request.getSession().setAttribute("USER_SESSION", request.getSession().getId());
       if(request.getSession().getAttribute("USER_SESSION") == null){
           response.sendRedirect(request.getContextPath()+"/error.jsp");
       }
   
       filterChain.doFilter(servletRequest, servletResponse);
   }
   ~~~

   

#### JDBC

---

什么是JDBC？Java连接数据库

<img src="./跟随狂神学Java-31.assets/image-20230711160152508.png" alt="image-20230711160152508" style="zoom: 33%;" />

导入数据库依赖

~~~xml
        <dependency>
            <!-- mysql -->
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.31</version>
        </dependency>
~~~

JDBC固定步骤

1. 加载驱动
2. 连接数据库
3.  向数据库发送SQL的对象Statement。现在statement做CRUD
4. 根据业务编写不同的sql
5. 执行sql
6. 关闭连接

~~~java
package com.joker_yue.test;

import java.sql.*;

public class TestJDBC {
    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        // 首先获取配置信息
        String url = "jdbc:mysql://localhost:3306/jdbc?useUnicode=true&characterEncoding=utf-8";
        String username = "root";
        String password = "root";

        // 1.加载驱动
        Class.forName("com.mysql.cj.jdbc.Driver");
        // 2.连接数据库,现在connection代表数据库,DriverManager代表驱动管理
        Connection connection = DriverManager.getConnection(url, username, password);

        // 3. 向数据库发送SQL的对象Statement.现在statement做CRUD
        Statement statement = connection.createStatement();

        // 4.编写SQL
        String sql = "select * from users;";// 里面的分号可要可不要

        // 5. 执行查询sql,返回一个结果集 ResultSet
        ResultSet resultSet = statement.executeQuery(sql);

        while (resultSet.next()) {  // 当作链表遍历
            System.out.println("id="+resultSet.getObject("id"));
            System.out.println("name="+resultSet.getObject("name"));
            System.out.println("password="+resultSet.getObject("password"));
            System.out.println("email="+resultSet.getObject("email"));
            System.out.println("birthday="+resultSet.getObject("birthday"));
        }

        //6. 关闭连接,释放资源(一定要做) 先开后关
        resultSet.close();
        statement.close();
        connection.close();


    }
}
~~~

预编译SQL

~~~java
package com.joker_yue.test;

import java.sql.*;
import java.text.SimpleDateFormat;


public class TestJDBC2 {
    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        // 首先获取配置信息
        String url = "jdbc:mysql://localhost:3306/jdbc?useUnicode=true&characterEncoding=utf-8";
        String username = "root";
        String password = "root";

        // 1.加载驱动
        Class.forName("com.mysql.cj.jdbc.Driver");

        // 2.连接数据库,现在connection代表数据库,DriverManager代表驱动管理
        Connection connection = DriverManager.getConnection(url, username, password);

        // 3. 编写sql
        String sql = "insert into users(id,name,password,email,birthday) values(?,?,?,?,?)";

        //4. 预编译sql
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1,4);//给第一个占位符赋值为1
        preparedStatement.setString(2,"Joker_Yue");//给第二个占位符赋值
        preparedStatement.setString(3,"123456");//给第三个占位符赋值
        preparedStatement.setString(4,"123@qq.com");//给第四个占位符赋值
        preparedStatement.setString(5, String.valueOf(new Date(new java.util.Date().getTime())));//给第五个占位符赋值

        //5.执行sql
        int i = preparedStatement.executeUpdate();
        if(i>0){
            System.out.println("插入成功");
        }

        // 6. 关闭连接,释放资源(一定要做) 先开后关
        preparedStatement.close();
        connection.close();
    }
}
~~~

---

##### 事务

要么都成功，要么都失败

ACID原则：保证数据安全

~~~text
开启事务
事务提交 commit()
事务回滚 rollback()
关闭事务
~~~

Junit单元测试

依赖：

~~~xml
<!-- 单元测试 -->
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13</version>
</dependency>
~~~

简单使用：

`@Test`注解只有在方法上有效，只要加了这个注解的方法就可以直接运行 

~~~java
package com.joker_yue.test;

import org.junit.Test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class TestJDBC3 {
    @Test
    public void test() {
        // 首先获取配置信息
        String url = "jdbc:mysql://localhost:3306/jdbc?useUnicode=true&characterEncoding=utf-8";
        String username = "root";
        String password = "root";

        Connection connection = null;


        // 1.加载驱动
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 2.连接数据库,现在connection代表数据库,DriverManager代表驱动管理
            connection = DriverManager.getConnection(url, username, password);

            // 3.通知数据库开启事务  false开启,不是ture
            connection.setAutoCommit(false);

            // 4.编写并执行sql
            String sql = " update account set money = money-100 where name='A';";
            connection.prepareStatement(sql).executeUpdate();

            // 制造错误
            // int i = 1 / 0;

            String sql2 = " update account set money = money+100 where name='B';";
            connection.prepareStatement(sql2).executeUpdate();

            // 5.提交事务
            connection.commit();// 以上两条SQL都执行成功了,就提交事务
            System.out.println("success");

        } catch (Exception e) {
            try {
                // 如果出现异常,就通知数据库回滚事务
                connection.rollback();
            } catch (SQLException ex) {
                throw new RuntimeException(ex);
            }
        }finally {
            // 6. 关闭连接,释放资源(一定要做) 先开后关
            try {
                connection.close();
            } catch (SQLException ex) {
                throw new RuntimeException(ex);
            }
        }
    }
}
~~~



#### SMBMS

---

超市订单管理系统

![image-20230711191654404](./跟随狂神学Java-31.assets/image-20230711191654404.png)

![image-20230711191808210](./跟随狂神学Java-31.assets/image-20230711191808210.png)

项目如何搭建

考虑使不使用Mavne

---

##### 项目搭建准备工作

1. 搭建一个maven web项目

2. 配置Tomcat

3. 测试项目是否能够跑起来

4. 导入项目中需要的jar包

5. 创建项目包结构

   ![image-20230711192836665](./跟随狂神学Java-31.assets/image-20230711192836665.png)

6. 编写实体类

   ORM映射：表-类映射

7. 编写基础公共类

   1. 数据库配置文件

      ~~~properties
      driver=com.mysql.jdbc.Driver
      url=jdbc:mysql://localhost:3306?useUnicode=ture&characterEncoding=UTF-8
      user=root
      password=root
      ~~~

   2. 编写数据库的公共类

      ~~~java
      package com.joker_yue.dao;
      
      import java.io.IOException;
      import java.io.InputStream;
      import java.sql.*;
      import java.util.Properties;
      
      // 操作数据库的公共类
      public class BaseDao {
          private static String driver;
          private static String url;
          private static String username;
          private static String password;
      
          // 静态代码块，类加载的时候就初始化
          static {
              // 通过反射：类加载器读取对应的资源
              InputStream is = BaseDao.class.getClassLoader().getResourceAsStream("db.properties");
              Properties properties = new Properties();
              try {
                  properties.load(is);
              } catch (IOException e) {
                  throw new RuntimeException(e);
              }
              driver = properties.getProperty("driver");
              url = properties.getProperty("url");
              username = properties.getProperty("username");
              password = properties.getProperty("password");
      
          }
      
          // 获取数据库的链接
          public static Connection getConnection() {
              Connection connection = null;
              try {
                  Class.forName(driver);
                  connection = DriverManager.getConnection(url, username, password);
              } catch (Exception e) {
                  throw new RuntimeException(e);
              }
              return connection;
          }
      
          // 编写查询公共类、
          public static ResultSet execute(Connection connection, String sql, Object[] params, ResultSet resultSet, PreparedStatement preparedStatement) throws SQLException {
              // 预编译的sql，在后面直接执行就可以了
              preparedStatement = connection.prepareStatement(sql);
              for (int i = 0; i < params.length; i++) {
                  // setObject，占位符从1开始，而数组从0开始
                  preparedStatement.setObject(i + 1, params[i]);
              }
              resultSet = preparedStatement.executeQuery();
              return resultSet;
          }
      
          // 编写增删改公共方法
          public static int execute(Connection connection, String sql, Object[] params) throws SQLException {
              PreparedStatement preparedStatement = connection.prepareStatement(sql);
              for (int i = 0; i < params.length; i++) {
                  // setObject，占位符从1开始，而数组从0开始
                  preparedStatement.setObject(i + 1, params[i]);
              }
              int updateRows = preparedStatement.executeUpdate();
              return updateRows;
          }
      
          // 关闭连接，释放资源
          public static boolean closeResource(Connection connection, PreparedStatement preparedStatement, ResultSet resultSet) {
              boolean flag = true;
              if (resultSet != null) {
                  try {
                      // 关闭结果集
                      resultSet.close();
                  } catch (SQLException e) {
                      flag = false;
                      throw new RuntimeException(e);
                  }
              }
              if (preparedStatement != null) {
                  try {
                      // 关闭预编译
                      preparedStatement.close();
                  } catch (SQLException e) {
                      flag = false;
                      throw new RuntimeException(e);
                  }
              }
              if (connection != null) {
                  try {
                      // 关闭连接
                      connection.close();
                  } catch (SQLException e) {
                      flag = false;
                      throw new RuntimeException(e);
                  }
              }
              return flag;
          }
      }
      ~~~

   3. 编写字符编码过滤器

      ~~~java
      package com.joker_yue.filter;
      
      import javax.servlet.*;
      import java.io.IOException;
      
      public class CharacterEncodingFilter implements Filter {
      
          @Override
          public void init(FilterConfig filterConfig) throws ServletException {
              Filter.super.init(filterConfig);
          }
      
          @Override
          public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
              request.setCharacterEncoding("UTF-8");
              response.setCharacterEncoding("UTF-8");
              chain.doFilter(request, response);
          }
      
          @Override
          public void destroy() {
              Filter.super.destroy();
          }
      }
      ~~~

      ~~~xml
      <!--字符编码过滤器-->
      <filter>
          <filter-name>CharacterEncodingFilter</filter-name>
          <filter-class>com.joker_yue.filter.CharacterEncodingFilter</filter-class>
      </filter>
      <filter-mapping>
      <filter-name>CharacterEncodingFilter</filter-name>
      <url-pattern>/*</url-pattern>
      </filter-mapping>
      ~~~

      

---

##### 登录功能实现

![image-20230717160358190](./跟随狂神学Java-31.assets/image-20230717160358190.png)

1. 编写前端页面

2. 设置首页

   ~~~xml
   <!--   设置欢迎页面   -->
   <welcome-file-list>
       <welcome-file>login.jsp</welcome-file>
   </welcome-file-list>
   ~~~

3. 编写dao层得到用户登录的接口

   ~~~java
   package com.joker_yue.dao.user;
   
   import com.joker_yue.pojo.User;
   
   import java.sql.Connection;
   import java.sql.SQLException;
   
   public interface UserDao {
       //得到登录的用户
       public User getLoginUser(Connection connection,String userCode) throws SQLException;
   }
   ~~~

4. 编写dao接口的实现类

   ~~~java
   package com.joker_yue.dao.user;
   
   import com.joker_yue.dao.BaseDao;
   import com.joker_yue.pojo.User;
   
   import java.sql.Connection;
   import java.sql.PreparedStatement;
   import java.sql.ResultSet;
   import java.sql.SQLException;
   
   public class UserDaoImpl implements UserDao {
       @Override
       // 得到登录的用户
       public User getLoginUser(Connection connection, String userCode) throws SQLException {
   
           PreparedStatement prst = null;// 预编译
           ResultSet resultSet = null;// 结果集
           User user = null;   // 要返回的实体类
   
   
           if (connection != null) {
               String sql = "select * from smbms_user where userCode=?";
               Object[] params = {userCode};
   
               resultSet = BaseDao.execute(connection, prst, resultSet, sql, params);
   
               if (resultSet.next()) {
                   user = new User();
                   user.setId(resultSet.getInt("id"));
                   user.setUserCode(resultSet.getString("userCode"));
                   user.setUserName(resultSet.getString("userName"));
                   user.setUserPassword(resultSet.getString("userPassword"));
                   user.setGender(resultSet.getInt("gender"));
                   user.setBirthday(resultSet.getDate("birthday"));
                   user.setPhone(resultSet.getString("phone"));
                   user.setAddress(resultSet.getString("address"));
                   user.setUserRole(resultSet.getInt("userRole"));
                   user.setCreatedBy(resultSet.getInt("createdBy"));
                   user.setCreationDate(resultSet.getTimestamp("creationDate"));
                   user.setModifyBy(resultSet.getInt("modifyBy"));
                   user.setModifyDate(resultSet.getTimestamp("modifyDate"));
               }
               BaseDao.closeResource(null, prst, resultSet);
           }
           return user;
       }
   }
   ~~~

5. 业务层接口

     ~~~java
     package com.joker_yue.service.user;
     
     import com.joker_yue.pojo.User;
     
     public interface UserService {
         // 用户登录
         public User login(String userCode, String userPassword);
     
     }
     
     ~~~

   

6. 业务层实现类

   ~~~java
   package com.joker_yue.service.user;
   
   import com.joker_yue.dao.BaseDao;
   import com.joker_yue.dao.user.UserDao;
   import com.joker_yue.dao.user.UserDaoImpl;
   import com.joker_yue.pojo.User;
   import org.junit.Test;
   
   import java.sql.Connection;
   import java.sql.SQLException;
   
   public class UserServiceImpl implements UserService {
       // 业务层都会调用Dao层，所以我们要引入Dao层
       private UserDao userDao;
   
       public UserServiceImpl() {
           userDao = new UserDaoImpl();
       }
   
       @Override
       public User login(String userCode, String userPassword) {
           Connection connection = null;
           User user = null;
   
           try {
               connection = BaseDao.getConnection();
               // 通过业务层调用对应的Dao层
               user = userDao.getLoginUser(connection, userCode);
           } catch (SQLException e) {
               throw new RuntimeException(e);
           }finally {
               BaseDao.closeResource(connection, null, null);
           }
           return user;
       }
   
   }
   ~~~

7. 编写Servlet

    ~~~java
    package com.joker_yue.servlet.user;
    
    import com.joker_yue.pojo.User;
    import com.joker_yue.service.user.UserServiceImpl;
    import com.joker_yue.util.Constants;
    
    import javax.servlet.ServletException;
    import javax.servlet.http.HttpServlet;
    import javax.servlet.http.HttpServletRequest;
    import javax.servlet.http.HttpServletResponse;
    import java.io.IOException;
    
    public class LoginServlet extends HttpServlet {
    
        // Servlet： 控制层调用业务层代码
    
        @Override
        protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
            System.out.println("LoginServlet...start");
    
            // 获取用户名和密码
            String userCode = req.getParameter("userCode");
            String userPassword = req.getParameter("userPassword");
    
            // 和数据库中的密码进行对比，调用业务层
            UserServiceImpl userService = new UserServiceImpl();
            User user = userService.login(userCode, userPassword);  // 已经把登录的人查出来了
            if (user != null) { //查到了，可以登录
                // 将用户的信息放在Session中
                req.getSession().setAttribute(Constants.USER_SESSION, user);
                //登录成功后跳转到内部主页
                resp.sendRedirect("jsp/frame.jsp");
            } else {
                // 登录失败
                // 跳转到登录页面，顺便提示用户名或者密码错误
                req.setAttribute("error", "用户名或者密码错误");
                req.getRequestDispatcher("login.jsp").forward(req, resp);
    
            }
    
    
        }
    
        @Override
        protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
            doGet(req, resp);
        }
    }
    ~~~

8. 注册Servlet

   ~~~xml
   <!-- Servlet -->
       <servlet>
           <servlet-name>LoginServlet</servlet-name>
           <servlet-class>com.joker_yue.servlet.user.LoginServlet</servlet-class>
       </servlet>
       <servlet-mapping>
           <servlet-name>LoginServlet</servlet-name>
           <url-pattern>/login.do</url-pattern>
       </servlet-mapping>
   ~~~

9. 测试访问

---

##### 登录功能优化

1. 注销功能

   ~~~java
   package com.joker_yue.servlet.user;
   
   import com.joker_yue.util.Constants;
   
   import javax.servlet.ServletException;
   import javax.servlet.http.HttpServlet;
   import javax.servlet.http.HttpServletRequest;
   import javax.servlet.http.HttpServletResponse;
   import java.io.IOException;
   
   public class LogoutServlet extends HttpServlet {
   
       @Override
       protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
           //移除Session
           req.getSession().removeAttribute(Constants.USER_SESSION);
           //重定向至登录
           resp.sendRedirect(req.getContextPath()+"/login.jsp");
       }
   
       @Override
       protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
           doGet(req, resp);
       }
   }
   ~~~

   ~~~xml
   <servlet>
       <servlet-name>LogoutServlet</servlet-name>
       <servlet-class>com.joker_yue.servlet.user.LogoutServlet</servlet-class>
   </servlet>
   <servlet-mapping>
       <servlet-name>LogoutServlet</servlet-name>
       <url-pattern>/jsp/logout.do</url-pattern>
   </servlet-mapping>
   ~~~

2. 权限访问过滤

   ~~~java
   package com.joker_yue.filter;
   
   import com.joker_yue.pojo.User;
   import com.joker_yue.util.Constants;
   
   import javax.servlet.*;
   import javax.servlet.http.HttpServlet;
   import javax.servlet.http.HttpServletRequest;
   import javax.servlet.http.HttpServletResponse;
   import java.io.IOException;
   
   public class SysFilter implements Filter {
       @Override
       public void init(FilterConfig filterConfig) throws ServletException {
           Filter.super.init(filterConfig);
       }
   
       @Override
       public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
           HttpServletRequest httpServletRequest = (HttpServletRequest) request;
           HttpServletResponse httpServletResponse = (HttpServletResponse) response;
   
           //过滤器，从Session中获取用户
           User user = (User)httpServletRequest.getSession().getAttribute(Constants.USER_SESSION);
           if(user==null){//已经被移除或者注销
               httpServletResponse.sendRedirect(httpServletRequest.getContextPath()+"/error.jsp");
           }else {
               chain.doFilter(request,response);
           }
       }
   
       @Override
       public void destroy() {
           Filter.super.destroy();
       }
   }
   ~~~

   ~~~xml
   <!-- 权限访问过滤器 -->
   <filter>
       <filter-name>SysFilter</filter-name>
       <filter-class>com.joker_yue.filter.SysFilter</filter-class>
   </filter>
   <filter-mapping>
       <filter-name>SysFilter</filter-name>
       <url-pattern>/jsp/*</url-pattern>
   </filter-mapping>
   ~~~

----

##### 密码修改

![image-20230718161244221](./跟随狂神学Java-31.assets/image-20230718161244221.png)

1. UserDao接口

   ~~~java
   //修改用户密码
   public int updatePwd(Connection connection,int id,int pwd)throws SQLException;
   ~~~

2. UserDaoImpl

   ~~~java
   @Override
   public int updatePwd(Connection connection, int id, int pwd) throws SQLException {
       PreparedStatement prst = null;
       int execute=0;
       if (connection != null) {
           String sql = "update smbms.smbms_user set userPassword = ? where id =?";
           Object params[] = {pwd, id};
           execute = BaseDao.execute(connection, prst, sql, params);
           BaseDao.closeResource(null, prst, null);
       }
       return execute;
   }
   ~~~

3. UserService层

   ~~~java
   // 根据UserId修改密码
   public boolean updatePwd(int id,int password);
   ~~~

4. UserService实现类

   ~~~java
   @Override
   public boolean updatePwd(int id, int password) {
       Connection connection = null;
       boolean flag = false;
       // 修改密码
       try {
           connection = BaseDao.getConnection();
           if (userDao.updatePwd(connection, id, password) > 0) {
               flag = true;
           }
       } catch (SQLException e) {
           throw new RuntimeException(e);
       } finally {
           BaseDao.closeResource(connection, null, null);
       }
       return flag;
   }
   ~~~

5. UserServlet

   ~~~java
   package com.joker_yue.servlet.user;
   
   import com.joker_yue.pojo.User;
   import com.joker_yue.service.user.UserServiceImpl;
   import com.joker_yue.util.Constants;
   import com.mysql.cj.util.StringUtils;
   
   import javax.servlet.ServletException;
   import javax.servlet.http.HttpServlet;
   import javax.servlet.http.HttpServletRequest;
   import javax.servlet.http.HttpServletResponse;
   import java.io.IOException;
   
   public class UserServlet extends HttpServlet {
       @Override
       protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
          // 从Session中获取用户Id
           Object user = req.getSession().getAttribute(Constants.USER_SESSION);
           String newPassword = req.getParameter("newpassword");
   
           boolean flag = false;
   
           System.out.println("已经进入修改密码");
           System.out.println("user = " + (User) user);
   
           if (user != null && !StringUtils.isNullOrEmpty(newPassword)) {
               UserServiceImpl userService = new UserServiceImpl();
               flag = userService.updatePwd(((User) user).getId(), newPassword);
               if (flag) {
                   req.setAttribute("message", "修改密码成功，请退出，使用新密码登录");
                   // 密码修改成功，移除Session
                   req.getSession().removeAttribute(Constants.USER_SESSION);
               } else {
                   req.setAttribute("message", "修改密码失败");
               }
           } else {
               req.setAttribute("message", "新密码有问题");
           }
           req.getRequestDispatcher("pwdmodify.jsp").forward(req, resp);
       }
   
       @Override
       protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
           doGet(req, resp);
       }
   }
   ~~~

6. 记得实现复用，需要提取出方法

   ~~~java
   package com.joker_yue.servlet.user;
   
   import com.joker_yue.pojo.User;
   import com.joker_yue.service.user.UserServiceImpl;
   import com.joker_yue.util.Constants;
   import com.mysql.cj.util.StringUtils;
   
   import javax.servlet.ServletException;
   import javax.servlet.http.HttpServlet;
   import javax.servlet.http.HttpServletRequest;
   import javax.servlet.http.HttpServletResponse;
   import java.io.IOException;
   
   /**
    * 用户操作
    * 实现servlet复用
    *
    * @author Joker
    * @version 1.0
    * @date 2023/7/18 13:38
    */
   public class UserServlet extends HttpServlet {
       @Override
       protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
           String method = req.getParameter("method");
           if(method.equals("savepwd") && method!=null){
               this.updatePwd(req,resp);
           }
       }
   
       @Override
       protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
           doGet(req, resp);
       }
   
       /**
        * <p> 更新用户密码的封装 </p>
        * <p> 2023/7/18,14:12 </p>
        *
        * @param req  传入
        * @param resp 响应
        */
       public void updatePwd(HttpServletRequest req, HttpServletResponse resp) {
           // 从Session中获取用户Id
           Object user = req.getSession().getAttribute(Constants.USER_SESSION);
           String newPassword = req.getParameter("newpassword");
   
           boolean flag = false;
   
           System.out.println("已经进入修改密码");
           System.out.println("user = " + (User) user);
   
   
           if (user != null && !StringUtils.isNullOrEmpty(newPassword)) {
               UserServiceImpl userService = new UserServiceImpl();
               flag = userService.updatePwd(((User) user).getId(), newPassword);
               if (flag) {
                   req.setAttribute("message", "修改密码成功，请退出，使用新密码登录");
                   // 密码修改成功，移除Session
                   req.getSession().removeAttribute(Constants.USER_SESSION);
               } else {
                   req.setAttribute("message", "修改密码失败");
               }
           } else {
               req.setAttribute("message", "新密码有问题");
           }
           try {
               req.getRequestDispatcher("pwdmodify.jsp").forward(req, resp);
           } catch (ServletException e) {
               throw new RuntimeException(e);
           } catch (IOException e) {
               throw new RuntimeException(e);
           }
       }
   }
   
   ~~~

   

---

##### 优化修改密码使用Ajax

~~~java
package com.joker_yue.servlet.user;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.joker_yue.pojo.User;
import com.joker_yue.service.user.UserServiceImpl;
import com.joker_yue.util.Constants;
import com.mysql.cj.util.StringUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

/**
 * 用户操作
 * 实现servlet复用
 *
 * @author Joker
 * @version 1.0
 * @date 2023/7/18 13:38
 */
public class UserServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String method = req.getParameter("method");
        if (method.equals("savepwd") && method != null) {
            this.updatePwd(req, resp);
        } else if (method.equals("pwdmodify") && method != null) {
            this.pwdModify(req, resp);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }

    /**
     * <p> 更新用户密码的封装 </p>
     * <p> 2023/7/18,14:12 </p>
     *
     * @param req  传入
     * @param resp 响应
     */
    public void updatePwd(HttpServletRequest req, HttpServletResponse resp) {
        // 从Session中获取用户Id
        Object user = req.getSession().getAttribute(Constants.USER_SESSION);
        String newPassword = req.getParameter("newpassword");

        boolean flag = false;

        System.out.println("已经进入修改密码");
        System.out.println("user = " + (User) user);


        if (user != null && !StringUtils.isNullOrEmpty(newPassword)) {
            UserServiceImpl userService = new UserServiceImpl();
            flag = userService.updatePwd(((User) user).getId(), newPassword);
            if (flag) {
                req.setAttribute("message", "修改密码成功，请退出，使用新密码登录");
                // 密码修改成功，移除Session
                req.getSession().removeAttribute(Constants.USER_SESSION);
            } else {
                req.setAttribute("message", "修改密码失败");
            }
        } else {
            req.setAttribute("message", "新密码有问题");
        }
        try {
            req.getRequestDispatcher("pwdmodify.jsp").forward(req, resp);
        } catch (ServletException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * <p> 验证旧密码,Session中有用户的密码 </p>
     * <p> 2023/7/18,14:32 </p>
     *
     * @param req  请求
     * @param resp 响应
     */
    public void pwdModify(HttpServletRequest req, HttpServletResponse resp) {
        // 从Session中获取用户Id
        Object user = req.getSession().getAttribute(Constants.USER_SESSION);
        String oldPassword = req.getParameter("oldpassword");


        // 万能的Map：结果集
        Map<String, String> resultMap = new HashMap<>();

        if (user == null) { // Session失效
            resultMap.put("result", "sessionerror");
        } else if (StringUtils.isNullOrEmpty(oldPassword)) {
            resultMap.put("result", "error");
        } else {
            String userPassword = ((User) user).getUserPassword();     // Session中用户的密码
            if (oldPassword.equals(userPassword)) {
                resultMap.put("result", "true");    // 验证成功
            } else {
                resultMap.put("result", "false");    // 验证失败
            }
        }

        try {
            resp.setContentType("application/json");  // 转换为json
            PrintWriter writer = resp.getWriter();
            // JSONArray 阿里巴巴的JSON工具类，转换为json格式
            /*
             * 当前格式 resultMap = ["result","sessionerror","result","false","result","true"]
             * JSON格式 resultMap = {"result":"sessionerror","result":"false","result":"true"}
             */
            writer.write(JSONArray.toJSONString(resultMap));
            writer.flush();
            writer.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
~~~

---

##### 用户管理实现

![image-20230718161311238](./跟随狂神学Java-31.assets/image-20230718161311238.png)

1. 导入分页的工具类

2. 用户列表页面导入

   userlist.jsp

   rollpage.jsp

---

##### 获取用户数量

1. UserDao

   ~~~java
   // 查询用户数量
   public int getUserCount(Connection connection,String userName,int userRole) throws SQLException;
   ~~~

2. UserDaoImpl

   ~~~java
   /**
    * <p> 根据用户名或角色查询用户 </p>
    * <p> 2023/7/18,16:51 </p>
    *
    * @param connection 连接
    * @param userName   用户名
    * @param userRole   用户角色
    * @return int
    */
   @Override
   public int getUserCount(Connection connection, String userName, int userRole) throws SQLException {
       PreparedStatement prst = null;
       ResultSet resultSet = null;
       int count = 0;
       if (connection != null) {
           StringBuffer sql = new StringBuffer();
           sql.append("select count(1) as count from smbms.smbms_user u,smbms.smbms_role r where u.userRole = r.id");
           ArrayList<Object> list = new ArrayList<>();
   
           if (!StringUtils.isNullOrEmpty(userName)) {
               sql.append(" and u.userName like ?");
               list.add("%" + userName + "%"); // index 0
           }
           if (userRole > 0) {
               sql.append(" and u.userRole = ?");
               list.add(userRole); // index 1
           }
   
           // 怎么把List转换成数组
           Object[] params = list.toArray();
   
           // 输出sql语句
           System.out.println("This is in UserDaoImpl, sql is:" + sql.toString());
           resultSet = BaseDao.execute(connection, prst, resultSet, sql.toString(), params);
   
           if (resultSet.next()) {
               count = resultSet.getInt("count");  // 从结果集中获取数量
           }
           BaseDao.closeResource(null, prst, resultSet);
       }
       return count;
   }
   ~~~

3. UserService

   ~~~java
   // 查询记录数
   public int getUserCount(String userName,int userRole);
   ~~~

4. UserServiceImpl

   ~~~java
   
   /**
    * <p> 查询记录数 </p>
    * <p> 2023/7/18,17:20 </p>
    *
    * @param userName 用户名
    * @param userRole 用户角色
    * @return int
    */
   @Override
   public int getUserCount(String userName, int userRole) {
       Connection connection = null;
       int count = 0;
       try {
           connection = BaseDao.getConnection();
           count = userDao.getUserCount(connection, userName, userRole);
       } catch (SQLException e) {
           throw new RuntimeException(e);
       } finally {
           BaseDao.closeResource(connection, null, null);
       }
       return count;
   }
   ~~~

5. UserServiceImpl测试

   ~~~java
   @Test
   public void Test() {
       UserServiceImpl userService = new UserServiceImpl();
       int userCount = userService.getUserCount(null, 0);
       System.out.println(userCount);
   }
   ~~~

---

##### 获取用户列表

1. UserDao

   ~~~java
   // 获取用户列表
   List<User> getUserList(Connection connection, String userName, int userRole, int currentPageNo, int pageSize) throws Exception;
   ~~~

2. UserDaoImpl

   ~~~JAVA
   /**
    * <p> 获取用户列表 </p>
    * <p> 2023/7/18,19:19 </p>
    *
    * @param connection    连接
    * @param userName      用户名
    * @param userRole      用户角色
    * @param currentPageNo 当前页
    * @param pageSize      页面大小
    * @return java.util.List<com.joker_yue.pojo.User>
    */
   @Override
   public List<User> getUserList(Connection connection, String userName, int userRole, int currentPageNo, int pageSize) throws Exception {
       PreparedStatement pstm = null;
       ResultSet rs = null;
       List<User> userList = new ArrayList<User>();
       if (connection != null) {
           StringBuffer sql = new StringBuffer();
           sql.append("select u.*,r.roleName as userRoleName from smbms_user u,smbms_role r where u.userRole = r.id ");
           List<Object> list = new ArrayList<Object>();
           if (!StringUtils.isNullOrEmpty(userName)) {
               sql.append(" and u.userName like ?");
               list.add("%" + userName + "%");
           }
           if (userRole > 0) {
               sql.append(" and u.userRole =?");
               list.add(userRole);
           }
           // 在数据库中，分页使用 limit，参数有 startIndex，pagesize；总数
           // 当前页      （当前页-1）*页面大小
           // 0，  5      1页从0开始       显示01234
           // 5，  5      2页从5开始       显示26789
           // 10， 5      3页从10开始      显示
           sql.append(" order by creationDate DESC limit ?,?");
           currentPageNo = (currentPageNo - 1) * pageSize;
           list.add(currentPageNo);
           list.add(pageSize);
   
           Object[] params = list.toArray();
           // System.out.println("sql---->" + sql.toString());
           rs = BaseDao.execute(connection, pstm, rs, sql.toString(), params);
           while (rs.next()) {
               User _user = new User();
               _user.setId(rs.getInt("id"));
               _user.setUserCode(rs.getString("userCode"));
               _user.setUserName(rs.getString("userName"));
               _user.setGender(rs.getInt("gender"));
               _user.setBirthday(rs.getDate("birthday"));
               _user.setPhone(rs.getString("phone"));
               _user.setUserRole(rs.getInt("userRole"));
               _user.setUserRoleName(rs.getString("userRoleName"));
               userList.add(_user);
           }
           BaseDao.closeResource(null, pstm, rs);
       }
       return userList;
   }
   ~~~

3. UserService

   ~~~java
   // 根据条件查询用户列表
   List<User> getUserList(String queryUserName, int queryUserRole, int currentPageNo, int pageSize);
   ~~~

4. UserSeviceImpl

   ~~~java
   
   /**
    * <p> 根据条件查询用户列表 </p>
    * <p> 2023/7/18,19:22 </p>
    *
    * @param queryUserName 要查询的用户名
    * @param queryUserRole 要查询的用户角色
    * @param currentPageNo 当前页
    * @param pageSize      每页显示多少条
    * @return java.util.List<com.joker_yue.pojo.User>
    */
   @Override
   public List<User> getUserList(String queryUserName, int queryUserRole, int currentPageNo, int pageSize) {
       Connection connection = null;
       List<User> userList = null;
   
       try {
           connection = BaseDao.getConnection();
           userList = userDao.getUserList(connection, queryUserName, queryUserRole, currentPageNo, pageSize);
       } catch (Exception throwables) {
           throwables.printStackTrace();
       } finally {
           BaseDao.closeResource(connection, null, null);
       }
       return userList;
   }
   ~~~

---

##### 获取角色操作

==为了我们职责统一，可以把角色的操作单独放在一个包中，和pojo类对应==

1. RoleDao

   ~~~java
   // 获取角色列表
   public List<Role> getRoleList(Connection connection) throws SQLException;
   ~~~

2. RoleDaoImpl

   ~~~java
   /**
    * <p> 获取角色列表 </p>
    * <p> 2023/7/18,19:36 </p>
    *
    * @param connection 连接
    * @return java.util.List<com.joker_yue.pojo.Role>
    */
   @Override
   public List<Role> getRoleList(Connection connection) throws SQLException {
       PreparedStatement pstm = null;
       ResultSet resultSet = null;
       ArrayList<Role> roleList = new ArrayList<Role>();
   
       if (connection != null) {
           String sql = "select * from smbms_role";
           Object[] params = {};
           BaseDao.execute(connection, pstm, resultSet, sql, params);
   
           while (resultSet.next()) {
               Role _role = new Role();
               _role.setId(resultSet.getInt("id"));
               _role.setRoleName(resultSet.getString("roleName"));
               _role.setRoleCode(resultSet.getString("roleCode"));
               _role.setCreatedBy(resultSet.getInt("createdBy"));
               _role.setCreationDate(resultSet.getTimestamp("creationDate"));
               _role.setModifyBy(resultSet.getInt("modifyBy"));
               _role.setModifyDate(resultSet.getTimestamp("modifyDate"));
               roleList.add(_role);
           }
           BaseDao.closeResource(null, pstm, resultSet);
       }
       return roleList;
   }
   ~~~

3. RoleService

   ~~~java
   // 获取角色列表
   public List<Role> getRoleList() throws SQLException;
   ~~~

4. RoleServiceImpl

   ~~~java
   public class RoleServiceImpl implements RoleService {
       // 引入Dao
       private RoleDao roleDao;
   
       public RoleServiceImpl() {
           roleDao = new RoleDaoImpl();
       }
   
       /**
        * <p> 获取角色列表 </p>
        * <p> 2023/7/18,19:50 </p>
        *
        * @param connection 连接
        * @return java.util.List<com.joker_yue.pojo.Role>
        */
       @Override
       public List<Role> getRoleList() throws SQLException {
           Connection connection = null;
           List<Role> roleList = null;
           try {
               connection = BaseDao.getConnection();
               roleList = roleDao.getRoleList(connection);
           } catch (SQLException e) {
               throw new RuntimeException(e);
           } finally {
               BaseDao.closeResource(connection, null, null);
           }
           return roleList;
       }
   }
   ~~~

   

---

##### 用户显示的Servlet

1. 获取用户前端的数据（查询）
2. 判断请求是否需要执行，看参数的值判断
3. 为了实现分页，需要计算出当前页和总页面、页面大小
4. 用户列表展示
5. 返回前端

~~~java
/**
 * <p> 查询用户列表 </p>
 * <p> 2023/7/18,20:50 </p>
 *
 * @param req  请求
 * @param resp 响应
 */
public void query(HttpServletRequest req, HttpServletResponse resp) {
    // 查询用户列表

    // 从前端获取数据
    String queryUserName = req.getParameter("queryname");
    String tempUserRole = req.getParameter("queryUserRole");
    String pageIndex = req.getParameter("pageIndex");

    // 获取用户列表
    UserServiceImpl userService = new UserServiceImpl();
    List<User> userList = null;
    // 第一次走这个请求，一定是第一页，页面大小是固定的
    int pageSize = 5; // 可以分离
    int currentPageNo = 1; // 当前页

    if (pageIndex != null) {
        // 从前端获取数据
        try {
            currentPageNo = Integer.parseInt(pageIndex);
        } catch (Exception e) {
            try {
                resp.sendRedirect("error.jsp");
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        }
    }


    int queryUserRole = 0;

    if (queryUserName == null) {
        queryUserName = "";
    }
    if (tempUserRole != null && !tempUserRole.equals("")) {
        queryUserRole = Integer.parseInt(tempUserRole); // 给查询赋值
    }

    // 获取用户的总数(分页，上一页，下一页）
    int totalCount = userService.getUserCount(queryUserName, queryUserRole);

    // 总页数支持
    PageSupport pageSupport = new PageSupport();
    pageSupport.setCurrentPageNo(currentPageNo);
    pageSupport.setPageSize(pageSize);
    pageSupport.setTotalCount(totalCount);

    int totalPageCount =(int) totalCount/pageSize + 1;
    // 控制首页和尾页
    if (currentPageNo < 1) {
        // 如果页面要小于1 ，就显示第一页
        currentPageNo = 1;
    } else if (currentPageNo > totalPageCount) {
        // 如果页面要大于总页数，就显示最后一页
        currentPageNo = totalPageCount;
    }

    // 获取用户列表展示
    userList = userService.getUserList(queryUserName, queryUserRole, currentPageNo, pageSize);
    req.setAttribute("userList", userList);

    // 获取与角色列表展示
    RoleServiceImpl roleService = new RoleServiceImpl();
    List<Role> roleList = roleService.getRoleList();
    req.setAttribute("roleList", roleList);
    req.setAttribute("totalCount", totalCount);
    req.setAttribute("currentPageNo", currentPageNo);
    req.setAttribute("totalPageCount", totalPageCount);

    // 返回前端
    try {
        req.getRequestDispatcher("userlist.jsp").forward(req, resp);
    } catch (ServletException e) {
        throw new RuntimeException(e);
    } catch (IOException e) {
        throw new RuntimeException(e);
    }
}
~~~

[小黄鸭调试法 - 维基百科](https://zh.wikipedia.org/zh-hans/小黄鸭调试法)：自言自语





#### 文件上传

---

UUID：时间戳＋网卡状态+随机id

##### 1.注意事项：

1. 表单必须如下格式：

   ~~~jsp
   <form action="" method="post" enctype="multipart/form-data">
   ~~~

2. get: 上传文件大小有限制，post: 上传文件大小无限制

3. 为保证服务器安全，上传文件应该放在外界无法直接访问的目录下，比如放于WEB-INF目录下。

4. 为防止文件覆盖的现象发生，要为上传文件产生一个唯一的文件名

5. 要限制上传文件的最大值。

6. 可以限制上传文件的类型，在收到上传文件名时，判断后缀名是否合法。

---

##### 2. 使用类介绍

**【需要用到的类详解】**

ServletFileUpload负责处理上传的文件数据,并将表单中每个输入项封装成一个FileItem对象， 在使用ServletFileUpload对象解析请求时需要DiskFileItemFactory对象。所以，我们需要在进行解析工作前构造好DiskFileItemFactory对象，通过==ServletFileUpload对象的构造方法或setFileItemFactory()==方法设置ServletFileUpload对象的fileItemFactory属性。

**FileItem类**
在HTML页面input 必须有 `name <input type="file" name="filename">`

**表单如果包含一个文件上传输入项的话，这个表单的enctype属性就必须设置为`multipart/form-data`**

浏览器表单的类型如果为multipart/form-data , 在服务器端想获取数据就要通过流。

```jsp
<%--
  Created by IntelliJ IDEA.
  User: Joker
  Date: 2023/7/19
  Time: 15:31
  To change this template use File | Settings | File Templates.
--%>
 <%@ page contentType="text/html;charset=UTF-8" language="java" %>
 <html>
   <head>
     <title>$Title$</title>
   </head>
   <body>
   <%--通过表单上传
   get：上传文件大小有限制
   post： 上传文件大小没有限制--%>
   <form action = "" method = "post" enctype="multipart/form-data">
     上传用户：<input type="text" name="username"><br/>
     <p><input type="file" name="file1"></p>
     <p><input type="file" name="file2"></p>
     <p><input type="submit"> |<input type="reset"></p>
   </form>
   </body>
 </html>
```



【常用方法介绍】 

```java
 //isFormField方法用于判断FileItem类对象封装的数据是一个普通文本表单
 //还是一个文件表单，如果是普通表单字段则返回true，否则返回false
 boolean isFormField();
 
 //getFieldName方法用于返回表单标签name属性的值。
 String getFieldName();
 
 //getString方法用于将FileItem对象中保存的数据流内容以一个字符串返回
 String getString();
 
 //getName方法用于获得文件上传字段中的文件名。
 String getName();
 
 //以流的形式返回上传文件的数据内容。
 InputStream getInputStream()
 
 //delete方法用来清空FileItem类对象中存放的主体内容
 //如果主体内容被保存在临时文件中，delete方法将删除该临时文件。
 void delete();
```

 

**ServletFileUpload 类**
ServletFileUpload负责处理上传的文件数据,并**将表单中每个输入项封装成一个FileItem对象中** . 使用其**parseRequest(HttpServletRequest)** 方法可以将通过表单中每一个HTML标签提交的数据封装成一个FileItem对象，然后以List列表的形式返回。使用该方法处理上传文件简单易用。

---

##### 3. 代码编写

**UploadServlet**

```java
   public class UploadServlet extends HttpServlet {
       protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException {
           doGet(request, response);
       }
    
       protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException {
  
         try {
             //判断上传的文件是普通的表单还是带文件的表单
             if (!ServletFileUpload.isMultipartContent(request)) {
                 return;//如果是普通文件，我们可以直接返回
             } //如果通过了这个if，说明我们的表单是带文件上传的；
  
             //创建上传文件的保存路径，建议在WEB-INF路径下，安全，用户无法直接访问上传的文件；
             String uploadPath = this.getServletContext().getRealPath("/WEB-INF/upload");
             File uploadFile = new File(uploadPath);
             if (!uploadFile.exists()) {//如果目录不存在，创建这样一个目录；
                 uploadFile.mkdir();
             }
  
             //临时路径，假如文件超过了预期的大小，我们就把他放到一个临时文件中，过几天自动删除，或者提醒用户转存为永久
             String tmpPath = this.getServletContext().getRealPath("/WEB-INF/tmp");
             File file = new File(tmpPath);
             if (!file.exists()) {//如果目录不存在，创建这样一个目录；
                 file.mkdir();
             }
  
             //处理上传的文件，一般都需要通过流来获取，我们可以使用request.getInputStream(),原生态的文件上传流获取，十分麻烦
             //但是我们都建议使用 Apache的文件上传组件来实现，common-fileupload，它需要依赖于 commons-io组件；
  
             //1.创建DiskFileItemFactory对象，处理文件上传路径或者大小限制的；
             DiskFileItemFactory factory = new getDiskFileItemFactory(file);
             //2.获取ServletFileUpload
             ServletFileUpload upload = new getServletFileUpload(factory);
             //3.处理上传的文件
             String msg = uploadParseRequest(upload, request, uploadPath);
  
             //servlet请求转发消息
             request.setAttribute("msg",msg);
             request.getRequestDispatcher("msg.jsp").forward(request,response);
  
         } catch (FileUploadException e) {
             e.printStackTrace();
         }
  
     }
  
  
     public static DiskFileItemFactory getDiskFileItemFactory(File file) {
         DiskFileItemFactory factory = new DiskFileItemFactory();
         //通过这个工厂设置一个缓冲区，当上传的文件大于这个缓冲区的时候，将他放到临时文件中；
         factory.setSizeThreshold(1024 * 1024); //缓存区大小为1M
         factory.setRepository(file);//临时目录的保存目录，需要一个File
         return factory;
     }
  
     public static ServletFileUpload getServletFileUpload(DiskFileItemFactory factory) {
         ServletFileUpload upload = new ServletFileUpload(factory);
         //监听文件上传进度；
         upload.setProgressListener(new ProgressListener() {
             @Override
             //pBytesRead:已经读取到的文件大小
             //pContentLength ： 文件大小
             public void update(long pBytesRead, long pContentLength, int pItems) {
                 System.out.println("总大小：" + pContentLength + "已上传：" + pBytesRead);
             }
         });
  
         //处理乱码问题
         upload.setHeaderEncoding("UTF-8");
         //设置单个文件的最大值
         upload.setFileSizeMax(1024 * 1024 * 10);
         //设置总共能够上传文件的大小
         //1024 = 1kb * 1024 = 1M * 10 = 10M
         upload.setSizeMax(1024 * 1024 * 10);
  
         return upload;
     }
  
  
     public static String uploadParseRequest(ServletFileUpload upload,HttpServletRequest request,String uploadPath)
             throws FileUploadException, IOException {
  
         String msg = "";
  
         //3.把前端请求解析，封装成一个FileItem对象
         List<FileItem> fileItems = upload.parseRequest(request);
         for (FileItem fileItem : fileItems) {
             if (fileItem.isFormField()){ //判断上传的文件是普通的表单还是带文件的表单
                 //getFieldName指的是前端表单控件的name；
                 String name = fileItem.getFieldName();
                 String value = fileItem.getString("UTF-8"); //处理乱码
                 System.out.println(name+":"+value);
             }else { //判断它是上传的文件
  
                 //=======================处理文件===============================//
  
                 //拿到文件名字
                 String uploadFileName = fileItem.getName();
                 System.out.println("上传的文件名："+uploadFileName);
  
                 if (uploadFileName.trim().equals("")||uploadFileName==null){
                     continue;
                 }
  
                 //获得上传的文件名  /images/girl/paojie.png
                 String fileName = uploadFileName.substring(uploadFileName.lastIndexOf("\\") + 1);
                 //获得文件的后缀名
                 String fileExtName = uploadFileName.substring(uploadFileName.lastIndexOf(".") + 1);
                     /*
                         如果文件后缀名 fileExtName 不是我们所需要的
                         就直接return，不处理，告诉用户文件类型不对。
                     */
  
                 System.out.println("文件信息 [件名："+fileName+"---文件类型"+fileExtName+"]");
  
                 //可以使用UUID（唯一识别的通用码），保证文件名唯一；
                 //UUID.randomUUID()，随机生一个唯一识别的通用码；
                 String uuidPath = UUID.randomUUID().toString();
  
                 //=======================处理文件完毕===============================//
  
                 //存到哪？ uploadPath
                 //文件真实存在的路径 realPath
                 String realPath =   uploadPath+"\\"+uuidPath;
                 //给每个文件创建一个对应的文件夹
                 File realPathFile = new File(realPath);
                 if (!realPathFile.exists()){
                     realPathFile.mkdir();
                 }
  
                 //=======================存放地址完毕===============================//
  
                 //获得文件上传的流
                 InputStream inputStream = fileItem.getInputStream();
  
                 //创建一个文件输出流
                 //realPath = 真实的文件夹；
                 //差了一个文件; 加上输出文件的名字+"/"+uuidFileName
                 FileOutputStream fos = new FileOutputStream(realPath+"\\"+fileName);
  
                 //创建一个缓冲区
                 byte[] buffer = new byte[1024*1024];
  
                 //判断是否读取完毕
                 int len = 0;
                 //如果大于0说明还存在数据；
                 while ((len=inputStream.read(buffer))>0){
                     fos.write(buffer,0,len);
                 }
  
                 //关闭流
                 fos.close();
                 inputStream.close();
  
                 msg = "文件上传成功！";
                 fileItem.delete(); //上传成功，清除临时文件
                 //=======================文件传输完毕===============================//
             }
         }
  
         return msg;
     }
 }
```

 

**upload.jsp**

```jsp
 1 <%@ page contentType="text/html;charset=UTF-8" language="java" %>
 2 <html>
 3 <head>
 4     <title>文件上传</title>
 5 </head>
 6 <body>
 7     <form action="${pageContext.request.contextPath}/upload.do" enctype="multipart/form-data" method="post">
 8         上传用户：<input type="text" name="username"><br/>
 9         上传文件1：<input type="file" name="file1"><br/>
10         上传文件2：<input type="file" name="file2"><br/>
11         <input type="submit" value="提交">
12     </form>
13 </body>
14 </html>
```

 

**msg.jsp**

```jsp
 <%@ page contentType="text/html;charset=UTF-8" language="java" %>
 <html>
 <head>
     <title>消息提示</title>
 </head>
 <body>
     ${msg}
 </body>
 </html>
```

 

**web.xml** 

```xml
 <?xml version="1.0" encoding="UTF-8"?>
 <web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
          version="4.0">
    <servlet>
         <servlet-name>upload</servlet-name>
         <servlet-class>com.kuang.servlet.UploadFileServlet</servlet-class>
     </servlet>
     <servlet-mapping>
         <servlet-name>upload</servlet-name>
         <url-pattern>/upload.do</url-pattern>
     </servlet-mapping>
 </web-app>
```

 



#### 邮件发送

---

要在网络上实现网络邮件功能，必须要有专门的**邮件服务器**

这些邮件服务器类似于现实生活中的邮局，它主要负责接收用户投递过来的邮件，并把邮件递到邮件接收者的电子邮箱中。

SMTP 服务器地址：一般是 smtp.xxx.com ，比如 163 邮箱是 smtp.163.com ， qq 邮箱是 smtp.qq.com

![image-20230719160844691](./跟随狂神学Java-31.assets/image-20230719160844691.png)

发送邮件：SMTP；接收邮件：POP3 

使用 Java 发送 E-mail 十分简单，但是首先你应该准备 JavaMail API 和 Java Activation Framework 。

得到两个 jar 包: mail.jar, activation.jar

JavaMail 是 sun 公司（现已被甲骨文收购）为方便 Java 开发人员在应用程序中实现邮件发送和接收功能而提供的一套标准开发包，它支持一些常用的邮件协议，如 SMTP ， POP3 ， IMAP, 还有 MIME（多用途互联网邮件扩展类型，即附件） 等。我们在使用 JavaMail 编写邮件时，无须考虑邮件的底层实现细节，只要调用 JavaMail 开发包中相应的 API类就可以了。



主要有4个核心类，我们在编写程序时，记住这四个核心类，就很容易编写出 Java 邮件处理程序。

![image-20230719162239774](./跟随狂神学Java-31.assets/image-20230719162239774.png)



---

##### 无附件邮件发送

~~~java
package com.joker_yue.mail;

import com.sun.mail.util.MailSSLSocketFactory;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

/**
 * 简单邮件，没有附件或者图片，即纯文本
 *
 * @author Joker
 * @version 1.0
 * @date 2023/7/19 16:27
 */
public class MailTest01 {
    // 要发送邮件，需要开启服务
    public static void main(String[] args) throws Exception {
        Properties prop = new Properties();
        prop.setProperty("mail.host", "smtp.qq.com");        // 设置QQ邮件服务器
        prop.setProperty("mail.transport.protocol", "smtp"); // 设置QQ邮件协议
        prop.setProperty("mail.smtp.auth", "true");          // 需要认证用户名和密码

        // 关于QQ邮箱，还要设置SSL加密，加上以下代码即可
        MailSSLSocketFactory sf = new MailSSLSocketFactory();
        sf.setTrustAllHosts(true);
        prop.put("mail.smtp.ssl.enable", "true");
        prop.put("mail.smtp.ssl.socketFactory", sf);

        // 使用Java发送邮件的5个步骤

        // 1.创建整个应用程序所需的Session
        Session session = Session.getDefaultInstance(prop, new Authenticator() {
            // QQ才有
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                // 发件人邮件用户名，授权码
                return new PasswordAuthentication("Joker_Yue@qq.com", "授权码");
            }
        });

        // 开启Session的Debug模式，为了看到程序发送Email的运行状态
        session.setDebug(true);

        // 2.通过Session得到transport对象
        Transport transport = session.getTransport();

        // 3.使用邮箱的用户名和授权码连上邮件服务器
        transport.connect("smtp.qq.com", "Joker_Yue@qq.com", "授权码");

        // 4.创建邮件
        MimeMessage message = new MimeMessage(session); //注意：需要传递Session
        message.setFrom(new InternetAddress("Joker_Yue@qq.com"));   // 发件人
        message.setRecipients(MimeMessage.RecipientType.TO, InternetAddress.parse("Joker_Yue@qq.com")); // 收件人，现在收件人和发件人一样，也就是给自己发
        message.setSubject("测试邮件"); // 邮件主题（标题）
        message.setText("测试邮件内容", "UTF-8", "html"); // 邮件内容

        // 5.发送邮件
        transport.sendMessage(message, message.getAllRecipients());

        // 6.关闭连接
        transport.close();

    }
}
~~~



---

##### 有附件邮件发送

MIME （多用途互联网邮件扩展类型）

**MimeBodyPart 类**

* javax.mail.internet.MimeBodyPart 类表示的是一个 MIME 消息，MimeMuItipart 类它和 MimeMessage 类一样都是从 part 接口继承过来。

**MimeMultipart 类**

* javax.mail.internet.MimeMultipart 是抽象类 Multipart 的实现子类，它用代表 MIME 消息的 MimeBodyPart 对象。来组合多个 MIME消息。一个 MimeMultipart 对象可以包含多个代表 MIME 消息的 MimeBodyPart 对象。

<img src="./跟随狂神学Java-31.assets/image-20230719172247689.png" alt="image-20230719172247689" style="zoom:50%;" />



**代码**

~~~java
package com.joker_yue.mail;

import com.sun.mail.util.MailSSLSocketFactory;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.util.Properties;

/**
 * 简单邮件，没有附件或者图片，即纯文本
 *
 * @author Joker
 * @version 1.0
 * @date 2023/7/19 16:27
 */
public class MailTest01 {
    // 要发送邮件，需要开启服务
    public static void main(String[] args) throws Exception {
        Properties prop = new Properties();
        prop.setProperty("mail.host", "smtp.qq.com");        // 设置QQ邮件服务器
        prop.setProperty("mail.transport.protocol", "smtp"); // 设置QQ邮件协议
        prop.setProperty("mail.smtp.auth", "true");          // 需要认证用户名和密码

        // 关于QQ邮箱，还要设置SSL加密，加上以下代码即可
        MailSSLSocketFactory sf = new MailSSLSocketFactory();
        sf.setTrustAllHosts(true);
        prop.put("mail.smtp.ssl.enable", "true");
        prop.put("mail.smtp.ssl.socketFactory", sf);

        // 使用Java发送邮件的5个步骤

        // 1.创建整个应用程序所需的Session
        Session session = Session.getDefaultInstance(prop, new Authenticator() {
            // QQ才有
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                // 发件人邮件用户名，授权码
                return new PasswordAuthentication("Joker_Yue@qq.com", "授权码");
            }
        });

        // 开启Session的Debug模式，为了看到程序发送Email的运行状态
        session.setDebug(true);

        // 2.通过Session得到transport对象
        Transport transport = session.getTransport();

        // 3.使用邮箱的用户名和授权码连上邮件服务器
        transport.connect("smtp.qq.com", "Joker_Yue@qq.com", "授权码");

        // 4.创建邮件
        MimeMessage message = new MimeMessage(session); // 注意：需要传递Session
        message.setFrom(new InternetAddress("Joker_Yue@qq.com"));   // 发件人
        message.setRecipients(MimeMessage.RecipientType.TO, InternetAddress.parse("Joker_Yue@qq.com")); // 收件人，现在收件人和发件人一样，也就是给自己发
        message.setSubject("测试邮件"); // 邮件主题（标题）

        //==================================================================
        // 准备图片数据
        MimeBodyPart image = new MimeBodyPart();
        // 图片需要经过数据处理 DataHandler：数据处理
        DataHandler dh = new DataHandler(new FileDataSource("src/main/resources/bg.jpg"));
        image.setDataHandler(dh);       // 在Body主体中放入这个处理的图片数据
        image.setContent("bg.jpg", "image/jpeg");     //给图片设置一个ID，后续可以引用使用

        // 准备正文数据
        MimeBodyPart text = new MimeBodyPart();
        text.setContent("测试邮件内容<img src='icd:bg.jpg'>邮件", "text/html;charset=UTF-8"); // 邮件内容

        // 描述数据关系
        MimeMultipart multipart = new MimeMultipart();
        multipart.addBodyPart(text);
        multipart.addBodyPart(image);
        multipart.setSubType("related");

        //设置到消息中，保存修改
        message.setContent(multipart);  // 把最后编辑好的邮件放到消息中
        message.saveChanges();          // 保存修改

        //==================================================================
        // 5.发送邮件
        transport.sendMessage(message, message.getAllRecipients());

        // 6.关闭连接
        transport.close();

    }
}

~~~



~~~java
image.setFileName("bg.jpg");    			//以附件形式发送
image.setContent("bg.jpg", "image/jpeg");   //发送内容，而不是以附件发送
~~~



测试结果![image-20230719184313564](./跟随狂神学Java-31.assets/image-20230719184313564.png)
