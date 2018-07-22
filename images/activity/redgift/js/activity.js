    var fmessage='';
    var isActivity1 =false;isActivity2 =false;isActivity3 =false;
    var status =false;
    var current_url = location.href;
        function getData(){
            $.ajax({
                url: contextPath+'twoYears/index.htm',
                type:'post',
                dataType:'json',
                xhrFields: {
                    withCredentials: true
                }
            }).done(function(data){
                var data = JSON.parse(data);
                fmessage =data.message;
                if(data.firstRedNum<=0){
                    isActivity1 = true;
                    $("#redBox1").removeClass("redBox1").addClass("grayBox1");
                }
                if(data.secondRedNum<=0){
                    isActivity2 = true;
                    $("#redBox2").removeClass("redBox2").addClass("grayBox2");
                }
                if(data.thirdRedNum<=0){
                    isActivity3 = true;
                    $("#redBox3").removeClass("redBox3").addClass("grayBox3");
                }
                if(data.code != '000'){
                    status =true;
                    layer.open({
                        title: '提示',
                        content: data.message,
                        yes:function(){
                            window.location.href=contextPath;
                        }
                    });
                }
            })
        }
        getData();

var current_url =contextPath+"activity/redgift/";
   function investing() {
       sa.track('int_click',{campaignName:'周年庆限量抢红包活动',lpUrl:current_url,elementId:$("#link_invest").attr('id'),elementContent:'立即投资',elementName:'立即投资'});
           window.location.href = contextPath+"borrowInfo/";
   }
    function getredBox(type) {
       if(type==1){
           sa.track('int_click',{campaignName:'周年庆限量抢红包活动',lpUrl:current_url,elementId:$("#redBox1").attr('id'),elementContent:'领取红包',elementName:'领取红包'});
        if (isActivity1) {
            return false;
        }
       }
        if(type==2){
            sa.track('int_click',{campaignName:'周年庆限量抢红包活动',lpUrl:current_url,elementId:$("#redBox2").attr('id'),elementContent:'领取红包',elementName:'领取红包'});
            if (isActivity2) {
                return false;
            }
       }
        if(type==3){
            sa.track('int_click',{campaignName:'周年庆限量抢红包活动',lpUrl:current_url,elementId:$("#redBox3").attr('id'),elementContent:'领取红包',elementName:'领取红包'});
            if (isActivity3) {
                return false;
            }
       }
       if(status=="true"){
           layer.open({
               title: '提示',
               content: fmessage,
               yes:function(){
                   window.location.href=contextPath;
               }
           });
           return false;
       }else {
           $.ajax({
               url:contextPath+'twoYears/receiveRed.htm',
               type: 'POST',
               dataType: 'json',
               xhrFields: {
                   withCredentials: true
               },
               data:{
                   type:type
               }
           })
               .done(function (data) {
                   var data = JSON.parse(data);
                   if(data.isLogin=="N"){
                       window.location.href = contextPath+'login.htm?url='+contextPath+'activity/redgift/';
                       return;
                   }else {
                       if(data.code==="000"){
                           layer.open({
                               title: '提示',
                               content: "领取成功",
                               yes:function(){
                                   window.location.href = contextPath +'/voucher/index.htm';
                               }
                           });
                       }else if(data.message ==="该红包已领完") {
                           layer.open({
                               title: '提示',
                               content: data.message,
                               yes:function(){
                                   window.location.href = contextPath +'/activity/redgift/';
                               }
                           });
                       }else {
                           layer.open({
                               title: '提示',
                               content: data.message
                           });
                       }
                   }
               })
       }


    }