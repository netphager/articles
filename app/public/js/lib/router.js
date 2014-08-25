define(function() {
    return new (function() {
        var that = this;
        this.init = function(controller) {
            var urlParams = that.getHashParams();
            controller[urlParams.page](urlParams);

            window.addEventListener("hashchange", function(e) {
                var urlParams =  that.getHashParams();
                controller[urlParams.page](urlParams);
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
                q = window.location.hash.substring(1);

            while (e = r.exec(q))
               hashParams[d(e[1])] = d(e[2]);

            return hashParams;
        };

        this.makeRequest =  function(req,callback) {
            req.contentType = "application/json";
            req.data = JSON.stringify(req.data);
            req.success = function(response) {
                callback(response);
            };
            req.error = function() {
                callback({'error': true});
            };
            $.ajax(req);
        };
    })
});