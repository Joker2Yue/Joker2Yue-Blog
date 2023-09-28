---
title: 跟随狂神学Java-36，VUE
date: 2023/08/04 04:02:22
tags:
  - Java
  - 狂神
  - 前端
  - 必看
  - Vue
categories:
  - [跟随狂神学Java]
  - [Java]
cover: /images/coverImg/Vue/Vue.jpeg
keywords:
  - VUE
  - 前端
  - JavaScript框架
  - UI框架
  - JavaScript构建工具
  - 主流前端框架
  - 混合开发
  - 微信小程序
  - MVVM
  - Vue基本语法
  - 数据双向绑定
  - Vue组件
  - Axios异步通信
  - 计算属性
  - Slot插槽
  - 自定义事件
  - vue-cli
  - vue-router
  - Vue+ElementUI
ai:
  - 这篇文章介绍了跟随狂神学Java的课程内容，包括VUE、前端复习、JavaScript框架、UI框架、JavaScript构建工具、主流前端框架、混合开发、微信小程序、MVVM等主题。文章涵盖了Vue基本语法、数据双向绑定、Vue组件、Axios异步通信、计算属性、Slot插槽、自定义事件、vue-cli、vue-router、Vue+ElementUI等内容。内容包括各个主题的基本概念、用法以及示例代码。
  - 这篇文章是关于前端开发的学习笔记，包括Vue.js框架、JavaScript构建工具、MVVM架构等多个主题。
  - 这篇文章介绍了跟随狂神学Java，初识VUE，认识VUE，前端复习，JavaScript框架，UI框架，JavaScript构建工具，三段合一，主流前端框架，混合开发，微信小程序，前端为主的MV*时代，MVVM，什么是MVVM，MVVM的组合，为什么要使用MVVM，第一个VUE程序，开发工具，下载地址，代码编写，Vue基本语法，数据双向绑定，Vue组件，Axios异步通信，什么是axios，第一个Axios应用程序，生命周期，计算属性，什么是计算属性，计算属性有什么用，计算属性的使用与对比，Slot插槽，自定义事件，Vue-cli，什么是vue-cli，主要的功能，初始vue-cli，vue-router路由，Vue+ElementUl，安装依赖，简单的登录功能，嵌套路由，什么是嵌套路由，项目需求，代码，参数传递及重定向，404页面和路由钩子，解决#号，404，路由钩子与异步请求等内容。
---
# 跟随狂神学Java

**第三十六：VUE**

> "程序是为了让人类读懂，而剛好可以执行" 
>
> [VUE_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV18E411a7mC?p=1)



#### 初识 VUE

---

##### 认识VUE

SoC：关注点分离原则

HTML+CSS+JS：只关注视图层，给用户看，刷新后台的数据

网络通信：axios

页面跳转：vue-router

状态管理：vuex

VueUI：ICE

---

##### 前端复习

前端三要素：

- HTML：解构层
- CSS：表现层
- JS：行为层



CSS预处理器：

- SASS：基于Ruby，通过服务端处理，功能强大，解析效率高，需要学习Ruby语言，上手难度高于LESS
- LESS：基于NodeJS，通过客户端处理，使用简单，功能比SASS简单，解析效率也低于SASS，但在实际开发中足够，所以我们后台人员如果需要的话，建议使用LESS

---

##### JavaScript框架

- jQuery：简化了DOM的操作。缺点是Dom操作太频繁，影响前端性能。在前端眼里使用它仅仅是为了兼容IE6，7，8
- Angular：Google收购的前端框架，由一群Java程序员开发，其特点是将后台的 MVC 模式搬到了前端并增加了模块化开发的理念，与微软合作，采用TypeScript 语法开发；对后台程序员友好，对前端程序员不太友好；最大的缺点是版本迭代不合理（如：1 代→2 代，除了名字，基本就是两个东西）
- React：Facebook出品，一款高性能的js前端框架，特点是提出了新概念【虚拟 DOM】用于减少真实DOM操作，在内存中模拟DOM操作，有效的提升了前端渲染效率；缺点是使用复杂，因为需要额外学习一门【JSX】语言；
- **VUE**：一款渐进式 JavaScript 框架，所渭渐进式就是逐步实现新特性的意思，如实现模块化开发、路由、状态管理等新特性。其特点是综合了 Angular（模块化）和 React （虚拟DOM ）的优点
- **Axios**：前端通信框架；因为VUE的边界很明确，就是为了处理 DOM，所以并不具备通信能力，此时就需要额外使用一个通信框架与服务器交互；当然也可以直接选择使用 jQuery 提供的AJAX 通信功能。

---

##### UI框架

- Ant-Design：阿里巴巴出品，基于React的UI框架
- ElementUI、iview、ice：饿了么出品，基于VUE的UI框架
- Bootstrap：Twitter推出的一个用于前端开发的开源工具包
- AmazeUI：一款HTML5跨屏前端框架

---

##### JavaScript构建工具

- Babel：JS编译工具，主要用于浏览器不支持ES新特性，比如用于编译TypeScript
- WebPack：模块打包器，主要作用是打包、压缩、合并及按序加载

---

