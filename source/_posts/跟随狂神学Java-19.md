---
title: 跟随狂神学Java-19，Date类
date: 2022/08/31 12:02:22
tags:
  - 狂神
  - Java
  - JavaSE
categories:
  - [跟随狂神学Java]
  - [Java]
cover: https://resource.joker2yue.top/blog/images/coverImg/JavaSE/10.jpg
keywords:
  - Date类
  - 时间精确性
  - 毫秒
  - 时间单位
  - before方法
  - after方法
  - compareTo方法
  - equals方法
ai:
  - 介绍了Date类表示时间的精确性，以及相关方法如before、after、compareTo、equals的用法。
  - 本文讲解了Java中的Date类，用于表示精确到毫秒的时间，包括日期比较方法before、after、compareTo以及相等性方法equals的示例。
  - 文章详细介绍了Java中的Date类，用于表示时间，包括时间单位的概念和相关方法的使用，如before、after、compareTo、equals等，以及这些方法返回的不同值的含义，帮助读者更好地理解和处理时间数据。
---
# 跟随狂神学Java

##### 第十九天：Date类

> 我就是洗衣机里某件衣服口袋里的餐巾纸，你们把我卷烂了大家都没好果子吃
>
> *~~[狂神未更新，转千锋教育 (bilibili.com)](https://www.bilibili.com/video/BV1vt4y197nY?spm_id_from=333.337.search-card.all.click)~~*

## 学习内容

##### Date

* Date表示特定的瞬间，精确到毫秒，Date类中的发部分方法都已经被Calendar类中的方法所取代
  ~~时间单位~~
  * 1秒=1000毫秒
  * 1毫秒=1000微秒
  * 1微妙=1000纳秒

* 在 JDK 1.1 之前，类 `Date` 有两个其他的函数。它允许把日期解释为年、月、日、小时、分钟和秒值。它也允许格式化和解析日期字符串。不过，这些函数的 API 不易于实现国际化。从 JDK 1.1 开始，应该使用 `Calendar` 类实现日期和时间字段之间转换，使用 `DateFormat` 类来格式化和解析日期字符串。`Date` 中的相应方法已废弃。

  尽管 `Date` 类打算反映协调世界时 (UTC)，但无法做到如此准确，这取决于 Java 虚拟机的主机环境。当前几乎所有操作系统都假定 1 天 = 24 × 60 × 60 = 86400 秒。但对于 UTC，大约每一两年出现一次额外的一秒，称为“闰秒”。闰秒始终作为当天的最后一秒增加，并且始终在 12 月 31 日或 6 月 30 日增加。例如，1995 年的最后一分钟是 61 秒，因为增加了闰秒。大多数计算机时钟不是特别的准确，因此不能反映闰秒的差别。

 

| **方法摘要**  |                                                              |
| ------------- | ------------------------------------------------------------ |
| ` boolean`    | `after(Date when)`      测试此日期是否在指定日期之后。       |
| ` boolean`    | `before(Date when)`      测试此日期是否在指定日期之前。      |
| ` Object`     | `clone()`      返回此对象的副本。                            |
| ` int`        | `compareTo(Date anotherDate)`      比较两个日期的顺序。      |
| ` boolean`    | `equals(Object obj)`      比较两个日期的相等性。             |
| ` int`        | `getDate()`      **已过时。** *从 JDK 1.1 开始，由 `Calendar.get(Calendar.DAY_OF_MONTH)` 取代。* |
| ` int`        | `getDay()`      **已过时。** *从 JDK 1.1 开始，由 `Calendar.get(Calendar.DAY_OF_WEEK)` 取代。* |
| ` int`        | `getHours()`      **已过时。** *从 JDK 1.1 开始，由 `Calendar.get(Calendar.HOUR_OF_DAY)` 取代。* |
| ` int`        | `getMinutes()`      **已过时。** *从 JDK 1.1 开始，由 `Calendar.get(Calendar.MINUTE)` 取代。* |
| ` int`        | `getMonth()`      **已过时。** *从 JDK 1.1 开始，由 `Calendar.get(Calendar.MONTH)` 取代。* |
| ` int`        | `getSeconds()`      **已过时。** *从 JDK 1.1 开始，由 `Calendar.get(Calendar.SECOND)` 取代。* |
| ` long`       | `getTime()`      返回自 1970 年 1 月 1 日 00:00:00 GMT 以来此 `Date` 对象表示的毫秒数。 |
| ` int`        | `getTimezoneOffset()`      **已过时。** *从 JDK 1.1 开始，由 `-(Calendar.get(Calendar.ZONE_OFFSET) + Calendar.get(Calendar.DST_OFFSET)) / (60 \* 1000)` 取代。* |
| ` int`        | `getYear()`      **已过时。** *从 JDK 1.1 开始，由 `Calendar.get(Calendar.YEAR) - 1900` 取代。* |
| ` int`        | `hashCode](https://itmyhome.com/java-api/java/util/Date.html#hashCode())**()`      返回此对象的哈希码值。 |
| `static long` | `parse(String s)`      **已过时。** *从 JDK 1.1 开始，由 `DateFormat.parse(String s)` 取代。* |
| ` void`       | `setDate(int date)`      **已过时。** *从 JDK 1.1 开始，由 `Calendar.set(Calendar.DAY_OF_MONTH, int date)` 取代。* |
| ` void`       | `setHours(int hours)`      **已过时。** *从 JDK 1.1 开始，由 `Calendar.set(Calendar.HOUR_OF_DAY, int hours)` 取代。* |
| ` void`       | `setMinutes(int minutes)`      **已过时。** *从 JDK 1.1 开始，由 `Calendar.set(Calendar.MINUTE, int minutes)` 取代。* |
| ` void`       | `setMonth(int month)`      **已过时。** *从 JDK 1.1 开始，由 `Calendar.set(Calendar.MONTH, int month)` 取代。* |
| ` void`       | `setSeconds(int seconds)`      **已过时。** *从 JDK 1.1 开始，由 `Calendar.set(Calendar.SECOND, int seconds)` 取代。* |
| ` void`       | `setTime(long time)`      设置此 `Date` 对象，以表示 1970 年 1 月 1 日 00:00:00 GMT 以后 `time` 毫秒的时间点。 |
| ` void`       | `setYear(int year)`      **已过时。** *从 JDK 1.1 开始，由 `Calendar.set(Calendar.YEAR, year + 1900)` 取代。* |
| ` String`     | `toGMTString()`      **已过时。** *从 JDK 1.1 开始，由 `DateFormat.format(Date date)` 取代，使用 GMT `TimeZone`。* |
| ` String`     | `toLocaleString()`      **已过时。** *从 JDK 1.1 开始，由 `DateFormat.format(Date date)` 取代。* |
| ` String`     | `toString()`      把此 `Date` 对象转换为以下形式的 `String`： dow mon dd hh:mm:ss zzz yyyy 其中： `dow` 是一周中的某一天 (`Sun, Mon, Tue, Wed, Thu, Fri, Sat`)。 |
| `static long` | `UTC(int year, int month, int date, int hrs, int min, int sec)`      **已过时。** *从 JDK 1.1 开始，由 `Calendar.set(year + 1900, month, date, hrs, min, sec)` 或 `GregorianCalendar(year + 1900, month, date, hrs, min, sec)` 取代，使用 UTC `TimeZone`，后跟 `Calendar.getTime().getTime()`。* |

---

##### 试试

* 先试试

  ~~~java
  package com.joker_yue.javalearn.Date;
  import java.util.Date;
  
  public class DateLearn {
      public static void main(String[] args) {
          //1.创建Date对象
          Date date1 = new Date();
          System.out.println(date1.toString());
  
          //昨天
          Date date2 = new Date(date1.getTime()-60*60*24*1000);
          System.out.println(date2);
  
      }
  }
  ~~~

  最后的输出结果为

  ~~~java
  Fri Sep 09 20:01:35 CST 2022
  Thu Sep 08 20:01:35 CST 2022
  ~~~

  

* before、after方法

  ~~~java
  package com.joker_yue.javalearn.Date;
  import java.util.Date;
  
  public class DateLearn {
      public static void main(String[] args) {
          //1.创建Date对象
          Date date1 = new Date();
          System.out.println(date1.toString());
  
          //昨天
          Date date2 = new Date(date1.getTime()-60*60*24*1000);
          System.out.println(date2);
  
          //2。after before方法
          System.out.println(date1.after(date2));
          System.out.println(date2.after(date1));
  
      }
  }
  
  ~~~

  最后的输出结果为

  ~~~java
  Fri Sep 09 20:04:38 CST 2022
  Thu Sep 08 20:04:38 CST 2022
  true
  false
  ~~~

* compareTo(Date anotherDate)方法

  ~~~java
  package com.joker_yue.javalearn.Date;
  import java.util.Date;
  
  public class DateLearn {
      public static void main(String[] args) {
          //1.创建Date对象
          Date date1 = new Date();
          System.out.println(date1.toString());
  
          //昨天
          Date date2 = new Date(date1.getTime()-60*60*24*1000);
          System.out.println(date2);
  
          //2。after before方法
          System.out.println(date1.after(date2));
          System.out.println(date2.after(date1));
  
          //3.compareTo方法
          System.out.println(date1.compareTo(date2));
  
      }
  }
  
  ~~~

  如果anotherDate大于当前时间，那么`1`，否则`-1`。等于则`0` 

* equals(Date anotherDate)方法

  ~~~java
  package com.joker_yue.javalearn.Date;
  import java.util.Date;
  
  public class DateLearn {
      public static void main(String[] args) {
          //1.创建Date对象
          Date date1 = new Date();
          System.out.println(date1.toString());
  
          //昨天
          Date date2 = new Date(date1.getTime()-60*60*24*1000);
          System.out.println(date2);
  
          //2。after before方法
          System.out.println(date1.after(date2));
          System.out.println(date2.after(date1));
  
          //3.compareTo方法
          System.out.println(date1.compareTo(date2));
  
          //4.equals()方法
          System.out.println(date1.equals(date2));
  
      }
  }
  ~~~

  相等输出`ture`，否则输出`false`