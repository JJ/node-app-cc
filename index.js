var express = require('express');
var app = express();

// recuerda ejecutar antes grunt creadb
var apuesta = require("./Apuesta.js");
var porra = require("./Porra.js");

var porras = new Object, 
apuestas = new Object;

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
app.set('port', (process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.put('/porra/:local/:visitante/:competition/:year', function( req, response ) {
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
	    new apuesta.Apuesta( esta_porra, req.params.menda, 
				 req.params.goles_local, 
				 req.params.goles_visitante );
	porras[esta_porra.ID].nueva_apuesta( esta_apuesta )
	response.status(200).send( esta_apuesta );
    }
    
});

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
    esta_porra_ID = request.params.ID;
    if ( !porras[esta_porra_ID] ) {
	response.status(404).send("No existe esa porra");
    } else {
	response.status(200).send( porras[esta_porra_ID] );
    }
});

// Escucha en un puerto determinado.
app.listen(app.get('port'), server_ip_address, function() {
  console.log("Node app is running at " + server_ip_address + ":" + app.get('port'));
});

// Exporta la variable para poder hacer tests
module.exports = app;