##### 三段合一

- 混合开发（Hybrid App）

  - 主要目的是实现一套代码实现三端统一（PC、Android、IOS）并能够调用到设备底层硬件（如陀螺仪、GPS、摄像头等），打包方式有以下两种
    - 云打包：HBuild->HBuildX，DCloud出品；API Cloud
    - 本地打包：Cordova（前身是PhoneGap）

- 微信小程序

  - 详见微信官网，这里就是介绍一个方便微信小程序UI开发的框架：WeUI

- 后端技术

  NodeJS框架及项目管理工具如下

  - Express：Nodejs框架
  - Koa：Express简化版
  - NPM：项目综合管理工具，类似于Maven
  - YARN：NPM的替代方案，类似于Maven和Gradle的关系

---

##### 主流前端框架

- Vue.js
- iView
- ElementUI
- ICE
- VantUI
- AtUI
- CubeUI

---

##### 混合开发

- Flutter
- Iconic

---

##### 微信小程序

- mpvue
- WeUI

---

##### 前端为主的MV*时代

- MVC同步通信为主：Model、View、Controller
- MVP异步通信为主：Model、View、Presenter
- MVVM异步通信为主：Model、View、ViewModel

为了降低前端开发复杂度，涌现了大量的前端框架，比如：AngularJS、React、Vue.js、EmberJS 等，这些框架总的原则是先按类型分层，比如 Templates 、 Controllers 、 Models, 然后再在层内做切分，如下图：

<img src="./跟随狂神学Java-36.assets/image-20230802175000346.png" alt="image-20230802175000346" style="zoom:50%;" />







#### MVVM

----

##### 什么是MVVM

* MVVM，是Model-View-ViewModel的简写，是M-V-VM三部分组成。它本质上就是MVC 的改进版。MVVM 就是将其中的View 的状态和行为抽象化，其中ViewModel将视图 UI 和业务逻辑分开，它可以取出 Model 的数据同时帮忙处理 View 中由于需要展示内容而涉及的业务逻辑。
* MVVM采用双向数据绑定，view中数据变化将自动反映到viewmodel上，反之，model中数据变化也将会自动展示在页面上。把Model和View关联起来的就是ViewModel。ViewModel负责把Model的数据同步到View显示出来，还负责把View的修改同步回Model。
* MVVM核心思想，是关注model的变化，让MVVM框架利用自己的机制自动更新DOM，也就是所谓的数据-视图分离，数据不会影响视图。

---

##### MVVM的组合

<img src="./跟随狂神学Java-36.assets/image-20230802182151800.png" alt="image-20230802182151800" style="zoom:50%;" />

- Model：模型层，这里表示JavaScript对象

- View：视图层，这里表示DOM（HTML操作的元素）

- ViewModel：连接视图和数据的中间件，Vue.js就是MVVM中的ViewModel层的实现者

  在MVVM架构中，是不允许数据和视图直接通信的，只能通过ViewModel来通信，而ViewMoel就是定义了一个Observer观察者

- ViewModel能够观察到数据的变化，并对视图对应内容进行更新

- ViewModel能够监听到视图的变化，并能够通知数据发生改变

---

##### 为什么要使用MVVM

MVVM和MVC模式一样，主要是分离视图（View）和模型（Model），有几大好处

* 低耦合：视图（View）可以独立于Model层变化和修改，一个ViewModel可以绑定到不同的View上，当View变化的时候Model可以不变，当Model变化的时候View也可以不变
* 可复用：你可以把一些视图逻辑放在一个ViewModel里面，让很多View重用这段视图逻辑
* 独立开发：开发人员可以专注于业务逻辑和数据的开发（ViewModel），设计人员可以专注于页面设计
* 可测试：界面元素是比较难测试的，而现在测试可以针对于ViewModel来写







#### 第一个VUE程序

---

##### 开发工具

* VSCode
* HBuilder
* Sublime
* WebStorm

---

##### 下载地址

* 开发版本
  * 包含完整的警告和调试模式
  * 删除了警告

* CDN

    ~~~html
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
    ~~~

    ~~~html
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
    ~~~

---

##### 代码编写

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>第一个VUE</title>
</head>
<body>

<!--view层-->
<div id="app">
    {{message}}
</div>

<!--  导入Vue.js  -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
<script>
    var vm = new Vue({
        el: '#app',
        // Model：数据
        data: {
            message: 'hello,vue!'
        }
    })
</script>
</body>
</html>
~~~



---

##### Vue基本语法

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>第一个VUE</title>
</head>
<body>

<!--view层-->
<div id="app">
    <span v-bind:title="message">
        鼠标悬停几秒钟以查看此动态绑定的提示信息
    </span>
</div>

<!--  导入Vue.js  -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
<script>
    var vm = new Vue({
        el: '#app',
        // Model：数据
        data: {
            message: 'hello,vue!'
        }
    })
</script>
</body>
</html>
~~~

​	你看到的v-bind等被称为指令。指令带有前缀v-，表示它们是Vue提供的特殊属性，可能你已经猜到了，它们会在渲染的DOM上应用特殊的响应式行为。在这里，该指令的意思是，“将这个元素节点的titile特性和Vue实例的message属性保持一致”



