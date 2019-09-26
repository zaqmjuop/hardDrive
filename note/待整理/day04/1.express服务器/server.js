/*
* 使用express搭建服务器
*  */

//引入express
let express = require('express')

//创建服务对象(“服务员”)
let app = express()

//第一个参数：请求匹配的路由，第二个参数：回调函数
//根路由（后端路由）
app.get('/',function (request,response) {
  //什么时候能进入该回调函数？
  //1.路由必须是“/”或者不写
  //2.请求的方式必须是GET请求
  console.log(request.query); //query获取到的是:查询字符串参数
  response.send('挺好的')
})

//一级路由
app.get('/meishi',function (request,response) {
  console.log(a)
  response.send('我是美食界面')
})

//二级路由
app.get('/meishi/huoguo',function (request,response) {
  response.send('我是美食下属的火锅界面')
})

//根路由--响应的是post请求
app.get('/demo',function (request,response) {
  console.log(request.body); //获取post请求的请求体参数,还需要一个中间件的配合
  response.send('我是给你的响应，你发过来的是POST请求')
})

app.get('/shenghuo',function (request,response) {
  console.log(request.query);
  response.send('我是一些数据')
})

//绑定端口
app.listen(3000,function (err) {
  if(!err) console.log('服务器启动成功了')
  else console.log(err)
})

