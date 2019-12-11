const { Dator } = require("./Dator.js");
const { Apuesta } = require("./Apuesta.js");
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
		const apostadores = fs.readFileSync( dirname + files[f], "utf8" );
		const quienes = apostadores.split("\n");
		const [local,visitante] = files[f].split("-");
		for (var q in quienes ) {
		    var apuesta = new Apuesta( esta_porra, quienes[q], local, visitante );
		    esta_porra.apuestas[quienes[q]] = apuesta ;
		}
	    }
	} else {
	    throw new Error( "No existe esa porra" );
	}
	return esta_porra;
    }

    apuesta( porra, quien, goles_local, goles_visitante ) {
	const filename = this.directory(porra)
	      + `/${ goles_local }-${ goles_visitante}`;
	var quienes;
	if ( fs.existsSync(filename) ) {
	    fs.readFileSync( filename );
	    fs.writeFileSync( filename, quienes + "\n" + quien );
	} else {
	    fs.writeFileSync( filename, quien );
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
