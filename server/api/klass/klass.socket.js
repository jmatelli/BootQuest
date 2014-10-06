/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Klass = require('./klass.model');

exports.register = function(socket) {
  Klass.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Klass.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('klass:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('klass:remove', doc);
}