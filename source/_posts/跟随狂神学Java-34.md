---
title: 跟随狂神学Java-34，SpringMVC
date: 2023/08/01 04:02:22
tags:
  - Java
  - 狂神
  - SSM
  - Spring
  - SpringMVC
  - Spring框架
  - 必看
categories:
  - [跟随狂神学Java, 必看, 技术, Java]
cover: /images/coverImg/Spring/SpringMVC.jpg
keywords:
  - Spring
  - SpringMVC
  - SSM
  - SQL
  - Web应用程序
  - Web服务器
  - MVC三层架构
  - MVC
  - JDBC
  - MVC
  - SpringMVC
  - 控制器
  - 注解开发
  - Restful风格
  - 重定向
  - 转发
  - 数据处理
  - 乱码解决
  - JSON数据
ai:
  - 这份笔记涵盖了Java中MVC（模型-视图-控制器）架构的基本概念，从Model1和Model2时代到SpringMVC的详细介绍。它讨论了SpringMVC的配置、开发模式、Controller的实现方式、Restful风格、重定向和转发、数据处理、乱码解决以及JSON数据的使用。
  - 这篇笔记介绍了Java编程领域中的MVC（Model-View-Controller）架构和SpringMVC框架的基本概念、配置和使用方法。它包括了MVC的发展历程、SpringMVC的特点以及如何配置和使用SpringMVC来构建Web应用程序。
  - 这篇笔记介绍了Java开发中的MVC（Model-View-Controller）架构以及SpringMVC框架的应用。它解释了MVC的概念，包括Model1时代和Model2时代的演进，然后深入探讨了SpringMVC，包括配置、开发模式、Controller的实现方式、RestFul风格、重定向和转发、数据的处理和提交，以及JSON数据的使用。
---
# 跟随狂神学Java

**第三十四：SpringMVC**

> "计算机科学并不只是关于计算机，就像天文学并不只是关于望远镜一样。" 
>
> [【狂神说Java】SpringMVC最新教程IDEA版通俗易懂_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1aE41167Tu/?vd_source=814489e71df641c4b2c0ff7d4659b2d0)
>
> [公众号文章](http://dwz.date/ac27)

SSM：Mybatis+Spring+SpringMVC **MVC三层架构**



JavaSE：认真学习

JavaWeb：人生学习

框架：研究官方文档，锻炼自学能力，锻炼笔记能力，锻炼项目能力



后续学习：SpringMVC+Vue+SpringBoot+SpringCloud+Linux



#### 什么是MVC

---

##### MVC

* 模型（dao，service）Model
* 视图（jsp）View
* 控制器（Servlet）Controller

最经典的MVC就是JSP+Servlet+JavaBean模式

MVVM：M，V，VM（View Model：双向绑定）

----

##### Model1时代

* 在早期web的开发中，通常采用的都是Model1
* Model1中，主要分两层，视图层和模型层

![image-20230728153817946](./跟随狂神学Java-34.assets/image-20230728153817946.png)

优缺点：

* 优点：架构简单，适合小型项目开发
* 缺点：JSP职责不单一，职责过重，不便于维护

---

##### Model2时代

Model2把一个项目成三部分，包括视图、控制、模型，即现在的架构

![image-20230728154449423](./跟随狂神学Java-34.assets/image-20230728154449423.png)





#### SpringMVC

---

##### 什么是SpringMVC

概述：

SpringMVC是SpringFramework的一部分，是基于Java实现的MVC的轻量级Web框架

---

##### 为什么要学习SpringMVC

1. 轻量级，简单易学‘
2. 高效，基于请求响应的MVC框架
3. 与Spring兼容性好，无缝结合
   * 我们可以把SpringMVC中要用到的类，注册到Spring中
4. 约定优于配置
5. 功能强大，RESETful，数据验证，格式化，本地化，主题等
6. 简洁灵活

----

##### 了解SpringMVC

SpringMVC的底层也是Servlet

![image-20230728171708544](./跟随狂神学Java-34.assets/image-20230728171708544.png)

SpringMVC的原理如下图![image-20230728172000508](./跟随狂神学Java-34.assets/image-20230728172000508.png)

SpringMVC执行流程图（实线部分不需要我们做，虚线部分需要我们做）

![image-20230729144510938](./跟随狂神学Java-34.assets/image-20230729144510938.png)

1. DispatcherServlet表示前置控制器，是整个SpringMVC的控制中心。用户发出请求，DispatcherServlet接收请求并拦截请求
   * 我们假设请求的URL为`http://localhost:8080/SpringMVC/hello`
   * 如上URL拆分成三部分： 
     * http://localhost:8080 服务器域名
     * SpringMVC部署在服务器上的web站点
     * hello表示控制器
   * 通过分析，如上url表示为：请求位于服务器localhost:8080上的SpringMVC站点的hello控制器
2. HandlerMapping为处理器映射，DispatcherServlet调用HandlerMapping，HandlerMapping根据请求url查找handler
3. HandlerExecution表示具体的Handler，其主要作用是根据url查找控制器，如上url被查找控制器为：hello
4. HandlerExecution表示具体的Handler，其主要作用是根据url查找控制器，如上url被查找控制器为：hello
5. HandlerAdapter表示处理器适配器，其按照特定的规则去执行Handler
6. Handler让具体的Controller执行
7. Controller将具体的执行信息返回给HandlerAdapter，如ModelAndView
8. HandlerAdapter将视图逻辑名或逻辑模型传递给DispatcherServlet
9. DispatcherServlet根据视图解析器解析的视图结果，调用具体的视图
10. 最终视图呈现给用户



---

##### 使用SpringMVC必须配置的三大件

* 处理器映射器
* 处理器适配器
* 视图解析器



#### 两种开发模式

---

##### 通过XML开发SpingXML

![image-20230729154734085](./跟随狂神学Java-34.assets/image-20230729154734085.png)

特点：

* 三大件均需手动配置，麻烦
* 容易维护

代码：

1. web.xml中准备好DispatcherServlet

   ~~~xml
   <?xml version="1.0" encoding="UTF-8"?>
   <web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
            version="4.0">
   
       <!-- 1.  配置DispatcherServlet，这是SpringMVC的核心：请求分发器，前端控制器   -->
       <servlet>
           <servlet-name>springmvc</servlet-name>
           <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
           <!--  DispatcherServlet 要绑定SpringMVC的配置文件    -->
           <init-param>
               <param-name>contextConfigLocation</param-name>
               <param-value>classpath:springmvc-servlet.xml</param-value>
           </init-param>
           <!--   启动级别，为1时跟随服务器启动   -->
           <load-on-startup>1</load-on-startup>
       </servlet>
   
       <!-- 注意：
        / 匹配所有的请求（不包括.jsp)
        /* 匹配所有的请求(包括.jsp)
        一般写/就行
        -->
       <servlet-mapping>
           <servlet-name>springmvc</servlet-name>
           <url-pattern>/</url-pattern>
       </servlet-mapping>
   
   </web-app>
   ~~~

2. spirngmvc-servlet.xml中准备好处理器映射器、处理器适配器、视图解析器，记得在web.xml中绑定此xml文件

   ~~~xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.springframework.org/schema/beans
           https://www.springframework.org/schema/beans/spring-beans.xsd">
   
   <!-- 其实就是Spring的配置文件 -->
       <!--   处理器映射器   -->
       <bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping"/>
       <!--   处理器适配器   -->
       <bean class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter"/>
       <!--   视图解析器   -->
       <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" id="internalResourceViewResolver">
           <!-- 前缀 -->
           <property name="prefix" value="/WEB-INF/jsp/"/>
           <!-- 后缀 -->
           <property name="suffix" value=".jsp"/>
       </bean>
   </beans>
   ~~~

3. 编写页面WEB-INF/jsp/test.jsp

   ~~~jsp
   <%--
     Created by IntelliJ IDEA.
     User: Joker
     Date: 2023/7/29
     Time: 15:05
     To change this template use File | Settings | File Templates.
   --%>
   <%@ page contentType="text/html;charset=UTF-8" language="java" %>
   <html>
   <head>
       <title>Title</title>
   </head>
   <body>
   ${msg}
   </body>
   </html>
   ~~~

4. 配置控制器Controller（实现Controller接口或者是用来@Controller注解的类为一个Controller）HelloController.java

   ~~~java
   package com.joker_yue.controller;
   
   import org.springframework.web.servlet.ModelAndView;
   import org.springframework.web.servlet.mvc.Controller;
   
   import javax.servlet.http.HttpServletRequest;
   import javax.servlet.http.HttpServletResponse;
   
   /**
    * @author Joker
    * @version 1.0
    * @date 2023/7/29 15:20
    */
   public class HelloController implements Controller {
       @Override
       public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
           ModelAndView modelAndView = new ModelAndView();
   
           // 业务代码
           String result = "Hello SpringMVC!";
           modelAndView.addObject("msg", result);
   
           // 视图跳转
           modelAndView.setViewName("test");   // 交给springmvc-servlet.xml中的视图解析器，根据其配置，将会自动拼接链接并跳转到/WEB-INF/jsp/test.jsp
   
           return modelAndView;    // 必需：返回一个ModelAndView
       }
   }
   ~~~

   addObject方法可以设置要返回的对象

   setViewName方法可以设置要跳转的页面

