/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Supportmagictype = require('./supportMagicType.model');

exports.register = function(socket) {
  Supportmagictype.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Supportmagictype.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('supportMagicType:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('supportMagicType:remove', doc);
}