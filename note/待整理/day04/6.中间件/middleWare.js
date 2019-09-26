/*
 中间件：
     概念：本质上就是一个函数，包含三个参数：request、response、next

 作用：
        1)	执行任何代码。
        2)	修改请求和响应对象。
        3)	终结请求-响应循环。
        4)	调用堆栈中的下一个中间件或路由。
  分类：
        1)	应用(全局)级中间件（过滤非法的请求，例如防盗链）
              --第一种写法：app.use((request,response,next)=>{})
              --第二种写法：使用函数定义
        2)	第三方中间件（通过npm下载的中间件，例如body-parser）
              --app.use(bodyParser.urlencoded({extended:true}))
        3)	内置中间件（express内部封装好的中间件）
              --app.use(express.urlencoded({extended:true}))
              --app.use(express.static('public'))
        4)	路由器中间件 （Router）
              --后面讲
   备注：
        1.在express中，定义路由和中间件的时候，根据定义的顺序（代码的顺序），将定义的每一个中间件或路由，
        放在一个类似于数组的容器中，当请求过来的时候，依次从容器中取出中间件和路由，进行匹配，如果匹配
        成功，交由该路由或中间件处理。
        2.对于服务器来说，一次请求，只有一个请求对象，和一个响应对象，其他任何的request和response都是对二者的引用。
 */

let express = require('express')

//引入第三方中间件，用于解析post请求请求体参数
let bodyParser = require('body-parser')

let app = express()


//定义应用级中间件------第一种写法
app.use((request,response,next)=>{
  request.haha = 123
  //response.send('我是应用级中间件')
  //console.log('应用级中间件的回调函数被调用了')
  //next()//让下一个能匹配上的中间件或路由生效
  /*if(request.get('Referer').split('/')[2] === 'localhost:63343'){
    next()
  }else{
    response.sendFile(__dirname+'/public/err.png')
  }*/
  next()
})

//使用第三方中间件，用于解析post请求请求体参数
//app.use(bodyParser())
//bodyParser中间件先解析post请求过来的参数为一个对象，随后将该对象挂载到request的body属性上
//app.use(bodyParser.urlencoded({extended:true}))

//使用内置中间件，用于解析post请求请求体参数
app.use(express.urlencoded({extended:true}))

//使用内置中间件，用于暴露静态资源
app.use(express.static('./public'))

//定义应用级中间件------第二种写法
function demo(request,response,next) {
  if(request.get('Referer').split('/')[2] === 'localhost:63343'){
    next()
  }else{
    response.sendFile(__dirname+'/public/err.png')
  }
}

//定义根路由
app.get('/',(request,response)=>{
  console.log(request.haha)
  response.send('根路由---ok')
})

//定义一级路由
app.post('/login',(request,response)=>{
  console.log(request.body);
  response.send('login----ok')
})

//交给用户登录界面
app.get('/login',(request,response)=>{
  response.send('login-----ok')
})

app.get('/pic',demo,(request,response)=>{
  response.sendFile(__dirname+'/public/timg.jpg')
})



app.listen(3000,function (err) {
  if (!err) console.log('服务器启动成功')
  else console.log(err)
})