"use strict";

const express = require('express');
const app = express();

const { Apuesta } = require("./Apuesta.js");
const { Porras } = require( "./Porras.js" );
const { FSDator } = require( "./FSDator.js" );

const porra = require("./Porra.js");

const dator = new FSDator("porras");
const porras = new Porras( dator );
const crea_id = porra.crea_id;

app.get('/', function(req, response) {
  response.status(200).send( { status: "OK" } );
}

// Crea una porra
app.put('/porra/:competition/:year/:local/:visitante', function( req, response ) {
    const nueva_porra = new porra.Porra(req.params.local,req.params.visitante,
				      req.params.competition, req.params.year );
    porras.nueva( nueva_porra );
    response.status(200).send( nueva_porra );
});


app.put('/apuesta/:menda/:competition/:year/:local/:goles_local/:visitante/:goles_visitante', function( req, response ) {
    const ID = crea_id(req.params.local,req.params.visitante,
		     req.params.competition, req.params.year );
    if ( !porras.porra(ID) ) {
	response.status(404).send("No existe esa porra");
    } else {
      const esta_apuesta = porras.apuesta( porras.porra(ID), req.params.menda, 
					 req.params.goles_local, 
					 req.params.goles_visitante );
      response.status(200).send( esta_apuesta );
    }

});

// Establece el resultado de la porra
app.post('/porra/resultado/:competition/:year/:local/:goles_local/:visitante/:goles_visitante', function( req, response ) {
    const ID = crea_id(req.params.local,req.params.visitante,
		     req.params.competition, req.params.year );
    if ( !porras.porra(ID) ) {
	response.status(404).send("No existe esa porra");
    } else {
	porras.resultado(ID, req.params.goles_local, req.params.goles_visitante );
	response.status(200).send( porras.porra(ID) );
    }

});


// Baja todas las porras que haya en un momento determinado
app.get('/porras', function(request, response) {
    response.send( porras.todas() );
});

// Baja todas las apuestas de un partido determinado
app.get('/porra/:ID', function(request, response) {
    const esta_porra_ID = request.params.ID;
    if ( !porras.porra(esta_porra_ID ) ) {
	response.status(404).send("No existe esa porra");
    } else {
	response.status(200).send( porras.porra(esta_porra_ID) );
    }
});

// Recupera el ganador o ganadores de la porra
app.get('/porra/ganador/:competition/:year/:local/:visitante/', function( req, response ) {
    const ID= crea_id(req.params.local,req.params.visitante,
		    req.params.competition, req.params.year );
    if ( !porras.porra(ID) ) {
	response.status(404).send("No existe esa porra");
    } else {
	if ( !porras.porra(ID).resultado ) {
	    response.status(404).send("No hay resultado para ese partido");
	} else {
	    response.status(200).send( porras.ganadores( ID ) );
	}
    }

});

// Exporta la variable para poder hacer tests
module.exports = app;
