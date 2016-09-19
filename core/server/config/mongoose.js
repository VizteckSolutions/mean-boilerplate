/**
 * Created by Asif on 3/12/2016.
 */

'use strict'; //NOSONAR

var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var _ = require('lodash');
var config = require('./config');
var winston = require('./winston');

winston.info('Initializing MongoDB...');


module.exports.loadModels = function (callback) {

    // loop through all files in models directory ignoring hidden files and this file
    fs.readdirSync(config.modelsDirMongo)
        .filter(function (file) {
            return (file.indexOf('.') !== 0) && (file !== 'index.js');
        })
        // import model files and save model names
        .forEach(function (file) {
            winston.info('Loading mongoose model file ' + file);
            require(path.join(config.modelsDirMongo, file));

        });
};


// Initialize Mongoose
module.exports.connect = function (cb) {
    var _this = this;

    var db = mongoose.connect(config.mongodb.uri, config.mongodb.options, function (err) {
        // Log Error
        if (err) {
            winston.log('Error','Could not connect to MongoDB!');

        } else {

            // Enabling mongoose debug mode if required
            mongoose.set('debug', config.mongodb.debug);

            winston.info("Connected to MongoDb");



            // Call callback FN
            if (cb) {cb(db);}
        }
    });


};

module.exports.disconnect = function (cb) {
    mongoose.disconnect(function (err) {
        winston.info('Disconnected from MongoDB.');
        cb(err);
    });
};
