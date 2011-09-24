var http = require('http');
var io   = require('socket.io');
var fs   = require('fs');
var url  = require('url');

server = http.createServer(function(req, res, sockable){ 
  fs.readFile('./frontend/kanban.html', function (err, data) {
      if (err) throw err;
      res.write(data);
      res.end();
  });
});

var port = 8124;
server.listen(port);
console.log('server listening on port ' + port);

var columns = [];
var stories = [];
 
var io = io.listen(server); 

io.sockets.on('connection', function(socket){   
  socket.emit('initStories', { "data": stories });
  socket.emit('initColumns', { "data": columns.length });

  socket.on('addcolumn', function(data){ 
    socket.broadcast.emit('addcolumn');
    var column = {};
    columns.push(column);
  });

  socket.on('addstory', function(data){ 
    socket.broadcast.emit('addstory');
    var story = {};
    stories.push(story);
  });

  socket.on('movestory', function(data){
    socket.broadcast.emit('movestory', { "data": data});
    var id = data.data.id;

    for (var key in stories) {
      findKey = "story-" + key;

      if (findKey == id) {
        stories[key].left = data.data.left;
        stories[key].top  = data.data.top;
      }
    };
  });  
}); 
