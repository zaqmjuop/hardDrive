/*
* 该模块负责：连接数据库，暴露出去一个dbPromise，标识着数据库的连接状态
* */

//1.引入mongoose
let mongoose = require('mongoose')
mongoose.set('useCreateIndex',true)

//配置
const DB_NAME = 'demo'
const DB_URL = '127.0.0.1:27017'

//2.指定连接数据库的地址
mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`,{useNewUrlParser: true})
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

//暴露dbPromise
module.exports = dbPromise