module.exports = new (function() {

    this.index = function(req,res) {
        res.send({'success': true});
    };

});