5. 在SpringMVC配置文件(springmvc-servlet.xml)中注册bean

   ~~~xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.springframework.org/schema/beans
           https://www.springframework.org/schema/beans/spring-beans.xsd">
   
   <!-- 其实就是Spring的配置文件 -->
       <!--   处理器映射器   -->
       <bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping"/>
       <!--   处理器适配器   -->
       <bean class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter"/>
       <!--   视图解析器   -->
       <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" id="internalResourceViewResolver">
           <!-- 前缀 -->
           <property name="prefix" value="/WEB-INF/jsp/"/>
           <!-- 后缀 -->
           <property name="suffix" value=".jsp"/>
       </bean>
   
       <!--   BeanNameUrlHandlerMapping需要根据bean的名字来找   -->
       <bean id="/hello" class="com.joker_yue.controller.HelloController"/>
   </beans>
   ~~~

   

---

##### 通过注解开发SpingMVC

![image-20230729162635128](./跟随狂神学Java-34.assets/image-20230729162635128.png)

特点：

* 三大件中只需要配置视图解析器，另外两个不需要手动配置
* 没那么容易维护

代码：

1. 注册DispatcherServlet，web.xml

   ~~~xml
   <?xml version="1.0" encoding="UTF-8"?>
   <web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
            version="4.0">
   
     <!-- 1.  配置DispatcherServlet，这是SpringMVC的核心：请求分发器，前端控制器   -->
     <servlet>
       <servlet-name>springmvc</servlet-name>
       <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
       <!--  DispatcherServlet 要绑定SpringMVC的配置文件    -->
       <init-param>
         <param-name>contextConfigLocation</param-name>
         <param-value>classpath:springmvc-servlet.xml</param-value>
       </init-param>
       <!--   启动级别，为1时跟随服务器启动   -->
       <load-on-startup>1</load-on-startup>
     </servlet>
   
     <!-- 注意：
      / 匹配所有的请求（不包括.jsp)
      /* 匹配所有的请求(包括.jsp)
      一般写/就行
      -->
     <servlet-mapping>
       <servlet-name>springmvc</servlet-name>
       <url-pattern>/</url-pattern>
     </servlet-mapping>
   
   </web-app>
   ~~~

2. SpringMVC配置文件，springmvc-servlet.xml

   ~~~xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns:context="http://www.springframework.org/schema/context"
          xmlns:mvc="http://www.springframework.org/schema/mvc"
          xsi:schemaLocation="http://www.springframework.org/schema/beans
           https://www.springframework.org/schema/beans/spring-beans.xsd
           http://www.springframework.org/schema/context
           https://www.springframework.org/schema/context/spring-context.xsd
           http://www.springframework.org/schema/mvc
           https://www.springframework.org/schema/mvc/spring-mvc.xsd">
   
   
       <!--   自动扫描包   -->
       <context:component-scan base-package="com.joker_yue.controller"/>
   
       <!--   让SpringMVC不处理静态资源 例如css,js,mp3,mp4等  -->
       <mvc:default-servlet-handler/>
   
       <!--
           支持MVC注解驱动
               在Spring中一般采用@RequestMapping注解来完成映射关系
               原来必须向上下文注册DefaultAnnotationHandlerMapping和一个AnnotationMethodHandlerAdapter实例
               这两个示例分别在类级别和方法级别处理
               而现在使用annotation-driven配置就可以帮助我们自动完成上述两个示例的注入
        -->
       <mvc:annotation-driven/>
   
       <!--   视图解析器   -->
       <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" id="internalResourceViewResolver">
           <!-- 前缀 -->
           <property name="prefix" value="/WEB-INF/jsp/" />
           <!-- 后缀 -->
           <property name="suffix" value=".jsp" />
       </bean>
   
   
   </beans>
   ~~~

3. 控制器，HelloController.java

   ~~~java
   package com.joker_yue.controller;
   
   import org.springframework.stereotype.Controller;
   import org.springframework.ui.Model;
   import org.springframework.web.bind.annotation.RequestMapping;
   
   /**
    * @author Joker
    * @version 1.0
    * @date 2023/7/29 16:09
    */
   @Controller
   @RequestMapping("/hello")   // 如果写了这个，那么下面所有请求都要先经过它
   public class HelloController {
       @RequestMapping("/h1")
       public String hello(Model model) {
           {
               // 封装数据
               model.addAttribute("msg", "hello");
               return "hello";// 会被视图解析器处理
           }
       }
   }
   
   ~~~

4. 前端页面，hello.jsp

   ~~~jsp
   <%--
     Created by IntelliJ IDEA.
     User: Joker
     Date: 2023/7/29
     Time: 16:08
     To change this template use File | Settings | File Templates.
   --%>
   <%@ page contentType="text/html;charset=UTF-8" language="java" %>
   <html>
   <head>
       <title>Title</title>
   </head>
   <body>
   
   </body>
   </html>
   ~~~

    



#### Controller

---

##### 实现方式一：实现Controller接口

说明

* 实现Controller接口定义控制器是较老的办法

缺点

* 一个控制器中只有一个方法，如果使用多个方法则需要定义多个Controller；定义的方式比较麻烦

注意

* 通过这种方式实现的Controller，是需要在SpingMVC配置文件中将Controller进行注册的

代码

