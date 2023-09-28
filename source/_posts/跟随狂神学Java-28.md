---
title: 跟随狂神学Java-28，注解与反射
date: 2023/07/03 04:02:22
tags:
  - 狂神
  - Java
  - JavaSE
  - 必看
categories:
  - [跟随狂神学Java, 必看, 技术, Java]
cover: /images/coverImg/JavaSE/16.jpg
keywords:
  - 注解与反射
  - 注解
  - Annotation
  - 内置注解
  - 元注解
  - 自定义注解
  - 反射
  - Reflection
  - 静态语言
  - 动态语言
  - Java反射
  - Class类
  - 获取Class类的几种方式
  - Class类的常用方法
  - 实例
  - 对象类型
  - Java内存分析
  - 类初始化
  - 类加载器
  - 运行时类的对象
  - Class对象
  - 性能分析
  - 反射操作泛型
  - ORM
  - 对象关系映射
ai:
  - 第二十八天的学习内容主要包括注解与反射。注解是用于在Java代码中添加元数据信息的工具，可以帮助编写更加灵活和强大的程序。这次学习还包括内置注解、元注解和自定义注解的使用方式。反射是一种能够在运行时检查和操作类、方法和字段等结构的技术。我们深入研究了如何获取Class对象、类加载器的作用以及创建运行时类的实例。此外，还学习了反射在性能分析和操作泛型方面的应用，以及对象关系映射（ORM）的基本概念。这些知识将有助于编写更加灵活和强大的Java应用程序。
  - 第二十八天的学习聚焦于Java注解与反射。我们探讨了注解的类型、用途和自定义方式，以及反射的作用、Class对象获取和运用。此外，学习了反射在性能分析和泛型操作中的应用，以及对象关系映射（ORM）的基本概念。这些内容将增强Java编程的灵活性和功能性。
  - 第28天学习了Java注解、反射。注解可用于元数据，反射允许在运行时操作类和对象。这扩展了Java编程的能力。
---
# 跟随狂神学Java

##### 第二十八天：注解与反射

