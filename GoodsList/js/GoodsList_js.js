/*
 * Created by Ivan on 2017/1/11.
 */

/*商品尺寸显示*/
$(function () {
    $('.goodslist').find('dl').hover(
        function () {
            $(this).css('background', '#f0f0f0').find('.size').toggle();
        },function () {
            $(this).css('background', 'none').find('.size').toggle();
        }
    );

    /*点击多选拓展*/
    var newActived = $('<div class="actived"><input type="button" value="提交" id="submit" style="cursor: pointer"><input type="button" value="取消" id="cancel"  style="cursor: pointer"></div>');
    $('.filter').find('img').click(
        function () {
            $(this).css('opacity',0).parents('dl').css('background','#f5f5f5').append(newActived).siblings('dl').css('background','#fff').find('img').css('opacity',1);
            $(this).parents('dl').append(newActived).find('.actived').on("click",function () {
                $(this).parents('dl').css('background','#fff').find('img').css('opacity',1).parents('.filterBox').siblings('div').remove();
            })
        }
    );

    /*设置筛选框鼠标事件背景色*/
    $('.filter').hover(
        function () {
            $(this).find('dl').css('background','#fff')
        },function () {
            var dlBg = $(this).find('dl').css('background');
            if(dlBg != "f5f5f5"){
                $(this).find('dl').css('background','#fafafa')
            }
        }
    );

    /*取消按钮点击事件*/
    function cancel() {
        $(this).parents('dl').css('background','#fff').find('img').css('opacity',1);
        $(this).parents('.filterBox').siblings('.actived').remove();
    }

    /*展开收起按钮*/
    $('.close').click(
        function(){
            $('.filter').find('dl:gt(2)').toggle();
            if($(this).html() == "展开"){
                $(this).html('收起');
                return;
            }else {
                $(this).html('展开');
            }
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
    console.log(cartNum);
    console.log(1);

});

