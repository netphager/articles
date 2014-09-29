require.config({
    paths: {
        jquery: '/helper/node_modules/jquery/dist/jquery.min',
        helper: '/helper',
        hb: '/helper/node_modules/requirejs-handlebars/hb',
        text: '/helper/node_modules/requirejs-text/text',
        handlebars: '/helper/node_modules/handlebars/dist/handlebars'
    }
});

require(["jquery","helper/router"], function($,router) {
    $(function() {
        router.init();
    });

});