---
title: 跟随狂神学Java-09，面向对象-2
date: 2022/07/04 04:02:22
tags:
  - 狂神
  - Java
  - JavaSE
categories:
  - [跟随狂神学Java]
  - [Java]
cover: https://resource.joker2yue.top/blog/images/coverImg/JavaSE/08.jpg
keywords:
  - 构造器概念
  - 构造器种类
  - 对象的内存分析
  - 类与对象的基本概念
  - 方法的定义和调用
  - 属性的默认初始化
ai: 
  - 第九天学习Java中的构造器概念，构造器的种类和作用，对象的内存分析，以及类与对象的基本概念，方法的定义和调用，属性的默认初始化等基本概念。
  - 第九天学习了Java构造器的使用和内存分析，以及类与对象的关系、方法的调用、属性的默认初始化、对象的创建和使用，以及类的基本概念。
  - 第九天的学习聚焦在Java中的构造器使用、内存分析、类与对象关系、方法调用、属性默认初始化、对象创建和使用，以及类的基本概念。这些内容帮助理解面向对象编程的核心概念和实际应用。
---
# 跟随狂神学Java

##### 第九天：面向对象-2

> 且将新火试新茶，诗酒趁年华

---

## 学习内容

#### 构造器详解

~~~~java
//这里是Application.java

package com.joker_yue.javalearn.OOP;

public class Application {
    public static void main(String[] args) {
        //new 实例化了一个对象
        //此时，在Person.java中只声明了Person类但是什么也没写
        //一个类即使什么都不写，也会存在一个方法

        //无参
        Person person = new Person();
        System.out.println(person.name);

        //有参
        Person xiaoMing = new Person("小明");
        System.out.println(xiaoMing.name);

    }
}
~~~~

~~~java
//这里是Person.java

package com.joker_yue.javalearn.OOP;

public class Person {

        //一个类即使什么都不写，也会存在一个方法
        String name;

        //实例化初始值
        // 显式的定义构造器
        //作用：
        //1. 使用new关键字，本质是在调用构造器
        //2. 用来初始化值

        public Person(){
            this.name = "Joker_Yue";
        }

        //有参构造：一旦定义了有参构造，无参构造必须显式定义（写出来）
        public Person(String name){
            this.name = name;
        }

}
~~~

使用new关键字创建的时候，除了分配内存空间之外，还会给`创建好的对象`进行默认的初始化 以及对 `类中构造器`的调用

类中的构造器也称为构造方法，是在进行创建对象的时候必须要调用的。并且构造器有以下两个特点：

 	1. 必须与类的名字相同
 	2. 必须没有返回类型，也不能写void

---

#### 创建对象内存分析

~~~java
//这里是Application.java

package com.joker_yue.javalearn.OOP;

public class Application {
    public static void main(String[] args) {

        Pet dog = new Pet();
        dog.name = "旺财";
        dog.age = 3;
        dog.shut();
    }
}
~~~

~~~java
//这里是Pet.java

package com.joker_yue.javalearn.OOP;

public class Pet {
        String name;
        int age;

        //无参构造
        public void shut(){
            System.out.println("你在狗叫什么！");
        }
    }
~~~

1. 加载Application类

   main()

   常量池：旺财

2. main()方法执行
   加载Pet类模板(都是默认值)：name,age,shut()

3. 生成Dog对象（引用或者对象名）

   new了一个对象为Dog，其实先在堆上开辟空间，再用引用指向Dog变量（对象）

   ~创建dog后，系统会先对属性初始化，赋予初始值，然后后面才是用户自己调用函数来修改这些属性的值。~

   

总结：new方法，先在堆上开辟空间，再用引用指向。随后加载调用类，将调用类的方法引入，引入的类中的方法都没有进行赋值，类生成的实例对象名(引用)放在栈中，真正生成对象各个赋值变量位于堆中

![内存分析](./跟随狂神学Java-9.assets/18d096a392694ad699c991a4554cecd6.png)

---

#### 类与对象小结

1. 类与对象

   类是一个==模板==：抽象

   对象是一个==具体的实例==

2. 方法

   定义、调用！

3. 对应的引用

   引用类型： 基本类型

     对象是通过==引用==来操作的：栈-->堆

4. 属性

   字段Field 成员变量

   默认初始化：

   * 数字：0；0.0
   * char：'\u0000'
   * boolean：false
   * 引用：null
   
   **修饰符 属性类型 属性名 = 属性值！**

5.  对象的创建和使用

   - 必须使用new关键字创造对象，构造器 Person jk= new Person();

   - 对像的使用：jk.name;
   - 对象的方法： jk.sleep();

6. 类

   静态的属性	属性

   动态的行为	方法

封装、继承、多态
