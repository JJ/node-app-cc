var express = require('express');
var app = express();

var db_file = "porrio.db.sqlite3";
var apuesta = require("./Apuesta.js");
var porra = require("./Porra.js");

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(db_file);

var nueva_porra = new porra.Porra('Polopos','Alhama','Copa D', 2014);
nueva_porra.inserta_db( db, 'partido');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send( nueva_porra );
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
