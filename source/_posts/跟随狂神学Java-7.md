---
title: 跟随狂神学Java-07，数组
date: 2022/07/01 04:02:22
tags:
  - 狂神
  - Java
  - JavaSE
categories:
  - [跟随狂神学Java]
cover: /images/coverImg/JavaSE/07.jpg
ai: 
  - 第七天的学习集中在Java数组的理解与应用。我们学习了数组的基本定义和初始化方法，包括静态和动态初始化。了解了数组的特性，如长度固定、元素类型一致、支持不同数据类型。我们还研究了多维数组和Arrays类的使用，后者提供了有用的数组操作方法。最后，我们实现了冒泡排序算法，了解了稀疏数组的应用。这一天的学习使我们更加熟练地处理和操作Java数组，为日后编写更复杂的程序打下了基础。
  - 第七天学习了数组的定义、内存分析、初始化、基本特点、使用方法、多维数组、Arrays类、冒泡排序、稀疏数组等基本概念和操作。
  - 第七天学习了Java数组的基础知识，包括定义、内存分析、初始化、特点、使用方法、多维数组、Arrays类、冒泡排序、稀疏数组等。这些知识为处理和操作数组提供了基本技能。
---
# 跟随狂神学Java

##### 第七天：数组

> 你热爱的，就是生活

---

## 学习内容

#### 数组的定义

> 数组是相同类型数据的有序集合
>
> 数组描述的是相同类型的若干个元素，按照一定的先后次序排列组合而成
>
> 其中，每一个数据称作一个数组元素，每个数组元素可以通过一个下标来访问他们

要注意的是：数组是同一类数据的集合。下标从0开始

~~~java
package com.joker_yue.javalearn.array;

public class arr01 {
    public static void main(String[] args) {
        int[] nums ;		 // 1.声明了一个nums数组
        // int nums2[];      C/C++风格定义

        nums = new int[10];	 // 2.Java使用new来创建数组空间
        // dataType[] dataRefVar = new dataType[arraySize];

        // 当然，你也可以声明、创建一步到位
        // int[] nums = new int[10];

        //给数组元素赋值
        nums [0] = 1;
        nums [1] = 2;
        nums [2] = 3;
        nums [3] = 4;
        nums [4] = 5;
        nums [5] = 6;
        nums [6] = 7;
        nums [7] = 8;
        nums [8] = 9;
        nums [9] = 10;


        for (int i = 0; i < nums.length; i++)
            System.out.print(nums[i]+" ");


    }
}

~~~

---

#### 内存分析

![在这里插入图片描述](./跟随狂神学Java-7.assets/2e45ede3e798407c8b01aa2988984cd4.png)

~~内置类型字面量存放在常量池中 自定义类对象运行时需要在堆中动态分配 栈存放的是对象的引用指向堆或常量池中的对象实例~~

---

#### 三种初始化

* 静态初始化

  ~~~java
  //静态初始化，创建+赋值
          int[] arr = {1,2,3,4,5,6};
          System.out.println(arr[0]);
  ~~~

* 动态初始化

  ~~~~java
  //动态初始化：包含默认初始化
          int[] arrB = new int[10];
          arrB[0] = 10;
  ~~~~

* 数组的默认初始化

  数组是引用类型，它的元素相当于类的实例变量，因此数组一经分配空间，其中的每个元素也被按照实例变量同样的方法被隐式初始化(比如int被初始化0，String被初始化为null)。

----

#### 数组的四个基本特点

1. 其长度是确定的。数组一旦被创建，它的大小就是不可改变的

2. 其元素必须是相同类型，不允许出现混合类型

3. 数组中的元素可以是任何数据类型，包括基本类型和引用类型

4. 数组变量属引用类型，数组是对象，数组中的每个元素相当于该对象的成员变量

   数组本身就是对象，Java中对象是在堆中的，因此数组无论保存原始类型还是其他对象类型，数组对象本身就是在堆中的

~~new的返回值是指向堆中的指针，new出来都是在堆中~~

---

#### 数组的使用

For-Each循环

数组作方法入参

数组作返回值

~~~java
package com.joker_yue.javalearn.array;

public class arr04 {
    public static void main(String[] args) {
        int[] arrays = {1, 2, 3, 4, 5};

        //JDK1.5支持 没有下标
        System.out.print("原始数组：");
        for (int array : arrays) {
            System.out.print(array+" ");
        }

        System.out.println();
        System.out.println("========");
        System.out.print("方法输出：");
        printArr(arrays);

        System.out.println();
        System.out.println("========");
        System.out.print("逆序输出：");
        printArr(reserve(arrays));
    }

