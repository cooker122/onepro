$(function() {
    init();

    function init() {


        $('#loginId').on('tap', function() {
            // 获取用户输入的手机号码密码
            var telphone_text = $('[name="telphoneNum"]').val().trim();
            var password_text = $('[name="password"]').val().trim();
            console.log(telphone_text);
            console.log(password_text);

            // 判断手机号码是否合格
            if (!$.checkPhone(telphone_text)) {
                console.log("号码格式不对，请重新输入");
                mui.toast("号码格式不对，请重新输入");
                return;
            }

            // 判断密码是否合格
            if (password_text.length < 6) {
                console.log("密码格式不对，请重新输入");
                mui.toast("密码格式不对，请重新输入");
                return;
            }

            // 把获取到的数据存到对象中
            var loginObj = {
                username: telphone_text,
                password: password_text
            }
            $.post('login', loginObj, function(res) {
                // console.log(res);
                if (res.meta.status == 200) {
                    console.log("登录成功");
                    mui.toast("登录成功");
                    // 把获取到的数据存到session里面去
                    sessionStorage.setItem('userInfo', JSON.stringify(res.data));

                    var pageUrl = sessionStorage.getItem('pageUrl');
                    if (!pageUrl) {
                        pageUrl = "../index.html"
                    }
                    setInterval(function() {
                        location.href = pageUrl;
                    }, 1000);

                } else {


                }
            })
        })

    }
})