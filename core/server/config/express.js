var winston = require('winston');
const favicon = require('express-favicon');

module.exports = function (app) {
    
    app.use(favicon(__dirname + '/../../client/favicon.png'));
    app.use('/',function (req,res) {
        res.send("Welcome to the root")
    });

};