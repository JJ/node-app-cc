var request = require('supertest'), 
app = require('../index.js');

describe( "PUT porra", function() {
    it('should create', function (done) {
	request(app)
	    .put('/porra/uno/dos/tres/4')
	    .expect('Content-Type', /json/)
	    .expect(200,done);
    });
});
