/*
 * Created by Ivan on 2017/1/12.
 */
$(function () {

    /*商品详情部分点击切换*/
    $('.tab').find('a').eq(0).click(
        function () {
            $(this).addClass('tabActive').siblings('a').removeClass('tabActive');
            $('.details').show().siblings('div').hide();
        }
    );
    $('.tab').find('a').eq(1).click(
        function () {
            $(this).addClass('tabActive').siblings('a').removeClass('tabActive');
            $('.comment').show().siblings('div').hide();
        }
    );
    $('.tab').find('a').eq(2).click(
        function () {
            $(this).addClass('tabActive').siblings('a').removeClass('tabActive');
            $('.sum').show().siblings('div').hide();
        }
    );
    $('.tab').find('a').eq(3).click(
        function () {
            $(this).addClass('tabActive').siblings('a').removeClass('tabActive');
            $('.consult').show().siblings('div').hide();
        }
    );
    $('.tab').find('a').eq(4).click(
        function () {
            $(this).addClass('tabActive').siblings('a').removeClass('tabActive');
            $('.protect').show().siblings('div').hide();
        }
    );
    $('.tab').find('a').eq(5).click(
        function () {
            $(this).addClass('tabActive').siblings('a').removeClass('tabActive');
            $('.ok').show().siblings('div').hide();
        }
    );
    $('.tab').find('a').eq(6).click(
        function () {
            $(this).addClass('tabActive').siblings('a').removeClass('tabActive');
            $('.problem').show().siblings('div').hide();
        }
    );

    /*商品小图片hover改变大图*/
    var viewS = $('.viewS');
    var len = $('.viewS').size();
    for(var i = 0; i < len; i ++){
        viewS[i].index = i;
        $('.viewS').eq(i).hover(
            function () {
                var j = this.index + 1;
                var vieClass = $(this).prop('class');
                if( vieClass == "viewS"){
                    $(this).find('img').css('border','1px #ff5300 solid ').parents().siblings('.viewB').find('img').prop('src','imgs/detail' + j + 'b.jpg');
                }
            },function () {
                var vieClass = $(this).prop('class');
                if(vieClass == "viewS"){
                    $(this).find('img').css('border','1px #eee solid').parents().siblings('.viewB').find('img').prop('src','imgs/detail1b.jpg');
                }
            }
        )
    }

    /*商品小图片点击切换大图*/
    for(var i = 0; i < len; i ++){
        viewS[i].index = i;
        $('.viewS').eq(i).click(
            function () {
                var j = this.index + 1;
                console.log(1);
                $(this).addClass('viewSclick').find('img').css('border','2px #ff5300 solid').parents('.viewS').siblings().removeClass('viewSclick').find('img').css('border','1px #eee solid');
                $(this).parents().siblings('.viewB').find('img').prop('src','imgs/detail' + j + 'b.jpg');
            }
        )
    }

    var resSize;
    for( var i = 1 ; i <= 8 ; i ++){
        /*选择尺寸的hover动画*/
        $('.chooseSize').find('li').eq(i).hover(
         function () {
             $(this).addClass('activeLi');
         },function () {
                $(this).removeClass('activeLi');
            }
        );
        /*选择尺寸的点击动画*/
        $('.chooseSize').find('li').eq(i).click(
            function () {
                $(this).toggleClass('activedLi').siblings().removeClass('activedLi');
                resSize = $(this).html();
                $('.inputCart').find('.size').show().find('.size_num').html(resSize);  /*显示尺码*/
            }
        )
    }

    /*数量加一*/
    var res = 1;
    $('.buyNumjia').click(
        function () {
            var num =  parseInt($('#buyNum').html());
            console.log(num);
            res = num += 1;
            $('#buyNum').html(res);
            $('.inputCart').find('.num').html(res);  /*显示数量*/
        }
    );

    /*数量减一*/
    $('.buyNumjian').click(
        function () {
            var num =  parseInt($('#buyNum').html());
            console.log(num);
            res = num -= 1; /*res为最后的购买数量*/
            if(res <= 1 ){
                res = 1;
            }
            $('#buyNum').html(res);
            $('.inputCart').find('.num').html(res);
        }
    );

    /*立即购买存入cookie并跳转*/
    $('.buyNow').click(
        function () {
            // $('.intoCart').trigger('click');
            location.href = "http://localhost/MXK/Carts/Carts.html";

            /*加入购物车存入cookie*/
            var proMoneyStr = $(".proMoney").html();
            var proMoney = parseInt(proMoneyStr.substring(1));  /*获取金额数字类型*/
            var finMoneyStr = "￥" + saleH(proMoney * res) + ".00";
            var saleNumStr =  sale(proMoney * res); /*折扣金额的字符串类型*/
            $('.motaiText').find('a').html(finMoneyStr);  /*获取商品促销后价格赋值到模态框*/

            // 获取商品的基本信息
            var goodId = $('.viewHead').attr('id');
            var goodName = $('.viewHead').find('h1').html();
            var goodSize = resSize;
            var goodColor = "黑+深灰";
            var goodSellPic = $('.sellMoney').html();
            var goodSale = saleNumStr;
            var goodPrice = finMoneyStr;
            var goodNumber = res;
            var goodSrc = 'imgs/goods_s.jpg';

            var cartStr = $.cookie('cart') ? $.cookie('cart') : "{}";
            var cartObj = JSON.parse(cartStr);
            // 判断购物车中是否已经存在了这件商品
            if(goodId in cartObj){
                cartObj[goodId].num += 1;
            } else {
                cartObj[goodId] = {
                    name : goodName,
                    size: goodSize,
                    color: goodColor,
                    sellPic:goodSellPic,
                    sale:goodSale,
                    sum: goodPrice,
                    num : goodNumber,
                    src : goodSrc,
                };
            }
            // 将购物车信息存回cookie
            $.cookie('cart', JSON.stringify(cartObj), {expires:7, path : "/"});
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
        location.href = "http://localhost/MXK/index.html";
    });

    /*模态框*/
    $('.motai').find('.motai_x').click( /*模态框关闭按钮*/
        function () {
            $('.motai').hide();
        }
    );
    $('.motai').find('.keepBuy').click( /*继续购物按钮*/
        function () {
            $('.motai').hide();
        }
    );

    /*加入购物车*/
    $('.intoCart').click(
        function () {
            $('.motai').show(); /*点击加入购物车显示模态框*/
            $('.motaiText').find('span').html(res);  /*获取商品数量赋值到模态框*/
            var proMoneyStr = $(".proMoney").html();
            var proMoney = parseInt(proMoneyStr.substring(1));  /*获取金额数字类型*/
            var finMoneyStr = "￥" + saleH(proMoney * res) + ".00";
            var saleNumStr =  sale(proMoney * res); /*折扣金额的字符串类型*/
            $('.motaiText').find('a').html(finMoneyStr);  /*获取商品促销后价格赋值到模态框*/

            // 获取商品的基本信息
            var goodId = $('.viewHead').attr('id');
            var goodName = $('.viewHead').find('h1').html();
            var goodSize = resSize;
            var goodColor = "黑+深灰";
            var goodSellPic = $('.sellMoney').html();
            var goodSale = saleNumStr;
            var goodPrice = finMoneyStr;
            var goodNumber = res;
            var goodSrc = 'imgs/goods_s.jpg';

            // 首先获取购物车原有的商品信息'cart'
            /* "{
             goods1:{
                 name:"耐克Nike2017新款男鞋休闲鞋运动鞋Air Max运动休闲718895-008",
                 size:42,
                 color:"黑+深灰",
                 sellPic:'549.00',
                 sale:'50.00',
                 sum:"549.00 - sale",
                 number:"1",
                 src:'imgs/goods_s.jpg',
                 }
             }"*/

            var cartStr = $.cookie('cart') ? $.cookie('cart') : "{}";
            var cartObj = JSON.parse(cartStr);
            // 判断购物车中是否已经存在了这件商品
            if(goodId in cartObj){
                cartObj[goodId].num += 1;
            } else {
                cartObj[goodId] = {
                    name : goodName,
                    size: goodSize,
                    color: goodColor,
                    sellPic:goodSellPic,
                    sale:goodSale,
                    sum: goodPrice,
                    num : goodNumber,
                    src : goodSrc,
                };
            }
            // 将购物车信息存回cookie
            $.cookie('cart', JSON.stringify(cartObj), {expires:7, path : "/"});
        }
    );

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

    /*封装saleH函数获取促销后价格*/
    function saleH(i){
        var resPay;
        if( i < 299){
            resPay = i;
        }else if( i >= 299 && i < 599){
            resPay = i - 10;
        }else if ( i >= 599 && i < 999){
            resPay = i - 20;
        }else if ( i >= 999 ){
            resPay = i -50;
        }
        return resPay;
    }

    /*封装sale函数获取折扣金额*/
    function sale(i){
        var resSale;
        if( i < 299){
            resSale = 0;
        }else if( i >= 299 && i < 599){
            resSale = "-￥10.00";
        }else if ( i >= 599 && i < 999){
            resSale = "-￥20.00";
        }else if ( i >= 999 ){
            resSale = "-￥50.00";
        }
        return resSale;
    }


});


