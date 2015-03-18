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
