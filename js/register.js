$(function() {
    init();

    function init() {
        eventList();
    }
    // 注册获取验证码事件
    function eventList() {

        $('.huoqu').on('tap', function() {
            // 获取输入手机的手机号码、
            var phone_txt = $('[name="mobile"]').val().trim();
            // console.log(phone_txt);
            // 调用封装的验证手机范方法验证手机号码格式，取反判断手机号码错误
            if (!$.checkPhone(phone_txt)) {
                mui.toast('号码不正确');
                return;
            }



            $.post('users/get_reg_code', {
                mobile: phone_txt
            }, function(res) {
                console.log(res);
                if (res.meta.status == 200) {

                    // 定义一个时间
                    var time = 5;
                    // 把按钮的的值改为5秒后发生
                    $('.huoqu').text(time + "秒后重发")
                    $(".huoqu").attr('disabled', true);
                    var timer = setInterval(function() {

                        $('.huoqu').text(time + "秒后重发")
                            // 让时间减减
                        time--;
                        // 判断时间等于0的时候
                        if (time == 0) {
                            // 关闭定时器
                            clearInterval(timer);
                            // 把按钮的值改回原来的

                            $('.huoqu').text("获取验证码");

                            $(".huoqu").removeAttr('disabled');

                        }
                    }, 1000)

                } else {
                    // console.log("数据获取失败")
                };


            })

        });
        $('#register').on('tap', function() {
            // console.log(222);
            //    获取所以输入框里面的值
            var phone_text = $("[name='mobile']").val().trim();

            var code_text = $("[name='code']").val().trim();

            var email_text = $("[name='email']").val().trim();
            // console.log(email_text);
            var pwd_text = $("[name='pwd']").val().trim();
            var pwd2_text = $("[name='pwd2']").val().trim();
            var gender_text = $("[name='gender']:checked").val();
            console.log(gender_text);
            if (!$.checkPhone(phone_text)) {
                mui.toast('号码不正确');
                return;
            }
            // 判断验证码的值
            if (code_text.length != 4) {
                console.log('验证码不正确');
                mui.toast('验证码不正确');
                return;
            }
            // 判断邮箱是否正确
            if (!$.checkEmail(email_text)) {

                console.log('邮箱不正确');
                mui.toast('邮箱不正确');
                return;
            }
            // 判断密码是否正确   判断密码是否大于6位数
            if (pwd_text.length < 6) {
                console.log('密码不正确');
                mui.toast('密码不正确');
                return;
            }
            // 判断再次输入的密码跟第一次输入的长度一样
            // if (pwd_text.length != pwd2_text.length) {
            if (pwd2_text.length < 6) {
                // console.log(2222);
                console.log('两次密码输入不相符');
                mui.toast('两次密码输入不相符');
                return;
            }



            var userMessageObj = {
                mobile: phone_text,
                code: code_text,
                email: email_text,
                pwd: pwd_text,
                gender: gender_text
            }
            $.post("users/reg", userMessageObj, function(res) {
                console.log(res);
                if (res.meta.status == 200) {
                    console.log(res.meta.msg);
                    mui.toast(res.meta.msg);
                    setInterval(function() {
                        location.href = "../pages/login.html";

                    }, 1000)
                } else {
                    mui.toast(res.meta.msg);
                    console.log(res.meta.msg);

                }
            })
        })


    }

})