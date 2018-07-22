$(function() {
    $("#allSelect,#checkAll").on("click",function(){
        var flag = $("#allSelect").is(':checked');
        if(flag){
            $(".cb").prop("checked",true);
        }else{
            $(".cb").removeAttr("checked");
        }
    })

    $(".trade_record").on("click",".trade_record_box ul",function(e){
        var $ul = $(e.target).parents('ul');
        $ul.addClass('list_selected').siblings().removeClass('list_selected');
        if(e.target.nodeName != 'INPUT'){
            var id = $(this).data("id");
            window.location.href = app_config.context_path + "message/" + id + ".htm";
        }
    });
});

function go(page, total) {
    if (page > total) {
        page = total;
    }
    $("#page").val(page);
    $.ajax({
        url:app_config.context_path + 'message/list.htm',
        dataType:'html',
        type:'POST',
        async:false,
        data:{
            page:page
        },
        success:function(data){
            $(".trade_record").html(data);
        }
    });
}
/**
 * 将选择的信息设置为已读
 */
function onLooks(){
    var ids = "";
    //获取所有选中的checkbox
    $('.cb').each(function(){
        var $this = $(this);
        if($this.is(':checked')){
            ids += ',' + $this.data("id");
        }
    });
    if(ids){
        ids = ids.substring(1);
    }
    if(!ids){
        alert("请选择至少一条信息");
        return;
    }
    updateStatus(ids,"ONLOOK","");
}

/**
 * 根据id,status改变状态
 * @param ids
 * @param status
 */
function  updateStatus(ids,status,isAll){
    $.ajax({
        url: app_config.context_path + 'message/updateStatus.htm',
        dataType:'json',
        Type:'POST',
        data:{"id":ids,"lookStatus":status,"isAll":isAll},
        success:function(data){
            if(data.respCode=='999999'){
                alert("操作失败");
                window.location.reload();
            }else if(data.respCode=='000' || data.respCode=='0'){
                window.location.reload();
            }
        }
    });
}

/**
 * 删除信息
 * @returns {Boolean}
 */
function delLooks(){
    //获取所有选中的span
    if(confirm("确认删除信息吗？")){
        var ids = "";
        //获取所有选中的checkbox
        $('.cb').each(function(){
            var $this = $(this);
            if($this.is(':checked')){
                ids += ',' + $this.data("id");
            }
        });
        if(ids){
            ids = ids.substring(1);
        }
        if(!ids){
            alert("请选择至少一条信息");
            return;
        }
        delLook(ids);
    }
}

/**
 * 删除
 */
function delLook(id){
    var curPage = $("#page").val();
    $.ajax({
        url: app_config.context_path + 'message/delLook.htm',
        dataType:'json',
        Type:'POST',
        data:{"id":id,"curPage":curPage},
        success:function(data){
            if(data.respCode=='999999'){
                alert("操作失败");
                window.location.reload();
            }else if(data.respCode=='000' || data.respCode=='0'){
                window.location.reload();
            }else if(data.respCode=='1112'){
                go(data.respDesc);
            }
        }
    });
}