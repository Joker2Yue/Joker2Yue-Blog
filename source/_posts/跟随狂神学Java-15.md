---
title: 跟随狂神学Java-15，包装类；类型转换与装箱、拆箱；Integer缓冲区
date: 2022/08/28 04:02:22
tags:
  - 狂神
  - Java
  - JavaSE
categories:
  - [跟随狂神学Java, Java]
cover: /images/coverImg/JavaSE/10.jpg
keywords:
  - 包装类
  - 类型转换
  - 装箱
  - 拆箱
  - Integer缓冲区
  - 自动装箱
  - 自动拆箱
ai:
  - 这节课学习了包装类，类型转换与装箱、拆箱，以及整数缓冲区。包装类将基本数据类型转化为引用数据类型，自动装箱和拆箱简化了类型转换。还了解了基本类型和字符串之间的转换方法。整数缓冲区是Java预先创建的常用整数包装类对象，可提高内存利用率。
  - 这节课学习了包装类，它将基本数据类型转换为引用数据类型，如int转为Integer。还学习了装箱和拆箱，可自动转换基本类型和包装类。另外，介绍了整数缓冲区，Java会预先创建一些整数包装类对象以提高性能。
  - 这节课学习了包装类，将基本数据类型转为引用类型，如int转为Integer。学装箱和拆箱，可自动转换基本类型和包装类。了解整数缓冲区，Java预先创建一些整数包装类对象，提高性能。
---
# 跟随狂神学Java

##### 第十五天：包装类；类型转换与装箱、拆箱；Integer缓冲区

