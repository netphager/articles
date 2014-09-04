var fs = require('fs');
var path = require('path');

module.exports = new (function(url){

    this.loadLayout = function() {
        var layoutPath = config.appDir+'layout.html';

        try {
            return fs.readFileSync(layoutPath, 'utf-8');
        } catch (e) {
            debug.error(e);
            debug.error('File ' + layoutPath + ' not found',404);
            return false;
        }

    };
    this.loadTemplate = function(template) {
        var templatePath = config.templatesDir+template+'.html';

        // load templates
        try {
            template = fs.readFileSync(templatePath,'utf-8');
        } catch (e) {
            debug.error('File ' + templatePath + ' not found',404);
            template = false;
        }

        return template;
    };
    this.loadController = function(controllerName) {
        try {
            return require(config.appDir+controllerName);
        } catch(e) {
            debug.error('Module ' + config.appDir+controllerName + ' not found',404);
            return false;
        }
    };


});