* ControllerTest01.java

  ~~~java
  package com.joker_yue.controller;
  
  import org.springframework.web.servlet.ModelAndView;
  import org.springframework.web.servlet.mvc.Controller;
  
  import javax.servlet.http.HttpServletRequest;
  import javax.servlet.http.HttpServletResponse;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/29 16:52
   */
  
  // 只要实现了Controller接口的类，说明它就是一个Controller控制器了
  public class ControllerTest01 implements Controller {
      @Override
      public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
          ModelAndView mv = new ModelAndView();
  
          mv.addObject("msg", "controller test01");
          mv.setViewName("test");
  
          return mv;
      }
  }
  ~~~

* springmvc-servlet.xml

  ~~~xml
  <!-- 注册Controller -->
  <bean name="/t1" class="com.joker_yue.controller.ControllerTest01"/>
  ~~~

  

---

##### 实现方式二：通过注解（最常用）

这四个常用注解都是将类注册为组件

~~~java
@Component		组件
@Service		Service层
@Controller		Controller层
@Repository		dao层
~~~

代码：

* ControllerTest02.java

  ~~~java
  package com.joker_yue.controller;
  
  import org.springframework.stereotype.Controller;
  import org.springframework.ui.Model;
  import org.springframework.web.bind.annotation.RequestMapping;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/29 17:06
   */
  @Controller // 代表将会被Spring托管
  public class ControllerTest02 {
  
      @RequestMapping("/t2")
      public String test(Model model) {
          model.addAttribute("msg", "controller test02");
          return "test";
          // return "hello";      // 这样写将会走/WEB-INF/jsp/hello.jsp
      }
  }
  ~~~

注意

* 被Controller注解所注解的类，其中如果有方法返回值为String，并且有具体的页面可以跳转，那么这个方法将会被视图解析器解析，其中return的返回值为要拼接跳转的页面
* 如果传参有Model，说明将会携带数据
* @RequestMapping可以注解到类和方法上。当注解到类上时，要访问方法，先要经过类上的路径





#### RestFul风格

---

##### 什么是restful风格

传统风格

~~~java
http://localhost:8080/method?add=1&add=2
~~~

restful

~~~java
http://localhost:8080/method/add/1/2
~~~



操作：

现在有一个类，希望实现a+b

  ~~~java
  package com.joker_yue.controller;
  
  import org.springframework.stereotype.Controller;
  import org.springframework.ui.Model;
  import org.springframework.web.bind.annotation.PathVariable;
  import org.springframework.web.bind.annotation.RequestMapping;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/29 17:30
   */
  @Controller
  public class RestfulController {
      @RequestMapping("/add")
      public String test1(int a,int b, Model model) {
  
          int res = a + b;
          model.addAttribute("msg", "结果为" + res);
  
          return "test";
      }
  }
  
  ~~~

  需要的链接为

  ~~~java
  http://localhost:8080/add?a=1&b=2
  ~~~

* 而现在我们希望将其改成Restful传参

  ~~~java
  package com.joker_yue.controller;
  
  import org.springframework.stereotype.Controller;
  import org.springframework.ui.Model;
  import org.springframework.web.bind.annotation.PathVariable;
  import org.springframework.web.bind.annotation.RequestMapping;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/29 17:30
   */
  @Controller
  public class RestfulController {
  
      // 原来的： http://localhost:8080/add?a=1&b=2
      // Restful：http://localhost:8080/add/a/b
  
      @RequestMapping("/add/{a}/{b}")
      public String test1(@PathVariable int a, @PathVariable int b, Model model) {
  
          int res = a + b;
          model.addAttribute("msg", "结果为" + res);
  
          return "test";
      }
  }
  ~~~

  原来的链接将不可用，现在需要的是

  ~~~java
  http://localhost:8080/add/a/b
  ~~~

* 我们甚至还可以限定它通过什么方式请求，比如我们这里将其限定为通过GET方式请求

  ~~~java
  package com.joker_yue.controller;
  
  import org.springframework.stereotype.Controller;
  import org.springframework.ui.Model;
  import org.springframework.web.bind.annotation.PathVariable;
  import org.springframework.web.bind.annotation.RequestMapping;
  import org.springframework.web.bind.annotation.RequestMethod;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/29 17:30
   */
  @Controller
  public class RestfulController {
  
      // 原来的： http://localhost:8080/add?a=1&b=2
      // Restful：http://localhost:8080/add/a/b
  
      @RequestMapping(value = "/add/{a}/{b}",method = RequestMethod.GET)
      public String test1(@PathVariable int a, @PathVariable int b, Model model) {
  
          int res = a + b;
          model.addAttribute("msg", "结果为" + res);
  
          return "test";
      }
  }
  ~~~

  现在它只能通过get方式请求

* 我们可以使用GetMapping注解来代替RequestMapping请求来达到上述同样的效果

  ~~~java
  package com.joker_yue.controller;
  
  import org.springframework.stereotype.Controller;
  import org.springframework.ui.Model;
  import org.springframework.web.bind.annotation.GetMapping;
  import org.springframework.web.bind.annotation.PathVariable;
  import org.springframework.web.bind.annotation.RequestMapping;
  import org.springframework.web.bind.annotation.RequestMethod;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/29 17:30
   */
  @Controller
  public class RestfulController {
  
      // 原来的： http://localhost:8080/add?a=1&b=2
      // Restful：http://localhost:8080/add/a/b
  
      // @RequestMapping(value = "/add/{a}/{b}",method = RequestMethod.GET)
      @GetMapping("/add/{a}/{b}")
      public String test1(@PathVariable int a, @PathVariable int b, Model model) {
  
          int res = a + b;
          model.addAttribute("msg", "结果为" + res);
  
          return "test";
      }
  }
  ~~~

* 当然，有GetMapping就肯定有DeleteMapping这些衍生的

  ~~~java
  @GetMapping
  @postMapping
  @Putmapping
  @DeleteMapping
  @PatchMapping
  ~~~

  

注意：

* 通过Restful风格，可以做到地址栏相同而结果不同，这是由于请求方式不同

优点

* 使路径变得简洁
* 获得参数更加方便，框架会自动进行类型转换
* 通过路径的类型可以约束访问参数，如果路径不一样，则访问不到对应的请求方法
* 安全，原来一定会暴露一些参数
* 高效，支持缓存





#### 重定向和转发

---

##### 重定向

我们可以使用Servlet的request和response来完成重定向和转发，这种方法就不需要视图解析器了

代码：

~~~java
package com.joker_yue.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * @author Joker
 * @version 1.0
 * @date 2023/7/29 19:45
 */

@Controller
public class ModelTest01 {

    @RequestMapping("m1/t1")
    public String test(Model model) {

        // 转发
        model.addAttribute("msg", "model test01");
        return "/WEB-INF/jsp/test.jsp";
    }
}

~~~

在return语句中，你可以显式的来告诉这是转发

~~~java
return "forward:/WEB-INF/jsp/test.jsp";
~~~

---

##### 转发

~~~java
package com.joker_yue.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * @author Joker
 * @version 1.0
 * @date 2023/7/29 19:45
 */

@Controller
public class ModelTest01 {

    @RequestMapping("m1/t1")
    public String test(Model model) {

        // 重定向
        model.addAttribute("msg", "model test01");
        return "redirect:/index.jsp";
    }
}
~~~



#### 处理、提交数据

---

##### 获取数据

1. 提交的域名称和处理方法的参数名一致

   提交数据:`http://localhost:8080/hello?name=joker`

   处理方法：
   ~~~java
   @RequestMapping("/hello")
   public String hello(String name){
       System.out.println(name);
       return "hello";
   }
   ~~~

   后台输出：joker

