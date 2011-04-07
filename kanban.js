var http = require('http'),  
io = require('/home/odino/www/kanbanjs/socketio');
var Fs   = require('fs');

var clients = [];

server = http.createServer(function(req, res){ 
 // your normal server code 
 Fs.readFile('/home/odino/www/kanbanjs/frontend/kanban.html', function (err, data) {
        if (err) throw err;
        res.write(data);
	res.end();
        console.log('connet');
    });


});
server.listen(8124);
  
// socket.io 
var socket = io.listen(server); 



socket.on('connection', function(client){ 
  clients.push(client);
  client.on('message', function(mess){ 
    clients.forEach(function(client){
     client.send('grazie di avermelo detto');
    })
  }) 
  client.on('disconnect', function(){ console.log('B') }) 
  console.log(clients.length);
}); 

