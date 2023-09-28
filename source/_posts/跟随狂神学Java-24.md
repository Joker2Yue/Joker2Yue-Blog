---
title: 跟随狂神学Java-24，HashSet、TreeSet、自平衡二叉树
date: 2023/03/09 04:02:22
tags:
  - 狂神
  - Java
  - JavaSE
  - 必看
categories:
  - [跟随狂神学Java, 必看, 技术, Java]
cover: /images/coverImg/JavaSE/11.jpg
keywords:
  - HashSet
  - TreeSet
  - 自平衡二叉树
  - Map接口
  - 哈希表数据结构
  - hashCode
  - equals
  - JDK8改进
ai:
  - 文章介绍了HashSet和TreeSet集合、Map接口方法，强调了哈希表数据结构的重要性。
  - 这篇文章讲解了HashSet和TreeSet集合的特点，以及Map接口的常用方法。重点强调了哈希表数据结构的结合特性，以及对hashCode和equals方法的重写。
  - 文章详细介绍了HashSet和TreeSet集合的无序、不可重复特性，以及Map接口的常用方法和哈希表数据结构。还讨论了如何同时重写hashCode和equals方法，以确保在HashMap中正确使用。最后提到了Java对HashMap的改进，包括将链表转换为红黑树的优化策略。
---
# 跟随狂神学Java

##### 第二十四天：HashSet、TreeSet、自平衡二叉树

