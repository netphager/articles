var db = require(config.libDir+'/lib/database');
var mongoose = db.getInstance().mongoose;
var schemes = {};
module.exports = new (function(){
    var ObjectId = mongoose.Schema.ObjectId;

    schemes.userSchema = mongoose.Schema({
        username: String,
        email: String,
        password: String
    });

    schemes.articleSchema = mongoose.Schema({
        title: String,
        text: String
    });

    return schemes;
});