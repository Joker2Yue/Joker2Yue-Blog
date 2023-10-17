---
title: 跟随狂神学Java-22，集合
date: 2023/02/23 04:02:22
tags:
  - 狂神
  - Java
  - JavaSE
categories:
  - [跟随狂神学Java]
  - [Java]
cover: https://resource.joker2yue.cn/blog/images/coverImg/JavaSE/11.jpg
keywords:
   - 集合
   - 数组
   - 链表
   - java.util.Collection
   - 迭代器
   - List
   - ArrayList
   - LinkedList
   - Vector
   - 线程安全
ai:
   - 介绍了Java中集合的基本概念、使用方法和常见集合类，以及迭代器和线程安全性。
   - 文章涵盖了Java集合的核心概念，包括集合类的应用、数据存储、迭代方法和线程安全性。还介绍了List接口和ArrayList、LinkedList、Vector等常见集合类的特点。
   - 这篇文章详细探讨了Java编程中的集合概念，包括集合的作用、数据存储方式、常见集合类和它们的方法。还讨论了迭代器用于遍历集合和线程安全性。此外，文章介绍了List接口及其独特方法，并解释了ArrayList、LinkedList和Vector集合的特点和用途。
---
# 跟随狂神学Java

##### 第二十二天：集合

> “简单之至则为雅致。”
>
> *~~[狂神未更新，转动力节点(bilibili.com)](https://www.bilibili.com/video/BV1Rx411876f?t=175.3&p=660)~~*

## 学习内容

##### 什么是集合，有什么用？

数组其实就是一个集合，集合实际上就是一个容器。可以用来容纳其他类型的数据

##### 集合在实际开发中使用较多

集合是一个容器，是一个载体，可以一次承载多个对象。在实际开发中，假设连接数据库，数据库中有10条记录，那么假设把这10条记录查询出来，在java程序中会将10条数据封装成10个java对象，然后10个Java对象放到某一个集合当中，将集合传到前端，然后遍历集合，将一个数据一个数据展现出来

##### 集合中储存什么

集合不能直接储存基本数据类型，另外集合也不能直接存储Java对象，集合当中存储的都是**Java对象的内存地址**（或者说集合中存储的是**引用**）

不过有这样一条代码

~~~java
list.add(100);
~~~

看上去是存了一个int类型数据，实际上因为Java的自动装箱，会将100自动转换成Integer对象然后储存其引用

注意：集合在Java中本身是**一个容器，是一个对象**。集合任何时候存储的都是引用

---

* 在Java中每一个不同的集合，底层会对应不同的数据结构。往不同的集合中存储元素，等于将数据放到了不同的数据结构当中。

* 在集合中，我们需要做的不是精通数据结构，Java中已经将数据结构实现了，已经写好了这些常用的集合类。我们只需要掌握如何使用、在什么情况下选择哪一种合适的集合去使用

比如：

1. `new ArrayList();`	创建一个集合对象，底层是数组
2. `new LinkedList(); ` 创建一个集合对象，底层是链表
3. `new TreeSet(); `     创建一个集合对象，底层是二叉树





#### 集合继承结构图（了解）

---

集合在`java.util.*`下，所有的集合类和集合接口都在此包下

##### 在Java中，集合分为两大类

1. 单个方式存储元素

   超级父接口是`java.util.Collection;`

2. 键值对方式存储元素

   超级父接口是`java.util.Map;`

<img src="./跟随狂神学Java-22.assets/image-20230106173645210.png" alt="image-20230106173645210" style="zoom:50%;" />

<img src="./跟随狂神学Java-22.assets/image-20230106173823038.png" alt="image-20230106173823038" style="zoom:50%;" />



#### Collection接口中的方法

---

1. Collection中能存放什么元素

   没有使用“泛型”之前，Collection中可以存放Object的所有子类型

   使用了“泛型”之后，Collection只能存放某个指定的具体的类型

   集合中不能存储基本数据类型，也不能存储Java对象，只是存储Java对象的内存地址

2. Collection中的常用方法

   | **方法摘要**   |                                                              |
   | -------------- | ------------------------------------------------------------ |
   | ` boolean`     | `**[add](https://itmyhome.com/java-api/java/util/Collection.html#add(E))**(E e)`      确保此 collection 包含指定的元素（可选操作）。 |
   | ` boolean`     | `**[addAll](https://itmyhome.com/java-api/java/util/Collection.html#addAll(java.util.Collection))**(Collection<? extends E> c)`      将指定 collection 中的所有元素都添加到此 collection 中（可选操作）。 |
   | ` void`        | `**[clear](https://itmyhome.com/java-api/java/util/Collection.html#clear())**()`      移除此 collection 中的所有元素（可选操作）。 |
   | ` boolean`     | `**[contains](https://itmyhome.com/java-api/java/util/Collection.html#contains(java.lang.Object))**(Object o)`      如果此 collection 包含指定的元素，则返回 `true`。 |
   | ` boolean`     | `**[containsAll](https://itmyhome.com/java-api/java/util/Collection.html#containsAll(java.util.Collection))**(Collection<?> c)`      如果此 collection 包含指定 collection 中的所有元素，则返回 `true`。 |
   | ` boolean`     | `**[equals](https://itmyhome.com/java-api/java/util/Collection.html#equals(java.lang.Object))**(Object o)`      比较此 collection 与指定对象是否相等。 |
   | ` int`         | `**[hashCode](https://itmyhome.com/java-api/java/util/Collection.html#hashCode())**()`      返回此 collection 的哈希码值。 |
   | ` boolean`     | `**[isEmpty](https://itmyhome.com/java-api/java/util/Collection.html#isEmpty())**()`      如果此 collection 不包含元素，则返回 `true`。 |
   | ` Iterator<E>` | `**[iterator](https://itmyhome.com/java-api/java/util/Collection.html#iterator())**()`      返回在此 collection 的元素上进行迭代的迭代器。 |
   | ` boolean`     | `**[remove](https://itmyhome.com/java-api/java/util/Collection.html#remove(java.lang.Object))**(Object o)`      从此 collection 中移除指定元素的单个实例，如果存在的话（可选操作）。 |
   | ` boolean`     | `**[removeAll](https://itmyhome.com/java-api/java/util/Collection.html#removeAll(java.util.Collection))**(Collection<?> c)`      移除此 collection 中那些也包含在指定 collection 中的所有元素（可选操作）。 |
   | ` boolean`     | `**[retainAll](https://itmyhome.com/java-api/java/util/Collection.html#retainAll(java.util.Collection))**(Collection<?> c)`      仅保留此 collection 中那些也包含在指定 collection 的元素（可选操作）。 |
   | ` int`         | `**[size](https://itmyhome.com/java-api/java/util/Collection.html#size())**()`      返回此 collection 中的元素数。 |
   | ` Object[]`    | `**[toArray](https://itmyhome.com/java-api/java/util/Collection.html#toArray())**()`      返回包含此 collection 中所有元素的数组。 |
   | `<T> T[]`      | `**[toArray](https://itmyhome.com/java-api/java/util/Collection.html#toArray(T[]))**(T[] a)`      返回包含此 collection 中所有元素的数组；返回数组的运行时类型与指定数组的运行时类型相同。 |

 

~~~JAva
package com.joker_yue.javalearn.Collection;

import java.security.cert.CollectionCertStoreParameters;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Objects;

//关于Java.util.Collection中常用的方法
public class CollectionTest01 {
    public static void main(String[] args) {
//创建一个集合对象
//      Collection c = new Collection() ; 是不可取的，因为接口是抽象的，无法实例化
//      所以使用多态 创建一个父类型的子对象
        Collection c = new ArrayList();

//        测试Collection接口中的常用方法
        c.add(1200);//自动装箱，实际上是放进去了一个Integer对象的内存地址
        c.add(3.14);
        c.add(new Student());

//获取集合中元素的个数
        System.out.println("集合中元素的个数是"+c.size());

//清空集合
        c.clear();
        System.out.println("集合中元素的个数是"+c.size());

//        再向集合中添加元素
        c.add("hello");
        c.add("world");
        c.add("Java");
        c.add("Joker_yue");

//判断集合中是否有指定的元素，包含返回ture否则false
        System.out.println(c.contains("Java"));//ture
        System.out.println(c.contains("hell"));//false

//删除集合中元素
        System.out.println("集合中元素的个数是"+c.size());
        c.remove("Java");//删除集合中的某元素
        System.out.println("集合中元素的个数是"+c.size());

//        判断集合是否为空
        System.out.println("C中是空的吗"+c.isEmpty());

//转换为数组
        Object[] obj = c.toArray();//这是对象数组
//        输出数组
        for (int i = 0; i < obj.length; i++) {
            System.out.println("这是第"+i+"个元素，它是"+obj[i]);
        }
    }
}

class Student{}

~~~

输出结果为:

~~~java
集合中元素的个数是3
集合中元素的个数是0
true
false
集合中元素的个数是4
集合中元素的个数是3
C中是空的吗false
这是第0个元素，它是hello
这是第1个元素，它是world
这是第2个元素，它是Joker_yue
~~~

---

##### Collection迭代

什么是迭代？重复反馈过程的活动，就是遍历

在目前学习中说所学习的迭代（遍历）方法，是所有Collection中通用的一种方法，这种方法在Map中不能用，在所有的Collection以及子类中能使用 

<img src="./跟随狂神学Java-22.assets/image-20230109215503510.png" alt="image-20230109215503510" style="zoom:67%;" />

  ~~~Java
  package com.joker_yue.javalearn.Collection;
  
  import java.util.*;
  
  public class CollectionTest02 {
      public static void main(String[] args) {
  //创建集合对象
          Collection c = new ArrayList();
  //添加元素
          c.add("abc");
          c.add("def");
          c.add(100);
          c.add(new Object());
  //对集合进行迭代
  //      1. 获取集合的迭代器对象
          Iterator it = c.iterator();
  
  //      2. 通过以上获取到的迭代器对象开始遍历集合
  //      以下两个方法是对象Iterator中的方法
          /* boolean hasNext()如果仍有元素可以迭代则返回ture
          * Object next() 返回迭代的下一个元素 */
          /*注意：迭代器it初始化时并没有指向第一个对象*/
          while (it.hasNext()){
              Object obj = it.next();
              System.out.println(obj);
          }
      }
  }
  ~~~

迭代器是一个对象 ，迭代器有两个方法：`next()`和`hasNext()`

---

##### 迭代器是通用的

~~~java
package com.joker_yue.javalearn.Collection;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;

public class ColllectionTest03 {
    public static void main(String[] args) {
//        创建集合对象
        Collection c1 = new ArrayList();
//        添加元素，arrayList无序可重复
        c1.add(2);
        c1.add(3);
        c1.add(1);
        c1.add(4);
        c1.add(1);
//        迭代集合
        Iterator it = c1.iterator();
        while(it.hasNext()){
            System.out.println(it.next());
        }

//        hashSet集合：无序单不可重复(存进去和取出来不一定顺序相同）
        Collection c2 = new HashSet();
        c2.add(100);
        c2.add(200);
        c2.add(300);
        c2.add(100);
        it = c2.iterator();
        while(it.hasNext()){
            System.out.println(it.next());
        }
    }
}
~~~

---

##### Contains方法解析

原理：底层调用了`equals`方法

~~~JAva
package com.joker_yue.javalearn.Collection;

import java.util.ArrayList;
import java.util.Collection;

public class CollectionTest04 {
    public static void main(String[] args) {
//        创建集合对象
        Collection c= new ArrayList();

//        向集合中存储元素
        String s1 = new String ("abc");
        c.add(s1);

        String s2 = new String("def");
        c.add(s2);

//        集合中元素的个数
        System.out.println("元素个数:"+c.size());

//        判断集合中是否包括x
        String x = new String ("abc");
        System.out.println(c.contains(x));//ture，contains底层调用equals方法
    }
}
~~~

注意有时候要重写equals方法才能判断相等。将来调用equals方法的时候，一定是调用这个重写的方法

---

##### remove方法

remove也会调用`equals`方法

~~~Java
package com.joker_yue.javalearn.SimpleDateFormat;

import java.util.ArrayList;
import java.util.Collection;

public class CollectionTest03 {
    public static void main(String[] args) {
//        创建集合对象
        Collection cc = new ArrayList();
//        创建了一个新的字符串对象
        String s1 = new String("hello");
//        加进去
        cc.add(s1);
//        删除s2
        String s2 = new String("hello");
        cc.remove(s2);
//        输出
        System.out.println(cc.size());
    }
}
~~~

结果是

~~~java
0
~~~

所以有时候使用`remove`时也需要重写`equals`

---

##### 迭代器对象的注意事项

元素每改动一次，应当重新获取迭代器对象，就像这样：

~~~Java
package com.joker_yue.javalearn.SimpleDateFormat;

import java.sql.Array;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

public class CollectionTest06 {
    public static void main(String[] args) {
//        创建集合
        Collection c = new ArrayList();

//        Iterator it = c.iterator();       【1】在获取了迭代器后再改动（代码中为添加）元素，会抛出异常
//                                              异常为: java.util.ConcurrentModificationException


//        添加元素
        c.add(1);
        c.add(2);
        c.add(3);
//        获取迭代器
//        注意：此时获取的迭代器，指向的是集合中没有元素状态下的迭代器
        Iterator it = c.iterator();//       【2】一定要注意，集合结构只要发生改变，迭代器必须重新获取
        while(it.hasNext()){
            Object obj = it.next();
//            返回时必须是Object
//            Integer i = it.next();
            System.out.println(obj);

        }
    }
}
~~~

 但是我们如何挨个删除里面的元素呢？我们可以使用迭代器删除元素，就像这样

~~~Java
package com.joker_yue.javalearn.SimpleDateFormat;

import java.sql.Array;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

public class CollectionTest06 {
    public static void main(String[] args) {
//        创建集合
        Collection c = new ArrayList();

//        Iterator it = c.iterator();       【1】在获取了迭代器后再改动（代码中为添加）元素，会抛出异常
//                                              异常为: java.util.ConcurrentModificationException


//        添加元素
        c.add(1);
        c.add(2);
        c.add(3);
//        获取迭代器
//        注意：此时获取的迭代器，指向的是集合中没有元素状态下的迭代器
        Iterator it = c.iterator();//       【2】一定要注意，集合结构只要发生改变，迭代器必须重新获取
        while(it.hasNext()){
            Object obj = it.next();
//            会报错，因为没有及时更新迭代器
//            c.remove(obj);
//            使用迭代器删除:
            it.remove();//删除的一定是迭代器指向的当前元素
            System.out.println(obj);

        }
    }
}
~~~

这是为什么？

获取的迭代器对象，迭代器用来遍历集合，此时相对于当前集合的状态拍了一个快照。迭代器迭代的时候会参照这个快照进行迭代

当我们直接使用集合删除元素的时候，会抛出异常，根本原因是没有更新迭代器。但是如果我们使用迭代器删除的时候，迭代器对象和元素对象都会被删除，就不会抛出异常

---

##### List接口独有方法

1. List集合存储元素特点：有序可重复

   有序：List集合中的元素有下标，从0开始以1递增

   可重复：相同元素可反复存储

2. List既然是Collection接口的子接口，那么肯定List接口有自己的“特色的”方法

 ~~~Java
 package com.joker_yue.javalearn.SimpleDateFormat;
 
 import java.util.Iterator;
 import java.util.LinkedList;
 import java.util.List;
 import java.util.Vector;
 
 public class CollectionTest07 {
     public static void main(String[] args) {
 //        创建List类型的集合
         List myList = new LinkedList();
 //        List myList = new Vector();
 
 //        添加元素
         myList.add("A");//默认向集合末尾添加元素
         myList.add("B");
         myList.add("C");
         myList.add("D");
 //        特有的add方法，在指定位置插入指定元素
 //        这个方法使用的不多，因为效率比较低
         myList.add(1,"King");
 
 //        迭代
         Iterator it = myList.iterator();
         while(it.hasNext()){
             Object obj = it.next();
             System.out.println(obj);
         }
 
 //      根据下标获取元素
         Object firstObj = myList.get(1);
         System.out.println(firstObj);
 
 //        因为有下标，所以List集合有自己的比较特殊的遍历方式
         for (int i = 0; i < myList.size(); i++) {
             System.out.println(myList.get(i));
         }
 
 //        获取指定对象第一次出现处的索引
         System.out.println(myList.indexOf("King"));
 //        获取指定对象最后一次出现的索引
         System.out.println(myList.lastIndexOf("C"));
 //        删除指定位置的元素
         myList.remove(1);System.out.println(myList.size());
 //        修改指定位置元素
         myList.set(2,"Sorry");
         for (int i = 0; i < myList.size(); i++) {
             System.out.println(myList.get(i));
         }
     }
 }
 ~~~

---

##### ArrayList集合初始化容量以及扩容

1. ArrayList初始容量是10

2. ArrayList底层是Object类型的数组

3. ArrayList集合的扩容，是原容量的1.5倍

   ArrayList集合的底层是数组，怎么优化？

   尽可能少的扩容，因为数组扩容效率比较低，建议在ArrayList集合创建的时候预估要使用的容量，减少使用扩容的次数

~~~Java
package com.joker_yue.javalearn.SimpleDateFormat;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

public class ArrayListTest02 {
    public static void main(String[] args) {
//        默认初始化容量10
        List myList1 = new ArrayList();
//        初始化100
        List myList2 = new ArrayList(100);

        Collection c = new HashSet();
        c.add(100);
        c.add(200);
        c.add(300);
        c.add(900);
        c.add(50);
//         通过此构造方法就可以将HashSet转换成List
        List myList3 = new ArrayList(c);
        for (int i = 0; i < myList3.size(); i++) {
            System.out.println(myList3.get(i));
        }
    }
}
~~~

---

##### 链表的优点和缺点

优点：随机增加元素的效率高（因为链表上的元素在空间存储上内存地址不连续，增加元素不涉及到大量元素的位移）

缺点：查询效率低，每一次查找整个元素的时候就要从节点开始向下查询（不通过数学表达式计算被查找元素的内存地址）

ArrayList：把检索发挥到极致（末尾添加元素效率还是很高的）

LinkedList：把随机增删发挥到极致

---

##### LinkedList源码分析

```Java
package com.joker_yue.javalearn.SimpleDateFormat;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class LinkedListTest {
    public static void main(String[] args) {
//        LinkedList集合底层也是有下标的
//        注意:ArrayList之后所以检索效率比较高,不是单纯因为下标的原因,是因为底层数组发挥的作用
//        LinkedList集合照样有下标,但是检索/查找某个元素的时候效率比较低,因为只能从头节点开始一个一个遍历
        List list = new LinkedList();
        list.add("a");
        list.add("b");
        list.add("c");

        for (int i = 0; i < list.size(); i++) {
            Object obj = list.get(i);
            System.out.println(obj);
        }

//        LinkedList 有初始化容量吗？没有
//        最初这个链表中没有任何元素 first和last引用中都是null
//        不管LinkedList还是ArrayList，以后写代码不需要关心具体是哪个集合，因为我们要面向接口编程 调用的方法都是接口中的方法
//        List list2 = new ArrayList(); 这样写说明底层用了数组
        List list2 = new LinkedList();  //这样写说明底层用了双向链表

//        以下的这些方法都是面向接口编程
//        底层结构从数组变成了链表，但是大部分代码不用改，这就是面向接口编程的好处
        list2.add("123");
        list2.add("456");
        list2.add("789");
        for (int i = 0; i < list2.size(); i++) {
            System.out.println(list2.get(i));
        }
    }
}
```

----

##### LinkedList总结

* 采用的底层原理是双向链表
* 对于链表数据结构，堆积增删效率较高，检索效率较低
* 链表中的元素在空间存储上，空间地址不连续



#### Vector源码分析

---

```java
package com.joker_yue.javalearn.DataStruct;

import java.sql.Array;
import java.util.*;

/*
    Vector
    1. 底层也是一个数组
    2. 初始化容量：10
    3. 怎么扩容的
        扩容之后是原容量的2倍
        10-->20 -->40 -->80
    4. ArrayList扩容特点：
        10-->15 -->15*1.5
        1.5倍
    5. Vector中所有方法都是线程同步的，都带有synchronized关键字，是线程安全的。效率较低，使用较少
    6. 如何将一个线程不安全的ArrayList集合转换为线程安全的Vector集合
        使用集合工具类java.util.Collections;
            (这个才是集合接口：java.util.Collection;)
 */
public class VectorTest {
    public static void main(String[] args) {
//        创建一个Vector集合
        Vector vector = new Vector();
//        添加元素
//        默认容量是10
        vector.add(1);
        vector.add(2);
        vector.add(3);
        vector.add(4);
        vector.add(5);
        vector.add(6);
        vector.add(7);
        vector.add(8);
        vector.add(9);
        vector.add(10);
//        满了扩容
        vector.add(11);

        Iterator it = vector.iterator();
        while (it.hasNext()) {
            Object obj = it.next();
            System.out.println(obj);
        }
//        这个可能以后要使用
        List myList = new ArrayList();  //非线程安全的
//        变成线程安全的
        Collections.synchronizedList(myList);//这里通过多线程才能看效果
//        在这里myList就是线程安全的了
        myList.add("111");
        myList.add("222");
        myList.add("333");
    }
}
```
