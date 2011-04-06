var Http = require('http');

Http.createServer(function (req, res) {

res.write("Hello");
res.write();

}).listen(8124, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8124/');
