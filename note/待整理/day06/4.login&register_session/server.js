//引入express库
let express = require('express')
//引入express-session，用于在express中操作session
let session = require('express-session');
//引入connect-mongo，用于做session的持久化
let MongoStore = require('connect-mongo')(session);
//引入数据库连接模块
let db = require('./db')

//创建app服务对象
let app = express()
//配置session操作
app.use(session({
  name: 'auth',   //设置cookie的name，默认值是：connect.sid
  secret: 'atguigu', //参与加密的字符串（又称签名）
  saveUninitialized: false, //是否在存储内容之前创建会话，默认值是true
  resave: true ,//是否在每次请求时，强制重新保存session，即使他们没有变化
  store: new MongoStore({
    url: 'mongodb://localhost:27017/sessions_container',
    touchAfter: 24 * 3600 //修改频率（例：//在24小时之内只更新一次）
  }),
  cookie: {
    httpOnly: true, // 开启后前端无法通过 JS 操作cookie
    maxAge: 1000*60 // 设置cookie的过期时间
  },
}));


//使用内置中间件，用于解析post请求参数
app.use(express.urlencoded({extended:true}))
//配置模板引擎
app.set('view engine','ejs')
//配置模板目录
app.set('views','./views')
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