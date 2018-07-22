//倒计时
function ShowCountDown(year,month,day,hour,min,second,divname,isInvest) { 
	var now = new Date(); 
	var endDate = new Date(year, month-1, day,hour,min,second); 
	var leftTime = endDate.getTime() - now.getTime(); 
	if(leftTime<0){
		$('#'+divname).html( "该标已结束"); 
		$('#'+isInvest).val("N");
		return;
	}
	var leftsecond = parseInt(leftTime/1000); 
	var day1 = Math.floor(leftsecond/(60*60*24)); 
	var hour = Math.floor((leftsecond-day1*24*60*60)/3600); 
	var minute = Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
	var second = Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60); 
	$('#'+divname).html(""+day1+"天"+hour+"小时"+minute+"分"+second+"秒"); 
} 
