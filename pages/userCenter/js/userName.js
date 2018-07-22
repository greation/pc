$(function() {
    $('.confirm_btn').on('click',function(){
        var userName = $("#userName").val();
        if(Helper.isEmpty(userName) || userName.length < 2 || userName.length > 12){
            $(".err_msg").removeClass("hide").html("请输入2-12位用户名");
            return;
        }else if(!Helper.validata.isUserName(userName)){
            $(".err_msg").removeClass("hide").html("必须是字母,数字,中文或下划线");
            return;
        }
        $.ajax({
            url:app_config.context_path + 'memberCenter/updateUserName.htm',
            dataType:'json',
            type:'POST',
            async:false,
            data:{
                userName:userName
            },
            success:function(data){
                if(data.flag == 0){
                    $(".err_msg").removeClass("hide").html(data.message);
                }else{
                    window.location.href = app_config.context_path + 'memberCenter/setUserNameSuccess.htm'
                }
            }
        });
    });
});