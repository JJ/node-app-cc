class Porras {
    constructor() {
	this.porras = new Object;
    }

    nueva( porra ) {
	this.porras[porra] = porra;
    }

    porra( porra_ID ) {
	return this.porras[porra.ID];
    }
}

module.exports = { Porras };
