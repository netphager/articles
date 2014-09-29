define(function(require) {
    return new (function() {

        var router = require('helper/router');
        var dialog = require('helper/dialog');
        var that = this;

        this.noTemplate = ['save','remove','test','update'];

        // add article
        this.add = function(params,template) {
            dialog.open('add',params);
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
                console.log('successfully added article ' + article._id);
                dialog.close('add');
                // window.location = '/app/#/article/home';
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
                $('[main-template]').html(router.render('show',{article: article}));
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
                $('[main-template]').html(router.render('edit',{article: article}));
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
                // get users
                router.makeRequest({
                    type:'post',
                    url:'/user/get',
                    data: {"username": ('username' in params ? params.username : null)}
                }, function(users) {
                    $('[main-template]').html(router.render('home',{
                        articles: articles,
                        users:users
                    }));
                });
            });
        };

        this.about = function(params) {
            $('[main-template]').html(router.render('about',{title: 'Zaglavie'}));
        };
    });
});