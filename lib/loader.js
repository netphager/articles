var fs = require('fs');
var path = require('path');

module.exports = new (function(url){
    this.load = function(file) {
        var templatePath = config.templatesDir+file+'.html';
        layoutPath = config.appDir+'layout.html',
        layout = null,
        template = null;

        // load controller
        try {
            var loadedModule = require(config.appDir+file);
        } catch(e) {
            debug.error('Module ' + config.appDir+file + ' not found',404);
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

        // load templates
        try {
            template = fs.readFileSync(templatePath,'utf-8');
        } catch (e) {
            debug.error('File ' + templatePath + ' not found',404);
            return false;
        }

        layout = layout.replace('<template></template>',template);
        if(typeof(loadedModule.render) != 'function') {
            loadedModule.render = function(req,res) {
                res.send(layout);
            };
        }

        return loadedModule;
    };

});