var statusA = false;//活动状态
var statusB = false;//活动状态
var fmessage = '';
var fmessageB = '';
var imgIndex = "";
var wishVal = "";
var wishValue = "";
var bestWish = window.localStorage.getItem(wishValue);
var smzt = false;
var czzt = false;
var tzzt = false;
var fxzt = false;
var smlq = false;
var czlq = false;
var tzlq = false;
var fxlq = false;
var dkly = false;
var zjdk = false;

function createBg() {
    $('body').append(
        '<div id="modal-bg" style="position:fixed;width:100%;height:100%;left:0;top:0;background:#000;opacity:0.6;z-index:8"></div>'
    );
}

function showGz(num) {
    createBg();
    $('.modal-rule').show();
    $('.modal-rule .txt-gz').eq(num).show();
    $('html,body').addClass('ovfHiden');
}

function showExchangeModal() {
    createBg();
    $('.modal-exchange-box').show();
    $('html,body').addClass('ovfHiden');
}

function showExchangeRecord() {
    getRecord();
    createBg();
    $('.modal-exchange-record').show();
    $('html,body').addClass('ovfHiden');
}

function hideGz() {
    $('.modal-rule,.modal-exchange-box,.modal-exchange-record').hide();
    $('.modal-rule .txt-gz').hide();
    $('#modal-bg').remove();
    $('html,body').removeClass('ovfHiden');
}
$('.xyd-btn').bind('click', function () {
    sa.track('int_click', {
        campaignName: '2周年庆活动',
        lpUrl: current_url,
        elementId: $("#xyd-btn").attr('id'),
        elementContent: '许愿单',
        elementName: '许愿单'
    });

        if (!isLogin) {
            window.location.href = contextPath + 'login.htm?url=' + contextPath + 'activity/anniversary/';
            return;
        } else {
            showExchangeRecord();
        }


})
var current_url = contextPath + "activity/anniversary/";
$('#goGiftLeft').bind('click', function () {
    sa.track('int_click', {
        campaignName: '2周年庆活动',
        lpUrl: current_url,
        elementId: $("#goGiftLeft").attr('id'),
        elementContent: '积分翻倍积分兑好礼',
        elementName: '积分翻倍积分兑好礼'
    });
        window.location.href = "http://www.mylinkbuy.com/index.php/Home/Goods/goodsInfo/id/3817.html";
})
$('#goGiftRight').bind('click', function () {
    sa.track('int_click', {
        campaignName: '2周年庆活动',
        lpUrl: current_url,
        elementId: $("#goGiftRight").attr('id'),
        elementContent: '积分翻倍积分兑好礼',
        elementName: '积分翻倍积分兑好礼'
    });
        window.location.href = "http://www.mylinkbuy.com/Home/Goods/goodsInfo/id/3670.html";
})
$('#gomylinkbuyLeft').bind('click', function () {
    sa.track('int_click', {
        campaignName: '2周年庆活动',
        lpUrl: current_url,
        elementId: $("#gomylinkbuyLeft").attr('id'),
        elementContent: '打卡积分兑好礼',
        elementName: '打卡积分兑好礼'
    });
        window.location.href = "http://www.mylinkbuy.com/index.php/Home/Goods/goodsInfo/id/3816.html";
})
$('#gomylinkbuyRight').bind('click', function () {
    sa.track('int_click', {
        campaignName: '2周年庆活动',
        lpUrl: current_url,
        elementId: $("#gomylinkbuyRight").attr('id'),
        elementContent: '打卡积分兑好礼',
        elementName: '打卡积分兑好礼'
    });
    window.location.href = "http://www.mylinkbuy.com/index.php/Home/Goods/goodsInfo/id/3812.html";
})
//心愿
$('#wishbtn').bind('click', function () {
    sa.track('int_click', {
        campaignName: '2周年庆活动',
        lpUrl: current_url,
        elementId: $("#wishbtn").attr('id'),
        elementContent: '提交',
        elementName: '提交'
    });
        wishVal = $(".wishInput").val();
        if (!isLogin) {
            window.localStorage.setItem("wishValue", wishVal);
            window.location.href = contextPath + 'login.htm?url=' + contextPath + 'activity/anniversary/';
            return;
        } else {
            if (wishVal == "" || wishVal == "undefined" || wishVal == "null") {
                layer.open({
                    title: '提示',
                    content: "请输入您的心愿"
                });
            } else {
                //    提交心愿表单
                var wishcontent = $("#wishInput").val();
                if (bestWish) {
                    wishcontent = bestWish;
                }
                $.ajax({
                    url: contextPath + '2years/wish/wish.htm',
                    type: 'POST',
                    dataType: 'json',
                    xhrFields: {
                        withCredentials: true
                    },
                    data: {
                        content: wishcontent
                    }
                }).done(function (data) {
                    var data = JSON.parse(data);
                    layer.open({
                        title: '提交成功',
                        content: '您的心愿已收集~'
                    });
                    window.localStorage.setItem("wishValue", "");
                    $(".wishInput").val(wishValue);
                    return;
                })
            }
        }


})

