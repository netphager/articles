define(function(require) {
    return new (function() {
        var router = require('router');
        var that = this;

        this.noTemplate = ['add','remove'];

        this.signup = function(params) {

            if('username' in params && 'email' in params) {
                router.makeRequest({
                    type:'post',
                    url:'/user/add',
                    data: {
                        "username":params.username,
                        "email": params.email
                    }
                },function(user) {
                    console.log('successfully added user' + user);
                });
            } else {
                console.error('invalid parameters');
            }
        }


        this.add = function(){
            var title = $('input[name=articleTitle]').val();
            var text = $('textarea[name=articleText]').val();

            // add article
             router.makeRequest({
                type:'post',
                url:'/article/add',
                data: {"title": title,"text":text}
            }, function(article) {
                console.log('successfully added article' + article);
                window.location = '/article/#method=home';
            });
        }

        this.remove = function(params) {
            var id = params.id;
            // remove article
             router.makeRequest({
                type:'post',
                url:'/article/remove',
                data: {"id": id}
            }, function(article) {
                console.log('successfully removed article ' + id);
                window.location = '/article/#method=home';
            });
        };

        this.home = function(params) {

            // get articles
             router.makeRequest({
                type:'post',
                url:'/article/get',
                data: {"title": ('title' in params ? params.title : null)}
            }, function(articles) {
                var articlesHtml = '';
                for(var i in articles) {
                    articlesHtml += '<p>'+ articles[i].title  +' '+articles[i].text+' <a href="/article/#method=remove&id='+articles[i]._id+'">Remove</a></p>';
                }
                $('#articles').html(articlesHtml);
            });

            // get users
             router.makeRequest({
                type:'post',
                url:'/user/get',
                data: {"username": ('username' in params ? params.username : null)}
            }, function(users) {
                var usersHtml = '';
                for(var i in users) {
                    usersHtml += '<p>'+users[i].id +' - '+ users[i].email  +' '+users[i].username+' </p>';
                }
                $('#users').html(usersHtml);
            });
        };

        this.about = function(params) {
            // console.log(params);
        };

        this.blog = function(params) {
        };
    });
});