---
title: 跟随狂神学Java-11，面向对象-4
date: 2022/07/06 04:02:22
tags:
  - 狂神
  - Java
  - JavaSE
categories:
  - [跟随狂神学Java]
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
  - 静态关键字
  - 代码块
  - final关键字
  - 抽象类
  - 接口
  - 内部类
  - 多继承
  - 静态内部类
  - 局部内部类
  - 匿名内部类
  - 匿名对象
ai: 
  - 这篇学习笔记总结了Java编程中的面向对象编程相关概念，包括`static`关键字、代码块、`final`关键字、抽象类、接口、内部类、以及匿名对象的用法。它们是Java编程中重要的概念，用于实现面向对象的程序设计。
  - 这篇学习笔记总结了Java编程中的关键概念，包括`static`关键字、代码块、`final`关键字、抽象类、接口、内部类、和匿名对象。这些概念有助于理解面向对象编程的基本原理和Java语言中的重要特性。
  - 这篇学习笔记：涵盖static、final、抽象类、接口、内部类等面向对象编程概念。
---
# 跟随狂神学Java

##### 第十一天：面向对象-4

> 坚持就是胜利，加油，奥里给！

---

## 学习内容

#### static关键字

假设我们有如下代码

~~~java
//这里是Student.java

package com.joker_yue.javalearn.OOP.demo07;

import com.joker_yue.javalearn.method.Students;

//Static
public class Student {
    private static int age;//静态的变量
    private double score;//非静态的变量

    public static void main(String[] args) {
        Student stu1 = new Student();
        System.out.println(Student.age);
        System.out.println(Student.score);			//【1】
        System.out.println(stu1.age);
        System.out.println(stu1.score);
    }


}

~~~

那么上述中【1】将会报错，显示   *无法从 static 上下文引用非 static 字段 'score'*

static变量属于类，而非static变量属于对象。从static无法直接访问非static变量，需要指明所在的对象。而非static可以直接访问static。

变量如此，那方法呢？

~~~~java
//这里是Student.java

package com.joker_yue.javalearn.OOP.demo07;

import com.joker_yue.javalearn.method.Students;

//Static
public class Student {
    private static int age;//静态的变量
    private double score;//非静态的变量

    public static void main(String[] args) {
        Student.run();					//【1】
        Student.go();
    }

    public void run(){
    }

    public static void go(){
    }
}
~~~~

我们发现，【1】语句也会报错。所以，对于方法，也是同样的道理。

---

#### 代码块

~~~java
package com.joker_yue.javalearn.OOP.demo07;

public class Person {
    {
        //代码块(匿名代码块）
        //在创建对象时加载
    }
    
    static
    {
        //静态代码块
        //在加载类的时候一并加载
    }
}
~~~

上面写出了代码块的一般解释，让我们试试写点语句进去

~~~java
//这里时Person.java

package com.joker_yue.javalearn.OOP.demo07;

public class Person {
    {
        System.out.println("匿名代码块");
    }

    static
    {
        System.out.println("静态代码块");
    }

    public Person(){
        System.out.println("构造方法");
    }

    public static void main(String[] args) {
        Person person = new Person();

    }
}
~~~

运行后发现其输出为：

~~~java
静态代码块
匿名代码块
构造方法
~~~

---

我们说static方法只执行一次，我们再加点代码试试

~~~java
///这里是Person.java


package com.joker_yue.javalearn.OOP.demo07;

public class Person {
    {
        System.out.println("匿名代码块");
    }

    static
    {
        System.out.println("静态代码块");
    }

    public Person(){
        System.out.println("构造方法");
    }

    public static void main(String[] args) {
        Person person = new Person();
        System.out.println("=============");
        Person person1 = new Person();

    }
}
~~~

运行结果为

~~~java
静态代码块
匿名代码块
构造方法
=============
匿名代码块
构造方法
~~~

可以证实，static代码块只执行一次

---

原因： static代码块只在类加载的时候运行一次，匿名代码块在创建对象时加载。构造方法在创建对象完成后加载，所以我们也常常用构造方法来给对象赋初始值、



---

#### 不想老是写 <u>*类名.对象名.方法名()*</u> 怎么办

~~~java
package com.joker_yue.javalearn.OOP.demo07;

public class Test {
    public static void main(String[] args) {
        System.out.println(Math.random());
    }
}
~~~

其中我们要写好多次Math.random()    太麻烦了

~~~java
package com.joker_yue.javalearn.OOP.demo07;

import static java.lang.Math.random;//静态导入包

public class Test {
    public static void main(String[] args) {
        System.out.println(random());
    }
}
~~~

我们可以对包进行静态导入，这样我们就可以~~偷懒~~解放双手

---

#### final关键字

~~~~java
//这里是Person.java

package com.joker_yue.javalearn.OOP.demo07;

public final class Person {
    
}

