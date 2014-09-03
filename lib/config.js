var path = require('path');
module.exports = new (function(){

    var that = this;
    this.rootDir = '/store/Dropbox/www/node';
    this.appDir = '/store/Dropbox/www/node/app/';
    this.databaseDir = this.appDir+'database/';
    /*this.rootDir = 'D:\\work\\node';
    this.appDir = 'D:\\work\\node\\app\\';*/
    this.libDir = path.join(that.rootDir, 'lib/');
    this.templatesDir = path.join(that.appDir, 'templates/');

    this.getController = function(url) {
        var controller =  url == '/' ? 'index' : url.split('/')[1];
        return controller;
    };
});