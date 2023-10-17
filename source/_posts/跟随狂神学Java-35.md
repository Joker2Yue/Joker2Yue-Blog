---
title: 跟随狂神学Java-35，大前端
date: 2023/08/02 04:02:22
tags:
  - Java
  - 狂神
  - 前端
  - 必看
categories:
  - [跟随狂神学Java]
  - [必看]
  - [技术]
  - [Java]
cover: https://resource.joker2yue.cn/blog/images/coverImg/Vue/01.jpg
keywords:
  - 大前端
  - Node.js
  - ES6
  - NPM包管理器
  - Babel
  - 模块化
  - Webpack
  - 前端框架
ai:
  - 这篇文章介绍了大前端、Node.js、ES6、NPM包管理器、Babel、模块化、Webpack等主题。
  - 本文涵盖了大前端开发的多个方面，包括Node.js的基本介绍、ES6语法特性、NPM包管理器的使用、Babel的作用、模块化编程以及Webpack的配置和打包过程。
  - 这篇文章详细讲解了大前端开发所需的关键技术，包括使用Node.js构建服务器，掌握ES6语法的let、const、模板字符串等特性，利用NPM包管理器管理依赖，使用Babel进行代码转换，实现模块化编程，以及通过Webpack进行打包和资源管理。
---
# 跟随狂神学Java

**第三十五：大前端**

> "程序是为了让人类读懂，而剛好可以执行" 
>
> [大前端_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1BU4y147pS/?p=2&spm_id_from=pageDriver&vd_source=814489e71df641c4b2c0ff7d4659b2d0)



#### Nodejs

---

##### 什么是Nodejs

* 一个基于Chrome V8引擎的JavaScript运行时
* ![image-20230801171401308](./跟随狂神学Java-35.assets/image-20230801171401308.png)

---

##### Nodejs入门

~~~js
/*
 * @Author: Joker_Yue,Joker_Yue@qq.com
 * @Date: 2023-08-01 17:22:02
 * @LastEditors: Joker_Yue
 * @LastEditTime: 2023-08-01 17:32:17
 * @FilePath: \Nodejs\.vscode\httpserver.js
 * @Description: 入门
 */

// 导包使用required，这里类似于import java.io
const http = require("http");

// 1. 创建一个Http服务
http.createServer(function(requset,response){
    // 浏览器怎么认识"hello server"的
    response.writeHead(200,{'Content-Type': 'text/plain'}); // 这句话的意思是，告诉浏览器以text-plain的方式（文本）解析这段内容
    // 给浏览器输出内容
    response.end("hello server!!!")
}).listen(8888);
// 2. 监听一个端口 这里以8888为例
console.log("你启动的服务是:http://localhost:8888")
// 3. 启动运行服务，node httpserver.js
// 4. 在浏览器访问http://localhost:8888

~~~

在终端中运行

~~~shell
node httpserver
~~~

即可启动服务



---

##### Nodejs连接数据库

在控制台中输入

~~~shell
npm install mysql
~~~

即可导入mysql的依赖

~~~js
/*
 * @Author: Joker_Yue,Joker_Yue@qq.com
 * @Date: 2023-08-01 17:37:52
 * @LastEditors: Joker_Yue
 * @LastEditTime: 2023-08-01 17:50:01
 * @FilePath: \Nodejs\.vscode\db.js
 * @Description:
 */

// 1.导入依赖包
var mysql = require("mysql");

// 2.创建一个mysql的Connection对象
var connection=mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 3306,
  database: "school",
  ssl:true,
  timezone:"Asia/Shanghai"
});
// 3.配置数据库连接的信息
// 4.开启连接
connection.query("select * from student",function(error,results,fields){
     // 如果有错误,直接抛出
     if(error) throw error;
     // 查询成功
     console.log("result: " + results);

})
// 5.执行CURD
// 6.关闭
connection.end();

// 最后一步,运行node.db.js查看运行效果

~~~





#### ES6

---

##### 什么是ES6

