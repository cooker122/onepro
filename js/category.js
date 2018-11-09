$(function() {
    var Data;
    var index;
    var leftScroll;
    var rightScroll;
    init();


    // 初始化代码
    function init() {
        fn();
        // render();
        // leftCategory();
        renterMain();
        // rightCategory();
        eventList();
    }
    // 字体的设置

    function fn() {
        // 设计图上的宽度
        var pageWidth = 320;
        // 基础值
        var basenum = 100;
        // 当前屏幕的宽度
        var screenWidth = document.querySelector('html').offsetWidth;

        // 字体的大小
        var fs = basenum * screenWidth / pageWidth;

        document.querySelector('html').style.fontSize = fs + 'px';
    }
    // 监视视口宽度的变化
    window.onresize = function() {
            fn();
        }
        // 内容请求的数据
    function render() {
        // $('body').addClass('loadding');
        $.get('categories', function(res) {
            console.log(res);
            if (res.meta.status == 200) {
                Data = res.data;
                localStorage.setItem('cates', JSON.stringify({
                    Data: res.data,
                    time: Date.now()
                }), );
            } else {
                console.log('失败');
            }
            // 调用函数左边渲染
            leftCategory();
            // 调用右边渲染
            rightCategory(0);

            // $('body').removeClass('loadding');

        })
    }
    // 左边数据的渲染
    function leftCategory() {

        var html = template('pageLeftTlp', { data: Data });
        $('.page-left ul').html(html);
        leftScroll = new IScroll('.page-left');

    }


    // 左侧导航栏的点击事件
    function eventList() {

        $('.page-left ul').on('tap', 'li', function() {
            $(this).addClass('avact').siblings().removeClass('avact');


            leftScroll.scrollToElement(this);
            // rightScroll.scrollToElement(this);

            index = $(this).index();
            console.log(index);
            rightCategory(index);

        })
    }
    // 内容右侧渲染的数据
    function rightCategory(index) {
        var html = template('pageRightTlp', { data: Data[index].children });
        // console.log(html);

        $('.page-right-box').html(html);
        // 获取照片的最后一直索引
        var num = $('.page-right img').length;
        $('.page-right img').on('load', function() {
            num--;
            if (num == 0) {
                rightScroll = new IScroll('.page-right');
            }
        })

    }



    function renterMain() {
        // 获取本地缓存数据
        var catdataStr = localStorage.getItem('cates');
        // 判断本地内存是否有数据，没有的数据就向服务器发送ajax请求
        if (!catdataStr) {
            render();
        } else {
            // 把接收到的字符串数据转化成为对象形式的
            var locaData = JSON.parse(catdataStr);
            // 判断本地存的数据有没有过期
            if (Date.now() - locaData.time > 10000) {
                // 过期的话就发送ajax请求来请求数据来渲染页面
                render();
            } else {
                // 把本地的值付给Data
                Data = locaData.Data;
                // 调用函数左边渲染
                leftCategory();
                // 调用右边渲染
                rightCategory(0);

            }
        }


    }
})