* 判断循环

  ~~~html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Vue</title>
  </head>
  <body>
  
  <!--view层-->
  <div id="app">
      <h1 v-if="ok">Yes</h1>
      <h1 v-else>No</h1>
  
      <h3 v-if="type==='A'">A</h3>
      <h3 v-else-if="type==='B'">B</h3>
      <h3 v-else>C</h3>
  </div>
  
  <!--  导入Vue.js  -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
  <script>
      var vm = new Vue({
          el: '#app',
          // Model：数据
          data: {
              ok: false,
              type:'A'
          }
      })
  </script>
  </body>
  </html>
  ~~~

  ~~~html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Vue</title>
  </head>
  <body>
  
  <!--view层-->
  <div id="app">
      <h1 v-for="item in items">{{item.message}}</h1>
  </div>
  
  <!--  导入Vue.js  -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
  <script>
      var vm = new Vue({
          el: '#app',
          // Model：数据
          data: {
              items: [
                  {message: "Joker学Java"},
                  {message: "Joker学前端"},
                  {message: "Joker学Vue"},
              ]
          }
      })
  </script>
  </body>
  </html>
  ~~~

* 绑定事件

  ~~~html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Vue</title>
  </head>
  <body>
  
  <!--view层-->
  <div id="app">
      <button v-on:click="sayHi">click me</button>
  </div>
  
  <!--  导入Vue.js  -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
  <script>
      var vm = new Vue({
          el: '#app',
          // Model：数据
          data: {
              message: 'hello,Vue!'
          },
          methods:{    //方法必须定义在vue的Method对象中
              sayHi:function (){
                  alert(this.message);
              }
  
          }
      });
  </script>
  </body>
  </html>
  ~~~

  

---

##### 数据双向绑定

什么是数据双向绑定

* 即数据发生变化，视图也发生变化
* 视图发生变化，数据也发生变化

为什么要实现数据的双向绑定

* 在Vue.js中，如果使用vuex，实际上数据还是单向的。之所以需要数据双向绑定，这是用的UI控件来说，对于我们处理表单，Vue.js的双向数据绑定会方便很多。

如何在表单中使用数据双向绑定

* 可以使用`v-model`指令在表单`<input>`,`<textarea>`,`<select>`元素上创建双向数据绑定。他会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但v-model本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些数据处理

  ~~~html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Vue</title>
  </head>
  <body>
  
  <!--view层-->
  <div id="app">
      输入的文本：<input type="text" v-model:type="message">{{message}}
  
      <br>
      性别：
      <input type="radio" name="sex" value="男" v-model="checked"> 男
      <input type="radio" name="sex" value="女" v-model="checked"> 女
  
      <p>
          你选中了:{{checked}}
      </p>
  
      <select name = "" id="" v-model="select">
          <option value="" disabled>请选择</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
      </select>
  
      <p>
          你选中了:{{select}}
      </p>
  
  
  </div>
  
  <!--  导入Vue.js  -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
  <script>
      var vm = new Vue({
          el: '#app',
          data:{
              message:"123",
              checked:'',
              select:''
          }
      });
  </script>
  </body>
  </html>
  ~~~

注意：

* v-model会忽略所有表单元素的value、checked、selected特性的初始值而总是将Vue实例的数据作为数据来源，你应该通过JavaScript在组件的data选项中声明初始值
* v-指令只能绑定小写+下划线的命名，不能绑定带有驼峰和中划线的命名



---

##### Vue组件

什么是组件

