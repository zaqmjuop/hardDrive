
let fs = require('fs')
//创建一个可读流
let rs = fs.createReadStream('./test.mp4',{
  highWaterMark:1024 * 1024 //每次读取1MB,控制“水管的粗细”
})
//创建一个可写流
let ws = fs.createWriteStream('../test/music2.mp3')

//给流绑定监听------可读流不用手动的关闭或打开
rs.on('open',function () {
  console.log('可读流打开了')
})
rs.on('close',function () {
  console.log('可读流关闭了')
  ws.close()
})
ws.on('open',function () {
  console.log('可写流打开了')
})
ws.on('close',function () {
  console.log('可写流关闭了')
})

//给可读流绑定一个data事件，会自动触发可读流读取数据
rs.on('data',function (data) {
  //流式文件写入
  console.log(data.length)
  ws.write(data)
})
