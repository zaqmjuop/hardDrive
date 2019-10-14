function Animal(name, age) {
  this.name = name;
  this.age = age;
  return this;
}
Animal.prototype.eat = function(food) {
  console.log(`${this.name} eat ${food}`);
  return this;
};
function Dog(name, age) {
  // const p = new Animal(name, age);
}
Dog.prototype.__proto__ = Animal.prototype
// const  a = new Animal('s', 19)
// console.log(a)
const d = new Dog();
console.log(d)
