---
title: 跟随狂神学Java-43，Nginx
date: 2023/08/27 04:02:22
tags:
  - 狂神
  - Linux
  - 运维
  - 必看
categories:
  - [跟随狂神学Java, 必看, 技术, Java]
cover: /images/coverImg/Linux/nginx.webp
keywords:
  - 运维
  - Nginx
  - 正向代理
  - 反向代理
  - 负载均衡
  - 动静分离
  - 安装Nginx
  - 常用命令
  - 防火墙配置
ai:
  - 本文介绍了关于Nginx的基础知识，包括Nginx的定义、特点和用途，正向代理和反向代理的概念，以及负载均衡、动静分离、安装Nginx、常用命令和防火墙配置等内容。
  - 本文介绍了关于Nginx的基础知识，包括Nginx的定义、特点和用途，正向代理和反向代理的概念，负载均衡和动静分离的作用，以及在Windows和Linux上安装Nginx的步骤和常用命令。
  - 本文介绍了关于Nginx的基本概念、正向代理和反向代理的区别、负载均衡、动静分离，以及如何在Windows和Linux上安装Nginx以及常用命令和防火墙配置。
---
# 跟随狂神学Java

**第四十三：Nginx**

> "硬件使机器快速。软件使快速的机器变慢。"
>
> [【狂神说】Nginx最新教程通俗易懂，40分钟搞定！_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1F5411J7vK/?vd_source=814489e71df641c4b2c0ff7d4659b2d0)
>
> [蚂蚁课堂](http://www.mayikt.com)



#### 初始Nginx

---

##### 什么是Nginx

​	Nginx (engine x) 是一个高性能的HTTP和反向代理web服务器，同时也提供了IMAP/POP3/SMTP服务。Nginx是由伊戈尔·赛索耶夫为俄罗斯访问量第二的Rambler.ru站点（俄文：Рамблер）开发的，第一个公开版本0.1.0发布于2004年10月4日。2011年6月1日，nginx 1.0.4发布。

​	其特点是占有内存少，并发能力强，事实上nginx的并发能力在同类型的网页服务器中表现较好，中国大陆使用nginx网站用户有：百度、京东、新浪、网易、腾讯、淘宝等。在全球活跃的网站中有12.18%的使用比率，大约为2220万个网站。

​	Nginx 是一个安装非常的简单、配置文件非常简洁（还能够支持perl语法）、Bug非常少的服务。Nginx 启动特别容易，并且几乎可以做到7*24不间断运行，即使运行数个月也不需要重新启动。你还能够不间断服务的情况下进行软件版本的升级。

​	Nginx代码完全用C语言从头写成。官方数据测试表明能够支持高达 50,000 个并发连接数的响应。

​	以下是Nginx的一些主要特点和用途：

1. **Web服务器**: Nginx可以作为一个快速、高效的Web服务器，用于提供静态内容（如HTML、CSS、JavaScript文件等）和动态内容（通过与后端应用服务器集成，如PHP、Python、Ruby等）。
2. **反向代理**: Nginx可以作为反向代理服务器，将客户端请求转发给后端服务器。这种配置在负载均衡、缓存、SSL终端等方面非常有用。
3. **负载均衡**: Nginx可以在多个后端服务器之间分发传入的请求，以实现负载均衡。这有助于提高应用的可靠性和性能。
4. **HTTP缓存**: Nginx可以缓存经常访问的静态资源，从而减轻后端服务器的负担，并加快内容的传输速度。
5. **SSL/TLS终端**: Nginx可以用作SSL/TLS终端，处理加密连接以及安全传输。
6. **安全性**: Nginx具有许多安全功能，如限制连接速率、防止DDoS攻击等。
7. **高并发支持**: Nginx的事件驱动架构允许它在高并发情况下有效地处理大量连接，而不会占用过多的系统资源。
8. **可扩展性**: Nginx支持模块化架构，可以根据需求添加各种功能和扩展。

----

##### Http代理

* **正向代理**

  ​	正向代理（Forward Proxy）是一种代理服务器配置，它代表客户端向目标服务器发送请求。在这种情况下，客户端不直接访问目标服务器，而是通过正向代理服务器来发送请求和接收响应。正向代理通常位于客户端内部，帮助客户端绕过网络限制或者隐藏客户端的真实IP地址。

  ​	以下是一个正向代理的示例情景：

  ​	假设你位于国内，想要访问因特网上的某个被封锁的网站，但由于该网站受到地理或政策限制，无法直接访问。这时，你可以使用一个位于国外的正向代理服务器作为中间人。你的浏览器不直接连接目标网站，而是将请求发送给正向代理服务器，然后由代理服务器代表你请求目标网站的内容。目标网站认为请求来自代理服务器，因此不会直接知道你的真实IP地址和位置，从而绕过了地理限制。

  ​	简而言之，正向代理是代理客户端，帮助客户端访问外部资源，并且隐藏了客户端的身份。

  ​	另一个常见的正向代理的用例是在企业内部网络中，用于监控和管理员工对外部资源的访问，以及提供一些额外的安全控制。

  ​	总结：正向代理充当客户端的代理，帮助客户端访问外部资源，隐藏客户端的身份。

<img src="./跟随狂神学Java-43.assets/kuangstudy46bdad36-d3e0-43b0-a223-43360b7e8fc7-1693054509426-5.png" alt="img" style="zoom: 80%;" />

* **反向代理**

  ​	反向代理（Reverse Proxy）是一种代理服务器配置，它代表服务器接收来自客户端的请求，并将这些请求转发到后端服务器，然后将后端服务器的响应发送回客户端。在这种情况下，客户端不知道请求实际上是由多个服务器处理的，因为它只与反向代理服务器通信。

  ​	以下是一个反向代理的示例情景：

  ​	假设你正在运营一个网站，你有多台服务器用于托管不同类型的内容，如静态文件、动态网页和数据库。为了简化外部访问，你可以设置一个反向代理服务器。当用户访问你的网站时，他们实际上是与反向代理服务器通信。代理服务器会根据请求的类型将请求转发到相应的服务器上进行处理，然后将处理后的响应返回给用户。

  ​	另一个用例是在负载均衡的情况下，反向代理可以将流量分发到多个后端服务器，从而平衡服务器的负载，提高性能和可用性。

  ​	总结：反向代理充当服务器的代理，将客户端的请求转发到后端服务器，隐藏了后端服务器的真实情况。它常用于负载均衡和简化多服务器环境中的外部访问。

  <img src="./跟随狂神学Java-43.assets/kuangstudy62a15097-6e2a-4dbe-bcf5-f0d7cab81089.png" alt="img" style="zoom:80%;" />



---

##### 负载均衡

Nginx提供的负载均衡策略有2种：内置策略和扩展策略。内置策略为轮询，加权轮询，Ip hash。

* 关于Ip Hash

  iphash对客户端请求的ip进行hash操作，然后根据hash结果将同一个客户端ip的请求分发给同一台服务器进行处理，可以解决session不共享的问题。

  ![img](./跟随狂神学Java-43.assets/kuangstudy64acb9a3-cd1a-4c0e-a1fa-9b220046a95a.png)



----

##### 动静分离

​	动静分离，在我们的软件开发中，有些请求是需要后台处理的，有些请求是不需要经过后台处理的（如：css、html、jpg、js等等文件），这些不需要经过后台处理的文件称为静态文件。让动态网站里的动态网页根据一定规则把不变的资源和经常变的资源区分开来，动静资源做好了拆分以后，我们就可以根据静态资源的特点将其做缓存操作。提高资源响应的速度。

![img](./跟随狂神学Java-43.assets/kuangstudyedb1bbd6-e530-4aba-8fde-68658a10e73f-1693116343252-11.png)







#### 安装Nginx

---

##### Windows

1. 去Nginx官网[下载](http://nginx.org/en/download.html)Nginx

2. 打开配置文件(nginx.conf)可以发现默认端口是80端口

   <img src="./跟随狂神学Java-43.assets/image-20230827141247605.png" alt="image-20230827141247605" style="zoom:67%;" />

3. 找到Nginx.exe，双击启动

---

##### Linux

1. 将下载好的tar.gz上传到Linux服务器

2. 使用如下命令解压

   ~~~shell
   [root@Joker-CentOS7 joker]# tar -zxvf nginx-1.24.0.tar.gz 
   ~~~

3. cd进入解压好的文件夹，然后并运行名为 "configure" 的脚本

   ~~~shell
   [root@Joker-CentOS7 joker]# cd nginx-1.24.0
   [root@Joker-CentOS7 nginx-1.24.0]# ./configure
   ~~~

4. 使用`make`编译

   ~~~shell
   [root@Joker-CentOS7 nginx-1.24.0]# make
   ~~~

5. 使用`make install`进行安装

   ~~~shell
   [root@Joker-CentOS7 nginx-1.24.0]# make install
   ~~~

   



#### 常用命令

----

~~~shell
cd /usr/local/nginx/sbin/
./nginx  启动
./nginx -s stop  停止
./nginx -s quit  安全退出
./nginx -s reload  重新加载配置文件
ps aux|grep nginx  查看nginx进程
~~~



#### 防火墙

---

~~~shell
# 开启
service firewalld start
# 重启
service firewalld restart
# 关闭
service firewalld stop
# 查看防火墙规则
firewall-cmd --list-all
# 查询端口是否开放
firewall-cmd --query-port=8080/tcp
# 开放80端口
firewall-cmd --permanent --add-port=80/tcp
# 移除端口
firewall-cmd --permanent --remove-port=8080/tcp
#重启防火墙(修改配置后要重启防火墙)
firewall-cmd --reload
# 参数解释
1、firwall-cmd：是Linux提供的操作firewall的一个工具；
2、--permanent：表示设置为持久；
3、--add-port：标识添加的端口；
~~~



