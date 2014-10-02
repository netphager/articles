module.exports = new (function() {
    var that = this;
    var EventEmitter = require(config.libDir+"/lib/emitter").getInstance();

    // require db and schemes
    var db = require(config.libDir+'/lib/database');
    var schemes = require(config.databaseDir+'schemes');
    var mongoose = db.getInstance().mongoose;



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

    // uplaod complete listener
    this.listenUploadComplete = function(req,res) {
        EventEmitter.on('uploadComplete',function(files) {
            var Attachment = mongoose.model('Attachment',schemes.attachmentSchema);
            // files = files.files;
            if(!(files instanceof Array)) {
                files = [files];
            }
            var attachments = [];
            for(var i = 0 ; i <  files.length; i++) {
                attachments.push({
                    name: files[i].originalname,
                    path: files[i].path
                });
            }
            var Attachment = mongoose.model('Attachment',schemes.attachmentSchema);
            Attachment.collection.insert(attachments,{},function(err,a) {
                console.log(a);
            });
        });

        res.send({"success": true});
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
            res.send(article);
        });
    };

    // edit article
    this.edit = function(req,res) {
        var Article = mongoose.model('Article',schemes.articleSchema);
        var id;
        if(req.body.id != null) {
            id = new mongoose.Types.ObjectId(req.body.id);
        }
        Article.findById(id,function(err,article) {
            res.send(article);
        });
    };

    // update article
    this.update = function(req,res) {
        var Article = mongoose.model('Article',schemes.articleSchema);
        var id;
        if(req.body.id != null) {
            id = new mongoose.Types.ObjectId(req.body.id);
        }
        Article.findById(id,function(err,article) {
            article.title = req.body.title;
            article.text = req.body.text;
            article.save();
            res.send(article);
        });
    };

    // get attachments
    this.getAttachments = function(req,res) {
        var Attachment = mongoose.model('Attachment',schemes.attachmentSchema);

        Attachment.find({},function(err,attachments) {
            res.send(attachments);
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
            res.send(articles);
        });
    };

});