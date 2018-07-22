/*
* @Author: Administrator
* @Date:   2017-09-11 17:34:55
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-27 11:15:41
*/
var curNum = 0;
$(function(){
    //项目进度
    progress_rate($('.progress_rate'));
    /* 约标密码输入框逻辑 */
    var isInp = false;
    $('.inp-psw-box').click(function(){
        if(curNum == 0){
            $(this).find("i:first").addClass('inputCursor');
        }
        $('.inp-ybpsw').focus();
        isInp=true;
    })
    $('.inp-ybpsw').keyup(function(event){
        if(curNum>=6||curNum<0){
            isInp=false;
        }
        if(isInp){
            if(event.keyCode==8&&curNum>0){
                $('.inp-psw-box i').eq(curNum).removeClass('inputCursor');
                curNum-=1;
                $('.inp-psw-box i').eq(curNum).removeClass('active');
                $('.inp-psw-box i').eq(curNum).addClass('inputCursor');
            }else{
                if(event.keyCode!=8){
                    $('.inp-psw-box i').eq(curNum).addClass('active');
                    $('.inp-psw-box i').eq(curNum).removeClass('inputCursor');
                    curNum+=1;
                    $('.inp-psw-box i').eq(curNum).addClass('inputCursor');
                }
            }
        }else{
            if(event.keyCode==8&&curNum>0){
                $('.inp-psw-box i').eq(curNum).removeClass('inputCursor');
                curNum-=1;
                $('.inp-psw-box i').eq(curNum).removeClass('active');
                $('.inp-psw-box i').eq(curNum).addClass('inputCursor');
                isInp=true;
            }
        }
    })
    $('.inp-ybpsw').blur(function(){
        isInp=false;
    })
    /* 测试获取输入框内容 */
    $('.btn-submit').click(function(){
        $('#message').addClass("hide");
        var pwd = $('.inp-ybpsw').val();
        var id = $('#makeBorrowId').val();
        var  url= app_config.context_path + "borrowInfo/checkPwd.htm";
        $.ajax({
            type: "POST",
            url: url,
            data: "id="+id+" &pwd="+pwd,
            async:false,
            dataType: "json",
            success: function(data){
                if(data.code=='0001'){
                    $('#message').removeClass("hide");
                    $('.inp-psw-box i').removeClass('active');
                    $('.inp-psw-box i').removeClass('inputCursor');
                    curNum=0;
                    $('.inp-psw-box').trigger("click");
                    $("#inp-ybpsw").val("");
                    return;
                }else{
                    var url = app_config.context_path + "borrowInfo/"+id+ ".htm?voucherId="+voucherId;
                    location.href=url;
                }
            }
        });
    });
    /* modal取消按钮事件 */
    $('.btn-close-yb-modal').click(function(){
        hideYbPsw();
    })

    //计算预期收益
    $('#borrowName').on('input',function(){
        var $this = $(this);
        var key = $this.val();
        var id = $("#searchBorrowInfo").data("id");
        var url = $("#searchBorrowInfo").data('url');
        if(key){
            url += "?key=" + key
            if(id){
                url += "&voucherId=" + id;
            }
        }else{
            if(id){
                url += "?voucherId=" + id;
            }
        }
        $("#searchBorrowInfo").attr("href",url);
    });
});

function progress_rate(ele) {
    ele.each(function(i, el) {
        var ele = $(el);
        var total = ele.attr('total');
        var has = ele.attr('has');
        var REG = /^[\d\.]+$/;
        var percent = 0;
        if (!(REG.test(total) && REG.test(has))) {
            return;
        }
        total = Math.floor(total.replace(/\..*/, ''));
        has = Math.floor(has.replace(/\..*/, ''));
        var scale=has*1000000/total/10000;
        scale=scale.toFixed(3);
        scale = scale.substring(0,scale.lastIndexOf('.')+3);
        var percent = scale+ "%";
        ele.find('.p_speed').css("width", percent);
        ele.find('.p_num').html(percent);
    });
}

function checkPassword(id){
    $('#makeBorrowId').val(id);
    $('.yb-psw').removeClass('hide').show();
    $('.modal-bg').removeClass('hide').show().css('opacity','0.6');
    $('#inp-ybpsw').val('');
    $('.inp-psw-box').trigger("click");
}

/* 隐藏输入约标密码modal */
function hideYbPsw(){
    $('.yb-psw').hide();
    $('.modal-bg').hide();
    $('.inp-ybpsw').val('');
    $('.inp-psw-box i').removeClass('active');
    $('.inp-psw-box i').removeClass('inputCursor');
    $('#message').addClass('hide');
    curNum=0;
}
/* 显示输入约标密码modal */
function showYbPsw(){
    $('.yb-psw').removeClass('hide').show();
    $('.modal-bg').removeClass('hide').show().css('opacity','0.6');
}