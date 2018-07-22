$(function() {
    $('#voucherStatus li').on('click',function(){
        var $this = $(this);
        var voucherStatus = $this.data("status");
        $.ajax({
            url:app_config.context_path + 'voucher/list.htm',
            dataType:'html',
            type:'POST',
            async:false,
            data:{
                page:1,
                voucherStatus:voucherStatus
            },
            success:function(data){
                $(".trade_record").html(data);
            }
        });
    });

    $("#exchangeVoucher").on("click",function(){
        var exchangeCode = $("#exchangeCode").val();
        if(!exchangeCode){
            $(".errorCard").show();
            $(".errorCard p").html("请输入正确兑换码");
            return;
        }
        $.ajax({
            url:app_config.context_path + 'voucher/exchangeRedemptionCode.htm',
            dataType:'json',
            type:'POST',
            async:false,
            data:{
                swapCode:exchangeCode
            },
            success:function(data){
                if(data.code != '000'){
                    $(".errorCard").show();
                    $(".errorCard p").html(data.message);
                }else{
                    window.location.href = app_config.context_path + 'voucher/index.htm';
                }
            }
        });
    })
});

$(document).on("click",".trade_record_box ul",function(){
    var $this = $(this);
    var status = $this.data("status");
    var voucherId = $this.data("id");
    if(status == 'CANUSE'){
        var url = app_config.context_path + "borrowInfo/?voucherId=" + voucherId;
        window.open(url,"_blank");
    }
})

function go(page, total) {
    if (page > total) {
        page = total;
    }
    var status = 1;
    $('#voucherStatus li').each(function(){
        var $this = $(this);
        if($this.hasClass("_selected")){
            status = $this.data("status");
        }
    });
    $.ajax({
        url:app_config.context_path + 'voucher/list.htm',
        dataType:'html',
        type:'POST',
        async:false,
        data:{
            page:page,
            voucherStatus:status
        },
        success:function(data){
            $(".trade_record").html(data);
        }
    });
}