define(function(require) {
    return new (function() {
        var router = require('router');
        var that = this;

        this.noTemplate = ['add','remove','test'];

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
                window.location = '/app/#/article/home';
            });
        }

        this.test = function(params) {
            router.makeRequest({
                type:'post',
                url:'/article/test',
                data: {
                    "param1": 'test1',
                    "param2": 'test2',
                    "param3": 'test3',
                    "param4": 'test4'
                }
            }, function(response) {
                console.log(response);
            });
        };

        // remove article
        this.remove = function(params) {
            var id = params.id;
            router.makeRequest({
                type:'post',
                url:'/article/remove',
                data: {"id": id}
            }, function(article) {
                console.log('successfully removed article ' + id);
                window.location = '/app/#/article/home';
            });
        };

        // show article
        this.show = function(params) {
            var id = params.id;
            router.makeRequest({
                type:'post',
                url:'/article/show',
                data: {"id": id}
            }, function(article) {
                $('#article').html('<h2>'+article.title+'</h2><p>'+ article.text+'</p>');
            });
        };

        // edit article
        this.edit = function(params) {
            var id = params.id;
            router.makeRequest({
                type:'post',
                url:'/article/edit',
                data: {"id": id}
            }, function(article) {
                console.log('successfully edited article '+ params.id);
            });
        };

        // update article
        this.update = function(params) {
            var id = params.id;
            router.makeRequest({
                type:'post',
                url:'/article/update',
                data: {"id": id}
            }, function(article) {
                console.log(article);
                // $('#article').html('<h2>'+article.title+'</h2><p>'+ article.text+'</p>');
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
                    articlesHtml += '<p>'+ articles[i].title  +' '+articles[i].text+' <a href="/app/#/article/show/id/'+articles[i]._id+'">Show</a> <a href="/app/#/article/remove/id/'+articles[i]._id+'">Remove</a></p>';
                }
                $('#articles').html(articlesHtml);
            });

            // get users
             /*router.makeRequest({
                type:'post',
                url:'/user/get',
                data: {"username": ('username' in params ? params.username : null)}
            }, function(users) {
                var usersHtml = '';
                for(var i in users) {
                    usersHtml += '<p>'+users[i].password +' - '+ users[i].email  +' '+users[i].username+' <a href="/app/#/user/remove/id/'+users[i]._id+'">Remove</a> </p>';
                }
                $('#users').html(usersHtml);
            });*/
        };

        this.about = function(params) {
            // console.log(params);
        };
    });
});