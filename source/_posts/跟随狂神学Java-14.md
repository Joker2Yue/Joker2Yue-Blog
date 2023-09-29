---
title: 跟随狂神学Java-14，常用类学习
date: 2022/08/23 04:02:22
tags:
  - 狂神
  - Java
  - JavaSE
categories:
  - [跟随狂神学Java]
  - [Java]
cover: https://resource.joker2yue.top/blog/images/coverImg/JavaSE/10.jpg
keywords:
  - 匿名内部类
ai:
  - 这节课学习了匿名内部类的概念和使用。匿名内部类是没有类名的局部内部类，必须继承一个父类或者实现一个接口。它的定义、实现和对象创建语法合并在一起，通常用于创建只需使用一次的类。虽然可以减少代码量，但可读性较差。示例中演示了匿名内部类实现一个接口的方式，使得对象创建更加简洁。
  - 这节课学习了匿名内部类，它是没有类名的局部内部类，必须继承一个父类或实现一个接口。匿名内部类将定义类、实现类和创建对象的语法合并，但只能创建一个该类的对象。它有减少代码量的优点，但可读性较差。通过示例演示了如何使用匿名内部类实现接口，简化代码。
  - 学习匿名内部类，它是没有类名的局部内部类，用于实现接口或继承父类，可以简化代码。
---
# 跟随狂神学Java

##### 第十四天：匿名内部类

> 万事开头难，中间难，结尾难
> *~~[狂神未更新，转千锋教育 (bilibili.com)](https://www.bilibili.com/video/BV1vt4y197nY?spm_id_from=333.337.search-card.all.click)~~*

---

## 学习内容

#### 匿名内部类

* 没有类名的局部内部类（一切特征都与局部内部类相同）
  * ==必须继承一个父类或者实现一个接口==
  * 定义类、实现类、创建对象的语法==合并==，==只能创建一个==该类的对象
  * 优点：减少代码量
  * 缺点：可读性较差

---

**我们先按照传统方法写一个试试**：

首先我们创建一个接口

~~~java
//这里是Usb.java
package com.joker_yue.javalearn.object4;

//接口
public interface Usb {
    void service();
}
~~~

然后创建一个main方法

~~~java
//这里是TestUsb.java
package com.joker_yue.javalearn.object4;

public class TestUsb {
    public static void main(String[] args) {
        //创建一个接口类型的变量
        Usb usb = new Mouse();
        usb.service();
    }
}
~~~

~~~java
//这里是Mouse.java
package com.joker_yue.javalearn.object4;

public class Mouse implements  Usb{
    @Override
    public void service() {
        System.out.println("连接电脑成功!");
    }
}
~~~

运行此方法，我们可以得到以下输出

~~~java
连接电脑成功!
~~~

---

**然后我们将其更改为局部内部类实现**

~~~java
//这里是TestUsb.java
package com.joker_yue.javalearn.object4;

public class TestUsb {
    public static void main(String[] args) {
        //创建一个接口类型的变量
        /*Usb usb = new Mouse();
        usb.service();*/

        
        
        //一个实现接口的局部内部类
        class Fan implements Usb{
            @Override
            public void service(){
                System.out.println("风扇连接电脑成功");
            }
        }

        //使用局部内部类来创建对象
        Usb usb = new Fan();
        usb.service();
        
        
        
    }
}

~~~

运行将会生成如下输出信息：

~~~java
风扇连接电脑成功
~~~

---

我们可以发现，在上面的代码中，我们创建了一个Fan类的usb对象，但是此对象只使用了一次，似乎将其单独创建一个对象有些费劲，毕竟还要给此对象起名（起的usb），有些麻烦。于是我们可以懒得起名字，这就是匿名内部类。

**接下来我们尝试将其更改为使用匿名内部类实现**

~~~java
//这里是TestUsb.java
package com.joker_yue.javalearn.object4;

public class TestUsb {
    public static void main(String[] args) {
        //创建一个接口类型的变量
        /*Usb usb = new Mouse();
        usb.service();*/

//        //一个实现接口的局部内部类
//        class Fan implements Usb{
//            @Override
//            public void service(){
//                System.out.println("风扇连接电脑成功");
//            }
//        }
//
//        //使用局部内部类来创建对象
//        Usb usb = new Fan();
//        usb.service();


        //使用匿名内部类优化
        //相当于创建了一个局部内部类
        Usb usb = new Usb(){				//【合并了】
            @Override
            public void service(){
                System.out.println("风扇连接电脑成功");
            }
        };
        usb.service();


    }
}

~~~





⚠️其实匿名内部类在运行中会隐式自动地创建对象名
