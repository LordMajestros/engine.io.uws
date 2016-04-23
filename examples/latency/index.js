
/**
 * Module dependencies.
 */

var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , enchilada = require('enchilada')
<<<<<<< HEAD
  , io = require('../../').attach(server);
=======
  , io = require('engine.io').attach(server);
>>>>>>> 76f479b72f547c6182a6f0c0142224fa1b4847fd

app.use(enchilada({
  src: __dirname + '/public',
  debug: true
}));
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res, next){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.on('message', function(v){
    socket.send('pong');
  });
});

var port = process.env.PORT || 3000;
server.listen(port, function(){
  console.log('\033[96mlistening on localhost:' + port + ' \033[39m');
});
