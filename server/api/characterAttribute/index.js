'use strict';

var express = require('express');
var controller = require('./characterAttribute.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:character_attribute_id', controller.show);
router.post('/', controller.create);
router.put('/:character_attribute_id', controller.update);
router.patch('/:character_attribute_id', controller.update);
router.delete('/:character_attribute_id', controller.destroy);

module.exports = router;