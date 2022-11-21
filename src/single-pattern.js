function Single(name) {
  this.name = name
  this.instance = null
}
Single.prototype.getName = function(){
  console.log(this.name)
}
Single.getInstance =  function(name){
  if(!this.instance){
    this.instance = new Single(name)
  }
  return this.instance
}
let  a = Single.getInstance('david')
let  b = Single.getInstance('gelon')
console.log(a)//Single { name: 'david', instance: null }
console.log(b)//Single { name: 'david', instance: null }
console.log(a === b)//true











