---
title: Hexo建站指南-1，基本概念与建站思路
date: 2023/9/10 22:16:05
tags: 
  - 技术
  - Hexo
  - 前端
categories:
  - [经验分享, Hexo, 前端]
cover: /images/coverImg/Hexo_Build.png
keywords:
  - Hexo
ai: 
  - 本文介绍Hexo博客框架和建站思路。Hexo是一个快速、简洁的静态网站生成器，具备出色性能和低服务器要求。
  - 本文详细介绍Hexo博客框架，它是一个用Node.js编写的静态网站生成器，将Markdown转为HTML，拥有速度快、低服务器要求等优势。此外，文章提供了Hexo与其他博客框架的比较，以及多种部署方式。
  - Hexo建站指南，探讨了Hexo博客框架和建站思路。Hexo是一款基于Node.js的静态网站生成器，能高效地将Markdown转换为HTML，生成快速加载的静态网页，降低服务器负担。文章还强调了Hexo的速度、低服务器要求、简单部署、Markdown支持、主题和插件丰富等优势，并提供了与其他博客框架的比较，以及多种部署选项的链接，帮助读者选择适合自己需求的建站方式。
---
# Hexo建站指南

**步骤一：基本概念与建站思路**

> "硬件使机器快速。软件使快速的机器变慢。"
>
> [安知鱼主题官方文档 ](https://docs.anheyu.com/)
>
> [Hexo-Theme-Acrylic](https://next-docs.acrylic.org.cn/)
>
> [Hexo](https://hexo.io/zh-cn/)
>
> [文档 | Hexo](https://hexo.io/zh-cn/docs/)



### Hexo

----

#### 什么是Hexo

[Hexo](https://hexo.io/zh-cn/)是一个快速、简洁且高效的博客框架，是一个开源的静态网站生成器，它使用Node.js编写，旨在帮助用户轻松创建和管理静态网站或博客。Hexo的主要目标是将[Markdown](http://daringfireball.net/projects/markdown/)（或其他标记语言）文件转换为HTML，并生成整个网站的静态文件，这使得网站可以更快地加载和部署，同时降低了服务器的负担。

----

#### Hexo的优势

Hexo作为一个静态网站生成器具有许多优点，适用于不同类型的项目和需求。以下是Hexo的一些主要优点：

1. **速度和性能优越**：Hexo生成的网站是纯静态的，因此在访问时非常快速。它不需要动态数据库查询或服务器端处理，提供出色的性能。

2. **低服务器要求**：由于Hexo生成的是静态文件，它对服务器资源的要求相对较低。这意味着您可以使用廉价的托管方案来部署您的Hexo网站。

3. **简化部署**：Hexo可以轻松部署到各种托管平台，如GitHub Pages、Netlify、Vercel等。这使得部署过程非常简单，无需复杂的服务器配置。

4. **Markdown支持**：Hexo使用Markdown格式来编写内容，这是一种简单且易于学习的标记语言，使得写作和编辑变得轻松。

5. **丰富的主题和插件**：Hexo有一个活跃的社区，提供了各种主题和插件，可以根据需要自定义和扩展网站的外观和功能。

6. **自动生成目录和索引**：Hexo可以自动为文章生成目录和索引，提高了网站的导航性和可读性。

7. **版本控制**：Hexo的内容可以与版本控制系统（如Git）集成，使得管理和追踪变更非常方便。

8. **安全性**：由于Hexo生成的是静态文件，它对于一些常见的Web攻击，如SQL注入和跨站点脚本攻击，具有天然的防护。

9. **多语言支持**：Hexo支持多种语言和区域的本地化，使您的网站可以用多种语言提供。

10. **开源和活跃的社区**：Hexo是开源的，拥有一个活跃的社区，用户可以获得帮助、文档和更新的支持。

下面是Hexo与其他常见博客框架的比较总结：

| 框架      | 语言       | 主题和插件     | 部署选项                              | 部署难度 | 类型         |
| --------- | ---------- | -------------- | ------------------------------------- | -------- | ------------ |
| Hexo      | Node.js    | 丰富的社区     | 多种选项（GitHub Pages/个人服务器等） | 适中     | 静态生成器   |
| Jekyll    | Ruby       | 丰富           | 多种选项（GitHub Pages/个人服务器等） | 低       | 静态生成器   |
| Gatsby    | JavaScript | 强大的插件系统 | 多种选项（GitHub Pages/个人服务器等） | 中高     | 静态生成器   |
| WordPress | PHP        | 丰富的生态系统 | 自托管或托管服务（个人服务器等）      | 低       | 动态博客平台 |
| Hugo      | Go         | 多种主题和模板 | 多种选项（GitHub Pages/个人服务器等） | 低       | 静态生成器   |
| Ghost     | JavaScript | 有限的生态系统 | 自托管或托管服务（个人服务器等）      | 低       | 动态博客平台 |





### 建站思路

---

我这里使用Hexo作为博客框架，Anzhiyu作为博客主题，Github Pages作为网页托管平台。

其实除了Github Pages，还有以下部署方式：

* [Hexo 部署到 Gitee_hexo gitee_前端开心果的博客-CSDN博客](https://blog.csdn.net/qq_38157825/article/details/112783631)
* [将hexo静态博客部署到阿里云OSS上-阿里云开发者社区 (aliyun.com)](https://developer.aliyun.com/article/653541)
* [将hexo个人博客部署到个人云服务器--最详细踩坑教程 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/120743882)
* [如何使用 vercel + hexo 搭建博客 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/342790013)
* [部署 | Hexo](https://hexo.io/zh-cn/docs/one-command-deployment)

部署Hexo按照个人需求来选择



