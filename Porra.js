"use strict";

// Definición de la clase Apuesta: `quien` = código de la persona que hace la apuesta `local, visitante` = goles del local y del visitante
exports.Porra = function (local,visitante,competition,year) {
    this.local = local;
    this.visitante= visitante;
    this.competition= competition;
    this.year = year;
    this.apuestas = new Object;
    this.ID = crea_id( local,visitante,competition,year );
    // functions
    this.nueva_apuesta = nueva_apuesta;
    this.las_apuestas = las_apuestas;
    this.inserta_db = inserta_db;
    this.crea_id = crea_id;
    this.apuestas_para = apuestas_para;
}

function nueva_apuesta( apuesta ) {
    var resultado = apuesta.local + "-" + apuesta.visitante;
    console.log( "nueva_apuesta antes");
    console.log( this.apuestas );
    if ( !this.apuestas[ resultado ] ) {
	this.apuestas[ resultado ] = [];
    }
    this.apuestas[ resultado ].push( apuesta );
    console.log( "Despues" );
    console.log( this.apuestas );
}

function crea_id ( local, visitante, competition, year ) {
    return local+"-"+visitante+"-"+competition+"-"+year;
}

function las_apuestas () {
    return this.apuestas;
}

function apuestas_para ( resultado ) {
    console.log( "apuestas_para" );
    console.log( resultado );
    console.log( this.apuestas );
    return this.apuestas[ resultado ];
}

function inserta_db( db, tabla ) {
    if ( !db) {
	throw new Error("No se ha definido BD");
    };
    var stmt = db.prepare("INSERT INTO "+ tabla + " VALUES (?, ?,?,?,?)");
    stmt.run( this.ID, this.local, this.visitante, this.competition, this.year );
    stmt.finalize();
}
