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

    llena( esta_porra ) {
	const dirname = this.directory( esta_porra );
	if ( fs.lstatSync(dirname).isDirectory() ) {
	    var files = fs.readdirSync(dirname);
	    for (var f in files) {
		if ( files[f] != 'resultado' ) {
		    const apostadores = fs.readFileSync( dirname + files[f], "utf8" );
		    const quienes = apostadores.split("\n");
		    const [local,visitante] = files[f].split("-");
		    for (var q in quienes ) {
			var apuesta = new Apuesta( esta_porra, quienes[q], local, visitante );
			esta_porra.apuestas[quienes[q]] = apuesta ;
		    }
		} else {
		    esta_porra.resultado = fs.readFileSync(  dirname + 'resultado', "utf8" );
		}
	    }
	} else {
	    throw new Error( "No existe esa porra" );
	}
    }
  
    porra( porra_ID ) {
	const [ local, visitante, competition, year ] = porra_ID.split("-");
	var esta_porra = new porra.Porra( local, visitante, competition, year );
	this.llena( esta_porra );

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
      console.log( this.folder );
      console.log( fs.readdirSync( this.folder ));
      var porras = [];
//      for (var d in dirs) {
//	const year = dirs[d];
//	console.log( "year ", year );
        //	    var esta_porra = new porra.Porra( local, visitante, competition, year );
        //	    this.llena( esta_porra );
        //	    porras.push[ esta_porra ];
//	}
      return porras;
    }
    
    resultado( porra_ID, goles_local, goles_visitante ) {
	const [ local, visitante, competition, year ] = porra_ID.split("-");
	const dirname = this.directory( new porra.Porra( local, visitante, competition, year ) );
	const str_resultado =  goles_local + "-" + goles_visitante;
	if ( fs.lstatSync(dirname).isDirectory() ) {
	    fs.writeFileSync(dirname + "resultado", str_resultado);
	} else {
	    throw new Error( "No existe esa porra" );
	}
	return str_resultado;
    }
}

module.exports = { FSDator };
