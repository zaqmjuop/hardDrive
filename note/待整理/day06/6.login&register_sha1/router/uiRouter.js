/*
* 该模块是UI路由器，专门用于展示项目的页面
* */

let {Router} = require('express')
//引入path，专用于解决路径问题
let {resolve} = require('path')
//引入模型对象
let userModel = require('../model/usersModel')
//引入解析cookie中间件
let cookieParser = require('cookie-parser')

let router = new Router()
router.use(cookieParser())
//UI路由--登录
router.get('/login',(request,response)=>{
  let {email} = request.query
  response.render('login',{errMsg:{email}})
})

//UI路由--注册
router.get('/register',(request,response)=>{
  response.render('register',{errMsg:{}})
})

//UI路由--个人中心
router.get('/user_center',async(request,response)=>{
  let {_id} = request.session
  if(_id){
    try{
      let result = await userModel.findOne({_id})
      if(result){
        response.render('user_center',{nickName:result.nick_name})
      }else{
        console.log('用户非法修改了cookie')
        response.redirect('/login')
      }
    }
    catch(err){
      console.log(err)
      response.redirect('/login')
    }
  }else{
    response.redirect('/login')
  }

})

module.exports = router