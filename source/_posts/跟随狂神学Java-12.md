---
title: 跟随狂神学Java-12，异常
date: 2022/08/20 04:02:22
tags:
  - 狂神
  - Java
  - JavaSE
categories:
  - [跟随狂神学Java, Java]
cover: /images/coverImg/JavaSE/09.jpg
keywords:
  - 异常
  - Exception
  - 检查性异常
  - 运行时异常
  - 错误
  - Error
  - Throwable
  - 异常处理机制
  - try
  - catch
  - finally
  - throw
  - throws
  - 自定义异常
  - myException
  - 实际应用中的经验总结
  - 逻辑规避
  - printStackTrace()
  - 资源释放
ai: 
  - 这篇学习笔记总结了Java中的异常处理内容，包括异常的概念、异常的分类（检查性异常、运行时异常、错误）、异常处理框架、自定义异常、以及实际应用中的经验总结。异常处理是Java编程中非常重要的一部分，它允许程序在遇到问题时进行优雅的处理而不致崩溃。同时，笔记还提到了一些异常处理的最佳实践，如合理规避异常、多重catch块、适当处理异常、释放资源等。
  - 这篇学习笔记总结了Java异常处理的基本概念、异常分类（检查性异常、运行时异常、错误）、异常处理框架和自定义异常。此外，它提供了一些实际应用中的经验总结，如处理运行时异常、多重catch块、适当处理异常、释放资源等。异常处理是Java编程中的关键概念，允许程序在出现问题时进行优雅的处理，而不会导致崩溃。
  - 这篇学习笔记总结了Java异常处理的核心概念，包括异常分类（检查性异常、运行时异常、错误）、异常处理框架（try-catch-finally）、自定义异常的创建和使用，以及在实际应用中的建议（如合理规避异常、多重catch块、适当处理异常、释放资源）。 Java异常处理是确保程序稳定性的关键部分。
---
# 跟随狂神学Java

##### 第十二天：异常

> 人最大的敌人就是自己

---

## 学习内容

#### 什么是异常

在实际工作中，遇到的情况不可能是非常完美的，可能程序跑着跑着就会遇到一些异常问题，异常==Exception==，意思是例外。我们需要让我们的程序做出合理的异常处理，以不至于程序崩溃

异常指程序运行过程中出现的不期而至的各种情况：比如文件找不到，网络连接错误，非法参数等

异常发生在程序运行期间，它影响了正常的程序执行流程

~~~~java
//这里是demo01.java

package com.joker_yue.javalearn.exp;

public class demo01 {
    public static void main(String[] args) {
        System.out.println(11/0);
    }
}
~~~~

它会输出以下异常

~~~Java
Exception in thread "main" java.lang.ArithmeticException: / by zero
	at com.joker_yue.javalearn.exp.demo01.main(demo01.java:5)
~~~

#### 简单分类

要理解Java异常处理是如何工作的，需要掌握以下三种类型的异常

1. 检查性异常：最具代表性的检查性异常是用户错误或问题引起的异常，这是程序员无法预见的。例如打开一个不存在的文件时，一个异常就发生了，这些异常在编译时不能被简单的忽视
2. 运行时异常：运行时异常时可以被程序员避免的问题，与检查性异常相反，运行时异常可以在编译时被忽略
3. 错误Error：错误不是异常，而是脱离程序员控制的问题。错误在代码中通常被忽略。例如，当栈满溢出，一个错误就发生了，它们在编译也检查不到

异常处理框架

1. Java可以将异常当作对象处理，并定义一个基类java.lang.Throwable作为所有异类的超类
2. 在Java API中已经定义了许多的异常类，这些异常类分为两大类，错误==Error==和异常==Exception==

![Error&Exception](./跟随狂神学Java-12.assets/343e85f9e193407cab71869fd25190ed.png)

---

#### Error

* error类对象由Java虚拟机生成并抛出，大多数错误与代码编写者所执行的操作无关
* Java虚拟机运行错误（Virtual MachineError） ，当JVM不再有继续执行操作所需的内存资源时，将会抛出OutOfMemoryError。这些异常发生时，Java虚拟机一般选择线程终止
* 还有发生在虚拟机试图执行应用时，如果类定义错误（NoClassDefFondError）、链接错误（LinkageError）。这些错误是不可查的，因为它们在应用程序的控制和处理能力之外，而且绝大多数是程序运行时不允许出现的状况。

