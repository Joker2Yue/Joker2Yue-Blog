---
title: 跟随狂神学Java-01，Markdown语法学习
date: 2022/6/12 13:12:05
tags: 
  - Java
  - 狂神
  - Markdown
  - 必看	
categories:
  - [跟随狂神学Java]
cover: /images/coverImg/JavaSE/markdown.jpg
keywords:
	- Markdown
katex: true
mathjax: true
highlight_shrink: flase
ai: 
  - 本文介绍了学习Markdown的基础知识，以跟随狂神学Java的第一天为例，包括标题、文本样式、列表、代码、表格、分隔线、超链接、插入图片等内容的使用方法。文章以示例和简明的语法说明为主，旨在帮助初学者快速入门Markdown，并提供了学习的好方法，包括使用Typora编辑器和参考Markdown学习网站。通过本文，读者可以轻松了解Markdown的基本语法和应用。
  - 本文介绍了Markdown的基础知识，包括标题、文本样式、列表、代码、表格、分隔线、超链接、插入图片等内容的使用方法，旨在帮助初学者快速入门Markdown。文章还提供了学习的好方法，如使用Typora编辑器和参考Markdown学习网站。通过本文，读者可以轻松了解Markdown的基本语法和应用。
  - 这篇文章是跟随狂神学Java系列的第一天，重点介绍了Markdown的基础知识。它包括如何创建不同级别的标题、文本样式如加粗、斜体、删除线，以及如何创建有序和无序列表。此外，文章还讲解了如何插入代码块、表格、分隔线以及超链接和图片。最后，文章提供了学习Markdown的实用方法，以帮助读者更轻松地掌握这一标记语言的基础知识。
---
# 跟随狂神学Java

##### 第一天：Markdown

>磨刀不误砍柴功


---

## 学习内容：

### 标题

生成标题可以通过在行前添加不同数量的`#`号来生成。

```markdown
# 我是一级标题
```

# 我是一级标题

```markdown
## 我是二级标题
```

## 我是二级标题

```markdown
### 我是三级标题
```

### 我是三级标题

```markdown
#### 我是四级标题
```

#### 我是四级标题

```markdown
##### 我是五级标题
```

##### 我是五级标题

```markdown
###### 我是六级标题
```

###### 我是六级标题



注意：最大支持六级标题，字号从一级标题到六级标题依次减少。在最后一个`#`号后要与文字有空格。


---

## 文本样式

~~~markdown
*强调文本*   or  _强调文本_
~~~

*强调文本*   or  _强调文本_

~~~markdown
**加粗**  or  __加粗__
~~~

**加粗**  or  __加粗__

~~~markdown
==标记文本==
~~~

==标记文本==

~~~markdown
~~删除文本~~
~~~

~~删除文本~~

~~~markdown
>引用文本
~~~

>引用文本

~~~markdown
引用文本的嵌套
>文本1
>>文本2
~~~

>文本1
>
>>文本2


~~~markdown
下标文本   H~2~O
~~~

H~2~O

~~~markdown
上标文本  2^2^
~~~

2^2^


---

## 列表

~~~markdown
- 项目
  * 项目
    + 项目
    
可以用-+*来进行标记项目，显示出来都是无序的列表（以 · 作标记）

1. 项目1
2. 项目2
3. 项目3
	1. 项目一
	4. 项目二
	9. 项目三

可以用数字进行项目标记，数字不必按数学顺序排列，但是列表应当以数字 1 起始。

- [ ] 计划任务
- [x] 完成任务
~~~

- 项目
	* 项目
		+ 项目

1. 项目1
2. 项目2
3. 项目3

	1. 项目一
	2. 项目二
	3. 项目三

- [ ] 计划任务
- [x] 完成任务

---

## 代码

~~~markdown
`键盘`
~~~

`键盘`

~~~markdown
代码块1

```
public class HelloWorld{
   public static void main(String[] args){
      System.out.println("Hello World!");
   }
}
```
~~~

```markdown
public class HelloWorld{
   public static void main(String[] args){
      System.out.println("Hello World!");
   }
}
```

~~~markdown
代码块2:JavaScript风格

```javascript
public class HelloWorld{
   public static void main(String[] args){
      System.out.println("Hello World!");
   }
}
```
~~~

```java
public class HelloWorld{
   public static void main(String[] args){
      System.out.println("Hello World!");
   }
}
```

---

## 表格

~~~markdown
| 项目 | Value |
| ---- | ----- |
| 电脑 | $1600 |
| 手机 | $12   |
| 导管 | $1    |
~~~

| 项目 | Value |
| ---- | ----- |
| 电脑 | $1600 |
| 手机 | $12   |
| 导管 | $1    |

~~~markdown
| Column 1 | Column 2      |
|:--------:| -------------:|
| 左右都加了:号 文本居中 | 只有右边加了:号 文本居右 |
~~~

|        Column 1        |                 Column 2 |
| :--------------------: | -----------------------: |
| 左右都加了:号 文本居中 | 只有右边加了:号 文本居右 |

---

## 分隔线

~~~markdown
---	英文状态下的连词符号
***	星号
___	英文状态下的下划线

都是三个符号组成一条下划线（不展示）
~~~

---

## 超链接

~~~markdown
[Markdown学习](https://markdown.com.cn/basic-syntax/)
注意，方括号和圆括号之间是没有空格的
~~~

[Markdown学习](https://markdown.com.cn/basic-syntax/)

~~~markdown
带有鼠标悬停字的超链接
[Markdown学习](https://markdown.com.cn/basic-syntax/ "快来点我快来点我")
试试把鼠标悬停在下方链接
~~~

[Markdown学习](https://markdown.com.cn/basic-syntax/ "快来点我快来点我")

~~~markdown
直接可以点的网址和邮箱
用方括号括起来了
<https://markdown.com.cn/basic-syntax/>
~~~

<https://markdown.com.cn/basic-syntax/>

---

## 学习的好方法

1. 用起来(Typora)
2. [Markdown学习网站](https://markdown.com.cn/basic-syntax/ "快来点我快来点我")
3. CSDN网页端攥写博客时可以同步学习，边学边用！