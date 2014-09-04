module.exports = new (function() {
    var that = this;

    this.init = function() {
        // require db and schemes
        var db = require(config.libDir+'database');
        var schemes = require(config.databaseDir+'schemes.js');
        var mongoose = db.getInstance().mongoose;

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

        // show article
        that.app.eventEmitter.emit('listenRequest', {
            url: '/article/show/',
            type: 'post',
            success: function(req, res) {
                var Article = mongoose.model('Article',schemes.articleSchema);
                var id;
                if(req.body.id != null) {
                    id = new mongoose.Types.ObjectId(req.body.id);
                }
                Article.findById(id,function(err,article) {
                    console.log(article);
                    res.send(article)
                });
            }
        });


        // edit article
        that.app.eventEmitter.emit('listenRequest', {
            url: '/article/update/',
            type: 'post',
            success: function(req, res) {
                var Article = mongoose.model('Article',schemes.articleSchema);
                var id;
                if(req.body.id != null) {
                    id = new mongoose.Types.ObjectId(req.body.id);
                }
                Article.findById(id,function(err,article) {
                    console.log(article);
                    res.send(article)
                });
            }
        });

        // update article
        that.app.eventEmitter.emit('listenRequest', {
            url: '/article/update/',
            type: 'post',
            success: function(req, res) {
                var Article = mongoose.model('Article',schemes.articleSchema);
                var id;
                if(req.body.id != null) {
                    id = new mongoose.Types.ObjectId(req.body.id);
                }
                Article.findById(id,function(err,article) {
                    console.log(article);
                    res.send(article)
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
    };

});