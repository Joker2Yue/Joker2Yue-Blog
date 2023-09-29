---
title: 跟随狂神学Java-23，泛型、自动推断机制、自定义泛型
date: 2023/02/27 04:02:22
tags:
  - 狂神
  - Java
  - JavaSE
categories:
  - [跟随狂神学Java]
  - [Java]
cover: https://resource.joker2yue.top/blog/images/coverImg/JavaSE/11.jpg
keywords:
  - Java
  - 泛型
  - 自动推断机制
  - 自定义泛型
ai:
  - 这篇文章介绍了Java中的泛型概念、自动推断机制和自定义泛型。泛型用于类型参数化，提高代码类型安全性和复用性。自动推断简化代码书写，而自定义泛型允许用户根据需求创建泛型方法和泛型类。
  - 这篇文章介绍了Java中的泛型（Generics）概念和用法，以及自动推断机制和自定义泛型的相关内容。泛型提高了集合的类型安全性，自动推断机制简化了代码，自定义泛型增强了代码的灵活性和可重用性。文章重点强调了泛型的作用和使用方法，为Java开发者提供了重要的编程工具。
  - 这篇文章介绍了Java中的泛型（Generics）概念和用法，以及自动推断机制和自定义泛型的相关内容。通过泛型，可以提高集合的类型安全性，实现数据类型的统一，避免类型转换。自动推断机制简化了泛型对象的声明，而自定义泛型则增加了代码的灵活性和可重用性。
---
# 跟随狂神学Java

##### 第二十三天：泛型、自动推断机制、自定义泛型

