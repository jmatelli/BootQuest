/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Defensemagictype = require('./defenseMagicType.model');

exports.register = function(socket) {
  Defensemagictype.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Defensemagictype.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('defenseMagicType:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('defenseMagicType:remove', doc);
}