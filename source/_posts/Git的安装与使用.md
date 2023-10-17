---
title: Git的安装与使用
date: 2023/7/13 20:46:25
tags: 
  - 技术
  - Git
  - Github
  - 分布式
  - 必看
categories:
  - [经验分享]
  - [技术]
  - [必看]
keywords:
  - Git
  - Git安装
  - Git使用
  - 淘宝镜像
  - 配置选项
  - 环境变量
  - 全局设置
  - Git命令
  - 常见问题
  - Github连接
  - 拉取版本
  - Idea集成
cover: https://resource.joker2yue.cn/blog/images/coverImg/Git的安装与使用.jpg
ai:
  - 本文详细介绍了Git的安装和使用过程。在安装部分，包括从淘宝镜像下载Git并进行安装的步骤，以及配置安装选项和环境变量。在使用部分，介绍了Git的启动方式和全局设置，还提供了一些有用的Git命令和常见问题的解决方法，如加速Github连接和限制拉取历史版本。文章还涉及了在Idea中集成Git的设置。这篇文章为初学者提供了Git的全面指南。
  - 本文详细介绍了Git的安装和使用过程，包括从淘宝镜像下载Git、配置安装选项和环境变量。在使用部分，介绍了Git的启动方式和全局设置，还提供了一些有用的Git命令和常见问题的解决方法。文章还提到了如何在Idea中集成Git。这篇文章为初学者提供了Git的全面指南，帮助他们更好地掌握这一强大的版本控制工具。
  - 本文详细介绍了Git的安装和使用，包括从淘宝镜像下载Git、配置安装选项和环境变量。在使用部分，介绍了Git的启动方式和全局设置，还提供了一些Git命令和解决常见问题的方法。文章适合初学者，是Git的全面指南。
---

# Git的安装与使用



#### 安装

---

##### 下载

由于国内下载速度慢，推荐使用淘宝镜像

