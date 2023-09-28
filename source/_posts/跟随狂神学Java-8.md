---
title: 跟随狂神学Java-08，面向对象-1
date: 2022/07/03 04:02:22
tags:
  - 狂神
  - Java
  - JavaSE
categories:
  - [跟随狂神学Java]
  - [Java]
cover: /images/coverImg/JavaSE/08.jpg
keywords:
  - 面向对象编程
  - 面向过程
  - 面向对象思想
  - 封装
  - 继承
  - 多态
  - 静态方法
  - 普通方法
  - Java按值传递
  - 类与对象的关系
  - 使用new关键字创建对象
  - 构造方法
ai: 
  - 第八天的学习聚焦于面向对象编程的基本概念和使用方法。我们了解了面向过程和面向对象思维方式的区别，以及面向对象编程的三大特征：封装、继承、多态。在方法的调用方面，学习了静态方法和普通方法的区别，以及Java是按值传递的原理。此外，我们深入探讨了类与对象的关系，以及如何使用new关键字创建对象和调用构造方法。这些概念和技巧为后续的面向对象编程打下了坚实的基础。
  - 第八天的学习重点是面向对象编程的基本概念和方法。我们对面向过程和面向对象思维方式进行了比较，强调了面向对象编程的三大特征：封装、继承、多态。还学习了静态方法和普通方法的差异，以及Java按值传递的原理。同时，深入了解了类与对象的关系，学习了如何使用new关键字创建对象和调用构造方法。这些知识为后续的面向对象编程提供了坚实的基础。
  - 第八天学习面向对象编程，了解面向过程与面向对象思维方式，静态与普通方法区别，对象创建与构造方法。
---
# 跟随狂神学Java

##### 第八天：面向对象-1

> 步入正轨

---

## 学习内容

#### 初识面向对象

* 面向过程思想

  1. 步骤清晰简单，第一步做什么，第二步做什么
  2. 面对过程适合处理一些较为简单的问题
  
* 面向对象思想

  1. 物以类聚，`分类`的思维模式，思考问题首先会解决哪些需要分类，然后对这些分类进行单独思考。最后，才对某个分类下的细节进行面向过程的思索

  2. 面向对象适合处理复杂的问题，适合处理需要多人合作的问题

* 对于描述复杂的事物，为了从宏观上把握，从整体上合理分析，我们需要使用面向对象的思路来分析整个系统。但是，具体到微观操作，仍然需要面向过程的思路去处理

#### 什么是面向对象

* 面向对象编程(Object-Oriented Programming , OOP)
* 面向对象编程的本质就是：==以类的方式组织代码，以对象的组织（封装）数据==
* 抽象
* 三大特征：
  1. 封装
  2. 继承
  3. 多态
* 从认识论角度考虑是先有对象后有类。对象，是指具体的事物。类，是抽象的，是对对象的抽象
* 从代码运行的角度考虑是先有类后有对象。类是对象的模板

~~封装就是第一题、第二题，或者语文卷子、数学卷子~~

~~继承就是直角三角形继承自三角形，前者是后者的子类~~

~~而继承必然导致多态，有直角三角形，就必然有非直角三角形等等~~

----

#### 方法的调用

* 静态方法

  > 要想在Teacher中调用Students.say()，应当将Students.say()设为static

  

  ![在这里插入图片描述](./跟随狂神学Java-8.assets/f9ff1d56adb34e75adcd459fcb43b49f.png)

![在这里插入图片描述](./跟随狂神学Java-8.assets/1f8db414ddc14950a2028d729536d2c7.png)

注意：同一个类中，若a()为static，b()为非静态方法。那么，a()无法直接调用b()，b()可以直接调用a()。

因为声明为static的方法，随类一起加载。而普通方法，只有在实例化后才会加载

---

#### Java是按值传递的

~~~java
package com.joker_yue.javalearn.method;

public class anZhiChuanDi {
    public static void main(String[] args) {
        int a =1;
        System.out.println(a);//输出a的值

        anZhiChuanDi.change(a);//改变a的值？
        System.out.println(a);//输出a的值

    }

    public static void change(int a){
        a=10;
    }
}
~~~

上述代码执行后，会输出”1 1”

原因是Java按值传递，在anZhiChuanDi.change(a)语句中传递了a，但在change(int a)中，没有返回值，其中的a也是形式参数。

---

#### 类与对象的关系

==类是一种抽象的数据类型，它是对某一类事物整体的描述/定义，但是并不能代表某一个具体的事物==

1. 动物、植物、手机、电脑
2. Person类、Pet类、Car类等，这些都是用来描述/定义某一些具体的事物应该具备的特点和行为



==对象是抽象概念的具体实例==

1. 张三就是人的一个具体实例，张三家里的旺财就是狗的一个具体实例
2. 能够体现出特点，展现出功能的是具体的实例，而不是一个抽象的概念

----

#### 使用new关键字创建对象

使用new关键字创建的时候，除了分配内存空间之外，还会给`创建好的对象`进行默认的初始化 以及对 `类中构造器`的调用

类中的构造器也称为构造方法，是在进行创建对象的时候必须要调用的。并且构造器有以下两个特点：

	1. 必须与类的名字相同
	1. 必须没有返回类型，也不能写void

~~建议：一个项目中只有一个main方法~~

~~~java
//这里是Student类

package com.joker_yue.javalearn.OOP;


//学生类
public class Student {
    //属性：字段
    //不赋初始值！
    String name;
    int age;

    //方法
    public void study(){
        System.out.println(this.name+"在学习");
    }

}

~~~

~~~java
//这里是Teacher类，包含了main()方法

package com.joker_yue.javalearn.OOP;

import com.joker_yue.javalearn.method.Students;

public class Teacher {
    public static void main(String[] args) {

        //类:抽象的，实例化
        //实例化后会返回一个自己的对象
        //student对象就是一个Student类的具体的实例
        Student xiaoming = new Student();
        Student xiaohong = new Student();

        xiaohong.name = "小红";
            xiaohong.age = 18;
        xiaoming.name = "小明";
            xiaoming.age = 19;

        System.out.println(xiaoming.name);
        System.out.println(xiaohong.age);

    }
}

~~~

