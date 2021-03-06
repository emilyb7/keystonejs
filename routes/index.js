const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Handle 404 errors
keystone.set('404', (req, res) => {
  res.status(404).render('errors/404');
});

// Handle other errors
keystone.set('500', (err, req, res) => {
  let title, message;
  if (err instanceof Error) {
    message = err.message;
    err = err.stack;
  }
  res.err(err, title, message);
});

// Load Routes
const routes = {
  views: importRoutes('./views')
};

// Bind Routes
exports = module.exports = (app) => {
  app.get('/', routes.views.index);
  app.get('/category/:cat', routes.views.category);
  app.get('/film/:title', routes.views.film);
};
