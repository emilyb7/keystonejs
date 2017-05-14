const keystone = require('keystone');
require('dotenv').config();

keystone.init({

  'name': 'Emily\'s keystone demo',
  'brand': 'inFact',

  'favicon': 'public/favicon.ico',
  'static': ['public'],

  'views': 'templates/views',
  'view engine': 'pug',

  'auto update': true,
  'mongo': process.env.MONGODB_URI,

  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': '(your secret here)'

});

require('./models');

keystone.set('routes', require('./routes'));
keystone.start();