* 组件时可复用的Vue实例，说白了就是一组可以重复使用的模板，跟JSTL的自定义标签、Thymeleaf的th:fragment等框架有着异曲同工之妙，通常一个应用程序会以一颗嵌套的组件树的形式来组织

  ![组件树](https://cn.vuejs.org/assets/components.7fbb3771.png)

注意：在实际开发中，我们并不会通过以下方式去开发组件，而是通过vue-cli创建.vue模板文件的方式开发，以下方法只是为了理解什么是组件

* 使用Vue.component()方式注册组件，格式如下：

  ~~~js
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Vue</title>
  </head>
  <body>
  
  <!--view层-->
  <div id="app">
      <!--  组件：传递给组件中的值。props  -->
      <joker v-for="item in items" v-bind:yue="item"></joker>
  </div>
  
  <!--  导入Vue.js  -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
  <script>
  
      // 定义一个Vue组件Component
      Vue.component("joker", {
          props:['yue'],
          template: '<li>{{yue}}</li>'
      })
  
      var vm = new Vue({
          el: '#app',
          data: {
              items: ["Java", "Linux", "前端"]
          }
      });
  </script>
  </body>
  </html>
  ~~~

* 说明：

  * `v-for="item in items"`：遍历Vue实例中定义的名为`items`的数组，并创建同等数量的组件
  * `v-bind:yue="item"`：将遍历的`item`项绑定到组件`props`定义的名为`yue`属性上；=号左边的yue为prop定义的属性名，右边的为`item in items`中遍历的item项的值



#### Axios异步通信

---

##### 什么是axios

* 是一个开源的可以用在浏览器端和`NodeJS`的异步通信框架，它的主要作用是实现AJAX异步通信，其功能特点主要如下
  * 从浏览器中创建`XMLHttpRequests`
  * 从node.js创建http请求
  * 支持Promise API 【JS中链式编程】
  * 拦截请求和响应
  * 转换请求数据和响应数据
  * 取消请求
  * 自动转换JSON数据
  * 客户端支持防御XSRF（跨站请求伪造）

---

##### 第一个Axios应用程序

我们开发的接口大部分采用JSON格式，可以先在项目里模拟一段JSON数据，数据内容如下：创建一个名为data.json的文件并填入上面的内容，放在项目的根目录

~~~json
{
  "name": "狂神说java",
  "url": "http://baidu.com",
  "page": "1",
  "isNonProfit": "true",
  "address": {
    "street": "含光门",
    "city": "陕西西安",
    "country": "中国"
  },
  "links": [
    {
      "name": "B站",
      "url": "https://www.bilibili.com/"
    },
    {
      "name": "4399",
      "url": "https://www.4399.com/"
    },
    {
      "name": "百度",
      "url": "https://www.baidu.com/"
    }
  ]
}
~~~

然后一个html使用axios尝试拉取数据

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vue</title>

    <!--  v-clock解决闪烁问题  -->
    <style>
        [v-clock] {
            display: none;
        }
    </style>
</head>
<body>

<!--view层-->
<div id="vue" v-clock>
    <div>
        {{info.name}}
    </div>
    <div>
        {{info.address.street}}
    </div>
    <div>
        <a v-bind:href="info.url">点我</a>
    </div>
</div>

<!--  导入Vue.js  -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script type="text/javascript">
    var vm = new Vue({
        el: '#vue',
        data() {
            return {
                // 请求的返回参数合适，必须和json字符串一样
                info: {
                    name: null,
                    address: {
                        street: null,
                        city: null,
                        country: null
                    }
                }
            }
        },
        mounted() {//钩子函数，链式编程
            axios.get('../data.json').then(response => (this.info = response.data));
        }
    });
</script>
</body>
</html>
~~~







#### 生命周期

---

Vue实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模板、挂载Dom、渲染→更新→渲染、卸载等一系列过程，我们称这是Vue的生命周期。简单来说就是Vue实例从创建到销毁的过程，就是生命周期

在Vue的整个生命周期中，它提供了一系列的事件，可以让我你们在事件触发时注册JS方法，可以让我们用自己注册的JS方法控制整个大局，在这些事件响应方法中的this直接指向的是Vue的实例

<img src="https://cn.vuejs.org/assets/lifecycle.16e4c08e.png" alt="组件生命周期图示" style="zoom:50%;" />





#### 计算属性

---

##### 什么是计算属性

* 计算出来的属性，储存在属性中，内存中运行
* 想象成缓存

----

##### 计算属性有什么用

* 调用方法时，每次都需要进行计算，既然有计算过程则必定产生系统开销，那如果这个结果是不经常变化的呢？此时就可以考虑将这个结果缓存起来，采用计算属性可以很方便的做到这一点。
* 计算属性的了将不经常变化的计算结进行缓存，以节约我们的系统开销；主要特性就是为了将不经常变化的计算结果进行缓存，以节约我们的系统开销

---

##### 计算属性的使用与对比

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vue</title>

    <!--  v-clock解决闪烁问题  -->
    <style>
        [v-clock] {
            display: none;
        }
    </style>
</head>
<body>

<!--view层-->
<div id="vue">
    <p>currentTime1: {{currentTime1()}}</p>
    <p>currentTime2: {{currentTime2}}</p>
</div>

<!--  导入Vue.js  -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script type="text/javascript">
    var vm = new Vue({
        el: '#vue',
        data: {
            message: 'hello,Vue!'
        },
        methods: {
            currentTime1: function () {
                return Date.now();  //获取当前时间
            }
        },
        computed: {  //计算属性:methods、computed 方法名可以重名，但不建议使用，methods方法等级高一点
            currentTime2: function () {
                return Date.now();  //获取当前时间
            }

        }
    });
</script>
</body>
</html>
~~~





#### Slot插槽

---

比如现在准备制作一个待办事项组件（todo），该组件由待办标题（todo-title）和待办内容（todo-items）组成，但这三个组件又是相互独立的，该如何操作

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vue</title>

    <!--  v-clock解决闪烁问题  -->
    <style>
        [v-clock] {
            display: none;
        }
    </style>
</head>
<body>

<!--view层-->
<div id="vue">
    <p>列表书籍</p>
    <ul>
        <li>Java</li>
        <li>Linux</li>
        <li>前端</li>
    </ul>

    <todo>
        <todo-title slot="todo-title" :title="title"></todo-title>
        <todo-items slot="todo-items" v-for="item in todoItems" :items="item"></todo-items>
    </todo>


</div>

<!--  导入Vue.js  -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
<script type="text/javascript">
    // slot 插槽
    Vue.component("todo", {
        template:
            '<div>\
                <slot name="todo-title"></slot>\
                <ul>\
                    <slot name="todo-items"></slot>\
                </ul>\
            </div>'
    });

    Vue.component("todo-title", {
        props: ['title'],
        template: '<div>{{title}}</div>',
    });

    Vue.component("todo-items", {
        props: ['items'],
        template: '<li>{{items}}</li>',
    });

    var vm = new Vue({
        el: '#vue',
        data: {
            title: "Vue列表",
            todoItems: ["Java", "Linux", "前端"],
        }
    });
</script>
</body>
</html>
~~~





#### 自定义事件

---

通过以上代码不难发现，数据项在 Vue 的实例中，但删除操作要在组件中完成，那么组件如何才能删除 Vue 实例中的数据呢？此时就涉及到参数传递事件分发了， Vue 为我们提供了自定义事件的功能，很好的帮助我们解决了这个问题；使用 `this.$emit('自定义事件名 '， 参数 )`。

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vue</title>

    <!--  v-clock解决闪烁问题  -->
    <style>
        [v-clock] {
            display: none;
        }
    </style>
</head>
<body>

<!--view层-->
<div id="vue">
    <p>列表书籍</p>
    <ul>
        <li>Java</li>
        <li>Linux</li>
        <li>前端</li>
    </ul>

    <todo>
        <todo-title slot="todo-title" :title="title"></todo-title>
        <todo-items slot="todo-items" v-for="(item,index) in todoItems"
                    :items="item" v-bind:index="index"
                    v-on:remove="removeItems(index)" :key="index"></todo-items>
    </todo>


</div>

<!--  导入Vue.js  -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
<script type="text/javascript">
    // slot 插槽
    Vue.component("todo", {
        template:
            '<div>\
                <slot name="todo-title"></slot>\
                <ul>\
                    <slot name="todo-items"></slot>\
                </ul>\
            </div>'
    });

    Vue.component("todo-title", {
        props: ['title'],
        template: '<div>{{title}}</div>',
    });

    Vue.component("todo-items", {
        props: ['items', 'index'],
        // 只能绑定当前组件的方法
        template: '<li>{{index}}---{{items}} <button @click="remove()">删除</button></li>',
        methods:{
            remove:function(index){
                // alert('1');
                // this.$emit自定义事件
                this.$emit('remove',this.index);
            }
        }
    });

    var vm = new Vue({
        el: '#vue',
        data: {
            title: "Vue列表",
            todoItems: ["Java", "Linux", "前端"],
        },
        methods: {
            removeItems:function (index){
                console.log("删除了"+this.todoItems[index]+"OK");
                this.todoItems.splice(index,1);//一次删除一个
            }
        }
    });
</script>
</body>
</html>
~~~







#### Vue-cli

---

##### 什么是vue-cli

* 官方提供的一个脚手架，同于快速生成一个vue的项目模板
* 预先定义好的目录结构以及基础代码

----

##### 主要的功能

* 统一的目录结构
* 本地调试
* 热部署
* 单元测试
* 集成打包上线

---

##### 初始vue-cli

1. 安装cnpm

   ~~~shell
   npm install -g cnpm
   ~~~

2. 安装vue-cli

   ~~~shell
   cnpm install -g vue-cli
   ~~~

3. 在指定文件夹下初始化该文件夹为vue-cli

   ~~~shell
   vue init webpack myvue
   ~~~



全部执行流程大约如下

~~~shell
E:\Program\Idea\JavaLearning\src\Vue-CliLearn>vue init webpack myvue

? Project name myvue
? Project description 我的第一个vue-cli程序
? Author JokerYue <Joker_Yue@qq.com>
? Vue build standalone
? Install vue-router? No
? Use ESLint to lint your code? No
? Set up unit tests No
? Setup e2e tests with Nightwatch? No
? Should we run `npm install` for you after the project has been created? (recommended) no

   vue-cli · Generated "myvue".

# Project initialization finished!
# ========================

To get started:

  cd myvue
  npm install (or if using yarn: yarn)
  npm run dev

Documentation can be found at https://vuejs-templates.github.io/webpack
~~~



---

##### vue-router路由

是Vue.js官方的路由管理器，和Vue.js的核心深度集成，让构建单页面应用变得易如反掌。包含的功能有

* 嵌套的路由/视图表
* 模块化的、基于组件的路由配置
* 路由参数、查询、通配符
* 基于 Vue.js 过渡系统的视图过渡效果
* 细粒度的导航控制
* 带有自动激活的 CSS class 的链接
* HTML5 历史模式或 hash 模式，在 lE9 中自动降
* 级自定义的滚动条行为



代码：

* 主界面App.vue

  ~~~vue
  <template>
    <div id="app">
      <h1>VUE-Router</h1>
      <router-link to="/main">首页</router-link>
      <router-link to="/content">内容页</router-link>
      <router-link to="/joker">JOKER</router-link>
      <router-view></router-view>
  
    </div>
  </template>
  
  
  <script>
  
  export default {
    name: 'App',
  }
  </script>
  
  
  <style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>
  
  ~~~

* 内容页

  * Content.vue

    ~~~vue
    <script setup>
    export default {
      name: 'Content'
    }
    </script>
    
    <template>
      <h1>内容页</h1>
    </template>
    
    <style scoped>
    
    </style>
    ~~~

  * Main.vue

    ~~~vue
    <script>
    export default {
      name: "Main"
    }
    </script>
    
    <template>
      <h1>首页</h1>
    </template>
    
    <style scoped>
    
    </style>
    ~~~

  * Joker.Vue

    ~~~vue
    <script setup>
    export default {
      name: 'Joker'
    }
    </script>
    
    <template>
      <h1>Joker_Yue</h1>
    </template>
    
    <style scoped>
    
    </style>
    ~~~

* 主配置

  main.js

  ~~~js
  // The Vue build version to load with the `import` command
  // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
  import Vue from 'vue'
  import App from './App'
  import router from "./router";  // 自动导入路由
  // import VueRouter from "vue-router";
  
  Vue.config.productionTip = false
  
  
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    //配置路由
    router,
    components: {App},
    template: '<App/>'
  })
  ~~~

