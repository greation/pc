$(document).ready(function() {
    //获取密码校验规则
    var pswRule = passwordErrorText && _pswObj[passwordErrorText];

	$("#sect_ch_mobilecode_g").click(function(){
		var checkcode = $("#checkcode").val();
		if(checkcode.length < 1 || checkcode.length != 4){
			$(".imageCode").html("请输入4位图形验证码").removeClass("hide");
			return;
		}
		var mobile=$("#mobile").val();
		var validataMobile=Helper.validata.validataMobile(mobile);
		if(validataMobile){
			$(".telephone").html(validataMobile).removeClass("hide");
			return ;
		}
		var forgetpwd_sms_token = $("#forgetpwd_sms_token").val();
		var sendBackPassValidSMS = new Helper.RemoteTrans({
			url:app_config.context_path + "sendBackPassValidSMS.htm",
			onSuccess:function(json) {
				if(json.isSuccess==true){
					var timeInterval=json.returnValue;
                    $("#sect_ch_mobilecode_g").hide();
                    $("#sect_ch_mobilecode_h").show();
					var timer=new Helper.Timmer({
						milli:1000,
						count:timeInterval,
						call:function(){
							timeInterval=timeInterval-1;
							if( timeInterval> 0) {
                                $("#sect_ch_mobilecode_h").html(timeInterval+"秒后可重发");
							}else{
                                $("#sect_ch_mobilecode_g").show();
                                $("#sect_ch_mobilecode_h").hide();
							}
						}
					});
                    $("#sect_ch_mobilecode_h").html("获取验证码");
                    $(".telephone").addClass("hide");
                    $(".mobileCode").addClass("hide");
                    $(".imageCode").addClass("hide");
                    layer.confirm('短信发送成功，请注意查收!', {
                        icon:1,
                        btn: ['关闭']
                    });
                    timer.start();
				}else{
					var msg = json.message;
					if(code == "12"){
						$(".telephone").html(msg).removeClass("hide");
					}else if(code == "11"){
						$(".imageCode").html(msg).removeClass("hide");
					}else if(code == "13" || msg==="验证码错误"){
						$(".mobileCode").html(msg).removeClass("hide");
					}else{
						$(".telephone").addClass("hide");
						$(".mobileCode").addClass("hide");
						$(".imageCode").addClass("hide");
						Helper.message(msg);
					}
					backPasswordCheckCode('checkcode_img');
				}
			},
			onError:function(json){
				var msg = json.message;
				var code = json.code;
				if(code == "12"){
                    $(".telephone").html(msg).removeClass("hide");
				}else if(code == "14"){
                    $(".password").html(msg).removeClass("hide");
				}else if(code == "11"){
                    $(".imageCode").html(msg).removeClass("hide");
				}else if(code == "13" || msg==="验证码错误"){
                    $(".mobileCode").html(msg).removeClass("hide");
				}else{
                    $(".telephone").addClass("hide");
                    $(".mobileCode").addClass("hide");
                    $(".imageCode").addClass("hide");
                    Helper.message(msg);
				}
				backPasswordCheckCode('checkcode_img');
			}
		});
        sendBackPassValidSMS.params = {mobile:mobile,forgetpwd_sms_token:forgetpwd_sms_token,checkcode:checkcode};
        sendBackPassValidSMS.send();
	});

	$("#findPasswordOne").click(function(){
        var mobile=$("#mobile").val();
        var mobileCode = $("#mobile-code").val();
        var checkCode = $("#checkcode").val();
        var validateMobile=Helper.validata.validataMobile(mobile);
        if(validateMobile){
            $(".telephone").html(validateMobile).removeClass("hide");
            return ;
		}
		if(!checkCode){
            $(".imageCode").html("图片验证码为空").removeClass("hide");
            return ;
		}
		if(checkCode.length != 4){
            $(".imageCode").html("请输入4位图形验证码").removeClass("hide");
            return ;
		}
		if(!mobileCode){
            $(".mobileCode").html("验证码未输入").removeClass("hide");
            return ;
		}
		if(mobileCode.length != 4){
            $(".mobileCode").html("请输入4位短信验证码").removeClass("hide");
            return ;
		}

        var nextStep = new Helper.RemoteTrans({
            url:app_config.context_path + "validate.htm",
            onSuccess:function(json) {
                if(json.isSuccess) {
                    $(".telephone").addClass("hide");
                    $(".imageCode").addClass("hide");
                    $(".mobileCode").addClass("hide");
                    $("#stepOne").hide();
                    $("#stepTwo").show();
                }else{
                    var msg = json.message;
                    var code = json.code;
                    if(code == "12"){
                        $(".telephone").html(msg).removeClass("hide");
                    }else if(code == "11"){
                        $(".imageCode").html(msg).removeClass("hide");
                    }else if(code == "13" || msg==="验证码错误"){
                        $(".mobileCode").html(msg).removeClass("hide");
                    }else{
                        $(".telephone").addClass("hide");
                        $(".mobileCode").addClass("hide");
                        $(".imageCode").addClass("hide");
                        layer.confirm(msg, {
                            icon:1,
                            btn: ['关闭']
                        });
                    }
                    backPasswordCheckCode('checkcode_img');
				}
            },
            onError:function(json){
                var msg = json.message;
                var code = json.code;
                if(code == "12"){
                    $(".telephone").html(msg).removeClass("hide");
                }else if(code == "11"){
                    $(".imageCode").html(msg).removeClass("hide");
                }else if(code == "13" || msg==="验证码错误"){
                    $(".mobileCode").html(msg).removeClass("hide");
                }else{
                    $(".telephone").addClass("hide");
                    $(".mobileCode").addClass("hide");
                    $(".imageCode").addClass("hide");
                    layer.confirm(msg, {
                        icon:1,
                        btn: ['关闭']
                    });
                }
                backPasswordCheckCode('checkcode_img');
            }
        });

        nextStep.params = {mobile:mobile,mobileCode:mobileCode,checkCode:checkCode};
        nextStep.send();

    })
	/**
	 * 提交
	 */
	$("#subfrm").click(function(){
		var checkCode = $("#checkcode").val();
		var mobile=$("#mobile").val();
		var mobileCode = $("#mobile-code").val();
		var password = $("#password").val();
		var password_re = $("#password-re").val();
		
		
		if(checkCode.length != 4){
			$("#err_checkcode").html("请输入4位图形验证码");
			$("#error-inline").removeClass("hide");
			return;
		}

		var validateMobile=Helper.validata.validataMobile(mobile);

		if(validateMobile){
            $(".telephone").html(validateMobile).removeClass("hide");
			return ;
		}
		
		if(!pswRule.test(password)){
            $(".err_password").html(pswRule.text).removeClass("hide");
            return;
		}
		if(password != password_re){
			$(".err_password_re").html("两次密码不一致").removeClass("hide");
			return ;
		}
		if(mobileCode.length !=4){
			$(".mobileCode").html("请输入4位手机验证码").removeClass("hide");
			return ;
		}
		var backPassword = new Helper.RemoteTrans({
			url:app_config.context_path + "/getBackPassword.htm",
			onSuccess:function(json) {
				window.location.href = app_config.context_path + "successOrFail.htm";
			},
			onError:function(json){
				window.location.href = app_config.context_path + "successOrFail.htm?message="+json.message;
			}
		});
        backPassword.params = {mobile:mobile,mobileCode:mobileCode,password:password,password_re:password_re,checkCode:checkCode};
        backPassword.send();
	});
	
	$("#checkcode").blur(function(){
		var checkcode = $("#checkcode").val();
		if(checkcode.length < 1 || checkcode.length != 4){
			$(".imageCode").html("请输入4位图形验证码").removeClass("hide");
		}else{
			$(".imageCode").addClass("hide");
		}
	});
	
	$("#mobile").blur(function(){
		var mobile = $("#mobile").val();
		var validateMobile = Helper.validata.validataMobile(mobile);
		if(validateMobile){
			$(".telephone").html(validateMobile).removeClass("hide");
		}else{
			$(".telephone").addClass("hide");
		}
	});
	
	$("#mobile-code").blur(function(){
		var mobileCode = $("#mobile-code").val();
		if(mobileCode.length == 4){
            $(".mobileCode").addClass("hide");
		}else{
            $(".mobileCode").html("请输入4位手机验证码").removeClass("hide");
		}
	});

	$("#password-re").attr("placeholder",pswRule.text);
	$("#password").attr("placeholder",pswRule.text).blur(function(){
		var password = $("#password").val();
		var password_re = $("#password-re").val();
		
		if(pswRule && !pswRule.test(password)){
			$(".err_password").html(pswRule.text).removeClass("hide");
			return;
		}else{
			$(".err_password").addClass("hide");
		}
		
		
		if(password_re && password!=password_re){
			$(".err_password_re").html("两次密码不一致").removeClass("hide");
            $(".err_password_re").removeClass("hide");
		}else{
            $(".err_password").addClass("hide");
            $(".err_password_re").addClass("hide");
		}
	});
	
	$("#password-re").blur(function(){
		var password = $("#password").val();
		var password_re = $("#password-re").val();
        if(password != password_re){
			$(".err_password_re").html("两次密码不一致").removeClass("hide");;
		}else {
			$(".err_password_re").addClass("hide");
		}
	});
});




var backPasswordCheckCode = function(id) {
	var newUrl = "";
	var oldUrl = $("#" + id).attr("src");
	if (oldUrl.indexOf("?") != -1) {
		newUrl = oldUrl.substring(0, oldUrl.indexOf("?")) + "?refresh="
				+ Math.random() * 100;
	} else {
		newUrl = oldUrl + "?refresh=" + Math.random() * 100;
	}
	$("img[id$=" + id + "]").attr("src", newUrl);
};