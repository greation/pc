$(function () {
    //格式化首页累计交易、累计理财会员
    function number_format(number, decimals, dec_point, thousands_sep, roundtag) {
        /*
        * 参数说明：
        * number：要格式化的数字
        * decimals：保留几位小数
        * dec_point：小数点符号
        * thousands_sep：千分位符号
        * roundtag:舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入
        * */
        number = (number + '').replace(/[^0-9+-Ee.]/g, '');
        roundtag = roundtag || "ceil"; //"ceil","floor","round"
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function (n, prec) {

                var k = Math.pow(10, prec);
                console.log();

                return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k;
            };
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        var re = /(-?\d+)(\d{3})/;
        while (re.test(s[0])) {
            s[0] = s[0].replace(re, "$1" + sep + "$2");
        }

        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    }

    $('#totle_money').text(number_format($("#totle_money").text(), 2, ".", ","));
    $('#totle_people').text(number_format($("#totle_people").text(), 0, ".", ","));

    //首页Banner
    $('#indexslider').slides({
        effect: 'fade, fade',
        crossfade: true,
        container: 'index-img',
        paginationClass: 'index-pagination',
        preloadImage: '',//loading
        play: 3000,
        fadeSpeed: 500,
        pause: 10,
        generatePagination: false,
        animationStart: function (current) {
            $('.index-pagination span').stop().animate({width: 0}).hide();
        },
        animationComplete: function (current) {
            var $back = $('.back');
            var leftw = (current - 1) * 0;
            $back.animate({left: leftw}, 1000, 'easeOutBack');
            $('.index-pagination li').eq(current - 1).find('span').show().animate({width: 30},3000);
        },
        slidesLoaded: function () {
            $('.index-pagination li').eq(0).find('span').animate({width: 30}, 3000);
        }
    });
    var indexPageWidth=$(".index-pagination").width();
    $(".index-pagination").css({"width":indexPageWidth,"margin-left":-indexPageWidth/2});
})
