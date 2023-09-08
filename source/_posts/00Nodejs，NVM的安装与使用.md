---
title: NodeJS，NVM的安装与使用
date: 2023/7/13 20:46:25
tags: 
  - 技术
  - NodeJS
  - 必看
categories:
  - [经验分享]
cover: /images/coverImg/00Nodejs，NVM的安装与使用.jpg
ai: 
  - 这篇文章详细介绍了在Windows系统上安装和配置Node.js、NVM以及相关工具的方法，同时解决了常见问题和注意事项。帮助用户建立Node.js开发环境。
---
# Nodejs，NVM的安装与使用



#### NVM

---

##### 下载

进入官网下载链接[Releases · coreybutler/nvm-windows (github.com)](https://github.com/coreybutler/nvm-windows/releases)，windows系统下载nvm-setup.zip安装包

<img src="./00Nodejs，NVM的安装与使用.assets/image-20230802143622439.png" alt="image-20230802143622439" style="zoom:33%;" />



---

##### 安装

1. 同意协议

   **注意**：如果电脑上之前已经单独安装了node，先卸载，然后双击nvm.exe文件进行安装

   <img src="./00Nodejs，NVM的安装与使用.assets/image-20230802143746592.png" alt="image-20230802143746592" style="zoom: 50%;" />

2. 选择nvm安装路径

   ~~~shell
   D:\NVM
   ~~~

   

   <img src="./00Nodejs，NVM的安装与使用.assets/image-20230802143922086.png" alt="image-20230802143922086" style="zoom:50%;" />

3. 选择node安装路径

   ~~~
   D:\Nodejs
   ~~~

   <img src="./00Nodejs，NVM的安装与使用.assets/image-20230802144038799.png" alt="image-20230802144038799" style="zoom:50%;" />

4. 安装确认

   <img src="./00Nodejs，NVM的安装与使用.assets/image-20230802144101136.png" alt="image-20230802144101136" style="zoom:50%;" />

5. 查看刚安装的nvm目录

   <img src="./00Nodejs，NVM的安装与使用.assets/image-20230802144313929.png" alt="image-20230802144313929" style="zoom:50%;" />

6. 查看版本

   控制台输入

   ~~~shell
   nvm -v
   ~~~

   * 出现这种情况为正常安装

     <img src="./00Nodejs，NVM的安装与使用.assets/image-20230802144519664.png" alt="image-20230802144519664" style="zoom:50%;" />

   * 如果提示找不到路径，需要手动配置环境变量

     <img src="./00Nodejs，NVM的安装与使用.assets/image-20230802144737266.png" alt="image-20230802144737266" style="zoom: 67%;" />



---

##### 配置环境变量

一般安装完成之后，环境变量是默认给配置好的，控制台输入`nvm -v`也能够正常显示版本号。正常的环境变量如下

<img src="./00Nodejs，NVM的安装与使用.assets/image-20230802145150749.png" alt="image-20230802145150749" style="zoom:50%;" />

1. `win + x`或者右键开始菜单，选择【系统】

   <img src="./00Nodejs，NVM的安装与使用.assets/image-20230802145301440.png" alt="image-20230802145301440" style="zoom: 50%;" />

2. 选择【高级系统设置】

   <img src="./00Nodejs，NVM的安装与使用.assets/image-20230802145351245.png" alt="image-20230802145351245" style="zoom: 50%;" />

3. 选择【环境变量】

   <img src="./00Nodejs，NVM的安装与使用.assets/image-20230802145457020.png" alt="image-20230802145457020" style="zoom:50%;" />

4. 选择【新建】

   <img src="./00Nodejs，NVM的安装与使用.assets/image-20230802145541965.png" alt="image-20230802145541965" style="zoom:50%;" />

5. 环境配置如下：

   ~~~shell
   NVM_HOME
   D:\NVM
   ~~~

   ~~~shell
   NVM_SYMLINK
   D:\Nodejs
   ~~~

6. 将其添加到Path中

   <img src="./00Nodejs，NVM的安装与使用.assets/image-20230802145800434.png" alt="image-20230802145800434" style="zoom:50%;" />

   <img src="./00Nodejs，NVM的安装与使用.assets/image-20230802145921296.png" alt="image-20230802145921296" style="zoom:50%;" />

   然后点击【确定】，在控制台中重新输入`nvm -v`查看

   



---

##### 配置镜像

1. 找到nvm的安装路径，打开settings.txt

   <img src="./00Nodejs，NVM的安装与使用.assets/image-20230802150143722.png" alt="image-20230802150143722" style="zoom:67%;" />

2. 添加node_mirro,npm_mirro

   ~~~js
   node_mirror: https://npmmirror.com/mirrors/node/
   npm_mirror: https://npmmirror.com/mirrors/npm/
   ~~~

   在2022年5月31日之前我们会这样配置：

   ~~~js
   node_mirror: https://npm.taobao.org/mirrors/node/
   npm_mirror: https://npm.taobao.org/mirrors/npm/
   ~~~

   但是中国镜像站早就在21年的时候就周知要老 npm.taobao.org 和 registry.npm.taobao.org 域名将于 2022 年 05 月 31 日零时起停止服务。





#### Nodejs

---

##### 安装

nvm安装nodejs的常用命令：

* **1. nvm list - 显示版本列表**

  ```text
  nvm list ：显示已安装的版本（同 nvm list installed
  nvm list installed：显示已安装的版本
  nvm list available：显示所有可以下载的版本
  ```

* **2. nvm install - 安装指定版本nodejs**

  ```text
  nvm install 14.5.0：安装 14.5.0 版本的 node.js
  nvm install latest：安装最新版本
  ```

* **3. nvm use - 使用指定版本node**

  ```text
  nvm use 14.5.0： 切换到 14.5.0 版本的 node.js
  ```

* **4. nvm uninstall - 卸载指定版本 node**

  ```text
  nvm uninstall 14.5.0：卸载到 14.5.0 版本的 node.js
  ```

我们这里以安装14.15.0为例

<img src="./00Nodejs，NVM的安装与使用.assets/image-20230802150917616.png" alt="image-20230802150917616" style="zoom: 50%;" />

然后你会看到NVM的安装目录下多了几个文件夹，用来存放不同的nodejs版本

<img src="./00Nodejs，NVM的安装与使用.assets/image-20230802151027359.png" alt="image-20230802151027359" style="zoom: 33%;" />

---

##### 使用

首次使用nvm时，需要启用nvm，控制台输入`nvm on`

<img src="./00Nodejs，NVM的安装与使用.assets/image-20230802151211986.png" alt="image-20230802151211986" style="zoom: 67%;" />

查看`D:\Nodejs`下是否有对应nodejs的安装文件

<img src="./00Nodejs，NVM的安装与使用.assets/image-20230802151333643.png" alt="image-20230802151333643" style="zoom: 33%;" />

如果没有，请删除`D:\Nodejs`，然后使用管理员权限重新运行一遍`nvm on`

这是因为nvm使用的是硬链接，比如你想使用18.17.0，那么它将会把`D:\18.17.0`链接到`D:Nodejs`下

---

##### 切换版本

你可以使用`nvm use node版本`来进行版本的切换

<img src="./00Nodejs，NVM的安装与使用.assets/image-20230802151710351.png" alt="image-20230802151710351" style="zoom:67%;" />

使用`npm -version`

---

##### 查看版本

你可以使用`node -v`来查看当前使用的nodejs版本

![image-20230802153943846](./00Nodejs，NVM的安装与使用.assets/image-20230802153943846.png)

---

##### 配置环境变量

1. 在安装目录下新建两个文件夹【node_global】和【node_cache】

   <img src="./00Nodejs，NVM的安装与使用.assets/image-20230802152929189.png" alt="image-20230802152929189" style="zoom:50%;" />

2. 控制台输入

   最好使用管理员权限

   ~~~shell
   npm config set prefix "D:\Nodejs\node_global"
   ~~~

   ~~~shell
   npm config set cache "D:\Nodejs\node_cache"
   ~~~

3. 设置环境变量

   ~~~shell
   NODE_PATH
   D:\Nodejs\node_global
   ~~~

   <img src="./00Nodejs，NVM的安装与使用.assets/image-20230803184542618.png" alt="image-20230803184542618" style="zoom: 50%;" />

   记得在Path中也加上

   <img src="./00Nodejs，NVM的安装与使用.assets/image-20230802153312726.png" alt="image-20230802153312726" style="zoom:50%;" />

4. 你可以使用`npm config ls`来查看当前Nodejs的配置情况



---

##### 安装模块

使用`npm install`模块进行安装，这里以安装express模块为例

~~~shell
npm install express -g
~~~

其中`-g`代表全局安装，即安装到`D:\Nodejs\node_global\node_modules`中

<img src="./00Nodejs，NVM的安装与使用.assets/image-20230802154314253.png" alt="image-20230802154314253" style="zoom: 50%;" />

你可以在资源管理器中找到你安装的模块

<img src="./00Nodejs，NVM的安装与使用.assets/image-20230802154348955.png" alt="image-20230802154348955" style="zoom: 33%;" />



---

##### 更换镜像源

有时候模块下不动，那么就该考虑更换镜像源了

常用命令：

1. 查看镜像源

   ~~~shell
   npm get registry
   
   https://registry.npmjs.org/（npm默认镜像源）
   ~~~

2. 修改镜像源`npm config set registry xxx(镜像源地址)`，国内一般使用淘宝镜像源 

   ~~~shell
   npm config set registry https://registry.npm.taobao.org
   ~~~

   



#### 其他

----

##### yarn

* yarn 也是一个软件包管理系统，同样用于管理 用 JavaScript 编写的软件包，yarn 的出现是为了弥补 npm 的一些缺陷。

* 安装

  ~~~shell
  # 1、安装全局yarn（这样任何目录都可以使用yarn）
    npm install -g yarn
  
  # 2、切换到项目目录
    cd ~/path/to/project
  
  # 3、项目使用的版本（berry是项目代号，表示是2.0之后最新版本）
    yarn set version berry
  
  # 4、初始化 yarn
    yarn init
  
  # 5、安装项目所有依赖的js包
    yarn
    # 或
    yarn install
  ~~~

* 更新

  ~~~shell
  yarn set version latest
  ~~~

* yarn的命令

  ~~~shell
  # 查看所有命令
    yarn help
  
  # 初始化，自动创建yarn运行必备文件
    yarn init
  
  # 安装项目依赖的所有js包
    yarn
    # 或
    yarn install
  
  # 安装指定js包
    yarn add [package]
    yarn add [package]@[version]
    yarn add [package]@[tag]
  
  # 更新指定js包
    yarn up [package]
    yarn up [package]@[version]
    yarn up [package]@[tag]
  
  # 删除指定js包
    yarn remove [package]
  ~~~



----

##### cnpm

* cnpm是淘宝团队做的国内镜像，因为npm的服务器位于国外可能会影响安装速度。淘宝镜像与官方同步频率目前为 10分钟 一次以保证尽量与官方服务同步。
* PS.网上有一些贴子说cnpm会丢包，如果遇到丢包，删除node_modules目录，再重新使用npm，总体来说网络上不太建议使用cnpm。

* 官网：[https://developer.aliyun.com/mirror/NPM?from=tnpm](https://link.zhihu.com/?target=https%3A//developer.aliyun.com/mirror/NPM%3Ffrom%3Dtnpm)

* 安装：命令提示符执行
  `npm install cnpm -g --registry=https://registry.npm.taobao.org`

* 查看版本：

  `cnpm -v` 来测试是否成功安装

* 安装完成后可以cnpm通过来代替默认的npm

  ~~~shell
  cnpm install [name]
  ~~~



----

##### nrm

- `nrm`包安装命令： `npm i nrm -g`

- `nrm`能够管理所用可用的镜像源地址以及当前所使用的镜像源地址，但是只是单纯的提供了几个url并能够让我们在这几个地址之间方便切换

- `nrm ls`即nrm list，查看所有可用的镜像，并可以切换。*号表示当前npm使用的地址，可以使用命令`nrm use taobao`或 `nrm use npm`来进行两者之间的切换。

  ~~~shell
  C:\Users\Joker>nrm ls
    npm -------- https://registry.npmjs.org/
    yarn ------- https://registry.yarnpkg.com/
    cnpm ------- http://r.cnpmjs.org/
  * taobao ----- https://registry.npm.taobao.org/
    nj --------- https://registry.nodejitsu.com/
    npmMirror -- https://skimdb.npmjs.com/registry/
    edunpm ----- http://registry.enpmjs.org/
  ~~~



---

##### npm参数-g -S -D

* `-g`：全局安装。 将会安装在 `C:\Users\Administrator\AppData\Roaming\npm`，**并且写入系统环境变量**；非全局安装：将会安装在当前定位目录;全局安装可以通过命令行任何地方调用它，本地安装将安装在定位目录的node_modules文件夹下，通过要求调用;
* `-S`：即`npm install module_name --save`,写入`package.json`的`dependencies` ,`dependencies` 是需要发布到生产环境的，比如jq，vue全家桶，ele-ui等ui框架这些项目运行时必须使用到的插件就需要放到`dependencies`
* `-D`：即`npm install module_name --save-dev`,写入`package.json`的`devDependencies` ,`devDependencies` 里面的插件只用于开发环境，不用于生产环境。比如一些babel编译功能的插件、webpack打包插件就是开发时候的需要，真正程序打包跑起来并不需要的一些插件。





#### 常见问题与注意

---

##### 常见问题

* 使用`nvm use`命令显示切换node版本成功，使用`node -v`命令查看的时候还是原来的版本

  解决方法：删除`D:\Nodejs`，然后`nvm off`，再`nvm on`，再切换版本
  
* 安装了cnpm但是提示`'cnpm' 不是内部或外部命令，也不是可运行的程序或批处理文件。`，或者直接报错

  解决方法1：关闭cmd重新打开，如果问题复现，请检查NODE_PATH的环境变量。

  解决方法2：更换nodejs版本





##### 注意

* 如果切换到从未使用过的nodejs版本，最好进行配置

  * 查看当前Node配置`npm config ls`，检查是否与期望配置一样

  * 否则请修改如下：

    * 将全局目录地址更改`npm config set prefix 目录名`

    * 将全局模块缓存地址更改`npm config set cache 目录名`

    * 修改镜像