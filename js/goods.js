$(function() {

    var dataobj = {
        query: "",
        cid: getUrl().cid,

        pagenum: 1,
        pagesize: 10
    }

    // 定义一个变量存取页数
    var pyg_page = 1;

    init();

    function init() {
        // getUrl(name);

        mui.init({
            pullRefresh: {
                container: ".good-list-content",
                down: {
                    auto: true,
                    //  触发下拉刷新时自动触发
                    callback: function() {
                        dataobj.pagenum = 1;
                        centent(function(html) {
                            // 重置页码
                            // 在下拉刷新的时候渲染页面
                            $('.good-list-box').html(html);
                            // 停止下拉刷新
                            mui('.good-list-content').pullRefresh().endPulldownToRefresh();
                            // 重置数据
                            mui('.good-list-content').pullRefresh().refresh(true);

                        });

                    }

                },
                up: {
                    // auto: true,
                    //  触发上拉刷新时自动触发
                    callback: function() {

                        // 判断数据是否只有一页。还有下一页？
                        if (dataobj.pagenum >= pyg_page) {

                            mui('.good-list-content').pullRefresh().endPullupToRefresh(true);

                        } else {
                            // 让页面加加
                            dataobj.pagenum++;
                            // 在原本是数据上增加渲染多一页
                            centent(function(html) {
                                $('.good-list-box').append(html);
                                // 结束下拉加载
                                mui('.good-list-content').pullRefresh().endPullupToRefresh();
                            })
                        }


                    }
                }
            }
        });
        eventGoods();
    }
    // 渲染页面的函数
    function centent(cd) {
        // console.log(111);

        $.get('goods/search', dataobj, function(res) {
            console.log(res);
            pyg_page = Math.ceil(res.data.total / dataobj.pagesize);
            if (res.meta.status == 200) {
                var html = template('goodsTlp', { data: res.data.goods });

                cd(html);
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



    // 封装一个跳转到才商品详情页
    // 因为写样式的时候没有用a标签，而且因为mui的下拉刷新的原因导致a标签的跳转
    // 效果被阻断了，所以使用location.href来实现跳转功能
    function eventGoods() {
        $('.good-list-box').on('tap', 'li', function() {
            // 因为是自定义的方式存的数据所以需要用arrt这个方法获取
            var href = $(this).attr('url');
            // console.log(href);
            location.href = href;
        })
    }
})