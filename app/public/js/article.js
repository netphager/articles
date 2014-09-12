define(function(require) {
    return new (function() {
        var router = require('helper/router');
        var dialog = require('helper/dialog');
        console.log(dialog);
        var that = this;

        this.noTemplate = ['save','remove','test','update'];
        this.noReplaceTemplate = ['add'];

        // add article
        this.add = function(params,template) {
        };

        // save article
        this.save = function(){
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
                $('input[name=title]').val(article.title);
                $('textarea[name=text]').val(article.text);
                $('a.saveArticle').attr('href','/app/#/article/update/id/'+article._id);
            });
        };

        // update article
        this.update = function(params) {
            var id = params.id;
            var title = $('input[name=title]').val();
            var text = $('textarea[name=text]').val();
            router.makeRequest({
                type:'post',
                url:'/article/update',
                data: {
                    "id": id,
                    "title": title,
                    "text": text
                }
            }, function(article) {
                console.log('successfully updated article '+ article._id);
                window.location = '/app/#/article/home';
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
                    articlesHtml += '<div class="article" style="margin:30px;"><p>'+ articles[i].title  +'<br /> '+articles[i].text+'</p> <a href="/app/#/article/show/id/'+articles[i]._id+'">Show</a>'+
                    ' <a href="/app/#/article/edit/id/'+articles[i]._id+'">Edit</a> <a href="/app/#/article/remove/id/'+articles[i]._id+'">Remove</a></div><hr />';
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
                    usersHtml += '<p>'+users[i].password +' - '+ users[i].email  +' '+users[i].username+' <a href="/app/#/user/remove/id/'+users[i]._id+'">Remove</a> </p>';
                }
                $('#users').html(usersHtml);
            });
        };

        this.about = function(params) {
            // console.log(params);
        };
    });
});