//许愿得奖品
function goWish(t) {
    sa.track('element_click', {
        campaignName: '2周年庆活动',
        lpUrl: current_url,
        elementId: $(".btn_exchange ").attr('id'),
        elementContent: '许愿',
        elementName: '许愿'
    });
    if(!isLogin){
            window.location.href = contextPath + 'login.htm?url=' + contextPath + 'activity/anniversary/';
            return;
    }else {
        $.ajax({
            url: contextPath + '2years/wish/get.htm',
            type: 'POST',
            dataType: 'json',
            async: false,
            xhrFields: {
                withCredentials: true
            },
            data: {
                'rewardLevel': t,
                'type': 0
            }
        }).done(function (data) {
            var data = JSON.parse(data);
            if (data.code == "000") {
                layer.open({
                    title: '确认许愿',
                    content: data.message,
                    yes: function () {
                        $.ajax({
                            url: contextPath + '2years/wish/get.htm',
                            type: 'POST',
                            dataType: 'json',
                            async: false,
                            xhrFields: {
                                withCredentials: true
                            },
                            data: {
                                'rewardLevel': t
                            }
                        }).done(function (data) {
                            var data = JSON.parse(data);
                            layer.open({
                                title: '提示',
                                content: "许愿成功"
                            });

                        })
                    }
                });
            } else if (data.code == "001") {
                layer.open({
                    title: '提示',
                    content: data.message
                });
            } else if (data.code == "9999") {
                layer.open({
                    title: '提示',
                    content: data.message
                });
            }else if (data.code == "999") {
                layer.open({
                    title: '提示',
                    content: data.message
                });
            }
        })
    }



}

$(function () {
    //获取心愿
    $(".wishInput").val(localStorage.wishValue);
    //弹层
    $(".goshare").hover(function () {
        $(".ewcode").css("display", "block");
    }, function () {
        $(".ewcode").css("display", "none");
    });


    var current_url = location.href;
    $('#btn-rule').bind('click', function () {
        sa.track('element_click', {
            campaignName: '2周年庆活动',
            lpUrl: current_url,
            elementId: $(this).attr('id'),
            elementContent: '活动规则',
            elementName: '活动规则'
        });
    })

    $('.btn_rule_one').bind('click', function () {
        showGz(0);
    })
    $('.btn-close,.close_exchange_modal').bind('click', function () {
        hideGz();
    })
})

function investing(type) {
    if (type == 1) {
        sa.track('int_click', {
            campaignName: '2周年庆活动',
            lpUrl: current_url,
            elementId: $("#link_invest").attr('id'),
            elementContent: '立即赚积分',
            elementName: '立即赚积分'
        });
    }
    if (type == 2) {
        sa.track('int_click', {
            campaignName: '2周年庆活动',
            lpUrl: current_url,
            elementId: $("#link_invest").attr('id'),
            elementContent: '获取许愿资格',
            elementName: '获取许愿资格'
        });
    }

    window.location.href = contextPath + "borrowInfo/";
}

getInitData();

