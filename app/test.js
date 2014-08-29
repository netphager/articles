module.exports = new (function() {
    var that = this;

    this.init = function() {

        that.eventEmitter.emit('listenRequest', {
            url: '/user/getUsername/',
            type: 'post',
            success: function(req,res) {
                res.send({
                    data: req.body.username
                });
            }
        });
    };

});