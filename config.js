var path = require('path');
module.exports = new (function(){

    var that = this;
    /* PATHS */
    /*this.rootDir = '/store/Dropbox/www/articles';
    this.appDir = '/store/Dropbox/www/articles/app/';*/
    this.rootDir = 'D:\\work\\articles\\';
    this.appDir = 'D:\\work\\articles\\app\\';
    this.databaseDir = path.join(that.appDir,'database/');
    // this.libDir = path.join('/store/Dropbox/www/framework/');
    this.libDir = path.join('D:\\work\\framework\\');
    this.templatesDir = 'http://localhost:3000/templates/{controller}/';

    /* PROPERTIES */
    this.mainApp = 'app';
    this.controllers = ['user','article','test','upload'];

    this.loginConfig = {
        requireLogin: true,
        freeLoginPages: ['login','signin'],
        loginRedirect: '/app/#/user/signin'
    };

});