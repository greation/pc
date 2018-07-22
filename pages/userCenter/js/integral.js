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

    $.ajax({
        url:app_config.context_path + 'intergal/list.htm',
        dataType:'html',
        type:'POST',
        async:false,
        data:{
            page:1,
            startTime:startTime,
            endTime:endTime
        },
        success:function(data){
            $("#integralList").html(data);
        }
    });
}

function go(page, total) {
    if (page > total) {
        page = total;
    }
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    $.ajax({
        url:app_config.context_path + 'intergal/list.htm',
        dataType:'html',
        type:'POST',
        async:false,
        data:{
            page:page,
            startTime:startTime,
            endTime:endTime
        },
        success:function(data){
            $("#integralList").html(data);
        }
    });
}