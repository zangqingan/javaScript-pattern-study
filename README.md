# 一、JavaScript设计模式学习
JavaScript是一门典型的动态类型语言，这一切都是建立在鸭子类型(duck typing)上。所谓鸭子类型简单说就是：“如果它走起
路来像鸭子，叫起来也是鸭子，那么它就是鸭子。”鸭子类型指导我们只关注对象的行为，而不关注对象本身，也就是关注 HAS-A, 而不是 IS-A。只要它嘎嘎嘎叫哪就是鸭子，，，，。

## 1.1 多态
多态的实际含义是：同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果。换句话说，给不同的对象发送同一个消息的时候，这些对象会根据这个消息分别给出不同的反馈。其实也就是对象的同一个方法，但是方法里的内容不一样。
多态背后的思想是将“做什么”和“谁去做以及怎样去做”分离开来，也就是将“不变的事
物”与 “可能改变的事物”分离开来。在这个故事中，动物都会叫，这是不变的，但是不同类
型的动物具体怎么叫是可变的。把不变的部分隔离出来，把可变的部分封装起来，这给予了我们
扩展程序的能力，程序看起来是可生长的，也是符合开放—封闭原则的，相对于修改代码来说，
仅仅增加代码就能完成同样的功能，这显然优雅和安全得多。

## 1.2 封装
封装的目的是将信息隐藏。
### 1.2.1 封装数据
在许多语言的对象系统中，封装数据是由语法解析来实现的，这些语言也许提供了 private、
public、protected 等关键字来提供不同的访问权限。但 JavaScript 并没有提供对这些关键字的支持，我们只能依赖变量的作用域来实现封装特性，而且只能模拟出 public 和 private 这两种封装性。当然在es6之后已经有块作用域以及symbol数据类型，也有了private的提案所以还是比较方便。不像es5之前通过函数作用域、闭包的手段来实现是非常麻烦的。
var myObject = (function(){ 
 var __name = 'sven'; // 私有（private）变量
 return { 
  getName: function(){ // 公开（public）方法
  return __name; 
 } 
 } 
})(); 
console.log( myObject.getName() ); // 输出：sven 
console.log( myObject.__name ) // 输出：undefined
### 1.2.2 封装实现
封装的目的是将信息隐藏，封装应该被视为“任何形式的封装”，也就是说，封装不仅仅是
隐藏数据，还包括隐藏实现细节、设计细节以及隐藏对象的类型等.

## 1.3 JavaScript的原型模式
原型编程中的一个重要特性，即当对象无法响应某个请求时，会把该请求委
托给它自己的原型。基于原型链的委托机制就是原型继承的本质。
原型编程范型至少包括以下基本规则。其实也就是js学习中总结的5条内容。
 1.所有的数据都是对象。
 2.要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它。
 3.对象会记住它的原型。
 4.如果对象无法响应某个请求，它会把这个请求委托给它自己的原型。

1.所有的数据都是对象。
JavaScript中绝大部分数据都是对象，也一定会有一个根对象存在，这些对象追根溯源都来源于这个根对象。这个根对象就是 Object.prototype 对象。Object.prototype 对象是一个空的
对象。即 Object.prototype = {}

2.要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它。
在 JavaScript 语言里，我们并不需要关心克隆的细节，因为这是浏览器引擎内部负责实现的。我们所需要做的只是显式地调用 var obj1 = new Object()或者字面量声明 var obj2 = {}或者new 构造函数()。此时，浏览器引擎内部会从Object.prototype 上面克隆一个对象出来，我们最终得到的就是这个对象。 

3.对象会记住它的原型。
就 JavaScript 的真正实现来说，其实并不能说对象有原型，而只能说对象对应的构造函数有原型。对于“对象把请求委托给它自己的原型”这句话，更好的说法是对象把请求委托给它的构造函数的原型。浏览器给JavaScript 对象提供了一个名为__proto__的隐藏属性叫隐式原型，某个对象的__proto__属性默认会指向它对应的构造函数的原型对象，即{Constructor}.prototype。

4.如果对象无法响应某个请求，它会把这个请求委托给它自己的原型。
在 JavaScript 中，每个对象都是从 Object.prototype 对象克隆而来的，如果是这样的话，
我们只能得到单一的继承关系，即每个对象都继承自 Object.prototype 对象，这样的对象系统显然是非常受限的。实际上，虽然 JavaScript 的对象最初都是由 Object.prototype 对象克隆而来的，但对象构造器的原型并不仅限于 Object.prototype 上，而是可以动态指向其他对象。也就是人为指定。这样一来，当对象 a 需要借用对象 b 的能力时，可以有选择性地把对象 a 的构造器的原型指向对象 b，从而达到继承的效果。这也就是JavaScript中最常用的原型继承方式。例子：
var obj = { name: 'sven' }; 
var A = function(){}; 
A.prototype = obj; //A构造函数的显式原型指向了obj对象
var a = new A(); 
console.log( a.name ); // 输出：sven 
执行这段代码的时候，引擎做了哪些事情。
首先，尝试遍历对象 a 中的所有属性，但没有找到 name 这个属性。
查找 name 属性的这个请求被委托给对象 a 的构造器的原型，它被 a.__proto__ 记录着并且指向 A.prototype，而 A.prototype 被设置为对象 obj。
在对象 obj 中找到了 name 属性，并返回它的值

