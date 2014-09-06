define(function(require) {
    return new (function() {
        var that = this;
        var router = require('router');

        this.noTemplate = ['test'];

        this.test = function(params) {
            router.makeRequest({
                type:'post',
                url: '/test/test/',
                data: params,
                success: function(res) {
                    console.log(res);
                }
            });
        };
    });
});