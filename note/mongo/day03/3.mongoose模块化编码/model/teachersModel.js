/*
* 该模块用于：创建teachers模型
* */
let mongoose = require('mongoose')

//1.请来一个“保安”，帮助你“看门”   -----------   引入模式对象
let Schema = mongoose.Schema

//2.制定进入你家的“规则” ---------------  实例化约束
let teaSchema = new Schema({
  teac_id:{
    type:String,//类型只能是字符串
    unique:true,//唯一
    required:true//必填
  },
  name:{
    type:String,
    required:true
  },
  age:{
    type:Number,
    required:true
  },
  sex:{
    type:String,
    required:true
  },
  info:Schema.Types.Mixed, //可以接受所有类型
  hobby:[String],
  date:{
    type:Date,
    default:Date.now(),
  },
  enable_flag:{
    type:String,
    default:'Y'
  }
})

//3.把你的规则告诉保安 ------------  构建模型对象
let teaModel = mongoose.model('teachers2',teaSchema) //第一个参数就是数据库中集合的名字，第二个参数是“规则”
//模型对象身上有着所有CRUD的API

module.exports = teaModel