~~~~

~~~java
//这里是Student.java

package com.joker_yue.javalearn.OOP.demo07;

public class Student extends Person {				//【1】
 
}
~~~

这时【1】处报错，提示无法继承 （*无法从final 'com.joker_yue.javalearn.OOP.demo07.Person' 继承*）

如果我们非得继承声明为final 的类，需要导包。

~~~java
//这里是Student.java

package com.joker_yue.javalearn.OOP.demo07;

import com.joker_yue.javalearn.OOP.demo06.Person;

public class Student extends Person {
 
}
~~~

---

#### 抽象类

引言：在项目开发中，我们可能遇到一些暂时无法实现的方法。如果我们写成空方法留在那里，那么方法一多，就有可能遗忘。所以我们使用抽象类，防止在这种情况。



* ==abstract==关键字可以用来修饰方法也可以修饰类，如果修饰方法，那么该方法就是抽象方法；如果修饰类，那么就是抽象类

* 抽象类中可以没有抽象方法，但是有抽象方法的类一定要申明为抽象类。

* 抽象类 不能使用new关键字来创建对象，只能由子类来继承。

* 抽象方法： 只有方法的申明，没有方法的实现，它时用来让子类来实现的。

* 子类继承抽象类，那么就必须要实现抽象类没有实现的抽象方法，否则，子方法也要声明为抽象类

~~~java
//这里是Action.java

package com.joker_yue.javalearn.OOP.demo08;

//抽象类
public abstract class Action {

    //abstract 抽象方法，只有方法名，没有方法实现
    public abstract void doSth();
    
}
~~~

~~~java
//这里是A.java

package com.joker_yue.javalearn.OOP.demo08;

public class A extends Action{				//【1】
}

~~~

我们尝试让A类继承Action类时，【1】处会报错，提示我们需要完成Action类中未完成（声明为抽象）的方法或者直接也将A声明为抽象类（*类 "A" 必须声明为抽象，或为实现 "Action" 中的抽象方法 "doSth()"*）

我们可以alt+insert然后选择`1实现方法`

~~~java
//这里是A.java

package com.joker_yue.javalearn.OOP.demo08;

public class A extends Action{
    @Override
    public void doSth() {
        
    }
}
~~~

Java的类只能单继承，但是接口可以多继承

---

抽象类的特点

1. 不能new出来，只能靠子类继承
2. 抽象类中可以写普通方法，但是抽象方法必须写在抽象类中



---

#### 接口

普通类： 只有具体实现

抽象类：具体实现和规范（抽象方法）都有

接口：只有规范！自己无法写方法，专业的约束！约束和实现分离：面向接口编程



==接口就是规范，定义的是一组规则==，体现了现实世界中“如果你是，则必须”的思想。如果你是天使，则必须能飞，如果你是汽车，就必须要能跑...

接口的本质是契约，就像我们的法律一样，==制定好后大家都遵守==

OOP的精髓，是对对象的抽象，最能体现这一点的就是接口，为什么我们讨论设计模式都只针对具备了抽象能力的语言（比如C++，Java，C#），就是因为设计模式所研究的，实际上就是如何合理的去抽象

==声明类的关键字是class，声明接口的关键字是interface==





我们尝试新建一个接口，然后在里面加方法试试

~~~java
//这里是UserService接口

package com.joker_yue.javalearn.OOP.demo09;

public interface UserService {
    public void run(){							//【1】
        
    }
    
}
~~~

我们发现在【1】处报错，提示不能在接口里写方法（*接口 abstract 方法不能有主体*）

~~~java
//这里是UserService接口

package com.joker_yue.javalearn.OOP.demo09;

public interface UserService {
    //接口中的所有定义其实都是抽象的 public sbstract
     void run();								//【1】
    
}

~~~

如果我们将【1】处的run方法显示声明为public，也就是

~~~~java
public void run();
~~~~

IDEA给出提醒说public冗余（*修饰符 'public' 对于接口成员是冗余的*）



对于一般的架构师，他们可能这样写：

~~~~java
//这里是userService接口

package com.joker_yue.javalearn.OOP.demo09;

public interface UserService {
    //接口中的所有定义其实都是抽象的
    void run(String name);
    void add(String name);
    void delete(String name);
    void update(String name);
    void query(String name);
        
}

~~~~

这里我们就做出了一般的增删改查操作，而对于接口，光定义不行，得有==实现类==

~~~java
//这里是UserService的实现类

package com.joker_yue.javalearn.OOP.demo09;

//抽象类： extends
//类可以实现接口 implements接口
//实现了接口的类，就需要重写方法


public class UserServiceImpl implements UserService{
    @Override
    public void run(String name) {

    }

    @Override
    public void add(String name) {

    }

    @Override
    public void delete(String name) {

    }

    @Override
    public void update(String name) {

    }

