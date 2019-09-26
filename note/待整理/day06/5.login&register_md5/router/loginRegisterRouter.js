/*
* 该模块为业务路由器，专门用于响应登录与注册的业务请求
* */

//获取路由器类
let {Router} = require('express')
let md5 = require('md5')

//引入模型对象
let usersModel = require('../model/usersModel')

//实例化一个路由器
let router = new Router()

//注册业务路由
router.post('/register',async(request,response)=>{
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
  //定义一个错误对象
  const errMsg = {}

  //3.校验数据
  if(!emailReg.test(email)){
    errMsg.emailErr = '邮箱输入不合法，形如为：用户名@主机名.com，用户名2-20位，主机名2-8位'
  }
  if(!nickNameReg.test(nick_name)){
    errMsg.nickNameErr = '昵称输入不合法，昵称只能为中文'
  }
  if(!pwdReg.test(pwd)){
    errMsg.pwdErr = '密码输入不合法，密码为6-20位'
  }
  if(pwd !== re_pwd){
    errMsg.rePwdErr = '两次输入密码不一致'
  }
  //判断用户是否有输入错误的项
  if(JSON.stringify(errMsg) !== '{}'){
    response.render('register',{errMsg})
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
      errMsg.emailErr = '该邮箱已经注册过，请更换'
      response.render('register',{errMsg})
    }else{
      await usersModel.create({email,nick_name,pwd:md5(pwd)})
      response.redirect(`/login?email=${email}`)
    }
  }
  catch(err){
    //1.引入计数模块 2.引入报警模块
    console.log(err)
    errMsg.networkErr = '网络不稳定，稍后重试'
    response.render('register',{errMsg})
  }



})

//登录业务路由
router.post('/login',async(request,response)=>{
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
  const errMsg = {}
  //进行校验
  if(!emailReg.test(email)){
    errMsg.emailErr = '邮箱输入不合法，形如为：用户名@主机名.com，用户名2-20位，主机名2-8位'
  }
  if(!pwdReg.test(pwd)){
    errMsg.pwdErr = '密码输入不合法，密码为6-20位'
  }
  if(JSON.stringify(errMsg) !== '{}'){
    response.render('login',{errMsg})
    return
  }

  try {
    let result = await usersModel.findOne({email,pwd:md5(pwd)})
    if(result){
      /*
      * 1.为本次请求开辟了一个session容器
      * 2.把_id（用于在数据库中的唯一标识）放进了容器中
      * 3.自动获取session容器的id，随后创建一个cookie，把session容器的编号放入cookie中
      * 4.将第三步的cookie返回给客户端
      * */
      request.session._id = result._id.toString()
      response.redirect('/user_center')
    }else{
      errMsg.loginErr = '登陆失败，邮箱或密码错误'
      console.log(errMsg)
      response.render('login',{errMsg})
    }
  }
  catch(err){
    //1.引入计数模块 2.引入报警模块
    console.log(err)
    errMsg.netWorkErr = '网络不稳定，稍后重试'
    response.render('login',{errMsg})
  }

})

module.exports = router