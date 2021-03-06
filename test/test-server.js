var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Oauth2 Server - Web Access tests', function() {

  it('should index access / GET', function(done) {
	  chai.request(server)
	    .get('/oauth2')
	    .end(function(err, res){
	      res.should.have.status(200);
	      done();
	    });
	});

});
