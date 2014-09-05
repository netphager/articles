module.exports = new (function() {
    var that = this;

    this.init = function() {
        console.log('user');
    };

    // require db and schemes
    var db = require(config.libDir+'database');
    var schemes = require(config.databaseDir+'schemes.js');
    var mongoose = db.getInstance().mongoose;

    // login
    this.login = function(req,res) {
        var User = mongoose.model('User',schemes.userSchema);
        var filter = {};

        filter.username = req.body.username;
        filter.password = req.body.password;
        User.findOne(filter,function(err,user) {
            console.log('logged in successfully');
            session.isLogged = true;
            console.log(session);
            res.send(user);
        });
    }
    // that.eventEmitter.emit('listenRequest', {
    //     url: '/user/login/',
    //     type: 'post',
    //     success: function(req,res) {
    //     }
    // });


    // add user
    this.add = function(req,res) {
        var User = mongoose.model('User',schemes.userSchema);

        var user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        user.save();
        res.send(user);
    }
/*        that.eventEmitter.emit('listenRequest', {
        url: '/user/add/',
        type: 'post',
        success: function(req,res) {
        }
    });*/

    // remove user
    this.remove = function(req,res) {
        var User = mongoose.model('User',schemes.userSchema);
        User.findByIdAndRemove(new mongoose.Types.ObjectId(req.body.id),function() {
            res.send(req.body.id);
        });
    }
    // that.eventEmitter.emit('listenRequest', {
    //     url: '/user/remove/',
    //     type: 'post',
    //     success: function(req,res) {
    //     }
    // });


    // get users
    this.get = function(req,res) {
        var User = mongoose.model('User',schemes.userSchema);
        var filter = {};
        if(req.body.username != null) {
            filter.username = req.body.username;
        }
        User.find(filter,function(err,users) {
            res.send(users)
        });
    };

/*        that.eventEmitter.emit('listenRequest', {
        url: '/user/get/',
        type: 'post',
        success: function(req,res) {
        }
    });*/

});