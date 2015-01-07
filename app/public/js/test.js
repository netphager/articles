define(function(require) {
    return new (function() {
        var template = require('helper/js/template');
        var dialog = require('helper/js/dialog');
        this.index = function() {
            $('[main-template]').html(template.render('index'));
        };
    });
});