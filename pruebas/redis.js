#!/usr/bin/env node

var redis = require('redis');
var url = require('url');

var redisURL = url.parse(process.env.REDISCLOUD_URL);
console.log(redisURL);
var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true, auth_pass: redisURL.auth.split(":")[1]});

client.set("zape", "zipi", redis.print );
client.get("zape", function (err, reply) {
    console.log( 'Get ' );
    if ( err ) {
	console.log( err );
    } else {
	console.log(reply.toString());
    }
});
client.hset("un_foo", "bar", "baz", redis.print);
client.hset("un_foo", "quux", "zuuz", redis.print);
client.hkeys("un_foo", function (err, replies) {
    console.log( 'hkeys');
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    console.log( "End " );
    client.end();
});

