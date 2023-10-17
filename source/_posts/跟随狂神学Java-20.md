---
title: 跟随狂神学Java-20，Calendar类
date: 2022/09/01 04:02:22
tags:
  - 狂神
  - Java
  - JavaSE
categories:
  - [跟随狂神学Java]
  - [Java]
cover: https://resource.joker2yue.cn/blog/images/coverImg/JavaSE/10.jpg
keywords:
  - Calendar类
  - 获取时间
  - 修改时间
ai:
  - 介绍了Java中Calendar类的基本用法，包括获取当前时间和修改时间的方法。
  - 这篇文章详细介绍了Java中Calendar类的使用方法，包括如何获取当前时间、获取特定时间字段的值、修改时间、以及一些补充方法的说明。
  - 这篇文章深入讲解了Java中Calendar类的应用，包括如何创建Calendar对象、获取时间字段的值（如年、月、日、小时等）、修改时间（设置特定时间字段的值、使用add方法进行时间操作）、以及获取某月的最大和最小天数的方法。文章提供了代码示例和详细解释，帮助读者更好地理解和使用Calendar类。
---
# 跟随狂神学Java

##### 第二十天：Calendar类

> 吾日三省吾身：早上吃什么，中午吃什么，晚上吃什么
>
> *~~[狂神未更新，转千锋教育 (bilibili.com)](https://www.bilibili.com/video/BV1vt4y197nY?spm_id_from=333.337.search-card.all.click)~~*

## 学习内容

##### Calendar

* Calendar提供了获取或设置各种日历字段的方法

* 构造方法：

  * protected Calendar(): 由于修饰符是protected，所以无法直接创建对象

  * **构造方法摘要**

    | `protected` | `Calendar()`      构造一个带有默认时区和语言环境的 Calendar。 |
    | ----------- | ------------------------------------------------------------ |
    | `protected` | `Calendar(TimeZone zone, Locale aLocale)`      构造一个带有指定时区和语言环境的 Calendar。 |

---

##### 获取时间

~~~~java
package com.joker_yue.javalearn.CalendarLearn;

import java.util.Calendar;

public class Demo {
    public static void main(String[] args) {
        //1.创建Calendar对象
        Calendar calendar = Calendar.getInstance();//获取当前时间
        System.out.println(calendar.getTime());//输出当前时间
        System.out.println(calendar.getTimeInMillis());//打印时间的毫秒值
        //2.获取时间值（后面跟的都是参数）
        //获取年
        int year = calendar.get(Calendar.YEAR);//Calendar.YEAR==1
        //获取月
        int month = calendar.get(Calendar.MONTH);//Calendar.MONTH==2
        //获取日
        int day = calendar.get(Calendar.DAY_OF_MONTH);//Calendar.DAY_OF_MONTH==5
        //获取小时
        int hour = calendar.get(Calendar.HOUR_OF_DAY);//Calendar.HOUR_OF_DAY==11
        //获取分钟
        int minute = calendar.get(Calendar.MINUTE);//Calendar.MINUTE==12
        //获取秒
        int second = calendar.get(Calendar.SECOND);//Calendar.SECOND==13
        System.out.println(year+"年"+ month+1+"月"+day+"日"+hour+":"+minute+":"+second);
            //不知道为啥，月份应当加一（难道老外从0月开始过？）
        
    }
}

~~~~

最后的输出结果为

~~~java
Wed Sep 14 22:16:41 CST 2022
1663165001103
2022年81月14日22:16:41
~~~

---

##### 修改时间

~~~java
package com.joker_yue.javalearn.CalendarLearn;

import java.util.Calendar;

public class Demo {
    public static void main(String[] args) {
        //1.创建Calendar对象
        Calendar calendar = Calendar.getInstance();//获取当前时间
        System.out.println(calendar.getTime());//输出当前时间
        System.out.println(calendar.getTimeInMillis());//打印时间的毫秒值
        //2.获取时间值（后面跟的都是参数）
        //获取年
        int year = calendar.get(Calendar.YEAR);//Calendar.YEAR==1
        //获取月
        int month = calendar.get(Calendar.MONTH);//Calendar.MONTH==2
        //获取日
        int day = calendar.get(Calendar.DAY_OF_MONTH);//Calendar.DAY_OF_MONTH==5
        //获取小时
        int hour = calendar.get(Calendar.HOUR_OF_DAY);//Calendar.HOUR_OF_DAY==11
        //获取分钟
        int minute = calendar.get(Calendar.MINUTE);//Calendar.MINUTE==12
        //获取秒
        int second = calendar.get(Calendar.SECOND);//Calendar.SECOND==13
        System.out.println(year+"年"+ (month+1)+"月"+day+"日"+hour+":"+minute+":"+second);
            //不知道为啥，月份应当加一（难道老外从0月开始过？）


        //3.修改时间
        Calendar cal = calendar.getInstance();
        cal.set(Calendar.DAY_OF_MONTH,6);//将月份修改为6月
        System.out.println(cal.getTime() );

        //4.add方法修改时间
        cal.add(Calendar.HOUR,1);//在原有的时间（小时）上加上1，当然，你也可以输入负数来减去时间
        System.out.println(cal.getTime());

        //5.补充方法
        int max = cal.getActualMaximum(Calendar.DAY_OF_MONTH);//得到了这个月的最大天数
        System.out.println(max);
        int min = cal.getActualMinimum(Calendar.DAY_OF_MONTH);//得到了这个月的最小天数
        System.out.println(min);
    }
}

~~~

最后的输出结果为

~~~java
Wed Sep 14 22:35:54 CST 2022
1663166154685
2022年9月14日22:35:54
Tue Sep 06 22:35:54 CST 2022
Tue Sep 06 23:35:54 CST 2022
30
1
~~~

