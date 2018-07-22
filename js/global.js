$(function() {
	//固定header
	$(window).scroll(function() {
        var l = $(window).scrollLeft();
        if($(window).scrollTop() > 40 ){
        	$("#navBar").addClass('fixed').css("left",-l);
        	$("#direct").css("margin-bottom","84px");
        }else{
        	$("#navBar").removeClass('fixed');
        	$("#direct").css("margin-bottom","0");
        }

        if ($(window).scrollTop() > 40) {
            $(".yqzb-header-container").addClass('fixed');
            $(".yqzb-header-container-content").addClass('hoverNavHead isHaselseNav');
            $(".fast_list").css({"margin-top": "-24px"});
            $(".fast_list li i ").css({"top":"-57px"});
        } else {
            $(".fast_list").css({"margin-top": "0"});
            $(".yqzb-header-container").removeClass('fixed');
            $(".yqzb-header-container-content").removeClass('hoverNavHead isHaselseNav');
            $(".fast_list li i ").css({"top":"-30px"});
        }

        //是否显示返回顶部
    	if($(window).scrollTop() >= 300){
    		$("#back").show();
    	}else{
    		$("#back").hide();
    	}
    });

    /*二维码 */
    $(".yqzb-erweima").mouseover(function () {
        $(".erweima-box").show();
    });
    $(".yqzb-erweima").mouseout(function () {
        $(".erweima-box").hide();
    });

    //go top
    $(".toTop").click(function (event) {
        $('body,html').animate({scrollTop: 0}, 300);
    });

	//go top
	$(".toTop").click(function(event) {
		$('body,html').animate({ scrollTop: 0 }, 300);
	});
	//模拟select
	$('._select').on('click',function(event) {
		$('._select').not(this).find("._arr").removeClass('_top');
		$('._select').not(this).find('ul').addClass('hide');

		$(this).find("._arr").toggleClass('_top');
		$(this).find('ul').toggleClass('hide');
	});
	//模拟select选择 
	$('._select').on('click','._option',function(event) {
		if(event.target.className.indexOf('_option')>-1){
			$(event.target).addClass('_selected').siblings('li').removeClass('_selected');
			if($(event.target).children().length>0){//针对有数字显示的特殊处理
				var text = $(event.target).html().replace(/(.*)<[^>]*>.*<\/[^>]*>(.*)/,"$1$2");
				$(this).parents('._select').find('._selectVal').text(text);
				return;
			}
			$(this).parents('._select').find('._selectVal').text($(event.target).text());
		}
	});
	//模拟select打开或者关闭
	$("body").on('click',function(event){
		var cls = event.target.className;
		if(cls.indexOf('_select') == -1 && cls.indexOf('_arr') == -1 && cls.indexOf('_selectVal') == -1){
			$('._select').find("._arr").removeClass('_top');
			$('._select').find('ul').addClass('hide');
		}
	});
	
	//input 输入高亮
	$(".ipt").focus(function(event) {
		$(".ipt").not(this).parent('.ipt_box').removeClass('focus');
		$(this).parent('.ipt_box').addClass('focus');
	}).blur(function(event) {
		$(this).parent('.ipt_box').removeClass('focus');
	});
    //input输入placeholder
    if( !('placeholder' in document.createElement('input')) ){

        $('input[placeholder],textarea[placeholder]').each(function(){
            var that = $(this),
                text= that.attr('placeholder');
            if(that.val()===""){
                that.val(text).addClass('placeholder');
            }
            that.focus(function(){
                if(that.val()===text){
                    that.val("").removeClass('placeholder');
                }
            })
                .blur(function(){
                    if(that.val()===""){
                        that.val(text).addClass('placeholder');
                    }
                })
                .closest('form').submit(function(){
                if(that.val() === text){
                    that.val('');
                }
            });
        });
    }

	/*
	 id 所要显示的popBox的id 
	 */
	window.showPopBox = function(id){
		$("#mask,#"+id||'').show();
	}
	$(".pop_close_btn").click(function(event) {
		$(this).parents(".popBox").hide();
		$("#mask").hide();
	});

	//信息披露 菜单展开收缩操作
	var clickable = true;
	$("#infoDis").on('click','.has_son',function(e){
		if(clickable){
			clickable = false;
			var $this = $(this);
			if($(this).hasClass('open')){
				$(this).removeClass('rotate').siblings('.son_menu').slideUp(function(){
					clickable = true;
					$this.removeClass('open');
				});
			}else{
				$(this).addClass('rotate').siblings('.son_menu').slideDown(function(){
					clickable = true;
					$this.addClass('open');
				});
			}
		}
	});



	//给要处理的input添加对应的class名字 或者 data 属性
	//手机号输入时简单处理 
	$(".on_phone_input").on('keyup blur',function(event) {
		$(this).attr('maxLength',11)
		var val = String($(this).val()).substring(0,11);
		var newVal = val.match(/^1\d{0,10}/g);
		if(newVal === null){
			$(this).val('');
		}else{
			$(this).val(newVal[0]);
		}
	});

	//身份证号输入时简单处理
	$(".on_identity_input").on('keyup blur',function(event) {
		$(this).attr('maxLength',18)
		var val = String($(this).val());
		var newVal = val.match(/^\d{0,17}[\dX]/g);
		if(newVal === null){
			$(this).val('');
		}else{
			$(this).val(newVal[0]);
		}
	});

    //姓名输入时简单处理
    $(".on_name_input").on('keyup blur',function(event) {
        var l = $(this).attr("data-cLength") || 15;
        var val = String($(this).val());
        var newVal = val.match(/^[\u0391-\uFFE5a-zA-Z0-9]+/g);
        if(newVal === null){
            $(this).val('');
        }else{
            $(this).val(newVal[0]);
        }
    });

	//数字验证码输入相关处理
	$(".on_yzCode_input").on('keyup blur',function(event) {
		var l = $(this).attr("data-cLength") || 4; //给对应的验证码input 可配 添加data-cLength = 长度
		$(this).attr('maxLength',l)
		var val = String($(this).val());
		var newVal = val.match(/^\d+/g);
		if(newVal === null){
			$(this).val('');
		}else{
			$(this).val(newVal[0]);
		}
	});

	//邀请码输入相关处理
	$(".on_yqCode_input").on('keyup blur',function(event) {
		var l = $(this).attr("data-cLength") || 11; //给对应的验证码input 可配 添加data-cLength = 长度
        $(this).attr('maxLength',l)
        var val = String($(this).val());
        var newVal = val.match(/[\d\w]+/g);
        if(newVal === null){
            $(this).val('');
        }else{
            $(this).val(newVal[0]);
        }
	});

	//输入金额相关处理
	$(".on_money_input").on('keyup blur',function(){
		var l =  $(this).attr("data-cLength") || 9;//最大输入位数 可配
        var max = Math.pow(10, l) - 0.01;//最大输入数
        var val = String($(this).val());
        if(val.length >= 2 && val < 10 && val.indexOf('0.') === -1){//处理以0开头
            $(this).val(Number(val));
            return;
        }

        if(val>max){ //输入数字大于最大可输入数
            $(this).val(val.substring(0,l));
            return;
        }

        var newVal = val.match(/\d{1,9}\.?\d{0,2}/);
        if(newVal === null){
            $(this).val('');
        }else{
            $(this).val(newVal[0]);
        }
	});

});

