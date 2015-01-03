var request = require('supertest'), 
should = require('should'),
app = require('../index.js'),
want_id = "mad-bcn-liga-2014";

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
		resultado.body.should.have.property('ID', want_id);
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
    
    it('should return all bets correctly', function (done) {
	request(app)
	    .get('/porra/'+want_id)
	    .expect('Content-Type', /json/)
	    .expect(200)
	    .end( function ( error, resultado ) {
		if ( error ) {
		    return done( error );
		}
		resultado.body.should.have.property('local','mad');
		done();
	    });
    });

});

describe( "POST porra", function() {
    it('should set result right', function (done) {
	request(app)
	    .post('/porra/resultado/liga/2014/mad/2/bcn/2')
	    .expect('Content-Type', /json/)
	    .expect(200)
	    .end( function ( error, resultado ) {
		if ( error ) {
		    return done( error );
		}
		resultado.body.should.have.property('resultado','2-2');
		done();
	    });
    });
    it('should return winners', function (done) {
	request(app)
	    .post('/porra/ganador/liga/2014/mad/bcn')
	    .expect('Content-Type', /json/)
	    .expect(200)
	    .end( function ( error, resultado ) {
		if ( error ) {
		    return done( error );
		}
		resultado.body.should.exist;
		done();
	    });
    });

});
