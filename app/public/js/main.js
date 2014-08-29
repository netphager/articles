require.config({
    paths: {
        jquery: '/public/js/lib/jquery',
        router: '/public/js/lib/router',
    }
});

require(["jquery","router",window.location.pathname.split('/')[1]], function($,router,controller) {
    $(function() {
        $template = $('#template');

        router.init(controller);

        $template.show();
    });

});