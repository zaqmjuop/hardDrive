### 把 js 字符串外套一层函数执行

- exports：用于暴露模块
- require：用于引入模块
- module：用于暴露模块 tr
- \_\_filename：当前文件所在路径(绝对路径)+当前文件名
- \_\_dirname：当前文件所在文件夹的路径

```typescript javascript
function runJavascriptModule(moduleContent: string) {
  const moduleCode = `
    (function a(exports, require, module, __filename, __dirname){
        ${moduleContent}
    })(exports, require, module, __filename, __dirname)
    `;
  try {
    eval(moduleCode);
  } catch (error) {
    console.log(error);
  }
}
```
