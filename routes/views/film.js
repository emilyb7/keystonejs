const keystone = require('keystone');
const films = keystone.list('Film');

exports = module.exports = (req, res) => {

  const view = new keystone.View(req, res);

  const locals = res.locals;
  locals.title = '';
  locals.year = null;
  locals.image = {};

  view.on('init', next => {
    if (req.params.title) {
      films.model.findOne({ key: req.params.title }).exec((err, film) => {
        if (err) next(err);
        else {
          locals.title = film.name;
          locals.year = film.year;
          locals.image = film.image;
          next();
        }
      });
    } else {
      next();
    }
  });

  view.render('film');
};
