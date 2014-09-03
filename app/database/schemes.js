var db = require(config.libDir+'database');
var mongoose = db.getInstance().mongoose;
var schemes = {};
module.exports = new (function(){
    var ObjectId = mongoose.Schema.ObjectId;

    schemes.userSchema = mongoose.Schema({
        id: Number,
        email: String,
        username: String,
    });

    schemes.articleSchema = mongoose.Schema({
        title: String,
        text: String
    });

    return schemes;
});