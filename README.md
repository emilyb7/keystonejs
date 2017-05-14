Learning basics of keystone in order to find out whether it's an appropriate tool for future client projects.

Aims:

1. Figure out how to set up a database with custom schema
2. Set up basic site structure / logic
3. Learn some pug

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

### Creating routes

* Create a view under `routes/views`
* Include the route in `routes/index.js` - this needs two arguments

### Some basic pug learnings

To display a variable from the server use `={var}`

For inlining two types of HTML tag: `li: a(href="#")`

To escape custom HTML input `p!=description`


### Some mongo learnings

To get one matching result from DB (e.g. when search value is unique):
```js
category.model.findOne({ key: req.params.cat}).exec
```

To get everything from a list:
```js
films.model.find().exec
```

To match only certain values, specify as argument to `find`:
```js
films.model.find({category: { _id: cat.id } }).exec
```


### Custom content

#### Images

For this we need an account with Cloudinary, which is free.

I've saved my API key and secret in a `.env` file. Using the `dotenv` module for env variables this time.

Cloudinary config is set like this:
```js
keystone.set('cloudinary config', process.env.CLOUDINARY);
```

I've added the following the `films` model:

```js
image: { type: Types.CloudinaryImage, publicID: 'slug', autoCleanup: true, },
```

Images can now be uploaded in the admin panel and views on cloudinary!
