define(function(require) {
    return new (function() {
        var router = require('router');
        var that = this;

        this.signup = function(params) {

            if('username' in params && 'email' in params) {
                router.makeRequest({
                    type:'post',
                    url:'/user/add',
                    data: {
                        "username":params.username,
                        "email": params.email
                    }
                },function(user) {
                    console.log('successfully added user' + user);
                });
            } else {
                console.error('invalid parameters');
            }
        }

        this.home = function(params) {
            console.log(params);
             router.makeRequest({
                type:'post',
                url:'/user/get',
                data: {"username": ('username' in params ? params.username : null)}
            }, function(users) {
                var usersHtml = '';
                for(var i in users) {
                    usersHtml += '<p>'+users[i].id +' - '+ users[i].email  +' '+users[i].username+' </p>';
                }
                $('#hello').html(usersHtml);
            });
        };

        this.about = function(params) {
            console.log(params);
        };

        this.blog = function(params) {
        };
    });
});