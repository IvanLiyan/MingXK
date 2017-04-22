/*
 * Created by Ivan on 2017/1/13.
 */
$(function(){
    $('#login').click(function (){
        var usn = $('#username').val();
        var pwd = $('#password').val();
        if(!usn || !pwd){
            alert("用户名或密码为空");
            return;
        }
        // 用户名密码校验
        // 1. 取出所有的用户名及密码信息
        var usersStr = $.cookie("registerUsers");
        usersStr = usersStr ? usersStr : "{}";
        var usersObj = JSON.parse(usersStr);
        var checkNum = $('#inpCheck').val();

        /*校验验证码及用户名密码*/
        if(usersObj[usn] === pwd && checkNum === "2407"){
            $.cookie('loginedUser', usn, {expires:7, path:'/'});
            location.href = "../index.html";
        } else if (usersObj[usn] === pwd && checkNum != "2407"){// 登录失败
            $('#error1').show();
            $('#error2').hide();
        }else {// 登录失败
            $('#error2').show();
            $('#error1').hide();
        }
    });
});
