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

app.get('/'+config.mainApp,function(req,res) {
    /*if(config.controllers.indexOf(req.param('controller')) == -1) {
        res.send();
    }*/
    global.session = req.session;

    var outputHtml = '';
    var resStatus = 200;
    // load layout
    var layout = loader.loadLayout();

    if(debug.getErrors().length == 0) {
        res.send(layout);
    } else {
        resStatus = debug.getErrors()[0].code;
        res.send(outputHtml);
    }

    debug.clearErrors();
});

var loadedControllers = {};

for(var i in config.controllers) {
    app.all('/'+config.controllers[i]+'/:method', function(req,res) {
        var controllerName = req.url.split('/')[1];

        if(!(controllerName in loadedControllers)) {
            loadedControllers[controllerName] = loader.loadController(controllerName);
            console.log('loading controller ' + controllerName);
        }

        loadedControllers[controllerName][req.param('method')](req,res);
    });
}

/*app.post('/loadController',function(req,res) {
    var controller = loader.loadController(req.body.controllerName);
    controller.http = http;
    controller.eventEmitter = eventEmitter;
    controller.init();
    res.send();
});
*/

app.post('/loadTemplate',function(req,res) {
    var outputHtml = loader.loadTemplate(req.body.templateName);
    if(outputHtml === false) {
        outputHtml = debug.getErrorsStr();
    }
    res.send(outputHtml);
});

http.listen(3000, function(){
  debug.log('listening on *:3000');
});