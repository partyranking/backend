'use strict';
var express, mongoose, nconf, bodyParser, methodOverride, basicAuth,
    app;

express        = require('express');
mongoose       = require('mongoose');
nconf          = require('nconf');
bodyParser     = require('body-parser');
methodOverride = require('method-override');
basicAuth      = require('basic-auth');

nconf.argv();
nconf.env();
nconf.defaults(require('./config'));
mongoose.connect(nconf.get('MONGOLAB_URI'));

app = express();
app.use(bodyParser());
app.use(methodOverride());
app.options('/*', function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', request.get('Access-Control-Request-Method'));
    response.header('Access-Control-Allow-Headers', request.get('Access-Control-Request-Headers'));
    response.send({});
});
app.listen(nconf.get('PORT'));

module.exports = app;
