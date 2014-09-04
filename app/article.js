module.exports = new (function() {
    var that = this;

    this.init = function() {
        // require db and schemes
        var db = require(config.libDir+'database');
        var schemes = require(config.databaseDir+'schemes.js');
        var mongoose = db.getInstance().mongoose;

        // console.log('session',session);
        // add article
        that.app.eventEmitter.emit('listenRequest', {
            url: '/article/add/',
            type: 'post',
            success: function(req,res) {
                var Article = mongoose.model('Article',schemes.articleSchema);

                var article = new Article({
                    title: req.body.title,
                    text: req.body.text
                });
                article.save();
                res.send(article);
            }
        });

        // remove article
        that.app.eventEmitter.emit('listenRequest', {
            url: '/article/remove/',
            type: 'post',
            success: function(req,res) {
                var Article = mongoose.model('Article',schemes.articleSchema);
                // console.log(Article);
                // console.log(mongoose.mongo.BSONPure.ObjectID(req.body.id));
                Article.findByIdAndRemove(new mongoose.Types.ObjectId(req.body.id),function() {
                    res.send(req.body.id);
                });
            }
        });

        // get articles
        that.app.eventEmitter.emit('listenRequest', {
            url: '/article/get/',
            type: 'post',
            success: function(req,res) {
                var Article = mongoose.model('Article',schemes.articleSchema);
                var filter = {};
                if(req.body.title != null) {
                    filter.title = req.body.title;
                }
                Article.find(filter,function(err,articles) {
                    res.send(articles)
                });
            }
        });

        // get users
        that.app.eventEmitter.emit('listenRequest', {
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