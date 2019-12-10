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

    directory() {
	return `${ this.folder }/${ porra.year }/${ porra.competition }/${ porra.local }/${ porra.visitante }/`;
    }
    nueva( porra ) {
	fs.mkdirSync( this.directory(), { recursive: true });
    }
  
  porra( porra_ID ) {
      const { competition, year, local, visitante } = porra_ID.split("-");
      const directory = porra_ID.split("-").join("/");
      if ( fs.lstatSync(`${ this.folder }/${ directory }`).isDirectory() ) {
	  
      }
  }

  todas() {
    throw new Error("Hay que implementar el método 'todas()'");
  }
  
  resultado( porra_ID, goles_local, goles_visitante ) {
    throw new Error("Hay que implementar el método 'resultado( porra_ID, goles_local, goles_visitante )'");
  }
}

module.exports = { FSDator };
