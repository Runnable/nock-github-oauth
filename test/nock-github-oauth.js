var Lab = require('lab');
var lab = exports.lab = Lab.script();
var Code = require('code');
var expect = Code.expect;
var request = require('request');
var nock = require('nock');
var github = require('../index.js');

lab.experiment('nock-github-oauth.js module', function() {
  lab.afterEach(function(done) {
    nock.cleanAll();
    done();
  });

  lab.test('exposes the correct GitHub OAuth host', function(done) {
    expect(github.host).to.equal('https://github.com:443');
    done();
  });

  lab.test('exposes mocked OAuth token', function(done) {
    expect(github.token).to.be.a.string();
    done();
  });

  lab.test('works without a callback to nock method', function(done) {
    github.nock();
    request(github.host + '/login', function(err, res) {
      if (err) { return done(err); }
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  lab.test('correctly executes a callback supplied to the nock method', function(done) {
    github.nock(function() {
      done();
    });
  });
});

lab.experiment('nock-github-oauth.js routes', function() {
  var host = github.host;

  lab.before(function(done) {
    github.nock(done);
  });

  lab.after(function(done) {
    nock.cleanAll();
    done();
  });

  lab.test('correctly mocks `GET /login`', function(done) {
    request(host + '/login', function(err, res, body) {
      if (err) { return done(err); }
      expect(res.statusCode).to.equal(200);
      expect(res.headers['set-cookie']).to.exist();
      expect(body).to.not.be.empty();
      done();
    });
  });

  lab.test('correctly mocks `GET /login/oauth/authorize`', function(done) {
    request(host + '/login/oauth/authorize', function(err, res, body) {
      if (err) { return done(err); }
      expect(res.statusCode).to.equal(200);
      expect(body).to.not.be.empty();
      done();
    });
  });

  lab.test('correctly mocks `POST /login/oauth/access_token`', function(done) {
    var expectedHeaders = [
      'server', 'date', 'content-type', 'cache-control',
      'x-xss-protection', 'x-frame-options', 'content-security-policy',
      'vary', 'set-cookie', 'etag', 'content-length', 'x-github-request-id',
      'strict-transport-security', 'x-content-type-options', 'x-served-by'
    ];
    var options = {
      url: host + '/login/oauth/access_token',
      method: 'POST',
      body: 'anything'
    };

    request(options, function(err, res, body) {
      if (err) { return done(err); }
      expect(res.statusCode).to.equal(200);
      expect(body).to.equal(github.token);
      expectedHeaders.forEach(function(headerName) {
        expect(res.headers[headerName]).to.exist();
      });
      done();
    });
  });
});
