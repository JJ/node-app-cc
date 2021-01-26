const { config }  = require("dotenv").config();

class Config {
  constructor() {
    this.listening_ip_address = process.env.LISTENING_IP_ADDRESS || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
    this.port = process.env.PORT || process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5000;
  }

}

module.exports = { Config };