"use strict";

const express = require('express');
const app = require("./Rutas.js");
const { Config } = require("./Config.js");

const config = new Config;

app.use(express.static(__dirname + '/public'));

// Escucha en un puerto determinado.
app.listen(config.port, config.listening_ip_address, function() {
  console.log("Node app is running at " + config.listening_ip_address + ":" + config.port );
});