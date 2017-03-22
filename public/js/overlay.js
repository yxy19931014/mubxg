/**
 * Created by thinkpad on 2017/3/20.
 */
define(['jquery','nprogress'],function ($,nprogress) {
    $(document).ajaxStart(function () {
        $('.overlay').show();
    });
    $(document).ajaxStop(function () {
        $('.overlay').hide();
    });
    nprogress.start();
    nprogress.done();

});