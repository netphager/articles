define(function() {
    return new (function() {
        var that = this;
        this.init = function() {

            executeMethod();

            function executeMethod() {
                var hashArray = window.location.hash.split('/').splice(1);
                var controller = hashArray[0];
                var method = hashArray[1];
                var paramsArray =  hashArray.splice(2);
                var params = {};

                var properties = [];
                var values = [];
                if(paramsArray.length > 1) {
                    for(var i in paramsArray) {
                        if(i % 2 == 0) {
                            properties.push(paramsArray[i])
                        } else {
                            values.push(paramsArray[i]);
                        }
                    }
                }

                for(var i in properties) {
                    params[properties[i]] = typeof(values[i]) != 'undefined' ? values[i]  : null;
                }

                require([controller],function(controller) {
                    if(controller.noTemplate.indexOf(method) == -1) {
                        // load template
                        var template = method;
                        that.makeRequest({
                            type:'post',
                            url:'/getTemplate',
                            data: {"template":template}
                        },function(template) {
                            $('[main-template]').html(template);
                            controller[method](params);
                        });
                    } else {
                        controller[method](params);
                    }
                });
            }

            window.addEventListener("hashchange", function(e) {
                executeMethod();
            }, false);

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