//引入express库
let express = require('express')
//引入数据库连接模块
let db = require('./db')

//创建app服务对象
let app = express()
//使用内置中间件，用于解析post请求参数
app.use(express.urlencoded({extended:true}))
//使用内置中间件，暴露静态资源
app.use(express.static('./public'))
//引入业务路由器
let loginRegisterRouter = require('./router/loginRegisterRouter')
//引入UI路由器
let uiRouter = require('./router/uiRouter')

//能进入then表示数据库连接成功了
db.then(()=>{
  //使用业务路由器
  app.use(loginRegisterRouter)

  //使用UI路由器
  app.use(uiRouter)

}).catch((err)=>{
  console.log('数据库连接失败',err)
})

//端口监听
app.listen(3000,function (err) {
  if (!err) console.log('服务器启动成功')
  else console.log(err)
})