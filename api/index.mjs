import { JSDOM } from 'jsdom';
import net from 'net';
import iconv from 'iconv-lite';
import { whoisServers } from './tld_list.mjs';

// WHOIS 查询函数
function queryWhois(domain, callback) {
    const tld = domain.split('.').pop();

    const whoisServer = whoisServers[tld];
    if (!whoisServer) {
        return callback(new Error('Unsupported TLD'));
    }

    const client = net.createConnection(43, whoisServer, () => {
        client.write(domain + '\r\n');
    });

    let response = '';
    client.on('data', (data) => {
        response += iconv.decode(data, 'utf-8');
    });

    client.on('end', () => {
        callback(null, response);
    });

    client.on('error', (err) => {
        callback(err);
    });
}

// 模拟一个使用 MDUI 的 HTML 页面
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>WHOIS Query</title>
    <!-- 引入 Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        body { padding: 20px; }
        .container { max-width: 600px; margin: auto; }
    </style>
</head>
<body class="bg-primary text-light">
    <div class="container">
        <h1 class="text-center text-light">WHOIS Query</h1>
        <div class="card">
            <div class="card-body">
                <form id="whois-form">
                    <div class="form-group">
                        <label for="domain">Domain</label>
                        <input class="form-control" type="text" id="domain" name="domain">
                    </div>
                    <button class="btn btn-primary" type="button" id="query-btn">Query WHOIS</button>
                </form>
            </div>
            <div class="card-body">
                <pre id="result"></pre>
            </div>
        </div>
    </div>
    <!-- 引入 jQuery -->
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.slim.min.js"></script>
    <!-- 引入 Popper.js -->
    <script src="https://cdn.bootcdn.net/ajax/libs/popper.js/2.11.6/umd/popper.min.js"></script>
    <!-- 引入 Bootstrap JS -->
    <script src="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script>
        document.getElementById('query-btn').addEventListener('click', () => {
            const domain = document.getElementById('domain').value;
            if (domain) {
                fetch('/whois?domain=' + encodeURIComponent(domain))
                    .then(response => response.text())
                    .then(result => {
                        document.getElementById('result').textContent = result;
                    });
            }
        });
    </script>
</body>
</html>
`;

// 使用 JSDOM 创建虚拟 DOM
const dom = new JSDOM(htmlContent, { url: 'http://localhost/' });
const document = dom.window.document;

// 模拟用户输入和点击操作
document.getElementById('domain').value = 'example.com';
document.getElementById('query-btn').click();

// 这里你可以模拟 fetch 请求并处理 WHOIS 查询
// 例如，你可以使用 node-fetch 或其他库来模拟 fetch 请求
import fetch from 'node-fetch';

globalThis.fetch = (url) => {
    if (url.startsWith('/whois?domain=')) {
        const domain = new URL(url, 'http://localhost/').searchParams.get('domain');
        return new Promise((resolve, reject) => {
            queryWhois(domain, (err, response) => {
                if (err) {
                    resolve(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
                } else {
                    resolve(new Response(response));
                }
            });
        });
    }
    return Promise.reject(new Error('Not Found'));
};

// 输出结果
setTimeout(() => {
    console.log(document.getElementById('result').textContent);
}, 1000); // 等待一段时间以确保模拟操作完成