> 知识最大的敌人不是无知，而是错觉。
>
> *~~[狂神未更新，转动力节点(bilibili.com)](https://www.bilibili.com/video/BV1Rx411876f?t=175.3&p=660)~~*

## 学习内容

#### HashSet集合

特点：无序，不可重复

```Java
package com.joker_yue.javalearn.DataStruct;

import java.util.HashSet;
import java.util.Set;

public class HashSetTest {
    public static void main(String[] args) {
        Set<String> str = new HashSet<>();

        //添加元素
        str.add("hello3");
        str.add("hello4");
        str.add("hello1");
        str.add("hello2");
        str.add("hello3");
        str.add("hello3");
        str.add("hello3");
        str.add("hello3");

        for(String s:str){
            System.out.println(s);
        }
        /*
        1.存入和取出的数据不同。
        2.数据不可重复
        3.放到HashSet集合中的元素实际上是放到HashMap集合的key部分了
         */


    }
}
```

上述代码的输出结果为

~~~java
hello1
hello4
hello2
hello3
~~~



#### TreeSet集合

---

特点：无序，不可重复，但是储存的元素可以自动按照大小排序

  ~~~java
  package com.joker_yue.javalearn.DataStruct;
  
  import java.util.Set;
  import java.util.TreeSet;
  
  /*
  TreeSet集合的存储特点：
      1.无序不可重复，但是存储的元素可以自动按照大小排序
          称为：可排序集合
      2.无序指的是存进去的顺序和取出来的顺序不同，并且没有下标
   */
  public class TreeSetTest {
      public static void main(String[] args) {
          //创建集合对象
          Set<String> str = new TreeSet<>();
          //添加元素
          str.add("A");
          str.add("B");
          str.add("Z");
          str.add("Y");
          str.add("Z");
          str.add("K");
          str.add("M");
          //遍历
          for (String s : str) {
              System.out.println(s);
          }
      }
  }
  
  ~~~

上述代码的输出结果为

~~~java
A
B
K
M
Y
Z
~~~



#### Map接口常用方法

---

**`java.util.Map`**

1.  Map和Collection没有继承关系
2.  Map集合以key和value的方式存储数据，我们称之为键值对
    key和value都是引用数据类型
    key和value都是存储对象的内存地址
    key起到主导的地位，value是key的一个附属品

| 方法                                   | 说明                                             |
| -------------------------------------- | ------------------------------------------------ |
| V	remove(Object key)                |                                                  |
| V	get(Object key)                   | 通过key获取value                                 |
| V	put(K key, V value)               | 向Map中添加键值对                                |
| void	clear()                        | 清空Map集合                                      |
| boolean	containsKey(Object key)     | 判断Map中是否包含某个key                         |
| boolean	containsValue(Object value) | 判断Map中是否包含某个value                       |
| boolean	isEmpty()                   | 判断集合是否为空                                 |
| Set<K>	keySet()                     | 获取Map集合所有的key（所有key是一个Set集合）     |
| int	size()                          | 获取Map集合中所有键值对的数量                    |
| Collection<V>	values()              | 获取Map集合中所有的value，返回一个Collection集合 |
| Set<Map.Entry<K,V>>	entrySet()      | 将Map集合转换为Set集合                           |

注意：将Map集合通过entrySet()方法转换成的这个Ser集合，Set集合中元素的类型是Map. Entry<K,V>

​		Map.Entry和String一样，都是一种类型的名字，只不过，Map.Entry是静态内部类，是Map中的

<img src="./跟随狂神学Java-24.assets/image-20230227212321133.png" alt="image-20230227212321133" style="zoom: 25%;" />

~~~java
package com.joker_yue.javalearn.Maps;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class MapTest01 {
    public static void main(String[] args) {
        //创建Map集合对象
        Map<Integer, String> map = new HashMap<>();
        //向Map集合中添加键值对
        map.put(1, "zhangsan");//1在这里进行了自动装箱
        map.put(2, "lisi");
        map.put(3, "wangwu");
        map.put(4, "zhaoliu");
        //通过key获取value
        String value = map.get(2);
        System.out.println(value);
        //获取键值对的数量
        System.out.println("键值对的数量:" + map.size());
        //通过key删除key.value
        map.remove(2);
        System.out.println("键值对的数量:" + map.size());
        //contains方法中都是通过equals进行比对的，所以自定义类型需要重写equals方法
        //判断是否包含某个key
        System.out.println(map.containsKey(4));//ture
        //判断是否包含某个value
        System.out.println(map.containsValue("wangwu"));//ture

        //获取所有的value
        Collection<String> values = map.values();
        for (String s : values) {
            System.out.println(s);
        }

        //清空集合
        map.clear();
        System.out.println("键值对的数量:" + map.size());
        //判断是否为空
        System.out.println(map.isEmpty());//ture


    }
}
~~~

---

##### Map集合的遍历

我们可以先提取出所有的key，然后再匹配key提出value

```java
package com.joker_yue.javalearn.Maps;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

/*
    Map集合的遍历
 */
public class MapTest02 {
    public static void main(String[] args) {
        //第一种方式：获取所有的key，通过遍历key，来遍历value
        Map<Integer,String> map = new HashMap<>();
        map.put(1,"zhangsan");
        map.put(2,"lisi");
        map.put(3,"wangwu");
        map.put(4,"zhaoliu");
        //遍历Map集合
        //先获取所有的Key，所有的key是一个Set集合
        Set<Integer> keys = map.keySet();
        //遍历key获取value
        //迭代器可以
        Iterator<Integer> it = keys.iterator();
        while(it.hasNext()){
            //取出其中一个key，通过key获取value
            it.next();
            Integer key = it.next();
            String value = map.get(key);
            System.out.println(key + "="+value);
        }
        //foreach可以
        for (Integer key :
                keys) {
            System.out.println(key + "=" +map.get(key));
        }

    }
}
```

我们也可以通过Node节点中的方法来进行迭代

```java
package com.joker_yue.javalearn.Maps;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

/*
    Map集合的遍历
 */
public class MapTest02 {
    public static void main(String[] args) {
       	
        Map<Integer, String> map = new HashMap<>();
        map.put(1, "zhangsan");
        map.put(2, "lisi");
        map.put(3, "wangwu");
        map.put(4, "zhaoliu");
        //第二种方式：Set<Map,Entry<K,V>> entrySet()
        //以上这个方法是把Map集合直接全部转换为Set集合
        //Set集合中元素的类型是<Map,Entry>
        Set<Map.Entry<Integer, String>> set = map.entrySet();
        //Set集合中存的是Map.Entry。类型是<Integer,String>
        //遍历Set集合，每一次取出一个Node
        //迭代器
        Iterator<Map.Entry<Integer, String>> it2 = set.iterator();
        while (it2.hasNext()) {
            Map.Entry<Integer, String> node = it2.next();
            //这个node其实就是那个Node
            //我们通过Node中的getKey()方法获取一个key
            //也可以通过Node中的getValue()方法获取一个value
            Integer key = node.getKey();
            String value = node.getValue();
            System.out.println(key + "=" + value);
        }


    }
}
```

我们可以将上述while改写成foreach

```java
package com.joker_yue.javalearn.Maps;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

/*
    Map集合的遍历
 */
public class MapTest02 {
    public static void main(String[] args) {
     
        Map<Integer, String> map = new HashMap<>();
        map.put(1, "zhangsan");
        map.put(2, "lisi");
        map.put(3, "wangwu");
        map.put(4, "zhaoliu");
        //第二种方式：Set<Map,Entry<K,V>> entrySet()
        //以上这个方法是把Map集合直接全部转换为Set集合
        //Set集合中元素的类型是<Map,Entry>
        Set<Map.Entry<Integer, String>> set = map.entrySet();
        //Set集合中存的是Map.Entry。类型是<Integer,String>
        //遍历Set集合，每一次取出一个Node
        //foreach

        for (Map.Entry<Integer, String> node :
                set) {
            System.out.println(node.getKey()+"-->"+node.getValue());
        }

    }
}
```

这样的话，通过foreach的方式效率较高，原因是通过while循环我们首先是要获取一个key，再通过key来获取value。而foreach的话是将两项操作放在一起



#### 哈希表数据结构

---

1. HashMap集合底层是哈希表（散列表）的数据结构

2. 哈希表是一个怎样的结构？

   * 哈希表是一个数组和单向链表的结合体

   数组：在查询方面效率很高，随机增删效率很低 

   单项链表：在随机增删方面效率很高，在查询方面效率很低

   哈希表将以上两种数据结构结合在一起，充分发挥其各自的优点

3. HashMap集合底层的源代码

   ~~~java
   public class HashMap{
   	//HashMap底层上实际就是一个数组(一维)
       Node<K,V>[] table;
       
       //静态的内部类HashMap,Node
       static class Node<K,V>{
   		final int hash;//哈希值，key的hashCode()方法的执行结果，Hash值通过哈希函数。算法，可以计算出数组下标
           final K key;//存储到Map集合中的key
           V value;//存储到map集合中的value
           Node<K,V> next;//下一个节点的内存地址
       }
   }
   ~~~

   哈希表：一维数组，这个数组中的每一个元素是一个单项链表

4. 最主要掌握的是

   `map.put(k,v)`

   `v = map.get(k)`

   ![image-20230307183150641](./跟随狂神学Java-24.assets/image-20230307183150641.png)

   

5. 如果需要在字典中找'中'这个字，会有几种查询方式？

   * 可以一页一页找，直到找到为止
   * 可以按照通过索引找到大致位置，然后向后翻阅直到找到

6. HashMap集合的key部分特点：

   无序，不可重复

   为什么无序？因为不一定挂到哪个单向链表上

   不可重复是如何保证的？equals方法来保证HashMap集合key不可重复

   如果key重复了，value会覆盖

   放在HashMap集合key部分的元素其实就是放在HashSet集合中了 

   所以，HashSet集合中的元素也需要同时重写HashCode()+equals()方法

7. 哈希表HashMap使用不当时无法发挥性能

   * 假设所有的HashCode()方法返回值固定为某个值，那么会导致底层哈希表变成纯单向链表

   这种情况我们称之为散列分布不均匀

   什么是散列分布均匀？

   ​	假设我们有100个元素，10个单向链表，那么每个链表上有10个节点，这是最好的，是散列均匀分布的

   假设将所有的HashCode()返回值都设置为不一样的值，可以吗，有什么问题？

   ​	不行，将会导致底层变成一维数组

   散列分布均匀需要重写HashCode()方法时有一定的技巧

8. 重点：放在HashMap集合key部分的元素，以及放在HashMap集合中的元素，需要同时重写HashCode()和equals方法

9. HashMap集合的默认初始化容量是16，默认加载因子是0.75

   这个默认加载因子是当HashMap集合底层数组的容量达到75%时，数组开始扩容

10. HashMap初始化的时候， 容量是2的倍数，这也是官方推荐的，因为达到散列均匀为了提高HashMap集合的存取效率，所必须的

11. 对于哈希数据结构来说，

    如果a1和a2的hash值相同，一定是放到同一个单向链表上

    当然如果用a1和a2的hash值不同，但由于哈希算法执行结束之后转换的数组下标可能相同，此时就会发生“哈希碰撞”

12. HashSet初始化为16，扩容之后是原容量的2倍

```java
package com.joker_yue.javalearn.Maps;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;


public class HashMapTest01 {
    public static void main(String[] args) {
        //测试HashMap集合key部分的元素特点
        //Integer是key，它的HashCode和equals都重写了
        Map<Integer,String> map = new HashMap<>();
        map.put(1111,"zhangsan");
        map.put(6666,"lisi");
        map.put(7777,"wangwu");
        map.put(2222,"zhaoliu");
        map.put(2222,"king");

        System.out.println(map.size());//输出4
        //遍历map集合
        Set<Map.Entry<Integer,String>> set = map.entrySet();
        for (Map.Entry<Integer,String> entry:set
             ) {
            //验证结果：HashMap集合key部分元素 ： 无序，不可重复
            System.out.println(entry.getKey()+"="+entry.getValue());
        }
    }
}
```

上述代码的执行结果如下，证明了HashMap的无序、不可重复的特点

~~~java
4
7777wangwu
1111zhangsan
6666lisi
2222king
~~~



---

##### 同时重写hashCode()和equals()方法

```java
//这里是Student.java
package com.joker_yue.javalearn.Maps;

public class Student {
    String name;
    Student(String name){
        this.name = name;
    }

    public boolean equals(Object obj){
        if (obj == null) return false;
        if (obj instanceof Student){
            if(((Student) obj).name==this.name) return true;
        }
        return false;
    }
}
```

```java
//这里是HashMapTest02.java
package com.joker_yue.javalearn.Maps;

public class HashMapTest02 {
    public static void main(String[] args) {
        Student s1 = new Student("zhangsan");
        Student s2 = new Student("zhangsan");
        System.out.println(s1.equals(s2));//未重写equals方法，输出false。重写了是true

    }
}
```

上面是未重写hashCode和equals方法的情况，接下来我们重写，会如何？

```java
//这里是Student.java
package com.joker_yue.javalearn.Maps;

import java.util.Objects;

public class Student {
    String name;
    Student(String name){
        this.name = name;
    }

    /*public boolean equals(Object obj){
        if (obj == null) return false;
        if (obj instanceof Student){
            if(((Student) obj).name==this.name) return true;
        }
        return false;
    }*/

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return name.equals(student.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
```

```java
//这里是HashMapTest02.java
package com.joker_yue.javalearn.Maps;

import java.util.HashSet;
import java.util.Set;

/*
    向Map集合中存取，都是先调用key的hashCode方法，然后再调用equals方法，equals方法有可能不调用
    拿put(k,v)方法举例，什么情况下equals不会调用？
        k.hashCode()方法返回哈希值
        哈希值经过哈希算法转换为数组下标
        数组下标位置上 如果为null，equals不需要执行
    拿get(k)方法举例，什么时候equals不会调用？
        和上面一样
 */

public class HashMapTest02 {
    public static void main(String[] args) {
        Student s1 = new Student("zhangsan");
        Student s2 = new Student("zhangsan");
        System.out.println(s1.equals(s2));//未重写equals方法，输出false。重写了是true

        //由于没有重写hashCode()方法，所以返回的是两个对象的内存地址
        System.out.println("s1的HashCode = "+s1.hashCode());
        System.out.println("s2的HashCode = "+s2.hashCode());

        //s1.equals(s2)==true 表示s1和s2是一样的，那么如果往hashSet集合中放的话
        //按理说只能放进去一个，因为HashSet集合特点是无序不可重复
        Set<Student> students = new HashSet<>();
        students.add(s1);
        students.add(s2);
        System.out.println(students.size());//这个结果按理说应该是1。但是结果是2
        //由于没有重写hashCode()方法，所以返回的是两个对象的内存地址，所以对应的hashCode也不同，数组下标也不同

        //现在我们想让他覆盖，我们应该如何？
        /*
            //注意：如果一个类的equals方法重写了，那么他的hashCode方法也要重写
            //并且equals方法返回的如果是true，hashCode返回的值必须一样
            //equals方法返回true表示两个对象相同，在同一个单向链表上比较
            //那么对于同一个单向链表上的节点来说，，他们的哈希值应该是相同的
            //所以hashCode方法的返回值也应该是相同的
            //
            //hashCode()方法和equals()方法不用研究了，直接使用IDEA工具生成
            //但是这两个函数，工具需要同时生成。按下Alt+Insert即可直接选择并重构

         */

    }
}
```



---

##### Java对HashMap的改进

在JDK8后，Java对HashMap进行了改进，设置了树的门限值为8（`static final int TREEIFY_THRESHLD = 8`），这意味着单向链表上有着超过8个元素，再继续存的话会将单向链表转换为红黑树（自平衡二叉树），当红黑树上元素少于6时（`static final int UNITREEIFY_THRESHOLD = 6`），会重新将其转换为单向链表



---

##### HashMap和HashTable的区别

* HashMap的key可不可以为空值null？可以，但是只能有一个为null	 

```java
package com.joker_yue.javalearn.Maps;

import java.util.HashMap;
import java.util.Map;

public class HashMapTest03 {
    public static void main(String[] args) {
        Map map = new HashMap();
        //HashMap集合允许key为null
        map.put(null,null);
        System.out.println(map.size());//输出1

        //key重复的话，value会覆盖
        map.put(null,100);
        System.out.println(map.size());//仍然为1

        //可以通过key获取value吗
        System.out.println(map.get(null));//输出100
    }
}
```

在key==null的时候，将key的hash值置为0，从而解决了当key为null时，走hashCode方法导致空指针异常。

* 但是HashTable无法将key或者value设置为null，会抛出空指针异常

HashTable都带有synchornized线程安全的

线程安全有其他方案，这个HashTable对线程的处理导致效率较低，使用较少了

HashTable的初始化容量是11，默认加载因子是0.75。HashTable的扩容是原容量乘以二加一



#### 属性类Properties类 

---

Properties是一个Map集合，继承自HashTableProperties的key和value都是String类型 

Properties被称为属性类对象

Properties是线程安全的

常用方法：

| 返回类型 | 方法                                  | 说明                             |
| -------- | ------------------------------------- | -------------------------------- |
| Object   | setProperty(String key, String value) | 调用HashTable的方法put           |
| String   | getProperty(String key)               | 用指定的键再此属性列表中搜索属性 |

 

```java
package com.joker_yue.javalearn.Maps;

import java.util.Properties;

public class PropertiesTest01 {
    public static void main(String[] args) {
         //创建一个Properties对象
        Properties pro = new Properties();

        //存
        pro.setProperty("username","root");
        pro.setProperty("password","12345");
        pro.setProperty("url","www.baidu.com");
        pro.setProperty("driver","com.mysql.jdbc.Driver");

        //取
        //通过key来取value
        String username = pro.getProperty("username");
        String driver = pro.getProperty("driver");
        String url = pro.getProperty("url");
        String password = pro.getProperty("password");

        System.out.println(url);
        System.out.println(driver);
        System.out.println(username);
        System.out.println(password);
    }
}
```



---

##### TreeSet对String是可排序的

1. TreeSet集合底层实际上是一个TreeMap

2. TreeMap集合底层是一个二叉树

3. 放到TreeSet集合key部分的元素 等同于 放到TreeSet的Key部分了

4. TreeSet集合中的元素，无序不可重复，但是可以按照元素大小自动排序，称为可排序集合

```java
package com.joker_yue.javalearn.Maps;

import java.util.TreeSet;

/*

 */
public class TreeSetTest02 {
    public static void main(String[] args) {
        //创建一个TreeSet集合
        TreeSet<String> ts = new TreeSet<>();
        //添加字符串
        ts.add("zhangsan");
        ts.add("lisi");
        ts.add("wangwu");
        ts.add("zhaoliu");
        ts.add("wangba");

        //遍历
        for (String s:ts){
            System.out.println(s);
        }
    }

}
```

上述代码的输出结果为

~~~java
lisi
wangba
wangwu
zhangsan
zhaoliu
~~~



---

##### TreeSet无法对自定义类型排序

我们现在声明一个类Person

填入age，我们现在想按照age大小排序

代码如下

```Java
package com.joker_yue.javalearn.Maps;

import java.util.TreeSet;

/*
    对自定义的类型 TreeSet可以进行排序吗_不行
    以下类型中对于Person类型来说，无法排序，因为没有指定Person对象之间的比较规则
 */
public class TreeSetTest03 {
    public static void main(String[] args) {
        Person p1 = new Person(20);
        Person p2 = new Person(19);
        Person p3 = new Person(30);
        Person p4 = new Person(25);

        //创建TreeSet集合
        TreeSet<Person> persons = new TreeSet<>();
        //添加元素
        persons.add(p1);
        persons.add(p2);
        persons.add(p3);
        persons.add(p4);

        //遍历
        for (Person p : persons){
            System.out.println(p.toString());
        }
    }
}

class Person{
    int age;
    public Person(int age){
        this.age = age;
    }

    //重写toString()
    public String toString(){
        return "Person[age="+age+"]";
    }
}
```

结果报错，因为其是不可比较的，需要自定义`java.lang.comparable`接口

~~~Java
D:\Java\jdk-18.0.1.1\bin\java.exe "-javaagent:D:\Program Files\JetBrains\IntelliJ IDEA Community Edition 2022.2.1\lib\idea_rt.jar=2150:D:\Program Files\JetBrains\IntelliJ IDEA Community Edition 2022.2.1\bin" -Dfile.encoding=UTF-8 -Dsun.stdout.encoding=UTF-8 -Dsun.stderr.encoding=UTF-8 -classpath E:\Program\Idea\Java\helloworld\src\com\joker_yue\out\production\joker_yue com.joker_yue.javalearn.Maps.TreeSetTest03
Exception in thread "main" java.lang.ClassCastException: class com.joker_yue.javalearn.Maps.Person cannot be cast to class java.lang.Comparable (com.joker_yue.javalearn.Maps.Person is in unnamed module of loader 'app'; java.lang.Comparable is in module java.base of loader 'bootstrap')
	at java.base/java.util.TreeMap.compare(TreeMap.java:1569)
	at java.base/java.util.TreeMap.addEntryToEmptyMap(TreeMap.java:776)
	at java.base/java.util.TreeMap.put(TreeMap.java:785)
	at java.base/java.util.TreeMap.put(TreeMap.java:534)
	at java.base/java.util.TreeSet.add(TreeSet.java:255)
	at com.joker_yue.javalearn.Maps.TreeSetTest03.main(TreeSetTest03.java:19)

进程已结束,退出代码1
~~~



----

##### 自定义`java.lang.comparable`接口

回想一下C++的自定义sort排序  

```java
package com.joker_yue.javalearn.Maps;

import java.util.Comparator;
import java.util.TreeSet;

public class TreeSetTest04 {
    public static void main(String[] args) {
        Custom c1 = new Custom(20);
        Custom c2 = new Custom(19);
        Custom c3 = new Custom(30);
        Custom c4 = new Custom(25);

        //创建TreeSet集合
        TreeSet<Custom> customs = new TreeSet<>();
        //添加元素
        customs.add(c1);
        customs.add(c2);
        customs.add(c3);
        customs.add(c4);

        //遍历
        for (Custom c : customs) {
            System.out.println(c.toString());
        }
    }
}

//放在TreeSet集合中的与元素需要实现java.lang.Comparable接口
//并且实现compareTo()方法 equals()可以不写
class Custom implements Comparable<Custom> {
    int age;

    public Custom(int age) {
        this.age = age;
    }

    //需要在这个类中编写比较的逻辑方法，或者说是比较的规则
    //如下
    //k.compareTo(t.key)
    //拿着参数key和集合中的每一个k进行比较，返回值可能是>0,<0,=0
    @Override
    public int compareTo(Custom o) {
//        if (o.age > this.age) return 1;
//        if (o.age == this.age) return 0;
//        return -1;
        return this.age - o.age;
    }

    //重写toString()

    @Override
    public String toString() {
        return "Custom{" + "age=" + age + '}';
    }
}
```

我们现在可以进行排序是因为我们继承了接口并重写了comparableTo()方法

如果我们要比较String类型，可以直接使用String的compareTo()方法



---

##### 实现比较器接口

```java
package com.joker_yue.javalearn.Maps;

import java.util.Comparator;
import java.util.TreeSet;

/*
    TreeSet集合中元素可排序的第二种方法：使用比较器的方式
 */
public class TreeSetTest05 {
    public static void main(String[] args) {
        //创建TreeSet集合的时候，需要使用这个比较器
//        TreeSet<WuGui> wugui = new TreeSet<>();//这样不行，没有通过构造方法传递一个比较器进去
        TreeSet<WuGui> wugui = new TreeSet<>(new WuGuiComparator());//传入一个比较器 给构造方法
        wugui.add(new WuGui(1000));
        wugui.add(new WuGui(20));
        wugui.add(new WuGui(500));

        for (WuGui wg : wugui) {
            System.out.println(wg.toString());
        }
    }
}

class WuGui {
    int age;

    public WuGui(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "小乌龟[" + "age=" + age + ']';
    }
}

//单独在这编写一个比较器
//比较器实现java.util.Comparable接口(Comparable是java.lang包下的，Comparator是java.util下的)
class WuGuiComparator implements Comparator<WuGui> {
    @Override
    public int compare(WuGui o1, WuGui o2) {
        //指定比较规则
        //按照年龄排序
        return o1.age - o2.age;
    }
}
```

当然，我们还可以使用匿名内部类

```java
package com.joker_yue.javalearn.Maps;

import java.util.Comparator;
import java.util.TreeSet;

/*
    TreeSet集合中元素可排序的第二种方法：使用比较器的方式
 */
public class TreeSetTest05 {
    public static void main(String[] args) {
        TreeSet<WuGui> wugui = new TreeSet<>(new Comparator<WuGui>() {
            //这个类没有名字，直接new接口   
            @Override
            public int compare(WuGui o1, WuGui o2) {
                return o1.age - o2.age;
            }
        });

        wugui.add(new WuGui(1000));
        wugui.add(new WuGui(20));
        wugui.add(new WuGui(500));

        for (WuGui wg : wugui) {
            System.out.println(wg.toString());
        }
    }
}

class WuGui {
    int age;

    public WuGui(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "小乌龟[" + "age=" + age + ']';
    }
}
```

所以，我们在放到TreeSet或者TreeMap集合key部分的元素想要做到排序，有两种方案：

* **放在集合中的元素实现java.lang.Comparable接口**
* **在构造函数TreeSet或者TreeMap集合的时候给它一个比较器对象**

如何选择Comparable和comparator？

* 当比较规则不会轻易发生改变的时候，建议comparable接口
* 如果需要频繁切换比较规则的时候，建议Comparable接口
* Comparable接口的设计符合OCP原则（Open Closed Principle，开闭原则，高内聚低耦合）



#### 自平衡二叉树

---

1. TreeSet/TreeMap自平衡二叉树遵循左小右大原则

2. 遍历二叉树的时候有三种方式

   前序遍历：根左右

   中序遍历：左根右

   后序遍历：左右根

   注意：前中后的遍历方式说的是根的位置	 

3. TreeSet集合采用的是中序遍历方式

   Iterator迭代器采用的是中序遍历方式

![image-20230308205604534](./跟随狂神学Java-24.assets/image-20230308205604534.png)



#### Collections工具类

---

对List进行排序

```java
package com.joker_yue.javalearn.Maps;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class CollectionsTest {
    public static void main(String[] args) {
        //ArrayList不是线程安全的
        List<String> list = new ArrayList<>();
        //变成线程安全的
        Collections.synchronizedList(list);

        //排序
        list.add("x");
        list.add("abr");
        list.add("a");
        list.add("abc");
        Collections.sort(list);
        for (String s : list) {
            System.out.println(s);
        }

        List<WuGui2> wuGuis = new ArrayList<>();
        wuGuis.add(new WuGui2(100));
        wuGuis.add(new WuGui2(8000));

        //注意：对集合中的元素排序，需要保证List集合中的元素实现了：Comparable接口
        Collections.sort(wuGuis);//未实现接口时将会无法排序
        for (WuGui2 wg : wuGuis) {
            System.out.println(wg);

        }
    }
}


class WuGui2 implements Comparable<WuGui2> {
    int age;

    public WuGui2(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "小乌龟[" + "age=" + age + ']';
    }

    @Override
    public int compareTo(WuGui2 o) {
        return this.age - o.age;
    }
}
```

对Set进行排序

```java
package com.joker_yue.javalearn.Maps;

import java.util.*;

public class CollectionsTest {
    public static void main(String[] args) {
        //对set集合进行排序
        Set<String> set = new HashSet<>();
        set.add("king");
        set.add("kingsoft");
        set.add("king2");
        set.add("king1");
        //将Set转换成List集合
        List<String> myList = new ArrayList<>(set);
        Collections.sort(myList);
        for(String s : myList){
            System.out.println(s);
        }
    }
}
```

下面这种方法也能排序

`Collections.sort(list集合,比较器对象);`