> 即使爬到最高的山上，一次也只能脚踏实地的迈一步
>
> *~~[狂神未更新，转千锋教育 (bilibili.com)](https://www.bilibili.com/video/BV1vt4y197nY?spm_id_from=333.337.search-card.all.click)~~*

## 学习内容

##### 什么是包装类

* 基本数据类型所对应的引用数据类型

  在Java中有8种基本类型，我们无法这8中基本类型使用类方法，就比如：

  ~~~java
  int num=10;
  num.selfadd();							//【自己编的，请勿当真】是不行的
  ~~~

  为了能让这些基本类型具有更加强大的功能，于是其对应的引用类型便产生了。这便是基本引用类型的包装类

* Object可统一管理所有类，包装类的默认值是null

  | 基本数据类型 | 包装类型  |
  | ------------ | --------- |
  | byte         | Byte      |
  | short        | Short     |
  | int          | Integer   |
  | long         | Long      |
  | float        | Float     |
  | double       | Double    |
  | boolean      | Boolean   |
  | char         | Character |

  

---

##### 类型转换与装箱、拆箱

###### 什么是装箱和拆箱？

​			比如我在栈中有一个`int num = 10;`然后我想让它进入堆中，但是堆中都是对象，所以我们需要将这个基本类型转化为引用类型。这个过程就叫装箱。同理可得拆箱



* 8种包装类提供不同类型之间的转换方式
  * Number父类（*直接已知子类包括：`BigInteger`、`Byte`、`Double`、`Integer`、`Long`、`Short`）中提供6个共性方法
  * parseXXX()静态方法，可以提供基本类型和字符串之间的转换
  * valueOf()静态方法



###### 装箱拆箱

~~~java
package com.joker_yue.javalearn.object6;

public class Demo01 {
    public static void main(String[] args) {

        //类型转换：装箱：基本类型转换成引用类型的过程

        //基本类型
        int num1= 18;
        //创建一个引用类型的对象
        Integer integer1 = new Integer(num1);
        Integer integer2 = Integer.valueOf(num1);

        //类型转换：拆箱：引用类型转换为基本类型的过程
        Integer integer3 = new Integer(100);
        int num2 = integer3.intValue();

    }
}
~~~

不过上面的方法仅支持JDK1.5及之前的版本，JDK1.5之后支持了自动装箱和拆箱的操作，同时，Integer(int)方法已被弃用

~~~~java
package com.joker_yue.javalearn.object6;

public class Demo01 {
    public static void main(String[] args) {

        //类型转换：装箱：基本类型转换成引用类型的过程

        //基本类型
        int num1= 18;
        //创建一个引用类型的对象
        Integer integer1 = new Integer(num1);
        Integer integer2 = Integer.valueOf(num1);
        System.out.println("装箱");
        System.out.println(integer1);
        System.out.println(integer2);

        //类型转换：拆箱：引用类型转换为基本类型的过程
        Integer integer3 = new Integer(100);
        int num2 = integer3.intValue();
        System.out.println("拆箱");
        System.out.println(num2);

//上述方法在JDK1.5之前使用。在JDK1.5之后提供了自动装箱和拆箱的功能
        int age = 30;
        //自动装箱
        Integer integer4 = age;
        System.out.println("自动装箱");
        System.out.println(integer4);
        //自动拆箱
        int age2=integer4;
        System.out.println("自动拆箱");
        System.out.println(age2);
    }
}

~~~~

我们可以发现，自动装箱的操作其实是将

~~~java
Integer integer4 =  age;
~~~

替换为了

~~~java
Integer integer4 = Integer.valueOf(age);
~~~

来实现的。

同理，自动拆箱的操作是将

~~~java
int age2=integer4;
~~~

替换为

~~~java
int age2 = integer4.intValue();
~~~



###### 基本类型和字符串之间的转换

~~~java
        //1. 基本类型和字符串之间的转换
        int n1 = 100;
        //1.1 使用'+'号
        String s1 = n1+"";
        System.out.println("S1="+s1);
        //1.2使用Integer类的方法
        String s2 = Integer.toString(n1);
        System.out.println("S2="+s2);
        //1.3 toString()还有重载方法
            //比如我们可以将其输出为十六进制
            String s3 = Integer.toString(n1,16);
            System.out.println("十六进制的S3="+s3);


        //2. 字符串转换成基本类型
        String str = "150";
        //使用Integer.parseXXX();
        int n2 = Integer.parseInt(str);
        System.out.println(n2);

        //3. boolean字符串转换为基本类型：
        //"true"-->true
        //非"true"-->false
        String str2 = "true";
        boolean b1 = Boolean.parseBoolean(str2);
        System.out.println(b1);
~~~

上述代码的输出结果为
~~~java
S1=100
S2=100
十六进制的S3=64
150
true
~~~



注意：需保证类型兼容，否则会抛出NumberFormatException异常

---

##### 整数缓冲区

* ==Java预先创建了256个常用的整数包装类型对象==

  不理解？我们首先来看个题

  ~~~java
  //这里是Demo2.java
  
  package com.joker_yue.javalearn.object6;
  
  public class Demo02 {
      public static void main(String[] args) {
          //一道题目
          Integer integer1 = new Integer(100);
          Integer integer2 = new Integer(100);
          System.out.println(integer1==integer2);//【1】会输出true还是false?
  
      }
  }
  ~~~

  上述结果会输出`false`，原因不用多说，懂的都懂

  但是如果我们这样写，又会输出什么呢？

  ~~~java
  //这里是Demo2.java
  
  package com.joker_yue.javalearn.object6;
  
  public class Demo02 {
      public static void main(String[] args) {
          //一道题目
          Integer integer1 = new Integer(100);
          Integer integer2 = new Integer(100);
          System.out.println(integer1==integer2);
  
          Integer integer3=100;
          Integer integer4=100;
          System.out.println(integer3==integer4);//【2】会输出true还是false?
  
      }
  }
  ~~~

  结果是输出`true`，为什么？别急，我们再来看看看这个：

  ~~~java
  //这里是Demo2.java
  
  package com.joker_yue.javalearn.object6;
  
  public class Demo02 {
      public static void main(String[] args) {
          //一道题目
          Integer integer1 = new Integer(100);
          Integer integer2 = new Integer(100);
          System.out.println(integer1==integer2);
  
          Integer integer3=100;
          Integer integer4=100;
          System.out.println(integer3==integer4);
  
          Integer integer5=200;
          Integer integer6=200;
          System.out.println(integer5==integer6);//【3】会输出true还是false?
  
      }
  }
  ~~~

  按照刚才的经验，和【2】一样是自动装箱，输出结果应该是true才对，可实际输出结果却是`false`，为什么？

  按照我们之前所学的，自动装箱其实是调用了Integer.valueOf(int);方法，所以我们这样写也是完全一样的：

  ~~~java
          Integer integer3=Integer.valueOf(100);
          Integer integer4=Integer.valueOf(100);
          System.out.println(integer3==integer4);
  
          Integer integer5=Integer.valueOf(200);
          Integer integer6=Integer.valueOf(200);
          System.out.println(integer5==integer6);
  ~~~

  那么到底是什么原因导致了两个不同呢？答案就处在valueOf()方法上

  我们查看源码，可以发现它是这样写的：

  ~~~java
    @IntrinsicCandidate
      public static Integer valueOf(int i) {
          if (i >= IntegerCache.low && i <= IntegerCache.high)
              return IntegerCache.cache[i + (-IntegerCache.low)];
          return new Integer(i);
      }
  ~~~

  注意这个if语句，IntegerCache.low和Integer.high的值分别为-128和127

  如果我们valueOf(int i)中传入的在-128和127之间，那么就会在IntegerCache.cache[]数组中取，这里面是Integer缓冲区里的已经创建好的对象，否则重新创建一个对象

  现在我们就能解释为什么【2】的输出结果为`true`而【3】的输出结果为`false`了

* 在实际的使用中，能够对已创建的对象进行复用，节省内存消耗