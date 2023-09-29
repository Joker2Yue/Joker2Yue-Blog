---
title: 跟随狂神学Java-04，包的了解以及Java常用的包
date: 2022/6/15 22:01:11
tags:
  - 狂神
  - Java
  - JavaSE
categories:
  - [跟随狂神学Java]
  - [Java]
cover: https://resource.joker2yue.top/blog/images/coverImg/JavaSE/04.jpg
keywords:
  - 包机制
  - JavaDoc
  - Scanner
  - 随机数
  - new关键字
ai: 
  - 本文介绍了Java中的包机制和JavaDoc文档注释，还涵盖了常见的包，如Scanner用于获取用户输入和Random用于生成随机数。文章强调了规范和命名空间的重要性。
  - 本文探讨了Java中的包机制和JavaDoc文档注释。包机制用于组织和区分类，通过导入包，我们可以使用其中的类。JavaDoc文档注释是用于生成文档的重要工具，包括作者信息、版本号、参数、返回值和异常说明。文章还介绍了常见的包，例如Scanner，用于获取用户输入，以及Random，用于生成随机数。最后，文章提到了创建对象时使用的new关键字，简要解释了对象的创建过程。这些基础知识有助于Java程序的开发和理解。
  - 本文介绍了Java中的包机制和JavaDoc文档注释，强调了包的作用和命名空间的重要性。还探讨了常见的包，如Scanner用于输入获取和Random用于生成随机数。文章还提到了创建对象时使用的new关键字，简要解释了对象的创建过程。这些基础知识对于Java程序开发和代码组织至关重要。
---
# 跟随狂神学Java

##### 第四天：包的了解以及Java常用的包

> 无规矩不成方圆，无规范不能协作

---

## 学习内容

#### 包机制

*为了更好的组织`类`，Java提供了`包机制`，用于区别类名的`命名空间`。*

包语句的语法格式为：

~~~java
package pkg1[.pkg2[.pkg3...]];
//这句话一定要写在第一行！！！
package com.joker_yue.javalearn.packagelearn;
//如果创建了包，则在此包下所有的类方法中都需要加上package语句
~~~

**一般利用公司域名倒置作为包名**

为了能够使用某一个包的成员，我们需要在Java程序中明确导入该包。使用"`import`"语句可以完成此功能。

~~~java
import package1[.package2...].(classname|*);
//如果为*，则导入此目录下所有类
//注意，不仅可以导入库中的包，也可导入自己的
import com.joker_yue.javalearn.packagelearn;//导入指定的类
import com.joker_yue.javalearn.*;			//导入所有的类
~~~

~~包的本质就是文件夹~~

----



#### JavaDoc

> @author 作者名
>@version 版本号
>@since 指明需要最早使用的Jdk版本
>@param 参数名
>@return 返回值情况
>@throws 异常抛出情况

Javadoc命令：

~~~java
javadoc -encoding UTF-8 -charset UTF-8 packagelearn.java
~~~



#### 使用IDEA生成JavaDoc

在状态栏中选择“工具”，然后就可以看到[生成JavaDoc]。

在选项中你可以自定义生成的范围，可以是单个文件也可以是整个项目。

填写输出目录，地区填写ch_CN。

点击生成，就可以在输出目录下看到你生成的JavaDoc了

----



#### 常见的包



##### Scanner

作用：获取用户的输入

~~~java
import java.util.Scanner;              //导包，出现在定义的类之上
Scanner sc =new Scanner(System.in);    //创建对象，sc为变量名，可以发生变化。System.in为系统读取
int i=sc.nextInt();                    //接受数据接受一个int数据
sc.close();                            //关闭输入
~~~

通过Scanner类的`next()`与`nextLine()`方法获取输入的字符串，在读取前我们一般需要使用`hasNext()`与`hasNextLine()`判断是否还有输入的数据

~~~java
 Scanner sc = new Scanner(System.in);
 System.out.println("使用next方法接收：");

        //判断用户是否有输入字符串
        if(sc.hasNext()){
            //使用next接收
            String str = sc.next();
            System.out.println("输出的内容为"+str);
        }
//相当于cin>>(string)
//凡是属于IO流的类如果不关闭的话就会一直占用资源，要养成好习惯喔，用完就关
sc.close();
~~~

~~~java
Scanner sc = new Scanner(System.in);
System.out.println("使用nextLine方法接收");

        if(sc.hasNextLine()){
            String str = sc.nextLine();
            System.out.println("输出的内容为"+str);
        }
//相当于getline(cin,string)
sc.close();
~~~

* next()
  1. 一定要读取到有效字符后才可以结束输入
  2. 对输入的有效字符之前遇到的空白，next()方法会自动去掉
  3. 只对输入有效字符后才能将其后面输入的空白作为分隔符或者结束符
  4. next()不能得到带有空格的字符串
  
* nextLine()
  1. 以Enter键作为结束符，也就是说nextLine()方法返回的事输入回车之前的所有字符
  2. 可以获取空白
  
* 其他

  比如，nextInt(),nextDouble()...



##### 随机数

~~~java
导包import java.util.Random;                    //比如出现在定义的类之上
创建对象Random rd =new Random();              	 //rd为变量名，可以发生变化
获取随机数int rnum = rd.nextInt(10);             //获取一个[0，10)的int类型数据
~~~

----

#### new关键字

我们在创建对象的时候，一般是这样的：

~~~java
Student s1;//在栈中创建对象
s1 = new Student();//为对象在堆中分配内存
~~~

也可以这样

~~~java
Student s1 = new Student();//创建分配一步到位
~~~

