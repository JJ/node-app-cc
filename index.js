"use strict";

var express = require('express');
var app = express();

var apuesta = require("./Apuesta.js");
var porra = require("./Porra.js");

var porras = new Object;

// Establece el IP y el puerto dependiendo del PaaS que sea
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'; 
app.set('port', (process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5000));
app.use(express.static(__dirname + '/public'));

// Crea una porra
app.put('/porra/:competition/:year/:local/:visitante', function( req, response ) {
    var nueva_porra = new porra.Porra(req.params.local,req.params.visitante,
				      req.params.competition, req.params.year );
    porras[nueva_porra.ID] = nueva_porra;
    response.status(200).send( nueva_porra );
});


app.put('/apuesta/:menda/:competition/:year/:local/:goles_local/:visitante/:goles_visitante', function( req, response ) {
    var esta_porra = new porra.Porra(req.params.local,req.params.visitante,
				     req.params.competition, req.params.year );
    if ( !porras[esta_porra.ID] ) {
	response.status(404).send("No existe esa porra");
    } else {
	var esta_apuesta = 
	    new apuesta.Apuesta( porras[esta_porra.ID], req.params.menda, 
				 req.params.goles_local, 
				 req.params.goles_visitante );
	porras[esta_porra.ID].apuestas[req.params.menda] = esta_apuesta;
	response.status(200).send( esta_apuesta );
    }
    
});

// Establece el resultado de la porra
app.post('/porra/resultado/:competition/:year/:local/:goles_local/:visitante/:goles_visitante', function( req, response ) {
    var esta_porra = new porra.Porra(req.params.local,req.params.visitante,
				     req.params.competition, req.params.year );
    if ( !porras[esta_porra.ID] ) {
	response.status(404).send("No existe esa porra");
    } else {
	porras[esta_porra.ID].resultado = req.params.goles_local + "-" + req.params.goles_visitante;
	response.status(200).send( porras[esta_porra.ID] );
    }
    
});  
  

// Baja todas las porras que haya en un momento determinado
app.get('/porras', function(request, response) {
    response.send( porras );
});

// Baja todas las apuestas de un partido determinado
app.get('/porra/:ID', function(request, response) {
    var esta_porra_ID = request.params.ID;
    if ( !porras[esta_porra_ID] ) {
	response.status(404).send("No existe esa porra");
    } else {
	response.status(200).send( porras[esta_porra_ID] );
    }
});

// Recupera el ganador o ganadores de la porra
app.get('/porra/ganador/:competition/:year/:local/:visitante/', function( req, response ) {
    var esta_porra = new porra.Porra(req.params.local,req.params.visitante,
				     req.params.competition, req.params.year );
    if ( !porras[esta_porra.ID] ) {
	response.status(404).send("No existe esa porra");
    } else {
	if ( !porras[esta_porra.ID].resultado ) {
	    response.status(404).send("No hay resultado para ese partido");
	} else {
	    response.status(200).send( porras[esta_porra.ID].ganadores() );
	}
    }
    
});  

// Escucha en un puerto determinado.
app.listen(app.get('port'), server_ip_address, function() {
  console.log("Node app is running at " + server_ip_address + ":" + app.get('port'));
});

// Exporta la variable para poder hacer tests
module.exports = app;
