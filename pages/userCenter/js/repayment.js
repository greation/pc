$(function(){
    $('.select_box li').on('click',function(){
        var $this = $(this);
        var status = $this.data('status');
        var startTime = $("#startTime").val();
        var endTime = $("#endTime").val();
        $.ajax({
            url:app_config.context_path + 'repayment/list.htm',
            dataType:'html',
            type:'POST',
            async:false,
            data:{
                page:1,
                startTime:startTime,
                endTime:endTime,
                borrowStatus:status
            },
            success:function(data){
                $(".trade_record").html(data);
            }
        });
    });
})

function queryRepayment(){
    var status = $('.repaymentStatus li').find("._selected").data('status');
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    $.ajax({
        url:app_config.context_path + 'repayment/list.htm',
        dataType:'html',
        type:'POST',
        async:false,
        data:{
            page:1,
            startTime:startTime,
            endTime:endTime,
            borrowStatus:status
        },
        success:function(data){
            $(".trade_record").html(data);
        }
    });
}

function go(page, total) {
    if (page > total) {
        page = total;
    }
    var status = $('.repaymentStatus li').find("._selected").data('status');
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    $.ajax({
        url:app_config.context_path + 'repayment/list.htm',
        dataType:'html',
        type:'POST',
        async:false,
        data:{
            page:page,
            startTime:startTime,
            endTime:endTime,
            borrowStatus:status
        },
        success:function(data){
            $(".trade_record").html(data);
        }
    });
}

$(document).on("click",".repay_num",function () {
    var $this = $(this);
    var borrowInfoId = $this.data("id");
    window.location.href = app_config.context_path + 'repayment/'+ borrowInfoId +'.htm'
})