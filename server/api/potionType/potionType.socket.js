/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Potiontype = require('./potionType.model');

exports.register = function(socket) {
  Potiontype.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Potiontype.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('potionType:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('potionType:remove', doc);
}