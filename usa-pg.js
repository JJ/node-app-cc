#!/usr/bin/env node

var fs = require('fs')
, pg = require('pg')
, connectionString = process.env.DATABASE_URL;
 
var apuesta = require("./Apuesta.js");
var porra = require("./Porra.js");

var client = new pg.Client(connectionString);
client.connect();

// Crea la base de datos
var create_sql = fs.readFileSync("porrio.sql","utf8");
console.log(create_sql);
var query = client.query(create_sql);
query.on('end', function() { 

    console.log("Creada");
    client.end();
});




