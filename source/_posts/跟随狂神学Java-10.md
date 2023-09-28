---
title: 跟随狂神学Java-10，面向对象-3
date: 2022/07/05 04:02:22
tags:
  - 狂神
  - Java
  - JavaSE
categories:
  - [跟随狂神学Java, Java]
cover: /images/coverImg/JavaSE/08.jpg
keywords:
  - 封装
  - 继承
  - 多态
  - 强制类型转换
  - 方法重写
  - instanceof关键字
  - 静态方法和非静态方法的区别
  - 类型转换
  - 隐式类型转换
  - 显式类型转换
ai: 
  - 第十天的学习内容包括封装、继承、多态、以及强制类型转换。封装是将对象的内部数据和实现细节隐藏起来，提高程序的安全性和可维护性。继承允许子类继承父类的属性和方法，实现代码重用。多态使得对象可以表现出多种不同的形态，根据引用类型调用不同的方法。强制类型转换可以将一个对象引用从父类转换为子类，以便访问子类特有的方法。
  - 第十天学习了封装、继承、多态和强制类型转换，这些是面向对象编程的核心概念。封装提高安全性和可维护性，继承允许子类继承父类的属性和方法，多态实现了对象的多种形态，强制类型转换用于在不同类之间转换对象引用。
  - 第十天学习了封装、继承、多态、强制类型转换等面向对象编程核心概念，提高了程序设计的灵活性和可维护性。
---
# 跟随狂神学Java

##### 第十天：面向对象-3

> 人类最大的敌人是傲慢，其次是无知

---

## 学习内容

#### 封装

* 该露的露，该藏的藏

  * 我们程序设计要追求==”高内聚，低耦合“==。

    高内聚：就是类的内部数据操作细节自己完成，不允许外部干涉

    低耦合：仅暴露少量的部分给外部使用
  
* 封装（数据的隐藏）

  * 通常，应禁止直接访问一个对象中数据的实际表现，而应通过操作接口来访问，这称为信息隐藏

* 记住这句话就够了

  ==属性私有，get/set==



~~~java
package com.joker_yue.javalearn.OOP;

public class Student {

        private String name;//名字，申明为private私有

        private int id;//学号

        private char sex;//性别

}
//在Application.java中new一个新对象为s1
//然后尝试对s1.name操作，我们发现无法操作
//但是在Student.java中我们修改name为public的话就可以操作
//也就是被声明为private的变量，无法在其他类中修改
//但是我们得有一个方法来修改这些private的值，但是不能在Application.java中直接对private属性的变量进行修改
//于是我们可以在Student.java中声明一个方法，它可以对name进行修改。在Application.java中，我们需要修改对象的name值的时候，我们就可以调用此方法

/* 快捷键：alt+insert */
~~~



<img src="./跟随狂神学Java-10.assets/image-20220705193832253.png" alt="image-20230805193832253" style="zoom:50%;" />

---

#### 封装的好处

1. 提高程序的安全性
2. 隐藏代码的实现细节
3. 统一接口
4. 提高了系统的维护性

----

#### 继承

* 继承的本质是对某一批类的抽象，从而实现对现实世界更好的建模

* “extends”的意思是”扩展“。子类是父类的继承

* Java中只有单继承，没有多继承

* 继承是类和类之间的一种关系。除此之外，类和类之间的关系还有依赖、组合、聚合等

* 继承关系的两个类，一个为子类（派生类），一个为父类（基类）。子类继承父类，使用关键字extends来表示。

* 子类和父类之间，从意义上讲应该具有”is a“的关系

  

* object类
* super
* 方法重写

~~~~java
//这里是Person类

package com.joker_yue.javalearn.OOP.demo05;

//Person 人 :父类
public class Person {

    public void say(){
        System.out.println("说了一句话");
    }
   
}
~~~~

~~~~java
//这里是Student类

package com.joker_yue.javalearn.OOP.demo05;

//学生 is 人
//子类
public class Student extends Person{
}
~~~~

~~~~java
//这里是Application

package com.joker_yue.javalearn.OOP.demo05;

public class Application {
    public static void main(String[] args) {

        Student s1 = new Student();
        //子类继承了父类，但属性为private无法继承
        s1.say();
    }
}
~~~~

* ==Object类==：在Java中，所有的类默认直接或者间接继承Object类（爷爷辈的）

----

~~~java
//这里是Person类

package com.joker_yue.javalearn.OOP.demo05;

//Person 人 :父类
public class Person {

    protected String name = "Joker";
}
~~~

~~~java
//这里是Student类

package com.joker_yue.javalearn.OOP.demo05;

//学生 is 人
//子类
public class Student extends Person{
    protected String name = "Yue";