* 路由配置

  index.js

  ~~~js
  import Vue from "vue";
  import VueRouter from "vue-router";
  import Content from "../components/Content.vue";
  import Main from "../components/Main.vue";
  import Joker from "../components/Joker.vue";
  
  // 安装路由
  Vue.use(VueRouter);
  
  // 导出
  export default new VueRouter({
    routes: [
      {
        //路由路径
        path: '/content',
        name: 'content',  //可省略
        //跳转的组件
        component: Content,
      },
      {
        //路由路径
        path: '/main',
        name: 'main', //可省略
        //跳转的组件
        component: Main,
      },
      {
        //路由路径
        path: '/joker',
        name: 'joker', //可省略
        //跳转的组件
        component: Joker,
      }
  
    ],
  });
  ~~~





#### Vue+ElementUI

---

##### 安装依赖

~~~shell
# 创建工程
vue init webpack element
# 进入工程
cd element
# 安装vue-router
npm install vue-router --save-dev
# 安装element-ui
npm i element-ui -S
# 安装依赖
npm install
# 安装SASS加载器
cnpm install sass-loader node-sass -sass-dev
# 启动测试
npm run dev
~~~

---

##### 简单的登录功能

1. 目录结构

   <img src="./跟随狂神学Java-36.assets/image-20230804153107287.png" alt="image-20230804153107287" style="zoom:50%;" />

