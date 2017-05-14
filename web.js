const keystone = require('keystone');

keystone.init({

  'name': 'Emily\'s keystone demo',
  'brand': 'inFact',

  'favicon': 'public/favicon.ico',
  'static': ['public'],

  'views': 'templates/views',
  'view engine': 'jade',

  'auto update': true,
  'mongo': 'mongodb://localhost/keystone-demo',

  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': '(your secret here)'

});

require('./models');

console.log('web');

keystone.set('routes', require('./routes'));

keystone.start();
