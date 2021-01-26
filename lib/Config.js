const { config }  = require("dotenv").config();

class Configuration {
  constructor() {
    const config = dotenv.config();
    this.server_ip_address = process.env.SERVER_IP_ADDRESS || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
    this.port = process.env.PORT || process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5000;
  }

  server_ip_adress () { return this.server_ip_adress }
  port()              { return this.port }
}