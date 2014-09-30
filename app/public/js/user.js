define(function(require) {
    return new (function() {
        var router = require('helper/router');
        var that = this;

        this.noTemplate = ['add','remove','login','logout'];

        this.add = function() {
            // var Handlebars = require('handlebars');

            var username = $('[set-value = username]').val()
            var email = $('[set-value = email]').val();
            var password = $('[set-value = password]').val();

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
                window.location = '/app/#/article/home';
            });
        };

        this.signin = function() {
            $('[main-template]').html(router.render('signin'));
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
                window.location = '/app/#/article/home';
            });
        };

        this.logout = function() {
            router.makeRequest({
                type:'post',
                url:'/user/logout'
            },function() {
                window.location = '/app/#/user/signin';
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
                window.location = '/app/#/article/home';
            });
        };

        this.signup = function(params) {
            $('[main-template]').html(router.render('signup'));
        }
    })
});