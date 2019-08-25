let https = require('https');

// http.createServer(function(request, response) {
//   response.writeHead(200, {'Content-Type': 'text/plain'});
//   // response.end('Hello')
// }).listen(process.env.PORT);

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Test');
}).listen(process.env.PORT);
