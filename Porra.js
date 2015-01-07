"use strict";

// Definición de la clase Porra: 
//
//    var esta_porra = new Porra( local,visitante,competition,year);
//
//* `local, visitante` = equipos local y visitante
//* `competition` = competición: liga, copa, Champions, lo que sea
//*  `year` = año para crear ID único de porra

exports.Porra = function (local,visitante,competition,year) {
    this.local = local;
    this.visitante= visitante;
    this.competition= competition;
    this.year = year;
    this.apuestas = new Object;
    this.ID = crea_id( local,visitante,competition,year );
    // métodos
    this.vars = vars;
    this.nueva_apuesta = nueva_apuesta;
    this.las_apuestas = las_apuestas;
    this.inserta_db = inserta_db;
    this.crea_id = crea_id;
    this.apuestas_para = apuestas_para;
}

// Devuelve las variables de instancia
function vars() {
    return ['local','visitante','competition','year'];
}

// Añade una apuesta de tipo `Apuesta` a la porra
function nueva_apuesta( apuesta ) {
    var resultado = apuesta.local + "-" + apuesta.visitante;
    if ( !this.apuestas[ resultado ] ) {
	this.apuestas[ resultado ] = [];
    }
    this.apuestas[ resultado ].push( apuesta );

}

// Función única para crear el ID encadenando variables
function crea_id ( local, visitante, competition, year ) {
    return local+"-"+visitante+"-"+competition+"-"+year;
}

// Devuelve una estructura de datos con las apuestas
function las_apuestas () {
    return this.apuestas;
}

// Devuelve las apuestas para un resultado determinado. Igual que `porra.las_apuestas()[resultado]`
function apuestas_para ( resultado ) {
    return this.apuestas[ resultado ];
}

// Inserta la porra (sin apuestas) en una base de datos.
function inserta_db( db, tabla ) {
    if ( !db) {
	throw new Error("No se ha definido BD");
    };
    var stmt = db.prepare("INSERT INTO "+ tabla + " VALUES (?, ?,?,?,?)");
    stmt.run( this.ID, this.local, this.visitante, this.competition, this.year );
    stmt.finalize();
}
