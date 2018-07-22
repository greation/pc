// JavaScript Document
$(document).ready(function() {
	//初始化
	$('.think_01').animate({left: '0',opacity:'1'}, 500, 'easeOutExpo');
	$('.qr_code_yq').animate({top: '0',opacity:'1'}, 1000, 'easeOutExpo');
	$(".logo").animate({top:"60",opacity:"1"},"fast");
	
	/*btn */
	$(".ios,.android").hover(
	function(){
		$(this).animate({opacity:".8"},300);
	},function(){  
		$(this).animate({opacity:"1"},300);
	})
	  
$.fn.fullpage({
	slidesColor: ['#F0F2F4', '#fff', '#fff', '#fff', '#fff'],
	anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
	css3: true,
	navigation: true,
	navigationPosition: 'right',
	loopBottom: true,
//加载时
afterLoad: function(anchorLink, index){
	if(index == 1){//load screen one
		$('.think_01').animate({left: '0',opacity:'1'}, 500, 'easeOutExpo');
		$('.qr_code_yq').animate({top: '0',opacity:'1'}, 1000, 'easeOutExpo');
		$(".logo").animate({top:"60",opacity:"1"},"fast");
	 }	
	if(index == 2){//load screen two
		$('.mobile_ico').animate({left: '0',opacity:'1'}, 800, 'easeOutExpo');
		$('.mobile_ico2').animate({right: '0',opacity:'1'}, 800, 'easeOutExpo');
	}
	if(index == 3){//load screen three
		$('.rolling_three_top').animate({top: '-82px',opacity:'1'}, 800, 'easeOutExpo');
		$('.rolling_three_bottom').animate({bottom: '-15px',opacity:'1'}, 800, 'easeOutExpo');
	}
	if(index == 4){//load screen four
		$('.rolling_four_left').animate({left: '0',opacity:'1'}, 800, 'easeOutExpo');
		$('.rolling_four_right').animate({right: '0',opacity:'1'}, 800, 'easeOutExpo');
		$('.page_four_3').animate({left: '0',opacity:'1'}, 800, 'easeOutExpo');
		$('.page_four_2').animate({left: '150',opacity:'1'}, 800, 'easeOutExpo');
		$('.page_four_1').animate({left: '226',opacity:'1'}, 800, 'easeOutExpo');
	}
	if(index == 5){//load screen five
	   $('.qr_code_yq_bt').animate({bottom: '0',opacity:'1'}, 1500, 'easeOutExpo');
	   $('.think_05 h1').animate({top: '-80',opacity:'1'}, 400, 'easeOutExpo');
	}
},
//滚动 
onLeave: function(index, direction){
	if(index == 1){//rolling screen one
		$('.think_01').animate({left: '650',opacity:'0'}, 500, 'easeOutExpo');
		$('.qr_code_yq').animate({top: '420',opacity:'0'}, 1000, 'easeOutExpo');
		$(".logo").animate({top:"0",opacity:"1"},"fast");
	}
	if(index == 2){//rolling screen two
		$('.mobile_ico').animate({left: '-300',opacity:'0'}, 800, 'easeOutExpo');
		$('.mobile_ico2').animate({right: '-300',opacity:'0'}, 800, 'easeOutExpo');
	}
	if(index == 3){//rolling screen three
		$('.rolling_three_top').animate({top: '-282px',opacity:'0'}, 800, 'easeOutExpo');
		$('.rolling_three_bottom').animate({bottom: '-515px',opacity:'0'}, 800, 'easeOutExpo');
	}
	if(index == 4){//rolling screen four
		$('.rolling_four_left').animate({left: '-120%',opacity:'0'}, 800, 'easeOutExpo');
		$('.rolling_four_right').animate({right: '-120%',opacity:'0'}, 800, 'easeOutExpo');
		$('.page_four_3').animate({left: '0',opacity:'0'}, 800, 'easeOutExpo');
		$('.page_four_2').animate({left: '0',opacity:'0'}, 800, 'easeOutExpo');
		$('.page_four_1').animate({left: '0',opacity:'0'}, 800, 'easeOutExpo');

	}
	if(index == 5){//rolling screen five
		$('.qr_code_yq_bt').animate({bottom: '-220',opacity:'0'}, 1500, 'easeOutExpo');
		 $('.think_05 h1').animate({top: '20',opacity:'0'}, 400, 'easeOutExpo');
	}
}
});
});