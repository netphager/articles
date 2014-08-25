define(function() {
   return new (function() {
        var that = this,
            username = '',
            color = '',
            onlineUsers = {},
            socket;

        var router = require('router');

        this.move = function(direction) {
            var value = 30;
            if(direction.indexOf('-') != -1) {
                value = value * -1;
                direction = direction.substr(1);
            }
            var position = parseInt($('.current').css(direction));

            if(position + value >= 0){

                socket.emit('move user',{
                    username: username,
                    left: direction == 'left' ? position+value+'px' : $('.current').css('left'),
                    top: direction == 'top' ? position+value+'px'   : $('.current').css('top')
                });

            }
        }

        this.start = function() {
            $('#signIn').hide();
            $('#game').show();

            // save username and color
            username = $('#username').val();
            color = $('.color.selected').attr('id');
            socket = io.connect();

            $(document).on('keydown',function(e) {
                switch(e.keyCode) {
                    // up
                    case 38:
                    that.move('-top');
                    break;
                    // down
                    case 40:
                    that.move('top');
                    break;
                    // left
                    case 37:
                    that.move('-left');
                    break;
                    // right
                    case 39:
                    that.move('left');
                    break;
                }
            });

            function clicked() {
                var square = $(this);
                socket.emit('select square',{square: square.attr('id'),username:username});
                return false;
            }

            $('.square').on('click',clicked);

            socket.emit('new user',{
                username:username,
                color:color,
                top: 0,
                left:0
            });

            socket.emit('get selected squares',username);

            socket.on('new user', function(users){
                onlineUsers = users;
                // adding all users on the field
                for(var i in users) {
                    var iscurrent = users[i].username == username ? 'current' : '';
                    $('#field').append('<p style="top:'+users[i].top+';left:'+users[i].left+';background:'+users[i].color+'" class="user '+ iscurrent  +'" id="'+users[i].id+'">'+users[i].username+'</p>');
                    // document.getElementById('field').innerHTML += '<p style="top:'+users[i].top+';left:'+users[i].left+';background:'+users[i].color+'" class="user '+ iscurrent  +'" id="'+users[i].id+'">'+users[i].username+'</p>';
                }
            });

            socket.on('get selected squares', function(data) {
                if(username != data.username) {return false;}
                for(var i in data) {
                    console.log($('#'+i))
                    $('#'+i).css('backgroundColor',data[i]);
                }
            });

            socket.on('select square', function(data) {
                $('#'+data.square).css('background',onlineUsers[data.username].color);
            });

            socket.on('move user',function(user) {
                $('#'+user.id).css('left',user.left);
                $('#'+user.id).css('top',user.top);
            });

            socket.on('remove user', function(userId){
                $('#'+userId).remove();
            });
        }

        this.login = function() {
            $('#signIn').show();
            $('#game').hide();

            $('.color').click(function() {
              $('.selected').removeClass('selected');
              $(this).addClass('selected');
            });


        };

    });
});