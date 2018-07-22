/**
 * 
 */
$(document).ready(function() {
    var txt = $('#j-coupon ._selected').text();
    $("._selectVal").html(txt);
	calcMoney();
		var investRemoteTrans = new Helper.RemoteTrans({
			url : app_config.context_path + "investInfo/doInvest.htm",
			isAsync : false,
			onSuccess : function(jsonData) {
				if (jsonData.code != "000") {
					showError(jsonData.code,jsonData.message);
				} else {
					if(jsonData.returnObject) {//托管模式
						layer.confirm("1,如您没有看到新打开的支付页面，请检查您的浏览器设置是否进行了拦截。</br>2,支付完成前请不要关闭窗口。</br>3,支付完成后，请根据结果选择。", 
							{
							 icon:4,
							 closeBtn: 0,
							 title:'投资结果确认',
							 btn: ['成功','失败重试'],
							 btn2: function(index, layero){//失败
								  window.location.reload() 
							  }
							},function(index, layero){//成功
								window.location.href= app_config.context_path + "borrowInfo/";
							});
						
						window.document.write(jsonData.returnValue.orderFormContent);
					} else {//非托管模式
						if(jsonData.displayMode){
							$('.order-cart-realname div span').html(jsonData.returnValue.orderFormContent);
							$('.order-cart-realname').show(200);
						} else {
							var formName = "investForm";
							var formAction = Helper.basePath+"/investInfo/subExperSuccess.htm";
							var htmlStr = "<form name='"+formName+"' action='"+formAction+"' method='post'  style='display:none'>";
							htmlStr += "<input name='code' type='hidden' value='"+jsonData.code+"' />";
							htmlStr += "<input name='desc' type='hidden' value='"+jsonData.message+"' />";
							htmlStr += "</form>";
							$("body").append(htmlStr);
							var invest = $("body").find("[name=" + formName+ "]");
							invest.submit();
							invest.remove();
						}
					}
				}
			},
			onError : function(data) {
				$("#invest_err_msg").text(data.message);
				Helper.message(data.message);
			}
		});
		//点击投资
		$("#j-confirm-buy").click(function() {
			if($("#borrowType").val() != 'EXPERIENCE'){
                var isagree = $("input[name='isagree']:checked").val();
                if (isagree == "" || isagree == null) {
                    layer.confirm("请勾选同意相关协议!", {
                        icon: 0,
                        btn: ['关闭'],
                        btn1: function (index, layero) {
                            layer.close(index);
                        }
                    });
                    return;
                }
			}
			var borrowInfoId = $.trim($("#borrowInfoId").val());
			var investMoney = $("#investMoney").val();
			var token = $("#CLIENT_TOKEN_NAME").val();
            var val = $('#j-coupon ._selected').data('val');
			if(val=='0'){
				investRemoteTrans.params = {userAgent:navigator.appVersion,borrowInfoId:borrowInfoId,investMoney:investMoney,CLIENT_TOKEN_NAME:token};
			}else{
				investRemoteTrans.params = {userAgent:navigator.appVersion,borrowInfoId:borrowInfoId,investMoney:investMoney,CLIENT_TOKEN_NAME:token,voucherId:val.split(",")[0].trim()};
			}
			investRemoteTrans.send();
		});
		//计算预期收益
		$('#j-coupon li').on('click',function(){
            var timer = setInterval(function(){
                calcMoney();
                clearInterval(timer);
            }, 100);

		});
		
});
function calcMoney(){
    var money = $("#investMoney").val();
	var borrowType=$('#borrowType').val();
	var borrowrate = parseFloat($("#borrowRate").val());
	var borrowDuration = $("#borrowDuration").val();
	var durType = $("#durType").val();
	var repaymentType=$('#repaymentType').val();
	var espectMoney = 0;
	var val = $('#j-coupon ._selected').data('val');
	if(borrowType != 'EXPERIENCE'){
		if (money == null || money == "") {
			$("#j-earnings").html('0');
			return;
		}
		if (isNaN(money)) {
			$("#j-earnings").html('0');
			return;
		}
		var re = /^[1-9]\d*$/;
		if (!re.test(money)) {
			$("#j-earnings").html('0');
	        return;
	    }
	}else{
		if(val!='0' && val.split(",")[1]>=1){
			money=val.split(",")[1]/100;
			$('#investMoney').val(money);
		}else{
			money=0;
			$('#investMoney').val(0);
		}
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
			durType:durType,
			borrowType:borrowType,
			voucherId:val.split(",")[0].trim(),
			type:"SETTLEMENT"
		},
		success:function(data){
			espectMoney=data;
		}
	});
	espectMoney=fmtFlostToStr(espectMoney);
    $('#j-earnings').html(espectMoney.toFixed(2));
}
function fmtFlostToStr(espectMoney){
	espectMoney+="";
	return parseFloat(espectMoney.indexOf('.')>0?espectMoney.substr(0,espectMoney.indexOf('.')+3):espectMoney);
}
function showError(code,message){
	if(code=='6017'){
		layer.confirm(message+'!', {
			 icon:0,
			  btn: ['注册','登录','关闭'],
			  btn2: function(index, layero){
				  window.location.href = app_config.context_path + 'login.htm';
			  }
			},function(index, layero){
				  window.location.href = app_config.context_path + '/goregister.htm';
			});
	}else if(code == '329'){
        layer.confirm(message + '!', {
            icon:0,
            btn: ['取消','立即测试'],
            btn2: function(index, layero){
                var borrowInfoId = $("#borrowInfoId").val();
                var borrowType = $("#borrowType").val();
                if(borrowType != 'EXPERIENCE'){
                    $.cookie("prevPageUrl", app_config.context_path + 'borrowInfo/' + borrowInfoId);
				}else{
                    $.cookie("prevPageUrl", app_config.context_path + 'investInfo/cart/'+borrowInfoId + '.htm?source=list');
				}

                window.location.href = app_config.context_path + 'survey/index.htm';
            }
        },function(index, layero){
            layer.close(index);
        });
    }else{
		layer.confirm(message+'!', {
			icon:0,
		  	btn: ['关闭'],
		  	btn1: function(index, layero){
			  	layer.close(index);
		  	}
		});
	}
}