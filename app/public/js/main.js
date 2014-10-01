require.config({
    paths: {
        jquery: '/lib/jquery/dist/jquery.min',
        helper: '/helper',
        hb: '/lib/requirejs-handlebars/hb',
        text: '/lib/requirejs-text/text',
        handlebars: '/lib/handlebars/dist/handlebars'
    }
});

require(["jquery","helper/js/router"], function($,router) {
    $(function() {
        router.init();
    });

});