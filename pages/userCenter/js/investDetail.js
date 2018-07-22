$(function(){
    $('.select_box li').on('click',function(){
        var $this = $(this);
        var status = $this.data("status");
        if(status == 1){
            $(".trade_record_box ul").show();
            $('.no_record').hide();
        }else{
            $(".trade_record_box ul[data-status='"+status+"']").show();
            $(".trade_record_box ul[data-status!='"+status+"']").hide();
            var len = $(".trade_record_box ul[data-status='"+status+"']").length;
            if(len == 0){
                $('.no_record').removeClass("hide").show();
            }else{
                $('.no_record').hide();
            }
        }
    });

    /*切换按钮 */
    $("#view_borrow_bt").click(function() {
        $("#view_borrow_bt").hide();
        $(".exp_state").css("border-bottom-style","dashed");
        $("#exp_info_borrow").toggle();
    });
    $("#view_borrow_bt_over").click(function() {
        $("#exp_info_borrow").hide();
        $(".exp_state").css("border-bottom-style","");
        $("#view_borrow_bt").toggle();
    });
})

function downloadContract(investId,isCreateContract){
    if(isCreateContract=='NO'){
        alert("合同正在生成，请稍后再试。");
    }else{
        var url = app_config.context_path + "investInfo/showContract.htm?investInfoId="+investId+"&contractType=YQZB";
        window.location.href = url;
    }
}