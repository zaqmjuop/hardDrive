let express = require('express')

let app = express()
app.use(express.static('./public'))
app.use(express.urlencoded({extended:true}))

app.get('/test_get',(request,response)=>{
  console.log(request.query);
  response.send('你发来的是GET请求，我是响应的数据')
})

app.post('/test_post',(request,response)=>{
  console.log(request.body);
  response.send('你发来的是POST请求，我是响应的数据')
})

app.listen(3000,function (err) {
  if (!err) {
    console.log('服务器启动成功')
    console.log('测试原生js发送Ajax-GET请求的地址为：http://localhost:3000/ajax_get.html')
    console.log('测试原生js发送Ajax-POST请求的地址为：http://localhost:3000/ajax_post.html')
    console.log('禁止通过编译器去打开网页！！！！！！')
  }
  else console.log(err)
})