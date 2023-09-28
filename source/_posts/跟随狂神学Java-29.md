---
title: 跟随狂神学Java-29，JUC并发编程
date: 2023/07/05 04:02:22
tags:
  - 狂神
  - Java
  - JavaSE
categories:
  - [跟随狂神学Java, Java]
cover: /images/coverImg/JavaSE/17.jpg
keywords:
  - JUC并发编程
  - 线程和进程
  - 并发与并行
  - 线程状态
  - WAIT和SLEEP的区别
  - Lock锁
  - 公平锁和非公平锁
  - Synchronized
  - 可重入性
  - 锁的状态判断
ai:
  - 这篇文章介绍了JUC并发编程基本概念。
  - 这篇文章介绍了JUC并发编程，包括线程和进程的区别、并发与并行、线程状态、WAIT和SLEEP的区别、Lock锁等内容。
  - 这篇文章介绍了JUC并发编程的基本概念，包括线程和进程的区别、并发与并行的概念，线程状态及其分类，WAIT和SLEEP的区别，以及Lock锁的使用和与Synchronized的比较。还介绍了公平锁和非公平锁的概念，以及Synchronized的可重入性。最后，提到了锁的作用以及如何判断锁的状态。
---
# 跟随狂神学Java

##### 第二十九天：JUC并发编程

> "计算机是为了解决以前不存在的问题而诞生的。" 
>
> [【狂神说Java】JUC并发编程最新版通俗易懂_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1B7411L7tE/?vd_source=814489e71df641c4b2c0ff7d4659b2d0)

#### 线程和进程

---

**进程**可以理解为一个程序。程序的依次执行过程

一个进程往往可以包括多个线程

Java默认有几个线程？**2个**，main线程和gc线程

**Java真的可以开线程吗？**不行，只能通过本地方法去调用C++

~~~java
public synchronized void start() {
        /**
         * This method is not invoked for the main method thread or "system"
         * group threads created/set up by the VM. Any new functionality added
         * to this method in the future may have to also be added to the VM.
         *
         * A zero status value corresponds to state "NEW".
         */
        if (threadStatus != 0)
            throw new IllegalThreadStateException();

        /* Notify the group that this thread is about to be started
         * so that it can be added to the group's list of threads
         * and the group's unstarted count can be decremented. */
        group.add(this);

        boolean started = false;
        try {
            start0();
            started = true;
        } finally {
            try {
                if (!started) {
                    group.threadStartFailed(this);
                }
            } catch (Throwable ignore) {
                /* do nothing. If start0 threw a Throwable then
                  it will be passed up the call stack */
            }
        }
    }
//本地方法，调用C++
    private native void start0();
~~~





#### 并发、并行

---

并发：多线程操作同一个资源

* CPU一个核心，模拟出来多条线程。快速交替

并行：多个人一起行走

* CPU多个核心，多个核心可以同时执行

~~~java
package com.joker_yue;

public class Test0 {
    public static void main(String[] args) {
        //获取CPU的核心数
        //CPU密集型，IO密集型
        System.out.println(Runtime.getRuntime().availableProcessors());

    }
}
~~~

并发编程的本质：**充分利用CPU的性能**

---

##### 线程有几个状态：

6个，创建NEW，运行RUNNABLE，阻塞 BLOCKED,，无限等待WAITING，计时等待TIMED_WAITING与终结TERMINATED。