2. App.vue

   ~~~vue
   <template>
     <div id="app">
       <router-view></router-view>
     </div>
   </template>
   
   <script>
   export default {
     name: 'App'
   }
   </script>
   ~~~

   Main.vue

   ~~~vue
   <script>
   export default {
     name: "Main"
   }
   </script>
   
   <template>
     <h1>首页</h1>
   </template>
   
   <style scoped>
   
   </style>
   ~~~

   Login.vue

   ~~~vue
   <template>
     <div>
       <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
         <h3 class="login-title">欢迎登录</h3>
         <el-form-item label="账号" prop="username">
           <el-input type="text" placeholder="请输入账号" v-model="form.username"/>
         </el-form-item>
         <el-form-item label="密码" prop="password">
           <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
         </el-form-item>
       </el-form>
   
       <el-dialog
         title="温馨提示"
         :visible.sync="dialogVisible"
         width="30%"
         :before-close="handleClose">
         <span>请输入账号和密码</span>
         <span slot="footer" class="dialog-footer">
           <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
         </span>
       </el-dialog>
     </div>
   </template>
   
   <script>
   export default {
     name: 'Login',
     data() {
       return {
         form: {
           username: '',
           password: ''
         },
         rules: {
           username: [
             {required: true, message: '请输入账号', trigger: 'blur'},
           ],
           password: [
             {required: true, message: '请输入密码', trigger: 'blur'},
           ]
         },
         // 对话框显示和隐藏
         dialogVisible: false
       }
     },
     methods: {
       onSubmit(formName) {
         //为表单绑定验证功能
         this.$refs [formName].validate((valid) => {
           if (valid) {
             //使用vue-router路由到指定页面，该方式称之为编程式导航
             this.$router.push("/main");
           } else {
             this.dialogVisible = true;
             return false;
           }
         });
       }
     }
   }
   </script>
   
   <style  scoped>
   .login-box {
     border: 1px solid #DCDFE6;
     width: 350px;
     margin: 180px auto;
     padding: 35px 35px 15px 35px;
     border-radius: 5px;
     -webkit-border-radius: 5px;
     -moz-border-radius: 5px;
     box-shadow: 0 0 25px #909399;
   }
   
   .login-title {
     text-align: center;
     margin: 0 auto 40px auto;
     color: #303133;
   }
   </style>
   ~~~

3. main.js

   ~~~js
   // The Vue build version to load with the `import` command
   // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
   import Vue from 'vue'
   import App from './App'
   
   import router from "./router";
   import ElementUI from 'element-ui';
   import 'element-ui/lib/theme-chalk/index.css';
   
   
   Vue.use(router);
   Vue.use(ElementUI);
   
   
   /* eslint-disable no-new */
   new Vue({
     el: '#app',
     router,
     render: h => h(App) // ElementUI rendere
   
   })
   ~~~

   index.js

   ~~~js
   import Vue from "vue";
   import VueRouter from "vue-router";
   
   import Main from "../views/Main.vue";
   import Login from "../views/Login.vue";
   
   Vue.use(VueRouter);
   
   export default new VueRouter({
     routes: [
       {
         path: "/login",
         component: Login
       },
       {
         path: "/main",
         component: Main
       }
     ]
   })
   
   ~~~

   

