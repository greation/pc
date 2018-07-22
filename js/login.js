$(document).ready(function() {
	var code ;
    function createCode(){
        code = new Array();
        var codeLength = 4;
        var checkCode = document.getElementById("checkCode");
        checkCode.value = "";

        var selectChar = new Array(2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');

        for(var i=0;i<codeLength;i++) {
            var charIndex = Math.floor(Math.random()*32);
            code +=selectChar[charIndex];
        }
        if(code.length != codeLength){
            createCode();
        }
        checkCode.value = code;
    }
    createCode();
    $("#checkCode").click(function(){
    	createCode()
    })
    
    function validate () {
    	var inputCode = $("#codeimgdl").val().toUpperCase();
        if(inputCode.length <=0) {
            $(".codeimgdl").text("请输入验证码").removeClass('hide');
            return false;
        }
        else if(inputCode != code ){
            $(".codeimgdl").text("验证码有误").removeClass('hide');
            createCode();
            return false;
        }
        else {
            $(".codeimgdl").addClass('hide');
            return true;
        }
    }
	var remoteTrans = new Helper.RemoteTrans({
		loading:false,
		url:Helper.basePath+"/checkLogin.htm",
		onError:function(json){
			$("#err_info").html(json.message).removeClass("hide").show();
		},
		onSuccess:function(json) {
			sa.login(json.returnObject);
			if(json.message) {
				location.href = json.message;
			}else {
				location.href = app_config.context_path;
			}
		}
	});
	
	$(".newloginbtn").click(function(){
		var username = $("#username").val();
		var password = $("#password").val();
		if (!username) {
			$(".username").html("请输入手机号码").show();
			$("#username").focus();
			return false;
		}
		if (!password) {
			$(".password").html("请输入密码").show();
			$("#password").focus();
			return false;
		}
		if(validate()){
			remoteTrans.params = {username:$.trim(username),password:password};
			var url = Helper.paramsHtml("url");
			if(url) {
				remoteTrans.addParameters("url",url);
			}
			remoteTrans.send();
		}
	
	});


    $("#username").blur(function(){
        var username = $("#username").val();
        var validateMobile=Helper.validata.validataMobile(username);
        if(validateMobile){
            $(".username").html(validateMobile).removeClass("hide");
            $("#err_info").addClass("hide");
        }else{
            $(".username").addClass("hide");
            $("#err_info").addClass("hide");
        }
    });


    $("#password").blur(function(){
        var password = $("#password").val();
        var len = Helper.validata.getByteLength(password.trim());
        if (password === "") {
            $(".password").html("请输入密码").removeClass("hide");
            $("#err_info").addClass("hide");
        } else if (len < 6 || len > 16) {
            $(".password").html("确认密码必须为6-16位数字和字母组合").removeClass("hide");
            $("#err_info").addClass("hide");
        } else {
            $(".password").addClass("hide");
            $("#err_info").addClass("hide");
        }
    });


	document.onkeydown = function (event) {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if (e && e.keyCode == 13) {
			e.returnValue=false;
	        e.cancel = true;
	        $("#subfrm").click();
		}
	};
});
