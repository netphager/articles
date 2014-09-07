var path = require('path');
var express = require('express')
var app = express();
var events = require('events');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var eventEmitter = new events.EventEmitter();
var http = require('http').Server(app);

global.config = require('./config');
global.debug = require(config.libDir+'debugger');
var loader = require(config.libDir+'loader');
var db = require(config.libDir+'database');

var login = false;
requestValidator = require(config.libDir+'requestValidator');
requestValidator.eventEmitter = eventEmitter;
requestValidator.listen();


app.use('/public', express.static(config.appDir + '/public'));
app.use(bodyParser.json())
app.use(expressSession({secret: '123456qwerty'}));

debug.init();

// connect to a database
db.getInstance().connect('localhost');

app.get('/'+config.mainApp,function(req,res) {
    // req.session.isLogged = false;
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
        var method = req.param('method');


        // eventEmitter.on('requestValidator',function(requestData) {
            // if(requestData.isValidRequest === true) {
                if(!(controllerName in loadedControllers)) {
                    loadedControllers[controllerName] = loader.loadController(controllerName);
                    console.log('loading controller ' + controllerName);
                }

                loadedControllers[controllerName][method](req,res);        
            // }
        // });
        
        // eventEmitter.emit('request',{req:req,res:res,requestedPage:method});

    });
}

app.get('/router.js', function(req,res) {
    var fs = require('fs');
    res.send(fs.readFileSync(config.libDir+'router.js', 'utf-8'));
    // eventEmitter.emit('request',{req:req,res:res});
});

app.post('/loadTemplate',function(req,res) {

    var controllerName = req.body.controllerName;
    var templateName = req.body.templateName;
    var method = req.body.method;

    // eventEmitter.on('requestValidator',function(requestData) {
        // if(requestData.isValidRequest === true) {
            var outputHtml = loader.loadTemplate(templateName,controllerName);
            if(outputHtml === false) {
                outputHtml = debug.getErrorsStr();
            }
            res.send(outputHtml);
        // }
    // });

    // eventEmitter.emit('request',{req:req,res:res,requestedPage: method});
});

http.listen(3000, function(){
  debug.log('listening on *:3000');
});