const keystone = require('keystone');
const types = keystone.Field.Types;

const Category = new keystone.List('Category', {
  autokey: { from: 'name', path: 'key', unique: true, },
  label: 'Categories',
});

Category.add({
  name: { type: String, required: true, },
  description: { type: types.Html, required: false, wysiwyg: true, },
});

Category.track = true;
Category.register();
