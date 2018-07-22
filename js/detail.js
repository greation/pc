$(function() {
    var len = $("#rzxq_con").find(".sml-title").length;
    if(len == 0){
        $("#borrowDetail").remove();
        $("#rzxq_con").remove();
    }
    //筹款倒计时
    var year = $("#bidStopYear").val();
    var month = $("#bidStopMonth").val();
    var day = $("#bidStopDay").val();
    var hour = $("#bidStopHour").val();
    var min = $("#bidStopMin").val();
    var sec = $("#bidStopSs").val();
    window.setInterval(function(){ShowCountDown(year,month,day,hour,min,sec,'countdown_row','isInvest');}, 1000);//筹款倒计时
    calcMoney();
    //计算预期收益
    $('#money').bind('input',function(){
        calcMoney();
    });


	var first = true,swiper,l=$(".detail-banner ul li").length,click_i;
    $(".pro-tab").on('click', 'li', function(event) {
        var i = $(this).index(),num = $(this).data('num');
        $(this).addClass('on').siblings('li').removeClass('on');
        $(".tabItemBox").eq(i).show().siblings('.tabItemBox').hide();

        if(num==1&&first){//实例化
        	first = false;
        	swiper = new Swiper('.swiper-container', {
	    	    nextButton: '.swiper-button-next',
	    	    prevButton: '.swiper-button-prev',
	    	    slidesPerView: 4,
	    	    //centeredSlides: true,
	    	    spaceBetween: 44,
                freeMode:true
	    	});
            //swiper.slideTo(1, 500, false);      
        }
    }); 

    function showImg(src){//显示大图
        $(".big-arrL").removeClass('swiper-button-disabled');
        $(".big-arrR").removeClass('swiper-button-disabled');
    	$(".imgBox img").attr('src',src);
        $(".imgLink").attr('href',src);
        $(".imgDetail").stop().fadeIn();
    }

    $(".detail-banner ul li").click(function(event) {//点击缩略图
    	var src = $(this).find('img').attr('src');
    	click_i = $(this).index();
    	swiper.slideTo(click_i, 500, false);
    	showImg(src);
    });
    $(".big-close").click(function(event) {//关闭大图
    	$(".imgDetail").fadeOut();
    });
    $(".big-arrL,.big-arrR").click(function(event) {//大图左右滑动
        //if(l<=4){
            if($(this).hasClass('big-arrR')){
                click_i+=1;
                if(click_i>=l){
                    click_i = l-1;
                }
            }else{
                click_i-=1;
                if(click_i<0){
                    click_i = 0
                }
            }
            var src = $(".detail-banner ul li").eq(click_i).find('img').attr('src');
            setTimeout(function(){
                showImg(src);
            }, 20);
    });


    var borrowType = $("#borrowType").val(),userType = $("#borrowUserType").val(),_borrowType,_userType;

    if(borrowType==='GYCAR'||borrowType==='MAKECAR'){//车满盈
        _borrowType = 'car';
    }else if(borrowType ==='GYLEASE'){
        _borrowType = 'house_lease'
    }else if(borrowType==='GYHOUSE'||borrowType==='MAKE'||borrowType==='NEWUSER'){//房月盈
        _borrowType = 'house';
    }else if(borrowType === 'GYQIXIN' || borrowType === 'MAKEQIXIN'){
        _borrowType = 'qixin';
    }

    if(userType==='ENTERPRISE'){//企业会员
        _userType = 'enterprise';
    }else{//个人
        _userType = 'personal'
    }

    var riskCtrlObj = {
        car:{
            personal:[{
                title:'足额抵押担保',
                icon:'fxkz02.png',
                content:'根据抵押物交易成本、价格浮动等市场因素进行综合价值评估，确定抵押物市场价值，从而确保抵押物价值覆盖本息金额。'
            },{
                title:'严格风控保障',
                icon:'fxkz03.png',
                content:'通过合规的大数据资源，结合专业信用评分技术，从而全面有效地掌握借款方的风控数据。利用完善的风险控制制度，实行7*24小时监控管理。'
            },{
                title:'专业技术保障',
                icon:'fxkz04.png',
                content:'可靠、高效的系统架构及先进的防火墙技术、多重密码保障技术保证用户数据安全。'
            },{
                title:'法律保障',
                icon:'fxkz05.png',
                content:'网贷行业受法律保护、宜泉平台受法律保护、宜泉资本利率在法律允许范围内、用户权益受法律保护。'
            }],
            enterprise:[{
                title:'足额抵押担保',
                icon:'fxkz02.png',
                content:'根据抵押物交易成本、价格浮动等市场因素进行综合价值评估，确定抵押物市场价值，从而确保抵押物价值覆盖本息金额。'
            },{
                title:'严格风控保障',
                icon:'fxkz03.png',
                content:'通过合规的大数据资源，结合专业信用评分技术，从而全面有效地掌握借款方的风控数据。利用完善的风险控制制度，实行7*24小时监控管理。'
            },{
                title:'专业技术保障',
                icon:'fxkz04.png',
                content:'可靠、高效的系统架构及先进的防火墙技术、多重密码保障技术保证用户数据安全。'
            },{
                title:'法律保障',
                icon:'fxkz05.png',
                content:'网贷行业受法律保护、宜泉平台受法律保护、宜泉资本利率在法律允许范围内、用户权益受法律保护。'
            }]
        },
        house:{
            personal:[{
                title:'不动产权利人',
                icon:'lease04.png',
                content:'上海本地优质不动产权利人，风险可控'
            },{
                title:'置业公司担保',
                icon:'lease01.png',
                content:'真实的房屋买卖背景，由置业公司提供担保'
            },{
                title:'律师见证',
                icon:'lease02.png',
                content:'律师全程参与交易过程并记录和见证交易过程'
            }],
            enterprise:[{
                title:'不动产担保',
                icon:'fxkz07.png',
                content:'房屋产权证质押，风险可控'
            },{
                title:'律师见证/公证处公证',
                icon:'fxkz05.png',
                content:'材料均由律师见证或公证处公证'
            },{
                title:'全权委托',
                icon:'fxkz01.png',
                content:'经公证处公证的全委书，房屋处置权交由律师'
            }]
        },
        house_lease:{//房月盈租赁
            personal:[{
                title:'稳定的租金收入',
                icon:'lease03.png',
                content:'房屋租赁会产生稳定的现金流入，风险可控'
            },{
                title:'租赁公司担保',
                icon:'lease01.png',
                content:'真实的房屋租赁背景，由房屋租赁公司提供担保'
            },{
                title:'备案登记',
                icon:'lease05.png',
                content:'房屋租赁合同备案管理，确保房屋租赁关系真实、可靠'
            }],
            enterprise:[{
                title:'',
                icon:'lease04.png',
                content:''
            },{
                title:'',
                icon:'lease01.png',
                content:''
            },{
                title:'',
                icon:'lease02.png',
                content:''
            }]
        },
        qixin:{//企信盈
            enterprise:[{
                title:'债权回购承诺',
                icon:'qxwz.png',
                content:'借款由第三方提供债权回购承诺函'
            }]
        }
    }

    var fBox = $("#fxkzBox"),fHtml='';

    if(riskCtrlObj[_borrowType] && riskCtrlObj[_borrowType][_userType]){
        riskCtrlObj[_borrowType][_userType].forEach(function(el,i){
            var a = i===0?' a':'';
            fHtml += "<div class='sml-title"+ a +"'>"
                +"<div class='bl'>"+el.title+"</div>"
                +"</div>"
                +"<div class='fxkz-con'>"
                +"<span class='icon'>"
                +"<img src='" + app_config.static_path + "images/"+ el.icon +"' />"
                +"</span>"
                +"<p>"+el.content+"</p>"
                +"</div>";
        });
    }

    fBox.html(fHtml);
});

