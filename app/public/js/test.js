define(function(require) {
    return new (function() {
        var router = require('router');
        var that = this;
        this.user = null;

        this.home = function(params) {
            // console.log(this.getUser(params));
            this.getUser(params).success(function(user) {
                that.user = user;

                $('#hello').html('id: '+user.id+' email: '+user.email+' username:'+user.username);
                that.getUser(params).success(function(user) {
                    console.log(user);
                });

            });

        };

        this.getUser = function(params) {
            if(this.user == null) {
                return router.makeRequest({
                    type:'post',
                    url:'/user/get',
                    data: {"username":params.username}
                });
            } else {
                return new (function(){
                    this.success = function(callback) {
                        callback(that.user)
                    }
                });
            }
        };

        this.about = function(params) {
            console.log(params);
        };

        this.blog = function(params) {
        };
    });
});