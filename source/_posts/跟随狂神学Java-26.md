---
title: 跟随狂神学Java-26，多线程
date: 2023/04/25 04:02:22
tags:
  - 狂神
  - Java
  - JavaSE
  - 必看
categories:
  - [跟随狂神学Java]
  - [必看]
  - [技术]
  - [Java]
cover: https://resource.joker2yue.cn/blog/images/coverImg/JavaSE/13.jpg
keywords:
  - 多线程
  - Thread类
  - commonsIO
  - Runnable接口
  - 并发问题
  - 高并发
  - Callable接口
  - 静态代理模式
  - 线程停止
  - 线程休眠
  - 线程礼让
  - 线程强制执行
  - 线程状态观测
  - 线程的优先级
  - 守护线程
  - 线程同步机制
  - 线程同步方法
  - CopyOnWriteArrayList
  - 死锁
  - Lock锁
  - 线程协作
  - 生产者消费者模式
  - 管程法
  - 线程池
ai:
  - 这笔记概括了《跟随狂神学Java》第二十六天的多线程学习，包括多线程实现方式、并发问题、线程同步、死锁、线程协作和线程池。为掌握关键多线程编程概念提供了指南。
  - 这份笔记总结了《跟随狂神学Java》第二十六天的多线程学习内容。涵盖了线程基础知识、多线程实现方式、并发问题、静态代理、线程控制、状态观测、线程同步、死锁、线程协作、线程池等主题。这些内容为深入理解和应用多线程编程提供了全面指南。
  - 本笔记总结了《跟随狂神学Java》第二十六天的多线程学习内容。首先介绍了线程的基本概念，然后讨论了多线程的两种实现方式：继承Thread类和实现Runnable接口。随后，学习了并发问题，包括了案例龟兔赛跑以及了解Callable接口。接下来，讨论了静态代理模式、线程的停止、休眠、礼让以及强制执行，还介绍了线程状态观测、线程的优先级以及守护线程。笔记还包括了线程同步机制，包括同步方法、CopyOnWriteArrayList、死锁和Lock锁。最后，学习了线程协作，包括生产者消费者模式和管程法，以及线程池的使用。这个笔记为多线程编程提供了全面的基础知识和实际应用技巧。
---
# 跟随狂神学Java

##### 第二十六天：多线程

> 计算机科学就是有关计算机的，正如天文学就是有关望远镜的。
>
> [【狂神说Java】多线程详解_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1V4411p7EF/?vd_source=814489e71df641c4b2c0ff7d4659b2d0)

## 学习内容

#### 线程简介

* **多任务**

  很多看起来同时在进行的事情，比如一边看电视一边玩手机，其实是两件事情切换的快

* **进程、线程、多线程**

  一个进程可以有多个线程，如视频中同时听到声音、看到图像

  | 程序                                                         | 进程                                                     | 线程                                                         |
    | ------------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------ |
  | 指令和数据的有序集合，本身没有任何运行的含义，是一个静态的概念 | 执行程序的一次执行过程，动态的概念，是系统资源分配的单位 | 一个进程中可以包含若干个线程，一个进程中至少有一个线程，不然没有存在的意义。线程是CPU调度和执行的单位 |



**注意**：很多线程是模拟出来的，真正的多线程是指有多个CPU，即多核，如服务器。如果模拟出来的多线程，即在一个CPU的情况下，在同一个时间点，CPU只能执行一个代码，因为切换的很快，所以有同时执行的错觉

  <img src="./跟随狂神学Java-26.assets/image-20230406202030227.png" alt="image-20230406202030227" style="zoom:33%;" />

* **核心概念**

  * 线程就是独立的执行路径
  * 在程序运行时，及时没有自己创建线程，后台也会有多个线程，如主线程，gc线程
  * main()称之为主线程，为系统的入口，用于执行整个程序
  * 在一个进程中，如果开辟了多个线程。线程的运行由调度器安排调度，调度器是与操作系统密切相关的，先后顺序是不能人为干预的
  * 同一份资源操作时，会存在资源抢夺的问题，需要加入并发控制
  * 线程会带来额外的开销，如 CPU调度时间，并发控制开销 。
  * 每个线程在自己的工作内存交互，内存控制不当会造成数据不一致



#### 实现多线程第一种方法

---

##### 继承Thread类

* 继承Thread类

* 重写`run()`方法

* 直接`start()`启动线程

* **注意：**线程不一定立刻执行，CPU安排调度

  不推荐使用，避免OOP单继承局限性

```java
package com.joker_yue.javalearn.ThreadLearn;

//创建线程方式一：继承Thread类，重写run()方法，调用start
public class TestThread extends Thread{
    //线程入口点
    @Override
    public void run() {
        //run方法线程体
        for (int i = 0; i < 20; i++) {
            System.out.println("我在写代码==="+i);
        }
    }


    public static void main(String[] args) {
        //main线程，主线程


        //创建一个线程对象 (本类对象)
        TestThread testThread1 = new TestThread();

        //调用start方法开启线程
        testThread1.start();



        for (int i = 0; i < 200 ; i++) {
            System.out.println("我在学习==="+i);
        }

    }
}
```



---

##### 网图下载

