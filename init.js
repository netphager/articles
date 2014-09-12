/* =============================== LOADING LIBRARIES =============================== */
var path = require('path');
var express = require('express')
var app = express();
var events = require('events');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var eventEmitter = new events.EventEmitter();
var http = require('http').Server(app);
var port = 3000;

global.config = require('./config');
global.debug = require(config.libDir+'debugger');
/*loader module for loading controller,templates and layouts*/
var loader = require(config.libDir+'loader');
// db controller to access db
var db = require(config.libDir+'database');
/*request validator*/
requestValidator = require(config.libDir+'requestValidator');
requestValidator.eventEmitter = eventEmitter;
requestValidator.listen();
/*init sessoin and bodyparser*/
app.use('/public', express.static(config.appDir + '/public'));
app.use(bodyParser.json())
app.use(expressSession({secret: '123456qwerty'}));
/* =============================== INITIAL APP =============================== */
/*enable debug messages*/
debug.init();

/*connect to a database*/
db.getInstance().connect('localhost');

/*loading layout*/
app.get('/'+config.mainApp,function(req,res) {
    var outputHtml = '';
    var resStatus = 200;
    var layout = loader.loadLayout();

    if(debug.getErrors().length == 0) {
        res.send(layout);
    } else {
        resStatus = debug.getErrors()[0].code;
        res.send(outputHtml);
    }

    debug.clearErrors();
});

/*ajax calls for controllers*/
var loadedControllers = {};

for(var i in config.controllers) {
    app.all('/'+config.controllers[i]+'/:method', function(req,res) {

        var controllerName = req.url.split('/')[1];
        var method = req.param('method');
        if(!(controllerName in loadedControllers)) {
            loadedControllers[controllerName] = loader.loadController(controllerName);
            console.log('loading controller ' + controllerName);
        }

        loadedControllers[controllerName][method](req,res);
    });
}

/*router request*/
app.get('/helper/:name', function(req,res) {
    var fs = require('fs');
    res.send(fs.readFileSync(config.libDir+req.param('name'), 'utf-8'));
});

/*loading templates request*/
app.post('/loadTemplate',function(req,res) {
    var controllerName = req.body.controllerName;
    var templateName = req.body.templateName;
    var method = req.body.method;
    var outputHtml = loader.loadTemplate(templateName,controllerName);
    if(outputHtml === false) {
        outputHtml = debug.getErrorsStr();
    }
    res.send(outputHtml);
});

/*start server*/
http.listen(port, function(){
  debug.log('listening on *:'+port);
});