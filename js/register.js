var count = 0;

//获取密码校验规则
var pswRule = passwordErrorText && _pswObj[passwordErrorText];

function showErrorTime(){
	var tt=$('#showerror').val();
	var ms=parseInt(tt.split("s")[0]);
	var mess=tt.split("s")[1];
	if(isNaN(ms)){ 
		ms = parseInt(89);
	}
	if (typeof(mess) == "undefined"){ 
		mess = "后，才能再次发送短信验证码";
	}
	$(".mobileCode").html(ms+"s"+mess);
	$(".mobileCode").removeClass('hide');
	ms-=1;
	$('#showerror').val(ms+'s'+mess);
	if(ms==-2){
		$(".mobileCode").addClass('hide');
        $("#sect_ch_mobilecode_g").show();
	}
	if(ms>-2){
        $("#sect_ch_mobilecode_g").hide();
		setTimeout("showErrorTime()",1000);//每秒执行一次
	}
};
$(document).ready(function() {
	var remoteTrans = new Helper.RemoteTrans({
		url : Helper.basePath + "/register.htm",
		onError : function(json) {
            location.href = app_config.context_path  + "registerSuccess.htm?message=" + json.message;
		},
		onSuccess : function(json) {
			// sa.login(json.returnObject);
			location.href = Helper.basePath + "registerSuccess.htm";
		}
	});
	//不显示loading
	remoteTrans.loading=false;
	//回车键
	document.onkeydown=function(event){
		var e = event || window.event || arguments.callee.caller.arguments[0];
		 if(e && e.keyCode==13){ // enter 键
			 if($("#step1").is(':hidden')){
                 $("#subfrm").click();
             }else{
			 	$("#stepOne").click();
			 }
		}
	};
	// 发送短信验证码
	$("#sect_ch_mobilecode_g").click(function() {
		count +=1;
		var mobile = $("#mobile").val();
		var token = $("#reg_sms_token").val();
		var validateMobile = Helper.validata.validataMobile(mobile);
		if (validateMobile) {
			$(".telephone").removeClass('hide').html(validateMobile);
			return;
		}
		var checkCode = $("#checkcode").val();
		if (checkCode.length < 1) {
			$(".imageCode").removeClass('hide').html("图形验证码不能为空");
			return;
		}
		var sendRegValidSMS = new Helper.RemoteTrans({
			url : app_config.context_path + "sendRegValidSMS.htm",
			onSuccess : function(json) {
				if (json.isSuccess == true) {
					var timeInterval = json.returnValue;
					$("#sect_ch_mobilecode_g").hide();
					$("#sect_ch_mobilecode_h").show();
					var timer = new Helper.Timmer({
						milli : 1000,
						count : timeInterval,
						call : function() {
							timeInterval = timeInterval - 1;
							if (timeInterval > 0) {
								$("#sect_ch_mobilecode_h").html(timeInterval+ "秒后可重发");
							} else {
								$("#sect_ch_mobilecode_g").show();
								$("#sect_ch_mobilecode_h").html('获取验证码').hide();
							}
						}
					});
					$('.mobileCode').addClass('hide');
					$(".telephone").addClass('hide');
					$('.imageCode').addClass('hide');
					layer.confirm('短信发送成功，请注意查收!', {
						 icon:1,
						  btn: ['关闭']
					});
                    timer.start();
				} else {
					var msg = json.message;
					var code = json.code;
					if (code == "11") {
						$(".telephone").html(msg).removeClass('hide');
					} else if (code == "13" || msg === "验证码错误") {
						$(".mobileCode").html(msg).removeClass('hide');
					} else if (code == "15") {
						$(".imageCode").html(msg).removeClass('hide');
					} else if (code == "16") {
						if(count<=1){
						 $('#showerror').val(msg);
								showErrorTime();
						 }
					}else if(code =="17"){
						layer.confirm(msg, {
							 icon:1,
							  btn: ['关闭']

						});
					}else {
						$('.mobileCode').addClass('hide');
						$(".telephone").addClass('hide');
						$(".imageCode").addClass('hide');
						layer.confirm(msg+'!', {
							 icon:0,
							  btn: ['关闭']
						});
					}
					registerCheckCode('checkcode_img');
				}
			},
			onError : function(json) {
				var msg = json.message;
				var code = json.code;
				if (code == "11") {
					$(".telephone").html(msg).removeClass('hide');
				} else if (code == "13" || msg === "验证码错误") {
					$(".mobileCode").html(msg).removeClass('hide');
				} else if (code == "15") {
					$(".imageCode").html(msg).removeClass('hide');
				} else if (code == "16") {
					if(count<=1){
					$('#showerror').val(msg);
						showErrorTime();
					}
				}else if(code =="17"){
					layer.confirm(msg, {
						 icon:1,
						  btn: ['关闭']
					});
				} else {
					$('.mobileCode').addClass('hide');
					$(".telephone").addClass('hide');
					$(".imageCode").addClass('hide');
					layer.confirm(msg+'!', {
						 icon:0,
						  btn: ['关闭']

					});
				}
				registerCheckCode('checkcode_img');
			}
		});
		sendRegValidSMS.params = {
			mobile : mobile,
			client_token : token,
			checkcode : checkCode
		};
		//不显示loading
		sendRegValidSMS.loading=false;
		sendRegValidSMS.send();
	});

// 点击注册
    $("#subfrm").click(function() {
		var mobile = $("#mobile").val();
		var imageCode = $("#checkcode").val();
		var mobileCode = $("#mobilecode").val();
        var validateMobile=Helper.validata.validataMobile(mobile);
        if(validateMobile){
            $(".telephone").removeClass('hide').html(validateMobile).show();
            return ;
        }

        if(!imageCode){
            $(".imageCode").removeClass('hide').html("图片验证码为空").show();
            return ;
        }
        if(imageCode.length != 4){
            $(".imageCode").removeClass('hide').html("请输入4位图形验证码").show();
            return ;
		}

        if(!mobileCode){
            $(".mobileCode").removeClass('hide').html("验证码未输入").show();
            return ;
        }
        if(mobileCode.length != 4){
            $(".mobileCode").removeClass('hide').html("请输入4位短信验证码").show();
            return ;
        }

        var nextStep = new Helper.RemoteTrans({
            url:app_config.context_path + "registerValidate.htm",
            onSuccess:function(json) {
            	if(json.isSuccess){
                    $(".telephone").addClass('hide');
                    $(".imageCode").addClass('hide');
                    $(".mobileCode").addClass('hide');

                    var password = $("#password").val();

                    if(pswRule && !pswRule.test(password)){
                        $(".password").html(pswRule.text).removeClass("hide");
                        return;
                    }else{
                        $(".password").addClass("hide");
                    }

                    if(!$('#isagree').prop('checked')){
                        $(".isagree").removeClass('hide');
                        return;
                    }
                    var mobile = $("#mobile").val();
                    var checkCode = $("#checkcode").val();
                    var recommendCode = $("#recommendCode").val();
                    if($("#recommendCode").attr("placeholder")==recommendCode){
                        recommendCode='';
                    }
                    var mobileCode = $("#mobilecode").val();
                    var pid=$('#pid').val();
                    var userid=$('#userid').val();
                    remoteTrans.params = {
                        mobile : mobile,
                        password : password,
                        recommendCode : recommendCode,
                        mobileCode : mobileCode,
                        checkCode : checkCode,
                        pid:pid,
                        userid:userid
                    };
                    remoteTrans.send();
				}else{
                    var msg = json.message;
                    var code = json.code;
                    if(code == "12"){
                        $(".telephone").removeClass('hide').html(msg).show();
                    }else if(code == "11"){
                        $(".imageCode").removeClass('hide').html(msg).show();
                    }else if(code == "13" || msg==="验证码错误"){
                        $(".mobileCode").removeClass('hide').html(msg).show();
                    }else{
                        layer.confirm(msg, {
                            icon:1,
                            btn: ['关闭']
                        });

                    }
                    registerCheckCode('checkcode_img');
				}
            },
            onError:function(json){
                var msg = json.message;
                var code = json.code;
                if(code == "12"){
                    $(".telephone").removeClass('hide').html(msg).show();
                }else if(code == "11"){
                    $(".imageCode").removeClass('hide').html(msg).show();
                }else if(code == "13" || msg==="验证码错误"){
                    $(".mobileCode").removeClass('hide').html(msg).show();
                }else{
                    $(".telephone").addClass('hide');
                    $(".mobileCode").addClass('hide');
                    $(".imageCode").addClass('hide');
                    Helper.message(msg);
                }
                registerCheckCode('checkcode_img');
            }
        });

        nextStep.params = {mobile:mobile,mobileCode:mobileCode,imageCode:imageCode};
        nextStep.send();
	});

	$("#mobile").blur(function() {
		var mobile = $("#mobile").val();
		var validateMobile = Helper.validata.validataMobile(mobile);
		if (validateMobile) {
			$(".telephone").html(validateMobile).removeClass('hide');
			return;
		} else {
            $(".telephone").addClass('hide');
		}

		//校验手机号码是否已经存在
        var checkRegisterMobile = new Helper.RemoteTrans({
            url : app_config.context_path + "checkRegisterMobile.htm",
            onSuccess : function(json) {
                if (json.isSuccess == true) {
                    $(".telephone").addClass('hide');
                } else {
                    $(".telephone").html(json.message).removeClass('hide');
                }
            },
            onError : function(json) {
                $(".telephone").html(json.message).removeClass('hide');
            }
        });
        checkRegisterMobile.params = {
            mobile : mobile
        };
        //不显示loading
        checkRegisterMobile.loading=false;
        checkRegisterMobile.send();
	});

	//获取密码校验规则
    var pswRule = passwordErrorText && _pswObj[passwordErrorText];
	$("#password").attr("placeholder",pswRule.text).blur(function() {
		var password = $("#password").val();
		
		if(pswRule && !pswRule.test(password)){
			$(".password").html(pswRule.text).removeClass("hide");
			return;
		}else {
            $(".password").addClass('hide');
		}
	});

	$("#recommendCode").blur(function() {
		var recommendCode = $("#recommendCode").val();
		if (recommendCode) {
			if(recommendCode.length == 11 || recommendCode.length == 6){
				$(".recommendCode").addClass('hide');
			} else {
				$(".recommendCode").html("邀请码格式错误").show();
			}
		}else{
			$(".recommendCode").addClass('hide');
		}
	});
	$("#checkcode").blur(function() {
		var checkCode = $("#checkcode").val();
		if (checkCode.length != 4) {
			$(".imageCode").removeClass('hide').html("请输入4位图形验证码").show();
		} else {
			$(".imageCode").addClass('hide');
		}
	});
	$("#mobilecode").blur(function() {
		var mobileCode = $("#mobilecode").val();
		if (mobileCode.length != 4) {
			$(".mobileCode").removeClass('hide').html("请输入4位手机验证码").show();
		} else {
            $(".mobileCode").addClass('hide');
		}
	});
});

var registerCheckCode = function(id) {
	var newUrl = "";
	var oldUrl = $("#" + id).attr("src");
	if (oldUrl.indexOf("?") != -1) {
		newUrl = oldUrl.substring(0, oldUrl.indexOf("?")) + "?refresh=" + Math.random() * 100;
	} else {
		newUrl = oldUrl + "?refresh=" + Math.random() * 100;
	}
	$("img[id$=" + id + "]").attr("src", newUrl);
};