function fmtFlostToStr(espectMoney){
    espectMoney+="";
    return parseFloat(espectMoney.indexOf('.')>0?espectMoney.substr(0,espectMoney.indexOf('.')+3):espectMoney);
}

function calcMoney(){
    var errorTipshow=$('#errorTipshow').html();
    var re = /^[1-9]\d*$/;
    var money = $("#money").val() * 1;
    var caninvestMoney=$('#caninvestMoney').val()*1;
    var incMoney=$('#incMoney').val()*1;
    var borrowType=$('#borrowType').val();
    var voucherId = $("#voucherId").val();
    var minInvestMoney = $("#minInvestMoney").val();
    if (money == null || money == "") {
        $("#yuqishouyi").html('0');
        $('#errorTip').html("请输入投资金额");
        return;
    }
    if (isNaN(money)) {
        $("#yuqishouyi").html('0');
        $('#errorTip').html("投资金额必须为数字");
        return;
    }
    if (!re.test(money)) {
        $('#errorTip').html("投资金额必须为正整数!");
        $("#yuqishouyi").html('0');
        return;
    }
    var re = /^[1-9]\d*$/;
    if (!re.test(money)) {
        $("#yuqishouyi").html('0');
        return;
    }
    var minInvest=$('#minInvest').val();
    var maxInvest=$('#maxInvest').val();
    var canusemoney=$('#canusemoney').html();
    if(canusemoney){
        canusemoney=$('#canusemoney').html();
    }else{
        canusemoney=0;
    }
    var borrowrate =$("#borrowRate").val();
    var borrowDuration =$("#borrowDuration").val();
    var durType = $("#durType").val();
    var repaymentType=$('#repaymentType').val();//还款方式
    var espectMoney = 0;
    if(minInvestMoney > money){
        voucherId = '';
    }
    $.ajax({
        url:app_config.context_path + 'incomeMoney.htm',
        dataType:'json',
        type:'POST',
        async:false,
        data:{
            money:money,
            rate:borrowrate,
            repaymentType:repaymentType,
            duration:borrowDuration,
            borrowType:borrowType,
            durType:durType,
            voucherId:voucherId,
            type:"DETAIL"
        },
        success:function(data){
            espectMoney=data;
        }
    });
    $('#errorTip').html(errorTipshow);
    espectMoney=fmtFlostToStr(espectMoney);
    $('#yuqishouyi').html(espectMoney.toFixed(2));
    if(canusemoney!=null && parseFloat(canusemoney)<money){
        $('#errorTip').html("账户余额不足，请充值");
        return;
    }
    if(money>caninvestMoney){
        $('#errorTip').html("投资金额不得大于剩余可投金额");
        return;
    }
    if(money<minInvest){
        $('#errorTip').html("投资金额不能小于最小起投金额"+parseInt(minInvest)+"元");
        return;
    }
    if(maxInvest<money){
        $('#errorTip').html("投资金额不能大于最大起投金额"+parseInt(maxInvest)+"元");
        return;
    }
    if((money-minInvest)%incMoney!=0){
        $('#errorTip').html("增量金额必须为:"+incMoney+"的整数倍");
        return;
    }
}

