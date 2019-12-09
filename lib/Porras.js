
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
    this.porras[porra.ID].apuestas[menda] = esta_apuesta;
  }

  resultado( porra, resultado ) {
    this.porras[ID].resultado = req.params.goles_local + "-" + req.params.goles_visitante;
  }
}

module.exports = { Porras };