---

#### Exception

* 在Exception分支中有一个重要的子类（RuntimeException）运行时异常

  1. ArrayIndexOutOfBoundsException	数组下标异常
  2. NullPointerException   空指针异常
  3. ArithmeticException   算数异常
  4. MissingResourceException  丢失资源
  5. ClassNotFoundException   找不到类

  这些异常是不检查异常，程序中可以选择捕获处理也可以选择不处理

  这些异常一般是由程序逻辑错误导致的，程序应当从逻辑角度尽可能避免这类异常的发生。

* Error和Exception的区别：Error通常是灾难性的致命错误，是程序无法控制和处理的，当出现这些异常时，Java虚拟机一般选择线程终止；Exception通常情况下是可以被程序处理的，并且在程序中应该尽可能的去处理这类异常。

---

#### 异常处理机制

抛出异常

捕获异常

异常捕获五个关键字：

~~~
try,catch,finally,throw,throws
~~~

我们试试捕获一下除数为零的异常

~~~java
package com.joker_yue.javalearn.exp;

public class demo01 {
    public static void main(String[] args) {
        int a= 1;
        int b= 0;
        System.out.println(a/b);
    }

}
~~~

我们尝试捕获上面代码抛出的异常

~~~java
//try catch finally

package com.joker_yue.javalearn.exp;

public class demo01 {
    public static void main(String[] args) {
        int a= 1;
        int b= 0;

        try{//try监控区域
            System.out.println(a/b);
        }catch (ArithmeticException e){//捕获异常
            System.out.println("程序出现异常，除数不能为0");
        }finally{//处理善后工作，出不出异常finally都执行，finally可以不要
            System.out.println("finally");
        }

        
    }
}
~~~

运行结果为

~~~java
程序出现异常，除数不能为0
finally
~~~

接下来我们换一个异常进行捕获

~~~~java
package com.joker_yue.javalearn.exp;

public class demo01 {
    public static void main(String[] args) {
        int a= 1;
        int b= 0;

        try{//try监控区域
            new demo01().a();
        }catch (Throwable e){//捕获异常
            System.out.println("程序出现异常，死循环");
        }finally{//处理善后工作，出不出异常finally都执行
            System.out.println("finally");
        }

    }

    public void a() {b();}
    public void b() {a();}


}
~~~~

运行结果为

~~~java
程序出现异常，死循环
finally
~~~

我们捕获的为Throwable，范围最大的错误

---

我们可以这样捕获不同的异常

~~~java
try{
}catch(){
}catch(){
}catch(){
}finally{
}
~~~

建议把范围最大的异常类型写在最下面的catch中，因为各个catch层层递进，抓住了此异常就会退出

~~~java
package com.joker_yue.javalearn.exp;

public class demo01 {
    public static void main(String[] args) {
        int a= 1;
        int b= 0;

        try{
            System.out.println(a/b);
        }catch (Error e){
            System.out.println("Error");
        }catch (Exception e){
            System.out.println("Exception");
        }catch (Throwable e){
            System.out.println("Throwable");
        }
        finally{
            System.out.println("finally");
        }

    }

    public void a() {b();}

    public void b() {a();}

}

~~~

上述代码的执行结果为

~~~java
Exception
finally
~~~

所以，捕获多个异常，我们应当从小到大排序

---

#### 快捷键

在已经写好的代码上，你可以通过快捷键`Ctrl + alt + T`调出环绕此语句的方式

~~~java
package com.joker_yue.javalearn.exp;

public class demo02 {
    public static void main(String[] args) {

        int a = 1;
        int b = 0;
        try {
            System.out.println(a/b);
        } catch (Exception e) {
            e.printStackTrace();//打印错误的栈信息
        } finally {
        }
        
    }
}
~~~

上述语句输出为

~~~java
java.lang.ArithmeticException: / by zero
	at com.joker_yue.javalearn.exp.demo02.main(demo02.java:9)
~~~

嗯~看起来和一般的错误提示信息没什么两样呢

所以平时我们还是写写自己的错误提示信息吧

---

#### 抛出自己写的异常

我们对demo01改下try中的语句

