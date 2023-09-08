---
title: 跟随狂神学Java-32，Mybatis
date: 2023/07/23 04:02:22
tags:
  - Java
  - 狂神
  - SSM
  - Mybatis
  - 必看
categories:
  - [跟随狂神学Java]
cover: /images/coverImg/Mybatis/Mybatis.jpg
keywords:
  - Mybatis
  - 持久化
  - CRUD操作
  - 配置解析
  - 日志
  - 分页
  - 多对一关系
  - 一对多关系
  - 动态SQL
  - 缓存
  - Web应用程序
  - Web服务器
  - Maven
  - MVC三层架构
  - MVC
  - JDBC
ai:
  - 这篇笔记介绍了Mybatis持久化框架的基本概念和用法，包括环境搭建、CRUD操作、配置解析、日志、分页、多对一、一对多、动态SQL和缓存等关键主题。笔记提供了全面的指导和示例，帮助读者深入理解Mybatis的核心特性和应用。
  - 这篇笔记全面介绍了Mybatis持久化框架的核心概念和用法，包括环境搭建、CRUD操作、配置解析、日志、分页、多对一、一对多、动态SQL、缓存等多个方面。提供了学习Mybatis的全面指南和示例。
  - 这篇笔记概括了Mybatis持久化框架的核心概念和用法，包括环境搭建、CRUD操作、配置解析、日志、分页、多对一、一对多、动态SQL、缓存等多个方面。文章详细介绍了如何使用Mybatis进行数据库操作以及如何优化和定制Mybatis配置。总之，这篇笔记为学习Mybatis提供了全面的指导和示例。
---
# 跟随狂神学Java

**第三十二：Mybatis**

> “计算机只是一种工具，它永远不可能代替人类的思维。” —— 伊文·卡特曼
>
> [【狂神说Java】Mybatis最新完整教程IDEA版通俗易懂_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1NE411Q7Nx/?vd_source=814489e71df641c4b2c0ff7d4659b2d0)



#### 环境

---

* JDK1.8
* Mysql 5.7
* maven 3.6.1
* IDEA



#### 简介

---

##### 什么是Mybatis

