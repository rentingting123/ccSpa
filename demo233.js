
function f(a){
  let ret = this.ret||a
  function add(b){
    ret+=b
    return add
  }
  add.out=()=>ret
  return add
}
console.log(f(1)(2)(3).out())