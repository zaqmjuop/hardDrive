```bash
$ npx create-react-app antd-demo-ts --typescript
$ yarn add antd react-app-rewired customize-cra babel-plugin-import less-loader less
```
```json
/* package.json */
"scripts": {
   "start": "react-app-rewired start",
  "build": "react-app-rewired build",
   "test": "react-app-rewired test",
}
```
```javascript
// config-overrides.js
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
  style: true,
  }),
 addLessLoader({
  javascriptEnabled: true,
   modifyVars: { '@primary-color': '#1DA57A' },
 }),
);
```