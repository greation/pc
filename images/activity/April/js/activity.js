   var statusA =false;
    var fmessage='';
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
        $.ajax({
            url: contextPath+'activityTurntable/activity.htm',
            type:'post',
            dataType:'json',
            xhrFields: {
                withCredentials: true
            },
            data:{
                activityTypeStr: 'APRIL_MAKE_ACTIVITY',
                useCommonTemplate:'NO'
            }
        }).done(function(data){
            var data = JSON.parse(data);
            fmessage =data.message;
            if(data.code == '999'){
                statusA =true;
                layer.open({
                    title: '提示',
                    content: data.message,
                    yes:function(){
                        window.location.href=contextPath;
                    }
                });
            }
        })

        $('#btn-rule').bind('click', function () {
            sa.track('element_click', {
                campaignName: '4月站内活动',
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
var current_url =contextPath+"activity/april/";

   function ybL0() {
       sa.track('int_click',{campaignName:'4月站内活动',lpUrl:current_url,elementId:$("#jd0").attr('id'),elementContent:'约标解锁',elementName:'约标解锁'});
       if(statusA){
           layer.open({
               title: '提示',
               content: fmessage,
               yes:function(){
                   window.location.href=contextPath;
               }
           });
       }else {
           window.location.href = contextPath+"borrowInfo/make.htm?type=6";
       }


   }
function ybL1() {
    sa.track('int_click',{campaignName:'4月站内活动',lpUrl:current_url,elementId:$("#jd1").attr('id'),elementContent:'约标解锁',elementName:'约标解锁'});
    if(statusA){
        layer.open({
            title: '提示',
            content: fmessage,
            yes:function(){
                window.location.href=contextPath;
            }
        });
    }else {
        window.location.href = contextPath+"borrowInfo/make.htm?type=12";
    }


}
function ybL2() {
    sa.track('int_click',{campaignName:'4月站内活动',lpUrl:current_url,elementId:$("#jd2").attr('id'),elementContent:'约标解锁',elementName:'约标解锁'});
    if(statusA){
        layer.open({
            title: '提示',
            content: fmessage,
            yes:function(){
                window.location.href=contextPath;
            }
        });
    }else {
        window.location.href = contextPath+"borrowInfo/make.htm?type=7";}

}
function ybL3() {
    sa.track('int_click',{campaignName:'4月站内活动',lpUrl:current_url,elementId:$("#jd3").attr('id'),elementContent:'约标解锁',elementName:'约标解锁'});
    if(statusA){
        layer.open({
            title: '提示',
            content: fmessage,
            yes:function(){
                window.location.href=contextPath;
            }
        });
    }else {
        window.location.href = contextPath+"borrowInfo/make.htm?type=8";}

}
function ybL4() {
    sa.track('int_click',{campaignName:'4月站内活动',lpUrl:current_url,elementId:$("#jd4").attr('id'),elementContent:'约标解锁',elementName:'约标解锁'});
    if(statusA){
        layer.open({
            title: '提示',
            content: fmessage,
            yes:function(){
                window.location.href=contextPath;
            }
        });
    }else {
        window.location.href = contextPath+"borrowInfo/make.htm?type=9";}

}
function ybL5() {
    sa.track('int_click',{campaignName:'4月站内活动',lpUrl:current_url,elementId:$("#jd5").attr('id'),elementContent:'约标解锁',elementName:'约标解锁'});
    if(statusA){
        layer.open({
            title: '提示',
            content:fmessage,
            yes:function(){
                window.location.href=contextPath;
            }
        });
    }else {
        window.location.href = contextPath+"borrowInfo/make.htm?type=10";}
}
function ybL6() {
    sa.track('int_click',{campaignName:'4月站内活动',lpUrl:current_url,elementId:$("#jd6").attr('id'),elementContent:'约标解锁',elementName:'约标解锁'});
    if(statusA){
        layer.open({
            title: '提示',
            content: fmessage,
            yes:function(){
                window.location.href=contextPath;
            }
        });
    }else {
        window.location.href = contextPath+"borrowInfo/make.htm?type=11";}
}
   function investing() {
       sa.track('int_click',{campaignName:'4月站内活动',lpUrl:current_url,elementId:$("#link_invest").attr('id'),elementContent:'立即投资',elementName:'立即投资'});
           window.location.href = contextPath+"borrowInfo/";
   }
   getInitData();
    function getInitData() {
        $.ajax({
            url:contextPath+'marchStation/index.htm',
            type: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            data:{
                activityType:'APRIL_MAKE_ACTIVITY'
            }
        })
            .done(function (data) {
                var data = JSON.parse(data);
                $('.txt-gz').eq(0).html(data.rule);
                $('.user_sapling_count').text(data.treeCount);

            })

    }