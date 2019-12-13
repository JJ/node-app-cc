var should = require("should"),
    porra = require(__dirname+"/../lib/Porra.js");

const fs = require("fs");
const { FSDator } =  require(__dirname+"/../lib/FSDator.js");

// Variable global
var dator = new FSDator();
var esta_porra = new porra.Porra( "Marajena", "Gualchos", "Provincial", "2014");

// Este comentario no tiene nada que ver con nada
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
	    comprueba_porra( dator, esta_porra );
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
      porra_recuperada.apostadores['2-3'].should.not.be.null;
      done();
    });
  });
});

describe('Probando apuestas', function( done ){
  it('Debería poner el resultado correctamente', function(  ) {
    dator.resultado( esta_porra.ID, 3, 2 );
    const porra_recuperada = dator.porra( esta_porra.ID );
    porra_recuperada.should.have.property("resultado").and.be.eql("3-2");
  });
  it('Debería recuperar los ganadores', function( done ) {
    dator.ganadores( esta_porra.ID ).should.not.be.null;
    done();
  });
  
});


describe('Recupera todas', function(){
  describe('Añade nueva porra', function(){

    it('Debería crear correctamente el directorio', function( ){
      const nueva_porra = new porra.Porra( "Ceres", "Plutón", "Solar", "2033");
      comprueba_porra( dator, nueva_porra );
    });

    it('Debería leer correctamente el directorio', function( ){
      fs.readdirSync(dator.folder ).length.should.not.eql(0);
      var todas_porras = dator.todas();
      todas_porras.length.should.be.eql(2);
    });

  });
});

function comprueba_porra( dator, nueva_porra ) {
  dator.nueva(nueva_porra);
  var folder = dator.folder;
  fs.readdirSync(folder ).length.should.not.eql(0);
  fs.lstatSync(`${ folder }/${ nueva_porra.year }/${ nueva_porra.competition }/${ nueva_porra.local }/${ nueva_porra.visitante }/`).isDirectory().should.be.ok;
}
