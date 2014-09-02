define(function(require) {
    return new (function() {
        var router = require('router');

        this.home = function(params) {
            router.makeRequest({
                type:'post',
                url:'/user/getUsername',
                data: {"username":params.username}
            },function(response) {
                $('#hello').html(response.data);
            });
        };


        this.about = function(params) {
            console.log(params);
        };

        this.blog = function(params) {
        };
    });
});