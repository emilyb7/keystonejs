const keystone = require('keystone');
const category = keystone.list('Category');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);
  const locals = res.locals;
  locals.category = '';

  view.on('init', (next) => {
    if (req.params.cat) {
      category.model.findOne({ key: req.params.cat}).exec((err, result) => {
        if (err) {
          next(err);
        } else {
          locals.category = result.name;
          next();
        }
      });
    } else {
      next();
    }
  });

  console.log(locals);

  view.render('category');
};
