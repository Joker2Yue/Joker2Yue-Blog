---
title: 跟随狂神学Java-27，网络编程
date: 2023/05/08 04:02:22
tags:
  - 狂神
  - Java
  - JavaSE
  - 必看
categories:
  - [跟随狂神学Java]
cover: /images/coverImg/JavaSE/14.jpg
keywords:
  - 网络编程
  - 计算机网络
  - 定位网络通信
  - 网络通信要素
  - IP地址和InetAddress
  - 端口和Port
  - 通信协议
  - TCP协议
  - 文件上传
  - Tomcat服务器
  - UDP协议
  - UDP聊天实现
  - 在线咨询
  - 发送方和接收方
  - URL
ai:
  - 这份笔记总结了跟随狂神学Java网络编程的第27天学习内容。主要包括计算机网络基础知识，如IP地址和端口，以及通信协议TCP和UDP的详细解释。在TCP方面，学习了文件上传和Tomcat服务器的应用。另外，还涵盖了UDP协议，实现了UDP聊天功能，支持双向信息传输。最后，笔记提及了URL的用途，用于资源定位和在线咨询。这些知识对于理解和应用Java网络编程非常有帮助。
  - 这份笔记总结了第27天的Java网络编程学习内容，包括计算机网络基础、TCP和UDP通信协议，文件上传，Tomcat服务器，以及UDP聊天功能。此外，还介绍了如何使用URL进行资源定位和在线咨询。这些知识为Java网络编程提供了坚实的基础。
  - 这份笔记总结了第27天的Java网络编程学习，包括计算机网络、TCP和UDP通信、文件上传、Tomcat服务器、UDP聊天，以及URL资源定位和在线咨询。这些知识对Java网络开发至关重要。
---
# 跟随狂神学Java

##### 第二十七天：网络编程

> 计算机科学就是有关计算机的，正如天文学就是有关望远镜的。
>
> [【狂神说Java】网络编程详解_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1LJ411z7vY/?spm_id_from=333.999.0.0)

## 学习内容

#### 计算机网络

![image-20230425095028724](./跟随狂神学Java-27.assets/image-20230425095028724.png)

计算机网络是指将地理位置不同的具有独立功能的多台让过及其外部设备 ， 通过通信线路连接起来在网络操作系统， 网络管理软件及网络通信协议的管理和协调下 ， 实现源共皇和信息传递的计算机系统 。

---

##### 如何定位

1. 如何精确定位到网络上的一台主机：192.168.16.124。端口：定位到这个计算机上的某个资源

2. 找到了这个主机，如何传输数据？

   JavaWeb开发：网页编程  B/S

   网络编程：TCP/IP  C/S



#### 网络通信的要素

---

如何实现网络的通信？

通信双方的地址

* IP
* 端口号

**规则：网络通信的协议**

http，ftp，https，tcp等

**TCP/IP参考模型**

![image-20230425165849128](./跟随狂神学Java-27.assets/image-20230425165849128.png)



---

##### IP地址InetAddress

* 唯一定位一台网络上计算机
* 127.0.0.1    也叫本机localhost
* IP地址的分类：
  * IPV4/IPV6，区别是字节长度
  * 公网/私网
* 域名：记忆IP问题
* 类：`Class InetAddress`此类没有构造器

~~~java
package com.joker_yue.javalearn.NetLearn;

import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.UnknownHostException;

//测试IP
public class InetAddressTest {
    public static void main(String[] args) {
        try {
            //查询本地地址
            InetAddress InetAddress1 = Inet4Address.getByName("127.0.0.1");
            System.out.println(InetAddress1);
            InetAddress InetAddress3 = Inet4Address.getByName("localhost");
            System.out.println(InetAddress3);
            InetAddress InetAddress4 = Inet4Address.getLocalHost();
            System.out.println(InetAddress4);


            //获取网站IP地址
            InetAddress InetAddress2 = Inet4Address.getByName("www.baidu.com");
            System.out.println(InetAddress2);


            //常用的方法
            System.out.println(InetAddress2.getAddress());
            System.out.println(InetAddress2.getCanonicalHostName());//规范的名字
            System.out.println(InetAddress2.getHostAddress());//IP
            System.out.println(InetAddress2.getHostName());//域名，或者自己电脑的名

        } catch (UnknownHostException e) {
            throw new RuntimeException(e);
        }
    }
}
~~~



---

##### 端口Port

端口表示计算机上的一个程序的进程：

* 不同的进程有不同的端口号！用来区分软件的

* 被规定0~65355

* 因为有TCP/UDP端口之分，所以可用端口为65355*2

