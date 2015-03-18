var Lab = require('lab');
var lab = exports.lab = Lab.script();
var Code = require('code');
var expect = Code.expect;
var request = require('request');
var nock = require('nock');
var github = require('../index.js');

lab.experiment('nock-github-oauth.js options', function() {
  lab.afterEach(function(done) {
    nock.cleanAll();
    done();
  });

  lab.test('sets up correct inercepts when passing a custom host', function(done) {
    var customHost = 'http://localhost:3000';
    github.nock({ host: customHost });
    request(customHost + '/login', function(err, res, body) {
      if (err) { return done(err); }
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  lab.test('sets default host when missing from options', function(done) {
    var host = github.host;
    github.nock({ 'dortitos are': 'extreme' });
    request(host + '/login', function(err, res, body) {
      if (err) { return done(err); }
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  lab.test('works correctly when using options and a callback', function(done) {
    var host = 'http://www.example.com:443';
    github.nock({ host: host }, function() {
      request(host + '/login', function(err, res, body) {
        if (err) { return done(err); }
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
});

