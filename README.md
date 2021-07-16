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

```code
├── README.md								// 项目文档说明
├── package.json							// 里边相关配置 需要自己手动更改为项目匹配的信息
├── rollup.config.build.ts					// rollup打包配置
├── rollup.config.dev.ts					// rollup开发运行配置
├── npmpublish.js							// npm 发布命令
├── examples								// 自测时，自己可以 运行 : npm run dev ，启动index.html . 然后引用插件进行自测等
│   └── index.html
├── tsconfig.json							// ts 配置文件
├── test									// 测试
├── docs									// 文档
├── types									// 数据模型
├── dist									// 打包编译输出的文件目录
│   ├── npm-package-template.es.js			// 打包输出的 es 引入文件
│   └── npm-package-template.umd.js			// 打包输出的 und 格式文件
└── src										// 源码目录
	└── main.ts								// 源码入口文件
```

```code
/*
* 文件目录结构说明
* 2019/11/25
* @author zxm
*/

├── dist                    // 生成打包后的文件
├── node_modules            // 项目依赖包文件夹
├── public                  // public中的静态资源会被复制输出到目录(dist)中
│   └── index.html          // 项目入口文件
│   └── favicon.ico         // 网页icon
├── src                     // 项目源码
│   ├── api                 // 与后端交互使用的api方法和数据处理
│   │   └── config.js       // 请求配置信息
│   │   └── inde.js         // 请求统一出口，方便模块使用
│   ├── assets              // 放置一些静态资源 （不要有大图片，图片较大放在public下）
│   │       └── styles      // 样式资源
│   │       └── images      // 图片资源
│   ├── components          // 全局的公共组建
│   │   └── nf-table        // 全局组件目录（组件命名需要统一，例如nf-table） (nf代表全局组件)
│   │       └── index.vue   // 组件源码
│   │       └── dom.vue     // 组件使用式例
│   ├── filters             // 全局过滤器文件夹
│   │       └── index.vue   // 全局过滤器源码 - 当然如果过滤器过多，也可以继续拆分不同的模块
│   ├── directives          // 全局指令文件夹
│   │       └── index.vue   // 全局指令源码 - 当然如果指令过多，也可以继续拆分不同的模块
│   └── mixins              // 全局的mixins混入功能文件夹
│           └── index.vue   // 全局混入功能 - 当然如果混入功能过多，也可以继续拆分不同的模块
│   ├── router              // 路由文件夹
│   │   ├── index.js        // 导出路由的配置
│   │   └── modules         // 路由按模块划分
│   │       └── about.js    // 相关路由配置
│   ├── store               // 全局状态管理文件夹
│   │   ├── index.js        // 我们组装模块并导出 store 的地方
│   │   ├── states.js       // 根级别的 states
│   │   ├── actions.js      // 根级别的 action
│   │   ├── mutations.js    // 根级别的 mutation
│   │   ├── getters.js      // 根级别的 getters
│   │   └── modules         // 模块化的vuex文件夹
│   │       └── element.js  // 饿了么UI全局功能的配置， 按钮大小等
│   ├── utils               // 工具方法目录
│   │   └── index.js        // 封装的工具函数
│   │   └── base.js         // 挂载到Vue原型上的一些方法
│   │   └── rules.js        // 规则验证的一些方法
│   ├── views               // 视图源码文件夹
│   │   └── home            // 首页源码文件夹（统一驼峰命名）
│   │       └── index.vue   // 首页源码文件 （入口源码统一命名index.vue,个别情况除外）
│   │       └── add         // 首页添加页面 （一般情况，添加和编辑是一个页面 建议复用，个别情况除外）
│   │       └── components  // 首页代码所拆分的组件文件夹
│   │               └── indexTopSelect.vue  // 首页所引用的子组件（引用的子组件，务必以 indexXXXX.vue 来命名，通过index就可以看出 是index.vue所引用的组件。）
│   └── main                // 应用入口文件
│   └── main                // 主应用程序组件
├── .eslintr.js             // eslint配置的规则
├── .gititnore              // 配置不提交git仓库的文件
├── .pretterrc              // vscode 格式化配置文件
├── .env.development        // 开发环境的配置文件 ，现在主要配置了 baseURL地址
├── .env.production         // 生产环境的配置文件 ，现在主要配置了 baseURL地址
└── vue.config.js           // 修改webpack配置项 写在这里 详细见https://cli.vuejs.org/zh/config/#vue-config-js 
```