* 端口分类

  * 共有端口0~1023

    * HTTP使用80端口
    * HTTPS使用43端口
    * FTP使用21
    * Telent使用23

  * 程序注册端口：1024~49151，分配给用户或程序

    * Tomcat：8080
    * MySQL：3306
    * Oracle：1521

  * 动态、私有端口49352~65535

    

    ~~~bash
    netstat -ano #查看所有端口
    netstat -ano|findstr "5900" #查看指定的端口
    tasklist|findstr "8696" #查看指定端口的进程
    ~~~

~~~java
package com.joker_yue.javalearn.NetLearn;

import java.net.InetAddress;
import java.net.InetSocketAddress;

public class TestInetSocketAddress {
    public static void main(String[] args) {
        InetSocketAddress socketAddress = new InetSocketAddress("127.0.0.1", 8080);
        InetSocketAddress socketAddress2 = new InetSocketAddress("localhost", 8080);
        System.out.println(socketAddress);
        System.out.println(socketAddress2);

        System.out.println(socketAddress.getAddress());
        System.out.println(socketAddress.getHostName());
        System.out.println(socketAddress.getPort() );
    }
}
~~~



---

##### 通信协议

协议：约定，就好比我们现在说的是普通话。

网络通信协议：速率，传输码率，代码结构，传输控制...

问题：非常的复杂？

大事化小：分层！

**TCP/IP协议簇**：实际上是一组协议

* TCP：用户传输协议
* UDP：用户数据报协议
* 出名的协议：TCP/IP。IP：网络互联协议

**TCP UDP对比**

* TCP：打电话

  * 连接：稳定

  * 三次握手，四次挥手

  * 客户端、服务端

  * 传输完成就会释放连接，效率低

    ~~~txt
    A:你瞅啥
    B:瞅你咋地
    A:干一架？
    
    A:我要走了
    B:你真的要走了吗
    A:我真的要走了
    B:你真的要走了
    ~~~

    

* UDP：发短信

  * 不连接，不稳定
  * 客户端、服务端没有明确的界限
  * 不管有没有准备好，都可以发给你
  * DDOS：洪水攻击（饱和攻击），就是给端口发送一大堆无用数据包，造成端口堵塞

  

![image-20230425213722444](./跟随狂神学Java-27.assets/image-20230425213722444.png)





#### TCP

---

**客户端**

1. 连接服务器Socket
2. 发送消息

~~~java
package com.joker_yue.javalearn.NetLearn;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;

