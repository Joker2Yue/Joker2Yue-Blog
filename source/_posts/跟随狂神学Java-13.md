---
title: 跟随狂神学Java-13，内部类与常用类
date: 2022/08/22 04:02:22
tags:
  - 狂神
  - Java
  - JavaSE
categories:
  - [跟随狂神学Java]
  - [Java]
cover: https://resource.joker2yue.cn/blog/images/coverImg/JavaSE/10.jpg
keywords:
  - 内部类
  - 成员内部类
  - 静态内部类
  - 局部内部类
  - 匿名内部类
ai: 
  - 这份学习内容总结介绍了Java内部类的四种类型：成员内部类、静态内部类、局部内部类和匿名内部类。成员内部类定义在外部类内部，可以访问外部类私有成员，需要通过外部类实例创建。静态内部类不依赖外部类实例，可直接创建，可声明静态成员。局部内部类仅在外部类方法中定义，有限的作用范围，需要外部类方法调用创建。匿名内部类没有显式定义，通常在方法中创建，适用于临时需求。内部类提供更好的封装和组织代码的方式。
  - 这学习内容概括了Java内部类的四种类型：成员、静态、局部和匿名内部类。成员内部类嵌套在外部类内，可访问外部私有成员；静态内部类无需外部类实例，可声明静态成员；局部内部类限定在外部方法内；匿名内部类没有命名，通常用于短期需求。内部类提供更灵活的代码组织和封装方式。
  - 学习了Java的四种内部类：成员、静态、局部和匿名内部类，它们提供了不同的代码封装和组织方式。
---
# 跟随狂神学Java

##### 第十三天：内部类与常用类

