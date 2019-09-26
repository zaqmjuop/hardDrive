/*
* 该模块是UI路由器，专门用于展示项目的页面
* */

let {Router} = require('express')
//引入path，专用于解决路径问题
let {resolve} = require('path')

let router = new Router()

//注册UI路由--登录
router.get('/login',(request,response)=>{
  let {email} = request.query

  response.render('login',{errMsg:{email}})
})

//注册UI路由--注册
router.get('/register',(request,response)=>{
  response.render('register',{errMsg:{}})
})

module.exports = router