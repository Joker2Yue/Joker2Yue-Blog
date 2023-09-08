---
title: 跟随狂神学Java-30，Mysql
date: 2023/07/05 04:02:22
tags:
  - 狂神
  - Java
  - JavaSE
  - 数据库
  - Mysql
categories:
  - [跟随狂神学Java]
cover: /images/coverImg/JavaSE/17.jpg
keywords:
  - MySQL
  - 数据库
  - 数据类型
  - 表
  - 数据操作语言（DML）
  - 外键
  - 字段属性
  - 数据库引擎
  - 数据库管理系统（DBMS）
  - 行注释
ai:
  - 这篇文章介绍了MySQL数据库的基本概念、连接方法和数据操作语言。
  - 文章详细介绍了MySQL数据库，包括数据库类型、数据类型、字段属性、表的创建和修改，以及数据操作语言的使用。
  - 在这篇文章中，你可以了解到MySQL数据库的基本概念，包括不同类型的数据库、数据类型和字段属性。还介绍了如何连接数据库以及如何使用数据操作语言（DML）进行数据的插入、更新和删除操作。此外，还讨论了外键的使用和最佳实践，以及常见的操作符和条件运算符的用法。这些内容对于学习和理解MySQL数据库非常有帮助。
---
# 跟随狂神学Java

##### 第三十天：Mysql

