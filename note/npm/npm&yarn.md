
```console
# set taobao registry
$ npm config set registry https://registry.npm.taobao.org
# 查看 npm registry
$ npm config get registry

# init folder
$ npm init -y # yarn init -y # generate package.json 描述文件

# install package
$ npm install --save jquery # yarn add jquery

# install global package
$ npm install -g jquery # yarn global add jquery

# install dev package
$ npm install --dev jquery # yarn add jquery -D

# install with package.json
$ npm install # yarn

# unstall package
$ npm remove xx & npm remove xx -g # yarn remove xx & yarn remove xx -g

# check package
$ npm info xx # yarn info xx
```