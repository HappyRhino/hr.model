hr.model [![Build Status](https://travis-ci.org/HappyRhino/hr.model.png?branch=master)](https://travis-ci.org/HappyRhino/hr.model)
=============================

> Data modelling utility

## Installation

```
$ npm install hr.model
```

### Documentation

#### Creation

Create a new model by extending the default `Model`:

```js
var Model = require("hr.model");

var MyModel = Model.extend({

});
```

Create an instance with attributes using:

```js
var post = new Post({}, {
    title: "My Post"
});
```

#### Attributes

Default values are defined in the `defaults` property of the model:

```js
var Post = Model.extend({
    defaults: {
        title: ""
    }
});
```

Set an attribute using `.set`:

```js
post.set("title", "My Awesome Posts");
```

Get an attribute using `.get`:

```js
post.get("title");
```

Depp attribtes can be use:

```js
post.set("count", {
    "likes": 0,
    "tweets": 0
})

post.set("count.likes", 500);

post.get("count")
// -> { "likes": 500, "tweets": 0 }

post.get("count.likes")
// -> 500
```

#### Events

```js
// Triggered for every set of modifications
post.on("set", function() { ... });

// Triggered for every change on attributes
post.on("change:title", function() { ... });
```

### Example with React

```js
var React = require('react');
var Model = require("hr.model");

var User = Model.extend({
    defaults: {
        username: null,
        permissions: {
            read: true,
            write: false
        }
    }
});

var UserItem = React.createClass({
    componentWillMount : function() {
        this.props.user.on("change", this.forceUpdate.bind(this));
    },
    componentWillUnmount : function() {
        this.props.user.off("change");
    },
    render: function() {
        return (
            <div className="user">
            Username is {{this.props.user.get('username')}}
            </div>
        );
    }
});
```
