

class Person {
  String name;
  int age;
  Person(this.name, this.age);
  void sayHello() {
    print("Hello, my name is $name, I'm $age years old.");
  }
}

 //拼接字符串
 String sayHello(){
  const String name = "张三";
  const age = '18';
  final String str = name + "今年" + age + "岁";
  print(str);
  return str;
 }

void main() {
  sayHello();
}