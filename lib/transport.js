
/**
 * Module dependencies.
 */

var EventEmitter = require('events').EventEmitter
  , parser = require('engine.io-parser')
  , debug = require('debug')('engine:transport');

/**
 * Expose the constructor.
 */

module.exports = Transport;

/**
 * Noop function.
 *
 * @api private
 */

function noop () {}

/**
 * Transport constructor.
 *
 * @param {http.ServerRequest} request
 * @api public
 */

function Transport (req) {
  this.readyState = 'open';
  this.discarded = false;
}

/**
 * Inherits from EventEmitter.
 */

Transport.prototype.__proto__ = EventEmitter.prototype;

/**
 * Flags the transport as discarded.
 *
 * @api private
 */

Transport.prototype.discard = function () {
  this.discarded = true;
};

/**
 * Called with an incoming HTTP request.
 *
 * @param {http.ServerRequest} request
 * @api private
 */

Transport.prototype.onRequest = function (req) {
  debug('setting request');
  this.req = req;
};

/**
 * Closes the transport.
 *
 * @api private
 */

Transport.prototype.close = function (fn) {
  if ('closed' == this.readyState || 'closing' == this.readyState) return;

  this.readyState = 'closing';
  this.doClose(fn || noop);
};

/**
 * Called with a transport error.
 *
 * @param {String} message error
 * @param {Object} error description
 * @api private
 */

Transport.prototype.onError = function (msg, desc) {
  if (this.listeners('error').length) {
    var err = new Error(msg);
    err.type = 'TransportError';
<<<<<<< HEAD
    if(desc==1009){
        err.type='MaxpayloadError';
    }
=======
>>>>>>> 76f479b72f547c6182a6f0c0142224fa1b4847fd
    err.description = desc;
    this.emit('error', err);
  } else {
    debug('ignored transport error %s (%s)', msg, desc);
  }
};

/**
 * Called with parsed out a packets from the data stream.
 *
 * @param {Object} packet
 * @api private
 */

Transport.prototype.onPacket = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called with the encoded packet data.
 *
 * @param {String} data
 * @api private
 */

Transport.prototype.onData = function (data) {
  this.onPacket(parser.decodePacket(data));
};

/**
 * Called upon transport close.
 *
 * @api private
 */

Transport.prototype.onClose = function () {
  this.readyState = 'closed';
  this.emit('close');
};