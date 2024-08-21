const express = require('express');
const whois = require('whois');
const morgan = require('morgan'); // 引入 morgan
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Use morgan to log requests
app.use(morgan('dev')); // 'dev' 格式提供简洁的请求日志

// Route to get WHOIS information
app.get('/whois', (req, res) => {
    const domain = req.query.domain;

    if (!domain) {
        return res.status(400).json({ error: 'Domain parameter is required' });
    }

    whois.lookup(domain, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve WHOIS information' });
        }

        res.json({ whois: data });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`WHOIS API is running at http://localhost:${port}`);
});
