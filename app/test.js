module.exports = new (function() {
    this.test = function(req,res) {
        console.log("THIS IS A TEST",req.body.user);
        res.send({
            msg:'test',
            params:req.body
        });
    };
});