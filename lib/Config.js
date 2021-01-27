const { config }  = require("dotenv").config();
const config_prefix = 'hitosIV';

class Config {
  constructor() {
    var self = this;
    self.assign_default_ip = () => {
      self.listening_ip_address = process.env.LISTENING_IP_ADDRESS || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
    };
    self.assign_default_port = () => {
      self.port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5000;
    }
    self.assign_defaults = () => {
      self.assign_default_ip();
      self.assign_default_port();
    }
    const consul = require('consul')();
    consul.agent.service.list(function(err, result) {
      if (err) {
        console.log( "Consul no está conectado" );
        self.assign_defaults();
      } else {
        consul.kv.get( config_prefix + 'listening_ip_address',
                     function( err, result ) {
                       if (result === undefined ) {
                         assign_default_ip();
                       } else {
                         self.listening_ip_address = result;
                       }
                     });

        consul.kv.get( config_prefix + 'listening_ip_port',
                     function( err, result ) {
                       if (result === undefined ) {
                         assign_default_port();
                       } else {
                         self.port = result;
                       }
                     });
      }
    });

  }
}

module.exports = { Config };