> 那些用手做就很快了的事情，就不要用计算机去做了。
>
> [[【狂神说Java】注解和反射](https://www.bilibili.com/video/BV1p4411P7V3/?vd_source=814489e71df641c4b2c0ff7d4659b2d0)

## 学习内容

#### 注解Annotation

---

##### 什么是注解

* 注解是从JDK5.0开始引入的技术

* Annotation的作用

  * 不是程序本身，可以对程序做出解释（这一点和注释Comment没什么区别）
  * 可以被其他程序，如编译器等 读取

* Annotation的格式

  * 注解是以“@注释名”在代码中存在的，还可以添加一些参数值，例如，@SuppressWarning(value="locked")

* Annotation在哪里使用

  * 可以附加在package，class，method，field等上面。相当于给他们添加了额外的辅助信息。

    我们可以通过反射机制编程实现对这些元数据的访问



---

##### 内置注解

* @Override

  * 定义在 java.lang.Override 中。
  * 此注释只适用于修辞方法，表示一个方法声明打算重写超类中的另一个方法声明 

* @Deprecated

  *  定义在 java.lang.Deprecated 中。
  * 此注释可以用于修辞方法,属性,类。表示不鼓励程序员使用这样的元素。通常是因为它很危险或者存在更好的选择

* @SuppressWarnings 

  * 定义在 java.lang.SuppressWarnings 中

  * 用来**抑制编译时的警告信息**，与前两个注释有所不同，你需要添加一个参数才能正确使用，这些参数都是已经定义好了的，我们选择性的使用就好了。

    ~~~java
     @SuppressWarnings("unchecked")
     @SuppressWarnings(value={"unchecked" "deprecation"})
     @SuppressWarnings("all")
    ~~~

~~~java
package com.joker_yue.javalearn.Annotation_Comment;

import java.util.ArrayList;
import java.util.List;

public class Test01 extends Object {
    //@Override 重写的注解  加上Override就必须要重写父类的注释
    @Override
    public String toString() {
        return "Test01{}";
    }

    //@Deprecated 因某些原因而不推荐的，但是可以使用
    @Deprecated
    public static void test() {
        System.out.println("Deprecated");
    }

    @SuppressWarnings("all")
    public void test02(){
        List list = new ArrayList();
    }

    public static void main(String[] args) {
        test();
    }

}
~~~



---

##### 元注解

* 元注解的作用就是==**负责注解其他注解**==，Java定义了4个标准的meta-annotation类型，他们被用来提供对其他annotation类型作说明
* 这些类型和它们所支持的类在java.lang.annotaion包中可以找到(**@Target,@Retention,@Document,@Inherited**)
  * **@Target**：用于描述注解的使用范围（即：被描述的注解可以用在什么地方）
  * **@Retention**：表示需要在什么级别保存该注释信息，用于描述注解的生命周期
    * SOURCE<CLASS<**RUNTIME**
  * @Document：说明该注解将被包含在javadoc中
  * @Inherited：说明子类可以继承父类中的该注解

 

~~~java
package com.joker_yue.javalearn.Annotation_Comment;

import java.lang.annotation.*;

//测试元注解
@MyAnnotation
public class Test02 {
    @MyAnnotation
    public void test() {

    }
}

//定义一个注解
//Target 表述注解可以用在那些地方
@Target(value = {ElementType.METHOD, ElementType.TYPE})
//Retention表示注解在什么地方还有效，runtime>class>source
@Retention(value = RetentionPolicy.RUNTIME)

//Documented表示是否将注解生成在doc中
@Documented

//Inherited表示子类可以继承父类的注解
@Inherited
@interface MyAnnotation {   //这里不声明为public是因为一个类中只能有一个public

}
~~~



---

##### 自定义注解

* 使用@interface自定义注解时，自动继承了java.lang.annotation.Annotation接口
* 分析
  * @ interface 用来声明一个注解，格式 public @interface 注解名 { 定义内容 }
  * 其中的每一个方法实际上是声明了一个配置参数
  * 方法的名称就是参数的名称
  * 返回值类型就是参数的类型 （ 返回值只能是基本类型，Class,String,enum ）
  * 可以通过 default 来声明参数的默认值
  * 如果只有一个参数成员，一般参数名为 value
  * 注解元素必须要有值，我们定义注解元素时，经常使用空字符串，0 作为默认值
* 自定义注解时，需要使用元注解来标识该注解在何处使用

~~~java
package com.joker_yue.javalearn.Annotation_Comment;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

//自定义注解
public class Test03 {
    //注解可以显式赋值，如果没有默认值，必须手动赋值
    @MyAnnotation2(name = "Joker", schools = {"湖南大学"})
    public void test() {
    }

    //当注解需要的参数只有一个的时候，可以不写出参数名而直接写值。
    // 而且我们通常把这个参数叫做value
    @MyAnnotation3("Yue")
    public void test2() {
    }

}

@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@interface MyAnnotation2 {
    //注解的参数：参数类型 + 参数名();
    String name() default "";//这是添加了默认参数，此处设置为空

    int age() default 0;

    int id() default -1;//如果默认值-1，表示不存在

    String[] schools() default {"北京大学", "清华大学"};
}


@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@interface MyAnnotation3 {
    String value();
}
~~~





#### 反射Reflection

---

##### 静态VS动态语言

* 动态语言
  *  是一类在运行时可以改变其结构的语言。 例如新的函数 、 对象 、 甚至代码可以被引进，已有的函数可以被删除或是其他结构上的变化。 通俗点说就是在运行时代码可以根据某些条件改变自身结构。
  * 主要动态语言 ： Object-C 、 C# 、 JavaScript 、 PHP 、 python 等。
* 静态语言
  * 与动态语言相对应的，运行时结构不可变的语言就是静态语言。 如 Java 、 c 、 C++
  *  Java 不是动态语言，但 Java 可以称之为 " 准动态语言 "。 即 Java 有一定的动态性，我们可以利用反射机制获得类似动态语言的特性。 Java 的动态性让编程的时候更加灵活 ！

----

##### Java反射

* Reflection （ 反射 ） 是 Java 被视为动态语言的关键，反射机制==允许程序在执行期借助于 Reflection API 取得**任何类**的内部信息，并能**直接操作**任意对象的内部属性及方法==
  * Class c = Class.forName("java.lang.String")
* 加载完类之后，在堆内存的方法区中就产生了一个 Class 类型的对象 （ 一个类只有一个 Class 对象 ），这个对象就包含了完整的类的结构信息。我们可以通过这个对象看到类的结构。 这个对象就像一面镜子，透过这个镜子看到类的结构，所以，我们形象的称之为 ： 反射

<img src="./跟随狂神学Java-28.assets/image-20230702175241831.png" alt="image-20230702175241831" style="zoom: 67%;" />

* Java 反身几制提供的功能
  * 在运行时判断任意一个对象所属的类
  * 在运行时构造任意一个类的对象
  * 在运行时判断任意一个类所具有的成员变量和方法
  * 在运行时获取泛型信息
  * 在运行时调用任意一个对象的成员变量和方法
  * 在运行时处理注解
  * 生成动态代理
  * ......
* 反射的优缺点
  * 优点 ：
    * 可以实现动态创建对象和编译 ， 体现出很大的灵活性
  * 缺点 ：
    * 对性能有影响 。 使用反射基本上是一种解释操作 ， 我们可以告诉 JVM ， 我们希望做什么并且它满足我们的要求 。 这类操作总是慢于直接执行相同的操作 。
* 反射的主要API
  * **java.lang.Class**  代表一个类
  * java.lang.reflect. Method 代表类的方法
  * java.lang.reflect.Field  代表类的成员变量
  * java.lang.reflect .Constructor  代表类的构造器
  * ......

~~~java
package com.joker_yue.javalearn.Reflection;

//什么叫反射
public class Test01 extends Object{
    public static void main(String[] args) throws ClassNotFoundException {
        //通过反射获取类的Class对象
        Class C1 = Class.forName("com.joker_yue.javalearn.Reflection.User");
        System.out.println(C1);

        Class C2 = Class.forName("com.joker_yue.javalearn.Reflection.User");
        Class C3 = Class.forName("com.joker_yue.javalearn.Reflection.User");
        Class C4 = Class.forName("com.joker_yue.javalearn.Reflection.User");

        //一个类在内存中只有一个Class对象
        //一个类被加载后，类的整个结构都会被封装在Class对象中
        System.out.println(C2.hashCode());
        System.out.println(C3.hashCode());
        System.out.println(C4.hashCode());
    }

}

//实体类: pojo , entity
class User {
    private String name;
    private int id;
    private int age;

    public User() {
    }

    public User(String name, int id, int age) {
        this.name = name;
        this.id = id;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", id=" + id +
                ", age=" + age +
                '}';
    }
}
~~~



----

##### Class类

* Class类是用来记录一个类的信息的类

* 在Object类中定义了以下的方法，此方法将被所有子类继承
  * public final Class getClass()
* 以上的方法返回值的类型是一个 Class类 ， 此类是 Java 反射的源头 ， 实际上所谓反射从程序的运行结果来看也很好理解 ， 即 ： 可以通过对象反射求出类的名称 。

![image-20230702181446709](./跟随狂神学Java-28.assets/image-20230702181446709.png)

---

##### 得到Class类的几种方式

* 对象镜子后可以得到的信息 ： 某个类的属性 、 方法和构造器 、 某个类到底实现了哪些接口 。对于每个类而言 ， JRE 都为其保留一个不变的 Class 类型的对象 。 一个 Class 对象包含了特定某个结构 class/interface/enum/annotation/primitive type/void/[]) 的有关信息 。
  *  Class 本身也是一个类
  *  Class 对象只能由系统建立对象
  *  一个加载的类在 JVM 中只会有一个 Class 实例
  *  一个 Class 对象对应的是一个加载到 JVM 中的一个.class 文件
  * 每个类的实例都会记得自己是由哪个 Class 实例所生成
  * 通过 CIass 可以完整地得到一个类中的所有被加载的结构
  *  Class类是 Reflection 的根源 ， 针对任何你想动态加载 、 运行的类 ， 唯有先获得相应Class 对象

---

##### Class类的常用方法

![image-20230702191544726](./跟随狂神学Java-28.assets/image-20230702191544726.png)

---

##### 获取Class类的实例

* 若已知**具体的类** ， 通过类的 class 属性获取 ， 该方法最为安全可靠 ， 程序性能最高 。
  * Class clazz = Person.class;
* 已知某个**类的实例** ， 调用该实例的 getClass() 方法获取 Class 对象
  * CIass clazz = person.getClass();
* 已知一个**类的全类名** ， 且该类在类路径下 ， 可通过 Class 类的静态方法 forName() 获取 ，可能抛出 CIassNotFoundException
  * Class clazz = CIass.forName("dem001 .Student");
* 内置基本数据类型可以直接用类名.Type
* 还可以利用 ClassLoader

~~~java
package com.joker_yue.javalearn.Reflection;

//测试Class类的创建方式有哪些
public class Test02 {
    public static void main(String[] args) throws ClassNotFoundException {
        Person person = new Student();
        System.out.println("这个人是:" + person.name);

        //方式1，通过对象获得
        Class c1 = person.getClass();
        System.out.println(c1.hashCode());

        //方式2，通过forname获得
        Class c2 = Class.forName("com.joker_yue.javalearn.Reflection.Student");
        System.out.println(c2.hashCode());

        //方式3，通过类名来获取
        Class c3 = Student.class;
        System.out.println(c3.hashCode());

        //方式4，基本内置类型的包装类都有一个Type属性
        Class c4 = Integer.TYPE;
        System.out.println(c4);

        //获得父类类型
        Class c5 = c1.getSuperclass();
        System.out.println(c5);

    }
}

class Person {
    String name;

    public Person(String name) {
        this.name = name;
    }

    public Person() {
    }

    @Override
    public String toString() {
        return "Person{" + "name='" + name + '\'' + '}';
    }
}

class Student extends Person {
    public Student() {
        this.name = "学生";
    }
}

class Teacher extends Person {
    public Teacher() {
        this.name = "老师";
    }
}
~~~

---

##### 哪些类型可以有Class对象？

* class: 外部类 ， 成员 （ 成员内部类 ， 静态内部类 ), 局部内部类 ， 匿名内部类 。
* interface ：接口
* [] ：数组
* enum : 枚举
* annotation. 注解@interface
* primitive type: 基本数据类型
* void

