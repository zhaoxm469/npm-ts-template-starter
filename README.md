# 说明

使用typescript进行编写, 基于rollup打包 . 主要用于工作中 构建库或者插 项目通用模板 .

## 使用

将这个项目克隆到本地, 推荐使用 [fast-template-cli](https://www.npmjs.com/package/fast-template-cli) 进行创建此模板.  

1. 编辑package.json 和其他所有需要的文件以匹配你的项目.  
2. 修改src里面的源代码.
3. 如果用 umd 方式引入 ， 务必修改 rollup 里的 output.name ，这个是暴露外部的方法名称.
4. npm run dev , 启动一个web服务，页面指向 /examples/index.html,修改此页面 可书写 demo 测试.
5. npm run build 打包项目.
6. npm run npmp 发布项目到npm.

## script 命令

开发, 预览. 访问地址对应 /examples/index.html 页面

* npm run dev  

打包

* npm run build

推送到npm远程

* npm run npmp

## 目录结构

```test
├── README.md								## 项目文档说明
├── package.json							## 里边相关配置 需要自己手动更改为项目匹配的信息
├── rollup.config.build.ts					## rollup打包配置
├── rollup.config.dev.ts					## rollup开发运行配置
├── npmpublish.js							## npm 发布命令
├── examples								## 自测时，自己可以 运行 : npm run dev ，启动index.html . 然后引用插件进行自测等
│   └── index.html
├── tsconfig.json							## ts 配置文件
├── test									## 测试
├── docs									## 文档
├── types									## 数据模型
├── dist									## 打包编译输出的文件目录
│   ├── npm-package-template.es.js			## 打包输出的 es 引入文件
│   └── npm-package-template.umd.js			## 打包输出的 und 格式文件
└── src										## 源码目录
	└── main.ts								## 源码入口文件
```
