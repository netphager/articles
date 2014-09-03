module.exports = new (function() {
    var that = this;

    this.init = function() {

        that.eventEmitter.emit('listenRequest', {
            url: '/user/get/',
            type: 'post',
            success: function(req,res) {
                res.send({
                    id:1,
                    email:'netphager@gmail.com',
                    username:req.body.username
                });
            }
        });
    };

});