~~~java
package com.joker_yue.javalearn.Reflection;

import java.lang.annotation.ElementType;

//所有类型的Class
public class Test03 {
    public static void main(String[] args) {
        Class c1 = Object.class;        //类
        Class c2 = Comparable.class;    //接口
        Class c3 = String[].class;      //一维数组
        Class c4 = int[][].class;       //二维数组
        Class c5 = Override.class;      //注解
        Class c6 = ElementType.class;   //枚举
        Class c7 = Integer.class;       //基本数据类型
        Class c8 = void.class;          //void类型
        Class c9 = Class.class;         //Class类型

        System.out.println(c1);
        System.out.println(c2);
        System.out.println(c3);
        System.out.println(c4);
        System.out.println(c5);
        System.out.println(c6);
        System.out.println(c7);
        System.out.println(c8);
        System.out.println(c9);
    }
}

~~~

上述结果的输出结果为

~~~txt
class java.lang.Object
interface java.lang.Comparable
class [Ljava.lang.String;
class [[I
interface java.lang.Override
class java.lang.annotation.ElementType
class java.lang.Integer
void
class java.lang.Class
~~~

只要元素类型与维度一样，就是同一个Class

~~~java
//也就是说这两的Class一样
int[] a = new int[10];
int[] b = new int[100];
~~~

----

##### Java内存分析

![image-20230703144959961](./跟随狂神学Java-28.assets/image-20230703144959961.png)

类的加载过程：

![image-20230703145033219](./跟随狂神学Java-28.assets/image-20230703145033219.png)

类的加载与ClassLoader的理解：

* 加载：将class文件学节码内容加载到内存中，并将这些静态数据转换成方法区的运行时数据结构，然后生成一个代表这个类的java.lang.Class对象
* 链接：将Java类的二进制代码合开到VM的运行状态之中的过程，
  * 验证：确保加载的类信息符合JVM规范，没有安全方面的问题
  * 准备：正式为类变量（static）分配内存并设置类变量默认初始值的阶段，这些内存都将在方法区中进行分配
  * 解析：虚拟机常量池内的符号引用（常量名）替换为直接引用（地址）的过程。
* 初始化：
  * 执行类构造器`<clinit>()`方法的过程。类构造器`<clinit>()`方法是由编译期自动收集类中所有类变量的赋值动作和静态
  * 代码块中的语句合并产生的。（类构造器是构造类信息的，不是构造该类对象的构造器）。
  * 当初始化一个类的时候，如果发现其父类还没有进行初始化，则需要先触发其父类的初始化
  * 虚拟机会保证一个类的`<clinit>()`方法在多线程环境中被正确加锁和同步，

 ~~~java
 package com.joker_yue.javalearn.Reflection;
 
 public class Test04 {
     public static void main(String[] args) {
         A a = new A();
         System.out.println(A.m);
     }
 
     /*
     * 1.加载到内存，会产生一个类对应的Class对象
     * 2.链接，链接结束后m=0
     * 3，初始化
            <cinit>(){
                 System.out.println("A类的静态代码块初始化");
                 m=300;
                 m=100;
            }
            m=100;
     * */
 }
 
 class A {
     static {
         System.out.println("A类的静态代码块初始化");
         m = 300;
     }
 
     static int m = 100;
 
     public A() {
         System.out.println("A类的无参构造初始化");
     }
 }
 ~~~

首先是准备阶段，静态代码块并没有执行，m给予了默认值0，然后初始化的时候从上到下执行。m被赋予=300，然后又=100。

这里static代码块和其他代码的执行顺序与代码文本顺序相同，先写static代码块就先执行m=300，把m=100放在前面就先执行m=100。

---

##### 什么时候会发生类初始化

* 类的主动引用 （ 一定会发生类的初始化 ）
  * 当虚拟机启动 ， 先初始化 main 方法所在的类
  *  new 一个类的对象
  * 调用类的静态成员 （ 除了 final 常量 ） 和静态方法
  * 使用 java.lang.reflect包的方法对类进行反射调用
  * 当初始化一个类 ， 如果其父类没有被初始化 ， 则先会初始化它的父类
* 类的被动引用 （ 不会发生类的初始化 ）
  * 当访问一个静态域时 ， 只有真正声明这个域的类才会被初始化 。 如 ： 当通过子类引用父类的静态变量 ， 不会导致子类初始化
  * 通过数组定义类引用 ， 不会触发此类的初始化
  * 引用常量不会触发此类的初始化 （ 常量在链接阶段就存入调用类的常量池中了 ）

  ~~~java
  package com.joker_yue.javalearn.Reflection;
  
  //测试类什么时候会初始化
  public class Test05 {
      static {
          System.out.println("Main类被加载");
      }
  
      public static void main(String[] args) throws ClassNotFoundException {
          //1，主动引用
          Son son = new Son();
          //反射也会产生主动引用
          Class.forName("com.joker_yue.javalearn.Reflection.Test05.Son");
  
          //2，不会产生类的引用的方法
          //引用父类静态变量
          System.out.println(Son.b);
          //数组
          Son[] sonArr = new Son[5];
          //引用常量
          System.out.println(Son.M);
          
  
      }
  }
  
  class Father{
  
      static int b = 2;
  
      static{
          System.out.println("父类被加载");
      }
  }
  
  class Son extends Father{
      static {
          System.out.println("子类被加载");
          m=300;
      }
      static int m = 100;
      static final int M = 1;
  }
  ~~~

当初始化子类时,如果发现其父类还没有进行过初始化,则需要先触发其父类的初始化

当创建一个类的实例时(例如: new关键词,通过反射,克隆,反序列化)

当调用类是静态方法时(即当使用了字节码invokestatic指令)

当使用类,接口的静态字段时(final修饰特殊考虑)(例如: getstatic或putstatic指令)

如果一个接口定义了default方法,那么直接实现或间接实现该接口的类的初始化,该接口要在其之前初始化

当初始调用MethodHandle实例时,初始化该MethodHandle指向的方法所在的类()

ConstantValue属性的作用是通知虚拟机自动为静态变量赋值， 只有被static修饰的变量才可以使用这项属性。

常量在连接阶段已经初始化了，所以后面给常量赋值，没有引用类

==说白了就是需要哪个类的数据就把这个类拿来初始化==

---

##### 类加载器的作用

* 类加载的作用 ： 将 class 文件字节码内容加载到内存中 ， 并将这些静态数据转换成方法区的运行时数据结构 ， 然后在堆中生成一个代表这个类的 java.lang.Class 对象 ， 作为方法区中类数据的访问入口 。
* 类缓存 ： 标准的 JavaSE 类加载器可以按要求查找类 ， 但一旦某个类被加载到类加载器中 ， 它将维持加载（ 缓存 ）一段时间 。 不过JVM 垃圾回收机制可以回收这些 Class 对象

![image-20230703154254109](./跟随狂神学Java-28.assets/image-20230703154254109.png)

类加载器作用是用来把类（ class ）装载进内存的 。 JVM 规范定义了如下类型的类的加载器 。

![image-20230703154407417](./跟随狂神学Java-28.assets/image-20230703154407417.png)

~~~java
package com.joker_yue.javalearn.Reflection;

public class Test06 {
    public static void main(String[] args) throws ClassNotFoundException {
        //获取系统类加载器
        ClassLoader systemClassLoader = ClassLoader.getSystemClassLoader();
        System.out.println(systemClassLoader);

        //获取系统类加载器的父类-->扩展类加载器
        ClassLoader parent = systemClassLoader.getParent();
        System.out.println(parent);

        //获取扩展类加载器的父类加载器-->根加载器(C/C++编写，将会读取不到)
        //这里父类不是继承来的，而是定义一个变量关联起来
        ClassLoader parent1 = parent.getParent();
        System.out.println(parent1);

        //测试当前类是哪个类加载的
        ClassLoader classLoader = Class.forName("com.joker_yue.javalearn.Reflection.Test06").getClassLoader();
        System.out.println(classLoader);

        //测试JDK内部类
        classLoader = Class.forName("java.lang.Object").getClassLoader();
        System.out.println(classLoader);

        //如何获取系统类加载器可以加载的路径
        System.out.println(System.getProperty("java.class.path"));

        //双亲委派机制
        //如果定义了已经有的包，比如java.lang.String
        //那么自行定义的包将无效
        //扩展的包也是如此 
        //这是为了保证安全性

        /*
        E:\Program\Idea\Java\src\com\joker_yue\out\production\joker_yue;
        E:\Program\Idea\Java\src\com\joker_yue\javalearn\ThreadLearn\lib\commons-io-2.11.0.jar;
        E:\Program\Idea\Java\src\com\joker_yue\out\production\JavaWork;
        E:\Program\Idea\lib\lib_testNG\testng.jar;
        E:\Program\Idea\lib\lib_testNG\bsh-2.0b4.jar;
        E:\Program\Idea\lib\lib_testNG\snakeyaml.jar;
        E:\Program\Idea\lib\lib_testNG\jcommander.jar;
        E:\Program\Idea\lib\lib_testNG\guava-base-r03.jar;
        E:\Program\Idea\lib\lib_testNG\testng-sources.jar;
        E:\Program\Idea\lib\lib_testNG\guava-collections-r03.jar;
        E:\Program\Idea\lib\libSelenium\lib.zip;
        E:\Program\Idea\lib\libSelenium\okio-1.14.0.jar;
        E:\Program\Idea\lib\libSelenium\jsr305-1.3.9.jar;
        E:\Program\Idea\lib\libSelenium\okhttp-3.11.0.jar;
        E:\Program\Idea\lib\libSelenium\guava-25.0-jre.jar;
        E:\Program\Idea\lib\libSelenium\commons-exec-1.3.jar;
        E:\Program\Idea\lib\libSelenium\byte-buddy-1.8.15.jar;
        E:\Program\Idea\lib\libSelenium\selenium-api-3.141.59.jar;
        E:\Program\Idea\lib\libSelenium\j2objc-annotations-1.1.jar;
        E:\Program\Idea\lib\libSelenium\selenium-java-3.141.59.jar;
        E:\Program\Idea\lib\libSelenium\checker-compat-qual-2.0.0.jar;
        E:\Program\Idea\lib\libSelenium\selenium-support-3.141.59.jar;
        E:\Program\Idea\lib\libSelenium\selenium-ie-driver-3.141.59.jar;
        E:\Program\Idea\lib\libSelenium\error_prone_annotations-2.1.3.jar;
        E:\Program\Idea\lib\libSelenium\selenium-edge-driver-3.141.59.jar;
        E:\Program\Idea\lib\libSelenium\selenium-opera-driver-3.141.59.jar;
        E:\Program\Idea\lib\libSelenium\animal-sniffer-annotations-1.14.jar;
        E:\Program\Idea\lib\libSelenium\selenium-chrome-driver-3.141.59.jar;
        E:\Program\Idea\lib\libSelenium\selenium-remote-driver-3.141.59.jar;
        E:\Program\Idea\lib\libSelenium\selenium-safari-driver-3.141.59.jar;
        E:\Program\Idea\lib\libSelenium\selenium-firefox-driver-3.141.59.jar
         */

    }
}
~~~

---

##### 创建运行时类的对象

* 通过反射获取运行时类的完整结构

  Field 、 Method 、 Constructor 、 Superclass 、lnterface 、Annotation

  * 实现的全部接口
  *  所继承的父类
  * 全部的构造器
  * 全部的方法
  * 全部的 Field
  * 注解
  * ...

~~~java
package com.joker_yue.javalearn.Reflection;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

//获得类的信息
public class Test07 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchFieldException, NoSuchMethodException {
        Class c1 = Class.forName("com.joker_yue.javalearn.Reflection.User");

        //获得类的名字
        System.out.println(c1.getName());//包名＋类名
        System.out.println(c1.getSimpleName());//类名

        //获得类的属性
        System.out.println("=====================");
//        Field[] fields = c1.getFields();  //只能找到public属性
        Field[] fields = c1.getDeclaredFields();    //可以找到全部的属性
        for (Field field : fields) {
            System.out.println(field);
        }

        //获取指定属性的值
//        Field name = c1.getField("name");//不存在，因为name为private
        Field name = c1.getDeclaredField("name");
        System.out.println(name);

        //获得类的方法
        System.out.println("=====================");
        Method[] methods = c1.getMethods();
        for (Method method : methods) {
            //获得本类以及父类的所有public方法
            System.out.println("getMethods():"+method);
        }
        methods = c1.getDeclaredMethods();
        for (Method method : methods) {
            //获得本类已经声明的所有方法
            System.out.println("getDeclaredMethods():"+method);
        }

        //获得指定方法
        //重载
        Method getName = c1.getMethod("getName", null);
        Method setName = c1.getMethod("setName", String.class);
        System.out.println(getName);
        System.out.println(setName);

        //获得指定的构造器
        System.out.println("=====================");
        Constructor[] constructors = c1.getConstructors();
        for(Constructor constructor:constructors){
            System.out.println("getConstructors():"+constructor);
        }
        constructors = c1.getDeclaredConstructors();
        for(Constructor constructor:constructors){
            System.out.println("getDeclaredConstructors():"+constructor);
        }

        //获得指定的构造器
        Constructor declaredConstructor = c1.getDeclaredConstructor(String.class, int.class, int.class);
        System.out.println("指定构造器:"+declaredConstructor);

    }
}

~~~

---

##### 有了Class对象，能做什么？

* 创建类的对象 ： 调用 Class 对象的 newlnstance() 方法

  1. 类必须有一个无参数的构造器 。

  2. 类的构造器的访问权限需要足够

* 思考 ？ 难道没有无参的构造器就不能创建对象了吗 ？ 只要在操作的时候明确的调用类中的构造器 ，并将参数传递进去之后 ， 才可以实例化操作 。

  * 步骤如下 ，
    1. 通过 Class 类的 getDeclaredConstructor(Class … parameterTypes) 取得本类的指定形参类型的构造器
    2. 向构造器的形参中传递一个对象数组进去 ， 里面包含了构造器中所需的各个参数
    3. 通过 Constructor 实例化对象

 ~~~java
 package com.joker_yue.javalearn.Reflection;
 
 import java.lang.reflect.Constructor;
 import java.lang.reflect.Field;
 import java.lang.reflect.InvocationTargetException;
 import java.lang.reflect.Method;
 
 //动态的创建对象，通过反射
 public class Test08 {
     public static void main(String[] args) throws ClassNotFoundException, InstantiationException, IllegalAccessException, NoSuchMethodException, InvocationTargetException, NoSuchFieldException {
         //获得Class对象
         Class c1 = Class.forName("com.joker_yue.javalearn.Reflection.User");
 
         //使用newInstance()构造一个对象
         User user = (User) c1.newInstance();//本质上是调用了类的无参构造器
         System.out.println(user);
 
         //使用构造器创建对象，可以使用有参构造
         Constructor constructor = c1.getConstructor(String.class, int.class, int.class);
         User user2 = (User) constructor.newInstance("Joker", 001, 19);
         System.out.println(user2);
 
         //通过反射调用普通方法
         User user3 = (User) c1.newInstance();
         //通过反射获取一个方法
         Method setName = c1.getDeclaredMethod("setName", String.class);
         //因为直接调用相当于写死在代码中了，而这种方式可以从外部传入任意的方法名和参数来执行方法
         setName.invoke(user3,"joker");//invoke是调用的意思
         System.out.println(user3.getName());
 
 
         //通过反射操作属性
         User user4 = (User)c1.newInstance();
         Field name = c1.getDeclaredField("name");
         name.setAccessible(true);//为了操作属性,因为name为private
         name.set(user4,"Yue");
         System.out.println(user4.getName());
 
 
     }
 }
 ~~~

* 调用指定的方法
  * 通过反射 ， 调用类中的方法 ， 通过 Method 类完成 。
    1. 通过 Class 类的 getMeth0d(String name,Class...parameterTypes) 方法取得一个 Method 对象 ， 并设置此方法操作时所需要的参数类型。
    2. 之后使用 Object invoke(Object obj, Object[] args) 进行调用 ， 并向方法中传递要设置的 obj 对象的参数信息 。
  * ![image-20230703170951475](./跟随狂神学Java-28.assets/image-20230703170951475.png)
  * Object invoke(Object Obj ， Object ...args)
    *  Object 对应原方法的返回值 ， 若原方法无返回此时返回null
    * 若原方法若为静态方法 ， 此时形参 Object obj 可为null
    * 若原方法形参列表为空 ， 则 ObJect[] args 为 null
    * 若原方法声明为private， 则需要在调用此invoke()方法前，显式调用方法对象的setAccessible(true) 方法 ， 将可访问 private 的方法 。
  * SetAccessible
    * Method 和 FieId 、 Constructor 对象都有 setAccessibIe() 方法 。
    * setAccessible 作用是启动和禁用访问安全检查的开关 。
    * 参数值为 true 则指示反射的对象在使用时应该取消Java 语言访问检查 。
      * 提高反射的效率 。 如果代码中必须用反射 ， 而该句代码需要频繁的被调用 ， 那么请设置为 true 。
      * 使得原本无法访问的私有成员也可以访问
    * 参数值为 false则指示反射的对象应该实施 Java 语言访问检查

---

##### 性能分析

~~~java
package com.joker_yue.javalearn.Reflection;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class Test09 {
    //普通方式调用
    public static void test01() {
        User user = new User();
        long startTime = System.currentTimeMillis();

        for (int i = 0; i < 1000000000; i++) {
            user.getName();
        }

        long endTime = System.currentTimeMillis();

        System.out.println("普通方式执行10亿次需要的时间:"+(endTime-startTime) + "ms");
    }
    //反射方式调用
    public static void test02() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        User user = new User();
        Class c1 = user.getClass();

        Method getName = c1.getDeclaredMethod("getName", null);

        long startTime = System.currentTimeMillis();

        for (int i = 0; i < 1000000000; i++) {
             getName.invoke(user,null);
        }

        long endTime = System.currentTimeMillis();

        System.out.println("反射方式执行10亿次需要的时间:"+(endTime-startTime) + "ms");
    }
    //反射方式调用 关闭检测
    public static void test03() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        User user = new User();
        Class c1 = user.getClass();

        Method getName = c1.getDeclaredMethod("getName", null);
        getName.setAccessible(true);

        long startTime = System.currentTimeMillis();

        for (int i = 0; i < 1000000000; i++) {
            getName.invoke(user,null);
        }

        long endTime = System.currentTimeMillis();

        System.out.println("关闭检测执行10亿次需要的时间:"+(endTime-startTime) + "ms");
    }

    public static void main(String[] args) throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {
        test01();
        test02();
        test03();
    }
}
~~~

