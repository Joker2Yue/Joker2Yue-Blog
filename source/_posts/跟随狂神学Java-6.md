---
title: 跟随狂神学Java-06，方法
date: 2022/6/29 22:01:11
tags:
  - 狂神
  - Java
  - JavaSE
categories:
  - [跟随狂神学Java]
cover: /images/coverImg/JavaSE/06.jpg
keywords:
  - 方法概念
  - 方法结构
  - 方法修饰符
  - 返回值类型
  - 方法名
  - 参数列表
  - 方法重载
  - 命令行传参
  - 可变参数
  - 递归
ai: 
  - 本篇文章介绍了Java中的方法概念和使用。方法是一组语句的集合，用于完成特定功能。文章详细讲解了方法的结构，包括修饰符、返回值类型、方法名和参数列表，以及如何定义和调用方法。此外，还介绍了方法的重载、命令行传参、可变参数和递归的概念和用法。方法是Java程序的重要组成部分，能够提高代码的可读性和复用性。
  - 这篇文章介绍了Java中的方法概念和使用，包括方法结构、方法的重载、命令行传参、可变参数和递归等重要概念和用法。方法是Java程序的关键组成部分，用于实现特定功能和提高代码的可读性。
  - 本文介绍了Java方法：定义、重载、命令行传参、可变参数、递归等，及其关键概念和用法。
---
# 跟随狂神学Java

##### 第六天：方法

> 真正喜欢的人和事，都值得我们坚持

---

## 学习内容

#### 什么是方法

> Java方法是语句的合集，它们在一起执行一个功能
>
> ​		方法是解决一类问题的步骤的有序组合
>
> ​		方法包含类或对象中
>
> ​		方法在程序中被创建，在其他地方被引用

设计方法的原则：方法的本意是功能块，就是实现某个动能的语句块的集合，我们设计方法的时候，最好保持方法的`原子性`。即：==一个方法只完成一个功能，这样有利于我们后期的扩展。==



~~~java
System.out.println();
//System为类
//out为对象
//println()为方法
~~~

~~~java
package com.joker_yue.javalearn.method;

public class Method01 {

    //main方法
    public static void main(String[] args) {
        int sum = add(1,2);
        System.out.println(add(sum,3));
        System.out.println("===========");
        int[] a={20048,20048,25105,21916,27426,20320};

        showArr(a,6);
    }

    //加法
    public static int add(int a,int b){
        //public为修饰符
        //int为返回类型
        //add()为方法名
        //add()中的参数为传入类型
        //加static成为类变量
        return a+b;
    }
	
    //输出int数组
    public static void showArr(int[] intArr,int length){
        for (int i = 0; i < length; i++) {
            System.out.print(intArr[i] + " ");
        }
    }
}

~~~

学了对象就是面向对象思想，新建类对象，然后通过类对象去点方法，直接在别的类使用

-----

#### 方法的结构

~~方法相当于其他编程语言(C/C++)中的函数~~，是一段用来完成特定功能的代码片段，一般情况下，定义一个方法包含以下语句：

>方法包含一个方法头和一个方法体。下面是一个方法的所有部分：
>
>		修饰符：可选的，告诉编译器如何调用该方法。定义了该方法的访问类型。
>					
>		返回值类型：方法可能会返回值，returnValueType是方法返回值的数据类型。有些方法执行所需的操作，但没有返回值。在这种情况下，returnValueType为关键字void。
>					
>		方法名：是方法的实际名称。方法名和参数表共同组成方法签名。
>					
>		参数类型：参数像是一个占位符，当方法被调用时，传递值给参数。这个值称为实参或变量。参数列表是指方法的参数类型、顺序和参数的个数。参数是可选的。方法可以不包含任何参数。
>					
>				形式参数：在方法被调用时 用于接收外界输入的数据。
>					
>				实参：调用方法时实际传给方法的数据。
>					
>		方法体：方法体包含具体的语句，定义该方法的功能。

~~~java
修饰符 返回值类型 方法名(参数类型 参数名){
	...
    方法体
    ...
    return 返回值;
}
~~~

~~~java
package com.joker_yue.javalearn.method;

import java.util.Scanner;

public class Method02 {
    public static void main(String[] args) {
        System.out.println("请输入3个数：");
        Scanner sc = new Scanner(System.in);

        int num1,num2,num3;
        num1 = sc.nextInt();
        num2 = sc.nextInt();
        num3 = sc.nextInt();

//        int max = num1>max(num2,num3)?num1:max(num2,num3);
        int max = max(num1,max(num2,num3));
        System.out.println("最大的是"+ max);
        sc.close();
    }

	//max函数
    public static int max (int a,int b){
        return a>b?a:b;
    }
}

~~~



> 注意：
>
> 加final就是私有方法，只能在自己的类里面用
> ​在static方法内部无法直接调用非static方法（可以通过先实例化对象，再用该对象调用非static方法），但非static方法中可以调用static方法，通过类.方法名()的方式

---

#### 方法的重载

~~~~java
public static int max (int a,int b){
        return a>b?a:b;
    }

public static double max (double a,double b){
        return a>b?a:b;
    }
//要求：参数列表不同，参数名称相同
~~~~

----

#### 命令行传参

有时候你希望运行一个程序的时候再传递给它消息。这要靠传递命令行参数给main()函数实现

（没错，main方法也是可以接受参数的）

---

#### 可变参数

~~也叫不定向参数~~

> JDK1.5开始，Java支持传递同类型的可变参数给一个方法
>
> 在方法声明中，在指定参数类型后加一个省略号(...)
>
> 一个方法中只能指定一个可变参数，它必须是方法的最后一个参数。任何普通的参数必须在它之前声明

~~~java
package com.joker_yue.javalearn.method;


public class Method03 {
    public static void main(String[] args) {
        printMax(1,231,12,341,0.21,4);
        printMax(new double[]{1,213,112});
    }

    public static void printMax(double  ... nums){
        if(nums.length==0){
            System.out.println("No argument passed");
            return ;
        }   else {
            double max = nums[0];
            for (int i = 0; i < nums.length; i++) {
                if(nums[i]>max) max = nums[i];
            }
            System.out.println("Max = "+max);
        }
    }
}
~~~

---

#### 递归

原理：方法自己调用自己

利用递归可以用简单的程序来解决一些复杂的问题，它通常把一个大型复杂的问题层层转化为一个与原问题相似的规模较小的问题来求解。递归策略只需要较少的程序就可描述出解题过程所需要的多次重复计算，大大减少了程序的代码量。递归的能力在于用有限的语句来定义对象的无限集合。

> 递归结构包含两个部分：
>
> ​	递归头：什么时候不调用自身方法。如果没有头，将进入死循环
>
> ​	递归体：什么时候需要调用自身方法

~~~java
package com.joker_yue.javalearn.method;

public class Method04JieCheng {
    public static void main(String[] args) {
        System.out.println(jieCheng(5));
    }
    
    public static int jieCheng(int num){
        if(num==1) return 1;
        else return jieCheng(num-1)*num;
    }
    //递归是通过栈方法来实现的。这能够在数据结构中学到
}
~~~

