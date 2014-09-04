module.exports = new (function() {
    var that = this;

    this.init = function() {

        var user = require(config.appDir+'user');
        var article = require(config.appDir+'article');
        user.eventEmitter = that.eventEmitter;
        article.eventEmitter = that.eventEmitter;
        user.init();
        article.init();
    }

});