```java
package com.joker_yue.javalearn.ThreadLearn;

import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

//练习Thread，实现多线程下载图片
public class TestThread02 extends Thread {

    private String url;//文件下载地址
    private String name;//保存的文件名

    public TestThread02(String url, String name) {
        this.url = url;
        this.name = name;
    }


    //下载线程的执行体
    @Override
    public void run() {
        WebDownloader downloader = new WebDownloader();
        downloader.downloader(url,name);
        System.out.println("下载完毕，下载的文件名为"+name);
    }

    public static void main(String[] args) {
        TestThread02 testThread01 = new TestThread02("https://th.bing.com/th/id/OIP.zDCS-qQYLzpBLvOmPll6ogHaFP?w=267&h=189&c=7&r=0&o=5&dpr=2.5&pid=1.7","idea1.jpg");
        TestThread02 testThread02 = new TestThread02("https://th.bing.com/th/id/OIP.zDCS-qQYLzpBLvOmPll6ogHaFP?w=267&h=189&c=7&r=0&o=5&dpr=2.5&pid=1.7","idea2.jpg");
        TestThread02 testThread03 = new TestThread02("https://th.bing.com/th/id/OIP.zDCS-qQYLzpBLvOmPll6ogHaFP?w=267&h=189&c=7&r=0&o=5&dpr=2.5&pid=1.7","idea3.jpg");

        testThread01.start();
        testThread02.start();
        testThread03.start();
    }
}

//下载器
class WebDownloader {
    //下载方法
    public void downloader(String url, String name) {
        try {
            FileUtils.copyURLToFile(new URL(url), new File(name));
        } catch (IOException e) {
            System.out.println("IO异常，下载出错");
            throw new RuntimeException(e);
        }
    }
}
```

输出结果为

~~~java
下载完毕，下载的文件名为idea2.jpg
下载完毕，下载的文件名为idea1.jpg
下载完毕，下载的文件名为idea3.jpg
~~~





#### 实现多线程第二种方法

---

##### 实现Runnable接口

* 实现Runnable接口

* 实现`run()`方法

* 创建Thread对象，然后`start()`启动线程

  （与上一个方法的区别是，这里不是Thread对象，所以得`newThread(对象).start`）

* **注意：**推荐使用，避免单继承局限性，灵活方便，方便同一个对象被多个线程使用

  <img src="./跟随狂神学Java-26.assets/image-20230406215052057.png" alt="image-20230406215052057" style="zoom:60%;" />

```java
package com.joker_yue.javalearn.ThreadLearn;

//创建线程方式2，实现Runnable接口
//重写run()方法
//执行线程需要丢入runnable接口实现类，调用start()方法
public class TestThread03 implements Runnable {
    //线程入口点
    @Override
    public void run() {
        //run方法线程体
        for (int i = 0; i < 20; i++) {
            System.out.println("我在写代码===" + i);
        }
    }


    public static void main(String[] args) {
        //创建Runnable接口的实现类对象
        TestThread03 testThread03 = new TestThread03();

       /* //创建线程对象，通过线程对象来开启我们的线程，代理
        Thread thread = new Thread(testThread03);//将线程传入构造器中
        thread.start();*/

        //上述代码可以简写成
        new Thread(testThread03).start();

        for (int i = 0; i < 200; i++) {
            System.out.println("我在学习===" + i);
        }

    }
}
```





#### 初识并发问题

---

```java
package com.joker_yue.javalearn.ThreadLearn;

//多个线程同时操作同一个对象
//买火车票的例子

//发现问题，多个线程操作同一个资源的时候，线程不安全，数据紊乱
public class TestThread04 implements Runnable {

    //票数量
    private int ticketNums = 10;

    @Override
    public void run() {
        while (true) {
            if (ticketNums <= 0) {
                break;
            }
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println(Thread.currentThread().getName() + "拿到了第" + ticketNums-- + "张票");//getName可以获得当前线程的名字
        }
    }

    public static void main(String[] args) {
        TestThread04 ticket = new TestThread04();

        new Thread(ticket,"小明").start();
        new Thread(ticket,"小红").start();
        new Thread(ticket,"小方").start();

    }
}
```

**问题：**多个线程操作同一个资源的时候，线程不安全，数据紊乱



#### 案例：龟兔赛跑

---

1. 首先来个赛道距离，然后离终点越来越近
2. 判断比赛是否结束
3. 打印胜利者
4. 龟兔赛跑开始
5. 故事中乌龟是赢得，兔子需要睡觉，所以需要模拟图兔子睡觉
6. 终于乌龟赢了



```java
package com.joker_yue.javalearn.ThreadLearn;

import org.apache.commons.io.input.TaggedReader;

public class Race implements Runnable {

    //胜利者
    private static String winner;

    @Override
    public void run() {
        for (int i = 0; i <= 100; i++) {
            //模拟兔子休息
            if(Thread.currentThread().getName().equals("兔子")){
                try {
                    Thread.sleep(10);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
            //判断比赛是否结束
            if (gameOver(i)) break;

            System.out.println(Thread.currentThread().getName() + "-->跑了" + i + "步");
        }
    }

    //判断是否完成比赛
    private boolean gameOver(int steps) {
        //判断是否有胜利者
        if (winner != null) {//已经存在胜利者
            return true;
        }
        if (steps == 100) {
            winner = Thread.currentThread().getName();
            System.out.println("winner is" + winner);
        }
        return false;
    }

    public static void main(String[] args) {
         Race race = new Race();

         new Thread(race,"兔子").start();
         new Thread(race,"乌龟").start();

    }
}
```





#### 实现Callable接口（了解即可）

---

1. 实现Callable接口，需要返回值类型
2. 重写call方法，需要抛出异常
3. 创建目标对象
4. 创建执行服务
5. 提交执行
6. 获取结果
7. 关闭服务



~~~java
package com.joker_yue.javalearn.ThreadLearn;

import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.*;

/*
Callable的好处，
1.可以定义返回值
2，可以抛出异常
 */

//练习Thread，实现多线程下载图片
public class TestCallable implements Callable<Boolean> {

    private String url;//文件下载地址
    private String name;//保存的文件名

