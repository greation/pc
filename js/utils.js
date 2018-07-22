function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

window.UTILS = {};
UTILS.timerDown = function(id,time){
    if(!id) return false;
    var $this = $('#'+id),text=$this.text();
    if($this.hasClass('btn_deepgray')) return false;
    $this.addClass('btn_deepgray');
    $this.text(time);
    function go(){
        setTimeout(function(){
            time--;
            $this.text(time);

            if(time==0){
                $this.text(text);
                $this.removeClass('btn_deepgray');
            }
        },1000);
        go();
    }
    go();
}