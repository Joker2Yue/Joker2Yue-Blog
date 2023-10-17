---
title: 跟随狂神学Java-16，Object类
date: 2022/08/29 04:02:22
tags:
  - 狂神
  - Java
  - JavaSE
categories:
  - [跟随狂神学Java]
  - [Java]
cover: https://resource.joker2yue.cn/blog/images/coverImg/JavaSE/10.jpg
keywords:
  - Object类
ai:
  - 这份读书笔记介绍了Java中的Object类及其方法，包括getClass、hashCode、toString、equals和finalize的用法和重写。Object是所有类的超类，这些方法用于处理对象的类型、哈希码、字符串表示、相等性检查和垃圾回收。通过示例演示了如何自定义toString和equals方法，但注意finalize方法已在Java 9后被弃用。这些概念对于Java对象操作至关重要。
  - 这份读书笔记涵盖Java中Object类及其方法，如getClass、hashCode、toString、equals和finalize。它解释了如何使用和重写这些方法，强调了它们在处理对象的类型、哈希码、字符串表示、相等性和垃圾回收方面的关键作用。
  - 这笔记介绍Java中Object类及其方法，如getClass、hashCode、toString、equals，以及finalize方法。重点强调自定义equals和toString，但提到finalize在Java 9后被弃用。这些方法关键用于处理对象操作。
---
# 跟随狂神学Java

##### 第十六天：Object类

