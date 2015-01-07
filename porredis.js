#!/usr/bin/env node

var redis = require('redis');
var url = require('url');

var apuesta = require("./Apuesta.js"),
porra = require("./Porra.js");

var redisURL = url.parse(process.env.REDISCLOUD_URL);
var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true, auth_pass: redisURL.auth.split(":")[1]});

var esta_porra = new porra.Porra("MUNIT", "MCITY", "Premier", 2003+Math.floor(Math.random()*20) );
console.log(esta_porra);
for ( var i in esta_porra.vars() ) {
    client.hset(esta_porra.ID, "var:"+esta_porra.vars()[i], esta_porra[i], redis.print);
}

var bettors = ['UNO', 'OTRO','OTROMAS'];

for ( var i in bettors ) {
    var esta_apuesta = new apuesta.Apuesta(esta_porra, bettors[i], Math.floor(Math.random()*5), Math.floor(Math.random()*4) );
    client.hset(esta_porra.ID, "bet:"+esta_apuesta.quien, esta_apuesta.resultado());
    client.sadd( esta_porra.ID+":"+esta_apuesta.resultado(), esta_apuesta.quien,redis.print );
    
}

client.hkeys(esta_porra.ID, function (err, replies) {
    console.log( 'hkeys');
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    console.log( "End " );
    client.end();
});
