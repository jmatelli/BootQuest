/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Character = require('./character.model');

exports.register = function(socket) {
  Character.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Character.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('character:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('character:remove', doc);
}