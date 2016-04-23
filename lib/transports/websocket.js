
/**
 * Module dependencies.
 */

var Transport = require('../transport')
  , parser = require('engine.io-parser')
  , debug = require('debug')('engine:ws')

/**
 * Export the constructor.
 */

module.exports = WebSocket;

/**
 * WebSocket transport 
 *
 * @param {http.ServerRequest}
 * @api public
 */

function WebSocket (req) {
  Transport.call(this, req);
  var self = this;
  this.socket = req.websocket;
  this.socket.on('message', this.onData.bind(this));
  this.socket.once('close', this.onClose.bind(this));
  this.socket.on('error', this.onError.bind(this));
  this.socket.on('headers', function (headers) {
    self.emit('headers', headers);
  });
  this.writable = true;
  this.perMessageDeflate = null;
};

<<<<<<< HEAD
WebSocket.prototype.setSocket=function(websocket){
  var self = this;
  this.socket = websocket;
  this.socket.engineWebSocket = this;
  this.socket.on('message', this.onData.bind(this));
  this.socket.once('close', this.onClose.bind(this));
  this.socket.on('error', this.onError.bind(this));
  this.socket.on('headers', function (headers) {
    self.emit('headers', headers);
  });
  this.writable = true;
  this.perMessageDeflate = null;
};
=======
>>>>>>> 76f479b72f547c6182a6f0c0142224fa1b4847fd
/**
 * Inherits from Transport.
 */

WebSocket.prototype.__proto__ = Transport.prototype;

/**
 * Transport name
 *
 * @api public
 */

WebSocket.prototype.name = 'websocket';

/**
 * Advertise upgrade support.
 *
 * @api public
 */

WebSocket.prototype.handlesUpgrades = true;

/**
 * Advertise framing support.
 *
 * @api public
 */

WebSocket.prototype.supportsFraming = true;

/**
 * Processes the incoming data.
 *
 * @param {String} encoded packet
 * @api private
 */

WebSocket.prototype.onData = function (data) {
<<<<<<< HEAD
=======
  debug('received "%s"', data);
>>>>>>> 76f479b72f547c6182a6f0c0142224fa1b4847fd
  Transport.prototype.onData.call(this, data);
};

/**
 * Writes a packet payload.
 *
 * @param {Array} packets
 * @api private
 */

WebSocket.prototype.send = function (packets) {
  var self = this;
  packets.forEach(function(packet) {
    parser.encodePacket(packet, self.supportsBinary, function(data) {
      debug('writing "%s"', data);
<<<<<<< HEAD
=======

>>>>>>> 76f479b72f547c6182a6f0c0142224fa1b4847fd
      // always creates a new object since ws modifies it
      var opts = {};
      if (packet.options) {
        opts.compress = packet.options.compress;
      }

      if (self.perMessageDeflate) {
        var len = 'string' == typeof data ? Buffer.byteLength(data) : data.length;
        if (len < self.perMessageDeflate.threshold) {
          opts.compress = false;
        }
      }

      self.writable = false;
      self.socket.send(data, opts, function (err){
        if (err) return self.onError('write error', err.stack);
        self.writable = true;
        self.emit('drain');
      });
    });
  });
};

/**
 * Closes the transport.
 *
 * @api private
 */

WebSocket.prototype.doClose = function (fn) {
  debug('closing');
<<<<<<< HEAD
  this.emit('close');
=======
>>>>>>> 76f479b72f547c6182a6f0c0142224fa1b4847fd
  this.socket.close();
  fn && fn();
};
