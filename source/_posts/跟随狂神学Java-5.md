---
title: 跟随狂神学Java-05，程序结构
date: 2022/6/25 22:01:11
tags:
  - 狂神
  - Java
  - JavaSE
categories:
  - [跟随狂神学Java]
cover: /images/coverImg/JavaSE/05.jpg
keywords:
  - 顺序结构
  - 选择结构
  - 循环结构
  - 增强for循环
  - 打印三角形
ai: 
  - 本文介绍了Java中的程序结构，包括顺序结构、选择结构（if和switch）、循环结构（while、do..while、for和增强for循环），以及break、continue和打印三角形的示例。
  - 本篇文章讲解了Java中的程序结构，包括顺序、选择和循环结构。在选择结构方面，介绍了if条件判断和switch多重选择的使用方法。在循环结构方面，涵盖了while、do..while、for和增强for循环的应用。此外，还讨论了break和continue的用途，以及展示了如何通过嵌套循环打印等腰三角形。这些内容有助于构建不同的程序逻辑和控制流程。
  - 本文介绍了程序结构的基本概念和用法。首先讨论了顺序结构，然后介绍了选择结构，包括if单选择、if双选择、if多选择和switch选择。接着，探讨了循环结构，包括while、do..while、for以及增强for循环。最后，提到了break、continue和goto的作用，以及如何使用循环打印等腰三角形。这些结构和语法是Java程序开发的重要基础。
---
# 跟随狂神学Java

##### 第五天：程序结构

> Less is more

---

## 学习内容

#### 顺序结构

是最简单的基本结构，除非特别指明，否则就按照顺序一句一句执行

----

#### 选择结构

if选择

~~~~java
if(boolean){
	/*your code*/
}
// if单选择
~~~~

~~~~java
if(boolean){
	/*your code1*/
} else {
	/*your code2*/
}
// if双选择
~~~~

~~~~java
if(condition1){
	/*your code1*/
} else if(condition2) {
	/*your code2*/
} else if(condition3){
	/*your code3*/
} else {
	/*your code4*/
}
// if多选择
~~~~

switch选择
~~~java
switch(expression){
	case value1 :
		/*your code1*/
	break;
	case value2 :
		/*your code2*/
	break;
	case value3 :
		/*your code3*/
	break;
	default :
		/*your code4*/
}

//break是为了防止switch穿透
~~~

~~IDEA可以直接查看.class文件~~

---

#### 循环结构

while循环

~~~java
while(boolean==ture){
    /*your code*/
}
~~~

do..while循环

~~~java
do{
	/*your code*/
} while (expression)
//无论条件是否符合，都执行一次
~~~

for循环

~~~java
for(initial; boolean; update){
	/*your code*/
}
//for循环是支持迭代的一种通用结构，是最有效、最灵活的循环结构
//在idea中可以输入 xx.for 快速生成一条for语句
~~~

九九乘法表

~~~java
package com.joker_yue.javalearn.loopStruct;

public class jiujiu {
    public static void main(String[] args) {
        for (int i = 1; i <= 9; i++) {
            for (int j = 1; j < 10; j++) {
                System.out.print(j+"*"+i +"="+i*j+'\t');
                if(i==j) {
                    System.out.println();
                    break;
                }
            }
        }
    }
}

~~~

增强for循环

~~~~java
package com.joker_yue.javalearn.loopStruct;

public class forLoopPlus {
    public static void main(String[] args) {
        int[] numbers = {10,20,30,40,50};//定义一个数组

        for(int x:numbers){
            System.out.println(x);
        }//将numbers数组中的每一项遍历出来并赋值给了x，再依次输出x的值

        System.out.println("==========");

        for (int i = 0; i < numbers.length; i++) {
            System.out.println(numbers[i]);
        }//可以通过输入numbers.for快速生成for循环
    }
}

~~~~

----

#### break & continue & goto

break 用于跳出此层循环

continue用于跳过此次循环

goto用于跳转，~~不建议使用，会影响代码的连续性~~

----

#### 打印三角形

~~~~java
package com.joker_yue.javalearn.loopStruct;

import java.util.Scanner;

public class loopTraining {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("请输入等腰三角形的高");
        int n = sc.nextInt();

        for (int lines = 0; lines < n; lines++) {
            for (int spaces = n - lines; spaces > 0; spaces--) {
                System.out.print(" ");
            }
            for (int stars = 0; stars < lines * 2 - 1; stars++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}

~~~~

