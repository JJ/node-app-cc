#Porr.io Aplicación de ejemplo para el curso de nube

[![Build Status](https://travis-ci.org/JJ/node-app-cc.svg?branch=master)](https://travis-ci.org/JJ/node-app-cc)

## Intro

Aplicación que implementa una porra deportiva. Tiene dos clases,
[Porra](http://jj.github.io/node-app-cc/docs/Porra.html) y
[Apuesta](http://jj.github.io/node-app-cc/docs/Apuesta.html) y [una
aplicación basada en express.js](http://jj.github.io/node-app-cc/docs/index.html). 


## Requisitos

1. Instalar grunt y mocha

```
	npm install -g grunt-cli
	npm install -g mocha
```

2. Instalar dependencias

	npm install .

3. Funciona en OpenShift o Heroku. Tras abrir la cuenta, push a cualquiera de ellos. Para ejecutar en local

	npm start

O, si se tiene instalado el Toolbelt de Heroku

	foreman start web





## Developed from node-js-getting-started (original docs below)

A barebones Node.js app using [Express 4](http://expressjs.com/).

This application support the
[Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
article - check it out.  

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone git@github.com:heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