    public TestCallable(String url, String name) {
        this.url = url;
        this.name = name;
    }


    //下载线程的执行体
    @Override
    public Boolean call() {
        WebDownloader1 downloader = new WebDownloader1();
        downloader.downloader(url,name);
        System.out.println("下载完毕，下载的文件名为"+name);
        return true;
    }

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        TestCallable testThread01 = new TestCallable("https://th.bing.com/th/id/OIP.zDCS-qQYLzpBLvOmPll6ogHaFP?w=267&h=189&c=7&r=0&o=5&dpr=2.5&pid=1.7","idea1.jpg");
        TestCallable testThread02 = new TestCallable("https://th.bing.com/th/id/OIP.zDCS-qQYLzpBLvOmPll6ogHaFP?w=267&h=189&c=7&r=0&o=5&dpr=2.5&pid=1.7","idea2.jpg");
        TestCallable testThread03 = new TestCallable("https://th.bing.com/th/id/OIP.zDCS-qQYLzpBLvOmPll6ogHaFP?w=267&h=189&c=7&r=0&o=5&dpr=2.5&pid=1.7","idea3.jpg");

        //创建执行服务
        ExecutorService ser = Executors.newFixedThreadPool(3);//创建3个线程池

        //提交执行
        Future<Boolean> result1 = ser.submit(testThread01);
        Future<Boolean> result2 = ser.submit(testThread02);
        Future<Boolean> result3 = ser.submit(testThread03);

        //获取结果
        boolean r1 = result1.get();
        boolean r2 = result2.get();
        boolean r3 = result3.get();

        System.out.println(r1);
        System.out.println(r2);
        System.out.println(r3);

        //关闭服务，销毁当前池
        ser.shutdownNow();



    }

}

//下载器
class WebDownloader1 {
    //下载方法
    public void downloader(String url, String name) {
        try {
            FileUtils.copyURLToFile(new URL(url), new File(name));
        } catch (IOException e) {
            System.out.println("IO异常，下载出错");
            throw new RuntimeException(e);
        }
    }
}
~~~





#### 静态代理模式

---

**代理是为了不改变原来代码的基础上增强代码**

~~~java
package com.joker_yue.javalearn.ThreadLearn;

/*
静态代理模式总结：
    真实对象和代理对象都要实现同一个接口
    代理对象要代理真实角色

好处：
    代理对象可以做很多真实对象做不了的事情
    真实对象专注做自己的事情
 */


public class StaticProxy {
    public static void main(String[] args) {

//        new Thread(() -> System.out.println("我爱你")).start();

//        new WeddingCom(new You()).HappyMarry();
        
        You you = new You();//你要结婚
//        you.HappyMarry();
        WeddingCom weddingCom = new WeddingCom(you);
        weddingCom.HappyMarry();
    }

}

interface Marry {
    void HappyMarry();
}

//真实角色，你在结婚
class You implements Marry {

    @Override
    public void HappyMarry() {
        System.out.println("我们结婚啦");
    }
}

//代理角色，帮你结婚
class WeddingCom implements Marry {

    //代理谁->>真实目标角色
    private Marry target;//目标的结婚顾客

    public WeddingCom(Marry target) {
        this.target = target;
    }

    @Override
    public void HappyMarry() {
        before();
        this.target.HappyMarry();//目标顾客结婚
        after();
    }

    private void after() {
        System.out.println("结婚之后，收尾款");
    }

    private void before() {
        System.out.println("结婚之前，布置");
    }
}
~~~





#### 线程停止

---

![image-20230413205801155](./跟随狂神学Java-26.assets/image-20230413205801155.png)

![image-20230413210200230](./跟随狂神学Java-26.assets/image-20230413210200230.png)

![image-20230413210337840](./跟随狂神学Java-26.assets/image-20230413210337840.png)

 ~~~java
package com.joker_yue.javalearn.ThreadLearn;

//测试stop
//1.建议线程正常停止-->利用次数，不建议死循环
//2.建议使用一些标志位
//3.不要使用stop()/destroy()等已经过时的或者JDK不建议的方法
public class TestThreadStop implements Runnable {
    //    1.设置一个标志位
    private boolean flag = true;


    @Override
    public void run() {
        int i = 0;
        while (flag) {
            System.out.println("线程正在运行" + i++);
        }
    }

    //    2.设置一个公开的方法停止线程，转换标志位
    public void stop() {
        this.flag = false;
    }

    public static void main(String[] args) {
        TestThreadStop tts = new TestThreadStop();
        new Thread(tts).start();
        for (int i = 0; i < 1000; i++) {
            System.out.println("main" + i);
            //调用stop方法切换标志位，停止线程
            if (i == 900) {
                tts.stop();
                System.out.println("线程停止了");
            }
        }

    }
}
 ~~~





#### 线程休眠

---

* sleep(时间)指定当前线程阻塞的毫秒数
* sleep存在异常InterruptedException
* sleep时间达到后线程将进入就绪状态
* sleep可以模拟网络延时，倒计时等
* 每一个对象都有一把锁，sleep不会释放锁

 ~~~java
package com.joker_yue.javalearn.ThreadLearn;

import java.text.SimpleDateFormat;
import java.util.Date;

//模拟倒计时
public class TestThreadSleep02 {
    public static void tenDown() throws InterruptedException {
        int num = 10;

        while (true) {
            Thread.sleep(1000);
            System.out.println(num--);
            if (num <= 0) break;
        }
    }

