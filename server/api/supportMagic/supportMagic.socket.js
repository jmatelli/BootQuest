/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Supportmagic = require('./supportMagic.model');

exports.register = function(socket) {
  Supportmagic.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Supportmagic.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('supportMagic:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('supportMagic:remove', doc);
}