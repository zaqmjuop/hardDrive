//引入数据库连接模块
let db = require('./db')
//引入studentsModel
let stuModel = require('./model/studentsModel')
let teacModel = require('./model/teachersModel')

;(async()=>{
  //等待数据库连接成功
  await db

  //进行数据库的CRUD
  let result = await stuModel.find({age:25})
  console.log(result)

  let result2 = await teacModel.create({
    teac_id:'20190821001',
    name:'佩奇',
    age:82,
    sex:'男',
    info:222222,
    hobby:['男','吃饭','抽烟','烫头']
  })
  console.log(result2)

})()

