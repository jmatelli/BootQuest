/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Armortype = require('./armorType.model');

exports.register = function(socket) {
  Armortype.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Armortype.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('armorType:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('armorType:remove', doc);
}