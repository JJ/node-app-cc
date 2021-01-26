var assert = require("assert"),
    should = require("should");

const { Config } = require(__dirname+"/../lib/Config.js");

const config = new Config;
console.log( config );

describe('Configuración', function(){
    // Testea que se haya cargado bien la librería
    describe('Carga', function(){
	it('Debería estar cargada la configuración', function(){
	    assert(config, "Cargada");
	});
    });

    describe('Valores', function(){
      it('Debería tener una IP correcta', function(){
        const listening_ip_address = config.listening_ip_address;
	assert.ok( listening_ip_address );
        assert.match( listening_ip_address, /localhost|\d+\.\d+\.\d+\.\d+/ );
      });

      it('Debería tener un puerto correcto', function(){
	  assert.ok( config.port );
          assert.notEqual( config.port, 0 );
      });

    });
});