上述代码的输出结果为

~~~txt
普通方式执行10亿次需要的时间:7ms
反射方式执行10亿次需要的时间:7506ms
关闭检测执行10亿次需要的时间:5606ms
~~~

---

##### 反射操作泛型

* Java 采用泛型擦除的机制来引入泛型 ， Java 中的泛型仅仅是给编译器 javac 使用的 ， 确保数据的安全性和免去强制类型转换问题但是一旦编译完成所有和氵乏型有关的类型全部擦除
* 为了通过反射操作这些类型 ， Java 新增了 ParameterizedType ， GenericArrayType，TypeVariable 和 WildcardType 几种类型来代表不能被归一到 CIass 类中的类型但是又和原始类型齐名的类型 
  * ParameterizedType：表示一种参数化类型 ， 比如 `Collection<String>`
  * GenericArrayType：表示一种元素举型早参数化类型或者类型变量的数组类型
  * TypeVariable：是各种类型变量的公共父接口
  * WildcardType：代表一种通配符类型表达式

~~~java
package com.joker_yue.javalearn.Reflection;

import java.lang.reflect.AnnotatedType;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

//通过反射获取泛型
public class Test10 {
    public void test01(Map<String, User> map, List<User> list) {
        System.out.println("test01");
    }

    public Map<String, User> test02() {
        System.out.println("test02");
        return null;
    }

