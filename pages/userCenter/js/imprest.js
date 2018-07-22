$(document).ready(function() {
	$("#imprest").click(function() {
		var url=$('#redirectUrl').val();
		if(url==null || $.trim(url)==''){
			url="";
		}else{
			url=$.trim(url);
		}
		var version=navigator.appVersion;//浏览器信息
		var money = $("#money").val().trim();
		if (money == null || money == "") {
			$("#err_charge").removeClass("hide").html("请输入充值金额");
			return;
		}
		if(!Helper.validata.isTwoFloat(money)){
            $("#err_charge").removeClass("hide").html("金额格式错误(金额必须是数字并且最多精确到分)!");
			return;
		}
		if (parseFloat(money) < 0.01) {
			$("#err_charge").removeClass("hide").html("充值金额最低0.01元");
			return;
		}

		new Helper.RemoteTrans({
			params:{money:money,bankcode:'',paychannel:'',userAgent:version,url:url},
			url : app_config.context_path + "member_operate/imprest.htm",
			isAsync : false,
			onSuccess : function(jsonData) {
				if(!jsonData.isSuccess){
					layer.confirm(jsonData.message+'!', {
						 icon:0,
						  btn: ['关闭']
						  
					});
					return;
				}
				layer.confirm('充值结果', {
					  icon:0,
					  title : "请确认充值结果",
					  area: ['580px', ''],
					  content:'<p style="font-size:18px;color:#E00000">请您在新打开的页面完成支付！</p>' +
					  		'<p>▪ 如您没有看到新打开的支付页面，请检查您的浏览器设置是否进行了拦截</p>' +
					  		'<p>▪ 请检查浏览器顶部出现的提示中选择允许本站的弹出窗口</p>' +
					  		'<p>▪ 支付完成前请不要关闭此窗口</p>' +
					  		'<p>▪ 支付完成后，请根据结果选择</p>',
					  btn: ['支付失败，请重试','支付成功'],
					  btn2: function(index, layero){
						  window.location.href = app_config.context_path + 'memberCenter/index.htm';
					  }
					},function(index, layero){
						window.location.reload();
					});
				var direc_page = window.open("","_blank");
				direc_page.document.write(jsonData.returnValue.orderFormContent);
				//window.document.write(jsonData.returnValue.orderFormContent);
			},
			onError : function(data) {
				Helper.message(data.message);
			}
		}).send();
	});
	
	$("#money").blur(function(){
		var money = $("#money").val().trim();
		var msg = "";
		if (money == null || money == "") {
			msg = "请输入充值金额";
		}else if(!Helper.validata.isTwoFloat(money)){
			msg = "金额格式错误(金额必须是数字并且最多精确到分)!";
		}else if (parseFloat(money) < 0.01) {
			msg = "充值金额最低0.01元";
		}
		if(msg.length>0){
			$("#err_charge").removeClass("hide").html(msg);
		}else{
            $("#err_charge").addClass('hide');
		}
	});
});