2. 提交的域名称和处理方法的参数名不一致

   提交数据`http://localhost:8080/hello?username=joker`

   处理方法：使用注解@RequestParam

   ~~~java
   @RequestMapping("/hello")
   public String hello(@RequestParam("username") String name){
       System.out.println(name);
       return "hello";
   }
   ~~~

   **==建议：不管前后端名称一不一样，都加上@RequestParam注解==**

3. 提交的是一个对象

   1. 实体类

      ~~~java
      package com.joker_yue.pojo;
      
      import lombok.AllArgsConstructor;
      import lombok.Data;
      import lombok.NoArgsConstructor;
      
      /**
       * @author Joker
       * @version 1.0
       * @date 2023/7/29 20:13
       */
      
      @Data
      @AllArgsConstructor
      @NoArgsConstructor
      public class User {
          private int id;
          private String name;
          private String age;
      }
      ~~~

   2. 提交数据`http://localhost:8080/user/t2?id=1&name=joker&age=19`

   3. 处理方法

      ~~~java
      // 前端接收的是一个对象：id，name，age
      // 将会自动匹配字段名，字段不一致将会匹配不到
      @GetMapping("t2")
      public String test2(User user) {
          System.out.println(user);
          return "test";
      }
      ~~~

      

   4. 后台输出User(id=1, name=joker, age=19)



---

##### 提交数据

你可以使用Model，这是**最常用的**

~~~java
public String test1(Model model) {

    model.addAttribute("msg", "Test Message“);

    return "test";
}
~~~

也可以使用ModelAndView

~~~java
public class HelloController implements Controller {
    @Override
    public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
        ModelAndView modelAndView = new ModelAndView();

        // 业务代码
        String result = "Hello SpringMVC!";
        modelAndView.addObject("msg", result);

        // 视图跳转
        modelAndView.setViewName("test");   // 交给springmvc-servlet.xml中的视图解析器，根据其配置，将会自动拼接链接并跳转到/WEB-INF/jsp/test.jsp

        return modelAndView;    // 必需：返回一个ModelAndView
    }
}
~~~

还可以使用ModelMap

~~~java
public String test2(ModelMap model) {

    model.addAttribute("msg", "Test Message 2“);

    return "test";
}
~~~

一些关系

~~~java
LinkedHashMap
    
ModelMap：继承了LinkedHashMap，拥有LinkedHashMap的全部功能
    
Model：精简版ModelMap，因为大部分情况下用不着ModelMap，Model够用
~~~



#### 解决乱码

---

##### 自己写的过滤器

* EncodingFilter.java

  ~~~java
  package com.joker_yue.filter;
  
  import javax.servlet.*;
  import java.io.IOException;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/29 21:03
   */
  public class EncodeingFilter implements Filter {
      @Override
      public void init(FilterConfig filterConfig) throws ServletException {
  
      }
  
      @Override
      public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
          servletRequest.setCharacterEncoding("UTF-8");
          servletResponse.setCharacterEncoding("UTF-8");
          filterChain.doFilter(servletRequest, servletResponse);
  
      }
  
      @Override
      public void destroy() {
  
      }
  }
  ~~~

* web.xml

  ~~~xml
    <filter>
      <filter-name>encodingfilter</filter-name>
      <filter-class>com.joker_yue.filter.EncodeingFilter</filter-class>
    </filter>
    <filter-mapping>
      <filter-name>encodingfilter</filter-name>
      <url-pattern>/*</url-pattern>
    </filter-mapping>
  ~~~

---

##### Spring自带的过滤器

~~~xml
<!--  SpringMVC EncodingFilter -->
  <filter>
    <filter-name>encoding</filter-name>
    <filter-class> org.springframework.web.filter.CharacterEncodingFilter </filter-class>
  </filter>
  <filter-mapping>
    <filter-name>encoding</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
~~~





#### JSON

---

##### 什么是Json

前后端分离时代：

* 后端部署后端，提供接口，提供数据
* 前端独立部署，负责渲染后端的数据

前后端数据约定：

* JSON，JavaScript Object Notation，JS对象标记，是一种轻量级的数据交换格式，目前使用广泛

JSON的特性：

* 采用完全独立于编程语言的文本格式来储存和表示数据
* 简洁和清晰的层次结构是的JSON成为理想的数据交换语言
* 易于人阅读和编写，同时也易于机器解析和生成，并有效地提升网络传输效率

---

##### JSON的使用

在JavaScript中，一切都是对象，因此，任何JavaScript支持的类型都可以通过JSON来表示，例如字符串，数字，对象，数组等。看看它的要求和语法格式：

* 对象表示为键值对，数据由逗号分隔
* 花括号保存为对象  {}
* 方括号保存为数组  []



JSON键值对是用来保存JavaScript对象的一种方式，和JavaScript对象的写法也大同小异，键/值对组合中的键名写在前面并用双引号 “ ” 包括，使用冒号 : 分割，然后紧接着值：

~~~json
{"name":"joker"}
{"age":"19"}
{"sex":"男"}
~~~



JSON是JavaScript对象的字符串表示法，它使用文本表示一个JS对象的信息本质是一个字符串

~~~javascript
var obj ={a:'hello',b:'world'};	//这是一个对象，注意键名也是可以使用引号包裹的
var json='{"a":"hello" , "b":"world"}';	//这是一个json字符串，本质就是字符串
~~~



JSON和JavaScript对象互转

* 要实现从JSON字符串转换为JavaScript独享，使用JSON.parse()方法

  ~~~js
  var obj = JSON.parse('{"a": "hello", "b": "world"}');
  // 结果为{a:'hello',b:'world'}
  ~~~

* 要实现从JavaScript对象转为JSON字符串，使用JSON.stringify()方法

  ~~~js
  var json = JSON.stringify({a:'hello',b:'world'});
  // 结果为'{"a":"hello" , "b":"world"}'
  ~~~



小测试：

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

  <script type="text/javascript">
    // 编写一个javascript对象
    var user={
      name:"张三",
      age:18,
      sex:"男"
    };
    console.log(user);

    // 将对象转换为json字符串
    var jsonStr=JSON.stringify(user);
    console.log(jsonStr);

    // 将字符串转换为JSON
    var json=JSON.parse(jsonStr);
    console.log(json);

  </script>
</head>
<body>

</body>
</html>
~~~



---

##### Controller返回JSON数据-Jsckson

* Jackson是目前比较好的json解析工具
* 当然，解析工具不止这一个，比如还有阿里巴巴的fastjson等

我们使用Jackson来演示

1. 导入配置

   ~~~xml
   <dependency>
       <groupId>com.fasterxml.jackson.core</groupId>
       <artifactId>jackson-databind</artifactId>
       <version>2.14.2</version>
   </dependency>
   ~~~

2. 导入配置：springmvc-servlet.xml，web.xml

3. 编写实体类和Controller

   实体类：User.java

   ~~~java
   package com.joker_yue.pojo;
   
   import lombok.AllArgsConstructor;
   import lombok.Data;
   import lombok.NoArgsConstructor;
   
   /**
    * @author Joker
    * @version 1.0
    * @date 2023/7/30 14:34
    */
   @Data
   @AllArgsConstructor
   @NoArgsConstructor
   public class User {
       private String name;
       private int age;
       private String sex;
   }
   ~~~

   Controller：UserController.java

   ~~~java
   package com.joker_yue.controller;
   
   import com.fasterxml.jackson.core.JsonProcessingException;
   import com.fasterxml.jackson.databind.ObjectMapper;
   import com.joker_yue.pojo.User;
   import org.springframework.stereotype.Controller;
   import org.springframework.web.bind.annotation.RequestMapping;
   import org.springframework.web.bind.annotation.ResponseBody;
   
   /**
    * @author Joker
    * @version 1.0
    * @date 2023/7/30 14:35
    */
   @Controller
   public class UserController {
   
       @RequestMapping(value = "/j1",produces = "application/json;charset=UTF-8")
       @ResponseBody   //只要你加@ResponseBody,就不会走视图解析器，会直接返回一个字符串
       public String json1() throws JsonProcessingException {
   
           // 创建一个对象
           User user = new User("joker", 18, "男");
   
           // jackson，ObjectMapper
           ObjectMapper mapper = new ObjectMapper();
           String value = mapper.writeValueAsString(user);
   
   
           return value;
       }
   }
   ~~~