[ECMAScript](https://baike.baidu.com/item/ECMAScript/1889420?fromModule=lemma_inlink) 6（简称ES6）是于2015年6月正式发布的[JavaScript](https://baike.baidu.com/item/JavaScript/321142?fromModule=lemma_inlink)语言的标准，正式名为ECMAScript 2015（ES2015）。它的目标是使得JavaScript语言可以用来编写复杂的大型应用程序，成为企业级开发语言

[ ES6 教程 | 菜鸟教程 (runoob.com)](https://www.runoob.com/w3cnote/es6-tutorial.html)

---

##### let和const

ES2015(ES6) 新增加了两个重要的 JavaScript 关键字: **let** 和 **const**。

let 声明的变量只在 let 命令所在的代码块内有效。

const 声明一个只读的常量，一旦声明，常量的值就不能改变。



###### let 命令

**基本用法**

~~~js
{
  let a = 0;
  a   // 0
}
a   // 报错 ReferenceError: a is not defined
~~~



**代码块内有效**

let 是在代码块内有效，var 是在全局范围内有效:

~~~js
{
  let a = 0;
  var b = 1;
}
a  // ReferenceError: a is not defined
b  // 1
~~~



**不能重复声明**

let 只能声明一次，var 可以声明多次:

~~~js
let a = 1;
let a = 2;
var b = 3;
var b = 4;
a  // Identifier 'a' has already been declared
b  // 4
~~~

for 循环计数器很适合用 let

~~~js
for (var i = 0; i < 10; i++) {
  setTimeout(function(){
    console.log(i);
  })
}
// 输出十个 10
for (let j = 0; j < 10; j++) {
  setTimeout(function(){
    console.log(j);
  })
}
// 输出 0123456789
~~~

变量 i 是用 var 声明的，在全局范围内有效，所以全局中只有一个变量 i, 每次循环时，setTimeout 定时器里面的 i 指的是全局变量 i ，而循环里的十个 setTimeout 是在循环结束后才执行，所以此时的 i 都是 10。

变量 j 是用 let 声明的，当前的 j 只在本轮循环中有效，每次循环的 j 其实都是一个新的变量，所以 setTimeout 定时器里面的 j 其实是不同的变量，即最后输出 12345。（若每次循环的变量 j 都是重新声明的，如何知道前一个循环的值？这是因为 JavaScript 引擎内部会记住前一个循环的值）。



**不存在变量提升**

let 不存在变量提升，var 会变量提升:

~~~js
console.log(a);  //ReferenceError: a is not defined
let a = "apple";
 
console.log(b);  //undefined
var b = "banana";
~~~

变量 b 用 var 声明存在变量提升，所以当脚本开始运行的时候，b 已经存在了，但是还没有赋值，所以会输出 undefined。

变量 a 用 let 声明不存在变量提升，在声明变量 a 之前，a 不存在，所以会报错。

------

###### const 命令

const 声明一个只读变量，声明之后不允许改变。意味着，一旦声明必须初始化，否则会报错。

**基本用法**

~~~js
const PI = "3.1415926";
PI  // 3.1415926

const MY_AGE;  // SyntaxError: Missing initializer in const declaration
~~~

**暂时性死区**

~~~js
var PI = "a";
if(true){
  console.log(PI);  // Cannot access 'PI' before initialization
  const PI = "3.1415926";
}
~~~

ES6 明确规定，代码块内如果存在 let 或者 const，代码块会对这些命令声明的变量从块的开始就形成一个封闭作用域。代码块内，在声明变量 PI 之前使用它会报错。

---

###### 注意要点

const 如何做到变量在声明初始化之后不允许改变的？其实 const 其实保证的不是变量的值不变，而是保证变量指向的内存地址所保存的数据不允许改动。此时，你可能已经想到，简单类型和复合类型保存值的方式是不同的。是的，对于简单类型（数值 number、字符串 string 、布尔值 boolean）,值就保存在变量指向的那个内存地址，因此 const 声明的简单类型变量等同于常量。而复杂类型（对象 object，数组 array，函数 function），变量指向的内存地址其实是保存了一个指向实际数据的指针，所以 const 只能保证指针是固定的，至于指针指向的数据结构变不变就无法控制了，所以使用 const 声明复杂类型对象时要慎重。



---

##### 模板字符串

~~~html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>字符串模板</title>
</head>

<body>
    <script>
        // 字符串会牵涉到动态部分
        var person = {
            name: "Joker",
            age: "19",
            sex: "男"
        };

        let say = "我是" + person.name + ",年龄" + person.age + ",性别" + person.sex;
        console.log(say);

        // ES6的语法模板字符串
        let say2 = `我是${person.name}，年龄${person.age}，性别${person.sex}`;
        console.log(say2);

    </script>
</body>

</html>
~~~





---

##### 默认参数

~~~~html
<!--
 * @Author: Joker_Yue,Joker_Yue@qq.com
 * @Date: 2023-08-01 20:09:57
 * @LastEditors: Joker_Yue
 * @LastEditTime: 2023-08-01 20:10:17
 * @FilePath: \ES6\04-默认参数.html
-->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>字符串模板</title>
</head>

<body>
    <script>
        // 函数默认参数
        function sum(a = 100, b = 100) {
            return a + b;
        }

        // var result = sum(100, 100);
        var result = sum();
        console.log(result);
    </script>

</body>

</html>  
~~~~





---

##### 箭头传参

~~~html
<!--
 * @Author: Joker_Yue,Joker_Yue@qq.com
 * @Date: 2023-08-01 20:09:57
 * @LastEditors: Joker_Yue
 * @LastEditTime: 2023-08-01 20:13:40
 * @FilePath: \ES6\05-箭头函数.html
-->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>字符串模板</title>
</head>

<body>
    <script>
        // 重点：在未来的项目开发中，比如小程序，uniapp，一些常用的脚手架里大量使用
        var sum = function (a, b) {
            return a + b;
        }

        // 改进1
        var sum2 = (a, b) => {
            return a + b;
        }

        // 改进2
        var sum3 = (a, b) => a + b;

        // 规律
        // 1. 去掉function
        // 2. 括号后面加箭头
        // 3. 逻辑代码中如果只有return，可以直接将箭头指向return的返回
        // 4. 如果传参只有一个，你可以把括号也去掉

        var arr = [1, 2, 3, 4, 5, 6];
        var newarr = arr.map(function (obj) {
            return obj * 2;
        })

        // 改进3
        var newarr2 = arr.map(obj => obj82);
    </script>

</body>

</html>
~~~





---

##### 对象简写

~~~html
<!--
 * @Author: Joker_Yue,Joker_Yue@qq.com
 * @Date: 2023-08-01 20:23:37
 * @LastEditors: Joker_Yue
 * @LastEditTime: 2023-08-01 20:30:20
 * @FilePath: \ES6\6-对象初始化简写.html
 * @Description: 
-->

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>字符串模板</title>
</head>

<body>
    <script>
        // 原始方法
        var obj = {
            name: "joker",
            age: 19,
            sex: "男",
            hobby: "女",
            go:function(){
                console.log("hello");
            }
        }

        
        // ES6简写
        // 因为对象是键值对存在
        // 1. 如果key和value的变量的名字一致，可以不需要写key:value，直接写key
        // 2. 如果value是一个函数，直接去掉function，只留下()

        var name = "joker";
        var age = 19;
        var me ={
            name,
            age,
            go(){
                console.log("hello");
            }

        }

    </script>

</body>

</html>
~~~



---

##### 对象解构

~~~js
<!--
 * @Author: Joker_Yue,Joker_Yue@qq.com
 * @Date: 2023-08-01 20:31:27
 * @LastEditors: Joker_Yue
 * @LastEditTime: 2023-08-01 20:35:52
 * @FilePath: \ES6\07-对象解构.html
 * @Description: 
-->

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>字符串模板</title>
</head>

<body>
    <script>

        var obj = {
            name: "joker",
            age: 19,
            sex: "男",
            hobby: "女",
            go: function () {
                console.log("hello");
            }
        }
        var name = "joker";
        var age = 19;
        var me = {
            name,
            age,
            go() {
                console.log("hello");
            }
        }



        // 获取对象的方式有两种，
        //1. 通过.
        console.log(obj.name);
        obj.go();
        //2. 通过[]
        console.log(me["name"]);
        me["go"]();

        // es6对象解构 就是快速获取属性和方法的一种形式
        var { name, age } = obj;
        // 它相当于下面代码
        var name = obj.name;
        var age = obj.age;

        // 函数也可以解构
        var {go} = obj;
        go();


    </script>

</body>

</html>
~~~



---

##### 传播操作符

~~~html
<!--
 * @Author: Joker_Yue,Joker_Yue@qq.com
 * @Date: 2023-08-01 20:39:39
 * @LastEditors: Joker_Yue
 * @LastEditTime: 2023-08-01 20:39:45
 * @FilePath: \ES6\08-对象传播操作符.html
 * @Description: 
-->

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>字符串模板</title>
</head>

<body>
    <script>

        // 对象传播操作符
        // ...
        var obj = {
            name: "joker",
            age: 19,
            sex: "男",
            hobby: "女",
            phone: 1234567,
            go: function () {
                console.log("hello");
            }
        }

        // 解构出来
        var {name,age,...person} = obj;
        console.log(name);
        console.log(age);
        console.log(person);

        // 如果你已经将一个对象中的属性解构出来，那么剩下的元素将会通过传播操作符传递到该对象中




    </script>

</body>

</html>
~~~

输出：
~~~html
joker
08-对象传播操作符.html:37
19
08-对象传播操作符.html:38
{sex: '男', hobby: '女', phone: 1234567, go: ƒ}
~~~



---

##### 数组map和reduce方法的使用

map()可以将原数组中所有元素按顺序取出

reduce()

~~~html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>字符串模板</title>
</head>

<body>
    <script>
        var arr = [1,2,3,4,5,6,7,8,9,10];
        // reduce 可以按照function中的方法来改变数组中的元素
        // 这里的方法是：每次从arr中取两个元素，相加并返回
        var arr2 = arr.reduce(function(a,b){
            return a + b;
        })

        console.log(arr2);

    </script>

</body>

</html>
~~~





#### NPM包管理器

----

命令

* 配置

  ~~~shell
  # 查看 npm 的版本 
  $ npm -v  //6.4.0 << 安装成功会返回版本号
  
  # 查看各个命令的简单用法
  $ npm -l 
   
  # 查看 npm 命令列表
  $ npm help
  
  # 查看 npm 的配置
  $ npm config list -l
  ~~~

* init 创建模块

  ~~~shell
  $ npm init
  ~~~

  `npm init`用来初始化生成一个新的`package.json`文件。它会向用户提问一系列问题，如果觉得不用修改默认配置，一路回车就可以了。

  尾缀带`-f`（代表force）、`-y`（代表yes），则跳过提问阶段，直接生成一个新的`package.json`文件，不带尾缀的话，默认有提问阶段。

* npm set 设置环境变量

  ~~~shell
  $ npm set init-author-name 'my name jerry'
  $ set init-author-email '12345@qq.com'
  $ set init-author-url 'http://yourdomain.com'
  $ npm set init-license 'MIT'
  执行了以上的修改，此时 Package.json并没有发生变化
  
  //设置后执行init才是真正修改成功
  $ npm init
  ~~~

* npm search 搜索模块

  ~~~shell
  $ npm search <搜索词> [-g]
  ~~~

  `npm search`命令用于搜索npm仓库，它后面可以跟字符串，也可以跟正则表达式

* npm list 查看模块

  ~~~shell
  #当前项目安装的所有模块
  $npm list
  
  #列出全局安装的模块 带上[--depth 0] 不深入到包的支点 更简洁
  $ npm list -g --depth 0
  ~~~

* npm install 安装模块

  ~~~shell
  # 读取package.json里面的配置单安装  
  $ npm install 
  //可简写成 npm i
  
  # 默认安装指定模块的最新(@latest)版本
  $ npm install [<@scope>/]<name> 
  //eg:npm install gulp
  
  # 安装指定模块的指定版本
  $ npm install [<@scope>/]<name>@<version>
  //eg: npm install gulp@3.9.1
  
  # 安装指定指定版本范围内的模块
  $ npm install [<@scope>/]<name>@<version range>
  //eg: npm install vue@">=1.0.28 < 2.0.0"
  
  # 安装指定模块的指定标签 默认值为(@latest)
  $ npm install [<@scope>/]<name>@<tag>
  //eg:npm install sax@0.1.1
  
  # 通过Github代码库地址安装
  $ npm install <tarball url>
  //eg:npm install git://github.com/package/path.git
  ~~~

* npm uninstall 卸载模块

  ~~~shell
  #卸载当前项目或全局模块 
  $ npm uninstall <name> [-g] 
  
  eg: npm uninstall gulp --save-dev  
      npm i gulp -g
  
  卸载后，你可以到 /node\_modules/ 目录下查看包是否还存在，或者使用以下命令查看：
  npm ls 查看安装的模块
  ~~~

* npm update 更新模块

  ~~~shell
  #升级当前项目或全局的指定模块
  $ npm update <name> [-g] 
  //eg: npm update express 
        npm update express -g
  ~~~

* npm link 引用模块

  ~~~shell
  # 引用依赖 有些包是全局安装了，在项目里面只需要引用即可。
  $ npm link [<@scope>/]<pkg>[@<version>]
  //eg: 引用   npm link gulp gulp-ssh gulp-ftp
  //eg: 解除引用 npm unlink gulp
  
  # 引用模块 本人用得少没深入说了 用得上时可去翻文档例子
  $ npm link (in package dir)
  ~~~

* npm run 执行脚本

  * package.json的scripts字段，可以用于指定脚本命令，供npm直接调用。npm run会创建一个Shell，执行指定的命令。

  * 两个命令简写，start和test属于特殊命令，可以省略run,其余的都得带上run。
  * npm run的参数。
    * 如果不加任何参数，直接运行，会列出package.json里面所有可以执行的脚本命令

* npm publish 发布模块

  ~~~shell
  # 未注册 申请注册一个用户 直接在https://www.npmjs.com/注册一样
  $ npm adduser
  //执行后 填写几个问题 Username、Password、Email
  
  #已注册
  $ npm login 
  
  #发布
  $ npm publish
  ~~~

来自[整理总结：npm常用命令与操作篇 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/122224879)





#### Babel

---

##### 什么是Babel

ES6的某些高级语法在浏览器环境甚至是Nodejs中无法执行

Babel是一个广泛使用的转码器，可以将es6代码转换为es5，从而在现有的环境中执行

---

##### 安装Babel

~~~shell
npm install -g babel-cli

# 查看是否成功安装
babel --version
~~~





#### 模块化

---

##### CommonJs规范

导出

~~~js
/*
 * @Author: Joker_Yue,Joker_Yue@qq.com
 * @Date: 2023-08-02 13:02:49
 * @LastEditors: Joker_Yue
 * @LastEditTime: 2023-08-02 13:02:55
 * @FilePath: \CommonJs\module\common.js
 * @Description: 
 */

const sum = function(a,b){
    return a+b;
}

const sub = function(a,b){
    return a-b;
}
const mul = function(a,b){
    return a*b;
}
const di = function(a,b){
    return a/b;
}

// 导出给别人用
module.exports = {
    sum,
    sub,
    mul,
    di
}
~~~

导入

~~~js
/*
 * @Author: Joker_Yue,Joker_Yue@qq.com
 * @Date: 2023-08-02 13:05:03
 * @LastEditors: Joker_Yue
 * @LastEditTime: 2023-08-02 13:05:04
 * @FilePath: \CommonJs\module\import.js
 * @Description:
 */

// 使用require导入
const m = require("./common.js");

console.log(m.sum(10, 20));

~~~



---

##### ES6规范

导出

~~~js
export function getList() {
    // 在真实业务中，异步获取数据
    console.log("获取数据列表");
}
export function save() {
    console.log("保存数据");
}

~~~

~~~js
export defalut{
    getList(){
    console.log("获取数据列表");
    },

    save(){
    console.log("保存数据");
    }
}
~~~



导入

~~~js
import {getList,save} from './userApi.js';
save();
~~~

~~~js
import user from './userApi.js'
user.getList()
~~~





#### WebPack

---

是一个前端资源加载/打包工具，可以根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源

![image-20230802131905783](./跟随狂神学Java-35.assets/image-20230802131905783.png)



---

##### 安装

~~~shell
npm isntall -g webpack webpack-cli
~~~

~~~shell
 webpack -v
~~~

~~~shell
npm isntall -save-dev style-loader css-loader
~~~



---

##### 初始化项目

1. 创建webpack文件夹

   ~~~shell 
   npm init -y
   ~~~

2. 创建src文件夹

3. src下创建common.js

   ~~~js
   exports.info = function (str){
       document.write(str);
   }
   ~~~

4. src下创建utils.js

   ~~~js
   exports.add= function(a,b){
       return a+b;
   }
   ~~~

5. src下创建main.js

   ~~~js
   /*
    * @Author: Joker_Yue,Joker_Yue@qq.com
    * @Date: 2023-08-02 13:25:18
    * @LastEditors: Joker_Yue
    * @LastEditTime: 2023-08-02 13:26:26
    * @FilePath: \webpack\src\main.js
    * @Description: 
    */
   const common = require('./common.js');
   const utils = require('./utils');
   
   common.info('Hello world'+utils.add(100,200));
   ~~~

---

##### 项目打包

1. 在根目录下定义webpack.config.js文件配置打包的规则

   ~~~js
   /*
    * @Author: Joker_Yue,Joker_Yue@qq.com
    * @Date: 2023-08-02 13:29:37
    * @LastEditors: Joker_Yue
    * @LastEditTime: 2023-08-02 13:29:43
    * @FilePath: \webpack\webpack.config.js
    * @Description: 
    */
   // 导入path模块
   const path = require('path');
   
   // 定义JS的打包规则
   module.exports = {
       // 入口函数从哪里开始进行编译打包
       entry:"./src/main.js",
       //编译成功后把内容输出到哪里
       output:{
           // 定义输出的目录 __dirname为常量，当前目录的根目录。产生一个dist文件夹
           path:path.resolve(__dirname,"./dist"),
           // 生成bundle.js
           filename:"bundle.js"
       }
   }
   ~~~

   

2. 执行webpck查看效果

