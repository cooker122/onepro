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

    // 在$里面添加方法，方便以后直接用$调用
    $.extend($, {
        // 封装一个手机验证的方法
        checkPhone: function(phone) {
            if (!(/^1[34578]\d{9}$/.test(phone))) {
                return false;
            } else {
                return true;
            }
        },
        // 封装一个邮箱的验证方法
        checkEmail: function(myemail) {　　
            var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
            if (myReg.test(myemail)) {　　　　
                return true;　　
            } else {　　　　
                return false;
            }
        },

        // url上面的数据的截取
        getUrl: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        },

    })

})