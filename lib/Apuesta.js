"use strict";

// Definición de la clase Apuesta: `quien` = código de la persona que hace la apuesta `local, visitante` = goles del local y del visitante
exports.Apuesta = function (porra,quien,local,visitante) {
    this.local = local;
    this.visitante= visitante;
    this.quien= quien;
    this.porra = porra.ID;
    porra.nueva_apuesta( this );
    // Métodos
    this.resultado = resultado;
    this.as_string = as_string;
    this.inserta_db = inserta_db;
}

// Devuelve la apuesta como una cadena 
function as_string() {
    return this.quien + ": " + this.resultado();
}

// Devuelve el resultado normalizado
function resultado() {
    return this.local + "-" + this.visitante;
}

function inserta_db( db, tabla ) {
    if ( !db) {
	throw new Error("No se ha definido BD");
    };
    var stmt = db.prepare("INSERT INTO "+ tabla + " (partido, quien_apuesta, goles_local, goles_visitante) VALUES (?,?,?,?)");
    stmt.run( this.porra, this.quien, this.local, this.visitante );
    stmt.finalize();
}

