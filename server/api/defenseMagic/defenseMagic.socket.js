/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Defensemagic = require('./defenseMagic.model');

exports.register = function(socket) {
  Defensemagic.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Defensemagic.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('defenseMagic:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('defenseMagic:remove', doc);
}