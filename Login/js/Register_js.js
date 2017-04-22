/* Created by Ivan on 2017/1/14.*/
$(function(){
    var usn ;
    var pwd ;
    var conPwd;
    var usersStr = $.cookie('registerUsers')?$.cookie("registerUsers"):"{}";
    var usersObj = JSON.parse(usersStr);
    var UsernameOk = false;  /*初始设置用户名、密码、校验密码、验证码均有误*/
    var PasswordOk = false;
    var ConfirmpasOk = false;
    var ChecknumOk = false;

    /*失去光标校验用户名*/
    $('#username').blur(
        function () {
            var usn = $('#username').val();
            var patternTel = /^1\d{10}$/; /*用户名为手机号*/
            var patternEmi = /^.+@.+\.com$/; /*用户名为邮箱*/
            var resTel = patternTel.test(usn);
            var resEmi = patternEmi.test(usn);
            if(usn in usersObj){
                console.log(1);
                $('#error').show().find('span').html('该帐号已注册！');
                $('#ok').hide();
                return;
            }else if(!resTel && !resEmi){
                $('#error').show().find('span').html('请输入正确的邮箱帐号或手机！');
                $('#ok').hide();
                return;
            }else if (resTel || resEmi){
                $('#ok').show();
                $('#error').hide();
                UsernameOk =true;
            }
        }
    );

    /*校验密码*/
    $('#password').blur(
        function () {
            var pwd = $('#password').val();
            var patternPas = /\w{4,}/; /*密码大于4位的数字字母*/
            var resPas = patternPas.test(pwd);
            if (!resPas){
                $('#error').show().find('span').html('您输入的密码不能小于4个字符的数字或字母！');
                $('#ok').hide();
                return;
            }else if (resPas){
                $('#ok').hide();
                $('#error').hide();
                PasswordOk = true;
            }
        }
    );

    /*检验再次输入的密码*/
    $('#confirmPwd').blur(
        function () {
            var conPwd = $('#confirmPwd').val();
            var pwd = $('#password').val();
            if ( conPwd != pwd){
                $('#error').show().find('span').html('您两次输入的密码不一致！');
                $('#ok').hide();
                return;
            }else if (conPwd == pwd){
                $('#ok').hide();
                $('#error').hide();
                ConfirmpasOk = true;
            }
        }
    );

    /*校验验证码*/
    $('#checkNum').blur(
        function () {
            var check = $('#checkNum').val();
            if (check != "5329"){
                $('#error').show().find('span').html('您输入的验证码有误！');
                $('#ok').hide();
            }else{
                $('#error').hide();
                $('#ok').hide();
                ChecknumOk = true;
            }
        }
    );

    /*设置注册按钮*/
    $("#register").click (function(){
        var usn = $('#username').val();
        var pwd = $('#password').val();
        var conPwd = $('#confirmPwd').val();
        if(!usn || !pwd || !conPwd){
            $('#error').show().find('span').html('用户名、密码、确认密码不能为空');
            return;
        } else if (UsernameOk && ChecknumOk && PasswordOk && ConfirmpasOk){ /*当用户名、密码、确认密码、验证码均正确才执行注册*/
            usersStr = $.cookie('registerUsers');// 取出之前已经注册过的用户的用户名和密码
            usersStr = usersStr ? usersStr : "{}";// 判断一下是否从来没有注册过用户

            usersObj = JSON.parse(usersStr); // 将JSON字符串转为对象
            usersObj[usn] = pwd;
            usersStr = JSON.stringify(usersObj);// 将包含新用户名和密码的对象，转为json字符串
            $.cookie('registerUsers', usersStr, {expires:7, path:'/'});// 将新的用户名和密码的信息，保存到cookie中
            $('#ok').show().find('span').html('注册成功！');
            $('#error').hide();
        }
    });
});
