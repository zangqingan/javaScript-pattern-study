// 主人家里养了两只动物，分别是一只鸭和一只鸡，当主人向它们发出“叫”的命令
// 时，鸭会“嘎嘎嘎”地叫，而鸡会“咯咯咯”地叫。这两只动物都会以自己的方式来发
// 出叫声。它们同样“都是动物，并且可以发出叫声”，但根据主人的指令，它们会各自
// 发出不同的叫声

// var makeSound = function (animal){
//   if(animal instanceof Duck){
//     console.log("嘎嘎嘎")
//   }else if(animal instanceof Chicken){
//     console.log("咯咯咯")
//   }
// }
// var Duck = function(){}
// var Chicken = function(){}

// makeSound(new Duck())//嘎嘎嘎
// makeSound(new Chicken())//咯咯咯
//当我们分别向鸭和鸡发出“叫唤”的消息时，它们根据此消息作出了各自不同的反应。
//但是明显还不够，如果再加一条狗那就要修改makeSound函数了。现在这是不太优雅的。

var makeSound = function (animal){
  animal.sound()//不变的隔离起来
}
var Duck = function(){}
Duck.prototype.sound = function (){
  console.log("嘎嘎嘎")//可变的部分各自封装起来
}
var Chicken = function(){}
Chicken.prototype.sound = function(){
  console.log("咯咯咯")//可变的部分各自封装起来
}
makeSound(new Duck())//嘎嘎嘎
makeSound(new Chicken())//咯咯咯

// 这时添加一条狗叫也是非常简单的
var  Dog = function(){}
Dog.prototype.sound = function(){
  console.log("汪汪汪")
}
makeSound(new Dog())//汪汪汪

//一个 JavaScript 对象，既可以表示 Duck 类型的对象，又可以表示 Chicken 类型的对象，这意味着 JavaScript 对象的多态性是与生俱来的