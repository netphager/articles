require.config({
    paths: {
        jquery: '/public/js/lib/jquery',
        helper: '/helper',
        hb: '/node_modules/requirejs-handlebars/hb',
        text: '/node_modules/requirejs-text/text',
        handlebars: '/node_modules/handlebars/dist/handlebars'
    }
});

require(["jquery","helper/router"], function($,router) {
    $(function() {
        router.init();
    });

});