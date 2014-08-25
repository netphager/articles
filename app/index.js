module.exports = new (function(){
    this.socket = null;
    this.chatLog = [];
    this.users = {};
    this.selectedSquares = {};
    var that = this;

    this.init = function() {
        var io = require('socket.io')(that.http);
        io.on('connection', function(socket){
            socket.on('new user', function(user){
                that.users[user.username] = {
                    id:socket.id,
                    username:user.username,
                    color:user.color,
                    top:user.top,
                    left:user.left
                };
                io.emit('new user',that.users);
                debug.log('connect user ' + JSON.stringify(that.users[user.username]));
            });

            socket.on('get selected squares',function(username) {
                socket.emit('get selected squares',{squares:that.selectedSquares,username:username});
            });

            socket.on('move user', function(user) {
                that.users[user.username].left = user.left;
                that.users[user.username].top = user.top;
                io.emit('move user',that.users[user.username]);
            });

            socket.on('select square', function(data) {
                that.selectedSquares[data.square] = that.users[data.username].color;
                io.emit('select square',data);
            });

            socket.on('disconnect', function(){
                for(var i in that.users) {
                    if(that.users[i].id == socket.id) {
                        io.emit('remove user',that.users[i].id);
                        debug.log('disconect user ' + JSON.stringify(that.users[i]));
                        delete that.users[i];
                        break;
                    }
                }
            });
        });


        this.eventEmitter.emit('renderView');
    };

});