    public static void main(String[] args) throws NoSuchMethodException {
        Method method = Test10.class.getMethod("test01", Map.class, List.class);

        //获得泛型的参数类型
        Type[] genericParameterTypes = method.getGenericParameterTypes();

        for (Type genericParameterType : genericParameterTypes) {
            System.out.println("#" + genericParameterType);       //打印参数类型
            if (genericParameterType instanceof ParameterizedType) {//判断类型是否属于结构化参数类型
                Type[] actualTypeArguments = ((ParameterizedType) genericParameterType).getActualTypeArguments();//强转
                for (Type actualTypeArgument : actualTypeArguments) {
                    System.out.println(actualTypeArgument);
                }
            }
        }

        //获取返回的参数类型
        method = Test10.class.getMethod("test02",null);
        Type genericReturnType = method.getGenericReturnType();

        if (genericReturnType instanceof ParameterizedType) {//判断类型是否属于结构化参数类型
            Type[] actualTypeArguments = ((ParameterizedType) genericReturnType).getActualTypeArguments();//强转
            for (Type actualTypeArgument : actualTypeArguments) {
                System.out.println(actualTypeArgument);
            }
        }
    }
}
~~~

---

##### ORM

![image-20230703193727334](./跟随狂神学Java-28.assets/image-20230703193727334.png)

