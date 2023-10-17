---
title: 跟随狂神学Java-02，Java历史、基础知识
date: 2022/6/14 17:30:21
tags:
  - 狂神
  - Java
  - JavaSE
categories:
  - [跟随狂神学Java]
  - [Java]
cover: https://resource.joker2yue.cn/blog/images/coverImg/JavaSE/04.jpg
keywords:
  - Java历史
  - 基础知识
  - Java
  - 跨平台原理
  - JVM
  - JDK
  - JRE
ai: 
  - 这篇文章是"跟随狂神学Java"系列的第二天内容，主要介绍了Java的基础认识和历史背景。文章首先强调了Java的优势，包括其"三高"特点（高可用、高性能、高并发），并详细解释了九个具体的特点。然后，文章回顾了Java的发展历程，提到了一些关键的JDK版本。接着，文章解释了Java跨平台的原理，强调了JVM虚拟机的重要性，并简要介绍了JavaSE、JavaEE和JavaME的区别。最后，文章介绍了JRE、JDK和JVM的概念，以及Java程序的运行机制，包括编译型和解释型的区别。文章通过图示和简洁的文字帮助读者建立了对Java基础知识的理解。
  - 这篇文章是"跟随狂神学Java"系列的第二天学习内容，主要探讨了Java的基础概念和发展历史。文章首先介绍了Java的三大优势：简单性、面向对象、可移植性，以及其其他特性。然后，文章回顾了Java的发展历程，提及了关键的JDK版本。接着，文章解释了Java跨平台的原理，强调了JVM虚拟机的重要性，并概述了JavaSE、JavaEE和JavaME的不同应用领域。最后，文章简要说明了JRE、JDK和JVM的概念，并介绍了Java程序的运行机制，包括编译型和解释型的对比。通过这些内容，读者可以对Java的基本特性和历史有一个初步的了解。
  - 这篇文章是"跟随狂神学Java"系列的第二天内容，主要介绍了Java的基础知识和历史发展。文章首先突出了Java的三大优势（高可用、高性能、高并发），并详细解释了九个具体的特点。接着，文章回顾了Java的发展历程，强调了几个关键的JDK版本。然后，文章解释了Java的跨平台原理，着重介绍了JVM虚拟机的作用，并简要说明了JavaSE、JavaEE和JavaME的区别。最后，文章介绍了JRE、JDK和JVM的概念，以及Java程序的两种运行机制：编译型和解释型。通过清晰的文字和图示，文章帮助读者建立了对Java基础知识的初步了解。
---
# 跟随狂神学Java

##### 第二天：Java历史、基础认识

> 梦开始的地方

---

## 学习内容

### Java的优势：三高

高可用，高性能，高并发

#### 详细来说

1. 简单性

2. 面向对象

3. 可移植性

4. 高性能

5. 分布式

6. 动态性

7. 多线程

8. 安全性

9. 健壮性

#### Write Once,Run Anyway 

---

### Java 的发展


>1. 2004JDK1.4
>2. 2014JDK1.8
>3. 2021JDK1.11


----



### 跨平台原理: jvm虚拟机

#### JavaSE，JavaEE，JavaME
JavaSE :Java标准版，Java基础知识
JavaEE :开发企业级软件系统(B/s体系)，(Web端，服务器开发)
JavaME :移动设备和嵌入式设备，如手机、机顶盒上运行的应用程序
B/s体系 :基于浏览器访问的网站
C/s体系 :桌面应用程序
Swing技术开发桌面应用程序:弃用，更多用c#
SSM,Spring企业级网站:电商类，比如淘宝，京东



#### JRE,JDK和JVM

JRE(Java Development Kit)是Java程序的运行时环境，包含JVM和运行时所需要的核心类库
JDK(Java Runtime Enviroment)是Java程序开发工具包，包含JRE和开发人员使用的工具
JVM(Java Virtual Machine)是Java虚拟机
我们想运行一个已有的Java程序，应当安装JRE
我们想开发一个全新的Java程序，应当安装JDK

---

### Java程序运行机制

* 编译型
* 解释型

编译型，源文件直接全部生成二进制文件，使计算机看得懂。

解释型，计算机读程序，读到哪，翻译源码到哪

相比之下，编译型的运行速度更快

不过对于服务器、网页这种对效率要求不高的，用解释型语言多

![在这里插入图片描述](./跟随狂神学Java-2.assets/312b5e1aafb342e4804b262092b8a506-1693800684729-3-1693800693742-5.png)