> “基础决定你未来的高度”
>
> *~~[狂神未更新，转动力节点(bilibili.com)](https://www.bilibili.com/video/BV1Rx411876f?t=175.3&p=660)~~*

## 学习内容

#### 泛型（相当于C++模板类，可以参照学习）

不使用泛型之前（Java5），分析程序存在缺点 

```java
package com.joker_yue.javalearn.DataStruct;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class GenericTest {
    public static void main(String[] args) {

//        不使用泛型之前，分析程序存在缺点
        List myList = new ArrayList();

//        准备对象
        Cat c = new Cat();
        Bird b = new Bird();

//        将对象添加到集合当中
        myList.add(c);
        myList.add(b);

//        遍历集合，取出Cat让它抓老鼠，取出Bird让他飞
        Iterator it = myList.iterator();
        while(it.hasNext()){
            Object obj = it.next();
            if (obj instanceof Cat){    //如果是Cat类
                ((Cat) obj).catchMouse();   //执行Cat中方法
            }
            if(obj instanceof Bird){    //如果是Bird中类
                ((Bird) obj).fly();         //执行Bird中方法
            }
        }
    }
}

class Animal{
    public void move(){
        System.out.println("动物正在移动");
    }

}

class Cat extends Animal{
    public void catchMouse(){
        System.out.println("猫抓老鼠");
    }

}

class Bird extends Animal{
    public void fly(){
        System.out.println("鸟儿在飞");
    }
}
```

上述程序中，我们无法做到集合中的类型相同，其中一个是Cat类一个是Bird类。

---

##### 什么情况下使用泛型？

如果我们想只要其中是Animal类，我们就可以使用泛型

~~~java
package com.joker_yue.javalearn.DataStruct;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class GenericTest {
    public static void main(String[] args) {
//      使用泛型List<Animal>之后，表示List集合中只允许存储Animal类型的数据，不允许存储其他类型的
        List<Animal> myList = new ArrayList<Animal>();
//      myList.add("abc");    是错误的，不允许储存除Animal类型以外的数据

//        指定List集合中只能存储Animal，那么储存String就会编译不通过
//        这样用了泛型之后，集合中的数据类型更加统一了

        Cat c = new Cat();
        Bird b = new Bird();

        myList.add(c);
        myList.add(b);

//        获取迭代器
//        这个表示迭代器迭代的是Animal类型
        Iterator<Animal> it = myList.iterator();
        while(it.hasNext()){
//            使用泛型之后，每一次迭代返回的数据都是Animal类型
            Animal a = it.next();
//            这里不需要进行强制类型转换了。直接调用
            a.move();

//            使用子类特有的方法还是需要向下转换的！看上一块代码

        }
    }
}

class Animal{
    public void move(){
        System.out.println("动物正在移动");
    }

}

class Cat extends Animal{
    public void catchMouse(){
        System.out.println("猫抓老鼠");
    }

}

class Bird extends Animal{
    public void fly(){
        System.out.println("鸟儿在飞");
    }
}
~~~

---

##### 需要注意

1. 使用JDK5之后的泛型机制
  2. 泛型这种语法机制，只会在程序编译时候起作用，只是给编译器看的
  3. 使用了泛型好处是什么？
     第一，集合中储存的元素类型统一了
     第二，从集合中取出的元素类型是泛型指定的类型，不需要进行大量的“向下转型”
  4. 泛型的缺点是什么？
     导致集合中的元素缺乏多样性
     大多数业务中，集合中元素类型还是统一的，所以这种泛型特性被大家所认可



#### 自动推断机制

---

有些时候我们觉得在迭代器迭代的时候总是需要主动去转换Obj类型，很麻烦，于是我们就使用迭代器泛型

```java
package com.joker_yue.javalearn.DataStruct;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/*
    JDK7之后引入了自动类型推断机制（又称为钻石表达式Diamand表达式）
 */
public class GenericTest02 {
    public static void main(String[] args) {
//        ArrayList<这里的类型会自动推断>()，前提是JDK8之后
//        自动类型推断，钻石表达式！
        List<Animal> myList = new ArrayList<>();	//【看我看我】

        myList.add(new Animal());
        myList.add(new Cat());
        myList.add(new Bird());

//        遍历
        Iterator<Animal> it = myList.iterator();
        while(it.hasNext()){
            Animal a = it.next();
            a.move();
        }
    }
}
```

其中特别标注位置，使用了自动推断机制，其严格书写应为`List<Animal> myList = new ArrayList<Animal>()`

---

##### 迭代器泛型

如果迭代器不加泛型，next（）的返回值类型就是Object

迭代器用泛型后，作用不是筛选，只是转换，转换为我们想要的类型。

~~~java
        List<String> strList = new ArrayList<>();

//        类型不匹配，因为不是String类
//        strList.add(new Cat());
        strList.add("abc");
        strList.add("java");
        strList.add("www.google.com");
//        类型不匹配
//        strList.add(123);

        System.out.println(strList.size());

        Iterator<String> it2 = strList.iterator();
        while(it2.hasNext()){
//            通过迭代器获取了String类型的数据，而不是默认的Object类型
            String str = it2.next();
            System.out.println(str);
        }
~~~

泛型可以节约代码量



#### 自定义泛型

---

其实泛型的本质就是：数据类型参数化

* 假定我们有这样一个需求：写一个排序方法，能够对整型数组、字符串数组甚至其他任何类型的数组进行排序，该如何实现？

  答案是可以使用 **Java 泛型**。

  使用 Java 泛型的概念，我们可以写一个泛型方法来对一个对象数组排序。然后，调用该泛型方法来对整型数组、浮点数数组、字符串数组等进行排序。

  下面描述的是将不同类别的数组进行元素输出

  ~~~java
  public class GenericMethodTest
  {
     // 泛型方法 printArray                         
     public static < E > void printArray( E[] inputArray )
     {
        // 输出数组元素  这里是增强for循环。实际上增强for循环就是隐式的调用了Iterator       
           for ( E element : inputArray ){        
              System.out.printf( "%s ", element );
           }
           System.out.println();
      }
   
      public static void main( String args[] )
      {
          // 创建不同类型数组： Integer, Double 和 Character
          Integer[] intArray = { 1, 2, 3, 4, 5 };
          Double[] doubleArray = { 1.1, 2.2, 3.3, 4.4 };
          Character[] charArray = { 'H', 'E', 'L', 'L', 'O' };
   
          System.out.println( "整型数组元素为:" );
          printArray( intArray  ); // 传递一个整型数组
   
          System.out.println( "\n双精度型数组元素为:" );
          printArray( doubleArray ); // 传递一个双精度型数组
   
          System.out.println( "\n字符型数组元素为:" );
          printArray( charArray ); // 传递一个字符型数组
      } 
  }
  ~~~

  

  ~~~java
  整型数组元素为:
  1 2 3 4 5 
  
  双精度型数组元素为:
  1.1 2.2 3.3 4.4 
  
  字符型数组元素为:
  H E L L O 
  ~~~

  

* 现在我们需要限制传入参数为指定类型，也可以使用泛型

  ```java
  package com.joker_yue.javalearn.DataStruct;
  
  public class GenericTest03 <GenericName>{  //尖括号中是标识符随便写
      public void doSome(GenericName o){ //提供了一个方法，其中的参数类型必须是GenericName类型。
          System.out.println(o);
      }
  
      public static void main(String[] args) {
  
          // new对象的时候规定了泛型是 String类型
          GenericTest03<String> gt = new GenericTest03<>();
          // 所以传doSome参数的时候也只能是String类型
          gt.doSome("abc");
          //类型不匹配
          //gt.doSome(100);
  
  
  //        ==========================================
          GenericTest03<Integer> gt2 = new GenericTest03<>();//规定泛型用Integer，doSome方法就得用Integer
          gt2.doSome(100);
  
          //类型不匹配
          //gt2.doSome("abc");
      }
  }
  ```

* 这里也是

  ~~~java
  package com.joker_yue.javalearn.DataStruct;
  
  public class GenericTest03 <GenericName>{  //尖括号中是标识符随便写
      public void doSome(GenericName o){ //提供了一个方法，其中的参数类型必须是GenericName类型。
          System.out.println(o);
      }
  
      public static void main(String[] args) {
  
          MyIterator<String> mi = new MyIterator<>(); //创建为String
          String s1 = mi.get();   //mi1.get()返回String类型
  
          MyIterator<Animal> mi2 = new MyIterator<>();    //创建为Animal
          Animal a = mi2.get();   //mi1.get()返回Animal类型
  
      }
  }
  
  class MyIterator<T>{
      public T get() {
          return null;
      }
  }
  ~~~

* 如果强制不使用泛型的话，就会返回Object类型

  ~~~Java
  package com.joker_yue.javalearn.DataStruct;
  
  public class GenericTest03 <GenericName>{  //尖括号中是标识符随便写
      public void doSome(GenericName o){ //提供了一个方法，其中的参数类型必须是GenericName类型。
          System.out.println(o);
      }
  
      public static void main(String[] args) {
  
  //        当然你要强制不适用泛型的话，就会返回为Object类型
          GenericTest03 gt3 = new GenericTest03();
          gt3.doSome(new Object());
  
      }
  }
  
  ~~~

  <img src="./跟随狂神学Java-23.assets/image-20230226205848399.png" alt="image-20230226205848399" style="zoom: 33%;" />

