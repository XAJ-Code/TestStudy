# Dart语言简介
## 1.1 Dart语言简介
Dart语言是由Google开发的一种开源的、面向对象的、单继承的、类和Mixin的多重编程语言。Dart语言可以用于构建web、服务器、移动应用和桌面应用。

Dart语言的主要特点包括：
- 面向对象：Dart语言是一种面向对象的编程语言，支持类、对象、继承、多态等面向对象的基本概念。
- 强类型：Dart语言是一种强类型语言，所有的变量都必须声明类型，并且在编译时进行类型检查。
- 语法简洁：Dart语言的语法简洁明了，易于学习和使用。
- 跨平台：Dart语言可以运行在多个平台上，包括web、服务器、移动应用和桌面应用。
- 异步编程：Dart语言支持异步编程，可以使用async和await关键字来处理异步操作。
- 垃圾回收：Dart语言内置了垃圾回收机制，可以自动管理内存。
- 标准库：Dart语言提供了一套丰富的标准库，包括文件操作、网络请求、图形界面等。
- 社区支持：Dart语言拥有一个活跃的社区，提供了大量的第三方库和工具。
- Dart内置了健全的空值安全机制，可以避免空指针异常。
- Dart支持JIT(即时编译)和AOT(预编译)两种编译方式，可以在开发阶段使用JIT编译，提高开发效率，在发布阶段使用AOT编译，提高运行效率。

## 1.2 Dart语言的基本数据类型
1. Dart语言支持以下基本数据类型：
```dart
// 小写开头：
int number = 42;
double price = 99.9;
num count = 1;      // num 可以是整数或浮点数,num是int和double的父类
bool isValid = true;

// 大写开头：
String name = 'Zhang San';  // String是一个类
String name1 = String('Zhang San');  // 两种创建方式，推荐第一种
List<int> numbers = [1, 2, 3];
Map<String, int> scores = {'张三': 90};
Set<int> uniqueNumbers = {1, 2, 3};
```
2. Dart类型转换
```dart
// 数字转换
int number = 42;
String numberStr = number.toString();    // 转为String
double doubleNum = number.toDouble();    // 转为double

// 字符串转换
String numStr = "42";
int parsedInt = int.parse(numStr);       // 字符串转int
double parsedDouble = double.parse("42.5"); // 字符串转double
```

## 1.3 Dart语言的操作符
1. 算术运算符
```dart
int a = 10;
int b = 3;
print(a + b); // 13
print(a - b); // 7
print(a * b); // 30
print(a / b); // 3.3333333333333335
print(a ~/ b); // 3 取整
print(a % b); // 1 取余
```
2. 字符串常用方法
- contains() 判断字符串是否包含某个子字符串
- indexOf() 返回子字符串在字符串中的索引，如果不存在则返回-1
- lastIndexOf() 返回子字符串在字符串中最后一次出现的索引，如果不存在则返回-1
- length 获取字符串的长度
- replaceAll() 替换字符串中的所有匹配项
- split() 将字符串分割成子字符串列表
- substring() 获取字符串的子字符串
- toLowerCase() 将字符串转换为小写
- toUpperCase() 将字符串转换为大写
- trim() 去除字符串两端的空白字符
- **注:类似js中的字符串操作**

# 总结
- 所有的类型都是对象，都继承自Object
- Dart是强类型语言，但支持类型推断
- Dart支持可选类型和默认值
- Dart支持泛型
- Dart支持操作符重载
- Dart支持函数式编程，支持高阶函数、闭包等概念