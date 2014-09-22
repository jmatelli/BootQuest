/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Weapon = require('./weapon.model');

exports.register = function(socket) {
  Weapon.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Weapon.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('weapon:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('weapon:remove', doc);
}