//获取活动状态以及活动规则
function getInitData() {
    $.ajax({
        url: contextPath + '2years/wish/activity.htm',
        type: 'POST',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        }
    }).done(function (data) {
        var data = JSON.parse(data);
        $('.txt-gz').find("div").eq(0).html(data.rule1);
        $('.txt-gz').find("div").eq(1).html(data.rule2);
        $('.txt-gz').find("div").eq(2).html(data.rule3);
        if (data.code == '999') {
            statusA = true;
            fmessage = data.message;
            var imgUrl = contextPathImg + "activity/anniversary/images/c0.png";
            $("#imglist").attr("src", imgUrl);
            layer.open({
                title: '提示'
                ,closeBtn: false
                ,content: data.message,
                yes: function () {
                    window.location.href = contextPath;
                }
            });
        }

    })

}

//控制所有按钮的活动状态
function btnStatus() {
    layer.open({
        title: '提示',
        content: fmessageB,
        yes: function () {
            window.location.href = contextPath;
        }
    });
    return;
}

//记录
function getRecord() {
    $.ajax({
        url: contextPath + '2years/wish/getWishList.htm',
        type: 'POST',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        }
    })
        .done(function (data) {
            var data = JSON.parse(data);
            var html = '';
            if (data.recordList.length < 1) {
                $('.none_record').show();
            } else {
                $('.list_scroll').show();
            }
            if (data.code === '000') {
                for (var i = 0; i < data.recordList.length; i++) {
                    html += '<div class="record_item fs26"><span class="exchange_time c999">' + data.recordList[i].exchangeTime + '</span><span class="exchange_name">' + data.recordList[i].rewardName + '</span><span style="float: right;margin-right: 10px;">x' + data.recordList[i].exchangeCount + '</span></div>';
                }
                $('.list_scroll').html(html);
            }
        })
}

$("#stepbtn").click(function () {
            if (dkly) {
                sa.track('element_click', {
                    campaignName: '2周年庆活动',
                    lpUrl: current_url,
                    elementId: $(this).attr('id'),
                    elementContent: '足迹打卡领取积分',
                    elementName: '足迹打卡领取积分'
                });
                if(statusB){
                    btnStatus();
                }else {
                    if (!isLogin) {
                        window.location.href = contextPath + 'login.htm?url=' + contextPath + 'activity/anniversary/';
                        return;
                    }else {
                        submit(0);
                        $("#stepbtn").addClass("stepbtn-status4").removeClass("stepbtn-status2 stepbtn-status3 stepbtn-status1");
                    }

                }
            }
            if (zjdk) {
                sa.track('element_click', {
                    campaignName: '2周年庆活动',
                    lpUrl: current_url,
                    elementId: $(this).attr('id'),
                    elementContent: '打卡送积分足迹打卡',
                    elementName: '打卡送积分足迹打卡'
                });
                if(statusB){
                    btnStatus();
                }else {
                    if(!isLogin){
                            window.location.href = contextPath + 'login.htm?url=' + contextPath + 'activity/anniversary/';
                            return;
                    }else {
                        $.ajax({
                            url: contextPath + 'pug_punch/goCard.htm',
                            type: 'POST',
                            dataType: 'json',
                            xhrFields: {
                                withCredentials: true
                            }
                        }).done(function (data) {
                            var data = JSON.parse(data);
                            recordCard();
                            var imgUrl = contextPathImg + "activity/anniversary/images/c" + imgIndex + ".png";
                            $("#imglist").attr("src", imgUrl);
                            if (data.code == "000") {
                                layer.open({
                                    title: '提示',
                                    content: "打卡成功"
                                });
                            } else {
                                layer.open({
                                    title: '提示',
                                    content: data.message
                                })
                            }

                            return;
                        })
                    }

                }

            }



})
//打卡状态
recordCard()

