var fs = require('fs');
var path = require('path');

module.exports = new (function(url){

    this.loadTemplate = function(template) {
        var templatePath = config.templatesDir+template+'.html';
        var template = null;

        // load templates
        try {
            template = fs.readFileSync(templatePath,'utf-8');
        } catch (e) {
            debug.error('File ' + templatePath + ' not found',404);
            return false;
        }

        return template;
    };

    this.load = function(controllerName) {
        layoutPath = config.appDir+'layout.html',
        layout = null;

        // load controller
        try {
            var controller = require(config.appDir+controllerName);
        } catch(e) {
            debug.error('Module ' + config.appDir+controllerName + ' not found',404);
            return false;
        }

        // load layout
        try {
            layout = fs.readFileSync(layoutPath, 'utf-8');
        } catch (e) {
            debug.error(e);
            debug.error('File ' + layoutPath + ' not found',404);
            return false;
        }


        // layout = layout.replace('<template></template>',template);
        if(typeof(controller.render) != 'function') {
            controller.render = function(req,res) {
                res.send(layout);
            };
        }

        return controller;
    };

});