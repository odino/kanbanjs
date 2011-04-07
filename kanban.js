var sys = require('sys');
var Fs   = require('fs');
var Url = require('url');
var Querystring = require('querystring');
var http = require('http');
var events = require('events');
var listener = function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    sys.puts('Started connection');
## SOCKET.io!
    Fs.readFile('/home/odino/projects/kanbanjs/frontend/kanban.html', function (err, data) {
        if (err) throw err;
        res.write(data);
        server.on('request', function (request, response) {
          this.setMaxListeners(0);
          qs = Url.parse(req.url).query;
              res.write('s');
              res.write('<script type="text/javascript">$( "#draggable" ).animate({"left": "' + 200 + 'px"}, 1);</script>');
              res.write('<script type="text/javascript">$( "#draggable" ).animate({"top": "' + 200 + 'px"}, 1);</script>');

          if (qs)
          {
              qss = Querystring.parse(qs);
              console.log(qss);
              res.write('s');
              res.write('<script type="text/javascript">$( "#draggable" ).animate({"left": "' + 200 + 'px"}, 1);</script>');
              res.write('<script type="text/javascript">$( "#draggable" ).animate({"top": "' + 200 + 'px"}, 1);</script>');
              response.end();
          }

        });
    });
};



var server = http.createServer(listener);

console.log();

server.listen(8124);
