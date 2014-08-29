var path = require('path');
module.exports = new (function(){

    var that = this;
    this.rootDir = '/store/Dropbox/Public/node';
    this.appDir = '/store/Dropbox/Public/node/app/';
    // this.rootDir = 'D:\\Dropbox\\Public\\node';
    // this.appDir = 'D:\\Dropbox\\Public\\node\\app\\';
    this.libDir = path.join(that.rootDir, 'lib/');
    this.templatesDir = path.join(that.appDir, 'templates/');

    this.getController = function(url) {
        var controller =  url == '/' ? 'index' : url.split('/')[1];
        return controller;
    };
});