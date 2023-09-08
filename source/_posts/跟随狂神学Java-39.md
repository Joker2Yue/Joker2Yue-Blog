---
title: 跟随狂神学Java-39，MybatisPlus
date: 2023/08/14 04:02:22
tags:
  - Java
  - 狂神
  - Mybatis
  - MyabtisPlus
  - 必看
categories:
  - [跟随狂神学Java]
cover: /images/coverImg/Mybatis/MybatisPlus.jpg
keywords:
  - MybatisPlus
  - 增强工具
  - 无侵入
  - CRUD
  - Lambda
  - 主键自动生成
  - ActiveRecord
  - 全局通用操作
  - 代码生成器
  - 分页插件
  - 逻辑删除
  - 乐观锁
  - 性能分析
  - 查询条件
  - Wrapper
  - 自动生成器
ai:
  - 这篇文章介绍了MybatisPlus中的微服务和MybatisPlus的特性、快速入门、CRUD扩展、自动填充、查询操作、分页操作、删除测试、逻辑删除、乐观锁、性能分析、条件构造器Wrapper以及代码自动生成器。
  - 这篇文章详细介绍了MybatisPlus，包括微服务、特性、快速入门、CRUD扩展、自动填充、查询操作、分页操作、删除测试、逻辑删除、乐观锁、性能分析、条件构造器Wrapper和代码自动生成器的使用。
  - 本文全面探讨了MybatisPlus，包括微服务、特性、快速入门、CRUD扩展、自动填充、查询操作、分页操作、删除测试、逻辑删除、乐观锁、性能分析、条件构造器Wrapper以及代码自动生成器的使用方法。它为Java开发人员提供了一种强大的工具，简化了数据库操作和代码生成的过程。
---
# 跟随狂神学Java

**第三十九：微服务-MybatisPlus**

