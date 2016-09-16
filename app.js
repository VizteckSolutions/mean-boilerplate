'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var fs = require('fs');
var app = express();
/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load Configurations
var config = require('./core/server/config/config');
var winston = require('./core/server/config/winston');

winston.info('Starting ' + config.app.name + '...');
winston.info('Config loaded: ' + config.NODE_ENV);
winston.debug('Accepted Config:', config);

global.appBaseUrl = config.app.appBaseUrl || "http://localhost:3000/";

var db = require('./core/server/config/sequelize');
var passport = require('./core/server/config/passport');
var mongoose = require('./core/server/config/mongoose');

mongoose.connect(function (db) {
    mongoose.loadModels();

    var app = express();

    //Initialize Express
    var expresss = require('./core/server/config/express')(app, passport);


    //Start the app by listening on <port>
    var server = app.listen(config.PORT);

    winston.info('Express app started on port ' + config.PORT);

    //expose app
    module.exports = app;

});







