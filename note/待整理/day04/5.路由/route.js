//1.引入express
let express = require('express')

//2.创建app服务对象
let app = express()

//3.定义路由
app.get('/',(request,response)=>{
    /*
    request对象：
        request.query	获取查询字符串参数，拿到的是一个对象
        request.params	获取get请求参数路由的参数，拿到的是一个对象
        request.body	获取post请求体，拿到的是一个对象（要借助一个中间件）
        request.get(xxxx)	获取请求头中指定key对应的value
    response对象
        response.send()	给浏览器做出一个响应
        response.end()	给浏览器做出一个响应（不会自动追加响应头）
        response.download()	告诉浏览器下载一个文件
        response.sendFile()	给浏览器发送一个文件
        response.redirect()	重定向到一个新的地址（url）
        response.set(header,value)	自定义响应头内容
        response.get()	获取响应头指定key对应的value
        response.status(code)	设置响应状态码
     */
    response.send('ok')
})

//参数路由
app.get('/meishi/:id',(request,response)=>{
  console.log(request.params);
  console.log(request.get('Connection'))
  response.send(`我是${request.params.id}商家`)
})

//4.端口监听
app.listen(3000,function (err) {
  if (!err) console.log('服务器启动成功')
  else console.log(err)
})