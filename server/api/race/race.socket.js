/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Race = require('./race.model');

exports.register = function(socket) {
  Race.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Race.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('race:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('race:remove', doc);
}