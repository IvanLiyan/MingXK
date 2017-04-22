/*
 * Created by Ivan on 2017/1/15.
 */

$(function(){
    $('.continue').click( /*点击继续购物跳转首页*/
        function () {
            window.location.href = "http://localhost/MXK/index.html";
        }
    );
    function loadCart() {
        // 获取cookie中的商品信息
        var cartStr = $.cookie('cart');
        // 判断购物车是否为空
        if (cartStr) {
            cartStr = cartStr ? cartStr : "{}";
            var cartObj = JSON.parse(cartStr);
            // 循环购物车中的每一件商品, 将信息取出放到页面上
            for(var id in cartObj){
                // 获取具体商品的信息对象
                var good = cartObj[id];
                var html =
                    '<ul class="viewHead" id="NIKE2017">' +
                        '<li class="goodSrc"><img src=" ' + good.src + ' " /></li>' +
                        '<li class="goodName">' + good.name + '<span>( 尺码:' + good.size + ',颜色:' + good.color + ')</span></li>' +
                        '<li>0</li>' +
                        '<li class="goodSellPic">'+ good.sellPic +'</li>' +
                        '<li>' +
                            '<div class="sub"></div>' +
                            '<div class="number">' + good.num + '</div>' +
                            '<div class="plus"></div>' +
                        '</li>' +
                        '<li class="goodSale">' + good.sale + '</li>' +
                        '<li class="goodSum">' + good.sum  + '</li>' +
                        '<li><p class="collect">收藏</p><p class="delete">删除</p></li>' +
                    '</ul>';
                $(html).appendTo('.information');

                var minPicStr = $('.goodSum').html();
                var minPic = parseInt(minPicStr.substring(1)); /*获取页面小计金额数字类型*/
                var fulSubPic = parseInt(sale(minPic).substring(2)); /*获取满减金额数字类型*/
                var finPic = minPic - fulSubPic; /*获取最后总金额数字类型*/
                $('.sum_money').find('span').html('￥'+ finPic +'.00');  /*修改页面：总金额*/
                var numb = $('.number').html();
                $('.sum_num').find('span').html(numb); /*修改页面：商品数量*/
            }

            /*数量加一*/
            $('.plus').click(
                function () {
                    var addRes = parseInt($('.number').html()) + 1;/*在页面上加1*/
                    $('.number').html(addRes); /*修改页面：数量*/
                    $('.sum_num').find('span').html(addRes); /*修改页面：商品数量*/

                    var goodId = $('.viewHead').attr('id');  /*从cookie中实际也要加1*/
                    var cartStr = $.cookie('cart') ? $.cookie('cart') : "{}";
                    var cartObj = JSON.parse(cartStr);

                    var sellPicStr = cartObj[goodId].sellPic;
                    var sellPic = parseInt(sellPicStr.substring(1)); /*获取销售价格数字类型*/
                    var salePic = addRes * 50; /*获取促销优惠金额数字类型*/
                    var minPic = sellPic * addRes - salePic; /*获取小计价格数字类型*/
                    var fulSubPic = parseInt(sale(minPic).substring(2)); /*获取满减金额数字类型*/
                    var finPic = minPic - fulSubPic; /*获取最后总金额数字类型*/

                    $('.goodSale').html('-￥'+ salePic +'.00');  /*修改页面：优惠金额*/
                    $('.goodSum').html('￥'+ minPic +'.00');  /*修改页面：小计金额*/
                    $('.sum_money').find('span').html('￥'+ finPic +'.00');  /*修改页面：总金额*/

                    cartObj[goodId].num = addRes; // 更新cookie商品的数量
                    cartObj[goodId].sale = '-￥'+ salePic +'.00'; /*更新cookie折扣金额*/
                    cartObj[goodId].sum = '￥'+ minPic +'.00'; /*更新cookie小计*/

                    $.cookie('cart',JSON.stringify(cartObj),{expires:7,path:'/'});

                }
            );

            /*数量减一*/
            $('.sub').click(
                function () {
                    var subRes = parseInt($('.number').html()) - 1;/*在页面上减1*/
                    if(subRes < 1){
                        subRes = 1;
                    }
                    $('.number').html(subRes); /*修改页面：数量*/
                    $('.sum_num').find('span').html(subRes); /*修改页面：商品数量*/

                    var goodId = $('.viewHead').attr('id');  /*从cookie中实际也要减1*/
                    var cartStr = $.cookie('cart') ? $.cookie('cart') : "{}";
                    var cartObj = JSON.parse(cartStr);

                    var sellPicStr = cartObj[goodId].sellPic;
                    var sellPic = parseInt(sellPicStr.substring(1)); /*获取销售价格数字类型*/
                    var salePic = subRes * 50; /*获取促销优惠金额数字类型*/
                    var minPic = sellPic * subRes - salePic; /*获取小计价格数字类型*/
                    var fulSubPic = parseInt(sale(minPic).substring(2)); /*获取满减金额数字类型*/
                    var finPic = minPic - fulSubPic; /*获取最后总金额数字类型*/

                    $('.goodSale').html('-￥'+ salePic +'.00');  /*修改页面：优惠金额*/
                    $('.goodSum').html('￥'+ minPic +'.00');  /*修改页面：小计金额*/
                    $('.sum_money').find('span').html('￥'+ finPic +'.00');  /*修改页面：总金额*/

                    cartObj[goodId].num = subRes; // 更新cookie商品的数量
                    cartObj[goodId].sale = '-￥'+ salePic +'.00';
                    cartObj[goodId].sum = '￥'+ minPic +'.00';

                    $.cookie('cart',JSON.stringify(cartObj),{expires:7,path:'/'});
                }
            );

            /*删除*/
            $('.delete').click(
                function () {
                    $(this).parents('ul').remove(); /*从页面中删除*/
                    var cartStr =  $.cookie('cart') ? $.cookie('cart') : "{}";
                    var cartObj = JSON.parse(cartStr);
                    var goodId = $('.viewHead').attr('id');
                    delete (cartObj[goodId]);
                    if($('.information').find('ul').size() == 0 ){
                        $.removeCookie('cart',{path:'/'});  /*从cookie中删除cart*/
                        $('.myCarts').hide().siblings('.emptyCarts').show(); /*页面隐藏我的购物车显示空购物车*/
                    }else{
                        $.cookie('cart', JSON.stringify(cartObj), {expires:7, path:'/'});
                    }
                }
            )

        }else{
            $('.myCarts').hide().siblings('.emptyCarts').show();
        }
    }
    loadCart();

    /*商品放大镜效果*/
    $('.goodSrc').hover(
        function (e) {
            var mouseL = e.pageX;
            var mouseT = e.pageY;
            var goodL = $('.goodSrc').offset().left;
            var goodT = $('.goodSrc').offset().top;
            var l = mouseL - goodL; /*鼠标相对于小图片的left*/
            var t = mouseT - goodT; /*鼠标相对于小图片的top*/
            $('.bigPic').stop(true).fadeToggle('normal').offset({left:mouseL,top:mouseT});
        },function () {
            $('.bigPic').stop(true).fadeToggle('normal');
        }
    );

    $('.goodName').click(
        function () {
            location.href = "http://localhost/MXK/GoodsDetail/GoodsDetail.html";
        }
    )

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

    /*封装sale函数获取满减金额*/
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
