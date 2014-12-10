var assert = require("assert"),
apuesta = require(__dirname+"/../Apuesta.js"),
porra = require(__dirname+"/../Porra.js");

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
    describe('Crea', function(){
	it('Debería crearse correctamente', function(){
	    esta_porra = new porra.Porra( "Marajena", "Gualchos", "Provincial", "2014");
	    console.log(esta_porra);
	    assert.equal(esta_porra.ID, "Marajena-Gualchos-Provincial-2014");
	});
    });
});

describe('Apuesta', function(){
    // Testea que se haya cargado bien la librería
    describe('Carga', function(){
	it('should be loaded', function(){
	    assert(apuesta, "Cargado");
	});
	
    });
    describe('Crea', function(){
	it('should create apuestas correctly', function(){
	    var nueva_apuesta = new apuesta.Apuesta(esta_porra, 'Polopos','Alhama','2-3');
	    assert.equal(nueva_apuesta.as_string(), "Polopos: Alhama - 2-3","Creado");
	});
    });
});
