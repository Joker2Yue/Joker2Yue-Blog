---
title: 跟随狂神学Java-25，IO流
date: 2023/04/06 04:02:22
tags:
  - 狂神
  - Java
  - JavaSE
  - 必看
categories:
  - [跟随狂神学Java]
cover: /images/coverImg/JavaSE/12.jpg
keywords:
  - IO流
  - 分类
  - 体系结构
  - FileInputStream
  - FileOutputStream
  - 文件复制
  - FileReader
  - FileWriter
  - 缓冲字符流
  - 节点流
  - 包装流
  - 数据流
  - 标准输出流
  - File类
  - 序列化
  - 反序列化
  - transient关键字
  - Properties
ai:
  - 这篇文章是一篇学习IO流分类、File操作的学习笔记。
  - 这篇文章描述的是学习IO流分类、File操作、流的体系结构，掌握FileInputStream、FileOutputStream，对象序列化和反序列化等内容。
  - 这篇文章介绍了IO流的分类，流的体系结构，以及FileInputStream、FileOutputStream等流的操作。还包括了文件复制、对象的序列化和反序列化、transient关键字、IO和Properties的联合使用等知识点。同时，提到了在IDEA中的当前路径和带有缓冲的字符流等内容。
---
# 跟随狂神学Java

##### 第二十五天：IO流

