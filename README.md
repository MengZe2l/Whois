# WHOIS API 服务

这是一个简单的 WHOIS API 服务，使用了 Express.js 框架来处理 HTTP 请求，并使用 `whois` 库来获取域名的 WHOIS 信息。`morgan` 中间件用于记录请求日志。

## 项目结构

```
.
├── app.js          # 主应用文件
├── package.json    # 项目配置文件
└── README.md       # 说明文件
```

## 安装

在使用此 API 之前，请确保你已经安装了 [Node.js](https://nodejs.org/)。然后，你可以通过以下命令来安装所需的依赖：

```bash
npm install
```

## 启动服务

要启动服务，请运行以下命令：

```bash
node app.js
```

启动后，服务将会在 `http://localhost:3000` 上运行。

## API 端点

### `GET /whois`

获取域名的 WHOIS 信息。

**请求参数：**

- `domain` (字符串) - 需要查询的域名。

**示例请求：**

```
GET http://localhost:3000/whois?domain=mengze2.cn
```

**响应：**

- **成功**（状态码 200）:
  
  ```json
  {
    "whois": "WHOIS 信息内容"
  }
  ```

- **失败**（状态码 400 或 500）:

  - 当未提供 `domain` 参数时：
  
    ```json
    {
      "error": "Domain parameter is required"
    }
    ```

  - 当无法检索 WHOIS 信息时：
  
    ```json
    {
      "error": "Failed to retrieve WHOIS information"
    }
    ```

## 中间件

- **`express.json()`**: 用于解析 JSON 格式的请求体。
- **`morgan`**: 用于记录请求日志，使用 'dev' 格式，提供简洁的请求日志信息。

## 依赖

- `express`: Web 应用框架。
- `whois`: 用于获取 WHOIS 信息。
- `morgan`: HTTP 请求日志记录中间件。

## 使用教程

### 在 Vercel 上部署

1. **创建 Vercel 账户**: 如果还没有账户，请前往 [Vercel](https://vercel.com) 并注册一个账户。

2. **安装 Vercel CLI**: 在终端中运行以下命令来安装 Vercel CLI：

   ```bash
   npm install -g vercel
   ```

3. **登录 Vercel**: 使用 Vercel CLI 登录你的账户：

   ```bash
   vercel login
   ```

4. **初始化项目**: 在项目根目录下，运行以下命令初始化 Vercel 配置：

   ```bash
   vercel init
   ```

5. **创建 `vercel.json` 配置文件**: 在项目根目录下创建一个 `vercel.json` 文件，内容如下：

   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "app.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "app.js"
       }
     ]
   }
   ```

6. **部署到 Vercel**: 使用以下命令部署你的应用：

   ```bash
   vercel
   ```

   按照提示完成部署过程。部署成功后，你将获得一个 Vercel URL，访问此 URL 即可使用你的 WHOIS API。

### 使用 Nginx 反向代理

1. **安装 Nginx**: 在你的服务器上安装 Nginx。如果你使用的是 Ubuntu，可以通过以下命令安装：

   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **配置 Nginx**: 编辑 Nginx 配置文件以设置反向代理。在 `/etc/nginx/sites-available/default` 文件中，添加以下内容：

   ```nginx
   server {
       listen 80;

       server_name your-domain.com;  # 替换为你的域名

       location / {
           proxy_pass http://localhost:3000;  # 替换为你的应用地址和端口
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

3. **重启 Nginx**: 应用配置更改并重启 Nginx：

   ```bash
   sudo systemctl restart nginx
   ```

4. **测试反向代理**: 确保你的 Express 应用正在运行，并访问 `http://your-domain.com/whois?domain=example.com` 以测试反向代理是否工作正常。

## 许可证

MIT 许可证。请参阅 [LICENSE](./LICENSE) 文件以了解更多信息。