let express = require('express')

let app = express()
app.use(express.static('./public'))
app.use(express.urlencoded({extended:true}))

app.post('/acquire_code',(request,response)=>{
  //返回一个从1000 - 9999之间的一个随机数字
  setTimeout(()=>{
    let number = Math.floor(Math.random()*8999 + 1000)
    response.send(number.toString())
  },2000)
})

app.listen(3000,function (err) {
  if (!err) {
    console.log('服务器启动成功')
    console.log('测试取消上一次请求的地址：http://localhost:3000/code.html')
    console.log('禁止通过编译器去打开网页！！！！！！')
  }
  else console.log(err)
})