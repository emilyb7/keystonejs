const keystone = require('keystone');
const Category = keystone.list('Category');

exports = module.exports = (req, res) => {
  const view = new keystone.View(req, res);

  view.on('init', (next) => {

    const locals = res.locals;

    locals.categories = [];

    Category.model.find().exec((err, results) => {

      if (err) {
        return next(err);
      }

      locals.categories = results;
      next();
    });

  });
  view.render('index');
};