我们可以在@RequestMapping上声明返回的数据类型和编码格式：

~~~java
@RequestMapping(value = "/j1",produces = "application/json;charset=UTF-8")
~~~



如果在类上标注@RestController，那么此类下所有方法将不会走视图解析器，那么返回值是String的方法可以方便的返回JSOn字符串。

~~~java
package com.joker_yue.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.joker_yue.pojo.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Joker
 * @version 1.0
 * @date 2023/7/30 14:35
 */
// @Controller
@RestController
public class UserController {

    @RequestMapping(value = "/j1", produces = "application/json;charset=UTF-8")
    @ResponseBody   // 只要你加@ResponseBody,就不会走视图解析器，会直接返回一个字符串
    public String json1() throws JsonProcessingException {

        // 创建一个对象
        User user = new User("joker", 18, "男");

        // jackson，ObjectMapper
        ObjectMapper mapper = new ObjectMapper();
        String value = mapper.writeValueAsString(user);


        return value;
    }
}
~~~



时间格式化：

~~~java
@RequestMapping(value = "/j3", produces = "application/json;charset=UTF-8")
@ResponseBody
public String json3() throws JsonProcessingException {
    ObjectMapper mapper = new ObjectMapper();

    Date date = new Date();

    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    return mapper.writeValueAsString(simpleDateFormat.format(date));

}
~~~

~~~java
@RequestMapping(value = "/j4", produces = "application/json;charset=UTF-8")
@ResponseBody
public String json4() throws JsonProcessingException {
    ObjectMapper mapper = new ObjectMapper();

    // 关闭时间戳显示时间
    mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);

    // 创建格式化时间的方式
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    mapper.setDateFormat(simpleDateFormat);

    Date date = new Date();

    return mapper.writeValueAsString(date);

}
~~~



我们可以将重复的代码部分实现为一个Util类

~~~java
package com.joker_yue.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import java.text.SimpleDateFormat;

/**
 * @author Joker
 * @version 1.0
 * @date 2023/7/30 15:12
 */
public class JsonUtils {
    public static String getJson(Object obj, String dateFormat) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();

        // 关闭时间戳显示时间
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);

        // 自定义日期格式
        SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
        mapper.setDateFormat(sdf);

        return mapper.writeValueAsString(obj);
    }

    public static String getJson(Object obj) throws JsonProcessingException {
        return getJson(obj, "yyyy-MM-dd HH:mm:ss");
    }
}
~~~



---

##### Controller返回JSON数据-FastJson

~~~java

@RequestMapping(value = "/j5", produces = "application/json;charset=UTF-8")
public String json5() throws JsonProcessingException {

    List<User> userList = new ArrayList<>();
    userList.add(new User("joker", 18, "男"));
    userList.add(new User("tom", 13, "男"));
    userList.add(new User("jerry", 15, "男"));
    userList.add(new User("julie", 15, "女"));

    String string = JSON.toJSONString(userList);
    return string;

}
~~~









#### SSM整合

---

![image-20230730201652253](./跟随狂神学Java-34.assets/image-20230730201652253.png)

##### Mybatis层

* 数据库

  ~~~sql
  CREATE DATABASE `ssmbuild`;
  
  USE `ssmbuild`;
  
  CREATE TABLE `books`(
  `bookID` INT(10) NOT NULL AUTO_INCREMENT COMMENT '书id',
  `bookName` VARCHAR(100) NOT NULL COMMENT '书名',
  `bookCounts` INT(11) NOT NULL COMMENT '数量',
  `detail` VARCHAR(200) NOT NULL COMMENT '描述',
  KEY `bookID`(`bookID`)
  )ENGINE=INNODB DEFAULT CHARSET=utf8;
  
  INSERT INTO `books`(`bookID`,`bookName`,`bookCounts`,`detail`) VALUES
  (1,'Java',1,'从入门到放弃'),
  (2,'MySQL',10,'从删库到跑路'),
  (3,'Linux',5,'从进门到进牢');
  ~~~

* Maven

  ~~~xml
  <!-- 依赖：junit，数据库驱动，连接池，servlet，jsp，mybatis，mybatis-spring，spring -->
  <dependencies>
      <dependency>
          <groupId>junit</groupId>
          <artifactId>junit</artifactId>
          <version>3.8.1</version>
          <scope>test</scope>
      </dependency>
      <dependency>
          <groupId>mysql</groupId>
          <artifactId>mysql-connector-java</artifactId>
          <version>8.0.31</version>
      </dependency>
      <dependency>
          <groupId>com.mchange</groupId>
          <artifactId>c3p0</artifactId>
          <version>0.9.5.4</version>
      </dependency>
  
      <!-- Servlet,JSP -->
      <dependency>
          <groupId>javax.servlet</groupId>
          <artifactId>servlet-api</artifactId>
          <version>2.5</version>
      </dependency>
      <dependency>
          <groupId>javax.servlet.jsp</groupId>
          <artifactId>jsp-api</artifactId>
          <version>2.1</version>
      </dependency>
      <dependency>
          <groupId>javax.servlet</groupId>
          <artifactId>jstl</artifactId>
          <version>1.2</version>
      </dependency>
  
      <!-- mybatis -->
      <dependency>
          <groupId>org.mybatis</groupId>
          <artifactId>mybatis</artifactId>
          <version>3.5.6</version>
      </dependency>
      <dependency>
          <groupId>org.mybatis</groupId>
          <artifactId>mybatis-spring</artifactId>
          <version>2.0.6</version>
      </dependency>
  
      <!-- Spring -->
      <dependency>
          <groupId>org.springframework</groupId>
          <artifactId>spring-webmvc</artifactId>
          <version>5.3.29</version>
      </dependency>
      <dependency>
          <groupId>org.springframework</groupId>
          <artifactId>spring-jdbc</artifactId>
          <version>5.3.29</version>
      </dependency>
  
      <!-- Lombok -->
      <dependency>
          <groupId>org.projectlombok</groupId>
          <artifactId>lombok</artifactId>
          <version>1.18.24</version>
      </dependency>
  </dependencies>
  
  
  <build>
      <finalName>SSMBuild</finalName>
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
  <properties>
      <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>
  ~~~

