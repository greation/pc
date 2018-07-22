$(function(){
    $('.select_box li').on('click',function(){
        var $this = $(this);
        var type = 1;
        var status = 1;
        var date = 1;
        if($this.parent().hasClass('borrow_type')){
            type = $this.data('type');
            status = $('.invest_status li').find("._selected").data('status');
            date = $('.invest_date li').find("._selected").data('date');
        }else if($this.parent().hasClass('invest_status')){
            type = $('.borrow_type li').find("._selected").data('type');
            status = $this.data('status');
            date = $('.invest_date li').find("._selected").data('date');
        }else if($this.parent().hasClass('invest_date')){
            type = $('.borrow_type li').find("._selected").data('type');
            status = $('.invest_status li').find("._selected").data('status');
            date = $this.data('date');
            $("#startInvestTime").val('');
            $("#endInvestTime").val('');
        }
        if(type == null){
            type = 1;
        }
        if(status == null){
            status = 1;
        }
        if(date == null){
            date = 1;
        }
        $.ajax({
            url:app_config.context_path + 'investInfo/myInvestList.htm',
            dataType:'html',
            type:'POST',
            async:false,
            data:{
                curPage:1,
                dateType:date,
                setPlanType:type,
                setPlanStatus:status
            },
            success:function(data){
                $(".trade_record").html(data);
            }
        });
    });

    $('#startInvestTime, #endInvestTime').on('change',function(){
        var type = 1;
        var status = 1;
        var date = 1;

        type = $('.borrow_type li').find("._selected").data('type');
        status = $('.invest_status li').find("._selected").data('status');

        if(type == null){
            type = 1;
        }
        if(status == null){
            status = 1;
        }

        var startInvestTime = $("#startInvestTime").val();
        var endInvestTime = $("#endInvestTime").val();

        $('.invest_date li').each(function () {
           $(this).removeClass("_selected");
        });
        $('.invest_date li:first').addClass("_selected");
        $('.invest_date').prev().text($('.invest_date li:first').text());

        $.ajax({
            url:app_config.context_path + 'investInfo/myInvestList.htm',
            dataType:'html',
            type:'POST',
            async:false,
            data:{
                curPage:1,
                dateType:date,
                setPlanType:type,
                setPlanStatus:status,
                startInvestTime:startInvestTime,
                endInvestTime:endInvestTime
            },
            success:function(data){
                $(".trade_record").html(data);
            }
        });
    });

    $(document).on("click",".investTotalNum",function(){
        var $this = $(this);
        var type = $this.data("type");
        var borrowId = $this.data("borrow");
        var investId = $this.data("invest");
        if($this.html()){
            window.location.href = app_config.context_path + "investInfo/" + investId + ".htm";
        }else{
            if(type == 'EXPERIENCE'){
                window.location.href = app_config.context_path + 'investInfo/cart/' + borrowId + '.htm';
            }else{
                window.location.href = app_config.context_path + 'borrowInfo/' + borrowId + '.htm'
            }
        }
    })

    $(document).on("click",".record_name_info",function(){
        var $this = $(this);
        var type = $this.data("type");
        var borrowId = $this.data("borrow");
        if(type == 'EXPERIENCE'){
            window.location.href = app_config.context_path + 'investInfo/cart/' + borrowId + '.htm';
        }else{
            window.location.href = app_config.context_path + 'borrowInfo/' + borrowId + '.htm'
        }
    })
})

function go(page, total) {
    if (page > total) {
        page = total;
    }
    var type = $('.borrow_type li').find("._selected").data('type');
    var status = $('.invest_status li').find("._selected").data('status');
    var date = $('.invest_date li').find("._selected").data('date');
    if(type == null){
        type = 1;
    }
    if(status == null){
        status = 1;
    }
    if(date == null){
        date = 1;
    }
    $.ajax({
        url:app_config.context_path + 'investInfo/myInvestList.htm',
        dataType:'html',
        type:'POST',
        async:false,
        data:{
            curPage:page,
            dateType:date,
            setPlanType:type,
            setPlanStatus:status
        },
        success:function(data){
            $(".trade_record").html(data);
        }
    });
}