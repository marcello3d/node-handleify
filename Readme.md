Handleify
=================

[Browserify 2](https://github.com/substack/node-browserify) + [handlebars](https://github.com/wycats/handlebars.js) 

Usage / Examples
----------------

Browserify API usage:
```js
var browserify = require('browserify')
var handleify = require('handleify')

var bundle = browserify()
bundle.transform(handleify)
```

Clientside code:
```js
var template = require('./views/foo.hbs')
template({
    foo:bar
})
```

Accessing the Handlebars object in client code:
```js
var Handlebars = require('handleify')
Handlebars.registerHelper( ... )
```

Commandline Browserify usage (I haven't actually tried this):
```
$ npm install handleify
$ browserify -t handleify main.js > bundle.js
```


License
-------
Open source software under the [zlib license](LICENSE).