* git官网[Git (git-scm.com)](https://git-scm.com/)
* 淘宝镜像[CNPM Binaries Mirror (npmmirror.com)](https://registry.npmmirror.com/binary.html?path=git-for-windows/)

---

##### 安装

1. 选择安装路径

   * 这里选择`D:\Git`

   <img src="./00Git的安装与使用.assets/image-20230804202657563.png" alt="image-20230804202657563" style="zoom: 50%;" />

2. 勾选选择项

   * 在这里你可以选择是否创建桌面图标（选项1），是否添加右键菜单（选项2），是否添加大文件支持（选项3）
   * 你可以选择默认文件设置（选项4，5）
   * 你可以选择是否自动检测Git的更新（选项6）

   * 你可以将Git的Bash路径添加到windows终端（选项7），安装后效果如图
   * 你可以选择是否安装Scalar（用于管理大型存储库的 Git 插件）（选项8）

   <img src="./00Git的安装与使用.assets/image-20230804213253292.png" alt="image-20230804213253292" style="zoom:50%;" />

   

   <img src="./00Git的安装与使用.assets/image-20230804212753355.png" alt="image-20230804212753355" style="zoom: 33%;" />

3. 选择Git文件默认编辑器

   * 这里选择VS Code

   <img src="./00Git的安装与使用.assets/image-20230804202919255.png" alt="image-20230804202919255" style="zoom:50%;" />

4. 设置新储存库的初始分支的默认名称

   * 你可以选择修改，否则默认分支名称为'master'

   <img src="./00Git的安装与使用.assets/image-20230804203456843.png" alt="image-20230804203456843" style="zoom:50%;" />

5. 环境变量安装

   * 选项1，不安装Git环境变量（安全）

   * 选项2，仅安装Git Bash环境变量（推荐）

   * 选项3，安装全部工具的环境变量，可能与windows一些命令冲突（危险）

   <img src="./00Git的安装与使用.assets/image-20230804204114379.png" alt="image-20230804204114379" style="zoom:50%;" />

6. 选择SSL通道

   * 选项1，使用OpenSSL库（推荐）

   * 选项2，使用Windows本地安全通道库

   <img src="./00Git的安装与使用.assets/image-20230804204450465.png" alt="image-20230804204450465" style="zoom:50%;" />

7. 选择换行风格

   * 选项1，转换签出提交。

     签出文本文件时以 Windows 风格(CRLF)行结尾，提交时以 Unix 风格(LF)行结尾（windows推荐设置）

   * 选项2，原样签出转换提交。

     签出文本文件时不修改行结尾，提交时以 Unix 风格(LF)行结尾（Unix推荐设置）

   * 选项3，原样签出提交。

     签出文件或提交时均不转换行结尾（不推荐）

   <img src="./00Git的安装与使用.assets/image-20230804204538622.png" alt="image-20230804204538622" style="zoom:50%;" />

8. 配置终端模拟器

   * 选项1，使用MinTTY（Linux风格，推荐）

   * 选项2，使用Windows自带终端

   <img src="./00Git的安装与使用.assets/image-20230804210058632.png" alt="image-20230804210058632" style="zoom:50%;" />

9. 选择`git pull`默认行为

   * 选项1，默认（快进或合并）。

     这是 "git pull" 的标准行为：在可能的情况下将 当前分支 快进到 获取的分支，否则创建合并提交。

     也就是`git pull = git fetch + git merge`

   * 选项2，变基。

     变基将当前分支变基到获取的分支上。如果没有本地提交要变基，则等同于快进。

     也就是`git pull = git fetch + git rebase`

   * 选项3，仅快进。

     快进到获取的分支。如果不能，则失败

     也就是`git pull = git fetch`

   <img src="./00Git的安装与使用.assets/image-20230804211028841.png" alt="image-20230804211028841" style="zoom:50%;" />

10. 选择凭证

    * 选项1，Git凭证管理
    * 选项2，不使用凭证管理

    <img src="./00Git的安装与使用.assets/image-20230804211151841.png" alt="image-20230804211151841" style="zoom:50%;" />

11. 配置额外功能

    * 选项1，启用文件系统缓存

      可以显著提高性能

    * 选项2，启用符号链接

      即`mklink`。将符号链接添加到仓库可以方便地管理项目中的共享文件或模块

      几乎没有风险，对于现有的储存库无效

    <img src="./00Git的安装与使用.assets/image-20230804211713565.png" alt="image-20230804211713565" style="zoom:50%;" />

12. 配置实验性功能

    * 选项1，启用对虚拟控制台的实验性支持

      在不使用 winpty 的情况下在 Git Bash 窗口中运行诸如 Node 或 Python 之类的本机控制台程序， 但存在许多bug

    * 选项2，启用实验性内置文件系统监视器

      自动运行内置文件系统监视器，以加快包含许多文件的工作树中的 常见操作，例如 'git status'、'git add'、'git commit' 等.

    <img src="./00Git的安装与使用.assets/image-20230804212001149.png" alt="image-20230804212001149" style="zoom:50%;" />





#### 使用

---

##### 安装完成

安装完成后系统会多出三个菜单项

<img src="./00Git的安装与使用.assets/image-20230804212146745.png" alt="image-20230804212146745" style="zoom:50%;" />

同时环境变量会被自动配置

<img src="./00Git的安装与使用.assets/image-20230804212241959.png" alt="image-20230804212241959" style="zoom:50%;" />

右键菜单也会多了选项

<img src="./00Git的安装与使用.assets/image-20230804212438230.png" alt="image-20230804212438230" style="zoom:50%;" />

---

##### 启动Git

系统菜单中

* Git Bash：Unix与Linux风格的命令行，使用最多，最推荐
* Git CMD：Windows风格的命令行
* Git GUI：图形化界面的Git，不建议初学者使用



---

##### 配置Git全局设置

安装后应当要首先设置全局用户名和e-mail地址，这是很重要的，因为每次Git提交都会默认使用该信息，它将会永远嵌入你的提交中

你可以像这样设置：

~~~bash
git config --global user.name "JokerYue"
git config --global user.email "Joker_Yue@qq.com"
~~~

设置完成后，使用如下命令查看不同级别的配置文件

~~~bash
# 查看系统config
git config --system --list
# 查看当前用户(global)配置
git config --global --list
~~~

<img src="./00Git的安装与使用.assets/image-20230805173535795.png" alt="image-20230805173535795" style="zoom:50%;" />

如果你希望在一个特定的项目中使用不同的名称或 emai 地址，你可以在该项目中运行该命令而不要`--global`选项。总之加了`--global`为全局配置，不加为某个项目的特定配置。

---

##### Git相关的配置文件

1. Git \etc\gitgonfig

   Git安装目录下的gitconfig

   `--system`系统级

2. C:\Users\Administrator\.gitconfig

   只适用于当前Windows当前登录用户的配置

   `--global`全局级

你可以直接在上述两个目录中找到对应的配置文件，通过命令修改将会影响到对应文件

----

##### Git命令学习

[Git 大全 - Gitee.com](https://gitee.com/all-about-git)

[Learn Git Branching (gitee.io)](https://oschina.gitee.io/learn-git-branching/)

---

##### idea集成git

在Idea中，你可以设置Git的一些配置，这里是一个文件状态颜色设置的示例

<img src="./00Git的安装与使用.assets/image-20230806191320099.png" alt="image-20230806191320099" style="zoom:50%;" />







#### 常见问题解决

---

##### Github连接慢

1. 查看Clash动态端口是否开启，如果开启，请关闭。

2. 记住端口号，如下

   <img src="./00Git的安装与使用.assets/image-20230812162330159.png" alt="image-20230812162330159" style="zoom:50%;" />

3. git设置代理

   用git内置代理，直接走系统中运行的代理工具中转，比如，你的 SS 本地端口是 1080，那么可以如下方式走代理：

   ```bash
   git config --global http.proxy socks5://127.0.0.1:1080
   git config --global https.proxy socks5://127.0.0.1:1080
   ```

4. 也可以停走代理：

   ```bash
   git config --global http.proxy ""
   git config --global https.proxy ""
   ```

---

##### 每次拉取都拉下来一大堆文件，如何只拉取最近的一次版本

如果觉得仓库太大，可以在git clone中加入参数 –depth=1，只拉取最近的一个 revision：

```bash
git clone --depth=1 https://XXX
```

如果后面想看历史的版本，使用 git fetch 即可：

```bash
git fetch --unshallow
```