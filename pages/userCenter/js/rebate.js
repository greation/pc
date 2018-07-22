$(function() {
    $('.select_box li').on('click',function(){
        var $this = $(this);
        var type = $this.data("type");
        $("#startTime").val('');
        $("#endTime").val('');
        $.ajax({
            url:app_config.context_path + 'rebate/rebateList.htm',
            dataType:'html',
            type:'POST',
            async:false,
            data:{
                pageIndex:1,
                type:type,
                pageSize:15
            },
            success:function(data){
                $(".trade_record").html(data);
            }
        });
    });
});

function selTime(){
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    if(startTime != "" && endTime == ""){
        alert("请选择结束时间！");
        return false;
    }
    if(endTime != "" && startTime == ""){
        alert("请选择开始时间！");
        return false;
    }
    var d1 = new Date(startTime.replace(/\-/g, "\/"));
    var d2 = new Date(endTime.replace(/\-/g, "\/"));

    if(startTime != "" && endTime != "" && d1 >d2){
        alert("开始时间不能大于结束时间！");
        $("#startTime").val('');
        $("#endTime").val('');
        return false;
    }

    var type = 1;
    $('#rebateType li').each(function(){
        var $this = $(this);
        if($this.hasClass("_selected")){
            type = $this.data("type");
        }
    });
    $.ajax({
        url:app_config.context_path + 'rebate/rebateList.htm',
        dataType:'html',
        type:'POST',
        async:false,
        data:{
            pageIndex:1,
            type:type,
            pageSize:15,
            startTime:startTime,
            endTime:endTime
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
    var type = 1;
    $('#rebateType li').each(function(){
        var $this = $(this);
        if($this.hasClass("_selected")){
            type = $this.data("type");
        }
    });
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    $.ajax({
        url:app_config.context_path + 'rebate/rebateList.htm',
        dataType:'html',
        type:'POST',
        async:false,
        data:{
            pageIndex:page,
            type:type,
            pageSize:15,
            startTime:startTime,
            endTime:endTime
        },
        success:function(data){
            $(".trade_record").html(data);
        }
    });
}