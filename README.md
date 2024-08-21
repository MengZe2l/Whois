# 简介

其实就是一个使用Nodejs作为后端的Whois查询接口的源代码
本人node新手，写的代码可能不适配无端口部署，如有需要可自行修改app.js以适配，后面我也会在新版本中完全

# 使用方法
先克隆本仓库，然后进入项目目录，运行：
```shell
npm run dev
```
即可运行本地预览服务器，或运行：
```shell
npm run start
```
运行api项目
调用方法：
访问：127.0.0.1:3000/whois?domain=域名即可返回json格式的whois信息
可以使用服务器搭建api接口然后内网访问，使用html核js对接接口做whois工具
也可以使用vercel部署，做公共whois api接口。



如


