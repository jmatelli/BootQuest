/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below

  /**
   * Routes related to magic
   */
  app.use('/api/support-magic-types', require('./api/supportMagicType'));
  app.use('/api/support-magics', require('./api/supportMagic'));
  app.use('/api/defense-magic-types', require('./api/defenseMagicType'));
  app.use('/api/defense-magics', require('./api/defenseMagic'));
  app.use('/api/attack-magic-types', require('./api/attackMagicType'));
  app.use('/api/attack-magics', require('./api/attackMagic'));

  /**
   * Routes related to items
   */
  app.use('/api/potion-types', require('./api/potionType'));
  app.use('/api/potions', require('./api/potion'));
  app.use('/api/armor-types', require('./api/armorType'));
  app.use('/api/armors', require('./api/armor'));
  app.use('/api/weapon-types', require('./api/weaponType'));
  app.use('/api/weapons', require('./api/weapon'));

  /**
   * Routes related to character
   */
  app.use('/api/klasses', require('./api/klass'));
  app.use('/api/races', require('./api/race'));
  app.use('/api/attributes', require('./api/attribute'));
  app.use('/api/characters', require('./api/character'));
  app.use('/api/characters/:character_id/character-attributes', require('./api/characterAttribute'));

  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
