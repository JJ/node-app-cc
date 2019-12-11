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
  
    directory( porra ) {
	return `${ this.folder }/${ porra.year }/${ porra.competition }/${ porra.local }/${ porra.visitante }/`;
    }

    nueva( porra ) {
	fs.mkdirSync( this.directory( porra ), { recursive: true });
    }
  
    porra( porra_ID ) {
	const [ local, visitante, competition, year ] = porra_ID.split("-");
	const esta_porra = new porra.Porra( local, visitante, competition, year );
	const dirname = this.directory( esta_porra );
	if ( fs.lstatSync(dirname).isDirectory() ) {
	    var files = fs.readdirSync(dirname);
	    for (var f in files) {
		const valores_apuesta = fs.readFileSync( dirname + "/" + f );
		const { local, visitante } = valores_apuesta.split("-");
		var apuesta = new Apuesta( porra, f.split(".")[0], local, visitante );
		porra.nueva_apuesta( apuesta );
	    }
	} else {
	    throw new Error( "No existe esa porra" );
	}
	return porra;
    
  }

    todas() {
	throw new Error("Hay que implementar el método 'todas()'");
    }
    
    resultado( porra_ID, goles_local, goles_visitante ) {
	throw new Error("Hay que implementar el método 'resultado( porra_ID, goles_local, goles_visitante )'");
    }
}

module.exports = { FSDator };
