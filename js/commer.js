$(function() {

    // var baseUrl = 'http://api.pyg.ak48.xyz/api/public/v1/';
    var baseUrl = 'http://api.pyg.ak48.xyz/';
    template.defaults.imports.imgUrl = baseUrl;
    $.ajaxSettings.beforeSend = function(xhr, obj) {
        obj.url = baseUrl + "api/public/v1/" + obj.url;
        $('body').addClass('loadding');

    }
    $.ajaxSettings.complete = function(xhr, obj) {
            $('body').removeClass('loadding');
        }
        // console.log(getUrl('cid'));

})