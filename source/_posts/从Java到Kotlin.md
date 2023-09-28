---
title: 从Java到Kotlin
date: 2023/07/07 04:02:22
tags:
  - Java
  - Kotlin
  - 转载
  - 必看
categories:
  - [转载文章, 必看]
cover: /images/coverImg/Java-vs-Kotlin.jpg
keywords:
  - Java
  - Kotlin
  - 编程语言
  - 编程
  - Android
copyright: false
ai:
  - 这篇文章总结了Java与Kotlin之间的语法对比，包括打印日志、常量与变量、null声明、空判断、字符串拼接、换行、三元表达式、操作符、类型判断和转换、多重条件、更灵活的case语句、for循环、更方便的集合操作、方法定义、带返回值的方法、无结束符号、constructor构造器、Get Set 构造器、原型扩展等内容。
  - 这篇文章总结了Java和Kotlin中的常见编程概念和语法，包括打印日志、常量与变量、null声明、空判断、字符串拼接、换行、三元表达式、操作符、类型判断和转换、多重条件、更灵活的case语句、for循环、更方便的集合操作、方法定义、带返回值的方法、无结束符号、构造器、Get Set 构造器、原型扩展、以及在Kotlin中需要了解的重要事项。
  - 这篇文章总结了Java和Kotlin在各个编程方面的比较，包括打印日志、常量与变量、null声明、空判断、字符串拼接、换行、三元表达式、操作符、类型判断和转换、多重条件、更灵活的case语句、for循环、更方便的集合操作、遍历、方法定义、带返回值的方法、无结束符号、constructor构造器、Get Set 构造器、原型扩展等内容。
---


