define(function(require) {
    return new (function() {
        var template = require('helper/js/template');
        var dialog = require('helper/js/dialog');
        var router = require('helper/js/router');

        this.index = function() {

            router.makeRequest({
                type: 'post',
                url: '/test/index',
            }, function() {
                $('[main-template]').html(template.render('index'));
            });

        };
    });
});