var express = require('express');
var app = express();

// recuerda ejecutar antes grunt creadb
var db_file = "porrio.db.sqlite3";
var apuesta = require("./Apuesta.js");
var porra = require("./Porra.js");

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(db_file);


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.put('/porra/:local/:visitante/:competition/:year', function( req, response ) {
    var nueva_porra = new porra.Porra(req.params.local,req.params.visitante,
				      req.params.competition, req.params.year );
    nueva_porra.inserta_db( db, 'partido');
    response.send(nueva_porra)
});

app.get('/porras', function(request, response) {
    db.all("SELECT * FROM partido", function(err, rows) {
	response.send( rows );
    });
    
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
