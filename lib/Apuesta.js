"use strict";

// Definición de la clase Apuesta: `quien` = código de la persona que hace la apuesta `local, visitante` = goles del local y del visitante
class Apuesta {
  constructor(porra,quien,local,visitante) {
    this.local = local;
    this.visitante= visitante;
    this.quien= quien;
    this.porraID = porra.ID;
  }

  // Devuelve la apuesta como una cadena 
  as_string() {
    return this.porraID + " → " + this.quien + ": " + this.resultado();
  }

  // Devuelve el resultado normalizado
  resultado() {
    return this.local + "-" + this.visitante;
  }

}

module.exports = { Apuesta };