//提交前校验
var isOpen = true;
function checkMoney(){
    $('#errorTip').hide();
    var money = $("#money").val()*1;
    var incMoney=$('#incMoney').val()*1;
    var caninvestMoney=$('#caninvestMoney').val()*1;
    var re = /^[1-9]\d*$/;
    if (money == null || money == "") {
        $("#yuqishouyi").html('0');
        $('#errorTip').show(100);
        $('#errorTip').html("请输入投资金额");
        return false;
    }
    if (isNaN(money)) {
        $("#yuqishouyi").html('0');
        $('#errorTip').show(100);
        $('#errorTip').html("投资金额必须为数字");
        return false;
    }
    if (!re.test(money)) {
        $('#errorTip').show(100);
        $('#errorTip').html("投资金额必须为正整数!");
        $("#yuqishouyi").html('0');
        return false;
    }
    var re = /^[1-9]\d*$/;
    if (!re.test(money)) {
        $('#errorTip').show(100);
        $("#yuqishouyi").html('0');
        return false;
    }
    var minInvest=$('#minInvest').val();
    var maxInvest=$('#maxInvest').val();
    var canusemoney=$('#canusemoney').html();
    if(canusemoney){
        canusemoney=$('#canusemoney').html();
    }else{
        canusemoney=0;
    }
    if(canusemoney!=null && parseFloat(canusemoney)<money){
        $('#errorTip').show(100);
        $('#errorTip').html("账户余额不足，请充值!");
        return false;
    }
    if(money>caninvestMoney){
        $('#errorTip').show(100);
        $('#errorTip').html("投资金额不得大于剩余可投金额");
        return false;
    }
    if(money<minInvest){
        $('#errorTip').show(100);
        $('#errorTip').html("投资金额不能小于起投金额"+parseInt(minInvest)+"元");
        return false;
    }
    if(maxInvest<money){
        $('#errorTip').show(100);
        $('#errorTip').html("投资金额不能大于最大起投金额"+parseInt(maxInvest)+"元");
        return false;
    }
    if((money-minInvest)%incMoney!=0){
        $('#errorTip').show(100);
        $('#errorTip').html("增量金额必须为:"+incMoney+"的整数倍");
        return false;
    }
    var isInvest=$('#isInvest').val();
    if(isInvest!=null && $.trim(isInvest)=='N'){
        $('#errorTip').show(100);
        $('#errorTip').html("标的已结束，不能投资");
        return false;
    }

    var voucherId = $("#voucherId").val();
    var minInvestMoney = $("#minInvestMoney").val();
    var voucherType = $("#voucherType").val();
    var flag = true;
    $.ajax({
        url:app_config.context_path + 'member_operate/checkCardNumber2.htm',
        dataType:'json',
        async:false,
        Type:'POST',
        success:function(data){
            if(data.respCode=='8001'){
                $('#errorTip').show(100);
                $('#errorTip').html("您未满18周岁，不能投资！");
                flag = false;
            }else{
                var isLogin=$('#isLogin').val();
                if(!isLogin){
                    window.location = app_config.context_path + 'login.htm?url=' + app_config.context_path + 'borrowInfo/'+$('#borrowInfoId').val() + '.htm?voucherId=' + voucherId;
                    return false;
                }
                var trustAccountId=$('#trustAccountId').val();
                if(trustAccountId==null || $.trim(trustAccountId)==''){
                    window.location = app_config.context_path + 'step_two_register_active.htm';
                    return false;
                }
                $('input[name="investMoney"]').val(money);
            }
        }
    });
    var investNumber = $('#investNumber').val();
    var	invesetCount = $('#invesetCount').val();
    var borrowInfoId = $('#borrowInfoId').val();
    if(investNumber == invesetCount && isOpen){
        layer.open({
            type: 1, //page层
            area:  '300px;',
            title: '投资提示',
            btn: ['确定'],
            btnAlign: 'c',
            shift: 3, //0-6的动画形式，-1不开启
            content: '<div style="padding: 16px;font-size:14px;">操作异常！您频繁投资并未支付，今日您还有1次机会，否则账户将被冻结投资操作。</div>',
            yes: function(index, layero){
                isOpen = false;
                if(voucherType == 'CASH_VOUCHER' && money < minInvestMoney){
                    $('input[name="voucherId"]').val('');
                    layer.confirm('不符合卡券的的条件，卡券将自动消除，是否继续？', {
                        icon:0,
                        btn: ['取消','继续'],
                        btn2: function(index, layero){
                            isOpen = false;
                            $("#investBorrowForm").submit();
                        }
                    },function(index, layero){
                        layer.close(index);
                    });
                    flag = false;
                }else{
                    $('input[name="voucherId"]').val(voucherId);
                }
            },
            success: function (layero) {
                var btn = layero.find('.layui-layer-btn');
                btn.css('text-align', 'center');
            }
        });

        flag = false;
    }else if(isOpen){
        if(money < minInvestMoney){
            $('input[name="voucherId"]').val('');
            layer.confirm('不符合卡券的使用条件，卡券将自动消除，是否继续？', {
                icon:0,
                btn: ['取消','继续'],
                btn2: function(index, layero){
                    isOpen = false;
                    $("#investBorrowForm").submit();
                }
            },function(index, layero){
                layer.close(index);
            });
            flag = false;
        }else{
            $('input[name="voucherId"]').val(voucherId);
        }
    }
    return flag;
}

