# nock-github-oauth
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

**Important:** In order for pull requests to be merged the author must 1) provide proper testing,
and 2) ensure that all tests pass.

## License
(https://github.com/rsandor/nock-github-oauth/blob/master/LICENSE)[MIT]
