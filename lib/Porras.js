const { Apuesta } = require("./Apuesta.js");

class Porras {

    constructor() {
	this.porras = new Object;
    }

    nueva( porra ) {
	this.porras[porra.ID] = porra;
    }

    porra( porra_ID ) {
	return this.porras[porra_ID];
    }

    todas() {
	return this.porras;
    }

    apuesta( porra, menda, goles_local, goles_visitante ) {
	const resultado = goles_local+"-"+goles_visitante;
	if ( typeof this.porras[porra.ID].apuestas[resultado] == 'undefined' ) {
	    this.porras[porra.ID].apuestas[resultado] = [];
	}
	this.porras[porra.ID].apuestas[resultado].push( menda );
	return new Apuesta( porra.ID, menda, goles_local, goles_visitante);
    }

    resultado( porra_ID, goles_local, goles_visitante ) {
	this.porras[porra_ID].resultado = goles_local + "-" + goles_visitante;
    }

    ganadores( porra_ID ) {
	return this.porras[porra_ID].apuestas[this.porras[porra_ID].resultado];
    }
}

module.exports = { Porras };
