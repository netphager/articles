var db = require(config.libDir+'database');
var mongoose = db.getInstance().mongoose;
var schemes = {};
module.exports = new (function(){

    schemes.userSchema = mongoose.Schema({
        id: Number,
        email: String,
        username: String,
    });

    return schemes;
});