![MyBatis logo](http://www.mybatis.org/images/mybatis-logo.png)

* MyBatis 是一款优秀的持久层框架
* 它支持自定义 SQL、存储过程以及高级映射
* MyBatis 免除了几乎所有的 JDBC 代码以及设置参数和获取结果集的工作
* MyBatis 可以通过简单的 XML 或注解来配置和映射原始类型、接口和 Java POJO（Plain Old Java Objects，普通老式 Java 对象）为数据库中的记录
* 前世今生
  * MyBatis本是apache的一个[开源项目](https://baike.baidu.com/item/开源项目/3406069?fromModule=lemma_inlink)iBatis，2010年这个项目由apache software foundation迁移到了[google code](https://baike.baidu.com/item/google code/2346604?fromModule=lemma_inlink)，并且改名为MyBatis。2013年11月迁移到[Github](https://baike.baidu.com/item/Github/10145341?fromModule=lemma_inlink)。
  * iBATIS一词来源于“internet”和“abatis”的组合，是一个基于[Java](https://baike.baidu.com/item/Java/85979?fromModule=lemma_inlink)的[持久层](https://baike.baidu.com/item/持久层/3584971?fromModule=lemma_inlink)框架。iBATIS提供的持久层框架包括SQL Maps和Data Access Objects（DAOs）。



**如何获取Mybatis**

~~~xml
<dependency>
  <groupId>org.mybatis</groupId>
  <artifactId>mybatis</artifactId>
  <version>x.x.x</version>
</dependency>
~~~

* [Github](https://github.com/mybatis/mybatis-3)
* [中文文档](https://mybatis.org/mybatis-3/zh/index.html)

---

##### 持久化

数据持久化

* 持久化就是将程序的数据在持久状态和瞬时状态转化的过程
* 内存：“断电即失”
* 数据库（JDBC）、IO文件持久化

为什么需要持久化

* 有一些对象不能丢
* 内存贵

---

##### 持久层

Dao层、Service层、Controller层。。。

* 完成持久化工作的代码块
* 层界限十分的明显

---

##### 为什么需要Mybatis

* 帮助程序员将数据存入到数据库中

* 方便
* 传统的JDBC代码过于复杂。简化。框架。自动化
* 不用Mybatis也可以，但是更容易上手



#### 第一个Mybatis程序

---

思路：搭建环境->导入Mybatis->编写代码->测试

##### 搭建环境

1. 搭建数据库

   ~~~sql
   CREATE DATABASE `mybatis`	;
   
   USE `mybatis`;
   
   
   CREATE TABLE `user` (
   	`id` INT ( 20 ) NOT NULL PRIMARY KEY,
   	`name` VARCHAR ( 30 ) DEFAULT  NULL,
   	`pwd` VARCHAR ( 30 ) DEFAULT  NULL
   )ENGINE=INNODB ;
   
   INSERT INTO `user`(`id`,`name`,`pwd`) VALUES 
   (1,'Joker','123456'),
   (2,'Yue','123456'),
   (3,'JokerYue','123456')
   ~~~

2. 新建项目

   普通的Maven项目

   删除src目录，这样就可以当他是父工程

   导入Maven依赖

   ~~~xml
   <dependencies>
       <!-- 单元测试 -->
       <dependency>
           <groupId>junit</groupId>
           <artifactId>junit</artifactId>
           <version>3.8.1</version>
       </dependency>
       <!-- mybatis -->
       <dependency>
           <groupId>org.mybatis</groupId>
           <artifactId>mybatis</artifactId>
           <version>3.5.3</version>
       </dependency>
       <!-- mysql驱动 -->
       <dependency>
           <groupId>mysql</groupId>
           <artifactId>mysql-connector-java</artifactId>
           <version>8.0.31</version>
       </dependency>
   </dependencies>
   ~~~



---

##### 创建一个模块

* 编写Mybatis的核心配置文件

  ~~~xml
  useSSL=true&amp;characterEncoding=UTF-8&amp;useUnicode=true&amp;serverTimezone=GMT
  ~~~

* 编写Mybatis工具类

  ~~~java
  package com.joker_yue.utils;
  
  import org.apache.ibatis.io.Resources;
  import org.apache.ibatis.session.SqlSession;
  import org.apache.ibatis.session.SqlSessionFactory;
  import org.apache.ibatis.session.SqlSessionFactoryBuilder;
  
  import java.io.IOException;
  import java.io.InputStream;
  
  /**
   * 工具类
   * sqlSessionFactory的作用是构建sqlSession
   *
   * @author Joker
   * @version 1.0
   * @date 2023/7/19 19:48
   */
  public class MybatisUtils {
  
      private static SqlSessionFactory sqlSessionFactory = null;
  
      static {
          try {
              String resource = "mybatis-config.xml";         // 准备mybatis的配置
              InputStream inputStream = Resources.getResourceAsStream(resource);    // 读取mybatis的配置
               sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);    // 根据读取到的配置构建sqlSessionFactory
          } catch (IOException e) {
              throw new RuntimeException(e);
          }
      }
  
      // 既然有了 SqlSessionFactory，顾名思义，我们可以从中获得 SqlSession 的实例。
      // SqlSession 提供了在数据库执行 SQL 命令所需的所有方法。你可以通过 SqlSession 实例来直接执行已映射的 SQL 语句。
      public static SqlSession getSqlSession() {
          return sqlSessionFactory.openSession();
      }
  }
  ~~~



---

##### 编写代码

* 实体类

  ~~~java
  package com.joker_yue.pojo;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/19 20:02
   */
  public class User {
      private int id;
      private String name;
      private String pwd;
  
      public User() {
      }
  
      public User(int id, String name, String pwd) {
  
          this.id = id;
          this.name = name;
          this.pwd = pwd;
      }
  
      public int getId() {
          return id;
      }
  
      public void setId(int id) {
          this.id = id;
      }
  
      public String getName() {
          return name;
      }
  
      public void setName(String name) {
          this.name = name;
      }
  
      public String getPwd() {
          return pwd;
      }
  
      public void setPwd(String pwd) {
          this.pwd = pwd;
      }
  
      @Override
      public String toString() {
          return "User{" +
                  "id=" + id +
                  ", name='" + name + '\'' +
                  ", pwd='" + pwd + '\'' +
                  '}';
      }
  }
  ~~~

* Dao接口

  ~~~java
  package com.joker_yue.dao;
  
  import com.joker_yue.pojo.User;
  
  import java.util.List;
  
  /**
   *
   * @author Joker
   * @version 1.0
   * @date 2023/7/19 20:05
   */
  public interface UserDao {
      List<User> getUserList();
  }
  ~~~

  

* 接口实现类由原来的userDaoImpl转换成一个Mapper配置文件

  ~~~java
  <?xml version="1.0" encoding="UTF-8" ?>
  <!DOCTYPE mapper
          PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
          "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
  
  <!-- 命名空间，会绑定一个对应的Dao接口/Mapper接口 -->
  <mapper namespace="com.joker_yue.dao.UserDao">
      <!-- id:select的主键标识，一定要与UserDao里面的方法名字一样，resultType:查询结果 -->
      <select id="getUserList" resultType="com.joker_yue.pojo.User">
          <!-- 执行查询 -->
          select * from mybatis.user
      </select>
  </mapper>
  ~~~

* 最后写测试，放在下面单独讲

---

##### 测试和可能遇到的问题，以及注意事项

可能遇到的问题：

  ~~~text
  配置文件没有注册
  绑定接口错误
  方法名不对
  返回类型不对
  Maven导出资源问题
  ~~~

  

常见错误

* xml文件乱码问题，pom文件中加

  ~~~xml
  <properties>
      <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>
  ~~~

  ~~~text
  报The error may exist in...就把idea清除缓存重启就好
  报Error building SqlSession就把所有xml文件编码改成utf8
  ~~~



注意事项

* 由于Maven由于约定大于配置，之后可能会遇到我们写的配置文件无法导出或生效的问题，解决方案：在build中配置resources，防止资源导出失败

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

* 关于mybatis-config.xml的配置

  注意`mapper resource`中一定是斜杠路径

  ~~~xml
  <?xml version="1.0" encoding="UTF-8" ?>
  <!DOCTYPE configuration
          PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
          "https://mybatis.org/dtd/mybatis-3-config.dtd">
  <!-- 核心配置文件 -->
  <configuration>
      <!-- 可以配置多套环境 -->
      <environments default="development">
          <environment id="development">
              <transactionManager type="JDBC"/>
              <dataSource type="POOLED">
                  <!-- <property name="driver" value="com.mysql.jdbc.Driver"/> -->
                  <!-- 使用新驱动 -->
                  <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                  <!-- &amp是转义字符，为& -->
                  <property name="url" value="jdbc:mysql://localhost:3306/mybatis?useSSL=true&amp;useUnicode=true&amp;characterEncoding=UTF-8"/>
                  <property name="username" value="root"/>
                  <property name="password" value="root"/>
              </dataSource>
          </environment>
      </environments>
      <!-- 每一个Mapper.xml都需要在Mybatis核心配置文件中注册 -->
      <mappers>
          <mapper resource="com/joker_yue/dao/UserMapper.xml"/>
      </mappers>
  </configuration>
  ~~~

  

MapperRegistery是什么？

核心配置文件中注册mappers



测试

* junit测试

  ~~~java
  package com.joker_yue.dao;
  
  import com.joker_yue.pojo.User;
  import com.joker_yue.utils.MybatisUtils;
  import org.apache.ibatis.session.SqlSession;
  import org.junit.Test;
  
  import java.util.List;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/19 20:22
   */
  public class UserDaoTest {
      @Test
      public void test() {
          // 1. 获得SqlSession
          SqlSession sqlSession = MybatisUtils.getSqlSession();
  
          // 2.执行Sql
  
          // 方式一，getMapper
          // 这里用的是动态代理返回的一个userDao的代理类！
          // 反射获取到接口信息，然后调用方法进行实现
          UserDao userDao = sqlSession.getMapper(UserDao.class);	// 反射获取到接口信息
          List<User> userList = userDao.getUserList();			// 调用方法进行实现
  
          for (User user : userList) {
              System.out.println(user);
          }
  
          // 关闭SqlSession
          sqlSession.close();
      }
  }
  ~~~

* 第二种方法：不推荐使用

  ~~~java
  // 2.执行Sql
  
  // 方式一，getMapper
  // 这里用的是动态代理返回的一个userDao的代理类！
  // UserDao userDao = sqlSession.getMapper(UserDao.class);
  // List<User> userList = userDao.getUserList();
  
  //方式二，select，不推荐使用
  List<User> userList = sqlSession.selectList("com.joker_yue.dao.UserDao.getUserList");
  ~~~

  * 原因：
    1. 缺乏类型安全：方式二中直接传入了一个字符串作为查询语句的标识符，这样的写法在编译时无法进行类型检查，容易出现拼写错误或者语法错误而不易发现。而方式一中使用 `getMapper` 方法可以通过接口的方式来执行查询，可以在编译时进行类型检查，减少错误的发生。
    2. 不利于维护和重构：方式二中的查询语句是直接写在代码中的，如果需要修改查询语句或者新增其他查询，需要修改代码并重新编译。而方式一中的查询语句是通过接口定义的，可以将查询语句集中管理在 XML 文件中，方便维护和重构。
    3. 可读性差：方式二中的查询语句是直接写在代码中的，对于复杂的查询语句或者多表关联查询，代码的可读性会变差。而方式一中的查询语句可以通过 XML 文件来定义，可以更清晰地表达查询逻辑。

  

#### CRUD

---

##### 命名空间namespace

namespace中的包名要和Dao/mapper 接口的包名一致



---

##### 查询语句Select

操作：

1. 编写接口

   ~~~sql
   // 根据id查询用户
   User getUserById(int id);
   ~~~

   

2. 编写对应的mapper中的sql

   ~~~xml
   <!-- 根据id查询 -->
   <select id="getUserById" resultType="com.joker_yue.pojo.User" parameterType="int">
       <!--  执行查询    -->
       select * from mybatis.user where id = #{id}
   </select>
   ~~~

3. 测试

   ~~~java
   @Test
   public void getUserByIdTest() {
       SqlSession sqlSession = MybatisUtils.getSqlSession();
   
       UserMapper mapper = sqlSession.getMapper(UserMapper.class);
   
       User user = mapper.getUserById(1);
       System.out.println(user);
   
       sqlSession.close();
   }
   ~~~

---

##### 插入语句Insert

操作：

1. 编写接口

   ~~~java
   // 插入一个用户
   int addUser(User user);
   ~~~

   

2. 编写对应的mapper中的sql

   ~~~xml
   <!-- 插入一个用户 -->
   <insert id="addUser" parameterType="com.joker_yue.pojo.User">
       <!-- 执行插入 -->
       <!-- 对象中的属性可以直接取出来 -->
       insert into mybatis.user (id,name,pwd) values(#{id},#{name},#{pwd})
   </insert>
   ~~~

   

3. 测试

   ~~~java
   @Test
   public void addUserTest() {
       SqlSession sqlSession = MybatisUtils.getSqlSession();
   
       UserMapper mapper = sqlSession.getMapper(UserMapper.class);
       int res = mapper.addUser(new User(4, "Jack", "123"));
   
       if (res > 0) {
           System.out.println("添加成功");
       }
   
       // 提交事务，增删改必须提交事务
       sqlSession.commit();
   
       sqlSession.close();
   }
   ~~~

   

---

##### 修改语句Update

操作：

1. 编写接口

   ~~~java
   // 修改用户
   int updateUser(User user);
   ~~~

   

2. 编写对应的mapper中的sql

   ~~~xml
   <!-- 修改用户 -->
   <update id="updateUser" parameterType="com.joker_yue.pojo.User">
       <!-- 执行修改 -->
       update mybatis.user set name = #{name},pwd = #{pwd} where id = #{id}
   </update>
   ~~~

   

3. 测试

   ~~~java
   @Test
   public void updateUserTest() {
       SqlSession sqlSession = MybatisUtils.getSqlSession();
   
       UserMapper mapper = sqlSession.getMapper(UserMapper.class);
       int res = mapper.updateUser(new User(4, "Jack", "1234567"));
   
       if (res > 0) {
           System.out.println("修改成功");
       }
   
       // 提交事务
       sqlSession.commit();
   
       // 关闭
       sqlSession.close();
   
   }
   ~~~

   

---

##### 删除语句Delete

操作：

1. 编写接口

   ~~~java
   // 删除用户
   int deleteUser(int id);
   ~~~

   

2. 编写对应的mapper中的sql

   ~~~xml
   <!-- 删除用户 -->
   <delete id="deleteUser" parameterType="int">
       <!-- 执行删除 -->
       delete from mybatis.user where id = #{id}
   </delete>
   ~~~

   

3. 测试

   ~~~java
   @Test
   public void deleteUserTest() {
   
       SqlSession sqlSession = MybatisUtils.getSqlSession();
   
       UserMapper mapper = sqlSession.getMapper(UserMapper.class);
   
       int res = mapper.deleteUser(4);
   
       if (res > 0) {
           System.out.println("删除成功");
       }
   
       sqlSession.commit();
       sqlSession.close();
   }
   ~~~

   

---

##### 注意点

* 增删改需要提交事务
* XML语句中的：
  * id：就是对应的namespace中的方法名
  * resultType：Sql语句执行的返回值。
  * parameterType： 参数类型



---

##### 万能的Map

如果我们实体类或者数据库中的表、字段或者参数过多，我们应当考虑使用Map

我们一般是传的对象，但是由于一些原因，我们只需要修改对象中一小部分字段，这个过程中我们一般会创建一个新对象。比如要修改这个对象中的id，那么创建好了对象其他比如age、address也要赋值，然而这些是无用的。所以我们直接使用Map，写("id",12)这种。就可以减少工作量



UserMapper.java

~~~java
// 万能的Map
int addUser2(Map<String, Object> map);
~~~



UserMapper.xml

~~~xml
<!-- 万能的Map -->
<!-- 传递map的key -->
<insert id="addUser2" parameterType="map">
    <!-- 执行插入 -->
    insert into mybatis.user (id,name,pwd) values(#{userId},#{userName},#{userPwd})
</insert>
~~~



UserMapperTest.java

~~~java
@Test
public void addUser2Test() {
    SqlSession sqlSession = MybatisUtils.getSqlSession();

    UserMapper mapper = sqlSession.getMapper(UserMapper.class);

    Map<String,Object> map = new HashMap<>();

    map.put("userId", 5);
    map.put("userName", "Tom");
    map.put("userPwd", "123456");

    int res = mapper.addUser2(map);

    sqlSession.close();

}
~~~



---

##### 模糊查询

Java代码执行的时候，传递通配符`%`

要么在Java代码层面加

~~~java
List<User> userList = mapper.getUserLike("%王%");
~~~

要么在Mapper中加。更安全，推荐

~~~xml
<select id="getUserLike" resultType="com.joker_yue.pojo.User">
    select * from mybatis.user where name like  "%"#{value}"%"
</select>
~~~



#### 配置解析

---

##### 核心配置文件

* mybatis-config.xml

* MyBatis 的配置文件包含了会深深影响 MyBatis 行为的设置和属性信息。

  ~~~XML
  configuration（配置）
  properties（属性）
  settings（设置）
  typeAliases（类型别名）
  typeHandlers（类型处理器）
  objectFactory（对象工厂）
  plugins（插件）
  environments（环境配置）
  environment（环境变量）
  transactionManager（事务管理器）
  dataSource（数据源）
  databaseIdProvider（数据库厂商标识）
  mappers（映射器）
  ~~~

---

##### 环境配置 environments

* Mybatis可以配置成适应多种环境
* 事务管理器有两种模式：JDBC、MANAGED
* Mybatis的默认：事务管理器：JDBC，连接池：POOLED在·

---

##### 属性properties

我们可以通过properties属性来实现引用配置文件

这些属性可以在外部进行配置，并可以进行动态替换。你既可以在典型的 Java 属性文件中配置这些属性，也可以在 properties 元素（db.properties）的子元素中设置

![image-20230720160202881](./跟随狂神学Java-32.assets/image-20230720160202881.png)

编写一个配置文件

~~~properties
driver=com.mysql.jdbc.Driver
url=dbc:mysql://localhost:3306/mybatis?useSSL=true&useUnicode=true&characterEncoding=UTF-8
username=root
password=root
~~~

在核心配置文件中引入

~~~xml
<!-- 引入外部配置文件 -->
<properties resource="db.properties">
    <property name="username" value="root"/>
    <property name="password" value="root"/>
</properties>
~~~

* 可以直接引入外部文件
* 可以在其中增加一些配置
* 如果两个文件有同一个字段，优先使用外部文件的

---

##### 类型别名（typeAliases）

类型别名可为 Java 类型设置一个缩写名字。 它仅用于 XML 配置，意在降低冗余的全限定类名书写。例如：

```xml
<typeAliases>
  <typeAlias alias="Author" type="domain.blog.Author"/>
  <typeAlias alias="Blog" type="domain.blog.Blog"/>
  <typeAlias alias="Comment" type="domain.blog.Comment"/>
  <typeAlias alias="Post" type="domain.blog.Post"/>
  <typeAlias alias="Section" type="domain.blog.Section"/>
  <typeAlias alias="Tag" type="domain.blog.Tag"/>
</typeAliases>
```

自定义类型别名有三种方法：

1. 实体类

   在mybatis-config.xml中加入：

   ~~~java
   <!-- 给实体类型起别名 -->
   <typeAliases>
       <typeAlias alias="User" type="com.joker_yue.pojo.User"/>
   </typeAliases>
   ~~~

   ![image-20230720164310196](./跟随狂神学Java-32.assets/image-20230720164310196.png)

2. 指定一个包，其中包下所有类的别名就是这个类的类名，但是首字母小写

   在mybatis-config.xml中加入：

   ~~~xml
   <!-- 给实体类型起别名 -->
   <typeAliases>
       <package name="com.joker_yue.pojo"/>
   </typeAliases>
   ~~~

   ![image-20230720164556061](./跟随狂神学Java-32.assets/image-20230720164556061.png)

3. 通过注解

   在每个需要起别名的实体类上加入注解：

   ~~~java
   @Alias("User")
   ~~~

   ![image-20230720165012100](./跟随狂神学Java-32.assets/image-20230720165012100.png)

Mybatis提供了一些默认的别名

| 别名                      | 映射的类型   |
| :------------------------ | :----------- |
| _byte                     | byte         |
| _char (since 3.5.10)      | char         |
| _character (since 3.5.10) | char         |
| _long                     | long         |
| _short                    | short        |
| _int                      | int          |
| _integer                  | int          |
| _double                   | double       |
| _float                    | float        |
| _boolean                  | boolean      |
| string                    | String       |
| byte                      | Byte         |
| char (since 3.5.10)       | Character    |
| character (since 3.5.10)  | Character    |
| long                      | Long         |
| short                     | Short        |
| int                       | Integer      |
| integer                   | Integer      |
| double                    | Double       |
| float                     | Float        |
| boolean                   | Boolean      |
| date                      | Date         |
| decimal                   | BigDecimal   |
| bigdecimal                | BigDecimal   |
| biginteger                | BigInteger   |
| object                    | Object       |
| date[]                    | Date[]       |
| decimal[]                 | BigDecimal[] |
| bigdecimal[]              | BigDecimal[] |
| biginteger[]              | BigInteger[] |
| object[]                  | Object[]     |
| map                       | Map          |
| hashmap                   | HashMap      |
| list                      | List         |
| arraylist                 | ArrayList    |
| collection                | Collection   |
| iterator                  | Iterator     |

---

##### 设置

这是 MyBatis 中极为重要的调整设置，它们会改变 MyBatis 的运行时行为。 下表描述了设置中各项设置的含义、默认值等。

| 设置名                   | 描述                                                         | 有效值                                                       | 默认值 |
| :----------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----- |
| cacheEnabled             | 全局性地开启或关闭所有映射器配置文件中已配置的任何缓存。     | true \| false                                                | true   |
| lazyLoadingEnabled       | 延迟加载的全局开关。当开启时，所有关联对象都会延迟加载。 特定关联关系中可通过设置 `fetchType` 属性来覆盖该项的开关状态。 | true \| false                                                | false  |
| useGeneratedKeys         | 允许 JDBC 支持自动生成主键，需要数据库驱动支持。如果设置为 true，将强制使用自动生成主键。尽管一些数据库驱动不支持此特性，但仍可正常工作（如 Derby）。 | true \| false                                                | False  |
| mapUnderscoreToCamelCase | 是否开启驼峰命名自动映射，即从经典数据库列名 A_COLUMN 映射到经典 Java 属性名 aColumn。 | true \| false                                                | False  |
| logImpl                  | 指定 MyBatis 所用日志的具体实现，未指定时将自动查找。        | SLF4J \| LOG4J（3.5.9 起废弃） \| LOG4J2 \| JDK_LOGGING \| COMMONS_LOGGING \| STDOUT_LOGGING \| NO_LOGGING | 未设置 |

---

##### 其他配置

* typeHandlers 类型处理器
* objectFactory 对象工厂
* plugins插件
  * MyBatis Generator Core
  * MyBatis Plus
  * 通用mapper

---

##### 映射器

MapperRegistry：注册绑定我们的Mapper文件

方式一【推荐使用】：xml注册，绑定到com.joker_yue.dao.UserMapper.xml

~~~xml
<!-- 每一个Mapper.xml都需要在Mybatis核心配置文件中注册 -->
<mappers>
    <mapper resource="com/joker_yue/dao/UserMapper.xml"/>
</mappers>
~~~

方式二：类注册，绑定到com.joker_yue.dao.UserMapper.java

~~~xml
<!-- 每一个Mapper.xml都需要在Mybatis核心配置文件中注册 -->
<mappers>
    <!-- <mapper resource="com/joker_yue/dao/UserMapper.xml"/> -->
    <mapper class="com.joker_yue.dao.UserMapper"/>
</mappers>
~~~

* 接口和其Mapper文件必须同名
* 接口和其Mapper文件必须在同一个包下

方式三：包注册，绑定到com.joker_yue.dao

~~~xml
<!-- 每一个Mapper.xml都需要在Mybatis核心配置文件中注册 -->
<mappers>
    <!-- <mapper resource="com/joker_yue/dao/UserMapper.xml"/> -->
    <!-- <mapper class="com.joker_yue.dao.UserMapper"/> -->
    <package name="com.joker_yue.dao"/>
</mappers>
~~~

* 接口和其Mapper文件必须同名
* 接口和其Mapper文件必须在同一个包下

---

##### 生命周期和作用域

生命周期和作用域是至关重要的，因为错误的使用会导致非常严重的**并发问题**

![image-20230720172113387](./跟随狂神学Java-32.assets/image-20230720172113387.png)

**SqlSessionFactoryBuilder：**（施工队）

* 它就是用来创建SqlSessionFactory的。一旦创建了SqlSessionFactory，它就没有用了
* 局部变量就够

**SqlSessionFactory：**（工厂）

* 可以理解为数据库连接池
* 一旦被创建，运行期间应当一直存在
* 应当为全局变量或者静态全局变量

**SqlSession:**（商品，请将其想象成烟花）

* 连接到连接池的一个请求
* 用完之后即使关闭，否则资源浪费
* 它的示例不是线程安全的，因此不能被共享
* 最佳作用域是将其放在一个方法中

![image-20230720172804940](./跟随狂神学Java-32.assets/image-20230720172804940.png)

这里面的每一个Mapper代表一个具体的业务



#### 解决属性名和字段名不一致的问题

---

复现：

* 数据库中的字段![image-20230720185120820](./跟随狂神学Java-32.assets/image-20230720185120820.png)

* 实体类字段不一致

  ~~~java
  public class User {
      private int id;
      private String name;
      private String password;
  }
  ~~~

* 测试出现问题

  ![image-20230720185938357](./跟随狂神学Java-32.assets/image-20230720185938357.png)

原因：

  ~~~java
  // select * from mybatis.user where id = #{id}
  // 类型处理器
  // select id,name,pwd from mybatis.user where id = #{id}
  ~~~

* 上述sql语句等同于下面的那句



解决方法：

1. 起别名

   ~~~sql
   select id,name,pwd as password from mybatis.user where id = #{id}
   ~~~

   ![image-20230720190713112](./跟随狂神学Java-32.assets/image-20230720190713112.png)

2. ReslutMap

   在原来的select标签中选择要绑定的结果集映射，并在UserMapper.xml中对该结果集映射进行配置

   ~~~xml
   <!-- 结果集映射 -->
   <resultMap id="UserMap" type="User">
       <!-- column为数据库中的字段 property为实体类中的属性，下方这句是将数据库中的字段映射到实体类 -->
       <result column="id" property="id"/>
       <result column="name" property="name"/>
       <result column="pwd" property="password"/>
   </resultMap>
   ~~~

   ![image-20230720192032537](./跟随狂神学Java-32.assets/image-20230720192032537.png)
   
   * `<resultMap>`：这是 MyBatis 中用来定义结果集映射的元素。它可以让你从 JDBC 的 ResultSets 数据提取代码中解放出来，并允许你进行一些 JDBC 不支持的操作。通过定义 `<resultMap>`，你可以将数据库中的列映射到实体类的属性上，从而实现将查询结果映射到 Java 对象的功能。
   * `id`：这是 `<resultMap>` 元素的唯一标识符，用于在代码中引用和执行这个结果映射。在这个示例中，`id` 的值是 "UserMap"，表示这个结果映射的唯一标识符是 "UserMap"。
   * `type`：这是 `<resultMap>` 元素的属性，用于指定映射的目标类型。在这个示例中，`type` 的值是 "User"，表示这个结果映射将被应用到类型为 "User" 的对象上。
   * `<result>`：这是 `<resultMap>` 元素的子元素，用于定义列到属性的映射关系。在这个示例中，有三个 `<result>` 元素，分别将数据库中的 "id"、"name" 和 "pwd" 列映射到实体类的 "id"、"name" 和 "password" 属性上。



---

##### ResultMap

结果集映射

分析

* 我们原来的数据库与实体类中有映射冲突

  ~~~text
  id name pwd
  id name password
  ~~~

介绍

* `resultMap` 元素是 MyBatis 中最重要最强大的元素。
* 在为一些比如连接的复杂语句编写映射代码的时候，一份 `resultMap` 能够代替实现同等功能的数千行代码。ResultMap 的设计思想是，对简单的语句做到零配置，对于复杂一点的语句，只需要描述语句之间的关系就行了。

注意

* 在引用它的语句中设置 `resultMap` 属性就行了（注意我们去掉了 `resultType` 属性）。比如:

  ```xml
  <select id="selectUsers" resultMap="userResultMap">
    select user_id, user_name, hashed_password
    from some_table
    where id = #{id}
  </select>
  ```

* 你可以只写不同的地方，像这样

  ~~~xml
  
  <!-- 结果集映射 -->
  <resultMap id="UserMap" type="User">
      <!-- column为数据库中的字段 property为实体类中的属性，下方这句是将数据库中的字段映射到实体类 -->
      <!-- <result column="id" property="id"/> -->
      <!-- <result column="name" property="name"/> -->
      <result column="pwd" property="password"/>
  </resultMap>
  
  ~~~

  

#### 日志

---

##### 日志工厂

如果一个数据库操作出现了异常，我们需要排错，日志就是最好的助手

| 设置名  | 描述                                                  | 有效值                                                       | 默认值 |
| ------- | ----------------------------------------------------- | ------------------------------------------------------------ | ------ |
| logImpl | 指定 MyBatis 所用日志的具体实现，未指定时将自动查找。 | SLF4J \| LOG4J（3.5.9 起废弃） \| LOG4J2 \| JDK_LOGGING \| COMMONS_LOGGING \| STDOUT_LOGGING \| NO_LOGGING | 未设置 |

在Mybatis中具体使用哪一个日志实现，在设置中设定

**STDOUT_LOGGING **标准日志输出

在mybatis核心配置文件中进行配置

~~~xml
<settings>
    <setting name="logImpl" value="STDOUT_LOGGING"/>
</settings>
~~~



![image-20230720210524413](./跟随狂神学Java-32.assets/image-20230720210524413.png)

---

##### Log4j

什么是Log4j

* Log4j是[Apache](https://baike.baidu.com/item/Apache/8512995?fromModule=lemma_inlink)的一个[开源项目](https://baike.baidu.com/item/开源项目/3406069?fromModule=lemma_inlink)，通过使用Log4j，我们可以控制日志信息输送的目的地是[控制台](https://baike.baidu.com/item/控制台/2438626?fromModule=lemma_inlink)、文件、GUI组件，甚至是[套接口](https://baike.baidu.com/item/套接口/10058888?fromModule=lemma_inlink)服务器、NT的事件记录器、[UNIX](https://baike.baidu.com/item/UNIX/0?fromModule=lemma_inlink) [Syslog](https://baike.baidu.com/item/Syslog/0?fromModule=lemma_inlink)[守护进程](https://baike.baidu.com/item/守护进程/966835?fromModule=lemma_inlink)等
* 我们也可以控制每一条日志的输出格式
* 通过定义每一条日志信息的级别，我们能够更加细致地控制日志的生成过程
* 这些可以通过一个配置文件来灵活地进行配置，而不需要修改应用的代码

步骤

1. 先导包-maven

   ~~~XML
   <!-- https://mvnrepository.com/artifact/log4j/log4j -->
   <dependency>
       <groupId>log4j</groupId>
       <artifactId>log4j</artifactId>
       <version>1.2.17</version>
   </dependency>
   ~~~

2. log4j.properties

   ~~~properties
   #将等级为DEBUG的日志信息输出到console和file这两个目的地，console和file的定义在下面的代码
   log4j.rootLogger=DEBUG,console,file
   
   #控制台输出的相关设置
   log4j.appender.console = org.apache.log4j.ConsoleAppender
   log4j.appender.console.Target = System.out
   log4j.appender.console.Threshold=DEBUG
   log4j.appender.console.layout = org.apache.log4j.PatternLayout
   log4j.appender.console.layout.ConversionPattern=[%c]-%m%n
   
   #文件输出的相关设置
   log4j.appender.file = org.apache.log4j.RollingFileAppender
   log4j.appender.file.File=./log/joker_yue.log
   log4j.appender.file.MaxFileSize=10mb
   log4j.appender.file.Threshold=DEBUG
   log4j.appender.file.layout=org.apache.log4j.PatternLayout
   log4j.appender.file.layout.ConversionPattern=[%p][%d{yy-MM-dd}][%c]%m%n
   
   #日志输出级别
   log4j.logger.org.mybatis=DEBUG
   log4j.logger.java.sql=DEBUG
   log4j.logger.java.sql.Statement=DEBUG
   log4j.logger.java.sql.ResultSet=DEBUG
   log4j.logger.java.sql.PreparedStatement=DEBUG
   ~~~

3. 配置log4j为日志的实现

   ~~~xml
   <settings>
       <setting name="logImpl" value="LOG4J"/>
   </settings>
   ~~~

4. log4j的使用，直接测试运行刚才的查询

   ![image-20230721111850888](./跟随狂神学Java-32.assets/image-20230721111850888.png)



简单使用

1. 在要使用Log4j的类中，注意导包是`import org.apache.log4j.Logger;`

2. 日志对象，参数为当前类的class

   ~~~java
   static Logger logger = Logger.getLogger(UserMapperTest.class);
   ~~~

3. 日志级别

   ~~~java
   logger.info("info:进入testLog4j");
   logger.debug("debug:进入testLog4j");
   logger.error("error:进入testLog4j");
   ~~~



#### 分页

---

思考：为什么要分页

* 减少数据的处理量

使用limit分页

~~~sql
select * from mybatis.user limit startIndex,pageSize; -- 从startIndex开始查，查pageSize个
select * from mybatis.user limit 3; -- 从0开始查到3
~~~

使用Mybatis实现分页，核心SQL

1. 接口

   ~~~xml
   // 分页
   List<User> getUserByLimit(Map<String, Integer> map);
   ~~~

2. Mapper.xml

   ~~~xml
   <!-- 分页 -->
   <select id="getUserByLimit" resultMap="UserMap" parameterType="map">
       <!--  执行查询    -->
       select * from mybatis.user limit #{startIndex},#{pageSize}
   </select>
   ~~~

   

3. 测试

   ~~~java
   
       @Test
       public void getUserByLimitTest() {
           SqlSession sqlSession = MybatisUtils.getSqlSession();
   
           UserMapper mapper = sqlSession.getMapper(UserMapper.class);
   
   
           HashMap<String, Integer> map = new HashMap<>();
           map.put("startIndex", 0);
           map.put("pageSize", 3);
   
           List<User> userList = mapper.getUserByLimit(map);
   
           for (User user : userList) {
               System.out.println(user);
           }
   
           sqlSession.close();
       }
   ~~~

---

##### RowBounds类 分页

不建议使用。不再使用Sql实现分页

1. 接口

   ~~~java
   // Limit By RowBounds
   List<User> getUserByLimitByRowBounds();
   ~~~

2. mapper.xml

   ~~~xml
   <select id="getUserByLimitByRowBounds" resultMap="UserMap">
       select * from mybatis.user
   </select>
   ~~~

3. 测试

   ~~~java
   @Test
   public void getUserByLimitByRowBoundsTest() {
       SqlSession sqlSession = MybatisUtils.getSqlSession();
   
       //RowBounds实现
       RowBounds rowBounds = new RowBounds(1,2);
   
   
   
       // 通过Java代码层面实现分页
       List<User> userList = sqlSession.selectList("com.joker_yue.dao.UserMapper", rowBounds);
   
       for (User user : userList) {
           System.out.println(user);
       }
   
   
       sqlSession.close();
   }
   ~~~

---

##### 分页插件

MyBatis 分页插件 PageHelper，了解即可

![image-20230721152419654](./跟随狂神学Java-32.assets/image-20230721152419654.png)





#### 使用注解开发

---

官方文档：

* 对于像 BlogMapper 这样的映射器类来说，还有另一种方法来完成语句映射。 它们映射的语句可以不用 XML 来配置，而可以使用 Java 注解来配置。比如，上面的 XML 示例可以被替换成如下的配置：

  ~~~java
  package org.mybatis.example;
  public interface BlogMapper {
    @Select("SELECT * FROM blog WHERE id = #{id}")
    Blog selectBlog(int id);
  }
  ~~~

* 使用注解来映射简单语句会使代码显得更加简洁，但对于稍微复杂一点的语句，Java 注解不仅力不从心，还会让本就复杂的 SQL 语句更加混乱不堪。 因此，如果你需要做一些很复杂的操作，最好用 XML 来映射语句。

* 选择何种方式来配置映射，以及是否应该要统一映射语句定义的形式，完全取决于你和你的团队。 换句话说，永远不要拘泥于一种方式，你可以很轻松地在基于注解和 XML 的语句映射方式间自由移植和切换。



操作：

* 注解直接在接口上实现

  ~~~java
  @Select("select * from user")
  List<User> getUser();
  ~~~

* 需要在核心配置文件中绑定接口

  ~~~xml
  
  <!--   绑定接口   -->
  <mappers>
      <mapper class="com.joker_yue.dao.UserMapper"/>
  </mappers>
  
  ~~~

* 测试

  ~~~java
  @Test
  public void test(){
      SqlSession sqlSession = MybatisUtils.getSqlSession();
      UserMapper mapper = sqlSession.getMapper(UserMapper.class);
      List<User> users = mapper.getUser();
      for (User user : users) {
          System.out.println(user);
      }
      sqlSession.close();
  }
  ~~~



---

##### Mybatis详细的执行流程

分析：

* 本质：反射机制实现

* 底层：动态代理

  ![image-20230721160808077](./跟随狂神学Java-32.assets/image-20230721160808077.png)



----

##### CRUD

我们可以在工具类创建的时候实现在动提交事务



步骤：

* MybatisUtil.java

  ~~~java
  public static SqlSession getSqlSession() {
      return sqlSessionFactory.openSession(true); // true 表示自动提交事务
  }
  ~~~

* 编写接口，增加注解。UserMapper.java

  ~~~java
  package com.joker_yue.dao;
  
  import com.joker_yue.pojo.User;
  import org.apache.ibatis.annotations.*;
  
  import java.util.List;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/19 20:05
   */
  public interface UserMapper {
  
      @Select("select * from user")
      List<User> getUser();
  
      // 当你想用注解实现方法的时候，刚好方法需要传参
      // 方法存在多个参数，所有的参数前必须加上@Param注解
      @Select("select * from user where id = #{id}")
      User getUserById(@Param("id") int id);
  
      @Insert("insert into user(id,name,pwd) values(#{id},#{name},#{password})")
      int addUser(User user);
  
      @Update("update user set name=#{name},pwd=#{password} where id=#{id}")
      int updateUser(User user);
  
      @Delete("delete from user where id=#{id}")
      int deleteUser(@Param("id") int id);
  
  }
  ~~~

* 测试类UserMapperTest.java

  ~~~java
  package com.joker_yue.dao;
  
  import com.joker_yue.pojo.User;
  import com.joker_yue.utils.MybatisUtils;
  import org.apache.ibatis.session.SqlSession;
  import org.junit.Test;
  
  import java.util.List;
  
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/7/19 20:22
   */
  public class UserMapperTest {
      @Test
      public void test() {
          SqlSession sqlSession = MybatisUtils.getSqlSession();
          UserMapper mapper = sqlSession.getMapper(UserMapper.class);
  
  
          /* List<User> users = mapper.getUser();
          for (User user : users) {
              System.out.println(user);
          } */
  
         /* User user = mapper.getUserById(1);
          System.out.println(user); */
  
          /* int i = mapper.addUser(new User(5, "jack", "123"));
  
          if(i>0){
              System.out.println("添加成功");
          } */
  
          /* int i = mapper.updateUser(new User(5, "jack", "123456"));
          if(i>0){
              System.out.println("修改成功");
          } */
  
          int i = mapper.deleteUser(5);
          if(i>0){
              System.out.println("删除成功");
          }
  
  
          sqlSession.close();
      }
  }
  ~~~



注意：

* 必须要将接口注册绑定到核心配置文件中



---

##### 关于@Param()注解

* 基本类型的参数或者String类型，需要加上
* 引用类型不需要加
* 如果只有一个基本类型，可以忽略，但是建议都加上
* 在sql中引用的就是@Param() 中设定的属性名





#### Lombok

---

**不推荐使用**

介绍：

* Lombok是一个Java库，能自动插入编辑器并构建工具，简化Java开发。通过添加注解的方式，不需要为类编写getter或equals等方法

安装步骤

* 安装idea的lombok插件

* 在maven中导入依赖

  ~~~xml
  <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <version>1.18.24</version>
  </dependency>
  ~~~

* 可使用的注解

  ~~~java
  @Getter and @Setter
  @FieldNameConstants
  @ToString
  @EqualsAndHashCode
  @AllArgsConstructor, @RequiredArgsConstructor and @NoArgsConstructor
  @Log, @Log4j, @Log4j2, @Slf4j, @XSlf4j, @CommonsLog, @JBossLog, @Flogger, @CustomLog
  @Data
  @Builder
  @SuperBuilder
  @Singular
  @Delegate
  @Value
  @Accessors
  @Wither
  @With
  @SneakyThrows
  @StandardException
  @val
  @var
  @UtilityClass
  ~~~

* 使用效果

  * @Data：getter、setter、toString等![image-20230721165428643](./跟随狂神学Java-32.assets/image-20230721165428643.png)![image-20230721165444073](./跟随狂神学Java-32.assets/image-20230721165444073.png)

  * @NoArgsConstructor @AllArgsConstructor：构造方法

    ![image-20230721165833551](./跟随狂神学Java-32.assets/image-20230721165833551.png)![image-20230721165855273](./跟随狂神学Java-32.assets/image-20230721165855273.png)



#### 多对一处理

---

测试环境搭建

1. 导入lomlock
2. 新建实体类Teacher，Student
3. 新建Mapper接口
4. 建立Mapper.xml
5. 在核心配置文件中绑定注册Mapper接口或文件
6. 测试查询是否能够成功



---

##### 按照查询嵌套处理

~~~xml
  <!--
        思路：
            1. 查询所有的学生信息
            2. 根据查询出来的学生的tid，寻找对应的老师的信息
     -->
    <select id="getStudent" resultMap="StudentTeacher">
        select * from student
    </select>

    <resultMap id="StudentTeacher" type="Student">
        <result property="id" column="id"/>
        <result property="name" column="name"/>
        <!--
        复杂的属性我们需要单独处理
        对象：association
        集合：collection
           -->
        <!-- 在pojo中，Student有一个Teacher对象。，这个我们没办法用普通的数据对象描述出来，所以我们可以这样： -->
        <!-- property：同上；  column：同上;    javaType：定义其Java类型  select：定义如何获得这个Java对象 -->
        <!-- 类似于sql中的子查询 -->
        <association property="teacher" column="tid" javaType="Teacher" select="getTeacher"/>

    </resultMap>


    <select id="getTeacher" resultType="Teacher">
        select * from teacher where id = #{id}
    </select>
~~~

~~~java

    @Test
    public void studentTeacherTest(){
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        
        StudentMapper studentMapper = sqlSession.getMapper(StudentMapper.class);
        List<Student> studentList = studentMapper.getStudent();

        for (Student student : studentList) {
            System.out.println(student);
        }


        sqlSession.close();
    }
~~~

---

##### 按照结果嵌套处理

~~~xml
<!--  按照结果嵌套处理    -->
<!-- 解释下面的Sql：
      作用为：通过学生s和老师t查出 所有的 老师是t的学生
      方式为：将传入t中的 id进行查找，如果匹配就找到一条记录
      查找内容：符合条件的学生的id，符合条件的学生的name，符合条件的老师的name
 -->
<!--
 select s.id sid,s.name sname,t.name tnam
 其中 sid,sname,tname 为实体类Student.id,Student.name,Teacher.name 对应的属性
 -->
<select id="getStudent2" resultMap="StudentTeacher2">
    select s.id sid,s.name sname,t.name tname
    from student s,teacher t
    where s.tid = t.id;
</select>

<!-- 返回的结果集中包含以下内容：
        id,name,teacher.name
 -->
<resultMap id="StudentTeacher2" type="Student">
    <result property="id" column="sid"/>
    <result property="name" column="sname"/>
    <!-- 这里做了匹配
            实体类Teacher中的name对应到表中列tname
    -->
    <association property="teacher" javaType="Teacher">
        <result property="name" column="tname"/>
    </association>
</resultMap>
~~~



回顾Mysql多对一查询方式：

* 子查询
* 联表查询





#### 一对多

---

比如：一个老师拥有多个学生

对于老师而言，就是一对多的关系

1.  环境搭建，和刚才一样

   实体类

   ~~~java
   package com.joker_yue.pojo;
   
   import lombok.Data;
   
   import java.util.List;
   
   /**
    * @author Joker
    * @version 1.0
    * @date 2023/7/21 19:00
    */
   @Data
   public class Teacher {
       private int id;
       private String name;
   
       // 老师需要关联多个学生
       private List<Student> students;
   
   }
   ~~~

   ~~~java
   sxxxxxxxxxx19 1package com.joker_yue.pojo;23import lombok.Data;45/**6 * @author Joker7 * @version 1.08 * @date 2023/7/21 18:599 */1011@Data12public class Student {13    private int id;14    private String name;15    // 学生需要关联一个老师16    private int tid;1718}19java
   ~~~

2. 两种方式查询

   * 按照结果嵌套
   * 按照查询嵌套



---

##### 按照结果嵌套处理

* TeacherMapper.xml

  ~~~xml
  <!-- 按结果嵌套查询 -->
  <select id="getTeacher" resultMap="TeacherStudent">
      select s.id sid, s.name sname, t.name tname, t.id tid
      from student s,
      teacher t
      where s.tid = t.id and t.id = #{tid}
  </select>
  
  <resultMap id="TeacherStudent" type="Teacher">
      <result property="id" column="tid"/>
      <result property="name" column="tname"/>
      <!-- javatype是一个指定的属性类型 -->
      <!-- oftype 集合中的泛型信息 -->
      <collection property="students" ofType="Student">
          <result property="id" column="sid"/>
          <result property="name" column="sname"/>
          <result property="tid" column="tid"/>
      </collection>
  </resultMap>
  ~~~

* 测试

  ~~~java
  @Test
  public void testGetTeacher() {
      SqlSession sqlSession = MybatisUtils.getSqlSession();
      TeacherMapper mapper = sqlSession.getMapper(TeacherMapper.class);
      Teacher teacher = mapper.getTeacher(1);
      System.out.println(teacher);
      sqlSession.close();
  }
  ~~~

  

---

##### 按照查询嵌套处理

* TeacherMapper.xml

  ~~~xml
  <!-- 子查询-->
  
  <!-- 首先根据tid查老师 -->
  <select id="getTeacher2" resultMap="TeacherStudent2">
      select * from mybatis.teacher where id = #{tid}
  </select>
  
  <resultMap id="TeacherStudent2" type="Teacher">
      <collection property="students" javaType="ArrayList" ofType="Student" select="getStudentByTeacherId"
                  column="id"/>
  
  </resultMap>
  
  
  <!-- 然后根据tid查学生 -->
  <select id="getStudentByTeacherId" resultType="Student" >
      select * from mybatis.student where tid = #{tid}
  </select>
  
  ~~~

* 测试

  ~~~java
  @Test
  public void testGetTeacher2() {
      SqlSession sqlSession = MybatisUtils.getSqlSession();
      TeacherMapper mapper = sqlSession.getMapper(TeacherMapper.class);
      Teacher teacher = mapper.getTeacher2(1);
      System.out.println(teacher);
      sqlSession.close();
  }
  ~~~



----

##### 小结

1. 关联-association【多对一】
2. 集合-collection【一对多】
3. javaType & ofType
   1. JavaType：用来指定实体类中属性的类型
   2. ofType：用来指定映射到List或者集合中的pojo类型，泛型中的约束类型

---

##### 注意点

* 保证SQL的可读性，尽量保证通俗易懂

* 注意一对多和多对一中，属性名和字段名的问题

* 如果问题不好排查，可以使用日志，建议log4j

  

---

##### 面试高频

* Mysql引擎
* InnoDB底层原理
* 索引
* 索引优化





#### 动态SQL

---

**==什么是动态SQL：动态SQL就是根据不同的条件生成不同的SQL语句==**

官方描述：

* 如果你之前用过 JSTL 或任何基于类 XML 语言的文本处理器，你对动态 SQL 元素可能会感觉似曾相识。在 MyBatis 之前的版本中，需要花时间了解大量的元素。借助功能强大的基于 OGNL 的表达式，MyBatis 3 替换了之前的大部分元素，大大精简了元素种类，现在要学习的元素种类比原来的一半还要少。
  - if
  - choose (when, otherwise)
  - trim (where, set)
  - foreach

---

##### 搭建环境

* 数据库

   ~~~sql
   CREATE TABLE `blog`(
   `id` VARCHAR(50) NOT NULL COMMENT '博客id',
   `title` VARCHAR(100) NOT NULL COMMENT '博客标题',
   `author` VARCHAR(30) NOT NULL COMMENT '博客作者',
   `create_time` DATETIME NOT NULL COMMENT '创建时间',
   `views` INT(30) NOT NULL COMMENT '浏览量'
   )ENGINE=INNODB DEFAULT CHARSET=utf8
   ~~~

* 创建一个基础工程

   1. 导包

   2. 编写配置文件

   3. 编写实体类

      ~~~java
      @Data
      public class Blog {
          private int id;
          private String title;
          private String author;
          private Date createTime; //使用的包为java.util
          private int views;
      
      }
      ~~~

      

   4. 编写实体类对应Mapper接口和Mapper.xml文件



---

##### IF

背景：你需要在博客中查找一些限定内容，比如查询文章标题，作者等

* BlogMapper.java

  ~~~java
  // 查询博客
  List<Blog> queryBlogIF(Map<String, Object> map);
  ~~~

* BlogMapper.xml

  ~~~xml
  <select id="queryBlogIF" parameterType="map" resultType="blog">
      select * from mybatis.blog where 1=1
      <if test="title != null">
              and title=#{title}
      </if>
      <if test="author != null">
              and author=#{author}
      </if>
  </select>
  ~~~

* Test

  ~~~java
  @Test
  public void queryBlogIFTest(){
      SqlSession sqlSession = MybatisUtils.getSqlSession();
      BlogMapper mapper = sqlSession.getMapper(BlogMapper.class);
  
      HashMap<String, Object> map = new HashMap<String, Object>();
  
      // 在map中没有东西的时候，可以全部查出来
      // map中有东西的时候就按照传递的值查
      // map.put("title", "Spring");
      map.put("author", "狂神说");
  
      List<Blog> blogs = mapper.queryBlogIF(map);
      for (Blog blog : blogs) {
          System.out.println(blog);
      }
      sqlSession.close();
  }
  ~~~

  

----

##### choose ,when ,otherwise

提示：

请将其对应成Jav中的关键字`switch`,`case`,`default`  

代码：

* BlogMapper.java

  ~~~xml
  // 查询博客
  List<Blog> queryBlogChoose(Map<String, Object> map);
  ~~~

* BlogMapper.xml

  ~~~java
  <select id="queryBlogChoose" parameterType="map" resultType="blog">
      select * from mybatis.blog
  <where>
      <choose>
          <when test="title != null">
              title=#{title}
          </when>
          <when test="author != null">
              and author=#{author}
          </when>
          <otherwise>
                  and views = #{views}
          </otherwise>
      </choose>
  </where>
  </select>
  ~~~

* Test

  ~~~java
  @Test
  public void queryBlogChooseTest() {
  
      SqlSession sqlSession = MybatisUtils.getSqlSession();
      BlogMapper mapper = sqlSession.getMapper(BlogMapper.class);
  
      HashMap<String, Object> map = new HashMap<String, Object>();
      // map.put("title", "Spring");
      map.put("author", "狂神说");
      map.put("views", 9999);
  
      List<Blog> blogList = mapper.queryBlogChoose(map);
  
      for (Blog blog : blogList) {
          System.out.println(blog);
      }
  
      sqlSession.close();
  
  }
  ~~~



注意：

* 和Java中switch语句类似，当其中一个条件符合时就会跳出 



----

##### trim（where,set）

###### where

背景：

原来where后面必须写限制条件再写and，比如`select * from mybatis.blog where titile = 'Java' and author = '狂神说'`，有时候用户查询的只输入作者信息，那么可能变成下面的这种：`select * from mybatis.blog where  and author = '狂神说'`。这种sql语法是错误的，where后不能直接跟and。所以我们使用`<where>`限定，来看看官网描述：

官网描述：

* MyBatis 有一个简单且适合大多数场景的解决办法。而在其他场景中，可以对其进行自定义以符合需求。而这，只需要一处简单的改动：

  ```
  <select id="findActiveBlogLike"
       resultType="Blog">
    SELECT * FROM BLOG
    <where>
      <if test="state != null">
           state = #{state}
      </if>
      <if test="title != null">
          AND title like #{title}
      </if>
      <if test="author != null and author.name != null">
          AND author_name like #{author.name}
      </if>
    </where>
  </select>
  ```

  *where* 元素只会在子元素返回任何内容的情况下才插入 “WHERE” 子句。而且，若子句的开头为 “AND” 或 “OR”，*where* 元素也会将它们去除。

理解：

* 在`<where>`标签中，当至少有一个子标签成立，才会插入where子句。当有多个子标签成立时，将会自动添加and

代码：

* BlogMapper.java

  ~~~xml
  // 查询博客
  List<Blog> queryBlogWhere(Map<String, Object> map);
  ~~~

* BlogMapper.xml

  ~~~xml
  <select id="queryBlogWhere" parameterType="map" resultType="blog">
      select * from mybatis.blog
      <where>
          <if test="title != null">
              title=#{title}
          </if>
          <if test="author != null">
              and author=#{author}
          </if>
      </where>
  </select>
  ~~~

* Test

  ~~~java
  @Test
  public void queryBlogWhereTest() {
      SqlSession sqlSession = MybatisUtils.getSqlSession();
      BlogMapper mapper = sqlSession.getMapper(BlogMapper.class);
  
      HashMap<String, Object> map = new HashMap<String, Object>();
  
      // 在map中没有东西的时候，可以全部查出来
      // map中有东西的时候就按照传递的值查
      // map.put("title", "Spring");
      map.put("author", "狂神说");
  
      List<Blog> blogs = mapper.queryBlogWhere(map);
      for (Blog blog : blogs) {
          System.out.println(blog);
      }
      sqlSession.close();
  }
  ~~~

---

###### set

背景：

* 这是一条不正常的sql：

  ~~~sql
  update mybatis.blog set views=#{views},update_time=#{updateTime}, where id=#{id}
  ~~~

  在拼接set后的语句的时候，` views=#{views},`没有问题，但是`update_time=#{updateTime},`就有问题，因为它后面没有需要设置的了，这不符合规范

* 为了避免这种逗号导致的错误，我们可以使用`<set>`

 官方描述：

* ```
  <update id="updateAuthorIfNecessary">
    update Author
      <set>
        <if test="username != null">username=#{username},</if>
        <if test="password != null">password=#{password},</if>
        <if test="email != null">email=#{email},</if>
        <if test="bio != null">bio=#{bio}</if>
      </set>
    where id=#{id}
  </update>
  ```

  这个例子中，*set* 元素会动态地在行首插入 SET 关键字，并会删掉额外的逗号（这些逗号是在使用条件语句给列赋值时引入的）。

代码：

* BlogMapper.java

  ~~~java
  // 更新博客
  int updateBlog(Map<String, Object> map);
  ~~~

* BlogMapper.xml

  ~~~xml
  <update id="updateBlog" parameterType="map">
      update mybatis.blog
      <set>
          <if test="title != null">
              title=#{title},
          </if>
          <if test="author != null">
              author=#{author}
          </if>
      </set>
      where id=#{id}
  </update>
  ~~~

* Test

  ~~~java
  @Test
  public void updateBlogTest() {
      SqlSession sqlSession = MybatisUtils.getSqlSession();
      BlogMapper mapper = sqlSession.getMapper(BlogMapper.class);
  
      Map<String, Object> map = new HashMap<String, Object>();
      map.put("id", "359752a53b664adb9b649c409188b7b2");
      map.put("title", "Java如此简单");
      map.put("author", "狂神说2");
  
      mapper.updateBlog(map);
  
      sqlSession.close();
  }
  ~~~

---

###### trim（了解即可）

trim就是加前缀或后缀，覆盖动态sql的前缀或后缀

where有条件满足才加前缀where，并去掉动态sql开头的and或or

* 和 *where* 元素等价的自定义 trim 元素为：

  ```xml
  <trim prefix="WHERE" prefixOverrides="AND |OR ">
    ...
  </trim>
  ```

* 和*set*元素等价的自定义trim元素为：

  ```xml
  <trim prefix="SET" suffixOverrides=",">
    ...
  </trim>
  ```



---

##### SQL片段

有些时候，我们可能会将一些公共的部分抽取出来，方便复用

代码：

* 原来的BlogMapper.xml中有如下片段：

  ~~~xml
  <select id="queryBlogWhere" parameterType="map" resultType="blog">
      select * from mybatis.blog
      <where>
          <if test="title != null">
              title=#{title}
          </if>
          <if test="author != null">
              and author=#{author}
          </if>
      </where>
  </select>
  ~~~

* 我们可以将其中的片段抽取出来，便成了现在这样

  ~~~xml
  <sql id="if-title-author">
      <if test="title != null">
          title=#{title}
      </if>
      <if test="author != null">
          and author=#{author}
      </if>
  </sql>
  
  
  <select id="queryBlogWhere" parameterType="map" resultType="blog">
      select * from mybatis.blog
      <where>
          <include refid="if-title-author"/>
      </where>
  </select>
  ~~~

* 其中被抽取的部分应使用`<sql>`标签包围，并给它起个id以便于引用

  引用部分应使用`<include>`标签包围，并在refid中填写要引用的SQL片段的id

* 注意：

  最好基于单表来定义SQL片段

  不要存在`<where>`标签

==**所谓的动态SQL，本质还是SQL，只是我们可以在SQL层面，去执行一些逻辑代码**==

---

##### Foreach

背景：查询id前三个

* sql：

  ~~~sql
  select * from user where (id=1 or id =2 or id =3)
  ~~~

* 需求：

  现在每次查询的参数都不确定，如何实现



官方解释：

* 动态 SQL 的另一个常见使用场景是对集合进行遍历（尤其是在构建 IN 条件语句的时候）。比如：

  ```
  <select id="selectPostIn" resultType="domain.blog.Post">
    SELECT *
    FROM POST P
    <where>
      <foreach item="item" index="index" collection="list"
          open="ID in (" separator="," close=")" nullable="true">
            #{item}
      </foreach>
    </where>
  </select>
  ```

  *foreach* 元素的功能非常强大，它允许你指定一个集合，声明可以在元素体内使用的集合项（item）和索引（index）变量。它也允许你指定开头与结尾的字符串以及集合项迭代之间的分隔符。这个元素也不会错误地添加多余的分隔符，看它多智能！

  **提示** 你可以将任何可迭代对象（如 List、Set 等）、Map 对象或者数组对象作为集合参数传递给 *foreach*。当使用可迭代对象或者数组时，index 是当前迭代的序号，item 的值是本次迭代获取到的元素。当使用 Map 对象（或者 Map.Entry 对象的集合）时，index 是键，item 是值。

  至此，我们已经完成了与 XML 配置及映射文件相关的讨论。下一章将详细探讨 Java API，以便你能充分利用已经创建的映射配置。



代码：

* BlogMapper.java

  ~~~java
  // 查询第1-2-3号记录的博客
  List<Blog> queryBlogForeach(Map<String, Object> map);
  ~~~

* BlogMapper.xml

  ~~~xml
  <!--
   select * from user where (id=1 or id =2 or id =3)
   我们现在传递一个万能的Map，这map中可以存在一个集合
   -->
  <select id="queryBlogForeach" parameterType="map" resultType="blog">
      select * from mybatis.blog
      <where>
          <!-- 从ids集合中遍历，遍历的元素为id，以"and ("开头，以")"结尾  -->
          <foreach collection="ids" item="id" open="(" close=")" separator="or">
              id=#{id}
          </foreach>
      </where>
  </select>
  ~~~

* Test

  ~~~java
  @Test
  public void queryBlogForeachTest(){
      SqlSession sqlSession = MybatisUtils.getSqlSession();
      BlogMapper mapper = sqlSession.getMapper(BlogMapper.class);
  
      Map<String, Object> map = new HashMap<String, Object>();
  
      // 将ids集合放在map集合中
      List<Integer> ids = new ArrayList<Integer>();
      ids.add(1);
      ids.add(2);
      ids.add(3);
      map.put("ids", ids);
  
      List<Blog> blogList = mapper.queryBlogForeach(map);
  
      for (Blog blog : blogList) {
          System.out.println(blog);
      }
  
      sqlSession.close();
  }
  ~~~



---

##### 总结

**==动态SQL就是在拼接SQL语句，我们只需要保证SQL的正确性，按照SQL的格式，去排列组合就可以了==**

建议：

* 先在Mysql中写出完整的SQL，再对应的修改成为动态sql，实现通用即可





#### 缓存

---

##### 简介

1. 什么是缓存【Cache】
   * 存在内存中的临时数据
   * 将用户经常查询的数据存放在缓存【内存】中，用户去查询数据就不用从磁盘上（关系型数据库数据文件）查询，从缓存中查询，从而提高查询效率，解决了高并发系统的性能问题
2. 为什么使用缓存
   * 减少和数据库的交互次数，减少系统开销，提高系统效率
3. 什么样的数据能使用缓存
   * 经常查询并且不经常改变的数据

---

##### Mybatis缓存

* Mybatis包含一个非常强大的查询缓存特性，它可以非常方便的定制和配置缓存，缓存可以极大的提升查询效率

* Mybatis系统中默认了两级缓存：**一级缓存**和**二级缓存**

  * 默认情况下，只有一级缓存开启，（SqlSession级别的缓存，也称为本地缓存）
  * 二级缓存需要手动开启和配置，它是基于namespace级别的缓存
  * 为了提高扩展性，Mybatis定义了缓存接口Cache，我们可以通过Cache接口来自定义二级缓存

* 缓存清除策略

  可用的清除策略有：

  - `LRU` – 最近最少使用：移除最长时间不被使用的对象。
  - `FIFO` – 先进先出：按对象进入缓存的顺序来移除它们。
  - `SOFT` – 软引用：基于垃圾回收器状态和软引用规则移除对象。
  - `WEAK` – 弱引用：更积极地基于垃圾收集器状态和弱引用规则移除对象。

  默认的清除策略是 LRU。

---

##### 一级缓存

1. 开启日志

2. 测试在一个Session中查询两次记录

3. 代码

   * User.java

     ~~~java
     package com.joker_yue.pojo;
     
     import lombok.Data;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/7/23 16:12
      */
     @Data
     public class User {
         private int id;
         private String name;
         private String pwd;
     }
     ~~~

   * UserMapper.java

     ~~~java
     package com.joker_yue.dao;
     
     import com.joker_yue.pojo.User;
     import org.apache.ibatis.annotations.Param;
     
     import java.util.List;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/7/23 16:15
      */
     public interface UserMapper {
     
         // 查询用户
         User queryUserById(@Param("id") int id);
     
     }
     ~~~

   * UserMapper.xml

     ~~~xml
     <?xml version="1.0" encoding="UTF-8" ?>
     <!DOCTYPE mapper
             PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
             "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
     <!-- 核心配置文件 -->
     <mapper namespace="com.joker_yue.dao.UserMapper">
     
         <select id="queryUserById" resultType="User">
             select * from user where id = #{id}
         </select>
     
     </mapper>
     ~~~

   * MyTest.java

     ~~~java
     import com.joker_yue.dao.UserMapper;
     import com.joker_yue.pojo.User;
     import com.joker_yue.utils.utils.MybatisUtils;
     import org.apache.ibatis.session.SqlSession;
     import org.junit.Test;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/7/23 16:22
      */
     public class MyTest {
         @Test
         public void readUserByIdTest() {
             SqlSession sqlSession = MybatisUtils.getSqlSession();
             UserMapper mapper = sqlSession.getMapper(UserMapper.class);
     
             User user = mapper.queryUserById(1);
             User user2 = mapper.queryUserById(1);
     
             System.out.println(user);
             System.out.println("================");
             System.out.println(user2);
             System.out.println(user==user2);    //结果为true，说明两个对象是同一个地址
     
             sqlSession.close();
     
         }
     
     }
     ~~~

4. 测试结果

   两个对象相等，说明两个对象在内存中为同一位置

   ![image-20230723163427995](./跟随狂神学Java-32.assets/image-20230723163427995.png)

----

##### 一级缓存失效的情况

官方说明：

* 这个简单语句的效果如下:

  - 映射语句文件中的所有 select 语句的结果将会被缓存。
  - 映射语句文件中的所有 insert、update 和 delete 语句会刷新缓存。
  - 缓存会使用最近最少使用算法（LRU, Least Recently Used）算法来清除不需要的缓存。
  - 缓存不会定时进行刷新（也就是说，没有刷新间隔）。
  - 缓存会保存列表或对象（无论查询方法返回哪种）的 1024 个引用。
  - 缓存会被视为读/写缓存，这意味着获取到的对象并不是共享的，可以安全地被调用者修改，而不干扰其他调用者或线程所做的潜在修改。

  **提示** 缓存只作用于 cache 标签所在的映射文件中的语句。如果你混合使用 Java API 和 XML 映射文件，在共用接口中的语句将不会被默认缓存。你需要使用 @CacheNamespaceRef 注解指定缓存作用域。



测试：

* 代码：

  * UserMapper.java

    ~~~java
    // 修改用户
    int updateUser(User user);
    ~~~

  * UserMapper.xml

    ~~~xml
    <update id="updateUser" parameterType="User">
        update user set name = #{name}, pwd = #{pwd} where id = #{id}
    </update>
    ~~~

  * Test

    ~~~java
    @Test
    public void updateUserTest() {
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
    
        User user = mapper.queryUserById(1);
        System.out.println(user);
        System.out.println("================");
    
        mapper.updateUser(new User(2, "joker", "123333"));
    
        User user2 = mapper.queryUserById(1);
    
        System.out.println(user2);
        System.out.println(user == user2);
    
        sqlSession.close();
    
    }
    ~~~

* 结果：

  false，说明两个对象的地址不一样

  ![image-20230723164458583](./跟随狂神学Java-32.assets/image-20230723164458583.png)

* 分析：

  可以看到在执行完`mapper.updateUser(new User(2, "joker", "123333"));`后，运行到`User user2 = mapper.queryUserById(1);`时又重新打开了一次Session



缓存失效的情况：

1. 查询不同的东西
2. 增删改操作，可能改变原来的数据，所以必定会刷新缓存
3. 查询不同的Mapper.xml
4. 手动清理缓存：`sqlSession.clearCache();`



总结：

* 一级缓存默认是开启的，只在一次sqlSession中有效，也就是拿到连接到关闭连接

---

##### 二级缓存

* 二级缓存也叫全局缓存，一级缓存作用域太低了，所以诞生了二级缓存
* 基于 namespace 级别的缓存，一个名称空间，对应一个二级缓存；
* 工作机制。
  * 一个会话查询一条数据，这个数据就会被放在当前会话的一级缓存中，
  * 如果当前会话关闭了，这个会话对应的一级缓存就没了；但是我们想要的是，会话关闭了，一级缓存中的数据被保存到二级缓存中
  * 新的会话查询信息，就可以从二级缓存中获取内容
  * 不同的 mapper 查出的数据会放在自己对应的缓存 (map) 中，



官方文档：

* 默认情况下，只启用了本地的会话缓存，它仅仅对一个会话中的数据进行缓存。 要启用全局的二级缓存，只需要在你的 SQL 映射文件中添加一行：

  ```xml
  <cache/>
  ```

![image-20230723165423500](./跟随狂神学Java-32.assets/image-20230723165423500.png)

![image-20230723165735397](./跟随狂神学Java-32.assets/image-20230723165735397.png)



步骤：

1. 开启全局缓存

2.  在要使用二级缓存的Mapper中开启

   也可以自定义参数，如下：

   ~~~xml
   <cache
     eviction="FIFO"
     flushInterval="60000"
     size="512"
     readOnly="true"/>
   ~~~

3. 代码：

   ~~~java
   @Test
   public void test() {
       SqlSession sqlSession = MybatisUtils.getSqlSession();
       SqlSession sqlSession2 = MybatisUtils.getSqlSession();
   
       UserMapper mapper = sqlSession.getMapper(UserMapper.class);
       UserMapper mapper2 = sqlSession2.getMapper(UserMapper.class);
   
       User user = mapper.queryUserById(1);
       System.out.println(user);
       sqlSession.close();
   
       System.out.println("====================================");
   
       User user2 = mapper2.queryUserById(1);
       System.out.println(user2);
   
       System.out.println(user==user2);
       sqlSession2.close();
   
   }
   ~~~

4. 结果：

   ![image-20230723171516035](./跟随狂神学Java-32.assets/image-20230723171516035.png)

   说明两次查询后的结果储存在统一内存地址



总结：

* 只要开启了二级缓存，在同一个Mapper下就有效
* 所有的数据都先会放在一级缓存中
* 只有当会话提交，或者关闭的时候才会提交到二级缓存中



---

##### 缓存原理

查询优先级：

* 先查二级缓存，再查一级缓存，再查数据库

  ![image-20230723172500666](./跟随狂神学Java-32.assets/image-20230723172500666.png)





---

##### 自定义缓存-ehcache

ehcache是一种广泛应用的开源Java分布式缓存，主要面向通用缓存

使用方法：

1. 导包

   pom.xml

   ~~~xml
   <dependency>
       <groupId>org.mybatis.caches</groupId>
       <artifactId>mybatis-ehcache</artifactId>
       <version>1.2.3</version>
   </dependency>
   ~~~

   

2. 配置文件

   ehcache.xml

   ~~~xml
   <?xml version="1.0" encoding="UTF-8"?>
   <ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:noNamespaceSchemaLocation="http://ehcache.org/ehcache.xsd"
            updateCheck="false">
   
       <diskStore path="./tmpdir/Tmp_EhCache"/>
   
       <defaultCache
               eternal="false"
               maxElementsInMemory="10000"
               overflowToDisk="false"
               diskPersistent="false"
               timeToIdleSeconds="1800"
               timeToLiveSeconds="259200"
               memoryStoreEvictionPolicy="LRU"/>
   
       <cache
               name="cloud_user"
               eternal="false"
               maxElementsInMemory="5000"
               overflowToDisk="false"
               diskPersistent="false"
               timeToIdleSeconds="1800"
               timeToLiveSeconds="1800"
               memoryStoreEvictionPolicy="LRU"/>
   
       <!--
           name:缓存名称
           eternal：是否永久有效，即缓存中的元素是否永不过期，默认为 false。
           maxElementsInMemory：内存中缓存的最大元素数，默认为 10000。
           maxElementsOnDisk：磁盘中缓存的最大元素数，当超过该值时会自动清理缓存
           overflowToDisk：是否允许缓存溢出到磁盘，默认为 false。
           diskPersistent：是否持久化到磁盘，默认为 false。
           diskSpoolBufferSizeMB：磁盘缓存的大小，MB,默认为30
           diskExpiryThreadIntervalSeconds：磁盘缓存过期的线程间隔秒
           timeToIdleSeconds：元素在缓存中闲置的最长时间，单位为秒，默认为 1800 秒（30 分钟）。
           timeToLiveSeconds：元素在缓存中存活的最长时间，单位为秒，默认为 259200 秒（3 天）。
           memoryStoreEvictionPolicy：内存中缓存溢出时的清理策略，默认为 LRU（最近最少使用）。
           clearOnFlush: 当内存达到指定大小时，是否清理缓存
        -->
   </ehcache>
   ~~~

3. 使用

   UserMapper.xml

   ~~~xml
   <cache type="org.mybatis.caches.ehcache.EhcacheCache" />
   ~~~

   
