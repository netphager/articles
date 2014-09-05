module.exports = new (function() {
    var that = this;
    this.init = function() {

    };
    // require db and schemes
    var db = require(config.libDir+'database');
    var schemes = require(config.databaseDir+'schemes.js');
    var mongoose = db.getInstance().mongoose;


    this.test = function(req,res) {
        res.send({
            "param1": req.body.param1,
            "param2": req.body.param2,
            "param3": req.body.param3,
            "param4": req.body.param4
        });
    };

    // add article
    this.add = function(req,res) {
        var Article = mongoose.model('Article',schemes.articleSchema);
        var article = new Article({
            title: req.body.title,
            text: req.body.text
        });
        article.save();
        res.send(article);
    };

    // remove article
    this.remove = function(req,res) {
        var Article = mongoose.model('Article',schemes.articleSchema);
        Article.findByIdAndRemove(new mongoose.Types.ObjectId(req.body.id),function() {
            res.send(req.body.id);
        });
    };

    // show article
    this.show = function(req,res) {
        var Article = mongoose.model('Article',schemes.articleSchema);
        var id;
        if(req.body.id != null) {
            id = new mongoose.Types.ObjectId(req.body.id);
        }
        Article.findById(id,function(err,article) {
            res.send(article)
        });
    };

    // edit article
    this.edit = function() {
        var Article = mongoose.model('Article',schemes.articleSchema);
        var id;
        if(req.body.id != null) {
            id = new mongoose.Types.ObjectId(req.body.id);
        }
        Article.findById(id,function(err,article) {
            console.log(article);
            res.send(article)
        });
    };

    // update article
    this.update = function() {
        var Article = mongoose.model('Article',schemes.articleSchema);
        var id;
        if(req.body.id != null) {
            id = new mongoose.Types.ObjectId(req.body.id);
        }
        Article.findById(id,function(err,article) {
            console.log(article);
            res.send(article)
        });
    };

    // get articles
    this.get = function(req,res) {
        var Article = mongoose.model('Article',schemes.articleSchema);
        var filter = {};
        if(req.body.title != null) {
            filter.title = req.body.title;
        }
        Article.find(filter,function(err,articles) {
            res.send(articles)
        });
    };

});