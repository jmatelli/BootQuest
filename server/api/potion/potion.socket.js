/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Potion = require('./potion.model');

exports.register = function(socket) {
  Potion.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Potion.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('potion:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('potion:remove', doc);
}