> "真正的危险不是计算机开始像人一样思考，而是人开始像计算机一样思考。" 
>
> [【狂神说Java】MySQL最新教程通俗易懂](https://www.bilibili.com/video/BV1NJ411J79W/?vd_source=814489e71df641c4b2c0ff7d4659b2d0)

#### 初识Mysql

---

JavaEE：企业级Java开发，Web

前端：页面展示；后台：数据库，链接前端，控制视图跳转，前端传数据

数据库：存数据



---

##### 为什么要学数据库

1. 趋势，岗位需求

2. 得数据库者得天下
3. 被迫需求
4. 数据库时所有软件体系中最核心的存在 DBA



---

##### 什么是数据库

数据库（DB，DataBase）

概念：数据仓库，**软件**，安装在操作系统之上

作用：储存数据，管理数据



---

##### 数据库分类

关系型数据库：（行、列）（SQL）

* MySQL，Oracle，DB2，SQLite
* 通过表和表之间，行和列之间的关系进行数据的存储



非关系型数据库：（对象）（NoSQL）

* redis、MongoDB
* 不是以行和列进行存储，而是以对象进行存储，根据对象的自身属性来决定。



DBMS：数据库管理系统

* 数据库的管理软件，科学有效的管理我们的数据。维护和获取数据
* MySQL：数据库管理系统



---

##### MySQL简介

MySQL是一个关系型数据库管理系统

前世：属于MySQL AB公司

今生：属于Oracle公司

开源的数据库软件

体积小，数据快，总体拥有成本低，招人成本低



#### 连接数据库

---

命令行连接：

~~~sql
mysql -u root -p
~~~



Mysql修改密码：

~~~sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password'; --把new_password改成自己的新密码
~~~



Mysql注释：

~~~sql
--这是一条行注释

/*
这是一段块注释
*/

#有的也支持使用#作为注释
~~~



退出Mysql

~~~sql
exit
~~~



Mysql注意：

所有语句都需要分号结尾



Mysql查询所有数据库

~~~sql
show databases;
~~~



切换数据库：

~~~sql
use school;	--查看school库
~~~



展示当前数据库中所有的表

~~~sql
show tables;	--查看shcool中所有的表
~~~



查看指定表中的数据

~~~sql
describe student;	--查看student中的数据
~~~



创建数据库

~~~sql
creat database wastes;  --创建一个wastes的表
~~~



---

##### D*L

* DDL：数据库定义语言	Database Definition Language
* DML：数据库操作语言   Database Management Language
* DQL：数据库查询语言   Database Query Language
* DCL：数据库控制语言   Database Control Language

CRUD增删改查



---

##### 操作数据库

操作数据库，操作数据库中的表，操作数据库中表的数据

~~~sql
SHOW DATABASES;
CREATE DATABASE IF NOT EXISTS wastes;	-- 创建，除非不存在

DROP DATABASE IF EXISTS hello;	-- 移除，如果不存在

USE `shcool`;		-- 建议带上反单引号

SELECT `user` FROM student;		-- 在student中查询user

SHOW DATABASE;
~~~



---

##### 数据库的数据类型

| 类型          | 说明                                     |
| ------------- | ---------------------------------------- |
| tinyint       | 十分小的数据，1字节                      |
| mediumint     | 中等大小的数据，3字节                    |
| smallint      | 较小的数据，2字节                        |
| **int**       | **4字节**                                |
| bigint        | 8字节                                    |
| float         | 单精度浮点，4字节                        |
| double        | 双精度浮点，8字节                        |
| decimal       | 字符串形式的浮点数，金融计算的时候使用   |
| char          | 字符串，固定大小，0-255                  |
| **varchar**   | **可变字符串，0-65535**                  |
| tinytext      | 微型文本，2^8^ -1                        |
| **text**      | **文本串，2^16^ -1，保存大文本**         |
| date          | 日期   YYYY-MM-DD                        |
| year          | 年                                       |
| time          | 时间格式    HH:mm:ss                     |
| **datetime**  | **YYYY-MM-DD HH:mm:ss**                  |
| **timestamp** | **时间戳。1970.1.1到现在的毫秒数**       |
| null          | 没有值，未知，注意，不要使用NULL进行运算 |



---

##### 数据库的字段属性

| 字段          | 说明                                                         |
| ------------- | ------------------------------------------------------------ |
| Unsigned      | 无符号的整数，不能声明为负数                                 |
| zerofill      | 0填充的。比如1会被填充为0001                                 |
| autoincrement | 自增，自动在上一条的基础上加一，常用来设置index，必须为整数类型，可以自己设置自增的起始值和步长 |
| not NULL      | 非空，如果该列被定义为该属性，必须填入信息                   |
| default       | 默认，如果该列被定义为该属性，新增加字段时，将会自动填充默认信息 |
| id            | 主键                                                         |
| version       | 乐观锁                                                       |
| is_delete     | 伪删除                                                       |
| qmt_create    | 创建时间                                                     |
| qmt_update    | 修改时间                                                     |

![image-20230705160222026](./跟随狂神学Java-30.assets/image-20230705160222026.png)

![image-20230705160145682](./跟随狂神学Java-30.assets/image-20230705160145682.png)



---

##### 数据库表

~~~sql
CREATE TABLE IF NOT EXISTS `student`(
	-- 创建表
	`id` INT(4) NOT NULL AUTO_INCREMENT	COMMENT '学号',	-- id4位，不空，自增
	`name` VARCHAR(30) NOT NULL DEFAULT '匿名' COMMENT '姓名',		-- 注意英文逗号
	`pwd` VARCHAR(20) NOT NULL DEFAULT '12345' COMMENT '密码',
	`sex` VARCHAR(2) NOT NULL DEFAULT '男' COMMENT '性别',
	`birthday` DATETIME DEFAULT NULL COMMENT '出生日期',
	`address` VARCHAR(100) DEFAULT NULL COMMENT '家庭住址',
	`email` VARCHAR(50)  DEFAULT NULL COMMENT	'邮箱',
	PRIMARY KEY (`id`)
)ENGINE=INNODB 

~~~

字符串使用英文单引号，字段使用反单引号

~~~sql
SHOW CREATE DATABASE school; -- 查看创建数据库的语句
SHOW CREATE TABLE student; -- 查看student数据表的定义语句
DESC student;		-- 查看student的结构
~~~



---

##### 关于数据库引擎：

INNODB:：默认使用

MYISAM：早些年使用

|            | MYISAM       | INNODB           |
| ---------- | ------------ | ---------------- |
| 事务支持   | 不支持       | 支持             |
| 数据行锁定 | 不支持，表锁 | 支持             |
| 外键约束   | 不支持       | 支持             |
| 全文索引   | 支持         | 不支持           |
| 表空间大小 | 较小         | 较大，为前者两倍 |

常规使用操作：

* MYISAM：节约空间，速度较快
* INNODB：安全性高，支持事务处理 ，多表用户操作



---

##### 物理空间所在的位置

所有的数据库文件都在data下

本质还是文件存储。

MYSQL引擎在物理文件上的区别

INNODB在数据库表中只有一个.frm文件， 以及上级目录下的.ibdata1文件

MYISAM对应.frm表结构定义文件，.MYD数据文件，.MYI索引文件



---

##### 修改表

~~~sql
-- 修改表
ALTER TABLE student AS stu;  -- 将student修改为stu
~~~

~~~sql
-- 添加字段
ALTER TABLE stu ADD age INT(11);
~~~

~~~sql
--  修改表的字段（重命名，修改约束）
ALTER TABLE student MODIFY age VARCHAR(11);		-- 把age的属性改成VARCHAR
ALTER TABLE student CHANGE age age1(11)				-- 把age修改为age1
~~~

~~~sql
-- 删除字段
ALTER TABLE student DROP age1; -- 删除字段age1
~~~



#### MySql数据管理

---

##### 外链（了解即可）

场景：如果小明是大二年级的学生，那么在小明的个人信息表中有"年级"一栏，年级表中也应该有小明的信息

方式1，创建表的时候关联外键

~~~sql
CREATE TABLE `grade` (
	`gradeid` INT(10) NOT NULL AUTO_INCREMENT  COMMENT '年级id',
	`gradename` VARCHAR(50) NOT NULL COMMENT '年级名称',
	PRIMARY KEY(`gradeid`)
)ENGINE=INNODB

-- 学生表的gradeid需要去引用年级表的gradeid
-- 定义外键key
-- 给这个外键添加约束（执行引用） REFERENCES 引用
CREATE TABLE IF NOT EXISTS `student`(
	-- 创建表
	`id` INT(4) NOT NULL AUTO_INCREMENT	COMMENT '学号',	-- id4位，不空，自增
	`name` VARCHAR(30) NOT NULL DEFAULT '匿名' COMMENT '姓名',		-- 注意英文逗号
	`pwd` VARCHAR(20) NOT NULL DEFAULT '12345' COMMENT '密码',
	`sex` VARCHAR(2) NOT NULL DEFAULT '男' COMMENT '性别',
	`birthday` DATETIME DEFAULT NULL COMMENT '出生日期',
	`gradeid` INT(10) NOT NULL COMMENT '学生年级',
	`address` VARCHAR(100) DEFAULT NULL COMMENT '家庭住址',
	`email` VARCHAR(50)  DEFAULT NULL COMMENT	'邮箱',
	PRIMARY KEY (`id`),
	KEY `FK_gradeid` (`gradeid`),
	CONSTRAINT `FK_gradeid`	FOREIGN KEY (`gradeid`) REFERENCES	`grade` (`gradeid`)
)ENGINE=INNODB 
SHOW CREATE DATABASE school; -- 查看创建数据库的语句
SHOW CREATE TABLE student; -- 查看student数据表的定义语句
DESC student;		-- 查看student的结构

~~~

如果A表引用了B表，要删除B表的时候，应当先删除A表。这里A表叫做**从表**，B表叫做**主表**

方式2，不在创建表的时候添加外键关系

~~~sql
-- 不在创建表的时候添加外键关系
ALTER TABLE `student`;
ADD CONSTRAINT `FK_graideid` FOREIGN key (`gradeid`) REFERENCES `grade` (`gradeid`);
~~~



以上的操作都是物理外键，数据库级别的外键，不建议使用

**最佳实践：**

* 数据库就是单纯的表，只用来存数据，只有行和列
* 我们想使用多张表的数据，想使用外键，程序去实现



---

##### DLM语言（全部记住）

DLM：数据操作语言

* Insert

    ~~~sql
    -- 插入语句（添加）
    -- INSERT into 表名([字段1，字段2，字段3])values('值1','值2','值3')
    INSERT into  `grade` (`gradename`) VALUES  ('大二')
    
    -- 由于主键自增，我们可以省略主键
    -- 如果不写表的字段，它将会一一匹配
    INSERT INTO `grade` VALUES ('大三')
    ~~~

* Update 

    ~~~sql
    -- 修改学员名字，带条件！如果不带条件，将会改动所有表
    UPDATE `student` SET `name`='joker' WHERE `id` = 1
    
    -- 语法
    -- UPDATE 表名 set colnum_name = value where 条件
    ~~~

  * 多个条件，逗号隔开

    ~~~sql
    UPDATE `student` SET `name`='joker',email='joker_yue@qq.com' WHERE `id` <= 3
    ~~~

    | 操作符        | 意义     | 范围            | 结果  |
    | ------------- | -------- | --------------- | ----- |
    | =             | 等于     | 5=6             | false |
    | <>或者!=      | 不等于   | 5<>6            | true  |
    | >             | 大于     | 5>6             | false |
    | <             | 小于     | 5<6             | true  |
    | <=            | 小于等于 | 5>6             | false |
    | >=            | 大于等于 | 5>=6            | false |
    | BETWEEN...and | 在区间   | BETWEEN 2 AND 5 | [2,5] |
    | AND           | 我和你   | 5>1 AND1>2      | false |
    | OR            | 我或你   | 5>1 OR 1>0      | true  |

    注意：value可以为具体值也可以变量

* Delete



