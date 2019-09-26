//引入express库
let express = require('express')
//引入数据库连接模块
let db = require('./db')
//引入模型对象
let usersModel = require('./model/usersModel')

//创建app服务对象
let app = express()
//使用内置中间件，用于解析post请求参数
app.use(express.urlencoded({extended:true}))
//使用内置中间件，暴露静态资源
app.use(express.static('./public'))

db.then(()=>{
  //数据库连接成功了
  //注册业务路由
  app.post('/register',async(request,response)=>{
    /*
    * 1.获取用户发过来的：邮箱、昵称、密码、确认密码
    * 2.校验数据的合法性
    *     --通过：下一步
    *     --未通过：驳回（告诉驳回的原因）
    * 3.去数据中查找，该邮箱是否注册过
    *     --注册过：驳回
    *     --未注册：写入数据库
    * */

    //1.获取用户发过来的：邮箱、昵称、密码、确认密码
    let {email,nick_name,pwd,re_pwd} = request.body
    //2.定义正则校验规则
    const emailReg = /^[a-zA-Z0-9_]{2,20}@[a-zA-Z0-9]{2,8}\.com$/
    const nickNameReg = /[\u4e00-\u9fa5]/gm
    const pwdReg = /^[a-zA-Z0-9!@#$%^&*()_+]{6,20}$/

    //3.校验数据
    if(!emailReg.test(email)){
      response.send('邮箱输入不合法，形如为：用户名@主机名.com，用户名2-20位，主机名2-8位')
      return
    }
    if(!nickNameReg.test(nick_name)){
      response.send('昵称输入不合法，昵称只能为中文')
      return
    }
    if(!pwdReg.test(pwd)){
      response.send('密码输入不合法，密码为6-20位')
      return
    }
    if(pwd !== re_pwd){
      response.send('两次输入密码不一致')
      return
    }

    /*把可能要出错的代码，放在try中，
        ---如果不出错，正常执行代码，不会来到catch里。
        ---如果出错了，在当前出错的位置定下来，带着错误信息，来到catch中，将错误报告给你
    */
    try {
      //4.查询该邮箱是否注册过
      let findResult = await usersModel.findOne({email})
      if(findResult){
        response.send('该邮箱已经注册过，请更换')
      }else{
        await usersModel.create({email,nick_name,pwd})
        response.send(`${email}邮箱注册成功了！`)
      }
    }
    catch(err){
      //1.引入错误计数模块 2.引入报警模块
      console.log(err)
      response.send('网络不稳定，稍后重试')
    }

    

  })

  //登录业务路由
  app.post('/login',async(request,response)=>{
    /*
  * 1.获取用户发过来的：邮箱、昵称、密码、确认密码
  * 2.校验数据的合法性
  *     --通过：下一步
  *     --未通过：驳回（告诉驳回的原因）
  * 3.去数据中查找，是否存在该邮箱及该邮箱所对应的密码
  *     --有：登录成功
  *     --无：登录失败
  * */

    //1.获取用户发过来的：邮箱、昵称、密码、确认密码
    let {email,pwd} = request.body
    //定义正则
    const emailReg = /^[a-zA-Z0-9_]{2,20}@[a-zA-Z0-9]{2,8}\.com$/
    const pwdReg = /^[a-zA-Z0-9!@#$%^&*()_+]{6,20}$/
    //进行校验
    if(!emailReg.test(email)){
      response.send('邮箱输入不合法，形如为：用户名@主机名.com，用户名2-20位，主机名2-8位')
      return
    }
    if(!pwdReg.test(pwd)){
      response.send('密码输入不合法，密码为6-20位')
      return
    }

    try {
      let result = await usersModel.findOne({email,pwd})
      if(result){
        response.redirect('https://www.baidu.com')
      }else{
        response.send('登陆失败，邮箱或密码错误')
      }
    }
    catch(err){
      //1.引入计数模块 2.引入报警模块
      console.log(err)
      response.send('网络不稳定，稍后重试')
    }

  })

  //注册UI路由--登录
  app.get('/login',(request,response)=>{
    response.sendFile(__dirname+'/public/login.html')
  })

  //注册UI路由--注册
  app.get('/register',(request,response)=>{
    response.sendFile(__dirname+'/public/register.html')
  })

}).catch((err)=>{
  console.log('数据库连接失败',err)
})

//端口监听
app.listen(3000,function (err) {
  if (!err) console.log('服务器启动成功')
  else console.log(err)
})