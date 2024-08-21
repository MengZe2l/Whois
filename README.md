# 简介

其实就是一个使用Nodejs作为后端的Whois查询工具的单页应用源码，使用Nodejs的jsdom开发，就一个模拟页面还嵌套在index.mjs里面，代码东西不多，tld_list.mjs里面有我整理的支持域名后缀。

# 使用方法
先克隆本仓库，然后进入项目目录，运行：
```shell
npm run dev
```
即可运行本地预览服务器，或使用：
```shell
npm run start
```
运行项目，可以部署到vercel上

(vercel教程待补充)

# 更新日志
- 1.0.0: 开发了初始版本，并开源
- 1.0.1: 从CJS换到了ESM，并放弃Ex框架使用Jsdom重构。