~~~java

    /**
     * A thread state.  A thread can be in one of the following states:
     * <ul>
     * <li>{@link #NEW}<br>
     *     A thread that has not yet started is in this state.
     *     </li>
     * <li>{@link #RUNNABLE}<br>
     *     A thread executing in the Java virtual machine is in this state.
     *     </li>
     * <li>{@link #BLOCKED}<br>
     *     A thread that is blocked waiting for a monitor lock
     *     is in this state.
     *     </li>
     * <li>{@link #WAITING}<br>
     *     A thread that is waiting indefinitely for another thread to
     *     perform a particular action is in this state.
     *     </li>
     * <li>{@link #TIMED_WAITING}<br>
     *     A thread that is waiting for another thread to perform an action
     *     for up to a specified waiting time is in this state.
     *     </li>
     * <li>{@link #TERMINATED}<br>
     *     A thread that has exited is in this state.
     *     </li>
     * </ul>
     *
     * <p>
     * A thread can be in only one state at a given point in time.
     * These states are virtual machine states which do not reflect
     * any operating system thread states.
     *
     * @since   1.5
     * @see #getState
     */
    public enum State {
        /**
         * Thread state for a thread which has not yet started.
         */
        NEW,

        /**
         * Thread state for a runnable thread.  A thread in the runnable
         * state is executing in the Java virtual machine but it may
         * be waiting for other resources from the operating system
         * such as processor.
         */
        RUNNABLE,

        /**
         * Thread state for a thread blocked waiting for a monitor lock.
         * A thread in the blocked state is waiting for a monitor lock
         * to enter a synchronized block/method or
         * reenter a synchronized block/method after calling
         * {@link Object#wait() Object.wait}.
         */
        BLOCKED,

        /**
         * Thread state for a waiting thread.
         * A thread is in the waiting state due to calling one of the
         * following methods:
         * <ul>
         *   <li>{@link Object#wait() Object.wait} with no timeout</li>
         *   <li>{@link #join() Thread.join} with no timeout</li>
         *   <li>{@link LockSupport#park() LockSupport.park}</li>
         * </ul>
         *
         * <p>A thread in the waiting state is waiting for another thread to
         * perform a particular action.
         *
         * For example, a thread that has called {@code Object.wait()}
         * on an object is waiting for another thread to call
         * {@code Object.notify()} or {@code Object.notifyAll()} on
         * that object. A thread that has called {@code Thread.join()}
         * is waiting for a specified thread to terminate.
         */
        WAITING,

        /**
         * Thread state for a waiting thread with a specified waiting time.
         * A thread is in the timed waiting state due to calling one of
         * the following methods with a specified positive waiting time:
         * <ul>
         *   <li>{@link #sleep Thread.sleep}</li>
         *   <li>{@link Object#wait(long) Object.wait} with timeout</li>
         *   <li>{@link #join(long) Thread.join} with timeout</li>
         *   <li>{@link LockSupport#parkNanos LockSupport.parkNanos}</li>
         *   <li>{@link LockSupport#parkUntil LockSupport.parkUntil}</li>
         * </ul>
         */
        TIMED_WAITING,

        /**
         * Thread state for a terminated thread.
         * The thread has completed execution.
         */
        TERMINATED;
    }

~~~

---

##### WAIT和SLEEP的区别

1. **来自不同的类**：wait：Object；sleep：Thread
2. **关于锁的释放**：wait释放锁，sleep不会
3. **使用范围不同**：wait只能在同步代码块中使用，sleep随便都可以使用
4. **是否捕获异常**：wait不需要捕获异常，sleep必须捕获异常，因为可能超时等待
5. **是否需要唤醒**：wait需要被唤醒，sleep不需要被唤醒

---

##### Lock锁

Synchronize

~~~java
package com.joker_yue;

//基本的卖票例子

/*
 * 真正的多线程开发，公司中的开发
 * 线程  就是一个单独的资源类，没有任何附属的操作
 * */
public class Test01 {
    public static void main(String[] args) {
        //并发：多个线程操作同一个资源类，把资源丢入线程
        Ticket ticket = new Ticket();

        new Thread(() -> {
            for (int i = 0; i < 60; i++) {
                ticket.sale();
            }
        }, "A").start();

        new Thread(() -> {
            for (int i = 0; i < 60; i++) {
                ticket.sale();
            }
        }, "B").start();

        new Thread(() -> {
            for (int i = 0; i < 60; i++) {
                ticket.sale();
            }
        }, "C").start();
    }
}

//资源类
class  Ticket {
    //属性+方法
    private int number = 40;

    //卖票的方式
    public synchronized void sale() {
        if (number > 0) {
            System.out.println(Thread.currentThread().getName() + "卖出了第" + (number--) + "张票" + "，剩余" + number);
        }
    }
}
~~~





#### Lock锁

---

