$(function() {
    Array.prototype.sumAll = function(){
        var result = 0;
        for(var i = 0;i<this.length; i++){
            result += this[i];
        }
        return result;
    }
    //饼状图
    var myChart = echarts.init(document.getElementById('pie_chart'));
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        color:['#80ade5', '#e9e777','#f1a769','#d18fc2','#92c4ab'],
            //可用余额,冻结金额,待收本金,待收收益,待返返利
        series: [
            {
                name:'账户总览',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '16',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:canUseMoney, name:'可用余额'},
                    {value:freezeMoney, name:'冻结金额'},
                    {value:collectMoney, name:'待收本金'},
                    {value:collectIncomeMoney, name:'待收收益'},
                    {value:rewardRebatesAmount, name:'待返返利'}
                ]
            }
        ]
    };  
    myChart.setOption(option);

    //投资趋势
    var myChart_it = echarts.init(document.getElementById('invest_trend_con'));
    var invest_trend_data = eval('('+$('#investTrendyAxis').val()+')');
    var invest_trend_month =  eval('('+$('#investTrendxAxis').val()+')').data
    var max = Math.max.apply(null, invest_trend_data);

    if(invest_trend_data.sumAll() == 0){//无投资
        $("#invest_trend_noData").removeClass("hide");
        $("#invest_trend_con").addClass("hide");
        invest_trend_month.forEach(function(el,i){
            $("#invest_trend_month li").eq(i).text(el);
        })
    }

    invest_trend_data = invest_trend_data.map(function(el){
    	if(el === max){
    		el = {
    		    value:String(max.toFixed(2)),
    		    symbolSize:12,
    		    symbol:'circle',
    		    itemStyle : {
    		      	normal: {
    		      	  color: "#fff",  // 会设置点和线的颜色，所以需要下面定制 line
    		      	  borderColor: "#1e82fe",  // 点边线的颜色
    		      	  borderWidth:4,
    		      	  label : {
    		      	      	show: true,
    		      	      	textStyle : {
    		      	      	    fontSize : '16',
    		      	      	    fontFamily : '微软雅黑',
    		      	      	    backgroundColor:'#1e82fe',
    		      	      	    padding:10,
    		      	      	    borderRadius:5,
    		      	      	}
    		      	  	}
    		      	}
    		    }	
    		}
    	}else{
            el = Number(el).toFixed(2);
        }
    	return el;
    });

    var options_it = {
        color: ['#1e82ff'],
        tooltip : {
            trigger: 'axis',
            formatter: '<div style="min-width:120px;">{b0}<br /><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#fff"></span>{c0}</div>',
            hideDelay: 100,            // 隐藏延迟，单位ms
            transitionDuration : 0.4,  // 动画变换时间，单位s
            borderRadius: 4,           // 提示边框圆角，单位px，默认为4
            padding: 5,
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'line',         // 默认为直线，可选为：'line' | 'shadow'
                lineStyle : {          // 直线指示器样式设置
                    color: '#1e82ff',
                    width: 1,
                    type: 'solid'
                }
            }
        },
        xAxis : [
            {
                boundaryGap : false,
                axisTick:{
                    show:false
                },
                data : eval('('+$('#investTrendxAxis').val()+')').data,
                axisLabel: {
                    textStyle: {
                        color: '#989898',
                        fontSize:'14'
                    },
                }, 
                axisLine:{
                    lineStyle:{
                        color:'#f5f5f5',
                    }
                }
            }
        ],
        yAxis : [
            {
                axisTick:{
                    show:false
                },
                type: 'value',
                position: 'right',
                axisLine: {
                    lineStyle: {
                        color: '#f5f5f5'
                    }
                },
                axisLabel: {
                    formatter: ''
                },
                splitLine: {
                    show: true,
                    //  改变轴线颜色
                    lineStyle: {
                        color:'#f5f5f5'
                    }                          
                }
            },
            {
                type : 'value',
                axisTick:{
                    show:false
                },
                axisLabel : {
                    formatter: ''
                },
                axisLine:{
                    lineStyle:{
                        color:'#f5f5f5',
                    }
                }
            }
        ],
        series : [
            {
                name:'投资趋势',
                type:'line',
                stack: '总量',
                smooth:false,
                symbol:'none',
                itemStyle: {
                    normal: {
                        areaStyle: {// 区域图，填充
                            color :'rgba(136,189,255,0.1)',
                        },
                        lineStyle: {// 属性lineStyle控制线条样式
                            color: '#1e82ff',
                            width: 1
                        }
                    }
                },
                data:invest_trend_data
            }
        ]
    };
    myChart_it.setOption(options_it);

    $(".update_close_btn").click(function(){
        $("#update,#mask").removeClass('show').addClass('hide');
    });

    //设置高度 填充数据
    function showPlanData(){
        if(payment_plan_data.sumAll() == 0){
        //if(true){
            payment_plan_month.data.forEach(function(el,i){
                $(".date_month li").eq(i).find(".ppd_month").text(el);
            });
            $(".payment_plan_noData").removeClass('hide');
            return false;
        }

        payment_plan_data.forEach(function(el,i){
            var h = 80*el/ppd_max+'%';
            if(el/ppd_max){
                $(".date_month li").eq(i).find(".progress").show();
                $(".date_month li").eq(i).find(".progress").css('height',h).find(".num_info").text(el.toFixed(2));
            }
            $(".date_month li").eq(i).find(".ppd_month").text(payment_plan_month.data[i]);
        });
    }
    showPlanData();



    var showMemberInfos = new Helper.RemoteTrans({
        url : app_config.context_path + "showMemberInfos.htm",
        isAsync : false,
        onSuccess : function(data) {
            if(data.response_code=="APPLY_SUCCESS"){
                window.open(data.redirect_url);
            }else if(data.response_code=="001"){
                window.location.href = app_config.context_path + 'login.htm?url='+app_config.context_path+'memberCenter/index.htm';
            }
        },
        onError : function(data) {
            alert(2);
            data = eval('('+data.result+')');
            if(data.response_code=="MEMBER_NOT_EXIST"){
                alert("您没有sina账户,请您进行sina实名认证！");
            }
            /*$("#invest_err_msg").text(data.message);
             P2PWAP.ui.toast(data.message);*/
        }
    });

    $("#showMemberInfos").click(function() {
        showMemberInfos.params = {memberId:$('#memberInfoId').val()};
        showMemberInfos.send();
    });
    $(".btn_red_normal").click(function(){
        authorizeLoginAssetPlatform(1);
    })
});

