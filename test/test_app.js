const request = require('supertest'), 
should = require('should'),
app = require('../lib/Rutas.js'),
want_id = "mad-bcn-liga-2014";

describe( "Health check", function() {
  it('should return health check', function (done) {
	request(app)
	    .get('/')
	    .expect('Content-Type', /json/)
	    .expect(200,done);
    });
});

describe( "Crea porra y apuestas", function() {
    it('should return correct type', function (done) {
	request(app)
	    .put('/porra/uno/dos/tres/4')
	    .expect('Content-Type', /json/)
	    .expect(200,done);
    });
    it('should return ID', function (done) {
	request(app)
	    .put('/porra/liga/2014/mad/bcn')
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
    it('should return 2 bets', function (done) {
      request(app)
      .get('/porras')
      .expect('Content-Type', /json/)
      .expect(200)
      .end( function ( error, resultado ) {
	if ( error ) {
	  return done( error );
	}
	resultado.body.should.not.be.empty;
	Object.keys(resultado.body).length.should.be.eql(2);
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
	    });
	request(app)
	    .put('/apuesta/porrio2/liga/2014/mad/2/bcn/2')
	    .expect('Content-Type', /json/)
	    .expect(200)
	    .end( function ( error, resultado ) {
		if ( error ) {
		    return done( error );
		}
		resultado.body.should.have.property('visitante','2');
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
	    .get('/porra/ganador/liga/2014/mad/bcn')
	    .expect('Content-Type', /json/)
	    .expect(200)
	    .end( function ( error, resultado ) {
		if ( error ) {
		    return done( error );
		}
		resultado.body.should.have.length(2);
		done();
	    });
    });

});
