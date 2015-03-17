# nock-github-oauth

[![Build Status](https://travis-ci.org/Runnable/nock-github-oauth.svg?branch=master)](https://travis-ci.org/Runnable/nock-github-oauth) 
[![Dependency Status](https://david-dm.org/Runnable/nock-github-oauth.svg)](https://david-dm.org/Runnable/nock-github-oauth) 
[![devDependency Status](https://david-dm.org/Runnable/nock-github-oauth/dev-status.svg)](https://david-dm.org/Runnable/nock-github-oauth#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/Runnable/nock-github-oauth/badges/gpa.svg)](https://codeclimate.com/github/Runnable/nock-github-oauth/badges/gpa.svg)

[![NPM](https://nodei.co/npm/nock-github-oauth.png?compact=true)](https://nodei.co/npm/nock-github-oauth/)

GitHub OAuth HTTP intercepts via nock.

## Installation
Via npm: `npm install nock-github-oauth --save-dev`

## Usage
`nock-github-oauth` is meant to be used from a testing context. Specifically, it mocks the
following routes for `https://github.com:443`:

* `GET /login`,
* `GET /login/oauth/authorize`, and
* `POST /login/oauth/access_token` (returns a mocked token in the body).

The package exposes a method (`exports.nock`) that establishes the intercepts for each of the
aforementioned Github OAuth routes. Here is an example of how to use it in a
(https://github.com/hapijs/lab)[lab] test:

```
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var github = require('nock-github-oauth');

lab.experiment('module that depends on GitHub OAuth', function() {
	lab.before(function(done) {
		// Setup github oauth http intercepts
		github.nock(done);
	});

	lab.after(function(done) {
		// Remove all intercepts
		nock.cleanAll();
	});
});
```

Finally, for convience, the package also exposes the https host for GitHub OAuth via
`exports.host` (`https://github.com:443`). and the mocked oauth token returned by the
intercepted `POST /login/oauth/access_token` via `exports.token`. You can access these
like so:

```
var github = require('nock-github-oauth');
var mockToken = github.token;
var githubHost = github.host;
```

## Contributing & Tests

When adding new features, fixing bugs, etc. please make sure to include the appropriate
tests and ensure all tests are passing before sending a pull request. We use `lab` for
unit testing, here's how to run tests:

```
npm run test
```

Additionally you'll want to ensure the files lint appropriately:

```
npm run lint
```

## License
[MIT](https://github.com/rsandor/nock-github-oauth/blob/master/LICENSE)