~~~java
package com.joker_yue.javalearn.Reflection;

import java.lang.annotation.*;
import java.lang.reflect.Field;

public class Test11 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchFieldException {
        Class c1 = Class.forName("com.joker_yue.javalearn.Reflection.Student2");
        //通过反射获得注解
        Annotation[] annotations = c1.getAnnotations();
        for (Annotation annotation : annotations) {
            System.out.println(annotation);
        }
        //获得注解的value的值
        TableJoker tableJoker = (TableJoker)c1.getAnnotation(TableJoker.class);
        String value = tableJoker.value();
        System.out.println(value);

        //获得类指定的注解
        Field f = c1.getDeclaredField("name");
        FieldJoker annotation = f.getAnnotation(FieldJoker.class);
        System.out.println(annotation.columnName());
        System.out.println(annotation.type());
        System.out.println(annotation.length());


    }
}

@TableJoker("db_student")
class Student2 {
    @FieldJoker(columnName = "db_id", type = "int", length = 10)
    private int id;
    @FieldJoker(columnName = "db_age", type = "int", length = 10)
    private int age;
    @FieldJoker(columnName = "db_name", type = "varchar", length = 3)
    private String name;

    public Student2() {
    }

    public Student2(int id, int age, String name) {
        this.id = id;
        this.age = age;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

//类名的注解
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@interface TableJoker {
    String value();
}

//属性的注解
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@interface FieldJoker {
    String columnName();

    String type();

    int length();
}
~~~