//密码相关map对象
	var _pswObj = {
		"PWD_COMPLEX_LEVEL_ONE":{
			text:"6~16位纯数字密码",
			reg:/^\d{6,16}$/,
			test: function(val) {
				return this.reg.test(val)
			}
		},
		"PWD_COMPLEX_LEVEL_TWO":{
			text:"6~16位纯字母密码，区分大小写",
			reg:/^[a-zA-Z]{6,16}$/,
			test: function(val) {
				return this.reg.test(val)
			}
		},
		"PWD_COMPLEX_LEVEL_THREE":{
			text:"6~16位数字字母组合，区分大小写",
			reg:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
			test: function(val) {
				return this.reg.test(val)
			}
		},
		"PWD_COMPLEX_LEVEL_FOUR":{
			text:"6~16位数字字母及特殊字符组合",
			reg:/^(?!([a-zA-Z\d]*|[\d~`@#\$%\^&\*\-=\+\|\\\?/\(\)<>\[\]\{\}",\.;'!]*|[a-zA-Z~`@#\$%\^&\*\-=\+\|\\\?/\(\)<>\[\]\{\}",\.;'!]*)$)[a-zA-Z\d~`@#\$%\^&\*\-=\+\|\\\?/\(\)<>\[\]\{\}",\.;'!]{6,16}$/,
			test: function(val) {
				return this.reg.test(val)
			}
		}
	}


function contains(string,substr,isIgnoreCase) {
    if(isIgnoreCase){
        string=string.toLowerCase();
        substr=substr.toLowerCase();
    }
    var startChar=substr.substring(0,1);
    var strLen=substr.length;
    for(var j=0;j<string.length-strLen+1;j++){
        if(string.charAt(j)==startChar){
            if (string.substring(j, j + strLen) == substr){
                return true;
            }
        }
    }
    return false;
}

/**
 * 在给定的字符串中删除指定子字符串
 * @param targetStr
 * @param sourceStr
 */
function strDel(subStr,sourceStr){
    var targetStr = sourceStr.split(",");
    var x;
    for(x in targetStr){
        if(targetStr[x] == subStr){
            targetStr.splice(x,1);
            return targetStr.join(",");
        }

    }
}

function gotoPage(obj){
    var $this = $(obj);
    var page = $(".page_val").val();
    var url = $this.data("url");
    if(!page){
        page = 1;
    }
    if(page == 1){
        url = url.replace("p[page]/","");
    }else{
        url = url.replace("[page]",page);
    }
    window.location.href = url;
}
