require.config({
    paths: {
        jquery: '/public/js/lib/jquery',
        router: '/public/js/lib/router',
    }
});

require(["jquery","router"], function($,router) {
    $(function() {
        $template = $('#template');

        router.init();

        $template.show();
    });

});