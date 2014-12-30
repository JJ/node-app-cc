var request = require('supertest'), 
should = require('should'),
app = require('../index.js');

describe( "PUT porra", function() {
    it('should return correct type', function (done) {
	request(app)
	    .put('/porra/uno/dos/tres/4')
	    .expect('Content-Type', /json/)
	    .expect(200,done);
    });
    it('should return ID', function (done) {
	request(app)
	    .put('/porra/mad/bcn/liga/2014')
	    .expect('Content-Type', /json/)
	    .expect(200)
	    .end( function ( error, resultado ) {
		if ( error ) {
		    return done( error );
		}
		resultado.body.should.have.property('ID',"mad-bcn-liga-2014");
		done();
	    });
    });
    it('should create bet correctly', function (done) {
	request(app)
	    .put('/apuesta/porrio/liga/2014/mad/2/bcn/2')
	    .expect('Content-Type', /json/)
	    .expect(200)
	    .end( function ( error, resultado ) {
		if ( error ) {
		    return done( error );
		}
		resultado.body.should.have.property('local','2');
		done();
	    });
    });

});
