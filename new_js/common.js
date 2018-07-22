$(function () {
    //固定header
    $(window).scroll(function () {
        var l = $(window).scrollLeft();
        if ($(window).scrollTop() > 40) {
            $(".yqzb-header-container").addClass('fixed');
            $(".yqzb-header-container-content").addClass('hoverNavHead isHaselseNav');
            $(".fast_list").css({"margin-top": "-24px"});
            $(".fast_list li i ").css({"top":"-57px"});
        } else {
            $(".fast_list").css({"margin-top": "0"});
            $(".yqzb-header-container").removeClass('fixed');
            $(".yqzb-header-container-content").removeClass('hoverNavHead isHaselseNav');
            $(".fast_list li i ").css({"top":"-30px"});
        }

        //是否显示返回顶部
        if ($(window).scrollTop() >= 300) {
            $("#back").show();
        } else {
            $("#back").hide();
        }
    });
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
    /*二维码 */
    $(".yqzb-erweima").mouseover(function () {
        $(".erweima-box").show();
    });
    $(".yqzb-erweima").mouseout(function () {
        $(".erweima-box").hide();
    });

    //go top
    $(".toTop").click(function (event) {
        $('body,html').animate({scrollTop: 0}, 300);
    });

    //公告轮播
    $(".news li").eq(0).clone().appendTo(".news");
    var xl = $(".news li").length - 1, xh = $(".news li").height(), m = 0, $news = $(".news");
    var timer = setInterval(timerHandle, 3000);

    function timerHandle() {
        m++;
        if (m > xl) {
            m = 1;
            $news.css("top", 0);
        }
        $news.stop().animate({"top": -m * xh}, 1000);
    }

    $(".bulletin_l").hover(function () {
        clearInterval(timer);
        timer = null;
    }, function () {
        clearInterval(timer);
        timer = setInterval(timerHandle, 3000);
    });
    //改变hover状态
    $(".cooperationlist .swiper-slide img").mouseover(function () {
        $(this).css({
            '-webkit-filter': 'grayscale(0)',
            '-moz-filter':'grayscale(0)',
            '-ms-filter':'grayscale(0)',
            '-o-filter':'grayscale(0)',
            'filter': 'grayscale(0))'
        });
    })
    $(".cooperationlist .swiper-slide img").mouseout(function () {
        $(this).css({
            '-webkit-filter': 'grayscale(100%)',
            '-moz-filter':'grayscale(100%)',
            '-ms-filter':'grayscale(100%)',
            '-o-filter':'grayscale(100%)',
            'filter': 'grayscale(100%))',
            'filter':'gray'
        });
    })
    $(".listblock").mouseover(function () {
        // $(this).find(".mark_btn").show();
        $(this).addClass("express_actity");
    })
    $(".listblock").mouseleave(function () {
        // $(this).find(".mark_btn").hide();
        $(this).removeClass("express_actity");
    })
})

