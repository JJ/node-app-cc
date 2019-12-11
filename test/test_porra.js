var assert = require("assert"),
    should = require("should"),
    porra = require(__dirname+"/../lib/Porra.js");

const { Apuesta } = require(__dirname+"/../lib/Apuesta.js");

// Variable global
var esta_porra;

// si se quiere probar la base de datos, ejecutar antes `grunt creadb`
describe('Porra', function(){
    // Testea que se haya cargado bien la librería
    describe('Carga', function(){
	it('Debería estar cargado el módulo', function(){
	    assert(porra, "Cargado");
	});
    });

    describe('ID', function(){
	it('Debería generar ID correcto', function(){
	    var un_id = esta_porra.crea_id( "1", "2", "3", "4");
	    assert.equal(un_id, "1-2-3-4");
	});
    });
    esta_porra = new porra.Porra( "Marajena", "Gualchos", "Provincial", "2014");   

    describe('Crea', function(){
	it('Debería crearse correctamente', function(){
	    assert.equal(esta_porra.ID, "Marajena-Gualchos-Provincial-2014");
	});
    });

});

describe('Apuesta', function(){
    // Testea que se haya cargado bien la librería
    describe('Carga', function(){
	it('should be loaded', function(){
          Apuesta.should.not.be.null;
	});
	
    });
    describe('Crea', function(){
	it('should create apuestas correctly', function(){
	  const nueva_apuesta = new Apuesta(esta_porra, 'Menda','2','3');
	    assert.equal(nueva_apuesta.as_string(),
			 "Marajena-Gualchos-Provincial-2014 → Menda: 2-3",
			 "Creado");
	});
    });
    describe('Crea', function(){
	it('should create apuestas correctly again', function(){
	    const nueva_apuesta = new Apuesta(esta_porra, 'Lerenda','3','3');
	    assert.equal(nueva_apuesta.as_string(),
			 "Marajena-Gualchos-Provincial-2014 → Lerenda: 3-3",
			 "Creado");
	});
    });

});



