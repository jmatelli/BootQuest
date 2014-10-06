/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Attackmagic = require('./attackMagic.model');

exports.register = function(socket) {
  Attackmagic.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Attackmagic.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('attackMagic:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('attackMagic:remove', doc);
}