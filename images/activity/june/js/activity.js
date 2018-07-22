var curItemIndex = 0;
var isEndJune=false;
var rewardArr = [{
    rewardName: '格瓦拉黄券4张（电子卡）',
    saplingNum: 3,
    rewardType:'JUNE_REWARD_01',
    isFlag:false
},
    {
        rewardName: '价值300元哈根达斯（实物卡）',
        saplingNum: 4,
        rewardType:'JUNE_REWARD_02',
        isFlag:false
    },
    {
        rewardName: '价值500元玩具反斗城礼品卡（实物卡）',
        saplingNum: 6,
        rewardType:'JUNE_REWARD_03',
        isFlag:false
    },
    {
        rewardName: '价值500元网易严选（电子卡）',
        saplingNum: 6,
        rewardType:'JUNE_REWARD_04',
        isFlag:false
    },
    {
        rewardName: '价值1000元话费充值卡（电子卡）',
        saplingNum: 12,
        rewardType:'JUNE_REWARD_05',
        isFlag:false
    },
    {
        rewardName: '价值1000元中石化充值卡 （电子卡）',
        saplingNum: 12,
        rewardType:'JUNE_REWARD_06',
        isFlag:false
    },
    {
        rewardName: '价值2000元沃尔玛礼品卡（实物卡）',
        saplingNum: 22,
        rewardType:'JUNE_REWARD_07',
        isFlag:false
    },
    {
        rewardName: '价值2000元京东E卡（电子卡）',
        saplingNum: 22,
        rewardType:'JUNE_REWARD_08',
        isFlag:false
    }
];
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
function showExchangeModal(){
    createBg();
    $('.modal-exchange-box').show();
    $('html,body').addClass('ovfHiden');
}
function showExchangeRecord(){
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
$(function () {
    var current_url = location.href;
    $('#btn-rule').bind('click', function () {
        sa.track('element_click', {
            campaignName: '6月站内活动',
            lpUrl: current_url,
            elementId: $(this).attr('id'),
            elementContent: '活动规则',
            elementName: '活动规则'
        });
    })
    $('#btn-record').bind('click', function () {
        sa.track('element_click', {
            campaignName: '6月站内活动',
            lpUrl: current_url,
            elementId: $(this).attr('id'),
            elementContent: '兑换记录',
            elementName: '兑换记录'
        });
    })
    $('.btn_exchange').bind('click', function () {
        sa.track('element_click', {
            campaignName: '6月站内活动',
            lpUrl: current_url,
            elementId: $(this).attr('id'),
            elementContent: '兑换',
            elementName: '兑换奖品'
        });
    })
    $('#btn-confirm-exchange').bind('click', function () {
        sa.track('element_click', {
            campaignName: '6月站内活动',
            lpUrl: current_url,
            elementId: $(this).attr('id'),
            elementContent: '立即兑换',
            elementName: '确认兑换奖品'
        });
    })
    $('.btn_rule_one').bind('click', function () {
        showGz(0);
    })
    $('.btn-close,.close_exchange_modal').bind('click', function () {
        hideGz();
    })
    $('.btn_exchange_record').bind('click',function(){
        if(!isLogin){
            window.location.href = contextPath+'login.htm?url='+contextPath+'activity/june/';
            return ;
        }
        showExchangeRecord();
    })
    $('.btn_reduce').bind('click',function(){
        var exchangeCount = parseInt($('.input_item_num').val());
        if(exchangeCount<=1||isNaN(exchangeCount)){
            return ;
        }
        $('.input_item_num').val(--exchangeCount);
        $('.need_sapling').text(rewardArr[curItemIndex].saplingNum*exchangeCount);
    })
    $('.btn_add').bind('click',function(){
        var exchangeCount = parseInt($('.input_item_num').val());
        if(isNaN(exchangeCount)){
            exchangeCount = 0;
        }
        if(exchangeCount>98){
            return ;
        }
        $('.input_item_num').val(++exchangeCount);
        $('.need_sapling').text(rewardArr[curItemIndex].saplingNum*exchangeCount);
    })
    $('.input_item_num').bind('keyup',function(){
        var exchangeCount = parseInt($('.input_item_num').val());
        if(isNaN(exchangeCount)||exchangeCount<1){
            $('.need_sapling').text('0');
            return ;
        }
        $('.need_sapling').text(rewardArr[curItemIndex].saplingNum*exchangeCount);
    })
    $('.btn_exchange').each(function(index){
        $(this).bind('click',function(){
            if(!isLogin){
                window.location.href = contextPath+'login.htm?url='+contextPath+'activity/june';
                return ;
            }
            curItemIndex = index;
            if(rewardArr[index].isFlag){
                $('.text_reward_name').text(rewardArr[index].rewardName);
                $('.need_sapling').text(rewardArr[index].saplingNum);
                $('.input_item_num').val(1);
                showExchangeModal();
            }
        })
    })
    $('.confirm_exchange').bind('click',function(){
        var exchangeCount = parseInt($('.input_item_num').val());
        if(isNaN(exchangeCount)||exchangeCount<1){
            $('.need_sapling').text('0');
            layer.open({
                title: '提示',
                content: '请输入有效兑换数量'
            })
            return ;
        }
        getInitData();
        if(parseInt($('.input_item_num').val())*rewardArr[curItemIndex].saplingNum>parseInt($('.user_sapling_count').text())){
            if(isEndJune){
                layer.open({
                    title: '提示',
                    content: '您的小铲子不够哦，请再接再厉！'
                })
                return ;
            }
            layer.confirm('您的小铲子不够哦，请再接再厉！', {
                btn: ['确认','立即投资'],
                btnAlign: 'c'
                ,btn2:function(){
                    window.location.href = contextPath+'borrowInfo/';
                }
            });
            return ;
        }
        $.ajax({
            url: contextPath + 'juneStation/exchange.htm',
            type: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            data:{
                count:parseInt($('.input_item_num').val()),
                activityType:'JUNE_STATION_ACTIVITY',
                rewardType:rewardArr[curItemIndex].rewardType,
            }
        })
            .done(function (data) {
                var data = JSON.parse(data);
                if(data.code === '000'){
                    layer.open({
                        title: '提示',
                        content: '恭喜您兑换成功!'
                    });
                    getInitData();
                    getRecord();
                    hideGz();
                }else {
                    layer.open({
                        title: '提示',
                        content: data.message
                    });
                }
            })
    })
})
//逻辑


getInitData();
getRecord();

function getInitData() {
    $.ajax({
        url:contextPath+'juneStation/index.htm',
        type: 'POST',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        data:{
            activityType:'JUNE_STATION_ACTIVITY'
        }
    })
        .done(function (data) {
            var data = JSON.parse(data);
            $('.txt-gz').eq(0).html(data.rule);
            $('.user_sapling_count').text(data.treeCount);
            if(data.isEnd=="YES"){
                layer.open({
                    title: '提示',
                    content: data.activityErrorMsg,
                    yes:function(){
                        window.location.href=contextPath;
                    }
                });
            }
            if(data.isEnd2=="YES"){
                isEndJune =true;
            }else {
                isEndJune =false;
            }
            if(!data.JUNE_REWARD_01){
                rewardArr[0].isFlag=false;
                $("#reward1").addClass("btn_dhg").removeClass("btn_dh");
            }else {
                rewardArr[0].isFlag=true;
                $("#reward1").addClass("btn_dh").removeClass("btn_dhg");
            }
            if(!data.JUNE_REWARD_02){
                rewardArr[1].isFlag=false;
                $("#reward2").addClass("btn_dhg").removeClass("btn_dh");
            }else {
                rewardArr[1].isFlag=true;
                $("#reward2").addClass("btn_dh").removeClass("btn_dhg");
            }
            if(!data.JUNE_REWARD_03){
                rewardArr[2].isFlag=false;
                $("#reward3").addClass("btn_dhg").removeClass("btn_dh");
            }else {
                rewardArr[2].isFlag=true;
                $("#reward3").addClass("btn_dh").removeClass("btn_dhg");
            }
            if(!data.JUNE_REWARD_04){
                rewardArr[3].isFlag=false;
                $("#reward4").addClass("btn_dhg").removeClass("btn_dh");
            }else {
                rewardArr[3].isFlag=true;
                $("#reward4").addClass("btn_dh").removeClass("btn_dhg");
            }
            if(!data.JUNE_REWARD_05){
                rewardArr[4].isFlag=false;
                $("#reward5").addClass("btn_dhg").removeClass("btn_dh");
            }else {
                rewardArr[4].isFlag=true;
                $("#reward5").addClass("btn_dh").removeClass("btn_dhg");
            }
            if(!data.JUNE_REWARD_06){
                rewardArr[5].isFlag=false;
                $("#reward6").addClass("btn_dhg").removeClass("btn_dh");
            }else {
                rewardArr[5].isFlag=true;
                $("#reward6").addClass("btn_dh").removeClass("btn_dhg");
            }
            if(!data.JUNE_REWARD_07){
                rewardArr[6].isFlag=false;
                $("#reward7").addClass("btn_dhg").removeClass("btn_dh");
            }else {
                rewardArr[6].isFlag=true;
                $("#reward7").addClass("btn_dh").removeClass("btn_dhg");
            }
            if(!data.JUNE_REWARD_08){
                rewardArr[7].isFlag=false;
                $("#reward8").addClass("btn_dhg").removeClass("btn_dh");
            }else {
                rewardArr[7].isFlag=true;
                $("#reward8").addClass("btn_dh").removeClass("btn_dhg");
            }

        })

}
function getRecord(){
    $.ajax({
        url:contextPath+'juneStation/getRecordList.htm',
        type: 'POST',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        data:{
            activityType:'JUNE_STATION_ACTIVITY'
        }
    })
        .done(function (data) {
            var data = JSON.parse(data);
            var html = '';
            if(data.recordList.length<1){
                $('.none_record').show();
            }else{
                $('.list_scroll').show();
            }

            if(data.code === '000'){
                for(var i=0 ;i<data.recordList.length; i++){
                    html+='<div class="record_item fs26"><span class="exchange_time c999">'+data.recordList[i].exchangeTime+'</span><span class="exchange_name">'+data.recordList[i].rewardName+'</span><span style="float: right;margin-right: 10px;">x'+data.recordList[i].exchangeCount+'</span></div>';
                }
                $('.list_scroll').html(html);
            }
        })
}