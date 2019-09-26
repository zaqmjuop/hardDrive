const http = require('http')
const { parse } = require('querystring')

//创建服务对象
const server = http.createServer(function (request, response) {
  response.setHeader('content-type', 'text/html;charset=utf-8')
  response.end(`<html></html>`)
})

//绑定一个端口运行
server.listen(3000, (err) => { console.log(err || '服务器启动成功了') })

