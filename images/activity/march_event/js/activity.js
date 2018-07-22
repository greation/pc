var curItemIndex = 0;
var rewardArr = [{
    rewardName: '宜泉资本5000积分',
    saplingNum: 1,
    rewardType:'SCORE'
},
{
    rewardName: '宜泉资本200元现金红包',
    saplingNum: 2,
    rewardType:'CASH_VOUCHER'
},
{
    rewardName: '腾讯视频会员年卡充值卡(电子卡)',
    saplingNum: 2,
    rewardType:'TENCENT_MEMBER_RECHARGE_CARD'
},
{
    rewardName: '价值500元话费充值卡（电子卡）',
    saplingNum: 6,
    rewardType:'Bill_RECHARGEABLE_CARD_500'
},
{
    rewardName: '价值1000元哟虎商城虎爪充值卡（电子卡）',
    saplingNum: 10,
    rewardType:'TIGER_CLAW_CARD_1000'
},
{
    rewardName: '价值1000元沃尔玛礼品卡(实物卡)',
    saplingNum: 11,
    rewardType:'WAL_MART_GIFT_CARD_1000'
},
{
    rewardName: '价值2000元中石化充值卡(电子卡）',
        saplingNum: 22,
        rewardType:'SINOPEC_FILLING_CARD_2000'
    },
    {
        rewardName: '价值3000元携程礼品卡(电子卡)',
        saplingNum: 32,
        rewardType:'CTRIP_GIFT_CARD_3000'
    },
    {
        rewardName: '价值5000元京东E卡(电子卡)',
        saplingNum: 53,
        rewardType:'JD_5000_ELECTRONIC_CARD'
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
                campaignName: '3月站内迎春活动',
                lpUrl: current_url,
                elementId: $(this).attr('id'),
                elementContent: '活动规则',
                elementName: '活动规则'
            });
        })
        $('#btn-record').bind('click', function () {
            sa.track('element_click', {
                campaignName: '3月站内迎春活动',
                lpUrl: current_url,
                elementId: $(this).attr('id'),
                elementContent: '兑换记录',
                elementName: '兑换记录'
            });
        })
        $('.btn_exchange').bind('click', function () {
            sa.track('element_click', {
                campaignName: '3月站内迎春活动',
                lpUrl: current_url,
                elementId: $(this).attr('id'),
                elementContent: '兑换',
                elementName: '兑换奖品'
            });
        })
        $('#btn-confirm-exchange').bind('click', function () {
            sa.track('element_click', {
                campaignName: '3月站内迎春活动',
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
                window.location.href = contextPath+'login.htm?url='+contextPath+'activity/march_event';
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
                    window.location.href = contextPath+'login.htm?url='+contextPath+'activity/march_event';
                    return ;
                }
                curItemIndex = index;
                $('.text_reward_name').text(rewardArr[index].rewardName);
                $('.need_sapling').text(rewardArr[index].saplingNum);
                $('.input_item_num').val(1);
                showExchangeModal();
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

            if(parseInt($('.input_item_num').val())*rewardArr[curItemIndex].saplingNum>parseInt($('.user_sapling_count').text())){
                layer.confirm('您的小树苗不够哦，请再接再厉！', {
                    btn: ['关闭窗口','立即投资'],
                    btnAlign: 'c'
                    ,btn2:function(){
                     window.location.href = contextPath+'borrowInfo/';
                 }
             });
                return ;
            }
            $.ajax({
                url: contextPath + 'marchStation/exchange.htm',
                type: 'POST',
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
                data:{
                    count:parseInt($('.input_item_num').val()),
                    activityType:'MARCH_STATION_ACTIVITY',
                    rewardType:rewardArr[curItemIndex].rewardType,
                }
            })
            .done(function (data) {
                var data = JSON.parse(data);
                if(data.code === '000'){
                    layer.open({
                        title: '提示',
                        content: '恭喜您兑换成功'
                    });
                    getInitData();
                    getRecord();
                    hideGz();
                }
            })
        })
})
    //逻辑


    getInitData();
    getRecord();

    function getInitData() {
        $.ajax({
            url:contextPath+'marchStation/index.htm',
            type: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            data:{
                activityType:'MARCH_STATION_ACTIVITY'
            }
        })
        .done(function (data) {
           var data = JSON.parse(data);
           $('.txt-gz').eq(0).html(data.rule);
           $('.user_sapling_count').text(data.treeCount);

       })

    }
    function getRecord(){
        $.ajax({
            url:contextPath+'marchStation/getRecordList.htm',
            type: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            data:{
                activityType:'MARCH_STATION_ACTIVITY'
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
                    html+='<div class="record_item fs26"><span class="exchange_time c999">'+data.recordList[i].exchangeTime+'</span><span class="exchange_name">'+data.recordList[i].rewardName+'</span><span class="mar-l-5">x'+data.recordList[i].exchangeCount+'</span></div>';
                }
                $('.list_scroll').html(html);
            }
        })
    }