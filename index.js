var express = require('express');
var app = express();

// recuerda ejecutar antes grunt creadb
var apuesta = require("./Apuesta.js");
var porra = require("./Porra.js");

var porras = new Object, 
apuestas = new Object;

app.set('port', (process.env.PORT || 5000));
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
	if ( !apuestas[esta_porra.ID] ) {
	    apuestas[esta_porra.ID] = new Object;
	} 

	apuestas[esta_porra.ID][req.params.menda] = 
	    new apuesta.Apuesta( esta_porra, req.params.menda, 
				 req.params.goles_local, 
				 req.params.goles_visitante );
	
	response.status(200).send( apuestas[esta_porra.ID][req.params.menda] );
    }
    
});  

app.get('/porras', function(request, response) {
    response.send( porras );
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

module.exports = app;