    public void test(String name){
        System.out.println(name);//输出方法传入的name
        System.out.println(this.name);//输出当前类的name
        System.out.println(super.name);//输出父类中的name(有的话才生效)
        //在IDEA中，上语句可以Ctrl+鼠标左键完成跳转

    }
}

~~~

上述代码解释了super"指针"的用法

---



~~~java
//这里是Application.java

package com.joker_yue.javalearn.OOP.demo05;

public class Application {
    public static void main(String[] args) {

        Student s1 = new Student();
    }

}
~~~

~~~java
//这里是Person类

package com.joker_yue.javalearn.OOP.demo05;

//Person 人 :父类
//在Java中，所有的类默认直接或者间接继承Object类
public class Person {
    public Person(){
        System.out.println("Person无参执行");
    }

}

~~~

~~~java
//这里是Student类

package com.joker_yue.javalearn.OOP.demo05;

//学生 is 人
//子类
public class Student extends Person{
    public Student(){
        /* 位置1 */
        System.out.println("Student无参执行");
    }
}
~~~

上述代码执行后，会生成以下信息：

~~~java
Person无参执行
Student无参执行
~~~

我们发现是先调用了父类的无参构造，才调用了子类的无参构造。所以我们断定，在`位置1`绝对有一句隐藏代码`super();`也就是：

~~~java
public Student(){
        super();
        System.out.println("Student无参执行");
    }
~~~

但我们不能移动`super();`语句的位置，它必须放在第一句。

但我们的类定义extends==继承自其他类==时，它将隐式的先加载父类。

* super注意点：
  1. super调用父类的构造方法，必须在构造方法的第一个
  2. super必须只能出现在子类的方法或者构造方法中
  3. super和this不能同时调用构造方法
  
* VS this

  1. 代表的对象不同
      ​	this：本身调用者这个对象

    ​	super：代表父类对象的引用
  
  2. 前提
  
     this：没有继承也可以使用
  
     super：只能在继承条件下使用
  
  3. 构造方法
  
     this()：本类的构造
  
     super()：父类的构造

----

#### 方法重写

==**不同于方法重载！**==

引言：在上节课我们了解到：如果子类继承自父类，且父类中有与子类相同名字、参数的方法时，对象调用方法时将会优先调用父类中的。我们如果想让他调用子类中的方法，就需要用到方法重写

~~~java
//这里是A.java

package com.joker_yue.javalearn.OOP.demo05;

public class A extends B{
    public static void test() {
        System.out.println("A=>test()");
    }
}
~~~

~~~java
//这里是B.java

package com.joker_yue.javalearn.OOP.demo05;

//重写都是方法的重写，与属性无关
public class B {
    public static void test() {
        System.out.println("B=>test()");
    }
}
~~~


~~~java
//这里是Application.java

package com.joker_yue.javalearn.OOP.demo05;

public class Application {
    public static void main(String[] args) {

            //方法的调用只和左边 定义的数据类型有关
            A a = new A();
            a.test();//输出 A=>test()

            //父类的引用指向了子类
            //多态的关键：父类引用指向子类对象
            B b = new A();
            b.test();//输出 B=>test()
    }

}
~~~

上述中A是未重载方法的代码，继承自B。此时运行Application.java，会输出以下信息：

~~~java
A=>test()
B=>test()
~~~

---

~~~java
//这里是A.java

package com.joker_yue.javalearn.OOP.demo05;

//继承
public class A extends B{
    @Override   //这个叫做注解，是有功能的注释 Override重写
    public void test() {
        System.out.println("A=>test()");
    }
}
~~~

~~~java
//这里是B.java

package com.joker_yue.javalearn.OOP.demo05;

//重写都是方法的重写，与属性无关
public class B {
    public  void test() {
        System.out.println("B=>test()");
    }
}
~~~

~~~java
//这里是Appliction.java

package com.joker_yue.javalearn.OOP.demo05;

public class Application {
    public static void main(String[] args) {
        	//静态的方法和非静态的方法区别很大！
            //静态方法： //方法的调用只和左边 定义的数据类型有关
        	//非静态：重写
            A a = new A();
            a.test();//输出 A=>test()

            //父类的引用指向了子类
            //多态的关键：父类引用指向子类对象
            B b = new A();//子类重写了父类的方法
            b.test();//输出 A=>test()
    }

}
~~~

运行Application.java，会输出以下信息：

~~~java
A=>test()
A=>test()
~~~

所以静态方法和非静态的方法区别很大

* 即b是A new出来的对象，因此调用了A的方法

  ==因为静态方法是类的方法，而非静态是对象的方法==

  有static时，b调用了B类的方法，因为b是用B类定义的

  没有static时，b调用的是对象的方法，而b是用A类new的

  

