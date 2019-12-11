var should = require("should"),
    porra = require(__dirname+"/../lib/Porra.js");

const fs = require("fs");
const { FSDator } =  require(__dirname+"/../lib/FSDator.js");

// Variable global
var dator = new FSDator();
var esta_porra = new porra.Porra( "Marajena", "Gualchos", "Provincial", "2014");

// si se quiere probar la base de datos, ejecutar antes `grunt creadb`
describe('FSDator', function(){
  // Testea que se haya cargado bien la librería
    describe('Carga', function(){
	it('Debería estar cargado el módulo', function( done ){
	    FSDator.should.not.be.null;
	    dator.should.not.be.null;
	    esta_porra.should.not.be.null;
	    done();
	});
    });

    describe('Crea', function(){
	it('Debería crear correctamente el directorio', function( done ){
	    dator.nueva(esta_porra);
	    var folder = dator.folder;
	    fs.lstatSync(`${ folder }/${ esta_porra.year }/${ esta_porra.competition }/${ esta_porra.local }/${ esta_porra.visitante }/`).isDirectory().should.be.ok;
	    done();
	});
    });

    describe('Recupera', function(){
	it('Debería recuperar correctamente la porra', function( done ){
	    const porra_recuperada = dator.porra( esta_porra.ID );
	    porra_recuperada.should.have.property('ID').and.be.eql( esta_porra.ID );
	    should.deepEqual( porra_recuperada, esta_porra );
	    done();
	});
    });

});

describe('Probando apuestas', function(){
  // Testea que se haya cargado bien la librería
    describe('Crea', function(){
	it('Debería poder crear una apuesta', function( done ){
	    dator.apuesta( esta_porra, "foo", 2,3 );
	    dator.apuesta( esta_porra, "bar", 3,2 );
	    const porra_recuperada = dator.porra( esta_porra.ID );
	    Object.keys(porra_recuperada.apuestas).length.should.be.eql(2);
	    porra_recuperada.apuestas['foo'].should.have.property("porraID").and.be.eql(porra_recuperada.ID);
	    done();
	});
    });
});
