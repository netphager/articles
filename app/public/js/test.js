define(function(require) {
    return new (function() {
        var router = require('router');

        this.home = function(params) {
            router.makeRequest({
                type:'post',
                url:'/user/getUsername',
                data: {"username":params.username}
            },function(response) {
                $template.html('hello '+response.data);
            });
        };

        this.about = function(params) {
            $template.html('about page');
        };

        this.blog = function(params) {
            $template.html('blog page');
        };
    });
});