* pojo

  ~~~java
  package com.joker_yue.pojo;
  
  import lombok.AllArgsConstructor;
  import lombok.Data;
  import lombok.NoArgsConstructor;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/30 16:04
   */
  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public class Books {
      private int bookID;
      private String bookName;
      private int bookCount;
      private String bookDetail;
  }
  ~~~

* dao层Maper接口

  ~~~java
  package com.joker_yue.dao;
  
  import com.joker_yue.pojo.Books;
  import org.apache.ibatis.annotations.Param;
  
  import java.util.List;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/30 16:16
   */
  public interface BookMapper {
      // 增加一本书
      int addBook(Books books);
  
      // 删除一本书
      int deleteBookById(@Param("bookId") int id);
  
      // 更新一本书
      int updateBook(Books books);
  
      // 查询一本书
      Books queryBookById(@Param("bookId") int id);
  
      // 查询全部的书
      List<Books> queryAllBooks();
  }
  ~~~

* 接口对应的Mapper.xml文件

  ~~~xml
  <?xml version="1.0" encoding="UTF-8" ?>
  <!DOCTYPE mapper
          PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
          "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
  <mapper namespace="com.joker_yue.dao.BookMapper">
  
      <insert id="addBook" parameterType="Books">
          insert into ssmbuild.books (bookName, bookCounts, detail)
          values (#{bookName}, #{bookCount}, #{bookDetail})
      </insert>
  
      <delete id="deleteBookById" parameterType="int">
          delete from ssmbuild.books where bookID = #{bookID}
      </delete>
  
      <update id="updateBook" parameterType="Books">
          update ssmbuild.books
          set bookName = #{bookName}, bookCounts = #{bookCount}, detail = #{bookDetail}
          where bookID = #{id}
      </update>
  
      <select id="queryBookById" parameterType="int" resultType="Books">
          select *
          from ssmbuild.books
          where bookID = #{id}
      </select>
  
      <select id="queryAllBooks" resultType="com.joker_yue.pojo.Books">
          select * from ssmbuild.books
      </select>
  
  </mapper>
  ~~~

* service层的接口和实现类

  ~~~java
  package com.joker_yue.service;
  
  import com.joker_yue.pojo.Books;
  
  import java.util.List;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/30 16:42
   */
  public interface BookService {
      // 增加一本书
      int addBook(Books books);
  
      // 删除一本书
      int deleteBookById(int id);
  
      // 更新一本书
      int updateBook(Books books);
  
      // 查询一本书
      Books queryBookById(int id);
  
      // 查询全部的书
      List<Books> queryAllBooks();
  }
  ~~~

  ~~~java
  package com.joker_yue.service;
  
  import com.joker_yue.dao.BookMapper;
  import com.joker_yue.pojo.Books;
  import org.springframework.beans.factory.annotation.Autowired;
  
  import java.util.List;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/30 16:45
   */
  public class BookServiceImpl implements BookService {
      // Service调用Dao层，需要组合进来
      private BookMapper bookMapper;
  
      public void setBookMapper(BookMapper bookMapper) {
          this.bookMapper = bookMapper;
      }
  
  
      @Override
      public int addBook(Books books) {
          return bookMapper.addBook(books);
      }
  
      @Override
      public int deleteBookById(int id) {
          return bookMapper.deleteBookById(id);
      }
  
      @Override
      public int updateBook(Books books) {
          return bookMapper.updateBook(books);
      }
  
      @Override
      public Books queryBookById(int id) {
          return bookMapper.queryBookById(id);
      }
  
      @Override
      public List<Books> queryAllBooks() {
          return bookMapper.queryAllBooks();
      }
  }
  ~~~

---

##### Spring层

* Spring整合Mybatis的相关配置文件，daoc层，spring-dao.xml。我们这里数据源使用c3p0连接池

  ~~~xml
  <?xml version="1.0" encoding="UTF-8"?>
  <beans xmlns="http://www.springframework.org/schema/beans"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns:context="http://www.springframework.org/schema/context"
         xsi:schemaLocation="http://www.springframework.org/schema/beans
         http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
  
      <!--   1. 关联数据库配置文件    -->
      <context:property-placeholder location="classpath:db.properties"/>
  
      <!--   2. 连接池
        dbcp： 半自动化操作
        c3p0： 自动化操作，自动加载配置文件并自动设置到对象中
        druid、hikari
        -->
      <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
          <property name="driverClass" value="${jdbc.driver}"/>
          <property name="jdbcUrl" value="${jdbc.url}"/>
          <property name="user" value="${jdbc.username}"/>
          <property name="password" value="${jdbc.password}"/>
  
          <!--  c3p0的一些私有属性   -->
          <property name="maxPoolSize" value="30"/>
          <property name="minPoolSize" value="10"/>
          <!--   关闭连接后不自动commit   -->
          <property name="autoCommitOnClose" value="false"/>
          <!--   获取连接超时时间   -->
          <property name="checkoutTimeout" value="10000"/>
          <!--   当获取连接失败重试次数   -->
          <property name="acquireRetryAttempts" value="2"/>
      </bean>
  
      <!--   3. sqlSessionFactory   -->
      <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
          <property name="dataSource" ref="dataSource"/>
          <!--   绑定Mybatis的配置文件   -->
          <property name="configLocation" value="classpath:mybatis-config.xml"/>
      </bean>
  
  
      <!--  4. 配置dao接口扫描包，动态的实现了Dao接口可以注入到spring容器中    -->
      <bean id="mapperScanner" class="org.mybatis.spring.mapper.MapperScannerConfigurer">
          <!-- 注入sqlSessionFactory -->
          <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
          <!-- 要扫描的包 -->
          <property name="basePackage" value="com.joker_yue.dao"/>
      </bean>
  </beans>
  ~~~

* Spring整合service层

  ~~~xml
  <?xml version="1.0" encoding="UTF-8"?>
  <beans xmlns="http://www.springframework.org/schema/beans"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns:context="http://www.springframework.org/schema/context"
         xsi:schemaLocation="http://www.springframework.org/schema/beans
         http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
  
      <!--  1. 扫描service下的包    -->
      <context:component-scan base-package="com.joker_yue.service"/>
  
  
      <!--   2. 将所有业务类注入到spring，可以通过配置或者注解实现   -->
      <bean id="bookServiceImpl" class="com.joker_yue.service.BookServiceImpl">
          <property name="bookMapper" ref="bookMapper"/>
      </bean>
  
      <!--   3. 声明式事务配置       -->
      <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
          <!-- 注入数据源 -->
          <property name="dataSource" ref="dataSource"/>
      </bean>
  
      <!--   4. AOP横切事务       -->
  
  
  </beans>
  ~~~

---

##### Spring层

* web.xml

  ~~~xml
  <?xml version="1.0" encoding="UTF-8"?>
  <web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
           version="4.0">
  
  
      <!--  DispatcherServlet 核心Servlet  -->
      <servlet>
          <servlet-name>springmvc</servlet-name>
          <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
          <init-param>
              <param-name>contextConfigLocation</param-name>
              <param-value>classpath:applicationContext.xml</param-value>
          </init-param>
          <load-on-startup>1</load-on-startup>
      </servlet>
      <servlet-mapping>
          <servlet-name>springmvc</servlet-name>
          <url-pattern>/</url-pattern>
      </servlet-mapping>
  
      <!--   乱码过滤   -->
      <filter>
          <filter-name>encodingFilter</filter-name>
          <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
          <init-param>
              <param-name>encoding</param-name>
              <param-value>UTF-8</param-value>
          </init-param>
      </filter>
      <filter-mapping>
          <filter-name>encodingFilter</filter-name>
          <url-pattern>/*</url-pattern>
      </filter-mapping>
  
      <!--   Session自动超时   -->
      <session-config>
          <session-timeout>15</session-timeout>
      </session-config>
  
  </web-app>
  ~~~

* spring-mvc.xml

  ~~~xml
  <?xml version="1.0" encoding="UTF-8"?>
  <beans xmlns="http://www.springframework.org/schema/beans"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns:mvc="http://www.springframework.org/schema/mvc"
         xmlns:context="http://www.springframework.org/schema/context"
         xsi:schemaLocation="http://www.springframework.org/schema/beans
         http://www.springframework.org/schema/beans/spring-beans.xsd
         http://www.springframework.org/schema/mvc
         https://www.springframework.org/schema/mvc/spring-mvc.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
  
      <!--   1. 注解驱动   -->
      <mvc:annotation-driven/>
      <!--   2. 静态资源过滤   -->
      <mvc:default-servlet-handler/>
      <!--   3. 扫描包：Controller   -->
      <context:component-scan base-package="com.joker_yue.controller"/>
      <!--   4. 视图解析器   -->
      <bean id="viewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
          <!-- <property name="viewClass" value="org.springframework.web.servlet.view.JstlView"/> -->
          <property name="prefix" value="/WEB-INF/jsp/"/>
          <property name="suffix" value=".jsp"/>
      </bean>
  </beans> 
  ~~~

  



#### Ajax

---

##### 什么是Ajax

Asynchronous JavaScript and XML（异步的JavaScript和XML）

* 是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术
* 不是一种新的编程语言，而是一种用于创建更好更快以及交互性更强的Web应用程序的技术
* 2005年Google通过其GoogleSuggest使Ajax变得流行起来。它能够帮你自动完成搜索单词
* GoogleSuggest使用ajax创造出动态性极强的web界面，当你在谷歌的搜索框输入文本的时候，JavaScript会把这些字符发送到服务器，然后服务器会返回一个搜索建议的列表
* 传统的网页（即不使用Ajax技术的网页），想要更新内容或者提交一个表单，都需要重新加载整个网页
* 使用ajax的网页，通过在后台服务器进行少量的数据交换，就可以实现异步局部更新
* 使用ajax，用户可以创建接近本地桌面应用的直接、可高用、更丰富的web用户界面



---

##### jQuery

jQuery是一个库，有js的大量函数（方法）

js：

* 函数：闭包
* Dom
  * id,name,tag
  * create,remove
* Bom
  * Window
  * document

ES6：import，require

~~~html
<%--
  Created by IntelliJ IDEA.
  User: Joker
  Date: 2023/7/31
  Time: 16:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    
    <script src="${pageContext.request.contextPath}/statics/js/jquery-3.7.0.js"></script>
    
    <script>
        function a() {
            $.post({
                url: "${pageContext.request.contextPath}/a1",
                data: {"name": $("#username").val()},
                success: function (data) {
                    alert(data);
                }
            })
        }
    
    </script>
</head>
<body>
<%--失去焦点的时候，发起一个请求到后台--%>
<a href="/t1"></a>
用户名：<input type="text" id="username" onblur="a()">
</body>
</html>
~~~

~~~java
package com.joker_yue.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author Joker
 * @version 1.0
 * @date 2023/7/31 16:22
 */
@RestController
public class AjaxController {
    @RequestMapping("/t1")
    public String ajax(){
        return "ajax";
    }

    @RequestMapping("/a1")
    public void a1(String name, HttpServletResponse response) throws IOException {
        System.out.println("a1:name = " + name);
        if(name.equals("joker")){
            response.getWriter().print("true");
        }else{
            response.getWriter().print("false");
        }
    }
}
~~~

---

##### Ajax异步获取请求

~~~java
package com.joker_yue.controller;

import com.joker_yue.pojo.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Joker
 * @version 1.0
 * @date 2023/7/31 16:22
 */
@RestController
public class AjaxController {
    @RequestMapping("/t1")
    public String ajax() {
        return "ajax";
    }

    @RequestMapping("/a1")
    public void a1(String name, HttpServletResponse response) throws IOException {
        System.out.println("a1:name = " + name);
        if (name.equals("joker")) {
            response.getWriter().print("true");
        } else {
            response.getWriter().print("false");
        }
    }

    @RequestMapping("/a2")
    public List<User> a2() {
        ArrayList<User> userList = new ArrayList<>();
        // 添加数据
        userList.add(new User("joker", 18, "男"));
        userList.add(new User("jerry", 18, "男"));
        userList.add(new User("tom", 18, "男"));
        return userList;
    }

    @RequestMapping("/a3")
    public String a3(String name, String pwd) {
        System.out.println("name=" + name);
        System.out.println("pwd=" + pwd);
        String msg = null;

        if (name != null && !name.isEmpty()) {
            // admin 这些数据应该在数据库中查找
            if ("admin".equals(name)) {
                msg = "true";
            } else {
                msg = "用户名有误";
            }
            return msg;
        } else if (pwd != null && !pwd.isEmpty()) {
            if ("12345".equals(pwd) || Integer.parseInt(pwd) == 12345) {
                msg = "true";
            } else {
                msg = "密码有误";
            }
            return msg;
        }
        return "出错了！";
    }
}

~~~

~~~jsp
<%--
  Created by IntelliJ IDEA.
  User: Joker
  Date: 2023/7/31
  Time: 17:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script src="${pageContext.request.contextPath}/statics/js/jquery-3.7.0.js"></script>
    <script>
        function a1() {
            $.post({
                url: "${pageContext.request.contextPath}/a3",
                data: {"name": $("#name").val()},
                success: function (data) {
                    if (data.toString() === "true") {
                        $("#userInfo").css("color", "green");
                    }
                    $("#userInfo").html(data);
                }
            })
        }

        function a2() {
            $.post({
                url: "${pageContext.request.contextPath}/a3",
                data: {"pwd": $("#pwd").val()},
                success: function (data) {
                    if (data.toString() === "true") {
                        $("#pwdInfo").css("color", "green");
                    }
                    $("#pwdInfo").html(data);
                }
            })
        }
    </script>
</head>
<body>
<p>
    用户名：<input type="text" id="name" onblur="a1()">
    <span id="userInfo"></span>
</p>

<p>
    密码：<input type="password" id="pwd" onblur="a2()">
    <span id="pwdInfo"></span>
</p>

</body>
</html>

~~~







#### 拦截器

----

拦截器类似于Servlet中的过滤器

过滤器

* servlet规范中的一部分，任何javaweb工程都可以使用
* 在url-pattern中配置了/*之后，可以对所有要访问的资源进行过滤

拦截器

* 是SpringMVC框架自己的，只有使用了SpringMVC框架的工程才能使用
* 拦截器只会拦截访问的控制器方法，如果访问的是jsp/html/css/image/js是不会进行拦截的

---

##### 使用拦截器

* TestController.java

  ~~~java
  package com.joker_yue.controller;
  
  import org.springframework.stereotype.Controller;
  import org.springframework.web.bind.annotation.GetMapping;
  import org.springframework.web.bind.annotation.RequestMapping;
  import org.springframework.web.bind.annotation.RestController;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/8/1 15:22
   */
  @RestController
  public class TestController {
      @GetMapping("/test")
      public String test(){
          System.out.println("TestController");
          return "ok";
      }
  }
  ~~~

* MyInterceptor.java

  ~~~java
  package com.joker_yue.config;
  
  import org.springframework.web.servlet.HandlerInterceptor;
  import org.springframework.web.servlet.ModelAndView;
  
  import javax.servlet.http.HttpServletRequest;
  import javax.servlet.http.HttpServletResponse;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/8/1 15:29
   */
  public class MyInterceptor implements HandlerInterceptor {
  
      // return true：放行，执行下一个拦截器
      // return false：拦截
      @Override
      public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
  
          System.out.println("===========preHandle===========");
          return true;
      }
  
      // 日志
      @Override
      public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
          System.out.println("===========postHandle===========");
      }
  
      @Override
      public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
          System.out.println("===========afterCompletion===========");
      }
  }
  ~~~

