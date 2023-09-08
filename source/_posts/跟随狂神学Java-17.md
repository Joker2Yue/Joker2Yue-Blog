---
title: 跟随狂神学Java-17，String类
date: 2022/08/30 04:02:22
tags:
  - 狂神
  - Java
  - JavaSE
categories:
  - [跟随狂神学Java]
cover: /images/coverImg/JavaSE/10.jpg
keywords:
  - String类
  - 字符串池
  - 字符串常用方法
  - 可变字符串
  - StringBuffer
  - StringBuilder
ai:
  - 第十七天学习了关于String类的内容。字符串是不可变的，字符串字面值存储在字符串池中。在JDK6.0之前，字符串常量池存储在Perm Gen区，之后移到了堆中。字符串的赋值方式包括直接赋值和使用`new String()`。字符串常用方法包括`length()`、`charAt(index)`、`contains(str)`、`toCharArray()`、`indexOf(str)`、`lastIndexOf(str)`、`trim()`、`toUpperCase()`、`endsWith(str)`、`replace(oldChar, newChar)`、`split(str)`、`equals(str)`、`compareTo(str)`。此外，学习了可变字符串的使用，包括`StringBuffer`和`StringBuilder`，其中`StringBuilder`性能较高。
  - 第十七天学习了Java中的String类和常用方法。String是不可变的，字符串字面值储存在字符串池中，可以共享。字符串池在不同JDK版本中位置有所变化。字符串可以通过+连接，也可以用equals()比较内容。常用方法包括length()获取长度，charAt()获取字符，contains()判断是否包含子串，toCharArray()转换为字符数组，indexOf()查找子串位置，lastIndexOf()查找最后出现位置，trim()去掉前后空格，toUpperCase()和toLowerCase()大小写转换，endsWith()和startsWith()判断结尾和开头，replace()替换字符，split()拆分字符串，equals()比较内容，compareTo()字典序比较。
  - 学习Java String类及方法，了解字符串不可变性、字符串池、常用方法如length、charAt、contains等。学习StringBuilder的可变字符串操作，提高字符串拼接效率。实际应用包括单词提取、替换、插入和首字母大写。StringBuilder在拼接长字符串时效率更高。
---
# 跟随狂神学Java

##### 第十七天：String类

