class Person {
  String name;
  int age;
  Person(this.name, this.age);
  void sayHello() {
    print("Hello, my name is $name, I'm $age years old.");
  }
}

void main() {
  var p = Person("Tom", 20);
  p.sayHello();
}