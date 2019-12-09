"use strict";

// Definición de la clase Apuesta: `quien` = código de la persona que hace la apuesta `local, visitante` = goles del local y del visitante
class Apuesta {
  constructor(porra,quien,local,visitante) {
    this.local = local;
    this.visitante= visitante;
    this.quien= quien;
    this.porraID = porra.ID;
    porra.nueva_apuesta( this );
  }

  // Devuelve la apuesta como una cadena 
  as_string() {
    return this.quien + ": " + this.resultado();
  }

  // Devuelve el resultado normalizado
  resultado() {
    return this.local + "-" + this.visitante;
  }

  inserta_db( db, tabla ) {
    if ( !db) {
      throw new Error("No se ha definido BD");
    };
    var stmt = db.prepare("INSERT INTO "+ tabla + " (partido, quien_apuesta, goles_local, goles_visitante) VALUES (?,?,?,?)");
    stmt.run( this.porra, this.quien, this.local, this.visitante );
    stmt.finalize();
  }
}

module.exports = { Apuesta };
