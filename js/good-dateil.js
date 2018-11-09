$(function() {

    var dateilObj = {
        goods_id: getUrl().goods_id
    }
    init();

    function init() {
        gallery();
    }


    // 轮播图
    function gallery() {
        $.get('goods/detail', dateilObj, function(res) {
            console.log(res);
            if (res.meta.status == 200) {
                var html = template('galleryTlp', { data: res.data.pics });
                $('.mui-slider').html(html);

            } else {
                console.log('轮播图失败');
            }
            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
            });
        })

    }
    // 



    // 封装函数，获取导航栏后缀的数据
    function getUrl() {
        // 获取地址栏后缀
        var search = location.search;
        // 定义一个空对象
        var searchObj = {};
        if (search) {
            search = search.replace('?', '');
            var urlarr = search.split('&');
            // console.log(urlarr);
            urlarr.forEach(function(item, i) {
                // console.log(item);
                var itemarr = item.split('=');
                // console.log(itemarr);
                searchObj[itemarr[0]] = itemarr[1];
            })
        }

        return searchObj;

    }

})