    @Override
    public void query(String name) {

    }
}
~~~

----

#### 多继承

好的我们再写一个接口

~~~java
//这里是TimeService接口

package com.joker_yue.javalearn.OOP.demo09;

public interface TimeService {
    void time();
}

~~~

然后你会以为我会针对此接口又单独创建一个文件？不，我们直接在UserServiceImpl.java写

~~~java
package com.joker_yue.javalearn.OOP.demo09;

//抽象类： extends
//类可以实现接口 implements接口
//实现了接口的类，就需要重写方法


public class UserServiceImpl implements UserService,TimeService{
    @Override
    public void run(String name) {

    }

    @Override
    public void add(String name) {

    }

    @Override
    public void delete(String name) {

    }

    @Override
    public void update(String name) {

    }

    @Override
    public void query(String name) {

    }

    @Override
    public void time() {
        
    }
}

~~~

==可以看到我们的重写的方法也没有报错，这反映了接口的多继承特性==

在接口中我们可以定义一些"变量"，好吧，其实它们都是常量，比如：

~~~java
//这里是userService接口

package com.joker_yue.javalearn.OOP.demo09;

public interface UserService {
    
    int age = 18;
    
    //接口中的所有定义其实都是抽象的
    void run(String name);
    void add(String name);
    void delete(String name);
    void update(String name);
    void query(String name);
}

~~~

看`int age = 18;`，它隐式的加上了修饰符，其实它应该是`public static final int age = 18;`

----

接口的作用：

1. 约束
2. 定义一些方法，让不同的人实现
3. public abstract
4. public static final
5. 接口不能被实例化：接口中没有构造方法
6. implements 可以实现多个接口
7. 必须要重写接口中的方法

---

#### 内部类

* 内部类就是在一个类的内部再定义一个类，比如在A类中定义一个B类，那么B类对于A类就是内部类，同理A类对于B类来说是外部类
  1. 成员内部类
  2. 静态内部类
  3. 局部内部类
  4. 匿名内部类

我们以后可能会遇到一些奇葩，在类里面写类，无限套娃，那这种代码我们如何去理解呢

~~~~java
//这里是Outer.java

package com.joker_yue.javalearn.OOP.demo10;

public class Outer {
    private int id;

    public void out(){
        System.out.println("这是外部类的方法");
    }

     public class Inner{									//【1】
        public void in(){
            System.out.println("这是内部类的方法");
        }
         
         public void getID(){
			System.out.println(id);
         }

    }
}

~~~~

我们在【1】处定义了一个内部类，我们可以通过这个内部类访问外部类的一些私有成员

~~~java
//这里是Application.java

package com.joker_yue.javalearn.OOP.demo10;

public class Application {
    public static void main(String[] args) {
        //new 外部类
        Outer outer = new Outer();

        //new 内部类
        //通过这个外部类来实例化内部类
        Outer.Inner inner = outer.new Inner();
        inner.in();
    }
}

~~~

可以看到，我们new和使用内部类的时候，我们的语法也是和一般类的用法没什么两样的

都是	`类.方法()`

只是内部类用起来的话是	`外部类.内部类`

---

#### 静态内部类

现在我们将Inner类修饰为static

~~~~java
package com.joker_yue.javalearn.OOP.demo10;

public class Outer {
    private int id;

    public void out(){
        System.out.println("这是外部类的方法");
    }

   public static class Inner{
        public void in(){
            System.out.println("这是内部类的方法");
        }
       
        public void getID(){					//【1】
            System.out.println(id);
        }

    }
}

~~~~

我们可以发现，内部类拿不到id了

内部类可访问static,但是static的内部类不能访问外部非static属性

---

#### 另一种内部类的申明方法

~~~~java
package com.joker_yue.javalearn.OOP.demo10;

public class Outer {

}

class  A{											//【1】
    
}
~~~~

【1】处的class无法声明为public，因为一个类中只能有一个public class，但是可以有许多class

---

#### 局部内部类

~~~java
package com.joker_yue.javalearn.OOP.demo10;

public class Outer {

    public void method(){
        class Inner{								//【1】
            
        }
    }
}
~~~

【1】处的class为局部内部类

---

#### 匿名对象的使用

~~~java
package com.joker_yue.javalearn.OOP.demo10;

public class Test {
    public static void main(String[] args) {
        //没有名字的类
        new Apple().eat();							//【1】
    }
}

class Apple{
    public void eat(){
        System.out.println("吃了");
    }
}
~~~

【1】处申明了一个没有名字的类，不用将实例保存到变量中

同样的，我们可以申明一个没有名字的接口

~~~java
package com.joker_yue.javalearn.OOP.demo10;

public class Test {
    public static void main(String[] args) {
		//没有名字的接口
        new UserService(){
            @Override
            public void hello() {

            }
        };
    }
}

interface UserService{
    void hello();
}
~~~

