define(function(require) {
    return new (function() {
        var templatesHelper = require('helper/js/templatesHelper');
        var dialog = require('helper/js/dialog');
        this.index = function() {
            $('[main-template]').html(templatesHelper.render('index'));
        };
    });
});