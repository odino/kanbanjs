var exec   = require('child_process').exec
var colors  = require('colors')
var sys    = require('sys')
var coffee = './node_modules/coffee-script/bin/coffee -c kanban.coffee && ./node_modules/coffee-script/bin/coffee -c client.coffee'

desc('Initializes the Kanban application.')
task('install', [], function (params) {
  sys.puts('Initializing your KanbanJS:'.underline);
  if (exec(coffee)) {
      sys.puts('*** 1 - '.white + 'compiled a few cup of Coffee'.green)
  } else {
      sys.puts('Unable to compile CoffeScript: try running'.red)
      sys.puts(coffee.yellow)
      
      return false
  }
  sys.puts('Your kanban is ready to be used, just run:'.green);
  sys.puts('node kanban.js'.yellow);
  sys.puts('from the root of the project'.green);
});