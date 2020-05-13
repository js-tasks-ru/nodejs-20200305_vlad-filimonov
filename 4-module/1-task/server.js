const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);
  switch (req.method) {
    case 'GET':
     if(pathname.indexOf('/')> -1){
         res.statusCode = 400;
         res.end();
     }
     else if (fs.existsSync(filepath)){
      const fileStream = fs.createReadStream(filepath);
      res.statusCode = 200;
      fileStream.on('readable', function() {
        let data = fileStream.read();
        res.end(data);
      });
       } else if(fs.existsSync(filepath) ===false) {
       res.statusCode = 404;
       res.end();
     }
      break;

    default:
      res.statusCode = 500;
      res.end('Not implemented');
  }
});

module.exports = server;