#### 嵌套路由

---

##### 什么是嵌套路由

嵌套路由又叫做子路由，在事件应用中，通常由多层嵌套的组件组合而成。同样的，URL中各段动态路径也按某种结构对应嵌套的各层组件，例如：

<img src="./跟随狂神学Java-36.assets/image-20230804154707029.png" alt="image-20230804154707029" style="zoom:67%;" />

---

##### 项目需求

在主界面增加一个表单，像这样，而且个人管理和用户列表都可以点击并显示视图

<img src="./跟随狂神学Java-36.assets/image-20230804160554343.png" alt="image-20230804160554343" style="zoom:50%;" />

那么就需要嵌套路由了，main路由中再嵌套两个子路由Profile和List

---

##### 代码

* index.js

  ~~~js
  import Vue from "vue";
  import VueRouter from "vue-router";
  
  import Main from "../views/Main.vue";
  import Login from "../views/Login.vue";
  
  import UserProfile from "../views/user/Profile.vue";
  import UserList from "../views/user/List.vue";
  
  Vue.use(VueRouter);
  
  export default new VueRouter({
    routes: [
      {
        path: "/login",
        component: Login
  
      },
      {
        path: "/main",
        component: Main,
        //嵌套路由
        children: [
          {
            path: "/user/profile",
            component: UserProfile
          },
          {
            path: "/user/list",
            component: UserList
          }
        ]
      }
    ]
  })
  ~~~

* VUE

  * Profile.vue

    ~~~vue
    <script>
    export default {
      name: "UserProfile"
    }
    </script>
    
    <template>
      <h1>个人信息</h1>
    </template>
    
    <style scoped>
    
    </style>
    ~~~

  * List.vue

    ~~~vue
    <script>
    export default {
      name: 'UserList'
    }
    </script>
    
    <template>
      <h1>用户列表</h1>
    </template>
    
    <style scoped>
    
    </style>
    
    ~~~

    Main.vue

    ~~~vue
    <script>
    export default {
      name: "Main"
    }
    </script>
    
    <template>
      <div>
        <el-container>
    
          <el-aside width="200px">
            <el-menu :default-openeds="['1']">
              <el-submenu index="1">
                <template slot="title"><i class="el-icon-caret-right"></i>用户管理</template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">
                    <router-link to="/user/profile">个人信息</router-link>
                  </el-menu-item>
                  <el-menu-item index="1-2">
                    <router-link to="/user/list">用户列表</router-link>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title"><i class="el-icon-caret-right"></i>内容管理</template>
                <e1-menu-item-group>
                  <el-menu-item index="2-1">分类管理</el-menu-item>
                  <el-menu-item index="2-2">内容列表</el-menu-item>
                </e1-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-aside>
    
          <el-container>
            <el-header style="text-align: right; font-size: 12px">
              <el-dropdown>
                <i class="el-icon-setting" style="margin-right:15px"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人信息</el-dropdown-item>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-header>
          </el-container>
    
          <el-main>
            <router-view></router-view>
          </el-main>
    
        </el-container>
      </div>
    </template>
    
    <style scoped>
    .login-box {
      border: 1px solid #DCDFE6;
      width: 350px;
      margin: 180px auto;
      padding: 35px 35px 15px 35px;
      border-radius: 5px;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      box-shadow: 0 0 25px #909399;
    }
    
    .login-title {
      text-align: center;
      margin: 0 auto 40px auto;
      color: #303133;
    }
    </style>
    ~~~





#### 参数传递及重定向

---

##### 项目需求

用户id传过来总得接受吧，尝试接受并显示

---

##### 语法

* 在Main.vue中我们这样写

  ~~~vue
  <!-- name传组件名，params传参数，需要对象：使用v-bind绑定-->
  <router-link to="{name:'/user/profile',params:{id:'1'}}">个人信息</router-link>
  ~~~

