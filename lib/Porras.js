
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
    var esta_apuesta = 
	    new Apuesta( porra, menda, 
			 goles_local, 
			 goles_visitante );
    return this.porras[porra.ID].apuestas[menda] = esta_apuesta;
  }

  resultado( porra_ID, goles_local, goles_visitante ) {
    this.porras[porra_ID].resultado = goles_local + "-" + goles_visitante;
  }
}

module.exports = { Porras };
