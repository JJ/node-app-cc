var should = require("should");

const { FSDator } =  require(__dirname+"/../lib/FSDator.js");

// Variable global
var dator = new FSDator();


// si se quiere probar la base de datos, ejecutar antes `grunt creadb`
describe('FSDator', function(){
  // Testea que se haya cargado bien la librería
  describe('Carga', function(){
    it('Debería estar cargado el módulo', function( done ){
      FSDator.should.not.be.null;
      dator.should.not.be.null;
      done();
    });
  });


});