而当我们期望得到一个“类”继承自另外一个“类”的效果时，就可以这样来实现。
var A = function(){}; 
A.prototype = { name: 'sven' }; 
var B = function(){}; 
B.prototype = new A(); 
var b = new B(); 
console.log( b.name ); // 输出：sven
最终一直找到Object.prototype上，如果还没有就返回undefined。








## 1.4 this、call、apply
this、Function.prototype.call 和Function.prototype.apply 这两个方法有着广泛的运用。
### 1.4.1 this
跟别的语言大相径庭的是，JavaScript的this总是指向一个对象，而具体指向哪个对象是在运行时基于函数的执行环境动态绑定的，而非函数被声明时的环境。
常见的this指向有以下几种：
  以普通函数的形式调用时，此时的 this 总是指向全局对象。在浏览器的 JavaScript 里，这个全局对象是 window 对象。
  以对象方法的形式调用时，this就是调用这个方法的那个对象
  以构造函数调用，this就是新实例化创建的那个对象。
  使用函数对象的call()，apply()，bind()调用时可以指定一个对象作为第一个参数，此时这个对象成为函数执行的this。


### 1.4.2 call、apply、bind
ECAMScript 3给Function的原型定义了两个方法，它们是Function.prototype.call和Function.prototype.apply。它们的作用一模一样即可以动态地改变传入函数的 this，区别仅在于传入参数形式的不同。 
apply(参数1,参数2) 接受两个参数，第一个参数指定了函数体内 this 对象的指向，第二个参数为一个带下标的集合，这个集合可以为数组，也可以为类数组，apply 方法把这个集合中的元素作为参数传递给被调用的函数
var func = function( a, b, c ){ 
 alert ( [ a, b, c ] ); // 输出 [ 1, 2, 3 ] 
}; 
func.apply( null, [ 1, 2, 3 ] ); 
在这段代码中，参数 1、2、3 被放在数组中一起传入 func 函数，它们分别对应 func 参数列
表中的 a、b、c。

call 传入的参数数量不固定，跟 apply 相同的是，第一个参数也是代表函数体内的 this 指向，从第二个参数开始往后，每个参数被依次传入函数：
var func = function( a, b, c ){ 
 alert ( [ a, b, c ] ); // 输出 [ 1, 2, 3 ] 
}; 
func.call( null, 1, 2, 3 ); 

当调用一个函数时，JavaScript 的解释器并不会计较形参和实参在数量、类型以及顺序上的
区别，JavaScript 的参数在内部就是用一个数组来表示的arguments类数组对象。从这个意义上说，apply 比 call 的使用率更高，我们不必关心具体有多少参数被传入函数，只要用 apply 放到一个数组中一股脑地推过去就可以了。而call 是包装在 apply 上面的一颗语法糖，如果我们明确地知道函数接受多少个参数，而且想一目了然地表达形参和实参的对应关系，那么也可以用 call 来传送参数。

当使用 call 或者 apply 的时候，如果我们传入的第一个参数为 null，函数体内的 this 会指
向默认的宿主对象，在浏览器中就是 window对象，在node中就是global对象。

所以call和apply的作用是
1.改变 this 指向
在实际开发中，经常会遇到 this 指向被不经意改变的场景，比如有一个 div 节点，div 节点
的 onclick 事件中的 this 本来是指向这个 div 的：
document.getElementById( 'div1' ).onclick = function(){ 
 alert( this.id ); // 输出：div1 
}; 
假如该事件函数中有一个内部函数 func，在事件内部调用 func 函数时，func 函数体内的 this
就指向了 window，而不是我们预期的 div，见如下代码：
document.getElementById( 'div1' ).onclick = function(){ 
 alert( this.id ); // 输出：div1 
 var func = function(){ 
 alert ( this.id ); // 输出：undefined 
 } 
 func(); 
}; 
这时候我们用 call 来修正 func 函数内的 this，使其依然指向 div：
document.getElementById( 'div1' ).onclick = function(){ 
 var func = function(){ 
 alert ( this.id ); // 输出：div1 
 } 
 func.call( this ); 
};


2.Function.prototype.bind
这个方法也是用来指定函数内部的 this指向，不过本质上还是使用call和apply方法实现的。

3.借用其它对象的方法也就是对象冒充


## 1.5 闭包和高阶函数
### 1.5.1 闭包
对于 JavaScript 程序员来说，闭包（closure）是一个难懂又必须征服的概念。闭包的形成与
变量的作用域以及变量的生存周期密切相关。
1.变量的作用域
### 1.5.2 高阶函数
高阶函数是指至少满足下列条件之一的函数。
函数可以作为参数被传递；
函数可以作为返回值输出。












