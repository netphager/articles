define(function(require) {
    return new (function() {

        var router = require('helper/js/router');
        var template = require('helper/js/template');
        var dialog = require('helper/js/dialog');
        var that = this;

        this.noTemplate = ['save','remove','update','removeAttachment'];

        // listen for upload complete
        router.makeRequest({
            type:'get',
            url: '/article/listenUploadComplete'
        });
        $(window).on('dialogOpened', function() {
            // init uploader
            if($('input[name="fileUpload"]').length > 0) {
                var uploadHelper = require('helper/js/upload');
                uploadHelper.init($('input[name="fileUpload"]'),$('.dropFiles'));
            }
        });

        // add article
        this.add = function(params,template) {
            console.log(params,template);
            dialog.open('add',params);
        };

        this.upload = function(params,template) {
            dialog.open('upload',params);
        };

        this.test = function () {
            template.loadTemplate('about','../../templates/article/',function() {
                $('[main-template]').html(template.render('about'));
            });
        };

        this.removeAttachment = function(params) {
            router.makeRequest({
                type: 'post',
                url: '/article/removeAttachment',
                data: {"id": params.id}
            }, function() {
                console.log('successfully removed attachment ' + params.id);
                window.location = '/app/#/article/home';
            });
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
                $('[main-template]').html(template.render('show',{article: article}));
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
                // dialog.open('edit',{article:article});
                $('[main-template]').html(template.render('edit',{article: article}));
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
                // dialog.close('edit');
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
                    // get attachments
                    router.makeRequest({
                        type:'post',
                        url:'/article/getAttachments',
                    }, function(attachments) {
                        $('[main-template]').html(template.render('home',{
                            articles: articles,
                            users:users,
                            attachments: attachments
                        }));
                    });
                });
            });
        };

        this.about = function(params) {
            // dialog.open('about',{title: 'zaglavie'});
            $('[main-template]').html(template.render('about',{title: 'Zaglavie'}));
        };
    });
});