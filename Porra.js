// Definición de la clase Apuesta: `quien` = código de la persona que hace la apuesta `local, visitante` = goles del local y del visitante
exports.Porra = function (local,visitante,competition,year) {
    this.local = local;
    this.visitante= visitante;
    this.competition= competition;
    this.year = year;
    this.apuestas = new Array;
    this.ID = local+"-"+visitante+"-"+competition+"-"+year;
    // functions
    this.nueva_apuesta = nueva_apuesta;
    this.las_apuestas = las_apuestas;
    this.inserta_db = inserta_db;
}

function nueva_apuesta( apuesta ) {
    this.apuestas.push( apuesta );
}

function las_apuestas () {
    return this.apuestas;
}

function inserta_db( db, tabla ) {
    if ( !db) {
	throw new Error("No se ha definido BD");
    };
    var stmt = db.prepare("INSERT INTO "+ tabla + " VALUES (?, ?,?,?,?)");
    stmt.run( this.ID, this.local, this.visitante, this.competition, this.year );
    stmt.finalize();
}
