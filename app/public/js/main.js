require.config({
    paths: {
        jquery: '/public/js/lib/jquery',
        router: '/router',
    }
});

require(["jquery","router"], function($,router) {
    $(function() {
        router.init();
    });

});