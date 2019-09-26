const fs = require('fs');
const filePath = './simple.txt'
const content = 'fuck you';
fs.writeFile(filePath, content, (writeErr)=>{
    if(writeErr){
        console.log(err)
    }else{
        console.log('success writed');
        fs.readFile(filePath, (readErr, data)=>{
            if(readErr){
                console.log(readErr)
            }else{
                console.log(data && data.toString())
            }
        })
    }
})