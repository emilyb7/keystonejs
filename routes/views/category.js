const keystone = require('keystone');
const category = keystone.list('Category');
const films = keystone.list('Film');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);
  const locals = res.locals;
  locals.category = '';
  locals.description = '';
  locals.films = [];

  view.on('init', (next) => {
    if (req.params.cat) {
      category.model.findOne({ key: req.params.cat}).exec((err, cat) => {
        if (err) {
          next(err);
        } else {
          locals.category = cat.name;
          locals.description = cat.description;

          films.model.find({category: { _id: cat.id } }).exec((err, results) => {
            //console.log(results);
            locals.films = results;
            console.log(locals);
            next();
          });
        }
      });
    } else {
      next();
    }
  });

  view.render('category');
};
