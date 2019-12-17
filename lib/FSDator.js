const { Dator } = require("./Dator.js");
const { Apuesta } = require("./Apuesta.js");
const porra = require("./Porra.js");
const fs = require("fs");

class FSDator extends Dator {
  constructor( path ) {
    super();
    if (path) {
      if ( ! fs.existsSync(path) ) {
        fs.mkdirSync( path );
      }
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
	    for (var f of files) {
		if ( f != 'resultado' ) {
		    const apostadores = fs.readFileSync( dirname + f, "utf8" );
		    const quienes = apostadores.split("\n");
		    const [local,visitante] = f.split("-");
		    for (var q in quienes ) {
		      var apuesta = new Apuesta( esta_porra, quienes[q], local, visitante );
		      esta_porra.apuestas[quienes[q]] = apuesta ;
                      if ( !esta_porra.apostadores ) {
                        esta_porra.apostadores = new Object;
                      }
			if ( ! (f in esta_porra.apostadores) ) {
                         esta_porra.apostadores[f] = [];
                      }
                      esta_porra.apostadores[f].push( quienes[q] );
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
      const dirs =  fs.readdirSync( this.folder );
      var porras = [];
      for (var year of dirs) {
        const year_dir = this.folder + "/" + year;
        for (var competicion of fs.readdirSync( year_dir ) ) {
          const c_dir = year_dir + "/" + competicion;
          for (var local of fs.readdirSync( c_dir ) ) {
            const local_dir = c_dir + "/" + local;
            for (var visitante of fs.readdirSync( local_dir ) ) {
              var esta_porra = new porra.Porra( local, visitante, competicion, year );
              this.llena( esta_porra );
              porras.push( esta_porra );
            }
          }
        }
      }
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

  ganadores( porra_ID ) {
    const this_porra = this.porra(porra_ID);
    return this_porra.apostadores[ this_porra.resultado ];
  }
}

module.exports = { FSDator };
