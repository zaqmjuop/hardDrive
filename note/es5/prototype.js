// 原型链=>为了使js支持面对对象的继承特性而存在，prototype可以视为Class method和Class property的集合
// 通过将作为类的函数的prototype挂载到实例的__proto__来实现继承
typeof Object; // "function";
Object的原型 ===
  {
    __proto__: Function.prototype, // 由Function创建
    proptotype: {
      constructor: Object,
      __proto__: null // 说明Object是根对象
    }instanceof Object === false,
  };

typeof Function; // "function";
Function的原型 ===
  {
    __proto__: Function.prototype, // 创建者是自己的构造函数
    proptotype: {
      constructor: Function,
      __proto__: Object.prototype // 说明和其他对象一样是通过new Object()而来
    }
  };
// 一般函数
fn的原型 ===
  {
    __proto__: Function.prototype, // 自己是new Function()而来
    proptotype: {
      constructor: Person,
      __proto__: Object.prototype // 显示原型 是new Object()而来
    }
  };

obj的原型 ===
  {
    __proto__: Object.prototype // 自己是new Object()而来
    // 普通对象没有构造函数
  };
