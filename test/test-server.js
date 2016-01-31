var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var access_token;
var refresh_token;
var username = 'user';

chai.use(chaiHttp);

describe('Oauth2 Server Tests', function() {
  it('should public access /public GET', function(done) {
	  chai.request(server)
	    .get('/public')
	    .end(function(err, res){
	      res.should.have.status(200);
	      done();
	    });
	});
  
  it('should public access /public POST', function(done) {
	  chai.request(server)
	    .post('/public')
	    .end(function(err, res){
	      res.should.have.status(200);
	      done();
	    });
	});

  it('should get access_token /oauth/token POST', function(done) {
	  chai.request(server)
	    .post('/oauth/token')
	    .set('Content-Type', 'application/x-www-form-urlencoded')
	    .auth('clientid', 'clientsecret')
	    .send({ 'grant_type' : 'password', 'username' : username, 'password' :'password'})
	    .end(function(err, res){
	      res.should.have.status(200);
	      res.should.be.json;
	      res.body.should.be.a('object');
      	  res.body.should.have.property('token_type');
      	  res.body.should.have.property('access_token');
      	  access_token=res.body.access_token;
      	  res.body.should.have.property('expires_in');
      	  res.body.should.have.property('refresh_token');
      	  refresh_token=res.body.refresh_token;
	      done();
	    });
	});

  it('should get refresh_token /oauth/token POST', function(done) {
	  chai.request(server)
	    .post('/oauth/token')
	    .set('Content-Type', 'application/x-www-form-urlencoded')
	    .auth('clientid', 'clientsecret')
	    .send({ 'grant_type' : 'refresh_token', 'refresh_token' : refresh_token})
	    .end(function(err, res){
	      res.should.have.status(200);
	      res.should.be.json;
	      res.body.should.be.a('object');
      	  res.body.should.have.property('token_type');
      	  res.body.should.have.property('access_token');
      	  res.body.should.have.property('expires_in');
      	  res.body.should.have.property('refresh_token');
	      done();
	    });
	});

  it('should verify token /oauth/verify POST', function(done) {
	  chai.request(server)
	    .post('/oauth/verify')
	    .set('Content-Type', 'application/x-www-form-urlencoded')
	    .send({ 'access_token' : access_token })
	    .end(function(err, res){
	      res.should.have.status(200);
	      res.should.be.json;
	      res.body.should.be.a('object');
      	  res.body.should.have.property('verified_token');
      	  res.body.verified_token.should.equal(true);
	      done();
	    });
	});

  it('should verify token /oauth/verify GET', function(done) {
	  chai.request(server)
	    .get('/oauth/verify' + '?access_token=' + access_token)
	    .end(function(err, res){
	      res.should.have.status(200);
	      res.should.be.json;
	      res.body.should.be.a('object');
      	  res.body.should.have.property('verified_token');
      	  res.body.verified_token.should.equal(true);
	      done();
	    });
	});

  it('should get token info /oauth/info POST', function(done) {
	  chai.request(server)
	    .post('/oauth/info')
	    .set('Content-Type', 'application/x-www-form-urlencoded')
	    .send({ 'access_token' : access_token })
	    .end(function(err, res){
	      res.should.have.status(200);
	      res.should.be.json;
	      res.body.should.be.a('object');
      	  res.body.should.have.property('header');
      	  res.body.should.have.property('payload');
      	  res.body.payload.should.have.property('username');
      	  res.body.payload.username.should.equal(username);
	      done();
	    });
	});

  it('should verify token (token JWT expired) /oauth/verify POST', function(done) {
  	this.timeout(30000);
  	setTimeout(function () {
		  chai.request(server)
		    .post('/oauth/verify')
		    .set('Content-Type', 'application/x-www-form-urlencoded')
		    .send({ 'access_token' : access_token })
		    .end(function(err, res){
		      res.should.have.status(401);
		      res.should.be.json;
		      res.body.should.be.a('object');
	      	  res.body.should.have.property('code');
	      	  res.body.code.should.equal(401);
	      	  res.body.should.have.property('error');
	      	  res.body.error.should.equal('invalid_token');
	      	  res.body.should.have.property('error_description');
	      	  res.body.error_description.should.equal('jwt expired');
		      done();
		    });
		}, 10000);
	});
});