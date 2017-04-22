/* Created by Ivan on 2017/1/6. */

$(function(){

    /*二级下拉菜单hover右浮动*/
    $('.secondNav').find('li').hover( /*二级下拉菜单*/
        function(){
            $(this).find('span').stop().animate({left:6},250).siblings(".thiBox").css('display',' block');
        },function(){
            $(this).find('span').stop().animate({left:0},250).siblings(".thiBox").css('display',' none');
        }
    );

    /*显示三级下拉菜单*/
    $('.thiBox').hover(
        function(){
            $(this).css('display',' block').find('h3 > a');
        },function(){
            $(this).css('display',' none').find('h3 > a');
        }
    );

    /*三级下拉菜单hover右浮动*/
    $('.thi_tit').hover(
        function (){
            $(this).stop().animate({left:6},250);
        },function () {
            $(this).stop().animate({left:0},250);
        }
    );


    /*云彩及右下小人连续运动动画 根据运动速度不同分为三个计时器*/
    moving();
    moving2();
    moving3();
    setInterval( moving ,4000);
    setInterval( moving2 ,2000);
    setInterval( moving3 ,3000);
    function moving (){
        $('#ycZs').stop().animate({left:222},2000,function () {
            $('#ycZs').stop().animate({left:282},2000,function () {
                moving();
            })
        })
        $('#ycZx').stop().animate({left:98},2000,function () {
            $('#ycZx').stop().animate({left:48},2000,function () {
                moving();
            })
        })
        $('#ycYx').stop().animate({left:1263},2000,function () {
            $('#ycYx').stop().animate({left:1203},2000,function () {
                moving();
            })
        })
    }
    function moving2() {
        $('#renZx').stop().animate({left:206},1000,function () {
            $('#renZx').stop().animate({left:236},1000,function () {
                moving2();
            })
        })
    }
    function moving3() {
        $('#ycYd').stop().animate({left:1186},1500,function () {
            $('#ycYd').stop().animate({left:1126},1500,function () {
                moving();
            })
        })
    }

    /*banner部分hover运动动画*/
    $('#center1').hover(
        function () {
            $('#renZ').stop().animate({left:495},800);
            $('#renY').stop().animate({left:865},800);
            $('#renYx').stop().animate({left:1165},800);
            $('#renZs').stop().animate({top:100},800);
            $('#yf1').stop().animate({left:440,top:55},800);
            $('#yf2').stop().animate({left:935,top:55},800);
            $('#xj').stop().animate({left:718,top:48},800);
        },function(){
            $('#renZ').stop().animate({left:470},800);
            $('#renY').stop().animate({left:890},800);
            $('#renYx').stop().animate({left:1120},800);
            $('#renZs').stop().animate({top:130},800);
            $('#yf1').stop().animate({left:455,top:70},800);
            $('#yf2').stop().animate({left:920,top:70},800);
            $('#xj').stop().animate({left:718,top:-500},800);
        }
    );

    /*index1蒙层动画效果*/
    $('.index1_bor').hover(
        function () {
            console.log(1);
            $(this).siblings('.index1_op').stop().fadeIn(300);
            $(this).siblings('.index1Part').find('p').stop().animate({top:120},400);
        },function () {
            $(this).siblings('.index1_op').stop().fadeOut(300);
            $(this).siblings('.index1Part').find('p').stop().animate({top:189},400);
        }
    );

    $(".index2_text").find('a').mouseenter(
        function () {
            $(this).siblings('.index2_op').stop(false,true).slideDown(150);
        }
    );
    $('.index2_op').mouseout(
        function () {
            $(this).stop(false,true).slideUp(100);
        }
    );

    /*main蒙层动画效果*/
    $('.main_bor').hover(
        function () {
            $(this).siblings('.main_op').stop().fadeIn(300);
            $(this).siblings('a').find('p').stop().animate({top:120},400);
        },function () {
            $(this).siblings('.main_op').stop().fadeOut(300);
            $(this).siblings('a').find('p').stop().animate({top:180},400);
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

    /*head部分购物车显示数目*/
    var cartStr =  $.cookie('cart') ? $.cookie('cart') : "{}";
    var cartObj = JSON.parse(cartStr);
    var cartNum = 0;  /*购物车中的总商品数*/
    var subNum = 0;   /*每个goodId购买的商品个数*/
    for(var gNum in cartObj) {  /*遍历每个goodId，每个goodId为变量gNum*/
        subNum = cartObj[gNum].num;  /*获取每个goodId的商品购买个数*/
        cartNum += subNum;  /*将所有goodId的商品的购买总数相加*/
    }
    $('#buy').find('span').html(cartNum);


});

