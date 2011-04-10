var http = require('http');
var io = require('./socketio');
var fs   = require('fs');
var url = require('url');

var clients = [];

server = http.createServer(function(req, res, sockable){ 
    if(url.parse(req.url).pathname == '/socketio.js') {
       fs.readFile('./socketio/support/socket.io-client/socket.io.js', function (err, data) {
            if (err) throw err;
            res.write(data);
	        res.end();
        });
    } else {
        fs.readFile('./frontend/kanban.html', function (err, data) {
            if (err) throw err;
            res.write(data);
	        res.end();
        });
    }

});
var port = 8124;
server.listen(port);
console.log('server listening on port ' + port);

  
// socket.io 
var socket = io.listen(server); 

socket.on('connection', function(client){ 
  clients.push(client);

  client.on('message', function(mess){ 

    for (cid in clients)
    {
      console.log('activerid:' + mess.rid);
      clients[cid].send(mess);
    };
  }) 
  client.on('disconnect', function(){ console.log('B') }) 
  console.log(clients.length);
}); 