function authorizeAsset(){
    if(isHighNetWorth == 'YES'){
        if(isInvestOpenQuestionnaire == 'YES'){
            if(!levelName){
                window.location.href = riskTestUrl;
            }else{
                isFirstAuthorizeLoginAsset();
            }
        }else{
            isFirstAuthorizeLoginAsset();
        }

    }else{
        layer.confirm('抱歉！您还未达到进入条件！', {
            icon:0,
            btn: ['关闭'],
            btn1: function(index, layero){
                layer.close(index);
            }
        });
    }
}

function isFirstAuthorizeLoginAsset(){
    if(isAuthorizeAsset != 'YES'){
        showPopBox('popBox');
    }else{
        authorizeLoginAssetPlatform();
    }
}

function authorizeLoginAssetPlatform(flag){
    var url = app_config.context_path + "memberCenter/authorizeLoginAsset.htm";
    if(flag){
        url += '?isFirst='+flag;
    }
    new Helper.RemoteTrans({
        url : url,
        isAsync : false,
        onSuccess : function(jsonData) {
            if (jsonData.flag == 1) {
                var code = jsonData.result;
                $(".pop_close_btn").trigger('click');
                if(code == '001'){
                    var formName = "assetForm";
                    var formAction = jsonData.url;
                    var htmlStr = "<form name='"+formName+"' action='"+formAction+"' method='post'  style='display:none'>";
                    htmlStr += "<input name='isFirst' type='hidden' value='"+jsonData.isFirst+"' />";
                    htmlStr += "<input name='yqUserId' type='hidden' value='"+jsonData.yqUserId+"' />";
                    htmlStr += "</form>";
                    $("body").append(htmlStr);
                    var assetForm = $("body").find("[name=" + formName+ "]");
                    assetForm.submit();
                    assetForm.remove();
                }else{
                    layer.confirm('授权失败', {
                        icon:0,
                        btn: ['关闭'],
                        btn1: function(index, layero){
                            layer.close(index);
                        }
                    });
                }
            } else {
                Helper.message(jsonData.message);
            }
        },
        onError : function(data) {
            Helper.message(data.message);
        }
    }).send();
}