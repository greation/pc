$(function() {
	$("#record_list ul").click(function(event) {
        $(this).addClass('list_selected').siblings().removeClass('list_selected');
    });
});
function createBg() {
    $('body').append('<div id="modal-bg" style="position:fixed;width:100%;height:100%;left:0;top:0;background:#000;opacity:0.6;z-index:2"></div>');
}
function rightExcharge(){
    createBg();
    $(".inputCard").show();
}
function hideExchange(){
    $("#exchangeCode").val('');
    $(".errorCard").hide();
    $("#modal-bg,.inputCard").hide();

}

function showLoginHistory(){
    var html=$('#showloginhistory').html();
    layer.confirm(html, {
        title :'最近登录信息',
        btn: null,
        area:['655px'],
    });

}