> 作者：[amitshekhariitbhu](https://github.com/amitshekhariitbhu)
> 链接：https://github.com/amitshekhariitbhu/from-java-to-kotlin
> 来源：Github
> 著作权归原作者所有。商业转载请联系原作者获得授权，非商业转载请注明出处。

![Form Java To kotlin](https://raw.githubusercontent.com/amitshekhariitbhu/from-java-to-kotlin/master/assets/from_java_to_kotlin.png)


## 打印日志(Print to Console)

- Java

```java
System.out.print("Amit Shekhar");
System.out.println("Amit Shekhar");
```

- Kotlin

```kotlin
print("Amit Shekhar")
println("Amit Shekhar")
```

## 常量与变量(Constants and Variables)

- Java

```java
String name = "Amit Shekhar";
final String name = "Amit Shekhar";
```

- Kotlin

```kotlin
var name = "Amit Shekhar"
val name = "Amit Shekhar"
```

## null声明(Assigning the null value)

- Java

```java
String otherName;
otherName = null;
```

- Kotlin

```kotlin
var otherName : String?
otherName = null
```

## 空判断(Verify if value is null)

- Java

```java
if (text != null) {
    int length = text.length();
}
```

- Kotlin

```kotlin
text?.let {
    val length = text.length
}
// or simply
val length = text?.length
```


## 非空判断(Verify if value is NotNull OR NotEmpty)

- Java

```java
String sampleString = "Shekhar";
if (!sampleString.isEmpty()) {
    myTextView.setText(sampleString);
}
if(sampleString!=null && !sampleString.isEmpty()){
    myTextView.setText(sampleString); 
}
```

- Kotlin

```Kotlin
var sampleString ="Shekhar"
if(sampleString.isNotEmpty()){  //the feature of kotlin extension function
    myTextView.text=sampleString
}
if(!sampleString.isNullOrEmpty()){
   myTextView.text=sampleString 
}
```


## 字符串构造器(Concatenation of strings)

- Java

```java
String firstName = "Amit";
String lastName = "Shekhar";
String message = "My name is: " + firstName + " " + lastName;
```

- Kotlin

```Kotlin
var firstName = "Amit"
var lastName = "Shekhar"
var message = "My name is: $firstName $lastName"
```


## 字符串拼接(Substring)

- Java

```java
String firstName = "Amit";
String lastName = "Shekhar";
String message = "My name is: " + firstName + " " + lastName;
```

- Kotlin

```kotlin
val firstName = "Amit"
val lastName = "Shekhar"
val message = "My name is: $firstName $lastName"
```

## 字符串换行(New line in string)

- Java

```java
String text = "First Line\n" +
              "Second Line\n" +
              "Third Line";
```

- Kotlin

```kotlin
val text = """
        |First Line
        |Second Line
        |Third Line
        """.trimMargin()
```

## 三元表达式(Ternary Operations)

- Java

```java
String text = x > 5 ? "x > 5" : "x <= 5";
```

- Kotlin

```kotlin
val text = if (x > 5)
              "x > 5"
           else "x <= 5"
```

## 比特操作符(Bitwise Operators)

- java

```java
final int andResult  = a & b;
final int orResult   = a | b;
final int xorResult  = a ^ b;
final int rightShift = a >> 2;
final int leftShift  = a << 2;
final int unsignedRightShift = a >>> 2;
```

- Kotlin

```kotlin
val andResult  = a and b
val orResult   = a or b
val xorResult  = a xor b
val rightShift = a shr 2
val leftShift  = a shl 2
val unsignedRightShift = a ushr 2
```

## 类型判断和转换-声明式(Check the type and casting)

- Java

```java
if (object instanceof Car) {
}
Car car = (Car) object;
```

- Kotlin

```kotlin
if (object is Car) {
}
var car = object as Car
```

## 类型判断和转换-隐式(Check the type and casting, implicit)

- Java

```java
if (object instanceof Car) {
   Car car = (Car) object;
}
```

- Kotlin

```kotlin
if (object is Car) {
   var car = object // 聪明的转换
}
```

## 更灵活的if语句(Multiple conditions)

- Java

```java
if (score >= 0 && score <= 300) { }
```

- Kotlin

```kotlin
if (score in 0..300) { }
```

## 更灵活的case语句(Multiple Conditions, Switch case)

- Java

```java
int score = // some score;
String grade;
switch (score) {
    case 10:
    case 9:
        grade = "Excellent";
        break;
    case 8:
    case 7:
    case 6:
        grade = "Good";
        break;
    case 5:
    case 4:
        grade = "OK";
        break;
    case 3:
    case 2:
    case 1:
        grade = "Fail";
        break;
    default:
        grade = "Fail";
}
```

- Kotlin

```kotlin
var score = // some score
var grade = when (score) {
    9, 10 -> "Excellent"
    in 6..8 -> "Good"
    4, 5 -> "OK"
    in 1..3 -> "Fail"
    else -> "Fail"
}
```

## for循环(For-loops)

- Java

```java
for (int i = 1; i <= 10 ; i++) { }

for (int i = 1; i < 10 ; i++) { }

for (int i = 10; i >= 0 ; i--) { }

for (int i = 1; i <= 10 ; i+=2) { }

for (int i = 10; i >= 0 ; i-=2) { }

for (String item : collection) { }

for (Map.Entry<String, String> entry: map.entrySet()) { }
```

- Kotlin

```kotlin
for (i in 1..10) { }

for (i in 1 until 10) { }

for (i in 10 downTo 0) { }

for (i in 1..10 step 2) { }

for (i in 10 downTo 0 step 2) { }

for (item in collection) { }

for ((key, value) in map) { }
```

## 更方便的集合操作(Collections)

- Java

```java
final List<Integer> listOfNumber = Arrays.asList(1, 2, 3, 4);

final Map<Integer, String> keyValue = new HashMap<Integer, String>();
map.put(1, "Amit");
map.put(2, "Ali");
map.put(3, "Mindorks");

// Java 9
final List<Integer> listOfNumber = List.of(1, 2, 3, 4);

final Map<Integer, String> keyValue = Map.of(1, "Amit",
                                             2, "Ali",
                                             3, "Mindorks");
```

- Kotlin

```kotlin
val listOfNumber = listOf(1, 2, 3, 4)
val keyValue = mapOf(1 to "Amit",
                     2 to "Ali",
                     3 to "Mindorks")
```

## for-each遍历(for each)

- Java

```java
// Java 7 and below
for (Car car : cars) {
  System.out.println(car.speed);
}

// Java 8+
cars.forEach(car -> System.out.println(car.speed));

// Java 7 and below
for (Car car : cars) {
  if (car.speed > 100) {
    System.out.println(car.speed);
  }
}

// Java 8+
cars.stream().filter(car -> car.speed > 100).forEach(car -> System.out.println(car.speed));
cars.parallelStream().filter(car -> car.speed > 100).forEach(car -> System.out.println(car.speed));
```

- Kotlin

```kotlin
cars.forEach {
    println(it.speed)
}

cars.filter { it.speed > 100 }
      .forEach { println(it.speed)}

// kotlin 1.1+
cars.stream().filter { it.speed > 100 }.forEach { println(it.speed)}
cars.parallelStream().filter { it.speed > 100 }.forEach { println(it.speed)}
```

## 方法定义(Defining methods)

- Java

```java
void doSomething() {
   // logic here
}

void doSomething(int... numbers) {
   // logic here
}
```

- Kotlin

```kotlin
fun doSomething() {
   // logic here
}

fun doSomething(vararg numbers: Int) {
   // logic here
}
```


## 分割数组(Splitting arrays)

- Java

```java
String[] splits = "param=car".split("=");
String param = splits[0];
String value = splits[1];
```

- Kotlin

```kotlin
val (param, value) = "param=car".split("=")
```


## 方法定义(Defining methods)

- Java

```java
void doSomething() {
   // logic here
}
```

- Kotlin

```kotlin
fun doSomething() {
   // logic here
}
```


## 方法中参数的默认值(Default values for method parameters)

- Java

```java
double calculateCost(int quantity, double pricePerItem) {
    return pricePerItem * quantity;
}

double calculateCost(int quantity) {
    // default price is 20.5
    return 20.5 * quantity;
}
```

- Kotlin

```kotlin
fun calculateCost(quantity: Int, pricePerItem: Double = 20.5) = quantity * pricePerItem

calculateCost(10, 25.0) // 250
calculateCost(10) // 205
```


## 可变参数(Variable number of arguments)

- Java

```java
void doSomething(int... numbers) {
   // logic here
}
```

- Kotlin

```kotlin
fun doSomething(vararg numbers: Int) {
   // logic here
}
```


## 无参数，带返回值的方法(Defining methods with return)

- Java

```java
int getScore() {
   // logic here
   return score;
}
```

- Kotlin

```kotlin
fun getScore(): Int {
   // logic here
   return score
}

// as a single-expression function

fun getScore(): Int = score

// even simpler (type will be determined automatically)

fun getScore() = score // return-type is Int
```


## 有参数，带返回值的方法(Returning result of an operation)

- Java

```java
int getScore(int value) {
    // logic here
    return 2 * value;
}
```

- Kotlin

```kotlin
fun getScore(value: Int): Int {
   // logic here
   return 2 * value
}

// as a single-expression function
fun getScore(value: Int): Int = 2 * value

// even simpler (type will be determined automatically)

fun getScore(value: Int) = 2 * value // return-type is int
```


## 构造器(Constructors)

- Java

```java
public class Utils {

    private Utils() { 
      // This utility class is not publicly instantiable 
    }
    
    public static int getScore(int value) {
        return 2 * value;
    }
    
}
```

- Kotlin

```kotlin
class Utils private constructor() {

    companion object {
    
        fun getScore(value: Int): Int {
            return 2 * value
        }
        
    }
}

// another way

object Utils {

    fun getScore(value: Int): Int {
        return 2 * value
    }

}
```

## Getter和Setter(Getters and Setters)
- Java

```java
public class Developer {

    private String name;
    private int age;

    public Developer(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Developer developer = (Developer) o;

        if (age != developer.age) return false;
        return name != null ? name.equals(developer.name) : developer.name == null;

    }

    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + age;
        return result;
    }

    @Override
    public String toString() {
        return "Developer{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

- Kotlin

```kotlin
data class Developer(val name: String, val age: Int)
```


## 对象克隆或复制(Cloning or copying)

- Java

```java
public class Developer implements Cloneable {

    private String name;
    private int age;

    public Developer(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return (Developer)super.clone();
    }
}

// cloning or copying
Developer dev = new Developer("Messi", 30);
try {
    Developer dev2 = (Developer) dev.clone();
} catch (CloneNotSupportedException e) {
    // handle exception
}

```

- Kotlin

```kotlin
data class Developer(var name: String, var age: Int)

// cloning or copying
val dev = Developer("Messi", 30)
val dev2 = dev.copy()
// in case you only want to copy selected properties
val dev2 = dev.copy(age = 25)
```


## 类方法(Class methods)

- Java

```java
public class Utils {

    private Utils() { 
      // This utility class is not publicly instantiable 
    }
    
    public static int triple(int value) {
        return 3 * value;
    }
    
}

int result = Utils.triple(3);
```

- Kotlin

```kotlin
fun Int.triple(): Int {
  return this * 3
}

var result = 3.triple()
```


## 泛型(Generics)

- Java

```java
// Example #1
interface SomeInterface<T> {
    void doSomething(T data);
}

class SomeClass implements SomeInterface<String> {
    @Override
    public void doSomething(String data) {
        // some logic
    }
}

// Example #2
interface SomeInterface<T extends Collection<?>> {
    void doSomething(T data);
}

class SomeClass implements SomeInterface<List<String>> {

    @Override
    public void doSomething(List<String> data) {
        // some logic
    }
}
```

```java
interface SomeInterface<T> {
    fun doSomething(data: T)
}

class SomeClass: SomeInterface<String> {
    override fun doSomething(data: String) {
        // some logic
    }
}

interface SomeInterface<T: Collection<*>> {
    fun doSomething(data: T)
}

class SomeClass: SomeInterface<List<String>> {
    override fun doSomething(data: List<String>) {
        // some logic
    }
}
```

- Kotlin

```kotlin
fun Int.triple(): Int {
  return this * 3
}

var result = 3.triple()
```


## 定义未初始化的对象(Defining uninitialized objects)

- Java

```java
Person person;
```

- Kotlin

```kotlin
internal lateinit var person: Person
```


## 枚举(enum)

- Java

```java
public enum Direction {
        NORTH(1),
        SOUTH(2),
        WEST(3),
        EAST(4);

        int direction;

        Direction(int direction) {
            this.direction = direction;
        }

        public int getDirection() {
            return direction;
        }
    }
```

- Kotlin

```kotlin
enum class Direction(val direction: Int) {
    NORTH(1),
    SOUTH(2),
    WEST(3),
    EAST(4);
}
```


## List自定义排序(Sorting List)

- Java

```java
List<Profile> profiles = loadProfiles(context);
Collections.sort(profiles, new Comparator<Profile>() {
    @Override
    public int compare(Profile profile1, Profile profile2) {
        if (profile1.getAge() > profile2.getAge()) return 1;
        if (profile1.getAge() < profile2.getAge()) return -1;
        return 0;
    }
});
```

- Kotlin

```kotlin
val profile = loadProfiles(context)
profile.sortedWith(Comparator({ profile1, profile2 ->
    if (profile1.age > profile2.age) return@Comparator 1
    if (profile1.age < profile2.age) return@Comparator -1
    return@Comparator 0
}))
```


## 匿名类(Anonymous Class)

- Java

```java
 AsyncTask<Void, Void, Profile> task = new AsyncTask<Void, Void, Profile>() {
    @Override
    protected Profile doInBackground(Void... voids) {
        // fetch profile from API or DB
        return null;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
        // do something
    }
};
```

- Kotlin

```kotlin
val task = object : AsyncTask<Void, Void, Profile>() {
    override fun doInBackground(vararg voids: Void): Profile? {
        // fetch profile from API or DB
        return null
    }

    override fun onPreExecute() {
        super.onPreExecute()
        // do something
    }
}
```


## 非static（非静态）代码块（初始化块）(Initialization block)

- Java

```java
public class User {
    {  //Initialization block
        System.out.println("Init block");
    }
}

```

- Kotlin

```kotlin
   class User {
        init { // Initialization block
            println("Init block")
        }
    }
```


## 在 Kotlin 中需要了解的重要事项

- Kotlin 中的 Java 静态方法等价物是什么？
- “const”和“val”有什么区别？
- 学习 Kotlin - lateinit vs lazy
- 学习 Kotlin - apply vs with
- 学习 Kotlin - 数据类
- 学习 Kotlin - 解构声明
- 学习 Kotlin - 扩展函数
- 学习 Kotlin - 密封类
- 了解 Kotlin 中的高阶函数和 Lambda
- 了解 Kotlin 中的 inline、noinline 和 crossinline
- 在 Android 中掌握 Kotlin 协程 - 分步指南
- 在 Kotlin 中使用作用域函数 - let、run、with、also、apply
- Kotlin 中的具体类型是什么？
