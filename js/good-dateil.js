$(function() {
    var GoodsInfo;
    var dateilObj = {
        goods_id: getUrl().goods_id
    }
    init();

    function init() {
        gallery();
        event();
    }


    // 轮播图
    function gallery() {
        $.get('goods/detail', dateilObj, function(res) {
            console.log(res);
            if (res.meta.status == 200) {
                GoodsInfo = res.data;
                var html = template('galleryTlp', { data: GoodsInfo });
                $('.big-box').html(html);

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
    function event() {
        $('.add').on('tap', function() {
            console.log(111);
            var userInfoUrl = sessionStorage.getItem('userInfo');

            if (!userInfoUrl) {
                mui.toast('请重新登录');
                console.log('请重新登录');
                sessionStorage.setItem('pageUrl', location.href);
                setInterval(function() {
                    location.href = 'login.html'
                }, 1000);
                return;
            } else {
                // location.href = '../index.html';
                info_obj = {
                        cat_id: GoodsInfo.cat_id,
                        goods_id: GoodsInfo.goods_id,
                        goods_name: GoodsInfo.goods_name,
                        goods_number: GoodsInfo.goods_number,
                        goods_price: GoodsInfo.goods_price,
                        goods_small_logo: GoodsInfo.goods_small_logo,
                        goods_weight: GoodsInfo.goods_weight
                    };
                var infoObjStr = JSON.stringify(info_obj);
                // console.log(infoObjStr);
                   

                // sessionStorage.setItem('goods',infoObjStr);
                var token = JSON.parse(userInfoUrl).token;
                console.log(token);
                $.ajax({
                    url: 'my/cart/add',
                    type: 'post',
                    data: {
                        info: infoObjStr
                    },
                    headers: {
                        Authorization: token
                    },
                    success: function(res) {
                        console.log(res);
                        if (res.meta.status == 200) {

                            mui.confirm("是否要跳转到购物车", "", ["跳转", "取消"], function(btn) {
                                if (btn.index == 0) {
                                    setInterval(function() {
                                        location.href = "cart.html";
                                    }, 1000)
                                } else if (btn.index == 1) {
                                    console.log('取消')
                                }
                            })
                        }
                    }
                })
            }
        })
    }


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