> 生活本就沉闷，但跑起来有风
>
> *~~[狂神未更新，转动力节点(bilibili.com)](https://www.bilibili.com/video/BV1Rx411876f?t=175.3&p=660)~~*

## 学习内容

#### IO流的概述

用于读写文件中的数据（可以读写文件，或网络中的数据）

I:	input

O:	output



---

##### IO流的分类

![image-20230309200323616](./跟随狂神学Java-25.assets/image-20230309200323616.png)

按照流向（以内存作为参照）：

* 输出流：程序->文件
* 输入流：文件->程序

按照操作类型（数据读写方式）：

* 字节流：可以操作所有类型的文件（这种流一次读写一个字节byte，等同于一次读写8个二进制。可以读写文本、图片、声音、视频等文件）
* 字符流：只能操作纯文本文件（这种流按照字节读取数据，一次读写一个字符，这种流是为了操作文本文件存在的）



---

##### IO流的体系结构

![image-20230309200850898](./跟随狂神学Java-25.assets/image-20230309200850898.png)

IO流类的命名规则

<img src="./跟随狂神学Java-25.assets/image-20230309201002472.png" alt="image-20230309201002472" style="zoom: 33%;" />

注意：只要类名以Stream结尾的都是字节流，以”Read/Write“结尾的都是字符流

​			四大家族的首领都是抽象类(`java.io.InputStream`,`java.io.Output`,`java.io.Reader`,`java.io.Write`)

​			所有流都实现了java.io.Closeable接口，都是可关闭的，都有close()方法

​			流毕竟是一个管道，这个是内存和硬盘之间的通道，用完一定要关闭，不然会占用很多资源

---

##### FileOutputStream

操作本地文件的直接输出流，可以把程序中的数据写到本地文件中

书写步骤：

1. 创建字节输出流对象
2. 写数据
3. 释放资源

 

```java
package com.joker_yue.javalearn.IOLearn;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class OutputTest01 {
    public static void main(String[] args) throws IOException {
        //创建对象的时候，构造方法中填的参数是要写入文件的路径
        //需要抛出FileNotFoundException 因为可能找不到文件
        FileOutputStream fos = new FileOutputStream("a.txt");
        //需要抛出IOException 因为可能写入失败
        fos.write(97);
        fos.close();
    }
}
```

注意：

1. 创建FileOutputStream对象时填入的参数，可以是文件路径或者是File对象
2. 如果文件不存在 就会创建一个新的文件，但是前提是父级路径是合理的
3. 如果文件已经存在，将会覆盖原文件，除非填入参数`FileOutputStream fos = new FileOutputStream("a.txt",true);`
4. write方法的参数是整数，但是实际上写到本地文件中的是整数在ASCII上对应的字符
5. 每次使用完流都要释放资源，否则会一直占用文件



----

##### 流的close()和flush()方法

OutputStream和Write都有Flushable接口，这意味着所有的输出流都是可刷新的，都有flush()方法

养成好习惯，输出流在最终输出之后，一定要记得flush()刷新一下，表示在将管道/通道中剩余的未输出的数据强行输出完（清空管道）

注意：如果没有flush()，可能会导致丢失数据



---

##### 需要掌握的流

* 文件专属
* java.io.FileInputStream
* java.io.FileOutputStream
* java.io.FileReader
* java.io.FileWriter
* 转换流（将字节流转换成字符流）
* java.io.InputStreamReader
* java.io.OutputStreamWriter
* 缓冲流专属
* java.io.BufferedReader
* java.io.BufferedWriter
* java.io.BufferedInputStream
* java.io.BufferedOutputStream
* 数据流专属
* java.io.DatainputStream
* java.io.DataOutputStream
* 标准输出流
* java.io.PrintWrter
* java.io.PrintStream
* 对象专属流 
* java.io.ObjectInputStream
* java.io.ObjectOutputStream



---

##### FileInputStream

```java
package com.joker_yue.javalearn.IOLearn;
/*
    java.io.FileInputStream;
    1. 文件字节输入流，万能的，任何类型的文件都可以采用这个流来读
    2.字节的方式，完成输入的操作，完成读的操作，（从硬盘-->内存）
 */

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class FileInputStreamTest01 {
    public static void main(String[] args) {

        //因为我们需要使用finally，所有我们就将创建放置在try外侧
        FileInputStream fis = null;

        try {
            //创建文件字节输入流对象,  其中test.txt中的数据为"ab"
            fis = new FileInputStream("E:\\Program\\Idea\\Java\\helloworld\\src\\com\\joker_yue\\javalearn\\IOLearn\\test.txt");

            //开始读
            int readData = fis.read();//这个方法的返回值是：读取到的"字节"本身
            System.out.println(readData);//输出97

            readData = fis.read();//向下再读一个
            System.out.println(readData);//输出98

            readData = fis.read();//向下再读一个
            System.out.println(readData);//输出-1，因为已经到达文件尾部


        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            //在finally语句块中确保流一定关闭
            if (fis != null) {//避免空指针异常
                //关闭流的前提：流不是空，流是null的时候没必要关闭
                try {
                    fis.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }
}
```

使用while循环来改进

```java
package com.joker_yue.javalearn.IOLearn;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

/*
    对第一个程序进行改进
 */
public class FileInputStreamTest02 {
    public static void main(String[] args) {
        FileInputStream fis = null;
        try {
            fis = new FileInputStream("E:\\Program\\Idea\\Java\\helloworld\\src\\com\\joker_yue\\javalearn\\IOLearn\\test.txt");
            while (true) {
                int readData = fis.read();
                if (readData == -1) break;
                System.out.println(readData);
            }

            //改造while循环
            int readData = 0;
            while ((readData = fis.read()) != -1) {
                System.out.println(readData);
            }

        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }
}
```



---

##### IDEA中的当前路径

如果我们一次读取一个字节的话，内存硬盘交互的太频繁

`int read(byte[] b)`从此输入流中将最多b.length个字节的数据读入一个byte数组中

 在IDEA中的默认的当前路径是Project的根

```java
package com.joker_yue.javalearn.IOLearn;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

/*
int read(byte[] b)
    一次最多读取b.length个字节，减少硬盘和内存的交互，提高程序执行的效率
    在byte[]数组中读
 */
public class FileInputStreamTest03 {
    public static void main(String[] args) {
        FileInputStream fis = null;
        try {
//            IDEA默认的当前路径在哪里？
//            在工程文件project的根
//            E:\Program\Idea\Java\src\com\joker_yue\tempFile
            fis = new FileInputStream("tempFile");
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }finally {
            if (fis == null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }
}
```



---

##### 往byte数组中读

```java
package com.joker_yue.javalearn.IOLearn;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

/*
int read(byte[] b)
    一次最多读取b.length个字节，减少硬盘和内存的交互，提高程序执行的效率
    在byte[]数组中读
 */
public class FileInputStreamTest03 {
    public static void main(String[] args) {
        FileInputStream fis = null;
        try {
//            IDEA默认的当前路径在哪里？
//            在工程文件project的根
//            E:\Program\Idea\Java\src\com\joker_yue\tempFile
            fis = new FileInputStream("javalearn\\IOLearn\\tempFile.txt");
//            tempFile中为"abcdef"

//            开始读，采用byte数组，一次读取多个字节，最多读取"数组.length"个字节
            byte[] bytes = new byte[4];//准备一个4长度的byte数组，一次最多读取4个字节
            //返回读取到的字节数量，而不是字节本身
            int readCount = fis.read(bytes);
            System.out.println(readCount);//第一次读到了4个字节
            System.out.println(new String(bytes));//abcd，将读取到的byte[]全部转换为字符串

            readCount = fis.read(bytes);
            System.out.println(readCount);//由于之前已经读走了，那么就读到后面的ef，输出2
            System.out.println(new String(bytes));//efcd，只会覆盖前面两个

            readCount = fis.read(bytes);
            System.out.println(readCount);//-1，一个都没有读到
            System.out.println(new String(bytes, 0, readCount));//不会输出，设置从0开始转换readCount个字符串

        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            if (fis == null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }
}
```

最终版本

```java
package com.joker_yue.javalearn.IOLearn;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class FileInputStreamTest04 {
    public static void main(String[] args) {
        FileInputStream fis = null;
        try {
            //准备一个byte数组
            fis = new FileInputStream("javalearn\\IOLearn\\tempFile.txt");
            byte[] bytes = new byte[4];
            /*while (true) {
                int readCount = fis.read(bytes);
                if (readCount == -1) break;
                //byte[]转换字符串，读到多少个转换多少个
                System.out.print(new String(bytes, 0, readCount));
            }*/

            int readCount = 0;
            while ((readCount = fis.read(bytes)) != -1) {
                System.out.println(new String(bytes, 0, readCount));
            }


        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }

    }

}
```



---

##### FileInputStream中的其他方法

 `int available()`,`long skip(long n)`

| 返回类型 | 方法名 | 说明|
| -------- | ------ |-----|
| int      | available() |返回下一次对此输入流调用的方法可以不受阻塞地从此输入流读取（或跳过）的估计**剩余字节数**。|
| long | skip(long n) |从输入流中**跳过并丢弃** n 个字节的数据。|





#### 文件复制

---

原理：边读边写。

<img src="./跟随狂神学Java-25.assets/image-20230328201954123.png" alt="image-20230328201954123" style="zoom:25%;" />

---

##### FileReader

FileReader/FileWriter与FileInputStream/FileOutputStream之间的区别是，FileInputStream/FileOutputStream使用的是byte[]，而FileReader/FileWriter是char[]

```java
package com.joker_yue.javalearn.IOLearn;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

/*
FileReader
    文件字符输入符，只能读取普通文本
    读取文本内容时，比较方便、快捷
 */
public class FileReaderTest {
    public static void main(String[] args) {
        FileReader reader = null;
        try {
            //创建文件字符输入流
            reader = new FileReader("javalearn\\IOLearn\\tempFile.txt");//"abcd"
            //开始读，准备一个char数组
            char[] chars = new char[4];//一次读取4个字符
//            往char中读
            reader.read(chars);
            for (char c : chars) {
                System.out.print(c);
            }

            /*int readCount = 0;
            while ((readCount = reader.read()) != -1) {
                //可以对字符数组进行遍历
                System.out.print(new String(chars,0,readCount));
            }*/

        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }

    }
}
```

上述代码的执行结果为

~~~java
abcd
~~~

----

##### FileWriter

```java
package com.joker_yue.javalearn.IOLearn;

import java.io.FileWriter;
import java.io.IOException;

/*
FileWriter
    文件字符输出流，写
    只能输出普通文本
 */
public class FileWriterTest {
    public static void main(String[] args) {
        FileWriter out = null;
        try {
            //创建文件输出流对象
            out = new FileWriter("file",true);//以追加模式打开文件
            //开始写
            char[] chars = {'我', '是', '帅', '哥'};
            out.write(chars);
//          文件生成路径为  E:\Program\Idea\Java\src\com\joker_yue\file
            out.write("我是一名软件工程师");
            //刷新
            out.flush();
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }
}
```

---

##### 复制普通文本文件

```java
package com.joker_yue.javalearn.IOLearn;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class copy02 {
    public static void main(String[] args) {
        FileReader in = null;
        FileWriter out = null;
        try {
            //读
            in = new FileReader("javalearn/IOLearn/copy02.java");
            //写
            out = new FileWriter("Copy03.txt");

            //一边读一边写
            char[] chars = new char[1024*512];//1MB
            int readCount = 0;
            while((readCount = in.read(chars))!=-1){
                out.write(chars,0,readCount);
            }
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            if(in!=null){
                try {
                    in.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            if(out!=null){
                try {
                    out.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }
}
```





#### 带有缓冲的字符流

---

名字里带Buffer的自带缓冲，比如BufferedReader/BufferedWriter

**BufferedReader的构造方法：`BufferedReader(Reader in)`**

```java
package com.joker_yue.javalearn.IOLearn;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

/*
BufferedReader
    带有缓冲区的字符输入流
    使用这个流的时候不需要自定义char数组，或者不需要自定义byte数组，自带缓冲
 */
public class BufferedReaderTest {
    public static void main(String[] args) throws IOException {
        FileReader reader = new FileReader("Copy03.txt");
        //当一个流的构造方法中需要一个流的时候，这个被传进来的流叫做节点流
        //外部负责包装的叫做包装流，还有一个名字叫做：处理流
        //像当前这个程序来说，FileReader就是一个节点流，BufferedReader就是一个包装流/处理流
        BufferedReader br = new BufferedReader(reader);

       /* //读一行
        String fistLine = br.readLine();
        System.out.println(fistLine);

        String secondLine = br.readLine();
        System.out.println(secondLine);*/

        //br.readLine()方法读取一个文本行，但不带换行符
        String s = null;
        while ((s = br.readLine()) != null) {
            System.out.println(s);
        }


        //关闭流，
        // 只需要关闭外部的流，因为会去调用节点流的close()方法
        //也就是节点流会自动关闭
        br.close();
    }
}
```

---

##### 节点流和包装流

```java
package com.joker_yue.javalearn.IOLearn;

import java.io.*;

/*
BufferedReader

 */
public class BufferedReaderTest02 {
    public static void main(String[] args) throws IOException {
        //字节流
        FileInputStream in = new FileInputStream("Copy03.txt");
//        BufferedReader br = new BufferedReader(in);报错，不能传字节流，只能传字符流
//        通过转换流转换.现在in是字节流，reader是包装流
        InputStreamReader reader = new InputStreamReader(in);//把字节流转换成了字符流
        BufferedReader br = new BufferedReader(reader);//现在就可以了
        String line = null;
        while ((line = br.readLine()) != null){
            System.out.println(line);
        }

    }
}
```

合并起来写：

```java
package com.joker_yue.javalearn.IOLearn;

import java.io.*;

/*
BufferedReader

 */
public class BufferedReaderTest02 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream("Copy03.txt")));//合并写
        String line = null;
        while ((line = br.readLine()) != null){
            System.out.println(line);
        }

    }
}
```

在转换流构造方法中传一个编码格式可解决乱码，如：`new BufferedReader(new InputStreamReader(new FileInputStream(""),"GB18030"))`

----

##### 带有缓冲区的字符输出流

```java
package com.joker_yue.javalearn.IOLearn;

import java.io.*;

public class BufferedWriterTest01 {
    public static void main(String[] args) throws IOException {
        BufferedWriter out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream("copy02",true)));//两层包装，转换流，追加模式
        out.write("hello world");
        out.write("\n");
        out.write("hello kitty");
        //刷新
        out.flush();
        //关闭最外侧
        out.close();
    }
}
```





#### 数据流

---

**DataOutputStream**

```java
package com.joker_yue.javalearn.IOLearn;

import java.io.DataOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class DataOutputStreamTest {
    public static void main(String[] args) throws IOException {
        //创建数据专属的字节输出流
        DataOutputStream dos = new DataOutputStream(new FileOutputStream("data"));
        //写数据
        byte b=100;
        short s=200;
        int i=300;
        long l=400;
        double d=500.0;
        boolean bl=false;
        char c='a';
        //写
        dos.writeByte(b);    //把数据以及数据的类型一并写入到文件中
        dos.writeShort(s);
        dos.writeInt(i);
        dos.writeLong(l);
        dos.writeDouble(d);
        dos.writeBoolean(bl);
        dos.writeChar(c);
        //刷新
        dos.flush();


    }
}
```

**DataInputStream**

```java
package com.joker_yue.javalearn.IOLearn;

import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

/*
    数据字节写入流
    DataOutputStream只能使用DataInputStream去读，并且读的时候你需要提前知道写入的顺序
    读的顺序需要和写的一样，才可以正常取出
 */
public class DataInputStreamTest {
    public static void main(String[] args) throws IOException {
        DataInputStream dis = new DataInputStream(new FileInputStream("data"));
        //开始读
        byte b = dis.readByte();
        short s = dis.readShort();
        int i = dis.readInt();
        long l = dis.readLong();
        double d = dis.readDouble();
        boolean bl = dis.readBoolean();
        char c = dis.readChar();

        System.out.println(b);
        System.out.println(s);
        System.out.println(i);
        System.out.println(l);
        System.out.println(d);
        System.out.println(bl);
        System.out.println(c);
    }
} 
```



#### 标准输出流

---

```java
package com.joker_yue.javalearn.IOLearn;

/*
java.io.PrintScreen: 标准的字节输出流，默认输出到控制台
 */

import java.io.PrintStream;

public class PrintStreamTest {
    public static void main(String[] args) {
        //联合起来写
        System.out.println("");
        
        //分开写
        PrintStream ps = System.out;
        ps.println("hello zhangsan");
        ps.println("hello lisi");
        ps.println("hello wangwu");

        //标准输出流不需要.close()手动关闭
    }
}
```

我们手动修改输出位置

```java
package com.joker_yue.javalearn.IOLearn;

/*
java.io.PrintScreen: 标准的字节输出流，默认输出到控制台
 */

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintStream;

public class PrintStreamTest {
    public static void main(String[] args) throws FileNotFoundException {
        //联合起来写
        System.out.println("");

        //分开写
        PrintStream ps = System.out;
        ps.println("hello zhangsan");
        ps.println("hello lisi");
        ps.println("hello wangwu");

        //标准输出流不需要.close()手动关闭

        /*
        //System类的使用过的方法和属性
        System.gc();//回收垃圾
        System.currentTimeMillis();//当前秒
        PrintStream ps2 = System.out;//输出流
        System.arraycopy();//数组拷贝
        System.exit(0);//退出Java虚拟机
        */

        //可以改变标准输出流的输出方向吗
        //标准输出流不再指向控制台
        //指向log文件
        PrintStream printStream = new PrintStream(new FileOutputStream("log"));
        //修改输出方向，指向log文件
        System.setOut(printStream);
        System.out.println("hello World");
        System.out.println("hello Kitty");
        System.out.println("hello Zhangsan");


    }
}
```

<img src="./跟随狂神学Java-25.assets/image-20230403194458329.png" alt="image-20230403194458329" style="zoom: 50%;" />	 

```java
package com.joker_yue.javalearn.IOLearn;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Logger {
    /*
        记录日志的方法
     */
    public static void log(String msg) {
        try {
            //指向一个日志文件
            PrintStream out = new PrintStream(new FileOutputStream("log.txt",true));
            //改变输出方向
            System.setOut(out);//重定向
            //日期当前时间
            Date nowTime = new Date();//获取当前时间
            SimpleDateFormat self = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss SSS");//重定向时间格式
            String strTime = self.format(nowTime);//转成String

            System.out.println(strTime + "" + msg);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }

    }
}

```

```java
package com.joker_yue.javalearn.IOLearn;

public class loggerTest {
    /*
    测试logger是否有用
     */
    public static void main(String[] args) {
        Logger.log("调用了System类的gc()方法，建议启动垃圾回收");
        Logger.log("调用了UserService的doSome()方法");
        Logger.log("用户尝试进行登录，验证失败");
    }
}
```



#### File类

---

注意：

1. File类和四大家族没有关系，所以File类不能完成文件读写
2.  File对象表示
           路径和目录名的抽象表示形式
           C:\Deskto\     是一个File对象
           C:\readme.txt   也是一个File对象
           一个File对象有可能是目录，有可能是文件
           File只是一个路径名的抽象表现形式
3. File中常用的方法

```java
package com.joker_yue.javalearn.IOLearn;

import java.io.File;
import java.io.IOException;

/*
注意：
    1.File类和四大家族没有关系，所以File类不能完成文件读写
    2.File对象表示
        路径和目录名的抽象表示形式
        C:\Deskto\     是一个File对象
        C:\readme.txt   也是一个File对象
        一个File对象有可能是目录，有可能是文件
        File只是一个路径名的抽象表现形式
    3.File中常用的方法

 */
public class FileTest01 {
    public static void main(String[] args) throws IOException {
        //创建一个File对象
        File f1 = new File("E:\\TempFiles\\File");
        //判断是否存在
        System.out.println(f1.exists());

        //如果"E:\\TempFiles\\File"不存在，则以文件的形式创建
        /*if(!f1.exists()){
            f1.createNewFile();
        }*/

        //如果"E:\\TempFiles\\File"不存在，则以目录形式创建
        /*if (!f1.exists()) {
            f1.mkdir();
        }*/

        //可以创建多重目录吗
        /*File f2 = new File("E:\\TempFiles\\File\\a\\b\\c\\d");
        if (!f2.exists()) {
            //以多重目录的形式新建
            f2.mkdirs();
        }*/

        File f3 = new File("E:\\TempFiles\\File");
        //获取父路径
        String parentPath = f3.getParent();
        System.out.println(parentPath);
        //获取绝对路径
        File parentFile = f3.getParentFile();
        System.out.println("获取绝对路径:"+parentFile.getAbsoluteFile());

        File f4 = new File("copy");
        System.out.println("绝对路径"+f4.getAbsoluteFile());

    }

}
```

---

##### File常用方法

```java
package com.joker_yue.javalearn.IOLearn;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

/*
File类常用方法
 */
public class FileTest02 {
    public static void main(String[] args) {
        File f1 = new File("E:\\TempFiles\\File");
        //获取文件名
        System.out.println("文件名" + f1.getName());

        //判断是否是一个目录
        System.out.println(f1.isDirectory());//false
        //判断是否一个文件
        System.out.println(f1.isFile());//ture

        //获取文件最后一次修改时间，返回为long
        long haoMiao = f1.lastModified();
        Date time = new Date(haoMiao);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:SSS");
        String strTime = sdf.format(haoMiao);
        System.out.println(strTime);

        //获取文件大小
        System.out.println(f1.length());

    }
}
```

获取所有的子文件

```java
package com.joker_yue.javalearn.IOLearn;

import java.io.File;

public class FileTest03 {
    public static void main(String[] args) {
        //File[] listFile()
        //获取当前目录下所有的子文件
        File f = new File("E:\\Downloads");
        File[] files = f.listFiles();
         //for each
        for(File file:files){
            System.out.println(file.getAbsoluteFile());
        }
    }
}
```

 



#### 对象的序列化和反序列化

---

将内存中的对象存储在硬盘中的过程叫做序列化 Serialize

同理，将硬盘中松散的对象组装回内存中的过程叫做反序列化 Deserialize

可以理解为拆分和组装的过程

<img src="./跟随狂神学Java-25.assets/image-20230403204547669.png" alt="image-20230403204547669" style="zoom: 50%;" />

---

##### 序列化的实现

```java
package com.joker_yue.javalearn.IOLearn.ObjectOutputLearn;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;

public class ObjectOutputTest01 {
    public static void main(String[] args) throws IOException {
        //创建Student对象
        Student s = new Student(111, "zhangsan");
        //序列化
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("Students"));

        //不支持序列化
        //java.io.NotSerializableException
        //需要让Student 继承 Serializable 接口

        //序列化对象
        oos.writeObject(s);
        //刷新
        oos.flush();
        //关闭
        oos.close();

    }
}
```

```java
package com.joker_yue.javalearn.IOLearn.ObjectOutputLearn;

import java.io.Serializable;

public class Student implements Serializable {
    int no;
    String name;

    public Student(int no, String name) {
        this.no = no;
        this.name = name;
    }

    public int getNo() {
        return no;
    }

    public void setNo(int no) {
        this.no = no;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Student{" +
                "no=" + no +
                ", name='" + name + '\'' +
                '}';
    }
}

```

通过源代码Serializable只是一个标志性接口，里面什么代码都没有，给Java虚拟机看的

---

##### 反序列化的实现

```java
package com.joker_yue.javalearn.IOLearn.ObjectOutputLearn;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.ObjectInputStream;

public class ObjectInputStreamTest01 {
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream("Students"));
        //开始反序列化
        Object obj = ois.readObject();
        //反序列化回来是一个学生对象，所以会调用学生对象的toString方法
        System.out.println(obj);

        ois.close();
    }
}
```



Users类的序列化和反序列化

```java
package com.joker_yue.javalearn.IOLearn.ObjectOutputLearn;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

/*
一次序列化多个对象
可以将对象放在集合中
 */
public class ObjectOutputStreamTest02 {
    public static void main(String[] args) throws IOException {
        List<User> userList = new ArrayList<>();
        userList.add(new User(1,"zhangsan"));
        userList.add(new User(2,"lisi"));
        userList.add(new User(3,"wangwu"));

        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("users"));

        //序列化一个集合，这个集合中放了很多其他对象
        oos.writeObject(userList);

        oos.flush();
        oos.close();

    }

}
```

```java
package com.joker_yue.javalearn.IOLearn.ObjectOutputLearn;

import java.io.Serializable;

public class User implements Serializable {
    private int no;
    private String name;

    public User(int no, String name) {
        this.no = no;
        this.name = name;
    }

    public User() {
    }

    public int getNo() {
        return no;
    }

    public void setNo(int no) {
        this.no = no;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "User{" + "no=" + no + ", name='" + name + '\'' + '}';
    }
}
```

```java
package com.joker_yue.javalearn.IOLearn.ObjectOutputLearn;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.util.List;

public class ObjectInputStreamTest02 {
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream("users"));

//        Object obj = ois.readObject();
//        System.out.println(obj instanceof List);//true

        List<User> userList = (List<User>) ois.readObject();

        for (User user : userList) {
            System.out.println(user);

        }

        ois.close();
    }
}
```

上述程序的输出结果为

~~~java
User{no=1, name='zhangsan'}
User{no=2, name='lisi'}
User{no=3, name='wangwu'}
~~~





#### transient关键字

---

当我们不希望某个属性被序列化的时候，我么可以加关键字transient（adj.游离的）关键字

```java
private transient String name;
```





#### IO和Properties联合使用

---

IO流：文件的读和写

Properties：是一个Map集合，key和value都是String类型

在后面讲反射机制的时候会讲

```java
package com.joker_yue.javalearn.IOLearn.IOProperties;

import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

/*
IO + Properties 的联合应用
非常好的设计理念：
    以后经常改动的数据，可以单独写到一个文件里面，使用程序动态读取
    将来只需要修改这个文件的内容，Java代码不需要改动，不需要重新编译，服务器也不需要重启，
    就可以拿到动态的信息

    类似以上这种机制的文件叫做配置文件，
    并且，当配置文件中的内容格式是
        key=value 的时候
        我们把这种配置文件叫做属性配置文件，

    Java规范中有要求，属性配置文件建议.properties结尾，但这不是必须的，这种文件叫做属性配置文件
    其中Properties对象是专门存放属性配置文件的一个类

    如果其中password value出现了两次，那么第二个会覆盖第一个

 */
public class IOPropertiesTest01 {
    public static void main(String[] args) throws IOException {
        /*
        Properties是一个Map集合，key和value都是String类型
        现在想将userinfo文件中的数据加载到Properties对象当中
         */
        //新建一个输入流
        FileReader reader = new FileReader("userinfo.properties");

        //新建Map集合
        Properties pro = new Properties();

        //调用Properties的load方法
        //将文件中的数据加载到map集合中
        pro.load(reader);//文件中的数据 顺着 管道 加载进集合中，其中等号左边做key，等号右边做value

        //通过key来加载value
        String username = pro.getProperty("username");
        System.out.println(username);

        String password = pro.getProperty("password");
        System.out.println(password);
    }
}
```

**属性配置文件**

```properties
#这里是userinfo.properties
username=admin
#############################在属性配置文件中井号是注释############################
#属性配置文件中key重复的话，value自动覆盖
#password=admin
password=123123
#在等号周围最好不要有空格
data = 100
#不建议使用冒号
admintoken:1213
```

上述代码的输出结果为

~~~java
admin
123123
100
1213
~~~



