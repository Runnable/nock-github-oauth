# nock-github-oauth
GitHub OAuth HTTP intercepts via nock.

## Installation
Via npm: `npm install nock-github-oauth --save-dev`

## Usage
`nock-github-oauth` is meant to be used from a testing context. The package exports a single
method which sets up nock intercepts for Github OAuth endpoints.

Here is an example of how it might be used:
```
var nockGithubOAuth = require('nock-github-oauth');

describe('a module dependant on github authorization', function() {
	before(function(done) {
		// Setup github oauth http intercepts
		nockGithubOAuth(done);
	});

	after(function(done) {
		// Remove all intercepts
		nock.cleanAll();
	});
});
```

## License
(https://github.com/rsandor/nock-github-oauth/blob/master/LICENSE)[MIT]
