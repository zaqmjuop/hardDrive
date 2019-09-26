let express = require('express')

let app = express()
app.use(express.static('public'))

//告诉app你所使用的模板引擎是哪一个
app.set('view engine','ejs')
//告诉app模板目录在哪
app.set('views','./views')

app.get('/demo',(request,response)=>{
  let data1 = 'hello,atguigu'
  let data2 = 'hello,0520'
  let personArr = [
    {name:'kobe',age:18},
    {name:'kobe2',age:181},
    {name:'kobe3',age:182},
    {name:'kobe4',age:183},
    {name:'kobe5',age:184},
    {name:'kobe6',age:185},
    {name:'kobe7',age:186},
  ]
  //render方法专门用于渲染模板
  response.render('index',{a:data1,b:data2,persons:personArr})
})

app.listen(3000,function (err) {
  if (!err) console.log('服务器启动成功')
  else console.log(err)
})