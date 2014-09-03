module.exports = new (function() {
    var that = this;

    this.init = function() {
        // require db and schemes
        var db = require(config.libDir+'database');
        var schemes = require(config.databaseDir+'schemes.js');
        var mongoose = db.getInstance().mongoose;


        // signup
        that.eventEmitter.emit('listenRequest', {
            url: '/user/add/',
            type: 'post',
            success: function(req,res) {
                var User = mongoose.model('User',schemes.userSchema);

                var user = new User({
                    id: 1,
                    username: req.body.username,
                    email: req.body.email
                });
                user.save();
                res.send(user);
            }
        });

        // get user by name
        that.eventEmitter.emit('listenRequest', {
            url: '/user/get/',
            type: 'post',
            success: function(req,res) {
                var User = mongoose.model('User',schemes.userSchema);
                var filter = {};
                if(req.body.username != null) {
                    filter.username = req.body.username;
                }
                User.find(filter,function(err,users) {
                    res.send(users)
                });
            }
        });
    };

});