总结：static修饰的方法归类所有，叫类的成员，不叫对象的成员（详细可搜static关键字)。



注意：子类要重写父类方法 ，父类方法不一定必须要public 。只要子类重写方法的权限修饰符不必父类更严格就行



使用：因为子类会完全继承父类的方法，但有些时候，子类需要与父类不同的方法，就要进行方法重写

* 需要有继承关系，子类重写父类的方法
* 方法名必须相同
* 参数列表必须相同
* 修饰符：子类重写方法的权限修饰符不必父类更严格就行（父private，子public）
* 抛出的异常：范围可以被缩小，但不能被扩大（ClassNotFoundException < Exception）

----

#### 多态

引言：我们new了一个子类的对象，子类里面有继承父类的方法。

​			在方法重写的前提下，方法名参数都相同，系统该调用哪个的呢？

​			答案是看前面类的类型，写的父类就调父类，写的子类就调子类



* 动态编译：类型：可扩展性

* 即一个方法可以根据发送对像的不同而采取多种不同的行为方式

* 一个对象的实际类型是确定的，但可以指向对象的引用的类型有很多

  

* 多态存在的条件
  有继承关系

  子类重写父类方法

  父类引用指向子类对象

  

* 注意：多态是方法的多态，属性没有多态

* instanceof   类型转换（引用类型之间）



在我们创建对象的时候，创建的对象类型是已知的，但是，对象可以指向的引用类型就不确定了

~~~~java
Student s1 = new Student();//s1是Student类
Person s2 = new Student();//s2是Student类，但是指向了它的父类Person类
Object s3 = new Student();//s3是Student类，但是指向了它的“爷爷类”Object类

//父类的引用指向了子类的类型。同样都是Student类，但是却有不同的引用类型，这就是多态
~~~~

接下来我们看看类

~~~java
//这里是Person类

package com.joker_yue.javalearn.OOP.demo06;

public class Person {
    public void run(){
        System.out.println("run");
    }
}
~~~

~~~java
//这里是Student类

package com.joker_yue.javalearn.OOP.demo06;

public class Student extends Person{
    @Override
    public void run() {
        System.out.println("son");
    }
}
~~~

我们尝试在Application.java中运行下示代码

~~~java
//这里是Application类

package com.joker_yue.javalearn.OOP.demo06;

public class Application {
    public static void main(String[] args) {
        Student s1 = new Student();
        Person s2 = new Student();
        Object s3 = new Student();

        s2.run();
        s1.run();
    }
}
~~~

它最终会输出

~~~java
son
son
~~~

原因：在`s2.run();`中，子类Student重写了父类的方法，执行时优先执行子类的方法

---

现在我们在Student类中加个eat方法：

~~~java
//这里是Student类

package com.joker_yue.javalearn.OOP.demo06;

public class Student extends Person{
    @Override
    public void run() {
        System.out.println("son");
    }
    public void eat(){
        System.out.println("eat");
    }
}
~~~

并尝试在Application.java输出：

~~~java
s2.eat();
~~~

会发现报错，是因为s2中没有eat()方法。（s2的引用类型是Person类）

所以，对象能使用的方法，由引用类型决定。（由左边决定，和右边关系不大）

~~~java
Person s2 = new Student();
引用类型 对象名 = 创建对象类型
~~~

于是

~~~java
Student s1 = new Student();
//Student能调用的方法都是自己的或者继承自父类的
Person s2 = new Student();
//Person父类型，可以指向子类，但是不能调用子类独有的方法
~~~

---

多态的注意事项：

* 多态是方法的多态，属性没有多态

* 父类和子类。否则会类型转换异常ClassCastException

* 存在条件
  1. 继承关系
  2. 方法需要重写
  
* 存在条件：继承关系，方法需要重写，父类引用指向子类对象 Father f1 = new Son();

  ​	有些方法无法重写，比如static方法，因为它是属于类的，和类一起加载的，不属于实例

  ​	还有final常量

  ​	private方法

~~多态的概念，可以理解为：方法的调用除了本类对象可以调用自己以外，在方法重写里还可以通过父类对象的引用来调用自己~~

---

#### instanceof关键字

可以判断两个类之间是否有父子关系

比如我们有下列代码

~~~java
//Person类

package com.joker_yue.javalearn.OOP.demo06;

public class Person {
}

~~~

~~~java
//Student类，继承自Person

package com.joker_yue.javalearn.OOP.demo06;

public class Student extends Person{

}
~~~

~~~java
//Teacher类，继承自Person

