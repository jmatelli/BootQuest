/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Attackmagictype = require('./attackMagicType.model');

exports.register = function(socket) {
  Attackmagictype.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Attackmagictype.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('attackMagicType:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('attackMagicType:remove', doc);
}