    public static void main(String[] args) {
        //打印当前系统时间
        Date startTime = new Date(System.currentTimeMillis());//获取系统当前时间

        while (true) {
            try {
                Thread.sleep(1000);
                System.out.println(new SimpleDateFormat("HH:mm:ss").format(startTime));
                startTime = new Date(System.currentTimeMillis());//更新系统当前时间

            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
 ~~~



#### 线程礼让

---

* 礼让状态，让当前正在执行的线程暂停，但不阻塞

* 将线程从运行状态转换成就绪状态

* 让CPU重新调度，礼让不一定成功

  ~~~java
  package com.joker_yue.javalearn.ThreadLearn;
  
  //注意：礼让不一定成功
  
  public class testYield {
      public static void main(String[] args) {
          MyYield myYield = new MyYield();
          new Thread(myYield, "a").start();
          new Thread(myYield, "b").start();
      }
  }
  
  class MyYield implements Runnable {
  
      @Override
      public void run() {
          System.out.println(Thread.currentThread().getName()+"线程开始执行");
          Thread.yield();//礼让
          System.out.println(Thread.currentThread().getName()+"线程停止执行");
      }
  }
  ~~~



#### 线程强制执行

---

* Join合并线程，待此线程执行完成后，再执行其他线程，其他线程阻塞
* 可以想象成插队

 ~~~java
package com.joker_yue.javalearn.ThreadLearn;


public class TestJoin implements Runnable {

    @Override
    public void run() {
        for (int i = 0; i < 1000; i++) {
            System.out.println("线程VIP来了" + i);
        }

    }

    public static void main(String[] args) throws InterruptedException {
        //启动线程
        TestJoin testJoin = new TestJoin();
        Thread thread = new Thread(testJoin);
        thread.start();

        //主线程
        for (int i = 0; i < 500; i++) {
            if (i == 200) {
                thread.join();//插队
            }
            System.out.println("main" + i);
        }
    }


}
 ~~~



#### 线程状态观测

----

**Thread.State**

线程状态，线程可以处于以下状态之一

* **NEW**

  尚未启动的线程处于此状态

* RUNNABLE

  在Java虚拟机中执行的线程处于此状态

* **BLOCKED**

  被阻塞等待监视器锁定的线程处于此状态

* **WAITING**

  正在等待另一个线程执行特定动作处于此状态

* **TIMED_WAITING**

  正在等待另一个线程执行动作达到指定等待时间的线程处于此状态

* **TERMINATED**

  已退出的线程处于此状态

一个线程可以在给定的时间点处于一个状态，这些状态时不反应给任何操作系统线程状态的虚拟机状态

~~~java
package com.joker_yue.javalearn.ThreadLearn;

/*
观察线程的状态
 */
public class TestState {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
            System.out.println("////////");
        });

        //观察状态
        Thread.State state = thread.getState();
        System.out.println(state);//NEW

        //观察启动
        thread.start();
        state = thread.getState();
        System.out.println(state);//RUNNABLE

        while(state !=  Thread.State.TERMINATED){
            //只要线程不终止，就一直输出状态
            Thread.sleep(100);
            state = thread.getState();//更新状态
            System.out.println(state);//输出状态
        }

//        thread.start();//死亡之后不能被重新启动
        


    }
}
~~~





#### 线程的优先级

---

* Java提供一个线程调度器来监控程序中启动后进入就绪状态的所有线程，线程调度器按照优先级决定应该调度哪个线程来执行
* 线程的优先级用数字表示，范围从1-10
  * Thread.MIN_PRIORITY = 1;
  * Thread.MAX_PRIORITY = 10;
  * Thread.NORM_PRIORITY = 5;
* 使用以下方式查看和改变线程优先级
  * `getPriority().` `setPriority(int xx);`

~~~java
package com.joker_yue.javalearn.ThreadLearn;

//测试线程优先级
public class TestPriority extends Thread {
    public static void main(String[] args) {
        //主线程默认优先级
        System.out.println(Thread.currentThread().getName() + "-->" + Thread.currentThread().getPriority());

        MyPriority myPriority = new MyPriority();

        Thread t1 = new Thread(myPriority);
        Thread t2 = new Thread(myPriority);
        Thread t3 = new Thread(myPriority);
        Thread t4 = new Thread(myPriority);
        Thread t5 = new Thread(myPriority);
        Thread t6 = new Thread(myPriority);

        //先设置优先级，再启动
        t1.start();

        t2.setPriority(1);
        t2.start();


        t3.setPriority(4);
        t3.start();


        t4.setPriority(Thread.MAX_PRIORITY);
        t4.start();


        t5.setPriority(8);
        t5.start();


        t6.setPriority(7);
        t6.start();
    }
}

class MyPriority implements Runnable {

    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName() + "-->" + Thread.currentThread().getPriority());

    }
}

~~~

注意：优先级高的不一定先跑，只是大概率先跑





#### 守护(daemon)线程

---

* 线程分为**用户线程**和**守护线程**
* 虚拟机必须确保用户线程执行完毕
* 虚拟机不必等待守护线程执行完毕
* 如，后台记录操作日志，监控内存，垃圾回收等

~~~java
package com.joker_yue.javalearn.ThreadLearn;

//测试守护线程
public class TestDaemon {
    public static void main(String[] args) {
        God god = new God();
        Us us = new Us();

        Thread thread = new Thread(god);
        thread.setDaemon(true);//将其设置为守护线程，默认false用户线程

        thread.start();//上帝守护线程启动
        new Thread(us).start();

    }
}


class God implements Runnable {

    @Override
    public void run() {
        while (true) {
            System.out.println("上帝保佑你");
        }
    }
}

class Us implements Runnable {

    @Override
    public void run() {
        for (int i = 0; i < 36500; i++) {
            System.out.println("我一生都在开心的活着");
        }
        System.out.println("=============GoodBye World==========");
    }
}
~~~





