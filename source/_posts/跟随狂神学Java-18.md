---
title: 跟随狂神学Java-18，String类
date: 2022/08/31 04:02:22
tags:
  - 狂神
  - Java
  - JavaSE
categories:
  - [跟随狂神学Java, Java]
cover: /images/coverImg/JavaSE/10.jpg
keywords:
  - 浮点数精度丢失
  - BigDecimal
  - java.math
  - 加法
  - 减法
  - 乘法
  - 除法
ai:
  - 学习BigDecimal，解决浮点数精度问题，介绍精确计算方法，注意除不尽情况。
  - 本文介绍了如何使用BigDecimal解决浮点数精度问题，包括加、减、乘、除操作，以及保留小数位数和进位方法的设置，帮助开发者进行精确计算。
  - 本文详细介绍了Java中的BigDecimal类，用于解决浮点数精度问题。文章首先展示了浮点数计算中的精度丢失情况，然后介绍了BigDecimal的创建和基本运算方法，包括加、减、乘、除，并讨论了除不尽情况下的处理方法，如保留小数位数和进位方式。这些知识对开发者进行精确计算非常有帮助。
---
# 跟随狂神学Java

##### 第十八天：BigDecimal

> 哪一场战不难打，越难打，越要打
>
> *~~[狂神未更新，转千锋教育 (bilibili.com)](https://www.bilibili.com/video/BV1vt4y197nY?spm_id_from=333.337.search-card.all.click)~~*

## 学习内容

##### 引入

* 思考：以下程序的输出结果是多少

  ~~~java
  package com.joker_yue.javalearn.bigDecimal;
  
  public class BigDecimal {
      public static void main(String[] args) {
          double d1= 1.0;
          double d2= 0.9;
          System.out.println(d1-d2);
      }
  }
  ~~~

* 上述结果为

  ~~~java
  0.09999999999999998
  ~~~

* 我们再来试试这个

  ~~~~java
  package com.joker_yue.javalearn.bigDecimal;
  
  public class BigDecimal {
      public static void main(String[] args) {
          double d1= 1.0;
          double d2= 0.9;
          System.out.println(d1-d2);
  
          double result = (1.4-0.5)/0.9;
          System.out.println(result);
  
      }
  }
  ~~~~

* 输出结果为

  ~~~java
  0.09999999999999998
  0.9999999999999999
  ~~~

* 原因是浮点类型的精度丢失。所以我们需要一个进度更高的类

---

##### BigDecimal

* 位置：java.math包

* 作用：精确计算浮点数

* 创建方式：BigDecimal bd = new BigDecimal("1.0");

  

~~~java
package com.joker_yue.javalearn.bigDecimal;
import java.math.BigDecimal;

public class BD {
    public static void main(String[] args) {
        //BigDecimal：大的浮点数的计算
        BigDecimal bd1 = new BigDecimal("1.0");
        BigDecimal bd2 = new BigDecimal("0.9");

        //减法
        BigDecimal r1 = bd1.subtract(bd2);
        System.out.println(r1);
        //加法
        BigDecimal r2 = bd1.add(bd2);
        System.out.println(r2);

        //乘法
        BigDecimal r3 = bd1.multiply(bd2);
        System.out.println(r3);

        //除法
       BigDecimal r4 = new BigDecimal("1.4").subtract(new BigDecimal("0.5")).divide(new BigDecimal("0.9"));
        //(1.5-0.5)/0.9
        System.out.println(r4);

    }
}
~~~

上述代码的输出结果为

~~~java
0.1
1.9
0.90
1
~~~

但是我们这样写

~~~java
        BigDecimal r5 = new BigDecimal("10").divide(new BigDecimal("3"));
        System.out.println(r5);
~~~

将会报错：
~~~java
Exception in thread "main" java.lang.ArithmeticException: Non-terminating decimal expansion; no exact representable decimal result.
	at java.base/java.math.BigDecimal.divide(BigDecimal.java:1766)
	at com.joker_yue.javalearn.bigDecimal.BD.main(BD.java:26)
~~~

因为这个是除不尽的。所以我们需要说明保留几位小数

~~~java
BigDecimal r5 = new BigDecimal("10").divide(new BigDecimal("3"),2,BigDecimal.ROUND_HALF_UP);
//其中 public BigDecimal divide(BigDecimal divisor, int scale, int roundingMode)，
//中间divisor是除数，scale是保留位数，roundingMode是进位方法（这里我们选择四舍五入进位）
        System.out.println(r5);
~~~

最后的输出结果为

~~~java
3.33
~~~

---

##### 总结

* 方法
  * BigDecimal add(BigDecimal bd)	加
  * BigDecimal substract(BigDecimal bd)  减
  * BigDecimal multiply(BigDecimal bd)  乘
  * BigDecimal divide(BigDecimal bd)  除