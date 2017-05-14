const keystone = require('keystone');

const Category = new keystone.List('Category', {
  autokey: { from: 'name', path: 'key', unique: true, },
  label: 'Categories',
});

Category.add({
  name: { type: String, required: true, },
});

Category.relationship({ ref: 'Post', refPath: 'categories' });

Category.track = true;
Category.register();
