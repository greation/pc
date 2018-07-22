$(function() {
	//banner轮播
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 0,
        autoplay: 3000,
        autoplayDisableOnInteraction: false,
        paginationType : 'progress',
        paginationProgressRender: function (swiper, progressbarClass) {
            return '<span class="' + progressbarClass + '"></span>';
        }
    });
    //公告轮播
	$(".news li").eq(0).clone().appendTo(".news");
	var xl=$(".news li").length-1,xh=$(".news li").height(),m=0,$news=$(".news");
	var timer = setInterval(timerHandle, 3000);
	function timerHandle(){
		m++;
		if(m>xl){
			m=1;
			$news.css("top",0);
		}
		$news.stop().animate({"top":-m*xh},1000);
	}
	
	$(".bulletin_l").hover(function() {
	    clearInterval(timer);
	    timer = null;
	}, function() {
	      clearInterval(timer);
	      timer = setInterval(timerHandle, 3000);        		
	});
	//数字滚动
	var totle_money = $("#totle_money").text(),totle_people = $("#totle_people").text();
	var options = {
	  useEasing: true, 
	  useGrouping: true, 
	  separator: ',', 
	  decimal: '.', 
	};
	var demo1 = new CountUp('totle_money', 0, totle_money, 2, 2, options);
	var demo2 = new CountUp('totle_people', 0, totle_people, 0, 2, options);
	demo1.start();demo2.start();
});