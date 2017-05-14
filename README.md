Learning basics of keystone in order to find out whether it's an appropriate tool for future client projects.

Aims:

1. Figure out how to set up a database with custom schema
2. Set up basic site structure / logic
3. Learn some jade

### Adding a new model

Example code:

```js
const keystone = require('keystone');

const Category = new keystone.List('Category', {
  autokey: { from: 'name', path: 'key', unique: true, },
  label: 'Categories',
});

Category.add({
  name: { type: String, required: true, },
});

Category.track = true;
Category.register();
```

remember to include the new model in `models/index.js`, i.e. `require('./categories.js');`

To define a relationship with an existing list, use type 'relationship'. E.g. for films we can set a category like this:

```js
Film.add({
  name: { type: String, required: true, },
  year: { type: Number, required: false, },
  category: { type: Types.Relationship, ref: 'Category', many: true, },
});
```
