/*
* 如何在Node环境下操作数据库（MongoDB）
* MongoDB ---- 数据库的品牌
* mongod ---- 启动数据库的命令
* mongo ---- 连接数据库的命令
* mongoose ---- 是一个框架(库)，能够帮助编码人员在Node环境下轻松的、稳定、高效的操作MongoDB数据库
* */

//使用mongoose连接MongoDB

//1.引入mongoose
let mongoose = require('mongoose')

//2.指定连接数据库的地址
mongoose.connect('mongodb://127.0.0.1:27017/test',{useNewUrlParser: true})

//交给Promise去管理数据库的连接状态
let dbPromise = new Promise(function (resolve,reject) {
  //3.监听数据库的连接状态
  mongoose.connection.on('open',function (err) {
    if(!err){
      resolve()
      console.log('数据库连接成功了')
    }else{
      reject(err)
      console.log(err)
    }
  })
})

//第一种写法
/*dbPromise
  .then(function(){
      console.log('操作数据库的代码')
  },function(err){
      console.log(err)
  })*/

//第二种写法
/*dbPromise
  .then(function () {
      console.log('操作数据库的代码')
  }).catch(function (err) {
      console.log(err)
  })*/

//第三种写法
;(async()=>{
  await dbPromise
  console.log('操作数据库的代码')
})()