function recordCard() {
    $.ajax({
        url: contextPath + 'pug_punch/index.htm',
        type: 'POST',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        }
    }).done(function (data) {
        var data = JSON.parse(data);
        if (data.code == "999") {
            zjdk=true;
            fmessageB=data.message;
            var imgUrl = contextPathImg + "activity/anniversary/images/c0.png";
        } else {
            imgIndex = data.num;
            var imgUrl = contextPathImg + "activity/anniversary/images/c" + data.num + ".png";
        }
        $("#imglist").attr("src", imgUrl);
        getStatus();
        if (data.num < 20) {
            zjdk = true;
            if (data.punchIntegral == -1) {
                $("#stepbtn").addClass("stepbtn-status3").removeClass("stepbtn-status1 stepbtn-status2 stepbtn-status4");
            }
            if (data.punchIntegral == 0) {
                $("#stepbtn").addClass("stepbtn-status2").removeClass("stepbtn-status1 stepbtn-status3 stepbtn-status4");
            }
            if (data.punchIntegral == 1) {
                $("#stepbtn").addClass("stepbtn-status3").removeClass("stepbtn-status1 stepbtn-status2 stepbtn-status4");
            }
        }
        if (data.num == 20) {
            if (data.punchIntegral == 1) {
                dkly = true;
                $("#stepbtn").addClass("stepbtn-status1").removeClass("stepbtn-status2 stepbtn-status3 stepbtn-status4");
            }
            if (data.punchIntegral == 2) {
                $("#stepbtn").addClass("stepbtn-status4").removeClass("stepbtn-status2 stepbtn-status3 stepbtn-status1");
            }
        }


    })
}

//四个按钮点击逻辑
$("#smbtn").click(function () {
        if (smzt) {
            sa.track('element_click', {
                campaignName: '2周年庆活动',
                lpUrl: current_url,
                elementId: $(this).attr('id'),
                elementContent: '去实名',
                elementName: '去实名'
            });
            if(statusB){
                btnStatus();
            }else {
                if (!isLogin) {
                    window.location.href = contextPath + 'login.htm?url=' + contextPath + 'activity/anniversary/';
                    return;
                }else {
                    window.location.href = contextPath + "step_two_register_active.htm";
                }

            }

        }
        if (smlq) {
            sa.track('element_click', {
                campaignName: '2周年庆活动',
                lpUrl: current_url,
                elementId: $(this).attr('id'),
                elementContent: '体验金券领取积分',
                elementName: '体验金券领取积分'
            });
            if(statusB){
                btnStatus();
            }else {
                if (!isLogin) {
                    window.location.href = contextPath + 'login.htm?url=' + contextPath + 'activity/anniversary/';
                    return;
                }else {
                    submit(1);
                    $("#smbtn").addClass("hasget").removeClass("goregister getsget");
                }
                }


        }
})

$("#czbtn").click(function () {
        if (czzt) {
            sa.track('element_click', {
                campaignName: '2周年庆活动',
                lpUrl: current_url,
                elementId: $(this).attr('id'),
                elementContent: '去充值',
                elementName: '去充值'
            });
            if(statusB){
                btnStatus();
            }else {
                if (!isLogin) {
                    window.location.href = contextPath + 'login.htm?url=' + contextPath + 'activity/anniversary/';
                    return;
                }else {
                    window.location.href = contextPath + "memberCenter/toImprest.htm";
                }

            }
        }
        if (czlq) {
            sa.track('element_click', {
                campaignName: '2周年庆活动',
                lpUrl: current_url,
                elementId: $(this).attr('id'),
                elementContent: '首充领取积分',
                elementName: '首充领取积分'
            });
            if(statusB){
                btnStatus();
            }else {
                if (!isLogin) {
                    window.location.href = contextPath + 'login.htm?url=' + contextPath + 'activity/anniversary/';
                    return;
                }else {
                    submit(2);
                    $("#czbtn").addClass("hasget").removeClass("hasover getschange getsget");
                }
            }
        }
})


$("#tzbtn").click(function () {
        if (tzzt) {
            sa.track('element_click', {
                campaignName: '2周年庆活动',
                lpUrl: current_url,
                elementId: $(this).attr('id'),
                elementContent: '去投资',
                elementName: '去投资'
            });
            if(statusB){
                btnStatus();
            }else {
                if (!isLogin) {
                    window.location.href = contextPath + 'login.htm?url=' + contextPath + 'activity/anniversary/';
                    return;
                }else {
                    window.location.href = contextPath + "borrowInfo/";
                }

            }

        }
        if (tzlq) {
            sa.track('element_click', {
                campaignName: '2周年庆活动',
                lpUrl: current_url,
                elementId: $(this).attr('id'),
                elementContent: '首投领取积分',
                elementName: '首投领取积分'
            });
            if(statusB){
                btnStatus();
            }else {
                if (!isLogin) {
                    window.location.href = contextPath + 'login.htm?url=' + contextPath + 'activity/anniversary/';
                    return;
                }else {
                    submit(3);
                    $("#tzbtn").addClass("hasget").removeClass("getsget goinvesting hasover");
                }
            }

        }

})


