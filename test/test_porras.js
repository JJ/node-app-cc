var should = require("should"),
    porra = require(__dirname+"/../lib/Porra.js");

const { Porras } =  require(__dirname+"/../lib/Porras.js");

// Variable global
var esta_porra = new porra.Porra( "Marajena", "Gualchos", "Provincial", "2014"),
    estas_porras = new Porras();


// si se quiere probar la base de datos, ejecutar antes `grunt creadb`
describe('Porras', function(){
    // Testea que se haya cargado bien la librería
    describe('Carga', function(){
	it('Debería estar cargado el módulo', function( done ){
	    Porras.should.not.be.null;
	    done();
	});
	
    });

});

