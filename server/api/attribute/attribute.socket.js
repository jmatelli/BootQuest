/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Attribute = require('./attribute.model');

exports.register = function(socket) {
  Attribute.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Attribute.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('attribute:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('attribute:remove', doc);
}