![image-20230704200757934](./跟随狂神学Java-29.assets/image-20230704200757934.png)

它们分别是可重用入（最常用的），读锁，写锁

使用下面的语句创建的锁默认为非公平锁

~~~java
    Lock lock = new ReentrantLock();
~~~



![image-20230704201116935](./跟随狂神学Java-29.assets/image-20230704201116935.png)

**公平锁：**很公平，得先来后到，不能插队

**不公平锁：**十分不公平，可以插队（默认）

~~~java
package com.joker_yue;

//基本的卖票例子

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/*
 * 真正的多线程开发，公司中的开发
 * 线程  就是一个单独的资源类，没有任何附属的操作
 * */
public class Test02 {
    public static void main(String[] args) {
        //并发：多个线程操作同一个资源类，把资源丢入线程
        Ticket ticket = new Ticket();

        //@FunctionInterface 函数式接口
        new Thread(() -> {for (int i = 0; i < 40; i++)ticket.sale();}, "A").start();
        new Thread(() -> {for (int i = 0; i < 40; i++)ticket.sale();}, "B").start();
        new Thread(() -> {for (int i = 0; i < 40; i++)ticket.sale();}, "C").start();

}}

//Lock三部曲
//1，new ReentrantLock();        创建锁
//2，lock.lock();                加锁
//3，finally=>lock.unlock();     解锁

class Ticket2 {
    //属性+方法
    private int number = 30;

    Lock lock = new ReentrantLock();

    //卖票的方式
    public synchronized void sale() {
        lock.lock();//加锁
        try {
            //业务代码
            if (number > 0) {
                System.out.println(Thread.currentThread().getName() + "卖出了第" + (number--) + "张票" + "，剩余" + number);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            lock.unlock();//解锁
        }
    }

}
~~~

---

##### Synchronized和Lock的关系

1. Synchronized是内置的关键字，而Lock是Java类

2. Synchronized无法判断锁的状态，而Lock可以判断是否获取到了锁

3. Synchronized会自动释放锁，Lock必须要手动释放锁，如果不释放锁，会**死锁**

4. Synchronized线程1（获得锁，阻塞）、线程2（等待）。Lock锁不一定会等待下去

   ~~~java
   //尝试获取锁
   lock.tryLock();
   ~~~

   

5. Synchronized可重入锁，不可以中断的，非公平的；Lock可重入锁，可以判断是否中断，可以自己设置公平

6. Synchronized适合锁少量的代码同步问题，Lock适合锁大量的同步代码

---

##### 锁是什么？ 如何判断锁谁?

锁是保证资源按照人们想要的方式方法进行共享

~~~java
package com.joker_yue.pc;

/*线程之间的通信问题
 * 线程交替执行 A B 操作同一个变量 要使最终num=0
 * A num+1
 * B num-1
 * 通知 等待唤醒
 *  */

public class A {
    public static void main(String[] args) {
        Data data = new Data();
        new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                try {
                    data.increment();
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        }, "A").start();
        new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                try {
                    data.decrement();
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        }, "B").start();
    }
}


//判断等待，业务，通知
class Data {//数字类
    private int number = 0;

    //+1
    public synchronized void increment() throws InterruptedException {
        while (number != 0) {//while自旋锁
            //等待
            this.wait();
        }
        number++;
        System.out.println(Thread.currentThread().getName() + "=>" + number);
        //通知其他线程+1已经完成
        this.notifyAll();
    }

    public synchronized void decrement() throws InterruptedException {
        while (number == 0) {//while自旋锁
            //等待
            this.wait();
        }
        number--;
        System.out.println(Thread.currentThread().getName() + "=>" + number);
        //通知其他线程-1已经完成
        this.notifyAll();
    }
}
~~~

问题存在:如果有更多线程，运行期间可能会出现2，3等数字。是因为我们判断时只用了if判断，if判断只会判断一次，会产生虚假唤醒问题。所以需要使用while判断

![image-20230704205442426](./跟随狂神学Java-29.assets/image-20230704205442426.png)

虚假唤醒就是当一个条件满足时，很多线程都被唤醒了，但是只有其中部分是有用的唤醒，其它的唤醒都是无用功