* applicationContext.xml

  ~~~xml
  <!--   拦截器配置    -->
  <mvc:interceptors>
      <mvc:interceptor>
          <!--
              /  过滤所有请求
              /* 过滤当前请求
              /**过滤所有请求
           -->
          <mvc:mapping path="/**"/>
          <bean class="com.joker_yue.config.MyInterceptor"/>
      </mvc:interceptor>
  </mvc:interceptors>
  ~~~



#### 文件上传

---

##### 前端表单要求

* 必须将表单的method设置为POST，并将enctype设置为multipart/form-data。只有在这样的情况下，浏览器才会把用户选择的文件以二进制数据发送给服务器

  ~~~jsp
  <%--
    Created by IntelliJ IDEA.
    User: Joker
    Date: 2023/8/1
    Time: 16:34
    To change this template use File | Settings | File Templates.
  --%>
  <%@ page contentType="text/html;charset=UTF-8" language="java" %>
  <html>
  <head>
      <title>Title</title>
  </head>
  <body>
  <form action="${pageContext.request.contextPath}/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="file"/>
      <input type="submit" value="上传"/>
  </form>
  </body>
  </html>
  ~~~

  

---

##### 后端要求

* 使用comons-io 

* Maven配置文件：

  ~~~xml
  <dependency>
      <groupId>commons-fileupload</groupId>
      <artifactId>commons-fileupload</artifactId>
      <version>1.3.2</version>
  </dependency>
  <!-- Java Servlet API -->
  <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>4.0.1</version>
      <scope>provided</scope>
  </dependency>
  
  <!-- JavaServer Pages (JSP) API -->
  <dependency>
      <groupId>javax.servlet.jsp</groupId>
      <artifactId>javax.servlet.jsp-api</artifactId>
      <version>2.3.3</version>
      <scope>provided</scope>
  </dependency>
  
  <!-- JavaServer Pages Standard Tag Library (JSTL) -->
  <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>jstl</artifactId>
      <version>1.2</version>
  </dependency>
  <dependency>
      <groupId>org.glassfish.web</groupId>
      <artifactId>jstl-impl</artifactId>
      <version>1.2</version>
  </dependency>
  ~~~

* applicationContext.xml

  ~~~xml
  <!--  文件上传配置 -->
  <bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
      <!-- 请求的编码格式，必须和jsp的pageEncoding属性一致，以便正确读取表单中的内容，默认为ISO-8859-1  -->
      <property name="defaultEncoding" value="UTF-8"/>
      <!-- 文件上传大小限制，单位为字节 (10MB=10485760) -->
      <property name="maxUploadSize" value="10485760"/>
      <!-- 缓冲 -->
      <property name="maxInMemorySize" value="40960"/>
  </bean>
  ~~~

  

  ~~~java
  package com.joker_yue.controller;
  
  
  import org.springframework.stereotype.Controller;
  import org.springframework.web.bind.annotation.RequestMapping;
  import org.springframework.web.bind.annotation.RequestParam;
  import org.springframework.web.multipart.commons.CommonsMultipartFile;
  
  import javax.servlet.http.HttpServletRequest;
  import java.io.*;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/8/1 16:35
   */
  
  @Controller
  public class FileController {
      //@RequestParam("file") 将name=file控件得到的文件封装成CommonsMultipartFile 对象
      //批量上传CommonsMultipartFile则为数组即可
      @RequestMapping("/upload")
      public String fileUpload(@RequestParam("file") CommonsMultipartFile file , HttpServletRequest request) throws IOException {
  
          //获取文件名 : file.getOriginalFilename();
          String uploadFileName = file.getOriginalFilename();
  
          //如果文件名为空，直接回到首页！
          if ("".equals(uploadFileName)){
              return "redirect:/index.jsp";
          }
          System.out.println("上传文件名 : "+uploadFileName);
  
          //上传路径保存设置
          String path = request.getServletContext().getRealPath("/upload");
          //如果路径不存在，创建一个
          File realPath = new File(path);
          if (!realPath.exists()){
              realPath.mkdir();
          }
          System.out.println("上传文件保存地址："+realPath);
  
          InputStream is = file.getInputStream(); //文件输入流
          OutputStream os = new FileOutputStream(new File(realPath,uploadFileName)); //文件输出流
  
          //读取写出
          int len=0;
          byte[] buffer = new byte[1024];
          while ((len=is.read(buffer))!=-1){
              os.write(buffer,0,len);
              os.flush();
          }
          os.close();
          is.close();
          return "redirect:/index.jsp";
      }
  
  
      /*
       * 采用file.Transto 来保存上传的文件
       */
      @RequestMapping("/upload2")
      public String  fileUpload2(@RequestParam("file") CommonsMultipartFile file, HttpServletRequest request) throws IOException {
  
          //上传路径保存设置
          String path = request.getServletContext().getRealPath("/upload");
          File realPath = new File(path);
          if (!realPath.exists()){
              realPath.mkdir();
          }
          //上传文件地址
          System.out.println("上传文件保存地址："+realPath);
  
          //通过CommonsMultipartFile的方法直接写文件（注意这个时候）
          file.transferTo(new File(realPath +"/"+ file.getOriginalFilename()));
  
          return "redirect:/index.jsp";
      }
  }
  ~~~