#### 线程同步机制

---

并发：同一个对象被多个线程同时操作

​			比如：上万人抢同一张票

形成条件：队列+锁



* 由于同一进程的多个线程共享同一块存储空间，在带来方便的同时，也带来了访问冲突问题，为了保证数据在方法中被访问时的正确性，在访问时加入**锁机制Synchronized**，当一个线程获得对象的排它锁，独占资源，其他线程必须等待，使用后释放锁即可。存在以下问题：
  * 一个线程持有锁会导致其他所有需要锁的线程挂起
  * 在多线程竞争下，加锁，释放锁会导致比较多的上下文切换和调度延时，引起性能问题
  * 如果一个优先级高的进程等待一个优先级低的进程释放锁，会导致优先级倒置，引起性能问题



例子：不安全的买票，因为可能出现负数或者抢到同一张票

~~~java
package com.joker_yue.javalearn.ThreadLearn;

//不安全的买票
//线程不安全，有负数
public class UnsafeBuyTicket {
    public static void main(String[] args) {
        BuyTicket station = new BuyTicket();

        new Thread(station, "苦逼的我").start();
        new Thread(station, "牛逼的你").start();
        new Thread(station, "可恶的黄牛").start();

    }

}

class BuyTicket implements Runnable {

    //票
    int ticketNums = 10;
    boolean flag = true;//停止标志