package com.joker_yue.javalearn.OOP.demo06;

public class Teacher extends Person {

}
~~~

~~~java
//Application.java

package com.joker_yue.javalearn.OOP.demo06;

public class Application {
    public static void main(String[] args) {
        Object obj = new Student();
        System.out.println(obj instanceof Student);
        System.out.println(obj instanceof Person);
        System.out.println(obj instanceof Object);
        System.out.println(obj instanceof Teacher);
        System.out.println(obj instanceof String);
    }
}
~~~

运行Application.java，会生成下列消息：

~~~java
true
true
true
false
false
~~~

这里3个true，2个false

3个true比较好理解，因为obj是Student类的对象。输出语句中都是Student类的父类

2个false是因为不是父类

---

然后我们尝试new一个新对象，让其引用指向Person类

~~~java
package com.joker_yue.javalearn.OOP.demo06;

import java.io.ObjectStreamField;

public class Application {
    public static void main(String[] args) {
        Person obj2 = new Student();
        System.out.println(obj2 instanceof Student);
        System.out.println(obj2 instanceof Person);
        System.out.println(obj2 instanceof Object);
        System.out.println(obj2 instanceof Teacher);
        System.out.println(obj2 instanceof String);			//【1】
    }
}
~~~

其中【1】位置语句不等编译就提示出错了。原因是Obj2的==引用==Person类继承自Object类，而语句中的String类也是。使用同父类的两个子类不能相互比较

我们将【1】语句删除后再运行，会输出以下信息：

~~~java
true
true
true
false
~~~

---

那我们再试试new一个新对象，其引用指向Student类

~~~java
package com.joker_yue.javalearn.OOP.demo06;

import java.io.ObjectStreamField;

public class Application {
    public static void main(String[] args) {
        Student obj3 = new Student();
        System.out.println(obj3 instanceof Student);
        System.out.println(obj3 instanceof Person);
        System.out.println(obj3 instanceof Object);
        System.out.println(obj3 instanceof Teacher);		//【2】
        System.out.println(obj3 instanceof String);			//【1】
    }
}
~~~

也是可以看到【1】【2】直接报错了，还是一样的原因，obj3的引用与Teacher拥有相同的父类。

我们同样将其删除再运行

~~~java
true
true
true
~~~





总结：编译看左边，运行看右边。

---

#### 强制转换

引言：上节课我们学习了多态，多态可以按照我们的想法定义对象引用的类，从而调用引用的类中的方法。但是，我们不一定总是只使用引用的类的方法，可能我们会用回来原来对象的类的方法。这时候我们需要强制转化。



接下来我们向Person类和Student类中写点方法

~~~java
//这里是Person类

package com.joker_yue.javalearn.OOP.demo06;

public class Person {
    public void run(){
        System.out.println("run");
    }
}

~~~

~~~java
//这里是Student类

package com.joker_yue.javalearn.OOP.demo06;

public class Student extends Person{
        public void go(){
            System.out.println("go");
        }
}

~~~

~~~java
//Appliction.java

package com.joker_yue.javalearn.OOP.demo06;

public class Application {
    public static void main(String[] args) {
       Person obj = new Student();
        obj.go();							//【1】
    }
}

~~~

此时【1】语句报错，原因是obj的引用类型为Person类，Person类中没有go方法。

如果我们想要能让obj使用go()方法，我们需要将其转化为Student类。

~~~java
//Appliction.java

package com.joker_yue.javalearn.OOP.demo06;

import java.io.ObjectStreamField;

public class Application {
    public static void main(String[] args) {
        //类型之间的转化： 父        子

        //高                 低
        Person obj = new Student();
        //Person为高类型，Student为低类型

        //tempObj 将这个对象转化为Student类型。这样我们就可以使用Student类中的方法了
        Student tempObj = (Student) obj;		//【1】
        tempObj.go();							//【2】
    }
}
~~~

虽然我们定义其引用为高类型，但是我们可以通过类型转化将其转化为低类型，这样就可以使用低一级的方法了

【1】【2】也可以直接写成这样：

~~~java
( (Student)obj ).go();
~~~



总结与思考：在各种编程语言中，从低转高的转化总是隐式地发生，比如int可以自动转化为double类型。在Java中，子类也可隐式的转化为父类，但是可能会丢失部分子类的方法。

低（子）转高（父）时，由于子已经继承了父的所有，所以删去属于自己的后自然而然就可以转化问父类的；而父想要转子，则需要重新开辟只属于子的空间，则需用强制转换。

不同的是，从高转低一般不会隐式的发生，因为这可能发生精度或方法的丢失。如果实在需要，则需要开发者显式定义出来。用在本节，就是强制转化

 
