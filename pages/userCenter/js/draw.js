function draw() {
	var url = window.location.href;
	var version = navigator.appVersion;// 浏览器信息
	var money = $("#money").val().trim();
	var reg = /^[1-9]\d*$/;
	if (money == null || money == "") {
		$("#err_withdraw").removeClass("hide").html("请输入提现金额");
		return;
	}
	if (isNaN(money)) {
		$("#err_withdraw").removeClass("hide").html("提现金额必须为数字");
		return;
	}
	var canDrawMoney = $("#hidden_Jcarry_totalAmount").val();
	if (parseFloat(money) > parseFloat(canDrawMoney)) {
		$("#err_withdraw").removeClass("hide").html("提现金额已超出可提现金额");
		return;
	}
	if (parseFloat(money) <= 0) {
		$("#err_withdraw").removeClass("hide").html("提现金额不能小于等于0");
		return;
	}
	if (!Helper.validata.isMoney(money)) {
		$("#err_withdraw").removeClass("hide").html("提现金额格式不对");
		return;
	}
	var hiddenJcarryTotalAmount = $("#hidden_Jcarry_totalAmount").val();
	if (parseFloat(hiddenJcarryTotalAmount) < 2) {
		$("#err_withdraw").removeClass("hide").html("余额不足2元，无法提现！");
		return;
	}
	new Helper.RemoteTrans({
		params : {
			money : money,
			userAgent : version,
			url : url
		},
		url : Helper.basePath + "/member_operate/draw.htm",
		isAsync : false,
		onSuccess : function(jsonData) {
			if (jsonData.isSuccess) {
				if (jsonData.returnObject) {
					layer.confirm('提现结果', {
						icon : 0,
						btn : [ '失败', '成功' ],
						btn2 : function(index, layero) {
							window.location.href = Helper.basePath
									+ '/memberCenter/index.htm';
						}
					}, function(index, layero) {
						window.location.reload();
					});
					var direc_page = window.open("","_blank");
					direc_page.document
							.write(jsonData.returnValue.orderFormContent);
					// window.document.write(jsonData.returnValue.orderFormContent);
				} else {
					layer.confirm(jsonData.message + '!', {
						icon : 0,
						btn : [ '关闭' ]

					});
					// window.location.href=Helper.basePath+"/memberCenter/index.htm";
					return;
				}
			} else {

				Helper.message(jsonData.message);
			}
		},
		onError : function(data) {
			$("#err_withdraw").removeClass("hide").html(data.message);
		}
	}).send();
}