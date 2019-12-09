#!/usr/bin/env node

// Ejecutar antes `grunt creadb`
var db_file = process.argv[2] || "porrio.db.sqlite3";
var apuesta = require("./Apuesta.js");
var porra = require("./Porra.js");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(db_file);

var nueva_porra = new porra.Porra('Polopos','Alhama','Copa D', 2014);
nueva_porra.inserta_db( db, 'partido');

var gente = [ 'Juan','María','Flor'];
while ( gente.length > 0 ) {
    var goles_favor = Math.floor((Math.random() * 5) + 1); 
    var goles_contra = Math.floor((Math.random() * 5) + 1);
    var quien = gente.splice(Math.floor(Math.random()*gente.length), 1).pop();
    var nueva_apuesta= new apuesta.Apuesta ( nueva_porra, quien, goles_favor, goles_contra );
    console.log( nueva_apuesta );
    nueva_apuesta.inserta_db( db, 'apuesta');
					     
}




