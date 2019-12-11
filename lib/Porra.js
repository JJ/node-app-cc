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
    this.resultado = null;
    this.ID = crea_id( local,visitante,competition,year );
    // métodos
    this.vars = vars;
    this.las_apuestas = las_apuestas;
    this.crea_id = crea_id;
    this.apuestas_para = apuestas_para;
}

exports.crea_id = crea_id;

// Devuelve las variables de instancia
function vars() {
    return ['local','visitante','competition','year'];
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
    console.log( "This " , this );
    return this.apuestas[ resultado ];
}