> 知识有两种，一种是你知道的，还有一种是你知道在哪可以学到的
> *~~[狂神未更新，转千锋教育 (bilibili.com)](https://www.bilibili.com/video/BV1vt4y197nY?spm_id_from=333.337.search-card.all.click)~~*

---

## 学习内容

#### 内部类

> 内部类的分类

1. 成员内部类

2. 静态内部类

3. 局部内部类

4. 匿名内部类

---



#### 内部类的概念

* 在一个类的内部再定义一个完整的类

  ~~~java
  class Outer{
  	class Inner{
  	}
  }
  ~~~

---

#### 内部类的特点

* 编译之后会产生独立的字节码文件

  也就是两个类会生成两个class文件

  <img src="./跟随狂神学Java-13.assets/2022.png" alt="img" style="zoom: 80%;" />

* 内部类可以直接访问外部类的私有成员，而不破坏封装

  ~~~java
  package com.joker_yue.javalearn.object;
  
  //身体
  public class Body {
      private String name;
  
          //头部
          class  Header{
              public  void show(){
                  System.out.println(name);			//这里不会报错
              }
          }
  }
  ~~~

* 可以为外部类提供必要的内部功能组件

----

#### 成员内部类

什么是成员内部类

1. 在类的内部，与实例变量、实例方法同级别的类

2. 外部类的一个实例部分，创建内部类对象时，必须依赖外部类对象

   ~~~java
   Outer out = new Outer();
   Outer inner in = outer.new Inner();
   ~~~

   ~~~java
   //这里是Outer.java
   package com.joker_yue.javalearn.object;
   //外部类
   public class Outer {
    private String name="张三";
    private  int age =20;
   
    //内部类
    class Inner{
         private String address="北京";
         private String phone= "100";
   
         //方法
        public void show(){
            //打印外部类的属性
            System.out.println(name);
            System.out.println(age);
            //打印内部类的属性
            System.out.println(address);
            System.out.println(phone);
        }
    }
   }
   ~~~

   ~~~java
    //这里是TestOuter.java
    package com.joker_yue.javalearn.object;
   
    public class TestOuter {
        public static void main(String[] args) {
            //1.先创建外部类对象
            Outer outer = new Outer();
   
            //2.创建内部类对象
            Outer.Inner inner = outer.new Inner();				//【1】
            //外部类.内部类 内部类对象 = 外部类对象.new 内部类();
   
            inner.show();
        }
    }
   ~~~

   【1】注意：创建内部类对象中的"outer."是创建的外部类对象的对象名

   在运行TestOuter.java后会输出如下结果：

   ~~~java
   张三
   20
   北京
   100
   ~~~

   当然你也可以一步到位：

   ~~~java
   //这里是TestOuter.java
   package com.joker_yue.javalearn.object;
   
   public class TestOuter {
       public static void main(String[] args) {
   //        //1.先创建外部类对象
   //        Outer outer = new Outer();
   //
   //        //2.创建内部类对象
   //        Outer.Inner inner = outer.new Inner();
   //        //外部类.内部类 内部类对象 = 外部类对象.new 内部类();
   
           //一步到位
           Outer.Inner inner = new Outer().new Inner();
           inner.show();
   
       }
   }
   ~~~

3. 当外部类、内部类存在重名的属性时，会优先访问内部类属性

   ~~~java
   //这里是Outer.java
   package com.joker_yue.javalearn.object;
   //外部类
   public class Outer {
       private String name="张三";
       private  int age =20;
   
       //内部类
       class Inner{
            private String address="北京";
            private String phone= "100";
            private String name = "李四";			//【1】看我看我
   
            //方法
           public void show(){
               //打印外部类的属性
               System.out.println(name);
               System.out.println(age);
               //打印内部类的属性
               System.out.println(address);
               System.out.println(phone);
           }
       }
   }
   ~~~

   上述代码执行后会生成如下信息：

   ~~~java
   李四
   20
   北京
   100
   ~~~

   如果你想仍然访问外部类，你需要这样写（使用this指针）（Outer.this.name）

   ~~~java
   //这里是outer.java
   package com.joker_yue.javalearn.object;
   //外部类
   public class Outer {
       private String name="张三";
       private  int age =20;
   
       //内部类
       class Inner{
            private String address="北京";
            private String phone= "100";
            private String name = "李四";
   
            //方法
           public void show(){
               //打印外部类的属性
               System.out.println(Outer.this.name);		//【1】看我看我
               System.out.println(age);
               //打印内部类的属性
               System.out.println(address);
               System.out.println(phone);
           }
       }
   }
   ~~~

4. 成员内部类中不能定义静态成员

   ~~~java
   //这里是Outer.java
   package com.joker_yue.javalearn.object;
   //外部类
   public class Outer {
       private String name="张三";
       private  int age =20;
   
       //内部类
       class Inner{
            private String address="北京";
            private String phone= "100";
            private String name = "李四";
   
            private static String country = "中国";			//会报错
   
            //方法
           public void show(){
               //打印外部类的属性
               System.out.println(Outer.this.name);
               System.out.println(age);
               //打印内部类的属性
               System.out.println(address);
               System.out.println(phone);
           }
       }
   }
   ~~~

   但是静态类中可以包含静态常量

   ~~~~java
   //这里是Outer.java
   package com.joker_yue.javalearn.object;
   //外部类
   public class Outer {
       private String name="张三";
       private  int age =20;
   
       //内部类
       class Inner{
            private String address="北京";
            private String phone= "100";
            private String name = "李四";
   
            private static final String country = "中国";		//这样做是可行的
   
            //方法
           public void show(){
               //打印外部类的属性
               System.out.println(Outer.this.name);
               System.out.println(age);
               //打印内部类的属性
               System.out.println(address);
               System.out.println(phone);
           }
       }
   }
   ~~~~



#### 静态内部类

* ==不依赖外部类对象==，可直接创建或通过类名访问，可声明静态成员

  也就是我们创建内部类的时候可以不用创建一个外部类

  ~~~java
  //这是一个新的包
  //这里是Outer.java
  package com.joker_yue.javalearn.object2;
  
  //外部类
  public class Outer {
      private String name = "XXX";
      private int age = 18;
  
      //静态内部类(级别和外部类相同）
      static class Inner{
          private String address ="湖南";
          private String phone = "111";
      
          //静态成员
          private static int count = 10000;
          private void show(){
              //调用外部类的属性？
              //如果我们直接写下面这句话
              System.out.println(name);
              //会报错   
          }
      }
  }
  ~~~

  所以我们这样写

  ~~~~java
  //这里是Outer.java
  package com.joker_yue.javalearn.object2;
  
  //外部类
  public class Outer {
      private String name = "XXX";
      private int age = 18;
  
      //静态内部类(级别和外部类相同）
      static class Inner{
          private String address ="湖南";
          private String phone = "111";
  
          //静态成员
          private static int count = 10000;
          
          public void show(){								//【看我看我】
              //调用外部类的属性
              Outer outer = new Outer();  //1。先创建一个外部对象
  
              System.out.println(outer.name);//2。再调用外部类的属性
              System.out.println(outer.age);
  
              //调用静态内部类的属性和方法
              System.out.println(address);//其实相当于(this.address)
              System.out.println(phone);//这里也是
  
              //调用静态内部类的静态属性
              System.out.println(Inner.count);
  
  
          }
      }
  }
  ~~~~

  ~~~java
  //这里是TestOuter.java
  package com.joker_yue.javalearn.object2;
  
  public class TestOuter {
      public static void main(String[] args) {
          //可以直接创建静态内部类对象，可不用创建外部类对象
          Outer.Inner inner = new Outer.Inner();
          //外部类.内部类 内部类对象名 = new 外部类.内部类();
          inner.show();
      }
  }
  ~~~

  上述代码执行后会生成如下信息：

  ~~~java
  XXX
  18
  湖南
  111
  10000
  ~~~



⚠️请与之前的==成员内部类==做对比：

  ~~~java
  //        //1.先创建外部类对象
  //        Outer outer = new Outer();
  //
  //        //2.创建内部类对象
  //        Outer.Inner inner = outer.new Inner();
  //        //外部类.内部类 内部类对象 = 外部类对象.new 内部类();
  
          //一步到位
          Outer.Inner inner = new Outer().new Inner();
          inner.show();
  ~~~



* 注意，只有内部类才能声明为static静态内部类，没有静态外部类一说！



---

#### 局部内部类

* ==定义在外部类方法中==，作用范围和创建对象范围仅限于当前方法

  ~~~java
  //这里是Outer.java
  //新的包
  package com.joker_yue.javalearn.object3;
  
  //外部类
  public class Outer {
      private String name = "彭于晏";
      private int age = 35;
  
      public  void show(){
          //⚠️局部变量不能加public或者private之类的修饰符
          //同理，局部类也是不能加的
  
          //定义局部变量
          String address  = "湖南";
          //局部内部类
          class Inner{
              //可以设置局部内部类的属性
              private String phone ="88888888";
              private String email = "Joker_Yue@qq.com";
  
              public void show2(){
                  //访问外部类的属性？
                  System.out.println(name);//是可以的！相当于省略了(Outer.this.name)
                  System.out.println(age);//但是如果你将public void show()声明为static，那么需要声明Outer对象才能使用
                  //访问内部类的属性
                  System.out.println(phone);//相当于(this.phone)
                  System.out.println(email);
  
              }
          }
      }
  }
  ~~~

  ~~~JAVA	
  //这里是TestOuter.java
  package com.joker_yue.javalearn.object3;
  
  public class TestOuter {
      public static void main(String[] args) {
          Outer outer = new Outer();
          outer.show();
      }
  }
  ~~~

  上述代码执行后将会没有任何输出结果，原因是在show()方法中并未创建Inner对象。

  要想让其有输出结果，我们在Outer.java的show()中应当创建Inner对象，并让其执行show2()方法

  ~~~java
  //这里是Outer.java
  package com.joker_yue.javalearn.object3;
  
  //外部类
  public class Outer {
      private String name = "彭于晏";
      private int age = 35;
  
      public  void show(){
          //⚠️局部变量不能加public或者private之类的修饰符
          //同理，局部类也是不能加的
  
          //定义局部变量
          String address  = "湖南";
          //局部内部类
          class Inner{
              //可以设置局部内部类的属性
              private String phone ="88888888";
              private String email = "Joker_Yue@qq.com";
  
              public void show2(){
                  //访问外部类的属性？
                  System.out.println(name);//是可以的！相当于省略了(Outer.this.name)
                  System.out.println(age);//但是如果你将public void show()声明为static，那么需要声明Outer对象才能使用
                  //访问内部类的属性
                  System.out.println(phone);//相当于(this.phone)
                  System.out.println(email);
              }
          }
  
          //创建内部类对象
          Inner inner = new Inner();				//【看我看我】
          inner.show2();
      }
  }
  ~~~

  上述代码执行后将会生成如下信息：

  ~~~java
  彭于晏
  35
  88888888
  Joker_Yue@qq.com
  ~~~

  我们似乎还忘了什么东西没有输出。对，address

  ~~~java
  //这里是Outer.java
  package com.joker_yue.javalearn.object3;
  
  //外部类
  public class Outer {
      private String name = "彭于晏";
      private int age = 35;
  
      public  void show(){
          //⚠️局部变量不能加public或者private之类的修饰符
          //同理，局部类也是不能加的
  
          //定义局部变量
          String address  = "湖南";
          //局部内部类
          class Inner{
              //可以设置局部内部类的属性
              private String phone ="88888888";
              private String email = "Joker_Yue@qq.com";
  
              public void show2(){
                  //访问外部类的属性？
                  System.out.println(name);//是可以的！相当于省略了(Outer.this.name)
                  System.out.println(age);//但是如果你将public void show()声明为static，那么需要声明Outer对象才能使用
                  //访问内部类的属性
                  System.out.println(phone);//相当于(this.phone)
                  System.out.println(email);
                  //访问局部变量。					//【1】
                  System.out.println(address);
              }
          }
  
          //创建内部类对象
          Inner inner = new Inner();
          inner.show2();
      }
  }
  ~~~

  【1】：注意，访问局部变量时，在Java1.7之前需要手动将局部变量声明为final才能输出，而在Java1.8之后将会隐式的自动的加上final关键字（为手指头增加寿命）

    * 局部类访问外部类当前方法中的局部变量时，因无法保障变量的生命周期与自身相同，变量必须修饰为final

  [为何一定要将局部变量声明为final呢？(哔哩哔哩)](https://www.bilibili.com/video/BV1vt4y197nY?p=6&spm_id_from=pageDriver&vd_source=814489e71df641c4b2c0ff7d4659b2d0&t=669.2)

  ```java
  //在局部内部类中是不能包含静态成员的
  private static int count = 20;		//是错误的
  ```

  ```JAVA
  //但是可以声明为`final static`
  private final static int count = 20;		//是正确的
  ```