define(function(require) {
    return new (function() {
        var template = require('helper/js/template');
        var dialog = require('helper/js/dialog');
        var router = require('helper/js/router');

        this.index = function(params) {
            /*router.makeRequest({
                type: 'post',
                url: '/test/index',
            }, function() {*/
                $('[main-template]').html(dialog.open('index',params));
            // });

        };
    });
});