var  duck = {
  duckSinging:function(){
    console.log("嘎嘎嘎")
  }
}

var  chicken = {
  duckSinging:function(){
    console.log("嘎嘎嘎")
  }
}

var choir  = []

var joinChoir  = function (animal){
  if(animal && typeof animal.duckSinging === 'function'){
    choir.push(animal)
    console.log("恭喜加入合唱团")
    console.log("合唱团已有成员数量："+choir.length)
  }
}
joinChoir(duck)
joinChoir(chicken)

// 并不在意加入的动物是谁，只要它有duckSinging方法就行




