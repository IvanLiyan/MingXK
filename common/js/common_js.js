/*Created by Ivan on 2017/1/11.*/
$(function () {
    $('.secondNav').find('li').hover( /*二级下拉菜单*/
        function(){
            $(this).find('span').stop().animate({left:6},250).siblings(".thiBox").css('display',' block');
        },function(){
            $(this).find('span').stop().animate({left:0},250).siblings(".thiBox").css('display',' none');
        }
    );

    $('.thiBox').hover( /*显示三级下拉菜单*/
        function(){
            $(this).css('display',' block').find('h3>a');
        },function(){
            $(this).css('display',' none').find('h3>a');
        }
    );

    $('.thi_tit').hover( /*三级下拉菜单hover右浮动*/
        function (){
            console.log(1);
            $(this).stop().animate({left:6},250);
        },function () {
            $(this).stop().animate({left:0},250);
        }
    );


    /*用户登录*/
    var usn = $.cookie("loginedUser");// 获取已登录的用户的用户名
    if(usn){// 有用户已经登录
        $('#hasLogin').show();
        $('#username').html(usn);
    } else {// 没有用户登录
        $('#noLogin').show();
    }

    $('#logout').click (function (){// 移除登录用户的cookie，必须给定路径为根目录否则只删除当前页，无效！
        var res =  $.removeCookie('loginedUser',{path:'/'});
        console.log(res);
        location.href = "http://localhost/MXK/index.html";
    });


});