> "一个好的程序员是在穿越单行道之前总是向两边看的人"
>
> [【狂神说Java】MyBatisPlus最新完整教程通俗易懂_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV17E411N7KN/?vd_source=814489e71df641c4b2c0ff7d4659b2d0)
>
> [MyBatis-Plus (baomidou.com)](https://baomidou.com/)

#### 概述

---

##### 什么是MybatisPlus

[MyBatis-Plus](https://github.com/baomidou/mybatis-plus)（简称 MP）是一个 [MyBatis ](https://www.mybatis.org/mybatis-3/)的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。

---

##### 特性

- **无侵入**：只做增强不做改变，引入它不会对现有工程产生影响，如丝般顺滑
- **损耗小**：启动即会自动注入基本 CURD，性能基本无损耗，直接面向对象操作。BaseMapper<>
- **强大的 CRUD 操作**：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作，更有强大的条件构造器，满足各类使用需求。以后简单的CRUD表达式能够自动生成
- **支持 Lambda 形式调用**：通过 Lambda 表达式，方便的编写各类查询条件，无需再担心字段写错
- **支持主键自动生成**：支持多达 4 种主键策略（内含分布式唯一 ID 生成器 - Sequence），可自由配置，完美解决主键问题
- **支持 ActiveRecord 模式**：支持 ActiveRecord 形式调用，实体类只需继承 Model 类即可进行强大的 CRUD 操作
- **支持自定义全局通用操作**：支持全局通用方法注入（ Write once, use anywhere ）
- **内置代码生成器**：采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 、 Controller 层代码，支持模板引擎，更有超多自定义配置等您来使用。自动生成代码
- **内置分页插件**：基于 MyBatis 物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同于普通 List 查询
- **分页插件支持多种数据库**：支持 MySQL、MariaDB、Oracle、DB2、H2、HSQL、SQLite、Postgre、SQLServer 等多种数据库
- **内置性能分析插件**：可输出 SQL 语句以及其执行时间，建议开发测试时启用该功能，能快速揪出慢查询
- **内置全局拦截插件**：提供全表 delete 、 update 操作智能分析阻断，也可自定义拦截规则，预防误操作





#### 快速入门

---

##### 依赖导入

~~~xml
<!-- Mysql -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.31</version>
</dependency>

<!-- Lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.28</version>
</dependency>

<!-- Mybatis Plus -->
<!-- 是个人开发的，并非官方的 -->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.5.3</version>
</dependency>
~~~

注意，尽量不要同时导入Mybatis和MybatisPlus 

---

##### 回顾Mybatis

pojo-dao（连接Mybatis，配置Mapper.xml）-service-controller



----

#####  代码编写

* User.java：pojo

  ~~~java
  package com.joker_yue.pojo;
  
  import lombok.AllArgsConstructor;
  import lombok.Data;
  import lombok.NoArgsConstructor;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/8/13 16:56
   */
  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public class User {
      private Long id;
      private String name;
      private Integer age;
      private String email;
  }
  ~~~

* UserMapper.java：dao/mapper

  **==只需要`extends BaseMapper`==**

  ~~~java
  package com.joker_yue.mapper;
  
  import com.baomidou.mybatisplus.core.mapper.BaseMapper;
  import com.joker_yue.pojo.User;
  import org.springframework.stereotype.Repository;
  
  /**
   * @author Joker
   * @version 1.0
   * @date 2023/8/13 16:57
   */
  // 现在在所对应的Mapper上实现基本的接口 BaseMapper 即可
  @Repository // 表示持久层
  public interface UserMapper extends BaseMapper<User> {
      // 现在，所有的CRUD操作都已经完成了
      // 不需要像以前那样配置一大堆文件了！！！
  }
  
  ~~~

* 程序入口

  **==需要`@MapperScan`注解==**

  ```java
  package com.joker_yue;
  
  import org.mybatis.spring.annotation.MapperScan;
  import org.springframework.boot.SpringApplication;
  import org.springframework.boot.autoconfigure.SpringBootApplication;
  
  @MapperScan("com.joker_yue.mapper")
  @SpringBootApplication
  public class MybatisPlusQuickStartApplication {
  
      public static void main(String[] args) {
          SpringApplication.run(MybatisPlusQuickStartApplication.class, args);
      }
  
  }
  ```

* 测试

  ~~~java
  package com.joker_yue;
  
  import com.joker_yue.mapper.UserMapper;
  import com.joker_yue.pojo.User;
  import org.junit.jupiter.api.Test;
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.boot.test.context.SpringBootTest;
  
  import java.util.List;
  
  @SpringBootTest
  class MybatisPlusQuickStatApplicationTests {
      // 继承了BaseMapper。所有的方法都来自父类，我们可以直接拿来用
      @Autowired
      private UserMapper userMapper;
  
      @Test
      void contextLoads() {
          // 查询全部用户
          List<User> users = userMapper.selectList(null);
          users.forEach(System.out::println);
      }
  
  }
  ~~~

  



#### CRUD扩展

---

##### insert插入

* 代码

  ~~~java
  
      // 测试插入
      @Test
      public void testInsert() {
          User user = new User();
          user.setName("joker_yue");
          user.setAge(20);
          user.setEmail("joker_yue@qq.com");
  
          int res = userMapper.insert(user);  //没有设置id，却自动生成id
          System.out.println(res);
      }
  ~~~

* 结果：

  ![image-20230814130845116](./跟随狂神学Java-39.assets/image-20230814130845116.png)

* 没有插入id却自动生成id？

  * 主键生成策略

    ~~~java
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public class User {
        private Long id;        // 对应主键中的id（uuid，自增id，雪花算法，redis、zookeeper）
        private String name;
        private Integer age;
        private String email;
    }
    ~~~

    

----

##### 主键生成策略-雪花算法

[分布式ID神器之雪花算法简介 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/85837641)

[这可能是讲雪花算法最全的文章-腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1676937)

![img](https://ask.qcloudimg.com/http-save/7525075/vfc9eip0ro.jpeg)

在MybatisPlus中默认的主键生成策略为雪花算法。当然，你可以指定主键生成策略，提供的主键生成策略如下

~~~java
/**
 * 数据库ID自增
 * <p>该类型请确保数据库设置了 ID自增 否则无效</p>
 */
AUTO(0),
/**
 * 该类型为未设置主键类型(注解里等于跟随全局,全局里约等于 INPUT)
 */
NONE(1),
/**
 * 用户输入ID
 * <p>该类型可以通过自己注册自动填充插件进行填充</p>
 */
INPUT(2),

/* 以下2种类型、只有当插入对象ID 为空，才自动填充。 */
/**
 * 分配ID (主键类型为number或string）,
 * 默认实现类 {@link com.baomidou.mybatisplus.core.incrementer.DefaultIdentifierGenerator}(雪花算法)
 *
 * @since 3.3.0
 */
ASSIGN_ID(3),
/**
 * 分配UUID (主键类型为 string)
 * 默认实现类 {@link com.baomidou.mybatisplus.core.incrementer.DefaultIdentifierGenerator}(UUID.replace("-",""))
 */
ASSIGN_UUID(4);
~~~

使用方法：`@TableId`注解

~~~java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @TableId(type = IdType.AUTO)	// 使用自增时，数据库中的主键也必须设置为自增！
    private Long id;        // 对应主键中的id（uuid，自增id，雪花算法，redis、zookeeper）
    private String name;
    private Integer age;
    private String email;
}

~~~



---

##### 更新操作

* 代码

  ~~~java
  // 测试更新
  @Test
  public void testUpdate() {
      User user = new User();
      // 想改什么就写上去，不改就不写。会自动拼接sql
      user.setId(1690952684882145281L);
      user.setName("joker_yue");
      user.setAge(20);
      user.setEmail("joker_yue@qq.com");
  
      // 注意，虽然名字为byId，但是参数为一个对象
      int i = userMapper.updateById(user);
      System.out.println("affect rows:" + i);
  }
  ~~~

* 所有sql都自动拼接



---

##### 自动填充

像一些创建时间、修改时间，这些个操作都是要自动化完成的

所有的数据库表，gmt_creat、gmt_modified几乎所有的表都要配置上，而且需要自动化

* 方式一，数据库级别  (工作中是不允许修改数据库的！)

  1. 在表中新增字段create_time，update_time

     将类型设置为datetime，默认填充设置为`CURRENT_TIMESTAMP`

  2. 测试：

     ![image-20230814135948406](./跟随狂神学Java-39.assets/image-20230814135948406.png)

* 方式二，代码级别

  1. 表中的字段create_time、update_time类型为datetime，无默认填充

  2. 需要自动填充的java属性上写注解`@TableField(fill = ?)`

     * 提供的选择：

       ```java
       public enum FieldFill {
           /**
            * 默认不处理
            */
           DEFAULT,
           /**
            * 插入时填充字段
            */
           INSERT,
           /**
            * 更新时填充字段
            */
           UPDATE,
           /**
            * 插入和更新时填充字段
            */
           INSERT_UPDATE
       }
       ```

  3. 代码如下：

     ~~~java
     // 字段添加填充内容
     @TableField(fill = FieldFill.INSERT)           // 在插入的时候执行操作
     private Date createTime;    // 创建时间
     @TableField(fill = FieldFill.INSERT_UPDATE)    // 在插入和更新的时候操作
     private Date updateTime;    // 更新时间
     ~~~

  4. 编写处理器来处理这个注解即可

     新建一个MyMetaObjectHandler类

     ~~~java
     package com.joker_yue.handler;
     
     import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
     import lombok.extern.slf4j.Slf4j;
     import org.apache.ibatis.reflection.MetaObject;
     import org.springframework.stereotype.Component;
     
     import java.util.Date;
     
     /**
      * @author Joker
      * @version 1.0
      * @date 2023/8/14 14:12
      */
     @Slf4j      // 日志
     @Component  // 把处理器加到Spring容器
     public class MyMetaObjectHandler implements MetaObjectHandler {     // 元数据处理器
         // 插入时的填充策略
         @Override
         public void insertFill(MetaObject metaObject) {
             log.info("start insert fill...");
             // default MetaObjectHandler setFieldValByName(String fieldName, Object fieldVal, MetaObject metaObject)
             this.setFieldValByName("createTime", new Date(), metaObject);     // 参数分别为：字段名，填充信息，元对象
             this.setFieldValByName("updateTime", new Date(), metaObject);
     
         }
     
         // 更新式的填充策略
         @Override
         public void updateFill(MetaObject metaObject) {
             log.info("start update fill...");
             this.setFieldValByName("updateTime", new Date(), metaObject);
         }
     }
     ~~~

----

##### 查询操作

代码：

```java
// 查询操作
@Test
public void testSelectById() {
    User user = userMapper.selectById(1L);
    System.out.println(user);
}

// 测试批量查询
@Test
public void testSelectByBatchId() {
    List<User> users = userMapper.selectBatchIds(Arrays.asList(1, 2, 3));
    users.forEach(System.out::println);
}

// 条件查询
@Test
public void testSelectByMap() {
    HashMap<String, Object> map = new HashMap<>();
    // 自定义查询的条件
    map.put("name", "joker_yue");
    map.put("age",19);
    List<User> users = userMapper.selectByMap(map);
    users.forEach(System.out::println);
}
```



---

##### 分页操作

分页在网站使用的十分之多

1. 原始的limit进行分页
2. 第三方插件进行分页：pageHelper
3. MybatisPlus内置了分页插件



如何使用？

1. 配置拦截器组件：MybatisConfig.java

   ~~~java
   // 配置分页拦截器
   @Bean
   public PaginationInnerInterceptor paginationInnerInterceptor(){
       PaginationInnerInterceptor paginationInnerInterceptor = new PaginationInnerInterceptor();
       /*
       * setOverflow(boolean); 设置请求页面大于最大页数后的操作，true返回首页，false继续请求（默认）
       * setMaxLimit(Long); 设置单页最大条数，默认500，-1为不限制
       * */
       return paginationInnerInterceptor;
   }
   ~~~

2. 查询测试

   ~~~java
   // 测试分页查询
   @Test
   public void testPage() {
       // 参数：当前页，页面大小
       Page<User> userPage = new Page<>(1, 5);  // 查询第一页，而且只要5个数据
       userMapper.selectPage(userPage, null);
   
       userPage.getRecords().forEach(System.out::println);
       System.out.println(userPage.getTotal());    // 总记录数
       System.out.println(userPage.getPages());     // 总页数
   }
   ~~~



---

##### 删除测试

~~~java
// 删除测试
@Test
public void testDeletedById(){
    int i = userMapper.deleteById(1690988409157672961L);
    System.out.println("Affect rows :"+i);
}

// 批量删除
@Test
public void testDeleteBatchIds(){
    int i = userMapper.deleteBatchIds(Arrays.asList(1690952684882145281L, 1690972032879316993L));
    System.out.println("Affect rows :"+i);

}

// 通过Map删除
@Test
public void testDeleteByMap(){
    HashMap<String, Object> map = new HashMap<>();
    map.put("name", "joker_yue");
    int i = userMapper.deleteByMap(map);
    System.out.println("Affect rows :"+i);
}
~~~

---

##### 逻辑删除

* 物理删除：直接从数据库中移除
* 逻辑删除：标志位标记已经删除

管理员可以查看被删除的记录，防止无法找回

测试：

1. 在表中增加一个`deleted`字段

2. 为其增加注解`@TableLogic`

   ```java
   @TableLogic // 代表逻辑删除
   private Integer deleted;
   ```

3. 配置逻辑删除 application.properties

   ```properties
   # 配置逻辑删除
   # 删除的值设置为1，没有删除的设置为0
   mybatis-plus.global-config.db-config.logic-delete-value=1
   mybatis-plus.global-config.db-config.logic-not-delete-value=0
   ```

4. 测试删除：执行删除语句，发现走的是更新操作

   ![image-20230814164731513](./跟随狂神学Java-39.assets/image-20230814164731513.png)

   ![image-20230814164902731](./跟随狂神学Java-39.assets/image-20230814164902731.png)

   ![image-20230814165130236](./跟随狂神学Java-39.assets/image-20230814165130236.png)



#### 乐观锁

---

##### 什么是乐观锁

* 乐观锁：总是被认为不会出现问题，无论干什么，都不会去上锁。如果出现了问题，就更新值测试
  * version、new_version
* 悲观锁：总是认为会出现问题，无论干什么，都先把锁加上，再去操作



乐观锁实现方式：给所有的操作加一个versin

> - 取出记录时，获取当前 version
> - 更新时，带上这个 version
> - 执行更新时， set version = newVersion where version = oldVersion
> - 如果 version 不对，就更新失败



---

##### 测试MP的乐观锁插件

1. 给数据库中增加version字段

   ![image-20230814152805424](./跟随狂神学Java-39.assets/image-20230814152805424.png)

2. 实体类加对应的字段

   ~~~java
   @Version    // 代表一个乐观锁注解
   private Integer version;
   ~~~

3. 注册组件

   ~~~java
   package com.joker_yue.config;
   
   import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
   import com.baomidou.mybatisplus.extension.plugins.inner.OptimisticLockerInnerInterceptor;
   import org.mybatis.spring.annotation.MapperScan;
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   import org.springframework.transaction.annotation.EnableTransactionManagement;
   
   /**
    * @author Joker
    * @version 1.0
    * @date 2023/8/14 15:30
    */
   @MapperScan("com.joker_yue.mapper")     // 改写到这里，是因为这个类管理MybatisPlus的配置
   @EnableTransactionManagement    // 自动管理事务
   @Configuration  // 配置类
   public class MybatisPlusConfig {
       // 注册乐观锁插件
   
   
       /* 旧版
        @Bean
       public OptimisticLockerInterceptor optimisticLockerInterceptor() {
           return new OptimisticLockerInterceptor();
       }
        */
   
       @Bean
       public MybatisPlusInterceptor mybatisPlusInterceptor() {
           MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
           interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
           return interceptor;
       }
   }
   ~~~

4. 测试

   * 成功的

     ~~~java
     // 测试乐观锁-修改成功
     @Test
     public void testOptimisticLockerSuccess(){
         // 查询用户信息
         User user = userMapper.selectById(1L);
         // 修改用户信息
         user.setName("Joker九歌");
         user.setEmail("Joker_yue@qq.com");
         // 执行更新操作
         userMapper.updateById(user);
     }
     ~~~

   * 失败的

     ```java
     // 测试乐观锁-修改失败
     @Test
     public void testOptimisticLockerFail(){
         // 线程1
         User user = userMapper.selectById(1L);
         user.setName("Joker111");
         user.setEmail("Joker_yue@qq.com");
     
         // 模拟另外一个线程执行了插队操作
         User user2 = userMapper.selectById(1L);
         user2.setName("Joker222");
         user2.setEmail("Joker_yue@qq.com");
     
         userMapper.updateById(user2);
     
         // 如果失败，可以使用自旋锁来进行多次提交尝试
         userMapper.updateById(user);    // 如果没有乐观锁，就会覆盖插队线程的值
     }
     ```





#### 性能分析

---

##### 为什么需要性能分析

我们平时的开发中，会遇到一些慢sql，我们需要测试，比如Druid

但是MybatisPlus提供了一款性能分析插件。用于分析每条sql执行的时间



---

##### 使用p6spy

官方文档：[执行SQL分析打印 | MyBatis-Plus (baomidou.com)](https://baomidou.com/pages/833fab/)

官方说明：该功能依赖 `p6spy` 组件，完美的输出打印 SQL 及执行时长 `3.1.0` 以上版本

p6spy的使用：[数据库执行语句打印、性能分析框架（p6Spy的使用）_p6spy 性能_小流至江河的博客-CSDN博客](https://blog.csdn.net/javaYouCome/article/details/114360586)



配置：	

* pom.xml

  ~~~xml
  <dependency>
    <groupId>p6spy</groupId>
    <artifactId>p6spy</artifactId>
    <version>最新版本</version>
  </dependency>
  ~~~

- application.properties 配置：

  ```properties
  # 设置开发环境
  spring.profiles.active=dev
  
  # 配置数据库连接
  spring.datasource.username=root
  spring.datasource.password=root
  
  # 配置日志
  mybatis-plus.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl
  
  # 配置逻辑删除
  # 删除的值设置为1，没有删除的设置为0
  mybatis-plus.global-config.db-config.logic-delete-value=1
  mybatis-plus.global-config.db-config.logic-not-delete-value=0
  
  # 配置p6spy 的sql检测
  spring.datasource.driver-class-name=com.p6spy.engine.spy.P6SpyDriver
  spring.datasource.url=jdbc:p6spy:mysql://localhost:3306/mybatis_plus?useSSL=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
  ```

- spy.properties 配置：

  ```properties
  module.log=com.p6spy.engine.logging.P6LogFactory,com.p6spy.engine.outage.P6OutageFactory
  # 自定义日志打印
  #logMessageFormat=com.p6spy.engine.spy.appender.SingleLineFormat
  logMessageFormat=com.p6spy.engine.spy.appender.CustomLineFormat
  customLogMessageFormat=%(currentTime) | SQL耗时： %(executionTime) ms | 连接信息： %(category)-%(connectionId) | 执行语句： %(sql)
  # 使用控制台记录sql
  appender=com.p6spy.engine.spy.appender.StdoutLogger
  ## 配置记录Log例外
  excludecategories=info,debug,result,batc,resultset
  # 设置使用p6spy driver来做代理
  deregisterdrivers=true
  # 日期格式
  dateformat=yyyy-MM-dd HH:mm:ss
  # 实际驱动
  driverlist=com.mysql.cj.jdbc.Driver
  # 是否开启慢SQL记录
  outagedetection=true
  # 慢SQL记录标准 秒
  outagedetectioninterval=2
  ```





#### 条件构造器Wapper

---

##### 使用情景

我们写一些十分复杂的sql就需要它来替代

[条件构造器 | MyBatis-Plus (baomidou.com)](https://baomidou.com/pages/10c804/#abstractwrapper)

* 普通查询

  1. 代码

     ```java
     @Test
     void test1() {
         // 查询name不为空，且邮箱不为空的。年龄大于等于20
         QueryWrapper<User> wrapper = new QueryWrapper<>();
         wrapper
                 .isNotNull("name")
                 .isNotNull("email")
                 .ge("age", 20);
         userMapper.selectList(wrapper).forEach(System.out::println); // 和刚才学习的map对比
     }
     ```

  2. 结果

     ![image-20230814194536621](./跟随狂神学Java-39.assets/image-20230814194536621.png)

* 模糊查询

  1. 代码

     ```java
     // Like 模糊查询
     @Test
     public void test4(){
         // 查询年龄从21-30岁的用户
         QueryWrapper<User> wrapper = new QueryWrapper<>();
     
         // likeRight,likeLeft：表示通配的位置。左为%t，右为t%
         wrapper.notLike("name","_")
                 .likeRight("email","t");    // t%
     
         List<Map<String,Object>> maps = userMapper.selectMaps(wrapper);
         maps.forEach(System.out::println);
     }
     ```

  2. 结果

     ![image-20230814202349323](./跟随狂神学Java-39.assets/image-20230814202349323.png)

* 内查询

  1. 代码

     ```java
     // 内查询
     @Test
     public void test5(){
         QueryWrapper<User> wrapper = new QueryWrapper<>();
     
         // id在子查询中查出来
         wrapper.inSql("id","select id from user where id<3");
     
         List<Object> objects = userMapper.selectObjs(wrapper);
         objects.forEach(System.out::println);
     }
     ```

  2. 结果
     ![image-20230814203030010](./跟随狂神学Java-39.assets/image-20230814203030010.png)

* 查询排序

  1. 代码

     ```java
     // 查询排序
     @Test
     public void test6(){
         QueryWrapper<User> wrapper = new QueryWrapper<>();
         // 通过id进行排序
         wrapper.orderByDesc("id");
     
         List<User> users = userMapper.selectList(wrapper);
         users.forEach(System.out::println);
     
     }
     ```

  2. 结果

     ![image-20230814203535312](./跟随狂神学Java-39.assets/image-20230814203535312.png)







#### 代码自动生成器

---

[Mybatis Plus最新代码生成器AutoGenerator，更简单更高效！ - 墨天轮 (modb.pro)](https://www.modb.pro/db/619309)

[MybatisPlus——全网配置最全的代码生成器 - 不吃紫菜 - 博客园 (cnblogs.com)](https://www.cnblogs.com/buchizicai/p/16606917.html)

[MyBatis-Plus——代码生成器（3.5.1+版本）-阿里云开发者社区 (aliyun.com)](https://developer.aliyun.com/article/923481)