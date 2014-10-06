/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Weapontype = require('./weaponType.model');

exports.register = function(socket) {
  Weapontype.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Weapontype.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('weaponType:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('weaponType:remove', doc);
}