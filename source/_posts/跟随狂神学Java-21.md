---
title: 跟随狂神学Java-21，SimpleDateFormat类、System类
date: 2022/09/04 04:02:22
tags:
  - 狂神
  - Java
  - JavaSE
categories:
  - [跟随狂神学Java, Java]
cover: /images/coverImg/JavaSE/10.jpg
keywords:
  - Java
  - SimpleDateFormat
  - System
  - 格式化
  - 解析
  - 时间模式字母
  - arraycopy
  - currentTimeMillis
ai:
  - 本次学习内容包括Java中的SimpleDateFormat类和System类。SimpleDateFormat类是一个以与语言环境有关的方式来格式化和解析日期的具体类，常用的时间模式字母包括年、年中月份、月中天数、一天中小时数、分钟、秒和毫秒。可以将日期转为字符串，也可以将字符串转为日期。System类主要用于获取系统的属性数据和其他操作，包括复制数组、获取当前系统时间、建议JVM赶快启动垃圾回收器回收垃圾和退出JVM等。其中，currentTimeMillis方法通常用于计时操作。关键字包括Java、SimpleDateFormat、System、格式化、解析、时间模式字母、arraycopy和currentTimeMillis。
  - 本次学习介绍了Java中的SimpleDateFormat类和System类。SimpleDateFormat类用于格式化和解析日期，System类用于获取系统属性和进行其他操作，如复制数组、获取当前系统时间、建议JVM启动垃圾回收器回收垃圾和退出JVM等
  - 本次学习介绍了Java中的SimpleDateFormat类和System类。SimpleDateFormat类是一个具体类，用于格式化和解析日期，可以将日期转为字符串，也可以将字符串转为日期。常用的时间模式字母包括年、年中月份、月中天数、一天中小时数、分钟、秒和毫秒。System类主要用于获取系统的属性数据和进行其他操作，如复制数组、获取当前系统时间、建议JVM启动垃圾回收器回收垃圾和退出JVM等。其中，currentTimeMillis方法通常用于计时操作。
---
# 跟随狂神学Java

##### 第二十一天：SimpleDateFormat类、System类

> 代码生成就跟喝酒一个样，适度就好
>
> *~~[狂神未更新，转千锋教育 (bilibili.com)](https://www.bilibili.com/video/BV1vt4y197nY?spm_id_from=333.337.search-card.all.click)~~*

## 学习内容

#### SimpleDateFormat

这是一个以与语言环境有关的方式来**格式化和解析**日期的具体类

进行格式化（日期->文本）、解析（文本->日期）

常用的时间模式字母：

| 字母 | 日期或时间           | 示例 |
| ---- | -------------------- | ---- |
| y    | 年                   | 2019 |
| M    | 年中月份             | 08   |
| d    | 月中天数             | 10   |
| H    | 一天中小时数（0-23） | 22   |
| m    | 分钟                 | 16   |
| s    | 秒                   | 59   |
| S    | 毫秒                 | 367  |

---

##### 将日期转为字符串

~~~JAVA
SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日:HH::mm::ss");
~~~

表示将Date对象格式化成如上所示

~~~JAVA
package com.joker_yue.javalearn.SimpleDateFormat;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Demo01 {
    public static void main(String[] args) {
//        1.创建SimpleDateFormat对象
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日:HH::mm::ss");
//        2. 创建Date
        Date date = new Date();
//        格式化Date
         String str = sdf.format(date);
        System.out.println(str);
    }
}
~~~

上述代码的输出结果为

~~~JAVA
2023年01月06日:16::02::06
~~~

---

##### 将字符串转为日期

~~~java
package com.joker_yue.javalearn.SimpleDateFormat;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Demo01 {
    public static void main(String[] args) throws Exception {//这里抛出异常是因为默认的Date格式与设置的不同，防止程序报错
//        1.创建SimpleDateFormat对象
          SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");

//        2.解析（将字符串转成日期）
        Date date2=sdf.parse("1990/05/01");
        System.out.println(date2);

    }
}
~~~

最后的输出结果为

~~~JAva
Tue May 01 00:00:00 CDT 1990
~~~





#### System类

---

System系统类，主要用于获取系统的属性数据和其他操作，构造方法为私有

| 方法名                           | 说明                                           |
| -------------------------------- | ---------------------------------------------- |
| static void arraycopy(...)       | 复制数组                                       |
| static long currentTimeMillis(); | 获取当前系统时间，返回值为毫秒值               |
| static void gc();                | 建议JVM赶快启动垃圾回收器回收垃圾              |
| static void exit(int status);    | 推出JVM，如果参数为0则正常退出，否则为异常退出 |



---

##### arraycopy

 定义

~~~Java
  public static native void arraycopy(Object src,int srcPos,Object dest, int destPos,int length);
~~~

| 参数    | 说明                     |
| ------- | ------------------------ |
| src     | 要复制的源数组           |
| srcPos  | 源数组中要复制的起始位置 |
| dest    | 目标数组                 |
| destPos | 目标数组中要复制的位置   |
| length  | 长度                     |

 示例

~~~Java
package com.joker_yue.javalearn.System;

public class Demo01 {
    public static void main(String[] args) {
//        arraycopy数组的复制
        int[] src = {12,234,241,123,495};
        int[] arr = new int[8];
        System.arraycopy(src,0,arr,0,4);
        for(int i=0;i<4;i++){
            System.out.println(arr[i]);
        }
    }
}
~~~

输出

~~~Java
12
234
241
123
~~~

---

##### currentTimeMillis

示例：

~~~java
package com.joker_yue.javalearn.System;

public class Demo01 {
    public static void main(String[] args) {
        System.out.println(System.currentTimeMillis());
        }
    }
~~~



输出：

~~~Java
1672993778369
~~~

通常用此方法来进行计时操作



