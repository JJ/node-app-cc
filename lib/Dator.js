
class Dator {
  constructor() {
    if (this.constructor == Dator) {
      throw new Error("Clase abstracta no instanciable");
    }
  }
  
  nueva( porra ) {
    throw new Error("Hay que implementar el método 'nueva(porra)'");
  }
  
  porra( porra_ID ) {
    throw new Error("Hay que implementar el método 'porra(porra_ID)'");
  }

  todas() {
    throw new Error("Hay que implementar el método 'todas()'");
  }
  
  resultado( porra_ID, goles_local, goles_visitante ) {
    throw new Error("Hay que implementar el método 'resultado( porra_ID, goles_local, goles_visitante )'");
  }
}

module.exports = { Dator };
