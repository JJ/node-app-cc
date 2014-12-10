var express = require('express');
var app = express();

// recuerda ejecutar antes grunt creadb
var apuesta = require("./Apuesta.js");
var porra = require("./Porra.js");

var porras = new Array;

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.put('/porra/:local/:visitante/:competition/:year', function( req, response ) {
    var nueva_porra = new porra.Porra(req.params.local,req.params.visitante,
				      req.params.competition, req.params.year );
    porras.push(nueva_porra);
    response.send(nueva_porra);
});

app.get('/porras', function(request, response) {
    response.send( porras );
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

module.exports = app;
