Models for HappyRhino
=============================

[![Build Status](https://travis-ci.org/HappyRhino/hr.model.png?branch=master)](https://travis-ci.org/HappyRhino/hr.model)


### Documentation

##### Creation

Create a new model by extending the default `Model`:

```js
var Model = require("hr.model");

var MyModel = Model.extend({

});
```

##### Default values

Default values are defined in the `defaults` property of the model:

```js
var Post = Model.extend({
    defaults: {
        title: ""
    }
});
```

##### Model Instance

```js
var post = new Post({}, {
    title: "My Post"
});
```

##### Get

```js
post.get("title");
```
