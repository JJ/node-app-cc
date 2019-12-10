const { Dator } = require("./Dator.js");
const porra = require("./Porra.js");
const fs = require("fs");

class FSDator extends Dator {
  constructor( path ) {
      super();
      if (path) {
	  fs.mkdirSync( path );
	  this.folder = path;
      } else {
	  this.folder = fs.mkdtempSync( "dator-" );
      }
	  
  }
  
    nueva( porra ) {
	fs.mkdirSync( `${ this.folder }/${ porra.year }/${ porra.competition }/${ porra.local }/${ porra.visitante }/`, { recursive: true });
  }
  
  porra( porra_ID ) {
      var porra = { porra_ID
  }

  todas() {
    throw new Error("Hay que implementar el método 'todas()'");
  }
  
  resultado( porra_ID, goles_local, goles_visitante ) {
    throw new Error("Hay que implementar el método 'resultado( porra_ID, goles_local, goles_visitante )'");
  }
}

module.exports = { FSDator };