    @Override
    public void run() {
        //买票
        while (flag) {
            try {
                buy();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }

    private void buy() throws InterruptedException {
        //判断是否有票
        if (ticketNums <= 0) {
            flag = false;
            return;
        }

        //模拟延时
        Thread.sleep(100);
        //买票
        System.out.println(Thread.currentThread().getName() + "拿到了第" + ticketNums--);

    }
}
~~~

例子：不安全的取钱

~~~java
package com.joker_yue.javalearn.ThreadLearn;


public class UnsafeBank {
    public static void main(String[] args) {
        //账户
        Account account = new Account(100,"结婚基金");
         Drawing you = new Drawing(account,50,"你");
         Drawing gf = new Drawing(account,100,"girlFriend");

         you.start();
         gf.start();


    }
}

//账户
class Account {
    int money;//余额
    String name;//卡名

    public Account(int money, String name) {
        this.money = money;
        this.name = name;
    }
}

//银行：模拟取款
class Drawing extends Thread {
    Account account;//账户
    //取了多少钱
    int drawingMoney;//取了多少钱
    int nowMoney;//现在手里有多少钱

    public Drawing(Account account, int drawing, String name) {
        super(name);
        this.account = account;
        this.drawingMoney = drawing;
    }

    @Override
    public void run() {
        //判断有没有钱
        if (account.money - drawingMoney < 0) {
            System.out.println(Thread.currentThread().getName() + "钱不够了");
            return;
        }

        //模拟延时，放大问题的发生性
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        //卡内余额 = 余额-你取的钱
        account.money = account.money - drawingMoney;

        //你手里的钱
        nowMoney = nowMoney + drawingMoney;

        System.out.println(account.name+"余额为"+account.money);
        System.out.println(this.getName()+"手里的钱"+nowMoney);

    }
}
~~~

例子：不安全的集合

~~~java
package com.joker_yue.javalearn.ThreadLearn;

import java.util.ArrayList;
import java.util.List;

//线程不安全的集合
public class UnsafeList {
    public static void main(String[] args) throws InterruptedException {
        List<String> list = new ArrayList<>();
        for (int i = 0; i < 10000; i++) {
            new Thread(() -> {
                list.add(Thread.currentThread().getName());
            }).start();
        }
        Thread.sleep(1000);
        System.out.println(list.size());//没有10000.因为两个进程同时操作了list中同一位置，进行了覆盖
    }
}
~~~





#### 同步方法

---

* 由于我们通过private关键字来保证数据对象只能被方法访问，所以我们只需要针对方法提出一套机制，这套机制就是synchronized关键字，它包括两种用法：

  * synchronized方法和synchronized块
  * 同步方法：`public synchronized void method(int args){}`

* synchronized方法控制“对象”的访问，每个对象对应着一把锁，每个synchronized方法都必须获得调用该方法的对象的锁才能执行，否则线程会阻塞，方法一旦执行，就独占该锁，直到该方法返回才释放锁，后面被阻塞的锁才能获得这个锁，继续执行。

  * 缺陷：若将一个较大的方法申明为synchronized将会影响效率

* 同步方法弊端

  <img src="./跟随狂神学Java-26.assets/image-20230416212014288.png" alt="image-20230416212014288" style="zoom:33%;" />

* 同步块

  * 同步块：synchronized(Obj){}
  * Obj称之为同步监视器
    * Obj可以是任何对象，但是推荐使用共享资源作为同步监视器
    * 同步方法中无需指定同步监视器，因为同步方法的同步监视器就是this，就是这个对象本身，或者是class[见反射]
  * 同步监视器的执行过程
    1. 第一个线程访问，锁定同步监视器，执行其中代码
    2. 第二个线程访问，发现同步监视器被锁定，无法访问
    3. 第一个线程访问完毕，解锁同步监视器
    4. 第二个线程访问，发现同步监视器没有锁，然后锁定并访问

* 将上面的改成线程安全的

  ~~~java
  package com.joker_yue.javalearn.ThreadLearn;
  
  //安全的买票
  //线程安全，无负数
  public class SafeBuyTicket {
      public static void main(String[] args) {
          BuyTicket station = new BuyTicket();
  
          new Thread(station, "苦逼的我").start();
          new Thread(station, "牛逼的你").start();
          new Thread(station, "可恶的黄牛").start();
  
      }
  
  }
  
  class BuyTicket implements Runnable {
  
      //票
      int ticketNums = 10;
      boolean flag = true;//停止标志
  
      @Override
      public void run() {
          //买票
          while (flag) {
              try {
                  buy();
              } catch (InterruptedException e) {
                  throw new RuntimeException(e);
              }
          }
      }
  
      //变成了同步方法，锁的是this
      private synchronized void buy() throws InterruptedException {
          //判断是否有票
          if (ticketNums <= 0) {
              flag = false;
              return;
          }
  
          //模拟延时
          Thread.sleep(100);
          //买票
          System.out.println(Thread.currentThread().getName() + "拿到了第" + ticketNums--);
  
      }
  }
  
  ~~~

  ~~~java
  package com.joker_yue.javalearn.ThreadLearn;
  
  
  public class SafeBank {
      public static void main(String[] args) {
          //账户
          Account account = new Account(1000, "结婚基金");
          Drawing you = new Drawing(account, 50, "你");
          Drawing gf = new Drawing(account, 100, "girlFriend");
  
          you.start();
          gf.start();
  
  
      }
  }
  
  //账户
  class Account {
      int money;//余额
      String name;//卡名
  
      public Account(int money, String name) {
          this.money = money;
          this.name = name;
      }
  }
  
  //银行：模拟取款
  class Drawing extends Thread {
      Account account;//账户
      //取了多少钱
      int drawingMoney;//取了多少钱
      int nowMoney;//现在手里有多少钱
  
      public Drawing(Account account, int drawing, String name) {
          super(name);
          this.account = account;
          this.drawingMoney = drawing;
      }
  
  
      //取钱
      //synchronized默认锁的是this
      @Override
      public void run() {//在这里加上synchronized锁的是this，也就是Drawing银行。但是两个人还是在银行里面取钱
  
          synchronized (account) {//所以我们需要锁的是account，也就是变化的量
              //判断有没有钱
              if (account.money - drawingMoney < 0) {
                  System.out.println(Thread.currentThread().getName() + "钱不够，取不了");
                  return;
              }
  
              //模拟延时，放大问题的发生性
              try {
                  Thread.sleep(1000);
              } catch (InterruptedException e) {
                  throw new RuntimeException(e);
              }
  
              //卡内余额 = 余额-你取的钱
              account.money = account.money - drawingMoney;
  
              //你手里的钱
              nowMoney = nowMoney + drawingMoney;
  
              System.out.println(account.name + "余额为" + account.money);
              System.out.println(this.getName() + "手里的钱:" + nowMoney);
          }
  
      }
  }
  ~~~

  ~~~java
  package com.joker_yue.javalearn.ThreadLearn;
  
  import java.util.ArrayList;
  import java.util.List;
  
  //线程不安全的集合
  public class SafeList {
      public static void main(String[] args) throws InterruptedException {
          List<String> list = new ArrayList<>();
          for (int i = 0; i < 10000; i++) {
              new Thread(() -> {
                  synchronized (list) {
                      list.add(Thread.currentThread().getName());
                  }
              }).start();
          }
          Thread.sleep(1000);
          System.out.println(list.size());//没有10000.因为两个进程同时操作了list中同一位置，进行了覆盖
      }
  }
  ~~~



#### CopyOnWriteArrayList

---

~~~java
package com.joker_yue.javalearn.ThreadLearn;


import java.util.concurrent.CopyOnWriteArrayList;

//测试JUC安全类型的集合
public class TestJUC {
    public static void main(String[] args) {
        CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<String>();
        for (int i = 0; i < 10000; i++) {
            new Thread(()->{
                list.add(Thread.currentThread().getName());
            }).start();
        }

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        System.out.println(list.size());
    }
}

~~~

在java.util.concurrent包下的都是线程安全的



#### 死锁

---

* 多个线程各自占有一些共享资源，并且相互等待其他线程占有的资源才能运行，而两个或者多个线程都在等待对方释放资源，都停止执行的情形，某一个同步块同时拥有“**两个以上对象的锁**”时，就可能会发生“死锁”的问题
* 死锁：公司招有工作经验的毕业生，毕业生没有工作哪来的工作经验

 ~~~java
package com.joker_yue.javalearn.ThreadLearn;

//死锁：两个或者多个对象需要的资源被互相上锁，然后形成僵持
public class DeadLock {
    public static void main(String[] args) {
        MakeUp g1 = new MakeUp(0, "灰姑娘");
        MakeUp g2 = new MakeUp(1, "白雪公主");

        g1.start();
        g2.start();

    }
}

//口红
class Lipstick {

}

//镜子
class Mirror {

}

class MakeUp extends Thread {
    //需要的资源只有一份，用static来保证只有一份
    static Lipstick lipstick = new Lipstick();
    static Mirror mirror = new Mirror();

    int choice;//选择
    String girlName;//使用化妆品的人

    MakeUp(int choice, String girlName) {
        this.choice = choice;
        this.girlName = girlName;
    }

    @Override
    public void run() {
        //化妆
        try {
            makeup();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

    }

    //化妆，互相持有对方的锁，就是需要拿到对方的资源
    private void makeup() throws InterruptedException {
        if (choice == 0) {
            synchronized (lipstick) {//获得口红的锁
                System.out.println(this.girlName + "获得口红的锁");
                Thread.sleep(1000);

                synchronized (mirror) {//一秒钟后获得镜子的锁
                    System.out.println(this.girlName + "获得镜子的锁");
                }
            }
        } else {
            synchronized (mirror) {//获得镜子的锁
                System.out.println(this.girlName + "获得镜子的锁");
                Thread.sleep(2000);
                
                synchronized (lipstick) {//2秒钟后获得口红的锁
                    System.out.println(this.girlName + "获得口红的锁");
                }
            }
        }
    }
}
 ~~~

解决方法：将获得锁放到外面

~~~java
package com.joker_yue.javalearn.ThreadLearn;

//死锁：两个或者多个对象需要的资源被互相上锁，然后形成僵持
public class DeadLock {
    public static void main(String[] args) {
        MakeUp g1 = new MakeUp(0, "灰姑娘");
        MakeUp g2 = new MakeUp(1, "白雪公主");

        g1.start();
        g2.start();

    }
}

//口红
class Lipstick {

}

//镜子
class Mirror {

}

class MakeUp extends Thread {
    //需要的资源只有一份，用static来保证只有一份
    static Lipstick lipstick = new Lipstick();
    static Mirror mirror = new Mirror();

    int choice;//选择
    String girlName;//使用化妆品的人

    MakeUp(int choice, String girlName) {
        this.choice = choice;
        this.girlName = girlName;
    }

    @Override
    public void run() {
        //化妆
        try {
            makeup();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

    }

    //化妆，互相持有对方的锁，就是需要拿到对方的资源
    private void makeup() throws InterruptedException {
        if (choice == 0) {
            synchronized (lipstick) {//获得口红的锁
                System.out.println(this.girlName + "获得口红的锁");
                Thread.sleep(1000);
            }

            synchronized (mirror) {//一秒钟后获得镜子的锁
                System.out.println(this.girlName + "获得镜子的锁");
            }
        } else {
            synchronized (mirror) {//获得镜子的锁
                System.out.println(this.girlName + "获得镜子的锁");
                Thread.sleep(2000);
            }

            synchronized (lipstick) {//2秒钟后获得口红的锁
                System.out.println(this.girlName + "获得口红的锁");
            }
        }
    }
}
~~~

产生死锁的四个必要条件：

1. 互斥条件：一个资源每次只能被一个进程使用。
2. 请求与保持条件：一个进程因请求资源而阻塞时，对已获得的资源保持不放 。
3. 不剥夺条件：进程已获得的资源，在末使用完之前，不能强行剥夺 。
4. 循环等待条件：若干进程之间形成一种头尾相接的循环等待资源关系 。

注意：只需要破坏其中一个或多个即可避免死锁



#### Lock锁

---

* 从JDK1.5开始，Java提供了更强大的线程同步机制--通过显示定义同步锁队象来实现同步，同步锁使用Lock对象充当

* java.util.concurrent.locks.Lock接口是控制多个线程对共享资源进行访问的工具。

  锁提供了对共享资源的独占访问，每次只能有一个线程对Lock对象加锁，线程开始访问共享资源之前应该先获得Lock对象

* ReentrantLock类（可重  入锁）实现了Lock，它拥有与synchronized相同的并发性和内存语义，在实现线程安全的控制中，比较常用的是ReentrantLock，可以显式加锁、释放锁

* ~~~java
  class A{
      private final ReentrantLock lock = new ReentrantLock();//确保安全不会被修改
      public void m(){
  		lock.lock();
          try{
              //确保线程安全的代码
          }finally{
              lock.unlock();
              //如果同步代码有异常，要将unlock写到finally语句块
          }
      }
  }
  ~~~

  * Lock是显式锁（手动开启和关闭，别忘记关闭锁）synchronized是隐式锁，出了作用域自动释放
  * Lock只有代码块锁，synchronized有哦代码块锁和方法锁
  * 使用Lock锁，JVM将花费较少的时间来调度线程，性能更好。并且具有更好的扩展性（提供更多子类）
  * 优先使用顺序：
    * Lock > 同步代码块 （已经进入了方法体，分配了相应资源） > 同步方法（在方法体之外）





#### 线程协作（生产者消费者模式）

---

线程通信

* 应用场景：生产者和消费者问题

  * 假设仓库中只能存放一件产品，生产者将生产出来的产品放入仓库，消费者将仓库中产品取走消费

  * 如果仓库中没有产品，则生产者将产品放入残酷，否则停止生产并等待，直到仓库中的产品被消费者取走为止

  * 如果仓库中放有产品，则消费者可以将产品取走消费，否则停止消费并等待，直到仓库中再次放入产品为止

    <img src="./跟随狂神学Java-26.assets/image-20230417211358349.png" alt="image-20230417211358349" style="zoom: 50%;" /> 

* 这是一个线程同步问题，生产者和消费者共享一个资源，并且生产者和消费者之间相互依赖，互为条件

  * 对于生产者，没有生产产品之前，要通知消费者等待，而生产了产品之后，又要马上通知消费者消费
  * 对于消费者，在消费之后，要通知生产者已经结束消费，需要产生新的产品以供消费
  * 在生产者消费者问题中，仅有synchronized是**不够**的
    * synchronized可阻止并发更新同一个共享资源，实现了同步
    * synchronized不能用来实现不同线程之间的消息传递（通信）

* Java提供了几个方法解决线程之间的通信问题

  * | 方法名             | 作用                                                         |
        | ------------------ | ------------------------------------------------------------ |
    | wait()             | 表示线程一直等待，直到其他线程通知，与sleep不同，会释放锁    |
    | wait(long timeout) | 指定等待的毫秒数                                             |
    | notify()           | 唤醒一个正在处于等待状态的线程                               |
    | notifyAll()        | 唤醒同一个对象上所有调用wait()方法的线程，优先级别高的线程优先调度 |

  * 注意：均是Object类的方法，都只能在同步方法或者同步代码块中使用，否则会抛出异常IllegaIMonitorStateException

* 解决方式1

  并发协作模型：“生产者/消费者模式”-->管程法

  * 生产者：负责生产数据的模块，可能是方法，对象，线程，进程
  * 消费者：负责处理数据的模块，可能是方法，对象，线程，进程
  * 缓冲区：消费者不能直接使用生产者的数据，它们之间有个“缓冲区”

  **生产者将生产好的数据放入缓冲区，消费者从缓冲区拿出数据**

  <img src="./跟随狂神学Java-26.assets/image-20230420183252471.png" alt="image-20230420183252471" style="zoom: 67%;" />

* 解决方式2

  并发协作模型：“生产者/消费者模式”-->信号灯法

* 应用场景

  <img src="./跟随狂神学Java-26.assets/image-20230420183519492.png" alt="image-20230420183519492" style="zoom: 33%;" />



---

##### 管程法

~~~java
package com.joker_yue.javalearn.ThreadLearn;

//测试生产者消费者模型--利用缓冲区解决：管程法

//生产者，消费者，产品，缓冲区
public class TestPC {
    public static void main(String[] args) {
        SyncContainer container = new SyncContainer();
        new Productor(container).start();
        new Consumer(container).start();
    }
}

//生产者
class Productor extends Thread {
    SyncContainer container;

    public Productor(SyncContainer container) {
        this.container = container;
    }

    //生产
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
//            打印是两个线程同时进行的，把打印放到同步方法里就会显示0~9只鸡
            System.out.println("生产了" + i + "只鸡");
            container.push(new Chicken(i));
        }
    }
}

//消费者
class Consumer extends Thread {
    SyncContainer container;

    public Consumer(SyncContainer container) {
        this.container = container;
    }

    //消费
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            container.push(new Chicken(i));
            System.out.println("消费了-->" + container.pop().id + "只鸡");
        }
    }
}

