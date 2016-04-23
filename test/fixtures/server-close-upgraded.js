var eioc = require('engine.io-client');
var listen = require('../common').listen;

var engine = listen(function (port) {
  var socket = new eioc.Socket('ws://localhost:' + port);
  socket.on('upgrade', function() {
    engine.httpServer.close();
    engine.close();
<<<<<<< HEAD
    engine.ws.close();
=======
>>>>>>> 76f479b72f547c6182a6f0c0142224fa1b4847fd
  });
});
