var path = require('path');
var express = require('express')
var app = express();
var events = require('events');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var eventEmitter = new events.EventEmitter();
var http = require('http').Server(app);

global.config = require('./lib/config');
global.debug = require(config.libDir+'debugger');
var loader = require(config.libDir+'loader');
var db = require(config.libDir+'database');

app.use('/public', express.static(config.appDir + '/public'));
app.use(bodyParser.json())
app.use(expressSession({secret: '123456qwerty'}));

debug.init();

// connect to a database
db.getInstance().connect('localhost');

app.get('/:controller',function(req,res) {
    global.session = req.session;


    var outputHtml = '';
    var resStatus = 200;
    var loadedModules = loader.load(req.param('controller'));
    var controller = loadedModules.controller;
    var layout = loadedModules.layout;

    if(controller === false || layout === false) {
        outputHtml = debug.getErrorsStr();
    } else if(typeof(controller.render) != 'function') {
        controller.render = function(req,res) {
            res.send(layout);
        };
    }


    if(debug.getErrors().length == 0) {
        controller.http = http;
        controller.eventEmitter = eventEmitter;
        controller.render(req,res);
        controller.init();

    } else {
        resStatus = debug.getErrors()[0].code;
        res.send(outputHtml);
    }

    debug.clearErrors();
});

app.post('/getTemplate',function(req,res) {
    var outputHtml = loader.loadTemplate(req.body.template);
    if(outputHtml === false) {
        outputHtml = debug.getErrorsStr();
    }

    res.send(outputHtml);
});

eventEmitter.on('listenRequest',function(request) {
    app[request.type](request.url, function(req,res){
        request.success(req,res);
    });
});

http.listen(3000, function(){
  debug.log('listening on *:3000');
});
