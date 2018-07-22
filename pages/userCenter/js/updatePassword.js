$(document).ready(function() {
    //获取密码校验规则
    var pswRule = passwordErrorText && _pswObj[passwordErrorText];
    $("#err_new_password").css('width','100%');

	var remoteTrans = new Helper.RemoteTrans({
		url:Helper.basePath+"/memberCenter/updatePassword.htm",
		onError:function(json){
			Helper.message(json.message);
		},
		onSuccess:function(json) {
			if(json.code=="0000"){
				location.href=app_config.context_path +"memberCenter/updatePasswordSuccess.htm";
			}else{
				Helper.message("系统繁忙，请稍后重试");
			}
		}
	});
	//回车键
	document.onkeydown=function(event){
		var e = event || window.event || arguments.callee.caller.arguments[0];
		 if(e && e.keyCode==13){ // enter 键
			 $("#settings-submit").click();
		}
	}; 
	//修改密码
	$("#settings-submit").click(function(){
		var old_password=$("#old_password").val();
		var password=$("#new_password").val();
		var re_new_password=$("#re_new_password").val();
		if (old_password === "") {
			$("#err_old_password").removeClass("hide").html("请输入原密码");
			return ;
		}
        if(pswRule && !pswRule.test(password)){
            $("#err_new_password").html(pswRule.text).removeClass("hide");
            return;
        }else{
            $("#err_new_password").addClass("hide");
        }
		if(password != re_new_password){
			$("#err_re_new_password").removeClass("hide").html("密码不一致");
			return;
		}else{
            $("#err_re_new_password").addClass("hide");
		}
		if (old_password === password) {
			$("#err_new_password").removeClass("hide").html("新密码与旧密码不能一致").show();
			return ;
		}
		remoteTrans.params = {oldPassword:old_password,password:password,re_new_password:re_new_password};
		remoteTrans.send();
	});
	
	$("#old_password").blur(function(){
		var old_password=$("#old_password").val();
		if (old_password === "") {
			$("#err_old_password").removeClass("hide").html("请输入原密码");
		}else{
			$.ajax({
				url:app_config.context_path+'/memberCenter/checkOldPwd.htm',
				dataType:'json',
				data:{oldpwd:old_password},
				type:'post',
				success:function(data){
					var code=data.code;
					var message=data.message;
					if(code=='9999' || code=='6008'){//未登录
						$("#err_old_password").removeClass("hide").html(message).show();
					}else{
                        $("#err_old_password").hide();
					}
				}
			});
			
		}
	});
	

	$("#new_password").attr("placeholder",pswRule.text).blur(function(){
		var password=$("#new_password").val();
		if(pswRule && !pswRule.test(password)){
			$("#err_new_password").html(pswRule.text).removeClass("hide");
			return;
		}else{
			$("#err_new_password").addClass('hide');
		}
	});
	
	$("#re_new_password").blur(function(){
		var password=$("#new_password").val();
		var re_new_password=$("#re_new_password").val();
		if(!re_new_password){
            $("#err_re_new_password").removeClass("hide").html("确认新密码不能为空");
            return;
		}
		if(password!=re_new_password){
            $("#err_re_new_password").removeClass("hide").html("确认新密码与新密码不一致");
		}else{
            $("#err_re_new_password").addClass('hide');
		}
	});
});