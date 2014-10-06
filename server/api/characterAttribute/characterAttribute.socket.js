/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Characterattribute = require('./characterAttribute.model');

exports.register = function(socket) {
  Characterattribute.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Characterattribute.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('characterAttribute:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('characterAttribute:remove', doc);
}