* 在index.js中我们这样写

  ~~~js
  children: [
          {
            path: '/user/profile/:id',
            component: UserProfile
          },
  ~~~

  path下，` '/user/profile/:id' `中的id就是传递的参数

* 在Profile.vue中我们这样写

  ~~~vue
  <script>
  export default {
    name: "UserProfile"
  }
  </script>
  
  <template>
    <div>
      <h1>个人信息</h1>
      {{ $route.params.id }}
    </div>
  
  </template>
  
  <style scoped>
  
  </style>
  ~~~

  这样可以取到路由中的信息

---

##### 使用props解耦

如果你觉得上面的写法过于复杂，那么可以使用props解耦

详细信息请看官方文档：[将 props 传递给路由组件 | Vue Router (vuejs.org)](https://router.vuejs.org/zh/guide/essentials/passing-props.html#将-props-传递给路由组件)

* 在index.js中我们这样写

  ~~~js
  //嵌套路由
  children: [
  {
    path: '/user/profile/:id',
    component: UserProfile,
    props: true
  },
  ~~~

* 在Profile.vue中我们这样写

  ~~~vue
  <script>
  export default {
    name: "UserProfile",
    props:[
      "id"
    ]
  }
  </script>
  
  <template>
      <h1>个人信息</h1>
  
  </template>
  
  <style scoped>
  
  </style>
  
  ~~~

  



#### 404页面和路由钩子

---

##### 解决#号

像这种看着不Ok

<img src="./跟随狂神学Java-36.assets/image-20230804165816015.png" alt="image-20230804165816015" style="zoom:50%;" />

我们可以在index.js中设置路由方式为history

~~~js
import Vue from "vue";
import VueRouter from "vue-router";

import Main from "../views/Main.vue";
import Login from "../views/Login.vue";

import UserProfile from "../views/user/Profile.vue";
import UserList from "../views/user/List.vue";

Vue.use(VueRouter);

export default new VueRouter({
  mode:"history",
  routes: [
    {
      path: "/login",
      component: Login

    },
    {
      path: "/main/:name",
      component: Main,
      props: true,
      //嵌套路由
      children: [
        {
          path: '/user/profile/:id',
          component: UserProfile,
          props: true
        },
        {
          path: "/user/list",
          component: UserList
        }
      ]
    }
  ]
})
~~~

* 路由方式有两种：
  * hash：路径带#
  * history：路径不带#

----

##### 404

创建一个NotFound.vue的视图组件，代码如下

~~~vue
<script>
export default {
  name: "NotFound"
}
</script>

<template>
  <div>
    <h1>404，真不巧，你的页面走丢了</h1>
  </div>
</template>

<style scoped>

</style>

~~~

然后去index.js中配置路由即可

~~~js
import Vue from "vue";
import VueRouter from "vue-router";

import Main from "../views/Main.vue";
import Login from "../views/Login.vue";

import UserProfile from "../views/user/Profile.vue";
import UserList from "../views/user/List.vue";

import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

export default new VueRouter({
  mode:"history",
  routes: [
    {
      path: "/login",
      component: Login

    },
    {
      path: "/main/:name",
      component: Main,
      props: true,
      //嵌套路由
      children: [
        {
          path: '/user/profile/:id',
          component: UserProfile,
          props: true
        },
        {
          path: "/user/list",
          component: UserList
        },
        {
          path: "*",
          component: NotFound
        }
      ]
    }
  ]
})
~~~

---

##### 路由钩子与异步请求

* `beforerouteEnter`：在进入路由前执行
* `beforeRouteLeave`：在离开路由前执行

~~~vue
<script>
export default {
  name: "UserProfile",
  props:[
    "id"
  ],
  beforeRouteEnter:(to,from,next)=>{
    //跟过滤器和拦截器一样
    console.log("进入路由之前")
    next()
  },
  beforeRouteLeave:(to,from,next)=>{
    console.log("离开路由之前")
    next()
  }
}
</script>

<template>
    <h1>个人信息</h1>

</template>

<style scoped>

</style>

~~~

参数说明：

* to: 路由将要跳转的路径信息
* from: 路径跳转前的路径信息
* next: 路由的控制参数
  * next() 跳入下一个页面
  * next('/path') 改变路由的跳转方向，使其跳到另一个路由
  * next(false) 返回原来的页面
  * next((vm)= >{}) 仅在 beforeRouteEnter 中可用，vm是组件实例

---

##### 在钩子函数中使用异步请求

1. 安装Axios `cnpm install axios -s`

2. main.js引入Axios

3. 代码：

   Profile.vue

   ~~~vue
   <script>
   export default {
     name: "UserProfile",
     props:[
       "id"
     ],
     beforeRouteEnter:(to,from,next)=>{
       //跟过滤器和拦截器一样
       console.log("进入路由之前")
       next(vm=>{
         vm.getData();//进入路由之前执行getData
       })
     },
     beforeRouteLeave:(to,from,next)=>{
       console.log("离开路由之前")
       next()
     },
     methods:{
       getData:function () {
         this.axios({
           method:"get",
           url:"http://localhost:8080/static/mock/data.json",
         }).then(function (response){
           console.log(response)
         })
       }
     }
   }
   </script>
   
   <template>
       <h1>个人信息</h1>
   
   </template>
   
   <style scoped>
   
   </style>
   
   ~~~

   main.js

   ~~~js
   // The Vue build version to load with the `import` command
   // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
   import Vue from 'vue'
   import App from './App'
   
   import router from "./router";
   import ElementUI from 'element-ui';
   import 'element-ui/lib/theme-chalk/index.css';
   
   import axios from "axios";
   import VueAxios from "vue-axios";
   
   Vue.use(VueAxios, axios);
   
   Vue.use(router);
   Vue.use(ElementUI);
   
   
   /* eslint-disable no-new */
   new Vue({
     el: '#app',
     router,
     render: h => h(App) // ElementUI rendere
   
   })
   ~~~

   
