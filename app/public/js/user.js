define(function(require) {
    return new (function() {
        var router = require('router');
        var that = this;

        this.noTemplate = ['add','remove','login'];
        this.add = function() {
            var username = $('input[name=username]').val()
            var email = $('input[name=email]').val();
            var password = $('input[name=password]').val();

            router.makeRequest({
                type:'post',
                url:'/user/add',
                data: {
                    "username": username,
                    "email": email,
                    "password":password
                }
            },function(user) {
                console.log('successfully added user' + user);
            });
        };

        this.signin = function() {
            
        };

        this.login = function() {
            var username = $('input[name=username]').val();
            var password = $('input[name=password]').val();

            router.makeRequest({
                type:'post',
                url:'/user/login',
                data: {
                    "username": username,
                    "password":password
                }
            },function(user) {
                window.location = '/article/#method=home';
            });
        };

        this.remove = function(params) {
            var id = params.id;
            router.makeRequest({
                type:'post',
                url:'/user/remove',
                data: {"id": id}
            }, function(article) {
                console.log('successfully removed article ' + id);
                window.location = '/article/#method=home';
            });
        };
    
        this.signup = function(params) {

        }
    })
});