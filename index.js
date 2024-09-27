const express = require('express');
const request = require('request');
const app = express();

// Remove CORS and other security headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/proxy/:url(*)', (req, res) => {
  const targetUrl = req.params.url;
  
  request(
    { 
      url: targetUrl,
      headers: {
        // Optional: Remove specific security headers or cookies if needed
        // 'Cookie': ''
      }
    }
  )
    .on('error', (err) => {
      res.status(500).send('Error with the request.');
    })
    .pipe(res);
});

app.listen(8080, () => {
  console.log('Proxy server running on port 8080');
});