//客户端
public class TCPClientDemo01 {
    public static void main(String[] args) {
        Socket socket = null;
        OutputStream os = null;
        try {
            //1.要知道服务器的地址
            InetAddress severIP = InetAddress.getByName("127.0.0.1");
            //端口号
            int port = 9999;
            //2.创建一个socket连接
            socket = new Socket(severIP, port);
            //3.发送消息 IO流
            os = socket.getOutputStream();
            os.write("你好！".getBytes());

        } catch (UnknownHostException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            if (os != null) {
                try {
                    os.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            if (socket != null) {
                try {
                    socket.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }
}
~~~

**服务端**

1. 建立服务端口serverSocket
2. 等待用户的连接 accept
3. 接收用户的消息

~~~java
package com.joker_yue.javalearn.NetLearn;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;

//服务端
public class TCPServerDemo01 {
    public static void main(String[] args) {
        ServerSocket serverSocket = null;
        Socket socket = null;
        InputStream is = null;
        ByteArrayOutputStream baos = null;
        try {
            //1.我得有一个地址
            serverSocket = new ServerSocket(9999);
            //2.等待客户端连接
            socket = serverSocket.accept();  //监听
            //读取客户端的消息
            is = socket.getInputStream();


            /*
            //比较low
            //缺点：如果传输过来太长，那就会导致乱码
            byte[] buffer = new byte[1024];
            int len;
            while((len = is.read(buffer))!=-1){
                String msg = new String (buffer,0,len);
                System.out.println(msg);
            }
            */
            //管道流，用来对接客户端和服务端的数据处理
            baos = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int len;
            while ((len = is.read(buffer)) != -1) {
                baos.write(buffer, 0, len);
            }

            System.out.println(baos.toString());


        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            //关闭流
            if (baos != null) {

                try {
                    baos.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            if (is != null) {
                try {
                    is.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            if (socket != null) {
                try {
                    socket.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            if (serverSocket != null) {
                try {
                    serverSocket.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

        }
    }
}
~~~





#### 文件上传

----

客户端

 ~~~java
 package com.joker_yue.javalearn.NetLearn;
 
 import java.io.*;
 import java.net.InetAddress;
 import java.net.Socket;
 import java.net.UnknownHostException;
 
 public class TCPClientDemo02 {
     public static void main(String[] args) throws IOException {
         //1.创建一个Socket连接
         Socket socket = new Socket(InetAddress.getByName("127.0.0.1"), 9000);
         //2.创建一个输出流
         OutputStream os = socket.getOutputStream();
 
         //3.文件流
         FileInputStream fis = new FileInputStream(new File("log.txt"));
         //4.写出文件
         byte[] buffer = new byte[1024];
         int len;
         while ((len = fis.read()) != -1) {
              os.write(buffer,0,len);
         }
 
         //通知服务器，我已经结束了
         socket.shutdownOutput();//传输完毕
 
         //确定服务器接收完毕，才能够断开连接
         InputStream is = socket.getInputStream();
         //String byte[]
         ByteArrayOutputStream baos = new ByteArrayOutputStream();
 
         byte[]  buffer2 = new byte[1024];
         int len2;
         while((len2= is.read(buffer2))!=-1){
             baos.write(buffer2,0,len2);
         }
         System.out.println(baos.toString());
 
         //5.关闭资源
         baos.close();
         fis.close();
         os.close();
         socket.close();
     }
 }
 
 ~~~

服务端

~~~java
package com.joker_yue.javalearn.NetLearn;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

public class TCPServerDemo02 {
    public static void main(String[] args) throws IOException {
        //1.创建服务
        ServerSocket serverSocket = new ServerSocket(9000);
        //2.监听客户端的连接
        Socket socket = serverSocket.accept();//阻塞式监听，会一直等待客户端连接，与Scanner差不多
        //3.获取输入流
        InputStream is = socket.getInputStream();
        //4.文件输出
        FileOutputStream fos = new FileOutputStream(new File("receive"));
        byte[] buffer = new byte[1024];
        int len ;
        while((len= is.read(buffer))!=-1){
             fos.write(buffer,0,len);
        }

        //通知客户端接收完毕
        OutputStream os = socket.getOutputStream();
        os.write("我接受完毕，可以断开".getBytes());

        //关闭资源

        fos.close();
        is.close();
        socket.close();
        serverSocket.close();
    }
}

~~~

 

---

##### Tomcat

服务端

* 自定义S
* Tomcat服务器S：JAVA后台开发是用别人的服务器

客户端

* 自定义C
* 浏览器B





#### UDP

---

发短信：不用连接，需要知道对方的地址

发送消息

~~~java
package com.joker_yue.javalearn.NetLearn;

import java.io.IOException;
import java.net.*;

//不需要连接服务器
public class UDPClientDemo01 {
    public static void main(String[] args) throws IOException {
        //1.建立一个Socket
        DatagramSocket socket = new DatagramSocket();
        //2.建个包
        String msg = "你好，服务器！";
        //发给谁
        InetAddress localhost = InetAddress.getByName("localhost");
        int port = 9090;
        //参数解释： 数据，数据长度起始，发送给谁
        DatagramPacket datagramPacket = new DatagramPacket(msg.getBytes(),0,msg.getBytes().length,localhost,port);
        //3.发送包
        socket.send(datagramPacket);
        //4.关闭流
        socket.close();
    }
}
~~~

接收后端

~~~java
package com.joker_yue.javalearn.NetLearn;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.SocketException;

//其实还是要等待客户端连接
public class UDPServerDemo01 {
    public static void main(String[] args) throws IOException {
        //开放端口
        DatagramSocket socket = new DatagramSocket(9090);
        //接收数据包
        byte[] buffer = new byte[1024];
        DatagramPacket packet = new DatagramPacket(buffer, 0, buffer.length);//接收

        socket.receive(packet);

        System.out.println(packet.getAddress().getHostAddress());
        System.out.println(new String(packet.getData(),0, packet.getLength()));

        //关闭连接
        socket.close();

    }
}
~~~



---

##### UDP聊天实现

发送端

~~~java
package com.joker_yue.javalearn.NetLearn;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetSocketAddress;
import java.net.SocketException;

public class UDPSender {
    public static void main(String[] args) throws IOException {
        DatagramSocket socket = new DatagramSocket(8888);

        //准备数据：控制台读取System.in
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));

        while (true) {
            String data = reader.readLine();
            byte[] datas = data.getBytes();
            DatagramPacket packet = new DatagramPacket(datas, 0, datas.length, new InetSocketAddress("localhost", 6666));
            socket.send(packet);
            if (data.equals("bye")) {
                break;
            }
        }
        socket.close();
    }
}
~~~

接收端

~~~java
package com.joker_yue.javalearn.NetLearn;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.SocketException;

public class UDPReceiver {
    public static void main(String[] args) throws Exception {
        DatagramSocket socket = new DatagramSocket(6666);

        while (true) {

            //准备接收包裹
            byte[] container = new byte[1024];
            DatagramPacket packet = new DatagramPacket(container, 0, container.length);
            socket.receive(packet);//阻塞式接收包裹

            //断开连接 bye
            byte[] data = packet.getData();
            String receiverData = new String(data, 0, packet.getLength());// 读取的长度应该是数据包长度，而不是缓冲区长度
            System.out.println(receiverData);

            if (receiverData.equals("bye")) {
                break;
            }

        }
        socket.close();
    }
}
~~~



---

##### 在线咨询：两个人都可以是发送方，也可以是接收方

 

**写好接收端和发送端先**

发送端

~~~java
package com.joker_yue.javalearn.NetLearn;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetSocketAddress;
import java.net.SocketException;

public class TalkSender implements Runnable {

    DatagramSocket socket = null;
    BufferedReader reader = null;

    private int fromPort;
    private String toIP;
    private int toPort;

    public TalkSender(int fromPort, String toIP, int toPort) {
        this.fromPort = fromPort;
        this.toIP = toIP;
        this.toPort = toPort;


        //初始化类肯定要放在构造器中
        try {
            socket = new DatagramSocket(fromPort);
            reader = new BufferedReader(new InputStreamReader(System.in));
        } catch (SocketException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public void run() {

        //准备数据：控制台读取System.in

        while (true) {
            try {
                String data = reader.readLine();
                byte[] datas = data.getBytes();
                DatagramPacket packet = new DatagramPacket(datas, 0, datas.length, new InetSocketAddress(this.toIP, this.toPort));

                socket.send(packet);
                if (data.equals("bye")) {
                    break;
                }
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

        }
        socket.close();
    }
}
~~~

接收端

~~~java
package com.joker_yue.javalearn.NetLearn;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.SocketException;

public class TalkReceiver implements Runnable {
    DatagramSocket socket = null;

    private int port;
    private String msgFrom;

    public TalkReceiver(int port,String msgFrom) {
        this.port = port;
        this.msgFrom = msgFrom;
        try {
            socket = new DatagramSocket(port);
        } catch (SocketException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void run() {

        while (true) {

            try {
                //准备接收包裹
                byte[] container = new byte[1024];
                DatagramPacket packet = new DatagramPacket(container, 0, container.length);
                socket.receive(packet);//阻塞式接收包裹

                //断开连接 bye
                byte[] data = packet.getData();
                String receiverData = new String(data, 0, packet.getLength());// 读取的长度应该是数据包长度，而不是缓冲区长度
                System.out.println(msgFrom+"："+receiverData);

                if (receiverData.equals("bye")) {
                    break;
                }
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

        }
        socket.close();
    }
}

~~~

**创建两个身份**

学生

~~~java
package com.joker_yue.javalearn.NetLearn;

public class TalkStudents {
    public static void main(String[] args) {
        //开启两个线程
        new Thread(new TalkSender(7777,"localhost",9999)).start();
        new Thread(new TalkReceiver(8888,"老师")).start();

    }
}

~~~

老师

~~~java
package com.joker_yue.javalearn.NetLearn;

public class TalkTeacher {
    public static void main(String[] args) {
        //发送端口是随意的，但是两个人的接收端口是最重要的
        new Thread(new TalkSender(5555,"localhost",8888)).start();
        new Thread(new TalkReceiver(9999,"学生")).start();

    }
}
~~~



#### URL

---

URL：统一资源定位符，用来定位资源的，定位互联网上的某一个资源

DNS域名解析：将www.baidu.com 解释为IP

~~~
协议：//IP地址：端口/项目名/资源
~~~

~~~java
package com.joker_yue.javalearn.NetLearn;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class URLDownload {
    public static void main(String[] args) throws Exception {
        //1. 下载地址
        URL url = new URL("http://localhost:8080/Joker/Unknown.txt");

        //2.连接到资源 HTTP
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();

        InputStream is = urlConnection.getInputStream();

        FileOutputStream fos = new FileOutputStream("Unknown.txt");

        byte[] buffer = new byte[1024];

        int len ;
        while ((len=is.read(buffer))!=-1){
            fos.write(buffer,0, len);//写出这个数据
        }

        fos.close();
        is.close();
         urlConnection.disconnect();//断开

    }
}
~~~

