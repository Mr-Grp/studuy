- 设计模式的核心操作是去观察你整个逻辑里面的变与不变，然后将变与不变分离，达到使变化的部分灵活、不变的地方稳定的目的。

# 1. 构造器/构造函数

```
function User(name , age, career) {
    this.name = name
    this.age = age
    this.career = career
}
```

- 不用手写字面量
- 在 JavaScript 中，我们使用构造函数去初始化对象，就是应用了构造器模式
- 确保了共性的不变，确保了个性的灵活

* 如果在使用构造器模式的时候，我们本质上是去抽象了每个对象实例的变与不变

# 2. 工厂模式

- 那么使用工厂模式时，我们要做的就是去抽象不同构造函数（类）之间的变与不变。（如果不用工厂模式，可能会有好几个角色构造函数）
- 工厂模式其实就是将创建对象的过程单独封装
- 就是为了实现无脑传参

```
function User(name , age, career, work) {
    this.name = name
    this.age = age
    this.career = career
    this.work = work
}

function Factory(name, age, career) {
    let work
    switch(career) {
        case 'coder':
            work =  ['写代码','写系分', '修Bug']
            break
        case 'product manager':
            work = ['订会议室', '写PRD', '催更']
            break
        case 'boss':
            work = ['喝茶', '看报', '见客户']
        case 'xxx':
            // 其它工种的职责分配
            ...

    return new User(name, age, career, work)
}
```
