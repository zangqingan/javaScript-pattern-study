// var func = function( a, b, c ){ 
//   console.log( [ a, b, c ] ); // 输出 [ 1, 2, 3 ] 
//   // console.log(this ===  window)
//   console.log(this ===  global)
// }; 
// func.apply( null, [ 1, 2, 3 ] ); 
// func.call( null, 1, 2, 3 ); 

var obj1 = { 
  name: 'sven' 
 }; 
 var obj2 = { 
  name: 'anne' 
 }; 
 global.name = 'global'; 
 var getName = function(){ 
  console.log( this.name ); 
 }; 
 getName(); // 输出: window 
 getName.call( obj1 ); // 输出: sven 
 getName.call( obj2 ); // 输出: anne 







