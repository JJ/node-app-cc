"use strict";

const express = require('express');
const app = require("./Rutas.js");

// Establece el IP y el puerto dependiendo del PaaS que sea
const server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'; 
app.set('port', (process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5000));
app.use(express.static(__dirname + '/public'));

// Escucha en un puerto determinado.
app.listen(app.get('port'), server_ip_address, function() {
  console.log("Node app is running at " + server_ip_address + ":" + app.get('port'));
});