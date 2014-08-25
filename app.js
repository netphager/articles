var path = require('path');
var express = require('express')
var app = express();
var events = require('events');
var bodyParser = require('body-parser')
var eventEmitter = new events.EventEmitter();
var http = require('http').Server(app);

global.config = require('./lib/config');
global.debug = require(config.libDir+'debugger');
var loader = require(config.libDir+'loader');

app.use('/public', express.static(config.appDir + '/public'));
app.use(bodyParser.json())

debug.init();
app.get('/controller/:controller',function(req,res) {

    var outputHtml = '';
    var resStatus = 200;
    var controller = loader.load(req.param('controller'));

    if(!controller) {
        outputHtml = debug.getErrorsStr();
    } else {
        if(typeof(controller.render) != 'function') {
            debug.error('Your controller must have render method');
            outputHtml = debug.getErrorsStr();
        }
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

eventEmitter.on('listenRequest',function(request) {
    app[request.type](request.url, function(req,res){
        request.success(req,res);
    });
}); 

http.listen(3000, function(){
  debug.log('listening on *:3000');
});