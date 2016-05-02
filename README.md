npm-get-top-dependents
======================

[![NPM Version](https://img.shields.io/npm/v/npm-get-top-dependents.svg?style=flat)](https://npmjs.org/package/npm-get-top-dependents)
[![NPM Downloads](https://img.shields.io/npm/dm/npm-get-top-dependents.svg?style=flat)](https://npmjs.org/package/npm-get-top-dependents)
[![Build Status](https://travis-ci.org/addaleax/npm-get-top-dependents.svg?style=flat&branch=master)](https://travis-ci.org/addaleax/npm-get-top-dependents?branch=master)
[![Coverage Status](https://coveralls.io/repos/addaleax/npm-get-top-dependents/badge.svg?branch=master)](https://coveralls.io/r/addaleax/npm-get-top-dependents?branch=master)
[![Dependency Status](https://david-dm.org/addaleax/npm-get-top-dependents.svg?style=flat)](https://david-dm.org/addaleax/npm-get-top-dependents)

Get the top dependents of an npm package.

Install:
`npm install npm-get-top-dependents`

Usage:

```js
var getTopDependents = require('npm-get-top-dependents');

getTopDependents('npm-package-arg', function(err, result) {
  /* => result is something like
   { downloads: 3245765,
     start: '2016-04-02',
     end: '2016-05-01',
     package: 'npm' }, ... ]  */
});
```

API:
`getTopDependents(options | package name, callback)`

Options:
 * `count`: Number of returned packages.
 * `package`: Package name if an `options` object was passed.

License
=======

MIT