> 那日云淡天高，我们正值年少
>
> *~~[狂神未更新，转千锋教育 (bilibili.com)](https://www.bilibili.com/video/BV1vt4y197nY?spm_id_from=333.337.search-card.all.click)~~*

## 学习内容

#### Object类的概念

* 超类、基类，所有类的直接或间接父类，位于继承树的最顶层（也就是所有的类都会直接或间接继承这个类）
* 任何类，如果没有显式的指明`extends`继承某个类，都会默认继承Object类，否则为间接继承
* Object类中所定义的方法，是所有对象都具备的方法
* Object类型可以储存任何对象
    * 作为参数，可接受任何对象
    * 作为返回值，可返回任何对象
* 位于java.lang.Object包中

---

#### Object类中的一些方法

##### getClass()方法

* pubic final `Class<?>` getClass() {}
* 返回引用中储存的==实际对象类型==
* 应用：通常用于判断两个引用中实际储存==对象是否一致==
* 返回值：Class类型



**我们来试试**：

1. 我们先创建一个类，随便啥的都行

   ~~~java
   //这里是Students.java
   
   package com.joker_yue.javalearn.object;
   
   public class Student {
       private String name;
       private int age;
   
       public Student(){
           //TODO
       }
   
       public Student(String name, int age){
           super();
           this.name= name;
           this.age=age;
       }
   
       public String getName() {
           return name;
       }
   
       public void setName(String name) {
           this.name = name;
       }
   
       public int getAge() {
           return age;
       }
   
       public void setAge(int age) {
           this.age = age;
       }
   }
   ~~~

2. 然后我们创建它的对象

   ~~~java
   //这里是TestStudents.java
   
   package com.joker_yue.javalearn.object;
   
   public class TestStudent {
       public static void main(String[] args) {
           
           
           Student s1 = new Student("aaa",20);
           Student s2 = new Student("bbb",22);
           
   
       }
   }
   
   ~~~

3. 我们来使用getClass()方法，判断二者是否相等

   ~~~java
   //这里是TestStudents.java
   
   package com.joker_yue.javalearn.object;
   
   public class TestStudent {
       public static void main(String[] args) {
           Student s1 = new Student("aaa",20);
           Student s2 = new Student("bbb",22);
           //判断s1和s2是不是同一个类型
           Class class1 = s1.getClass();			//Class以后讲注解和反射的时候再说嗷
           Class class2 = s2.getClass();			//那就先鸽这了哈
   
           if(class1 == class2){
               System.out.println("s1与s2是同一个类型");
           }else{
               System.out.println("s1与s2不是同一个类型");
           }
   
       }
   }
   
   ~~~

4. 最后的运行输出结果为：

   ~~~JAVA
   s1与s2是同一个类型
   ~~~



---

##### hashCode()方法

* public int hashCode() {}
* 返回该对象的哈希值（int）
* 哈希值：根据堆中的==对象的地址==或==字符串==或==数字==使用hash算法来计算出来的int类型的数值
* 一般情况下， 相同的对象会返回相同的哈希值

​	**我们还是拿之前的例子来举例**

~~~java
//这里是TestStudents.java

package com.joker_yue.javalearn.object;

public class TestStudent {
    public static void main(String[] args) {

        //getClass()方法
        Student s1 = new Student("aaa",20);
        Student s2 = new Student("bbb",22);
        //判断s1和s2是不是同一个类型

        Class class1 = s1.getClass();
        Class class2 = s2.getClass();

        if(class1 == class2){
            System.out.println("s1与s2是同一个类型");
        }else{
            System.out.println("s1与s2不是同一个类型");
        }


        //hashCode()方法
        System.out.println(s1.hashCode());
        System.out.println(s2.hashCode());

    }
}
~~~

​	最后的输出结果为：

~~~java
s1与s2是同一个类型
1324119927
990368553
~~~

​	那我们再创建一个s3对象，并使s3=s1;

~~~java
//这里是TestStudents.java

package com.joker_yue.javalearn.object;

public class TestStudent {
    public static void main(String[] args) {

        //getClass()方法
        Student s1 = new Student("aaa",20);
        Student s2 = new Student("bbb",22);
        //判断s1和s2是不是同一个类型

        Class class1 = s1.getClass();
        Class class2 = s2.getClass();

        if(class1 == class2){
            System.out.println("s1与s2是同一个类型");
        }else{
            System.out.println("s1与s2不是同一个类型");
        }


        //hashCode()方法
        System.out.println(s1.hashCode());
        System.out.println(s2.hashCode());
        
        Student s3 = s1;
        System.out.println(s3.hashCode());

    }
}
~~~

我们会发现s3和s1的hashCode是一样的

~~~java
s1与s2是同一个类型
1324119927
990368553
1324119927
~~~

因为我们是将s1的内存赋值给了s3。在栈中有两个变量s1和s3，但是这两个变量都指向了堆里面的同一个对象

---

##### toString()方法

* public String toString() {}
* 返回该对象的字符串表示（表现形式）
* 可以根据项目需求覆盖该方法，如：展示对象各个属性值

**我们还是按照上面一样的，尝试toString()方法**

~~~java
//这里是TestStudents.java

package com.joker_yue.javalearn.object;

public class TestStudent {
    public static void main(String[] args) {

        //getClass()方法
        Student s1 = new Student("aaa",20);
        Student s2 = new Student("bbb",22);
        //判断s1和s2是不是同一个类型

        Class class1 = s1.getClass();
        Class class2 = s2.getClass();

        if(class1 == class2){
            System.out.println("s1与s2是同一个类型");
        }else{
            System.out.println("s1与s2不是同一个类型");
        }

        System.out.println("-----------------");

        //hashCode()方法
        System.out.println(s1.hashCode());
        System.out.println(s2.hashCode());

        Student s3 = s1;
        System.out.println(s3.hashCode());

        System.out.println("-----------------");

        //toString()方法
        System.out.println(s1.toString());
        System.out.println(s2.toString());

    }
}
~~~

**最后的输出结果为**：

~~~java
s1与s2是同一个类型
-----------------
1324119927
990368553
1324119927
-----------------
com.joker_yue.javalearn.object.Student@4eec7777
com.joker_yue.javalearn.object.Student@3b07d329
~~~

我们可以发现它打印的是我们软件包的全名称加上此对象的哈希值（十六进制）

在IDEA中我们可以按住Ctrl+鼠标左键然后点击toString()来查看源码：
<img src="./跟随狂神学Java-16.assets/2022-1693998825278-21.png" alt="img" style="zoom: 80%;" />

**我们也可以将toString()进行重写来让其符合我们的需求**

~~~java
//这里是Students.java

package com.joker_yue.javalearn.object;

public class Student {
    private String name;
    private int age;

    public Student(){
        //TODO
    }

    public Student(String name, int age){
        super();
        this.name= name;
        this.age=age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override										//【看我看我】
    public String toString() {
        return name+":"+age;
    }
}
~~~

然后运行TestStudent.java我们可以得到如下输出：

~~~java
s1与s2是同一个类型
-----------------
1324119927
990368553
1324119927
-----------------
aaa:20
bbb:22
~~~

发现返回的是自己的定义的功能

---

##### equals()方法

* public boolean equals(Object obj) {}
* 默认实现为(this == obj)，比较两个对象是否相同
* 可进行覆盖，比较两个对象的内容是否相同



**先分清楚equals()和==的区别**

* 使用 == 比较
  Java中的8种===基本数据类型==（`byte`,`short`,`char`,`int`,`long`,`float`,`double`,`boolean`）比较他们之间的==值==是否相等。
  ==引用数据类型==（`类Class引用`、`接口interface引用`、`数组引用`），比较的是他们在堆==内存地址==是否相等。每新new一个引用类型的对象，会重新分配堆内存空间，使用==比较返回false。

* 使用 equals() 比较
  equals()方法是Object类的一个方法，Java当中所有的类都是继承于Object这个超类。
  JDK1.8 Object类equals方法源码如下，即返回结果取决于两个对象的使用==判断结果。

  ~~~java
  public boolean equals(Object obj) {
    return (this == obj);
  }
  ~~~

* 默认情况下，比较内存地址值是否相等。可以按照需求逻辑，重写对象的equals()方法。

  [来自CSDN博主「ConstXiong」的博客](https://blog.csdn.net/meism5/article/details/89029475)



**我们来试试**

一样的，我们还是这样举例

~~~java
//这里是TestStudents.java

package com.joker_yue.javalearn.object;

public class TestStudent {
    public static void main(String[] args) {

        //getClass()方法
        Student s1 = new Student("aaa",20);
        Student s2 = new Student("bbb",22);
        //判断s1和s2是不是同一个类型

        Class class1 = s1.getClass();
        Class class2 = s2.getClass();

        if(class1 == class2){
            System.out.println("s1与s2是同一个类型");
        }else{
            System.out.println("s1与s2不是同一个类型");
        }

        System.out.println("-----------------");

        //hashCode()方法
        System.out.println(s1.hashCode());
        System.out.println(s2.hashCode());

        Student s3 = s1;
        System.out.println(s3.hashCode());

        System.out.println("-----------------");

        //toString()方法
        System.out.println(s1.toString());
        System.out.println(s2.toString());

        System.out.println("-----------------");

        //equals()方法
        System.out.println(s1.equals(s2));
        System.out.println(s1.equals(s3));

    }
}
~~~

最后的输出结果为：

~~~java
s1与s2是同一个类型
-----------------
1324119927
990368553
1324119927
-----------------
aaa:20
bbb:22
-----------------
false
true
~~~

可以发现 `s1.equals(s2)` 输出为`false`，这是因为他们是两个不同的对象

同样的 `s1.equals(s3)` 输出为`ture`，原因是因为他们是相同的对象

即使我们重新new一个对象

~~~java
Student s4 = new Student("aaa",20);
~~~

然后将其`s4.equals(s1)`，输出结果也是`false`。因为我们每`new`一个对象，就会在堆中重新开辟空间，所以他们（s1,s4）的地址不相同，便会输出`false`

但是总是有聪明的脑袋们会问，啊~String类不是也有equals()方法嘛，像这样：

~~~java
String s1 = "我最帅";
String s2 = "我最帅";
System.out.println(s1.equals(s2));
~~~

明明就是两个不同的对象为什么会输出`ture`啊?

这是因为String类重写了equals()方法，让他们比较值而不是比较地址（别混淆了我们现在讲的是Object类！）

这时候又会有聪明的脑袋们问，啊~怎么重写



**equals()方法的重写**

步骤：

* 比较两个引用是否指向同一个对象
* 判断obj是否为null
* 判断两个引用指向的实际对象类型是否一致
* 强制类型转换
* 依次比较各个属性值是否相等

 ~~~java
//这里是Students.java

package com.joker_yue.javalearn.object;

public class Student extends Object{					//【看我看我】
    //其实extends Object可以不写，因为我们重写了equals()方法了，它会自动隐式的加上extends Object
    private String name;
    private int age;

    public Student(){
        //TODO
    }

    public Student(String name, int age){
        super();
        this.name= name;
        this.age=age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return name+":"+age;
    }

    @Override									//⚠️【看我看我】
    public boolean equals(Object obj) {
        //1.判断两个对象是否同一个引用
        if(this==obj) {
            //判断地址相等
            return true;
        }
        //2.判断obj是否为null
        if(obj==null){
            return false;
        }
        //3.判断是否同一个类型
//        if(this.getClass()==obj.getClass()){
//
//        }
//这个被废弃
        if(obj instanceof Student){
            //instanceof关键字：它的具体作用是测试左边的对象是否是右边类或者该类的子类创建的实例对象，返回值类型为boolean
            //4.强制类型转换
            Student s = (Student) obj;
            if(this.name.equals(s.getName())  && this.age==s.getAge()){
                return true;
            }

        }

        return false;
    }
}

 ~~~

---

##### finalize()方法

* 当对象被判定为垃圾对象时，由JVM自动调用此方法，用以标记垃圾对象，进入回收队列
* 垃圾对象：没有有效引用指向此对象时，为垃圾对象
* 垃圾回收：由GC销毁垃圾对象，释放数据储存空间
* 自动回收机制：JVM的内存耗尽，一次性回收所有垃圾对象
* 手动回收机制：使用`System.gc();`  通知JVM执行垃圾回收

​	我们来试试，**让其在垃圾回收的时候自动输出一句话**

~~~java
//这里是Students.java

package com.joker_yue.javalearn.object;

public class Student extends Object{//其实extends Object可以不写，因为我们重写了equals()方法了，它会自动隐式的加上extends Object
    private String name;
    private int age;

    public Student(){
        //TODO
    }

    public Student(String name, int age){
        super();
        this.name= name;
        this.age=age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return name+":"+age;
    }

    @Override
    public boolean equals(Object obj) {
        //1.判断两个对象是否同一个引用
        if(this==obj) {
            return true;
        }
        //2.判断obj是否为null
        if(obj==null){
            return false;
        }
        //3.判断是否同一个类型
//        if(this.getClass()==obj.getClass()){
//
//        }
        if(obj instanceof Student){
            //instanceof关键字：它的具体作用是测试左边的对象是否是右边类或者该类的子类创建的实例对象，返回值为boolean
            //4.强制类型转换
            Student s = (Student) obj;
            if(this.name.equals(s.getName())  && this.age==s.getAge()){
                return true;
            }

        }

        return false;
    }

    @Override										//【看我看我】
    protected void finalize() throws Throwable {
        System.out.println("对象被回收："+this.name);
    }
}

~~~

然后我们来创建一个mian方法用来测试重写的finalize()是否成功执行

~~~java
//这里是TestStudent2.java

package com.joker_yue.javalearn.object;

public class TestStudent2 {
    public static void main(String[] args) {
        Student s1 = new Student("aaa",20);
        Student s2 = new Student("bbb",20);
        Student s3 = new Student("ccc",20);
        Student s4 = new Student("ddd",20);
        Student s5 = new Student("eee",20);
        //回收垃圾
        System.gc();
        System.out.println("回收垃圾");
    }
}

~~~

上述代码的运行结果为

~~~java
回收垃圾
~~~

可以发现我们的重写并没有执行，那我们就换一种写法

~~~java
//这里是TestStudent2.java

package com.joker_yue.javalearn.object;

public class TestStudent2 {
    public static void main(String[] args) {
//        Student s1 = new Student("aaa",20);
//        Student s2 = new Student("bbb",20);
//        Student s3 = new Student("ccc",20);
//        Student s4 = new Student("ddd",20);
//        Student s5 = new Student("eee",20);
        new Student("aaa",20);
        new Student("bbb",20);
        new Student("ccc",20);
        new Student("ddd",20);
        new Student("eee",20);
        //回收垃圾
        System.gc();
        System.out.println("回收垃圾");
    }
}

~~~

上述代码执行后，理应输出如下信息：

~~~java
aaa对象被回收了
bbb对象被回收了
ccc对象被回收了
ddd对象被回收了
eee对象被回收了
回收垃圾
~~~

但是finalize()方法从Java9之后就被弃用了，所以我们可能还是看不到”对象被回收了“