function moneyadd(){
    var minInvest=$('#minInvest').val()*1;//最小投资金额
    var maxInvest=$('#maxInvest').val()*1;//最大投资金额
    var incMoney=$('#incMoney').val()*1;//投资增量
    var money = $("#money").val() * 1;
    if (money == null || money == "") {
        $("#money").val(minInvest);
        return;
    }
    if (isNaN(money)) {
        $("#money").val(minInvest);
        return;
    }
    var re = /^[1-9]\d*$/;
    if (!re.test(money)) {
        $("#money").val(minInvest);
        return;
    }
    $("#money").val(money+incMoney);
    calcMoney();

}
function moneysubtract(){
    var minInvest=$('#minInvest').val()*1;//最小投资金额
    var maxInvest=$('#maxInvest').val()*1;//最大投资金额
    var incMoney=$('#incMoney').val()*1;//投资增量
    var money = $("#money").val() * 1;
    if (money == null || money == "") {
        $("#money").val(minInvest);
        return;
    }
    if (isNaN(money)) {
        $("#money").val(minInvest);
        return;
    }
    var re = /^[1-9]\d*$/;
    if (!re.test(money)) {
        $("#money").val(minInvest);
        return;
    }
    if(money-incMoney<=0){
        $('#errorTip').html("投资金额必须为正整数!");
    }else{
        $("#money").val(money-incMoney);
        calcMoney();
    }
}