    //打印数组元素
    public static void printArr(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
    }

    //反转数组
    public static int[] reserve(int[] arrays) {
        int[] result = new int[arrays.length];
        //反转的操作
        for (int i = 0; i < arrays.length; i++) {
            result[i] = arrays[arrays.length - i - 1];
        }
        return result;
    }
}
~~~

---

#### 多维数组

* 多维数组可以看成是数组的数组，比如二维数组就是一个特殊的一维数组，其中每个元素都是一个一维数组

* 二维数组

  ~~~java
  int a[][] = new int[2][5];
  //可以看成一个 两行五列的数组
  int[5][2] array = { {1,2}, {3,4}, {5,6}, {7,8}, {9,10} };
  ~~~

~~~java
package com.joker_yue.javalearn.array;

public class arr05DoubleArr {
    public static void main(String[] args) {
        int[][] arrays = { {1,2}, {3,4}, {5,6}, {7,8}, {9,10} };
        System.out.println(arrays[0]);//输出一个对象
        System.out.println(arrays[0][0]+" "+arrays[0][1]);//输出具体的数据

        //输出列高度：5行
        System.out.println("arrays.length = "+arrays.length);
        //输出行长度：2列
        System.out.println("arrays[0].length = "+arrays[0].length);

        //形象输出
        for (int i = 0; i < arrays.length; i++) {
            for(int j = 0; j< arrays[0].length;j++){
                System.out.print(arrays[i][j]+" ");
            }
            System.out.println();
        }
    }
}

~~~

---

#### Arrays类

* 数组的工具类java.util.Arrays
* 由于数组对象本身并没有什么方法可以供我们使用，但API中提供了一个工具类Arrays供我们使用，从而对数据对象进行一些基本的操作
* Arrays类中的方法都是static修饰的静态方法，在使用的时候可以直接使用类名进行调用，而”不用“使用对象来调用（注意：是“不用”而不是“不能”）
* 具有以下常用功能：
  1. 给数组赋值：通过fill方法
  2. 对数组排序：通过sort方法，按升序
  3. 比较数组：通过equals方法比较数组中元素值是否相等
  4. 查找数组元素：通过binarySearch方法能对排序好的数组进行二分查找

~~~java
package com.joker_yue.javalearn.array;

import java.lang.reflect.Array;
import java.util.Arrays;

public class arrPackage {
    public static void main(String[] args) {
        int[] a = {1,2,342,92,3,34,2,23,152,};
        System.out.println(a);//将会输出类
        System.out.println(Arrays.toString(a));//将会以字符串形式输出
        myToString(a);//自己写一个，看看就好，不要重复造轮子

        //sort排序：按照升序
        Arrays.sort(a);
        System.out.println(Arrays.toString(a));

        //fill填充：将数组都用一个元素填充
        Arrays.fill(a,0);
        //Arrays.fill(a,2,4,0);//将a中从2到4用0填充
        System.out.println(Arrays.toString(a));
    }

    public static void myToString(int[] a){
        if(a.length==0) return;
        System.out.print("[");
        for (int i = 0; i < a.length; i++) {
            if(i!=a.length-1) System.out.print(a[i]+", ");
            else System.out.print(a[i]);
        }
        System.out.print("]");
        System.out.println();
    }
}
~~~

---

#### 冒泡排序BubbleSort

时间复杂度O(n^2^)

~~~java
package com.joker_yue.javalearn.array;

import java.util.Arrays;

public class bubbleSort {
    public static void main(String[] args) {
        System.out.println(Arrays.toString(bs(new int[]{1, 2, 4, 21, 285})));
    }
	
    //自己写一个冒泡排序
    public static int[] bs(int[] source) {

        for (int i = 0; i < source.length - 1; i++)
            for (int j = i + 1; j < source.length; j++) {
                if (source[i] > source[j]) {
                    int temp = source[i];
                    source[i] = source[j];
                    source[j] = temp;
                }
            }

        return source;
    }
}

~~~

---

#### 稀释数组

* 当一个数组中大部分元素为0，或者为统一值的数组时，可以通过稀释数组来保存该数组。
* 稀释数组的处理方法：
  1. 记录数组一共有几行几列，有多少个不同的值
  2. 把具有不同的元素和行列及值记录在一个小规模的数组中，从而缩小程序的规模