// 产品
class Chicken {
    int id;//产品编号

    public Chicken(int id) {
        this.id = id;
    }
}

//缓冲区
class SyncContainer {
    Chicken[] chickens = new Chicken[10]; //需要一个容器大小
    int count = 0;    //容器计数器

    //生产者放入产品
    public synchronized void push(Chicken chicken) {
        //如果容器满了，就需要等待消费者消费
        if (count == chickens.length) {
            try {
                this.wait();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }

        //如果没有满，就需要丢入产品
        chickens[count] = chicken;
        count++;

        //可以通知消费者消费了
        this.notifyAll();
    }


    //消费者消费产品
    public synchronized Chicken pop() {
        //判断能否消费
        if (count == 0) {
            //等待生产者生产，消费者等待
            try {
                this.wait();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }

        //如果可以消费，消费
        count--;
        Chicken chicken = chickens[count];

        //吃完了，通知生产者生产
        this.notifyAll();
        return chicken;
    }
}
~~~



#### 线程池

---

* 背景：机场创建和销毁、使用量特别大的资源，比如并发情况下的线程，对**性能影响很大**。

* 思路：提前创建好多个线程，放入线程池中，使用时直接获取，使用完放回池中。

  可以避免频繁创建销毁、实现重复利用，类似生活中的公共交通工具。

* 好处：

  * 提高相应速度（减少了创建新线程的时间）
  * 降低资源消耗（重复利用线程池中线程，不需要每次都创建）
  * 便于线程管理（...）
    * corePoolSize：核心池的大小
    * maximumPoolSize：最大线程数
    * keepAliveTime：线程没有任务时最多保持多长时间后会终止

JDK5.0开始提供了线程池相关API：ExecutorService和Executors

* ExecutorService：真正的线程池接口，常见子类：ThreadPoolExecutor
  * `void executor(Runnable command)`：执行任务/命令，没有返回值，一般用来执行Runnable
  * `<T> Future <T> submit(Callable<T> task)`:执行任务，有返回值，一般用来执行Callable
  * `void shutdown() `： 关闭连接池
* Executors ： 工具类 、 线程池的工厂类 ， 用于创建并返回不同类型的线程池



~~~java
package com.joker_yue.javalearn.ThreadLearn;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class TestPool01 {
    public static void main(String[] args) {
        //1.创建服务，创建线程池
        //newFixedThreadPool 参数为线程池大小
        ExecutorService service = Executors.newFixedThreadPool(10);

        //执行Runnable的实现类
        service.execute(new MyThread());
        service.execute(new MyThread());
        service.execute(new MyThread());
        service.execute(new MyThread());

        //关闭连接
        service.shutdown();
    }
}

class MyThread implements Runnable {

    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName() );
    }
}
~~~





#### 总结

---

 ~~~java
package com.joker_yue.javalearn.ThreadLearn;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

//回顾总结线程的创建
public class ThreadNew {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        //继承Thread可直接start
        new MyThread1().start();
        //继承Runnable需要代理Thread
        new Thread(new MyThread2()).start();
        //继承Callable，需要FutureTask，或者也可以代理Thread
        FutureTask<Integer> futureTask = new FutureTask<Integer>(new MyThread3());
        new Thread(futureTask).start();
            //跑下Callable
            Integer integer = futureTask.get();
            System.out.println(integer);
    }
}

//1.继承Thread类
class MyThread1 extends Thread {
    @Override
    public void run() {
        System.out.println("继承Thread，重写run");
    }
}

// 2.实现Runnable接口
class MyThread2 implements Runnable {

    @Override
    public void run() {
        System.out.println("继承Runnable接口，重写run");
    }
}

//3.实现Callable接口
class MyThread3 implements Callable {

    @Override
    public Integer call() throws Exception {
        System.out.println("继承Callable，重写call");
        return 100;
    }
}
 ~~~

