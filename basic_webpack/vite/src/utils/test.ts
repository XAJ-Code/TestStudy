interface IUser {
    id: number;
    name: string;
    email: string;
    age: number;
}

interface ISuperUser extends IUser {
    role: string;
}

let user: IUser = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    age: 30
}
let superUser: ISuperUser = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    age: 30,
    role: "admin"
}
let a:string = ''
let b:number = 1
b.valueOf()
user= superUser; // OK
//superUser = user; // Error---这就ts中的逆变，当你把父类赋值给子类，类型不安全，这个过程称为逆变