$("#fxbtn").click(function () {
        if (fxlq) {
            sa.track('element_click', {
                campaignName: '2周年庆活动',
                lpUrl: current_url,
                elementId: $(this).attr('id'),
                elementContent: '首分享领取积分',
                elementName: '首分享领取积分'
            });
            if(statusB){
                btnStatus();
            }else {
                if (!isLogin) {
                    window.location.href = contextPath + 'login.htm?url=' + contextPath + 'activity/anniversary/';
                    return;
                }else {
                    submit(4);
                    $("#fxbtn").addClass("hasget").removeClass("getsget goshare");
                }

            }

        }

})


//领取积分
function submit(type) {
    $.ajax({
        url: contextPath + 'pug_punch/receiveIntegral.htm',
        type: 'POST',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        data: {
            type: type
        }
    }).done(function (data) {
        var data = JSON.parse(data);
        if (data.code == "000") {
            layer.open({
                title: '提示',
                content: "领取成功"
            });
        }else {
            layer.open({
                title: '提示',
                content: data.message
            });
        }

    })
}

//获取任务状态
function getStatus() {
    $.ajax({
        url: contextPath + 'pug_punch/getStatus.htm',
        type: 'POST',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        }
    }).done(function (data) {
        var data = JSON.parse(data);
        if(data.code=="999"){
            statusB=true;
            smzt=true;
            czzt = true;
            tzlq = true;
          fmessageB = data.message;
        }
        if (data.realNameIntegral == "0") {
            //    未实名
            smzt = true;
            $("#smbtn").addClass("goregister").removeClass("getsget hasget");
        }
        if (data.realNameIntegral == "1") {
            //    已实名未领取积分
            smlq = true;
            $("#smbtn").addClass("getsget").removeClass("goregister hasget");
        }
        if (data.realNameIntegral == "2") {
            //    已实名已领取积分
            $("#smbtn").addClass("hasget").removeClass("goregister getsget");
        }
        if (data.chargeIntegral == "-1") {
            //    活动前已充值
            $("#czbtn").addClass("hasover").removeClass("getschange getsget hasget");
        }
        if (data.chargeIntegral == "0") {
            //    未充值
            czzt = true;
            $("#czbtn").addClass("getschange").removeClass("hasover getsget hasget");
        }
        if (data.chargeIntegral == "1") {
            //    已充值但未领取积分
            czlq = true;
            $("#czbtn").addClass("getsget").removeClass("hasover getschange hasget");
        }
        if (data.chargeIntegral == "2") {
            //    已充值已领取积分
            $("#czbtn").addClass("hasget").removeClass("hasover getschange getsget");
        }
        if (data.investIntegral == "-1") {
            //    活动前已首次投资
            $("#tzbtn").addClass("hasover").removeClass("getsget goinvesting hasget");
        }
        if (data.investIntegral == "0") {
            //    未首次投资请输入您的心愿
            tzzt = true;
            $("#tzbtn").addClass("goinvesting").removeClass("hasover getsget hasget");
        }
        if (data.investIntegral == "1") {
            //    已首次投资但未领取积分
            tzlq = true;
            $("#tzbtn").addClass("getsget").removeClass("hasover goinvesting hasget");
        }
        if (data.investIntegral == "2") {
            //    已首次投资已领取积分
            $("#tzbtn").addClass("hasget").removeClass("getsget goinvesting hasover");
        }
        if (data.shareIntegral == "0") {
            //    未首次分享
            fxzt = true;
            $("#fxbtn").addClass("goshare").removeClass("getsget hasget");
        }
        if (data.shareIntegral == "1") {
            //    已首次分享但未领积分
            fxlq = true;
            $("#fxbtn").addClass("getsget").removeClass("goshare hasget");
        }
        if (data.shareIntegral == "2") {
            //    已首次分享已领取积分
            $("#fxbtn").addClass("hasget").removeClass("getsget goshare");
        }
    })
}
