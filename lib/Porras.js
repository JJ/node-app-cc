
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
  
  apuesta( porra, menda, goles_local, goles_visitante ) {
    var esta_apuesta = 
	    new Apuesta( porra, menda, 
			 goles_local, 
			 goles_visitante );
    porras[porra.ID].apuestas[menda] = esta_apuesta;
  }
}

module.exports = { Porras };
