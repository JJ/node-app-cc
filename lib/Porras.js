const { Apuesta } = require("./Apuesta.js");

class Porras {

    constructor( dator ) {
      this.dator = dator;
    }

    nueva( porra ) {
      this.dator.nueva( porra );
    }

    porra( porra_ID ) {
      return this.dator.porra( porra_ID );
    }

    todas() {
	return this.dator.todas();
    }

    apuesta( porra, menda, goles_local, goles_visitante ) {
      this.dator.apuesta( porra, menda, goles_local, goles_visitante );
      return new Apuesta( porra.ID, menda, goles_local, goles_visitante);
    }

    resultado( porra_ID, goles_local, goles_visitante ) {
	this.dator.resultado( porra_ID, goles_local, goles_visitante );
    }

    ganadores( porra_ID ) {
	return this.dator.ganadores(porra_ID);
    }
}

module.exports = { Porras };