~~~java
package com.joker_yue.javalearn.exp;

public class demo01 {
    public static void main(String[] args) {
        int a= 1;
        int b= 0;

        try{
            if(b==0) {
                throw new ArithmeticException();//主动抛出异常,throw不是throws
            }
            System.out.println(a/b);
        }catch (Error e){
            System.out.println("Error");
        }catch (Exception e){
            System.out.println("Exception");
        }catch (Throwable e){
            System.out.println("Throwable");
        }
        finally{
            System.out.println("finally");
        }

    }

    public void a() {b();}

    public void b() {a();}


}
~~~

运行一下，

~~~java
Exception
finally
~~~

似乎并没有什么不同哎，再改一下

~~~java
package com.joker_yue.javalearn.exp;

public class demo01 {
    public static void main(String[] args) {

        new demo01().test(1,0);


    }

    public void test(int a,int b){
        if(b==0) {
            throw new ArithmeticException();//主动抛出异常,throw不是throws，一般在方法中使用
        }
        System.out.println(a/b);
    }


}
~~~

上述代码的运行结果如下
~~~java
Exception in thread "main" java.lang.ArithmeticException
	at com.joker_yue.javalearn.exp.demo01.test(demo01.java:13)
	at com.joker_yue.javalearn.exp.demo01.main(demo01.java:6)
~~~

如果上面我们写的方法无法处理我们的异常，我们可以从方法上抛出此异常

~~~java
package com.joker_yue.javalearn.exp;

public class demo01 {
    public static void main(String[] args) {

        try {
            new demo01().test(1,0);
        } catch (ArithmeticException e) {
            e.printStackTrace();
        }


    }

    public void test(int a,int b) throws ArithmeticException{
        if(b==0) {
            throw new ArithmeticException();//主动抛出异常,throw不是throws
        }
        System.out.println(a/b); 
    }

}
~~~

可以看到，在方法上抛出异常是throws

在一般情况下，程序遇到除以0的语句会立即停止并抛出异常，而把除以0的语句用try/catch包起来就会让程序继续运行下去而不中断。那个异常在catch语句中进行处理就行了。

---

#### 自定义异常

* 使用Java内置的异常类可以描述在编程时出现的大部分异常情况。除此之外，用户可以自定义异常，只需继承Exception类即可
* 在程序中使用自定义类，大体可以分成以下几个步骤：
  1. 创建自定义异常类
  2. 在方法中通过throw关键字抛出异常对象
  3. 如果在当前抛出异常的方法中处理异常，可以通过try/catch语句捕获并处理；否则在方法的申明处通过throw关键字指明要抛出给方法调用者的异常，继续下一步操作。
  4. 在出现异常方法的调用者中捕获并处理异常

下面定义了自己的exception方法

~~~java
//myException

package com.joker_yue.javalearn.exp;

//继承自Exception类，就是自定义的异常类
public class myException extends Exception{
        //传递数字>10
        public int detail;
        public myException(int a){
            this.detail = a;
        }
    
    //toString就是打印信息
    @Override
    public String toString() {
        return "==>myException{" +detail+ '}';
    }
}

~~~

然后写一个自己的函数让他来输出错误信息

~~~Java
package com.joker_yue.javalearn.exp;

public class Test {
    // 可能会存在异常的方法
    static void test(int a) throws myException{
        if(a>10){
            throw new myException(a);//如果大于10就走异常
        }
        System.out.println("OK");//不然就输出OK
    }

    public static void main(String[] args) {
        try{
            test(11);
        }catch (myException e){
            System.out.println("myException"+e);
        }
    }
}

~~~

上述代码执行如下：
~~~Java
myException==>myException{11}
~~~

其中关键字`e`是自定义异常中的的toString

----

#### 实际应用中的经验总结

* 处理运行时异常时，采用逻辑去合理规避的同时辅助try-catch处理
* 在多重catch块后面，可以加一个catch（Exception）来处理可能会被遗漏的异常
* 对于不确定的代码，也可以加上try-catch，处理潜在的异常
* 尽量去处理异常，切忌只是简单的调用printStackTrace()去打印输出
* 具体如何处理异常，要根据不同的业务需求和异常类型去就决定
* 尽量添加finally语句块去释放占用的资源