> 加油，奥里给~！
>
> *~~[狂神未更新，转千锋教育 (bilibili.com)](https://www.bilibili.com/video/BV1vt4y197nY?spm_id_from=333.337.search-card.all.click)~~*

## 学习内容

##### String

* 字符串是常量，创建之后不可改变

  Java对字符串进行了保护，不能直接修改这块内存中字符串的值。我们要修改的话将会创建一块新的空间。

* 字符串字面值储存在字符串池中，可以共享

* 在JDK6.0及之前版本，字符串常量池是放在Perm Gen区(也就是方法区)中； 在JDK7.0版本，字符串常量池被移到了堆中了。至于为什么移到堆内，大概是由于方法区的内存空间太小了

  ~~~java
  package com.joker_yue.javalearn.string;
  
  public class Demo01 {
      public static void main(String[] args) {
           String name = "hello";//"hello"常量存储在字符串常量池中
          name = "张三";										//【看我看我】
      }
  }
  ~~~

  注意看，我们首先创建了 一个String类对象name，然后初始化为"hello"，其在字符串池中开辟了一个空间，内容为“hello”。后面我们将其修改为“张三”，将会重新开辟一个空间，内容为“张三“，然后将name的引用指向这块新空间。

  但是如果我们再创建一个String类对象name2，将其初始化为”张三“，那么name和name2是否是同一个地址呢。答案是肯定的。因为Java在创建字符串变量时，会先在字符串池中搜索有无相同者。如果有，就将其赋值给这个对象。

* 两种赋值方式：

  ~~~java
  String s = "Hello";//产生一个对象，字符串池中储存
  ~~~

  ~~~jaava
  String s = new String("Hello");	//产生两个对象，堆、池中各储存一个
  //其实在堆中的对象没有值，而是指向了常量池的地址
  ~~~

* 问题又来了：

  ~~~java
  package com.joker_yue.javalearn.string;
  
  public class Demo01 {
      public static void main(String[] args) {
           String name = "hello";//"hello"常量存储在字符串常量池中
          name = "张三";
  
  
          //字符串的另一种创建方式
          String str =new String( "Java才是世界上最好的语言");
          String str2 = new String("Java才是世界上最好的语言");
          System.out.println(str==str2);//【看我看我】会输出true还是false呢？
  
  
      }
  }
  ~~~

  答案是输出`false`。虽然两者在字符串池中是同一块空间，但是栈中的对象会先指向堆中的空间，堆再指向字符串池。在这里，两者的堆的空间地址不同，所以自然是输出false

  所以我们想让它们比较值而不是比较地址，就使用String.equals()方法

---

##### 常用方法

* public int length(); 	返回字符串的长度
* public char charAt(int index);    根据下标获取字符
* public boolean contains(String str);   判断当前字符串中是否包含str

~~~java
package com.joker_yue.javalearn.string;

public class Demo02 {
    public static void main(String[] args) {

        //字符串方法的使用
        //length()
        //charAt(int length)
        //contains(String str)
        String contain = "Java是世界上最好的编程语言";
        System.out.println(contain.length());
        System.out.println(contain.charAt(0));
        System.out.println(contain.contains("Java"));
        System.out.println(contain.contains("PHP"));
    }
}

~~~

输出结果为

~~~java
15
J
true
false
~~~

* public char[] toCharArray();   将字符串转换为数组
* public int indexOf(String str);   查找str首次出现的下标。若存在，则返回该下标；否则返回-1
* public int lastIndexOf(String str);   查找字符串在当前字符串最后一次出现的下标索引

~~~java
package com.joker_yue.javalearn.string;

import java.util.Arrays;

public class Demo02 {
    public static void main(String[] args) {
 
        String contain = "Java是世界上最好的编程语言，Java真香，Java真棒";
        //toCharArray()
        //indexOf()
        //lastIndexOf()
        System.out.println(Arrays.toString(contain.toCharArray()));
        System.out.println(contain.indexOf("Java"));//查找Java第一次出现的位置
        System.out.println(contain.indexOf("Java",9));//从下标9位置开始查找Java第一次出现的位置
        System.out.println(contain.lastIndexOf("Java"));//从后向前找Java
    }
}

~~~

最后的输出结果为

~~~java
[J, a, v, a, 是, 世, 界, 上, 最, 好, 的, 编, 程, 语, 言, ，, J, a, v, a, 真, 香, ，, J, a, v, a, 真, 棒]
0
16
23
~~~

* public String trim();   去掉字符串前后的空格（不包括中间的）
* public String toUpperCase();   将小写转换为大写
* public boolean endWith(String str);   判断字符串是否以str结尾

~~~java
package com.joker_yue.javalearn.string;

import java.util.Arrays;
import java.util.Locale;

public class Demo02 {
    public static void main(String[] args) {
        String contain = "Hello World ";
        //trim()
        //toUpperCase()   toLowerCase()
        //endWith(String str)   startWith(String str)

        System.out.println(contain.trim());
        System.out.println(contain.toUpperCase());//在toUpperCase()方法中可以填入参数，为起始值的下标
        System.out.println(contain.toLowerCase());//与toUpperCase()一样，也可以填入起始值

        String filename= "hello.java";
        System.out.println(filename.endsWith("java"));
        System.out.println(filename.startsWith("hello"));


    }
}
~~~

输出结果为

~~~java
Hello World
HELLO WORLD
hello world
true
true
~~~

* public String replace (char oldChar,char newChar);  将旧字符串替换为新字符串
* public String[] split(String str);  根据str做拆分

~~~java
package com.joker_yue.javalearn.string;

public class Demo02 {
    public static void main(String[] args) {
        String contain = new String("Hello.java");
        //replace();    用新的字符或字符串替换旧的字符或字符串
        //split();  对字符串进行拆分成单个的单词

        System.out.println(contain.replace("java", "php"));
        //将contain中的java换成php然后输出

        String say = "java is the best programming language";
        String[] arr = say.split(" ");//注意看，这是字符串数组！规则是按照空格“ ”截断
        System.out.println(arr.length);//输出字符串数组中字符串的个数（字符串数组的长度）
        for (String index : arr) {//挨个输出字符串数组的值
            System.out.println(index);
        }
    }
}

~~~

最后的输出结果是：

~~~JAVA
Hello.php
6
java
is
the
best
programming
language
~~~

emm，我们将say的内容修改为:"java is the best programming language,java newbee"，再次输出，会得到如下结果：

~~~java
Hello.php
7
java
is
the
best
programming
language,java
newbee
~~~

我们会发现language和newbee写在一起了，我们想让其做","切割，怎么办呢

我们这样写：

~~~java
package com.joker_yue.javalearn.string;

public class Demo02 {
    public static void main(String[] args) {
        String contain = new String("Hello.java");
        //replace();    用新的字符或字符串替换旧的字符或字符串
        //split();  对字符串进行拆分成单个的单词

        System.out.println(contain.replace("java", "php"));//将contain中的java换成php然后输出

        String say = "java is the best programming language,java newbee";
        String[] arr = say.split("[ ,]");	//【看我看我】
        System.out.println(arr.length);//输出字符串数组中字符串的个数（字符串数组的长度）
        for (String index : arr) {//挨个输出字符串数组的值
            System.out.println(index);
        }
    }
}

~~~

然后我们就可以发现能够输出如下结果：
~~~java
Hello.php
8
java
is
the
best
programming
language
java
newbee
~~~

但是这时候我们再将say更改下："java is the best programming    language,java newbee"

我们会发现，它将会输出如下结果：

~~~java
Hello.php
11
java
is
the
best
programming



language
java
newbee
~~~

是的，它将空格也算入在内了！

于是我们可以这么改：

~~~java
package com.joker_yue.javalearn.string;

public class Demo02 {
    public static void main(String[] args) {
        String contain = new String("Hello.java");
        //replace();    用新的字符或字符串替换旧的字符或字符串
        //split();  对字符串进行拆分成单个的单词

        System.out.println(contain.replace("java", "php"));//将contain中的java换成php然后输出

        String say = "java is the best programming    language,java newbee";
        String[] arr = say.split("[ ,]+");	//【看我看我】，表示空格可以连续出现一个或多个
        System.out.println(arr.length);//输出字符串数组中字符串的个数（字符串数组的长度）
        for (String index : arr) {//挨个输出字符串数组的值
            System.out.println(index);
        }
    }
}

~~~

于是会输出如下结果：

~~~java
Hello.php
8
java
is
the
best
programming
language
java
newbee
~~~

* public boolean equals(String str);  比较字符串是否相等
* public int compareTo(String str);  字典序比较

~~~java
package com.joker_yue.javalearn.string;

public class Demo02 {
    public static void main(String[] args) {
		
        
        //equals()
        String s1= "hello";
        String s2="Hello";
        System.out.println(s1.equals(s2));


    }
}
~~~

上述代码会输出`false`，因为s1全部为小写，而s2有大写。我们想要忽视大小写进行比较，可以使用`equalsIgnoreCase()`方法：

~~~java
package com.joker_yue.javalearn.string;

public class Demo02 {
    public static void main(String[] args) {

        //equals()
        String s1= "hello";
        String s2="Hello";
        System.out.println(s1.equalsIgnoreCase(s2));


    }
}

~~~

上述代码的运行结果为`true`

~~~java
package com.joker_yue.javalearn.string;

public class Demo02 {
    public static void main(String[] args) {

        //equals()
        String s1= "hello";
        String s2="Hello";
        System.out.println(s1.equalsIgnoreCase(s2));

        //compareTo()
        //输出第一个不相同的字符的差值
        String s3 = "abc";//'a'==97
        String s4 = "xyz";//'x'==120
        System.out.println(s3.compareTo(s4));

    }
}

~~~

上述代码的输出结果为

~~~java
true
-23
~~~

但是如果比较的两个字符串有一个是另一个的前半段，而且他们两个长度不相同，将会返回长度的差值，而不是第一个不同的字符的差值

~~~java
package com.joker_yue.javalearn.string;

public class Demo02 {
    public static void main(String[] args) {

        //equals()
        String s1= "hello";
        String s2="Hello";
        System.out.println(s1.equalsIgnoreCase(s2));

        //compareTo()
        //输出第一个不相同的字符的差值
        String s3 = "abc";//'a'==97
        String s4 = "xyz";//'x'==120
        System.out.println(s3.compareTo(s4));

        String s5 = "abc";
        String s6 = "abcxyz";
        System.out.println(s5.compareTo(s6));

    }
}
~~~

上述代码运行将会输出

~~~java
true
-23
-3
~~~

---

##### String 案例

需求：

* 已知String str = "this is a text";
  1. 将str中的单词单独获取出来
  2. 将str中的text替换为practice
  3. 在text前面插入一个easy
  4. 将每个字母的首字母改为大写

~~~java
package com.joker_yue.javalearn.string;

public class StringDemoTest {
    public static void main(String[] args) {
        String str = "this is a text";

        //1.将str中的单词获取出来
        String[] arr = str.split(" ");//以空格作为截断依据并提取到字符串数组
        System.out.println("将str中的单词获取出来");
        for(String s: arr){//依次输出
            System.out.println(s);
        }
        //2.将str中的text替换为practice
        System.out.println("将str中的text替换为practice");
        String s2 = str.replace("text","practice");
        System.out.println("s2");

        //3.在text前面加上easy
        System.out.println("在text前面加上easy");
        String s3 = str.replace("text","easy text");//将text替换为easy text
        System.out.println(s3);

        //4.将所有的单词的首字母变成大写
        System.out.println("将所有的单词的首字母变成大写");
        for(int i = 0;i<arr.length;i++){
            char first = arr[i].charAt(0);//提取出每个单词的第一个字符
            char upperFirst = Character.toUpperCase(first);//转成大写

            String newStr = upperFirst+arr[i].substring(1);//得到一个新的字符串（转换为大写的字符串+截去第一个字符剩下的字符串）

            System.out.println(newStr);//输出这个新的字符串
            
        }
    }

}
~~~

---

##### 可变字符串

* StringBuffer：可变长度的字符串，JDK1.0提供，运行效率慢、线程安全

  事先开辟好空间（缓冲区）。在进行操作的时候直接操作缓冲区

* StringBiulder：可变长度的字符串，JDK5.0提供，运行效率快、线程不安全

  多线程没有StringBuffer安全。但是在单线程的时候比StringBuffer快

~~~java
//StringBiulder和StringBuffer的一样
package com.joker_yue.javalearn.string;

public class StringBuilderBuffer {
    public static void main(String[] args) {

        //StringBuffer:比String效率高，比String省内存
        StringBuffer sb = new StringBuffer();
        //1.append() 追加
        sb.append("Java世界第一");
        System.out.println(sb);
        sb.append("Java香");
        System.out.println(sb);
        sb.append("Java真不错");
        System.out.println(sb);

        //2.insert() 插入
        sb.insert(0,"我在最前面");//在位置0添加一句话
        System.out.println(sb);

        //3.replace() 替换
        //可以指定位置替换
        sb.replace(0,5,"Hello World ");
        System.out.println(sb);

        //4.delete() 删除
        sb.delete(0,12);
        System.out.println(sb);

        //reverse()反转
    }
}
~~~

我们接下来比较String、StringBuffer的速度快慢

~~~java
//这是用String
package com.joker_yue.javalearn.string;

public class StringBuilderBuffer {
    public static void main(String[] args) {

        long start  = System.currentTimeMillis();//创建开始时间
        String string = "";
        for(int i =0;i<99999;i++){
            string+=i;
        }
        System.out.println(string);
        long end = System.currentTimeMillis();//创建结束时间
        System.out.println("用时："+(end-start));//输出差

    }
}

~~~

最后输出结果为

~~~java
3544
~~~

我们再看看StringBuilder

~~~java
package com.joker_yue.javalearn.string;

public class StringBuilderBuffer {
    public static void main(String[] args) {

        long start  = System.currentTimeMillis();
        StringBuilder string = new StringBuilder();
        for(int i =0;i<99999;i++){
            string.append(i);
        }
        System.out.println(string);
        long end = System.currentTimeMillis();
        System.out.println("用时："+(end-start));



    }
}

~~~

最后输出：

~~~java
14
~~~

所以我们看到StringBuilder非常快！

