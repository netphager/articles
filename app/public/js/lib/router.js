define(function() {
    return new (function() {
        var that = this;
        this.init = function() {

            executeMethod();

            function executeMethod() {
                require([window.location.hash.split('/')[1].split('#')[0]],function(controller) {
                    var urlParams =  that.getHashParams();
                    var method = urlParams.method;
                    console.log(window.location.hash.split('/')[1].split('#')[0],urlParams);

                    if(controller.noTemplate.indexOf(method) == -1) {
                        // load template
                        var template = method;
                        that.makeRequest({
                            type:'post',
                            url:'/getTemplate',
                            data: {"template":template}
                        },function(template) {
                            $('[main-template]').html(template);
                            controller[method](urlParams);
                        });
                    } else {
                        controller[method](urlParams);
                    }

                });

            }

            // controller[urlParams.method](urlParams);
            window.addEventListener("hashchange", function(e) {
                executeMethod();
            }, false);

        };

        this.redirect = function(url) {
       /*     var link = '<a id="redirectLink" href="#page='+url+'"></a>';
            $('body').append(link);
            $('#redirectLink').click();*/
        };

        this.getHashParams = function() {
            var hashParams = {};
            var e,
                a = /\+/g,  // Regex for replacing addition symbol with a space
                r = /([^&;=]+)=?([^&;]*)/g,
                d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
                q = window.location.hash.split('#')[2];

            while (e = r.exec(q))
               hashParams[d(e[1])] = d(e[2]);

            return hashParams;
        };

        this.makeRequest =  function(req,callback) {
            req.contentType = "application/json";
            req.data = JSON.stringify(req.data);
            if(typeof(callback) == 'function') {
                req.success = function(response) {
                    callback(response);
                };
                req.error = function() {
                    callback({'error': true});
                };
            }

            var promise = $.ajax(req);

            if(typeof(callback) != 'function') {
                return promise;
            }
        };
    })
});