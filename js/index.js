$(function() {
    init();

    function init() {
        gallery();
        pygNav();
        pygGoods();
    }
    // 轮播图
    function gallery() {
        $.get('home/swiperdata', function(res) {
            if (res.meta.status == 200) {
                var html = template('galleryTlp', { data: res.data });
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

    // 导航栏

    function pygNav() {
        $.get('home/catitems', function(res) {
            if (res.meta.status == 200) {
                var html = template('pygnavTlp', { data: res.data });
                $('.pyg-nav-box').html(html);
            } else {
                console.log('导航栏失败');
            }

        })
    }

    // 内容
    function pygGoods() {
        $.get('home/goodslist', function(res) {
            if (res.meta.status == 200) {
                var html = template('goodsTlp', { data: res.data });
                $('.pyg-list').html(html);
            } else {
                console.log('内容失败');

            }
        })
    }
})