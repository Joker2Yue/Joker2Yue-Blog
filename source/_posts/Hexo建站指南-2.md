---
title: Hexo建站指南-2，Hexo的基本使用
date: 2023/9/11 22:16:05
tags: 
  - 技术
  - Hexo
  - 前端
categories:
  - [经验分享]
  - [Hexo]
  - [前端]
cover: https://resource.joker2yue.cn/blog/images/coverImg/Hexo_Build.png
keywords:
  - Hexo
ai: 
  - 本篇文章是Hexo建站指南的第二部分，介绍了Hexo的基本使用，包括初始化项目、目录结构、安装主题和使用主题等。
---
# Hexo建站指南

**步骤二：Hexo的基本使用**

> "硬件使机器快速。软件使快速的机器变慢。"
>
> [安知鱼主题官方文档 ](https://docs.anheyu.com/)
>
> [Hexo-Theme-Acrylic](https://next-docs.acrylic.org.cn/)
>
> [Hexo](https://hexo.io/zh-cn/)
>
> [文档 | Hexo](https://hexo.io/zh-cn/docs/)



### 初始化项目

----

#### 你需要准备

* nodejs（可以去我的博客看nodejs的安装教程）
* IDE：这里推荐使用VS Code或者Webstorm



---

#### 安装Hexo脚手架

<img src="./Hexo建站指南-2.assets/image-20230909100730865.png" alt="image-20230909100730865" style="zoom:50%;" />

看到最中间那个最显眼的`npm install hexo-cli -g`吗，将它复制到cmd中运行，运行结束为下图所示：

<img src="./Hexo建站指南-2.assets/image-20230909101000074.png" alt="image-20230909101000074" style="zoom:33%;" />

至此Hexo脚手架安装完成

----

#### 初始化项目

在你想要创建项目的位置打开cmd，输入以下命令：

```bash
hexo init [你的项目工程文件夹]
```

即可开始初始化项目

<img src="./Hexo建站指南-2.assets/image-20230909101219981.png" alt="image-20230909101219981" style="zoom: 33%;" />

初始化完毕将会看到如下信息：

<img src="./Hexo建站指南-2.assets/image-20230909101317612.png" alt="image-20230909101317612" style="zoom:33%;" />

同时，此处将会出现你的项目目录：

<img src="./Hexo建站指南-2.assets/image-20230909101428788.png" alt="image-20230909101428788" style="zoom:33%;" />





### 目录结构

----

#### 基本目录结构

使用WebStrom打开你创建的工程，你会看到如下目录：

![image-20230909102133172](./Hexo建站指南-2.assets/image-20230909102133172.png)

使用`hexo g`编译命令，将会把所有的资源进行打包发布，生成的文件将会存放在`public`文件夹下

![image-20230909102438899](./Hexo建站指南-2.assets/image-20230909102438899.png)

使用`hexo d`提交命令，将会把所有已经打包好的资源进行提交，生成的文件将会存放在`.deploy_xxx`下，这个xxx是你填写的提交方式

![image-20230909102913456](./Hexo建站指南-2.assets/image-20230909102913456.png)

----

#### 目录详解

| 文件夹/文件  | 作用                                                 | 内容                                             |
| ------------ | ---------------------------------------------------- | ------------------------------------------------ |
| _config.yml  | 全局配置文件，定义Hexo网站的属性和选项               | 网站标题、描述、作者信息、URL等配置选项          |
| source       | 存放网站的源文件，如文章、页面、图片等               | Markdown格式的文章和页面文件，资源文件           |
| themes       | 存放Hexo网站的主题                                   | 主题文件夹，包括模板、样式、配置文件等           |
| scaffolds    | 存放预设的模板文件，用于创建新文章或页面时的默认模板 | 文章和页面的默认模板文件                         |
| db.json      | 存放Hexo网站的数据缓存文件                           | 记录文章和页面的元数据信息的JSON数据             |
| node_modules | 存放Node.js模块和依赖                                | Hexo及其插件所需的JavaScript模块                 |
| public       | 存放生成的静态网站文件，Hexo构建后生成的网站内容     | HTML页面、样式表、JavaScript文件、图片等静态资源 |
| package.json | Node.js项目的配置文件，记录项目依赖和构建脚本        | 项目依赖、脚本命令等信息                         |





### 主题

---

#### 安装主题

1. 安装AnZhiYu主题

   ~~~bash
   git clone -b main https://github.com/anzhiyu-c/hexo-theme-anzhiyu.git themes/anzhiyu
   ~~~



2. 可以看到`/themes/`下已经生成了`anzhiyu`文件夹

   <img src="./Hexo建站指南-2.assets/image-20230909195303318.png" alt="image-20230909195303318" style="zoom:50%;" />

3. 安装pug和stylus渲染插件

   ~~~bash
   npm install hexo-renderer-pug hexo-renderer-stylus --save
   ~~~





---

#### 使用主题

1. 在`_config.yml`中编辑`theme: anzhiyu`，即可切换到Anzhiyu主题

2. 使用`hexo g`编译生成静态文件

3. 使用`hexo s`编译运行

   你可以通过`hexo s -p [端口号]`来指定运行的端口号

   ![image-20230909195632718](./Hexo建站指南-2.assets/image-20230909195632718.png)

4. 浏览器中访问该地址来查看运行情况

   ![image-20230909200324774](./Hexo建站指南-2.assets/image-20230909200324774.png)