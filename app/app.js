module.exports = new (function() {
    var that = this;

    var modules = ['user','article'];

    this.init = function() {
        // loading modules from modules array
        for(var i in modules) {
            var module = require(config.appDir+modules[i]);
            module.app = that;
            module.init();
        }
    }

});