#### 文件下载

---

1、设置 response 响应头

2、读取文件 -- InputStream

3、写出文件 -- OutputStream

4、执行操作

5、关闭流 （先开后关）

代码：

  ~~~java
  @RequestMapping(value="/download")
  public String downloads(HttpServletResponse response ,HttpServletRequest request) throws Exception{
     //要下载的图片地址
     String  path = request.getServletContext().getRealPath("/upload");
     String  fileName = "基础语法.jpg";
  
     //1、设置response 响应头
     response.reset(); //设置页面不缓存,清空buffer
     response.setCharacterEncoding("UTF-8"); //字符编码
     response.setContentType("multipart/form-data"); //二进制传输数据
     //设置响应头
     response.setHeader("Content-Disposition",
             "attachment;fileName="+URLEncoder.encode(fileName, "UTF-8"));
  
     File file = new File(path,fileName);
     //2、 读取文件--输入流
     InputStream input=new FileInputStream(file);
     //3、 写出文件--输出流
     OutputStream out = response.getOutputStream();
  
     byte[] buff =new byte[1024];
     int index=0;
     //4、执行 写出操作
     while((index= input.read(buff))!= -1){
         out.write(buff, 0, index);
         out.flush();
    }
     out.close();
     input.close();
     return null;
  }
  ~~~

  
