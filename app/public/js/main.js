require.config({
    paths: {
        jquery: '/public/js/lib/jquery',
        helper: '/helper',
    }
});

require(["jquery","helper/router"], function($,router) {
    $(function() {
        router.init();
    });

});