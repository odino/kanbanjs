http    = require 'http'
io      = require 'socket.io'
fs      = require 'fs'
url     = require 'url'
sys     = require 'sys'
colors  = require 'colors'

server = http.createServer (req, res) -> 
  fs.readFile './frontend/kanban.html', (err, data) ->
    res.write(data)
    res.end()
    sys.puts 'response delivered'.green;

port        = 8124
server.listen(port)
listening   = 'server listening on port ' + port
sys.puts listening.yellow

columns = [];
stories = [];
 
io = io.listen(server); 

io.sockets.on 'connection', (socket) ->
  socket.emit('initStories', { "data": stories });
  socket.emit('initColumns', { "data": columns.length });

  socket.on 'addcolumn', (data) ->
    socket.broadcast.emit('addcolumn')
    column = {}
    columns.push(column)

  socket.on 'addstory', (data) ->
    socket.broadcast.emit('addstory')
    story = {}
    stories.push(story)

  socket.on 'movestory', (data) ->
    socket.broadcast.emit('movestory', { "data": data})
    id = data.data.id

    for key of stories
      findKey = "story-" + key;
      if findKey == id
        stories[key].left = data.data.left
        stories[key].top  = data.data.top
