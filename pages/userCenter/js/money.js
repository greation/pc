$(function() {
    $('#dateType li').on('click',function(){
        var $this = $(this);
        $("#from").val('');
        $("#to").val('');
        var dateType = 1;
        var tradeType = 1;
        $('#tradeType li').each(function(){
            var $this = $(this);
            if($this.hasClass("_selected")){
                tradeType = $this.data("type");
            }
        });
        dateType = $this.data("type");
        if(!tradeType){
            tradeType = 1;
        }
        $.ajax({
            url:app_config.context_path + 'memberCenter/accountLogList.htm',
            dataType:'html',
            type:'POST',
            async:false,
            data:{
                page:1,
                dateType:dateType,
                setPlanStatus:tradeType,
                startTime:'',
                endTime:''
            },
            success:function(data){
                $(".trade_record").html(data);
            }
        });
    });

    $("#tradeType li").on("click",function(){
        var $this = $(this);
        var dateType = 1;
        var tradeType = 1;
        $('#dateType li').each(function(){
            var $this = $(this);
            if($this.hasClass("_selected")){
                dateType = $this.data("type");
            }
        });
        tradeType = $this.data("type");
        if(!dateType){
            dateType = 1;
        }
        var startTime = $("#from").val();
        var endTime = $("#to").val();
        $.ajax({
            url:app_config.context_path + 'memberCenter/accountLogList.htm',
            dataType:'html',
            type:'POST',
            async:false,
            data:{
                page:1,
                dateType:dateType,
                setPlanStatus:tradeType,
                startTime:startTime,
                endTime:endTime
            },
            success:function(data){
                $(".trade_record").html(data);
            }
        });
    })
});

function selTime(){
    var startTime = $("#from").val();
    var endTime = $("#to").val();
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
    $("#dateType").prev().html('时间');
    $("#dateType li").removeClass("_selected");
    var tradeType = 1;
    $('#tradeType li').each(function(){
        var $this = $(this);
        if($this.hasClass("_selected")){
            tradeType = $this.data("type");
        }
    });
    if(!tradeType){
        tradeType = 1;
    }

    $.ajax({
        url:app_config.context_path + 'memberCenter/accountLogList.htm',
        dataType:'html',
        type:'POST',
        async:false,
        data:{
            page:1,
            dateType:1,
            setPlanStatus:tradeType,
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
    var dateType = 1;
    var tradeType = 1;
    var startTime = $("#from").val();
    var endTime = $("#to").val();
    $('#dateType li').each(function(){
        var $this = $(this);
        if($this.hasClass("_selected")){
            dateType = $this.data("type");
        }
    });
    $('#tradeType li').each(function(){
        var $this = $(this);
        if($this.hasClass("_selected")){
            tradeType = $this.data("type");
        }
    });
    if(!tradeType){
        tradeType = 1;
    }
    if(!dateType){
        dateType = 1;
    }
    $.ajax({
        url:app_config.context_path + 'memberCenter/accountLogList.htm',
        dataType:'html',
        type:'POST',
        async:false,
        data:{
            page:page,
            dateType:dateType,
            setPlanStatus:tradeType,
            startTime:startTime,
            endTime:endTime
        },
        success:function(data){
            $(".trade_record").html(data);
        }
    });
}