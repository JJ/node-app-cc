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
      estas_porras.should.not.be.null;
      done();
    });
  });

  describe('Añade porra', function(){
      it('Should add new porra', function(){
	  estas_porras.nueva( esta_porra );
	  const porra = estas_porras.porra(esta_porra.ID)
	  porra.should.not.be.null;
	  should.deepEqual( porra, esta_porra, "Insertado igual a almacenado" );
      });
      it('Debería añadir nueva apuesta a la porra', function( done ) {
	  estas_porras.apuesta(esta_porra, "XYZ", 2,2 );
	  should.deepEqual(estas_porras.porra(esta_porra.ID).apuestas["2-2"],['XYZ']);
	  done();
      });
  });

  describe('Resultado', function() {
     it('Should set result correctly', function( done ){
       estas_porras.nueva( esta_porra );
       const porra = estas_porras.porra(esta_porra.ID)
       porra.should.not.be.null;
       should.deepEqual( porra, esta_porra, "Insertado igual a almacenado" );
       estas_porras.resultado( esta_porra.ID, 2,2 );
	 var winners = estas_porras.ganadores(esta_porra.ID);
	 console.log(winners);
	 should.deepEqual(winners,['XYZ']);
       done();
     });
  })

});

