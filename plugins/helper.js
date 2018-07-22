//前端核心工具包
//高重用性工具包即可放在此js中

var tokenId = "yiquanziben-" +new Date().getTime() + "-"+ Math.random().toString(16).substr(2);

if (typeof (Helper) === "undefined" || !Helper) {
	var Helper = {
		version : "2.0"
	};
}
// 项目根路径
Helper.basePath = "";

// 扩展数组对象，查询元素是否存在
Array.prototype.contains = function(oObj) {
	var _THIS = this;
	for ( var i = 0; i < _THIS.length; i += 1) {
		if (_THIS[i] === oObj) {
			return true;
		}
	}
	return false;
};
Array.prototype.containCount = function(oObj) {
	var _THIS = this;
	var count = 0;
	for ( var i = 0; i < _THIS.length; i += 1) {
		if (_THIS[i] === oObj) {
			count+=1;
		}
	}
	return count;
};
Array.prototype.copy = function(){
	var arrs = [];
	for(var i=0;i<this.length;i+=1) {
		arrs.push(this[i]);
	}
	return arrs;
};

// 扩展String对象，添加截掉字符串前后空格的方法
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
// 扩展Date对象，使其具有格式化时间功能,例：yyyy-MM-dd hh:mm:ss:SSS
Date.prototype.format = function(format) {
	if (!format) {
		format = "yyyy-MM-dd hh:mm:ss";
	}
	var _oDatePre = {
		"y+" : this.getFullYear(),// Year
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"S+" : this.getMilliseconds()// millisecond
	};
	for ( var _s in _oDatePre) {
		if (new RegExp("(" + _s + ")").test(format)) {
			var _sValue = _oDatePre[_s];
			var _sLength = RegExp.$1.length;
			var _sFormatValue = "";
			if (_sValue.toString().length < _sLength) {
				for ( var i = 0; i < _sLength - _sValue.toString().length; i += 1) {
					_sFormatValue += "0";
				}
			}
			_sFormatValue += _sValue.toString();
			format = format.replace(RegExp.$1, _sFormatValue);
		}
	}
	return format;
};

// 继承机制(该继承方式只会继承父类中的原型，不会继承父类自己本身的属性和方法)
Helper.inherits = function(fSubclass, fSuperclass) {
	var F = function() {
	};
	F.prototype = fSuperclass.prototype;
	fSubclass.prototype = new F();
	fSubclass.prototype.constructor = fSuperclass;// 子类中保存父类的信息,主要用于子类原型重写父类原型方法后,可以调用到父类原型方法
	fSubclass.prototype.selfConstructor = fSubclass;// 保存自己类信息
};

Helper.Index = function() {
	var index = 1000;
	this.getIndex = function() {
		return index += 1;
	};
};

Helper.Map = function() {
	this.obj = {};
	this.prefix = "imap_key_prefix_";
	this.length = 0;
};
Helper.Map.prototype.put = function(key, value) {
	if (!this.hasKey(key)) {
		this.length += 1;
	}
	this.obj[this.prefix + key] = value;
};
Helper.Map.prototype.get = function(key) {
	return this.obj[this.prefix + key];
};
Helper.Map.prototype.remove = function(key) {
	if (this.hasKey(key)) {
		var _oValue = this.get(key);
		delete this.obj[this.prefix + key];
		this.length -= 1;
		return _oValue;
	}
};
Helper.Map.prototype.clear = function() {
	for ( var fo in this.obj) {
		if (this.obj.hasOwnProperty(fo)) {
			delete this.obj[fo];
		}
	}
	this.length = 0;
};
Helper.Map.prototype.hasKey = function(key) {
	var flag = this.obj.hasOwnProperty(this.prefix + key);
	return flag;
};
Helper.Map.prototype.size = function() {
	return this.length;
};
Helper.Map.prototype.values = function() {
	var _aArrays = [];
	for ( var fo in this.obj) {
		if (this.obj.hasOwnProperty(fo)
				&& fo.substring(0, this.prefix.length).toLowerCase() === this.prefix) {
			_aArrays.push(this.obj[fo]);
		}
	}
	return _aArrays;
};
Helper.Map.prototype.keys = function() {
	var _aArrays = [];
	for ( var fo in this.obj) {
		if (this.obj.hasOwnProperty(fo)
				&& fo.substring(0, this.prefix.length).toLowerCase() === this.prefix) {
			_aArrays.push(fo.substr(this.prefix.length));
		}
	}
	return _aArrays;
};
/**
 * 缓存类，该类仅供页面查询缓存使用，可以设置缓存的过期时间
 */
Helper.BaseCache = function(p) {
	p = p || {};
	this.maxCacheTimeMM = p.maxCacheTimeMM || -1;// 页面缓存最大毫秒数,小于0则缓存永运不过期
	this.cacheMap = new Helper.Map();
};
Helper.BaseCache.prototype.addCache = function(key, data) {
	var obj = {
		value : data
	};
	if (this.maxCacheTimeMM > 0) {
		obj.timeMM = new Date().getTime();
	}
	this.cacheMap.put(key, obj);
};
Helper.BaseCache.prototype.removeCache = function(key) {
	this.cacheMap.remove(key);
};
Helper.BaseCache.prototype.clearCache = function() {
	this.cacheMap.clear();
};
Helper.BaseCache.prototype.getCache = function(key) {
	var data = this.cacheMap.get(key);
	if (!data)
		return undefined;
	if (this.maxCacheTimeMM <= 0) {
		return data.value;
	} else {
		if (new Date().getTime() <= (data.timeMM + this.maxCacheTimeMM)) {
			return data.value;
		} else {
			this.removeCache(key);
			return undefined;
		}
	}
};
Helper.componentId = new Helper.Index();

//所有自定义组件的标识
Helper.Components = function(p) {
	this.id = p.id || ("component_"+Helper.componentId.getIndex() +"_"+ new Date().getMilliseconds());// 组件ID，注意不要重复
	Helper.setComponent(this.id,this);
	this.getId = function(){
		return this.id;
	};
};
//所有声明的公用组件存放位置
Helper.component = new Helper.Map();

Helper.getComponent = function(id){
	return Helper.component.get(id);
};
Helper.setComponent = function(id,object){
	return Helper.component.put(id,object);
};

/**
 * 基础ajax访问类，该类用于前台页面基础ajax查询，具有缓存功能能，错误处理功能，session过期自动登录功能
 */
Helper.BaseRemote = function(p) {
	p = p || {};
	Helper.Components.call(this, p);// 继承远程访问类
	// =================必须的属性S======================
	this.url = p.url; // 远程访问路径
	// =================必须的属性E======================
	this.params = p.params || {};// 请求参数json格式{param1:1,param2:2}
	this.method = p.method || "post";// 请求方法
	this.isAsync = p.isAsync === undefined ? true : p.isAsync;// 请求方式，默认为异步请求
	// 回调函数
	this.onSuccess = p.onSuccess;// 请求成功后回调方法
	this.onError = p.onError;// 请求失败回调方法
	this.onSystemError = p.onSystemError;//发生系统异常时回调方法,如服务器异常
	this.onComplete = p.onComplete;// 请求完成回调方法
	this.onTimeout = p.onTimeout;// 请求参数回调
	this.timeoutMilli = p.timeoutMilli || 25000;//请求超时毫秒数
	this.onLogin = p.onLogin;//请求需要登陆时回调
	this.maxCacheTimeMM = p.maxCacheTimeMM || -1;// 最大缓存毫秒数,默认不缓存
	this.__baseCache = new Helper.BaseCache( {
		"maxCacheTimeMM" : this.maxCacheTimeMM
	});
	// 内部属性
	this.requestVersion = 0;// 请求版本号，每次请求后该版本号递增
};
Helper.BaseRemote.prototype.addParameters = function(key, value) {
	if (Helper.isNotNull(key)) {
		this.params[key] = value;
	}
};
Helper.BaseRemote.prototype.removeParameters = function(key) {
	if (Helper.isNotNull(key)) {
		delete this.params[key];
	}
};
Helper.BaseRemote.prototype.getParameters = function(key) {
	if (Helper.isNotNull(key)) {
		return this.params[key];
	}
	return undefined;
};
Helper.BaseRemote.prototype.send = function(isRefreshLoad) {
	var THIS = this;
	// 默认如果有缓存,则直接使用缓存的数据
	isRefreshLoad = isRefreshLoad === undefined ? false : isRefreshLoad;
	THIS.requestVersion += 1;
	if (THIS.maxCacheTimeMM > 0 && !isRefreshLoad) {
		var _paramsStr = THIS.getParamsStr();
		var _key = THIS.url.split("?")[0] + ":" + _paramsStr;
		if (_key) {
			var data = THIS.__baseCache.getCache(_key);
			if (data != undefined) {
				if (typeof (THIS.success) === 'function') {
					THIS.success(data);
				}
				return;
			}
		}
	}
	// 使用闭包功能，控制请求版本号
	var _sRequestKey = null;
	if (THIS.maxCacheTimeMM > 0) {
		var _paramsStr = this.getParamsStr();
		_sRequestKey = THIS.url.split("?")[0] + ":" + _paramsStr;
	}
	-function(version, _sRequestKey) {
		$.ajax( {
			type : THIS.method,
			url : THIS.url.split("?")[0],
			data : THIS.getParams(),
			dataType : "html",
			timeout : THIS.timeoutMilli,
			async : THIS.isAsync,
			success : function(data, status, XMLHttpRequest) {
				if (version !== THIS.requestVersion) {
					return;
				}
				// 请求错误
			if (XMLHttpRequest.getResponseHeader("xmlHttpRequestError")) {
				THIS.error($.parseJSON(data), status);
				return;
			}
			// 未登陆
			if (XMLHttpRequest.getResponseHeader("sessionstatus")) {
				if(XMLHttpRequest.getResponseHeader("nologinjump")) {
					location.href = data;
					return;
				}
				window.location.href = Helper.basePath+"/page/login/login.jsp";
				if (typeof (THIS.login) === 'function') {
					THIS.login();
				}
				return;
			}
			// 服务器正常返回
			if (THIS.maxCacheTimeMM > 0 && _sRequestKey) {
				THIS.__baseCache.addCache(_sRequestKey, data);
			}
			THIS.success(data, status);
		},
		error : function(xMLHttpRequest, textStatus, errorThrown) {
			if (textStatus === "timeout") {
				THIS.timeout();
			} else {
				if(typeof(THIS.onSystemError)==="function") {
					THIS.onSystemError();
				} else {
				}
			}
		},
		complete : function() {
			THIS.complete();
		}
		});
	}(THIS.requestVersion, _sRequestKey);
};
Helper.BaseRemote.prototype.complete = function() {
	if (typeof (this.onComplete) === 'function') {
		this.onComplete();
	}
};
Helper.BaseRemote.prototype.success = function(data, status) {
	if (typeof (this.onSuccess) === 'function') {
		this.onSuccess(data, status);
	}
};
Helper.BaseRemote.prototype.error = function(jsondata, status) {
	if (typeof (this.onError) === 'function') {
		this.onError(jsondata, status);
	} else {
		if (jsondata.message) {
			Helper.message(jsondata.message);
		}
	}
};

Helper.BaseRemote.prototype.timeout = function() {
	if (typeof (this.onTimeout) === 'function') {
		this.onTimeout();
	} else {
		//Helper.message("请求超时!");
	}
};
// 获取提交参数
Helper.BaseRemote.prototype.getParams = function() {
	var _content = {};
	var prop;
	for ( var element_client in this.params) {
		prop = this.params[element_client];
		if (prop !== undefined && prop !== null && typeof prop != "function") {
			_content[element_client] = prop;
		}
	}
	// 分解请求中的url参数
	if (this.url) {
		var m = this.url.split("?");
		if (m[1]) {
			var t = m[1].split("&");
			for ( var i = 0; i < t.length; i++) {
				var subt = t[i].split("=");
				if (subt[1]) {
					_content[subt[0]] = subt[1];
				}
			}
		}
	}
	return _content;
};
Helper.BaseRemote.prototype.login = function(){
	if(typeof(this.onLogin) === "function") {
		this.onLogin();
	}
};
// 获取提交参数的字符串形式
Helper.BaseRemote.prototype.getParamsStr = function() {
	var _paramsObj = this.getParams();
	var _content = "";
	var prop;
	for ( var name in _paramsObj) {
		prop = _paramsObj[name];
		if (prop) {
			if (_content !== "") {
				_content = _content + ",";
			}
			if (typeof prop == "number" || typeof prop == "string") {
				_content = _content + name + ":" + prop;
			} else if (typeof prop == "object" && prop.constructor === Array
					&& prop.length > 0) {
				var _aParam = prop;
				_content = _content + name + ":[";
				for ( var i = 0; i < _aParam.length; i += 1) {
					if (i !== 0) {
						_content = _content + ",";
					}
					_content = _content + _aParam[i];
				}
				_content = _content + "]";
			}
		}
	}
	return _content;
};

/**
 * 纯Json格式请求,扩展Helper.BaseRemote类
 */
Helper.RemoteTrans = function(p) {
	p = p || {};
	Helper.BaseRemote.call(this, p);// 继承远程访问类
	this.loading = p.loading === undefined ? false : p.loading;// 是否显示loading效果
	this.successRediectUrl = p.successRediectUrl || null;// 请求成功后跳转到的页面，优先级高
	this.isRepeat = p.isRepeat === undefined ? true : p.isRepeat;// 是否可重复提交，默认为可以
	this.loadingdiv = this.id+"loading_div";
	this.loadingText = "<div id='"+this.loadingdiv+"'><div class='all_zz_body'></div><div class='all_zz_list'><div class='red all_zz_list2'><img src='"+Helper.basePath+"/images/loading/loading_long.gif' align='absmiddle' /> <br />系统加载中...</div></div></div>";
	this.sending = false;// 避免用户快速点击多次，向服务器发送多次重复的请求
	this.isAlreadyTrans = false;//是否已经成功交易过一次，防止表单重复提交
};
Helper.inherits(Helper.RemoteTrans, Helper.BaseRemote);

Helper.RemoteTrans.prototype.reset = function() {
	this.params = {};
};
Helper.RemoteTrans.prototype.send = function() {
	if (this.sending || (!this.isRepeat && this.isAlreadyTrans)) {
		return;
	}
	this.sending = true;
	// 加入交易等待效果
	if(this.loading){
		$(document.body).append(this.loadingText);
	}
	Helper.RemoteTrans.prototype.constructor.prototype.send.call(this);
};
Helper.RemoteTrans.prototype.success = function(data, status) {
	var jsonData = $.parseJSON(data);
	if (jsonData.isSuccess === undefined || jsonData.isSuccess) {
		this.isAlreadyTrans = true;
		if (this.successRediectUrl) {
			location.href = this.successRediectUrl;
			return;
		} else if (this.onSuccess && typeof (this.onSuccess) === 'function') {
			this.onSuccess(jsonData, status);
		}
	} else {
		this.error(jsonData, status);
	}
};
Helper.RemoteTrans.prototype.complete = function() {
	if(this.loading) {
		document.body.removeChild(Helper.id(this.loadingdiv));
	}
	if (typeof (this.onComplete) === 'function') {
		this.onComplete();
	}
	this.sending = false;
};

/**
 * 远程渲染查询,查询出来的结果直接渲染到DIV中,扩展Helper.BaseRemote类
 */
Helper.RemoteQuery = function(p) {
	p = p || {};
	Helper.BaseRemote.call(this, p);// 继承远程访问类
	this.renderId = p.renderId;// 渲染的divID
	this.loadingText = "<div class='vc'><div class='vcinfo'><div class='content_cont red'><img src='"+Helper.basePath+"/images/loading/loading_16_3.gif' /> 加载中...</div></div></div>";
	this.loading = p.loading === undefined ? true : p.loading;// 是否显示loading效果
	this.lastLoadData = null;//最近一次查询成功的数据

	this.login = function(){
		$("#" + this.renderId).html(this.lastLoadData);
		if(typeof(this.onLogin) === "function") {
			this.onLogin();
		}
	};
	this.onSystemError = function(){
		$("#" + this.renderId).html(this.lastLoadData);
		Helper.message("系统繁忙,请重新刷新页面!");
		//location.href=Helper.basePath+"/repair_page.jsp";
	};
};
Helper.inherits(Helper.RemoteQuery, Helper.BaseRemote);

Helper.RemoteQuery.prototype.success = function(data, status) {
	if (this.renderId) {
		$("#" + this.renderId).html(data);
	}
	if (typeof (this.onSuccess) === 'function') {
		this.onSuccess(data, status);
	}
};

Helper.RemoteQuery.prototype.send = function() {
	if(this.loading && this.renderId) {
		this.lastLoadData = $("#" + this.renderId).html();
		$("#" + this.renderId).html(this.loadingText);
	}
	// 加入查询等待效果
	Helper.RemoteQuery.prototype.constructor.prototype.send.call(this);
};

// 分页工具条
Helper.PageBar = function(p) {
	p = p || {};
	Helper.RemoteQuery.call(this, p);// 继承远程访问类
	this.pageSize = p.pageSize || 31;// 页大小(默认20页)
	this.pageBlurCount = p.pageBlurCount || 7;// 要显示的工具栏数目(默认9个)
	this.pageBarId = p.pageBarId;// 分页工具条所在DIV
	this.setPages = p.setPages;//设置后台接受当前页和页大小的参数
	this.currentPage = 1;// 当前页
	//计算出
	this.totalSize = 0;// 总共记录数
	this.totalPageSize = 0;// 总共页大小
	this.totalCountHiddenName = p.totalCountHiddenName || "pagebar_totalSize";
	this.startPage;//// 分页条开始页数
	this.endPage;// 分页条结束页数
	this.onSort = p.onSort;//设置排序参数
	this.sortField;//排序字段
	this.sortType = "DESC";//排序类型
	var THIS = this;
	this.jump = function(num){
		if (num === THIS.currentPage) {
			return;
		}
		THIS.currentPage = num;
		if (this.setPages && typeof (this.setPages) === 'function') {
			this.setPages(this.currentPage, this.pageSize);
		} else {
			this.addParameters("currentPage",this.currentPage);
			this.addParameters("pageSize",this.pageSize);
		}
		Helper.PageBar.prototype.constructor.prototype.send.call(this);
	};
	this.pre = function(){
		var _nCurrent = THIS.currentPage - 1;
		if (_nCurrent <= 1) {
			_nCurrent = 1;
		}
		if (_nCurrent > THIS.totalPageSize) {
			_nCurrent = THIS.totalPageSize;
		}
		THIS.jump(_nCurrent);
	};
	this.next = function(){
		var _nCurrent = THIS.currentPage + 1;
		if (_nCurrent <= 1) {
			_nCurrent = 1;
		}
		if (_nCurrent > THIS.totalPageSize) {
			_nCurrent = THIS.totalPageSize;
		}
		THIS.jump(_nCurrent);
	};
	this.frist = function(){
		THIS.jump(1);
	};
	this.last = function(){
		THIS.jump(THIS.totalPageSize);
	};
	this.setSorts = function(field,type){
		if(typeof(this.onSort)==="function"){
			this.onSort(field,type);
		}else {
			this.addParameters("sortField",field);
			this.addParameters("sortType",type);
		}
		this.sortField = field;
		this.sortType = type;
	};
};
Helper.inherits(Helper.PageBar, Helper.RemoteQuery);

Helper.PageBar.prototype.initBar = function(){
	var THIS = this;
	$("#" + THIS.pageBarId).hide();
	if (THIS.totalSize <= 0) {
		$("#" + THIS.pageBarId).text("");
		return;
	}
	var _sCenter = "";
	// 总记录数不够分页栏显示，全部显示
	if (THIS.pageBlurCount > THIS.totalPageSize) {
		for ( var i = 1; i <= THIS.totalPageSize; i += 1) {
			if (i === THIS.currentPage) {
				_sCenter += "<span class='page-cur'>"+i+"</span>";
			} else {
				_sCenter += "<a name='pagebar_page' href='javascript:void(0);'>"+i+"</a>";
			}
		}
		this.startPage = 1;
		this.endPage = this.totalPageSize;
	}else{
		var _nQian = Helper.parseInt(THIS.pageBlurCount / 2, 10);// 当前页按钮前面显示的按钮个数
		var _nHou = THIS.pageBlurCount - _nQian - 1;// 当前页按钮后面显示的按钮个数
		// 如果前面按钮个数不足，则减少
		while (THIS.currentPage <= _nQian) {
			_nQian -= 1;
		}
		// 如果后面按钮个数不足，则增加前面的个数
		while (THIS.currentPage + _nHou > THIS.totalPageSize) {
			_nQian += 1;
			_nHou -= 1;
		}
		// 分页条从多少开始显示
		var _nCurrent = THIS.currentPage - _nQian;
		this.startPage = _nCurrent;
		this.endPage = this.startPage + THIS.pageBlurCount - 1;
		for ( var i = 0; i < THIS.pageBlurCount; i += 1) {
			if (_nCurrent === THIS.currentPage) {
				_sCenter += "<span class='page-cur'>"+_nCurrent+"</span>";
			} else {
				_sCenter += "<a name='pagebar_page' href='javascript:void(0);'>"+_nCurrent+"</a>";
			}
			_nCurrent += 1;
		}
	}
	if(this.endPage<this.totalPageSize) {
		_sCenter += "<span class='page-break'>...</span>";
	}
	var _sTop = "<div style='height: 35px; padding: 3px;'><div class='paginations'><div class='page-bottom'><a class='page-start' name='pagebar_frist' href='javascript:void(0);'><span>首页</span></a><a class='page-prev' name='pagebar_pre' href='javascript:void(0);'><span>上一页</span></a>";
	var _sBottom = "<a class='page-next' href='javascript:void(0);' name='pagebar_next'><span>下一页</span></a><a class='page-end' href='javascript:void(0);' name='pagebar_last'><span>末页</span></a><span class='page-skip'> <span class='inputcheckbox l' style='margin-top: 2px;'>共"+this.totalPageSize+"页 到第 <input value='1' size='3' name='pagebar_page_text' type='text' />页</span><button type='button' name='pagebar_go'>确定</button></span></div></div></div>";
	var _sPageBarHtml = _sTop+_sCenter+_sBottom;
	$("#" + THIS.pageBarId).html(_sPageBarHtml);
	$("#" + THIS.pageBarId+">div>div>div>a[name='pagebar_frist']").click(THIS.frist);
	$("#" + THIS.pageBarId+">div>div>div>a[name='pagebar_pre']").click(THIS.pre);
	$("#" + THIS.pageBarId+">div>div>div>a[name='pagebar_next']").click(THIS.next);
	$("#" + THIS.pageBarId+">div>div>div>a[name='pagebar_last']").click(THIS.last);
	$("#" + THIS.pageBarId+">div>div>div>span>button[name='pagebar_go']").click(function(){
		var _goPage = Helper.parseInt($(this).prev().find("input[name='pagebar_page_text']").val());
		THIS.jump(_goPage);
	});
	var _oCurrentPageText = $("#" + THIS.pageBarId+">div>div>div>span>span>input[name='pagebar_page_text']");
	_oCurrentPageText.val(THIS.currentPage);
	Helper.doms.numberKeyupMinMax(_oCurrentPageText[0], 1,THIS.totalPageSize);
	$("#"+THIS.pageBarId+">div>div>div>a[name='pagebar_page']").click(function(){
		THIS.jump(Helper.parseInt($(this).text()));
	});
	//设置排序
	$("#" + THIS.renderId+">table>thead>tr>td>a[name='sort']").click(function(){
		var sortField = $(this).attr("lang");
		var sortType;
		if(sortField && sortField===THIS.sortField) {
			if(THIS.sortType==="DESC") {
				sortType = "ASC";
			}else{
				sortType = "DESC";
			}
			THIS.setSorts(sortField,sortType);
		}else {
			THIS.setSorts(sortField,THIS.sortType);
		}
		THIS.send();
	});
	// 深圳官网3338
	if('szlotpagebur_div' == THIS.pageBarId || 'szlotpagebur_divs' == THIS.pageBarId)
	{
		var typeId = $('#typeId').val();
		if('fxyc' == typeId)
		{
			$("#szlotnews_list_div").show();
			$("#szlotpagebur_div").show();
			$("#szlotnews_list_divs").hide();
			$("#szlotpagebur_divs").hide();
		}
		else if('tzjq' == typeId)
		{
			$("#szlotnews_list_divs").show();
			$("#szlotpagebur_divs").show();
			$("#szlotnews_list_div").hide();
			$("#szlotpagebur_div").hide();
		}
	}
	else
	{
		$("#" + THIS.pageBarId).show();
	}
};
Helper.PageBar.prototype.success = function(data, status){
	Helper.PageBar.prototype.constructor.prototype.success.call(this,data,status);
	this.totalSize = Helper.getTextInt(this.totalCountHiddenName);
	if (!this.totalSize) {
		this.totalSize = 0;
	}
	if (this.totalSize <= 0) {
		this.totalPageSize = 0;
	} else {
		// 页总大小
		var totalPage = this.totalSize / this.pageSize;
		// 计算总共页数
		totalPage = (totalPage === Helper.parseInt(totalPage)) ? totalPage
				: Helper.parseInt(totalPage) + 1;
		this.totalPageSize = totalPage;
	}
	this.initBar();
};

Helper.PageBar.prototype.send = function(){
	this.currentPage = 1;//当有条件查询时,页数自动跳转到第一页
	if (this.setPages && typeof (this.setPages) === 'function') {
		this.setPages(this.currentPage, this.pageSize);
	} else {
		this.addParameters("currentPage",this.currentPage);
		this.addParameters("pageSize",this.pageSize);
	}
	Helper.PageBar.prototype.constructor.prototype.send.call(this);
};

// 简单分页控件
Helper.PageSimple = function(p) {
	Helper.PageBar.call(this, p);
	this.cls = p.cls || "t_r";
	this.isInit = false;
};
Helper.inherits(Helper.PageSimple, Helper.PageBar);

Helper.PageSimple.prototype.initBar = function(){
	var THIS = this;
	if(THIS.isInit === false) {
		THIS.isInit = true;
		var _pageBur = "<div class='t_r'>记录<span lang='total_count_span'></span>条　共<span lang='total_page_span'></span>页　第<span lang='current_page_span'></span>页　<a href='javascript:void(0);' name='pagebar_frist' class='d_blue'>首页</a>　<a href='javascript:void(0);' name='pagebar_pre' class='d_blue'>上一页</a>　<a href='javascript:void(0);' class='d_blue' name='pagebar_next'>下一页</a>　<a href='javascript:void(0);' name='pagebar_bottom' class='d_blue'>尾页</a></div>";
		$("#" + THIS.pageBarId).html(_pageBur);
		$("#"+THIS.pageBarId+">div>a[name='pagebar_frist']").click(function(){
			THIS.frist();
		});
		$("#"+THIS.pageBarId+">div>a[name='pagebar_pre']").click(function(){
			THIS.pre();
		});
		$("#"+THIS.pageBarId+">div>a[name='pagebar_next']").click(function(){
			THIS.next();
		});
		$("#"+THIS.pageBarId+">div>a[name='pagebar_bottom']").click(function(){
			THIS.last();
		});
	}
	$("#"+THIS.pageBarId+">div>span[lang='total_count_span']").text(THIS.totalSize);
	$("#"+THIS.pageBarId+">div>span[lang='total_page_span']").text(THIS.totalPageSize);
	$("#"+THIS.pageBarId+">div>span[lang='current_page_span']").text(THIS.currentPage);
};

// 弹出框 iframe方式
Helper.Window = function(p) {
	p = p || {};
	Helper.BaseRemote.call(this, p);
	// 可设置属性
	this.title = p.title || "信息框";// 对话框标题
	this.height = p.height || 200;// 弹窗的高度
	this.width = p.width || 400;// 弹出的宽度
	this.zindex = p.zindex || 1993;//弹出层堆叠顺序 
	this.html = p.html;
	this.onComplete = p.onComplete;//加载完成后回调的方法

	this.shadow = p.shadow === undefined ? true : p.shadow;// 是否需要底层阴影
	// 私有属性
	var colseId = this.id + "_close";// 关闭控件ID
	var divId = this.id + "_showdiv";// 弹出div的ID
	var drawDiv = this.id + "_drawdiv";// 遮罩层ID
	var _nTopPx = -(this.height / 2 + 20);
	var _fopacity = this.shadow ? 30 : 0;
	var _iopacity = this.shadow ? 0.3 : 0;
	var topText = "<div id="
			+ divId
			+ "><div id="
			+ drawDiv
			+ " style='filter:alpha(opacity="+_fopacity+");opacity:"+_iopacity+";' class='mask_body'></div><div class='aui_dialog_wrap aui_default' " +
					"style='z-index:"+ this.zindex +"; visibility: visible;'><div class='aui_dialog art_focus art_opacity' style='margin-top: "
			+ _nTopPx
			+ "px;opacity:1;' id='mask_body_int'><table border='0' cellpadding='0' cellspacing='0' class='aui_table' style='margin: 0 auto;'><tbody><tr><td class='aui_border aui_left_top'></td><td class='aui_border aui_top'></td><td class='aui_border aui_right_top'></td></tr><tr><td class='aui_border aui_left'></td><td class='aui_center'><div class='bai_bg'><div class='ui_title_tipbox' style='position: relative'>";
	topText += "<div class='ui_title_text'><span class='ui_title_icon'></span>"
			+ this.title + "</div><a class='ui_close r' id=" + colseId
			+ " href='javascript:void(0)'>×</a></div>";
	topText += "<div style='height: " + this.height
			+ "px;width: " + this.width + "px;padding: 5px;'>";
	var bottomText = "</div></div></td><td class='aui_border aui_right'></td></tr><tr><td class='aui_border aui_left_bottom'></td><td class='aui_border aui_bottom'></td><td class='aui_border aui_right_bottom'></td></tr></tbody></table></div></div></div>";
	var THIS = this;
	// 关闭窗口
	this.close = function() {
		document.body.removeChild(Helper.id(divId));
	};
	// 显示窗口
	this.show = function() {
		if ($("#" + divId)[0]) {
			return;
		}
		var _sText = topText;
		if (Helper.isNotNull(this.html)) {
			_sText += this.html;
		} 
		else if(Helper.isNotNull(this.url)){
			this.send();
			return;
		}
		else {
			return;
		}
		_sText += bottomText;
		$(document.body).append(_sText);
		$("#" + colseId + ",#" + drawDiv).click(function() {
			THIS.close();
		});
	};
	this.success = function(data){
		var _sText = topText;
		_sText += data;
		_sText += bottomText;
		$(document.body).append(_sText);
		$("#" + colseId + ",#" + drawDiv).click(function() {
			THIS.close();
		});
		if(typeof(this.onComplete)==="function"){
			this.onComplete();
		};
	};
};
Helper.inherits(Helper.Window, Helper.BaseRemote);

// js表单提交基类
Helper.BaseForm = function(url, method, params, target, windows) {
	var THIS = this;
	this.url = url;
	this.target = target;
	this.method = method ? method : "post";
	this.submit = function() {
		// var _aParams = THIS.getParams();
		var _aParams = params;
		var dom = windows == null ? document : windows.document;
		var form = dom.createElement("form");
		if (_aParams) {
			for ( var p in _aParams) {
				if (_aParams[p] === undefined || _aParams[p] === null) {
					continue;
				}
				if (_aParams[p].constructor === Array) {
					var _aParam = _aParams[p];
					for ( var i = 0; i < _aParam.length; i += 1) {
						var hide = dom.createElement("input");
						hide.type = "hidden";
						hide.name = p;
						hide.value = _aParam[i];
						form.appendChild(hide);
					}
				} else {
					var hide = dom.createElement("input");
					hide.type = "hidden";
					hide.name = p;
					hide.value = _aParams[p];
					form.appendChild(hide);
				}
			}
		}
		form.method = method ? method : "post";
		form.action = url;
		form.target = target ? target : "_self";
		dom.body.appendChild(form);
		form.submit();
	};
};

Helper.TextRemark = function(p) {
	p = p || {};
	Helper.Components.call(this, p);
	this.renderId = p.renderId;
	this.remarkText = p.remarkText || $("#" + this.renderId).val();
	var _oDom = $("#" + this.renderId);
	var THIS = this;
	_oDom.val(this.remarkText);
	_oDom.css( {
		"color" : "#666"
	});
	_oDom.click(function() {
		if ($("#" + THIS.renderId).val().trim() === THIS.remarkText.trim()) {
			$("#" + THIS.renderId).css( {
				"color" : null
			});
			$("#" + THIS.renderId).val("");
		}
	});
	_oDom.blur(function() {
		if ($("#" + THIS.renderId).val().trim() === "") {
			$("#" + THIS.renderId).css( {
				"color" : "#666"
			});
			$("#" + THIS.renderId).val(THIS.remarkText);
		}
	});
	this.getValue = function() {
		if ($("#" + this.renderId).val().trim() === this.remarkText.trim()) {
			return "";
		} else {
			return $("#" + this.renderId).val();
		}
	};
	this.onChange=function(){
		if ($("#" + THIS.renderId).val().trim() === THIS.remarkText.trim()) {
			$("#" + THIS.renderId).css( {
				"color" : "#666"
			});
		}else {
			$("#" + THIS.renderId).css( {
				"color" : null
			});
		}
	};
	this.clear = function(){
		$("#" + THIS.renderId).css( {
			"color" : "#666"
		});
		$("#" + THIS.renderId).val(THIS.remarkText);
	};
};

Helper.Timmer = function(p) {
	this.milli=p.milli;//执行间隔,毫秒数
	this.count = p.count || -1;//-1表示无限执行
	this.call = p.call;//执行的函数
	this.timmer = null;
	this.doCount = 0;//已经执行的次数
	this.isRun = false;//是否正在执行中
	var THIS = this;
	this.start = function(){
		if(!THIS.isRun && THIS.doCount===0) {
			THIS.isRun=true;
			THIS.timmer=setInterval(function(){
				if(THIS.count>0 && THIS.doCount>=THIS.count) {
					THIS.stop();
					return;
				}else{
					p.call();
					THIS.doCount+=1;
				}
			},THIS.milli);
		}
	};
	this.stop = function(){
		if(THIS.timmer) {
			clearInterval(THIS.timmer);
		}
		THIS.doCount = 0;
		THIS.isRun = false;
		THIS.timmer = null;
	};
};

// 公用消息显示方法
Helper.message = function(sMessage) {
	alert(sMessage);
};

Helper.confirm = function(text, sure, esc) {
	if (confirm(text)) {
		if (sure && typeof (sure) === 'function') {
			sure();
		}
	} else {
		if (esc && typeof (esc) === 'function') {
			esc();
		}
	}
};

// 公用工具方法
Helper.tools = {
		combine : function(result,data,list,count,low) {
		if (count == 0){
			result.push(list.copy());
		}else{
			for (var i = low; i < data.length; i+=1)
			{
				list.push(data[i]);
				Helper.tools.combine(result,data, list, count - 1, i + 1);
				list.pop();
			}
		}
	},
	/**
	 * method 获得文本框内的字符长度，1中文字符等于2长度
	 */
	getCharCount : function(str) {
		var sum = 0;
		for ( var i = 0, len = str.length; i < len; i++) {
			if ((str.charCodeAt(i) >= 0) && (str.charCodeAt(i) <= 255)) {
				sum = sum + 1;
			} else {
				sum = sum + 2;
			}
		}
		return sum;
	},
	getFormatMoney : function(num, n) {
		if (num && n) {
			num = parseFloat(num);
			num = String(num.toFixed(n));
			var re = /(-?\d+)(\d{3})/;
			while (re.test(num)) {
				num = num.replace(re, "$1,$2");
			}
			return num;
		} else {
			return "0.00";
		}
	},
	//[1,2,2] 去掉重复[1,2]
	getUnsameNumber:function(codes){
		var numbers = [];
		for(var i=0;i<codes.length;i+=1) {
			if(!numbers.contains(codes[i])) {
				numbers.push(codes[i]);
			}
		}
		return numbers;
	},
	// 一位数组转化为二维数组
	changeArray : function(arr) {
		var targetArr = new Array();
		for ( var i = 0; i < arr.length; i++) {
			targetArr[i] = new Array();
			targetArr[i][0] = arr[i];
		}
		return targetArr;
	},
	// 把1位的数字号码转换为2位
	convert : function(nCode) {
		if (nCode.toString().length === 1) {
			return "0" + nCode.toString();
		} else {
			return nCode.toString();
		}
	},
	// 生成玩法的投注数据
	fillArray : function(nStart, nEnd) {
		var _aData = [];
		for ( var i = nStart; i <= nEnd; i += 1) {
			_aData.push(this.convert(nStart));
		}
		return _aData;
	},
	// 冒泡排序
	sort : function(aArray) {
		if (!aArray)
			return;
		for ( var i = 0; i <= aArray.length; i++) {
			for ( var j = 0; j < aArray.length - i - 1; j += 1) {
				if (Helper.doms.parseInt(aArray[j], 10) > Helper.doms.parseInt(
						aArray[j + 1], 10)) {
					var _temp = aArray[j];
					aArray[j] = aArray[j + 1];
					aArray[j + 1] = _temp;
				}
			}
		}
	},
	// bRepeat:是否可以重复,isAllRepeat所有号码是否可以重复,用于数字型彩票
	getRandom : function(nMin, nMax, nLeng, bRepeat, isAllRepeat) {
		if (!bRepeat) {
			if (nMax - nMin + 1 < nLeng) {
				Helper.message("没有这么多号码可以生成！");
				return;
			}
		}
		var _aCodes = [];
		while (_aCodes.length !== nLeng) {
			var code = Math.floor(Math.random() * (nMax + 1 - nMin) + nMin);
			if (bRepeat === true) {
				if (_aCodes.length === (nLeng - 1) && isAllRepeat === false) {
					var _nCount = 0;
					for ( var i = 0; i < _aCodes.length; i += 1) {
						if (_aCodes[i] === code.toString()) {
							_nCount += 1;
						}
					}
					if (_nCount === _aCodes.length) {
						continue;
					}
				}
				_aCodes.push(code.toString());
			} else {
				if (_aCodes.contains(code.toString())) {
					continue;
				}
				_aCodes.push(code.toString());
			}
		}
		return _aCodes;
	},
	// nMin 号码最小值 nMax 号码最大值 nLeng 生成的号码长度 aDan 胆号 aKill 杀号,用于乐透型彩票
	getRandomCode : function(nMin, nMax, nLeng, aDan, aKill) {
		var _aCodes = aDan == undefined ? [] : aDan.slice();
		if (aDan && aDan.length >= nLeng) {
			Helper.message("胆码不能大于等于号码的总长度");
			return;
		}
		if (nLeng > (nMax - nMin) + 1) {
			Helper.message("生成号码个数不能超过号码总范围");
			return;
		}
		while (_aCodes.length !== nLeng) {
			var code = Math.floor(Math.random() * (nMax + 1 - nMin) + nMin);
			if (_aCodes.contains(this.convert(code)))
				continue;
			if (aKill && aKill.contains(this.convert(code)))
				continue;
			_aCodes.push(this.convert(code));
		}
		return _aCodes;
	},
	// 计算阶层 number(计算几次的数)，count（控制计算的次数，例如传5，2，则计算结构为5*4，如果count=0则不控制次数）
	getJieCeng : function(number, count) {
		var j = 0;
		var he = 1;
		for ( var i = number; i >= 1; i = i - 1) {
			if (j >= count && count !== 0) {
				break;
			}
			he = he * i;
			j += 1;
		}
		return he;
	},
	/**
	 * n个里面选r个的组合数
	 */
	getZuHe : function(n, r) {
		var n1 = 1, n2 = 1;
		for ( var i = n, j = 1; j <= r; n1 *= i--, n2 *= j++)
			;
		return n1 / n2;
	}
};
// dom操作
Helper.doms = {
	muberKeyupEmpty : function(dom, success) {
		dom.onkeyup = function() {
			if (dom.value !== "") {
				dom.value = this.value.replace(/[^\d]/g, ""); // 清除“数字”以外的字符
			}
			if (typeof (success) === 'function') {
				success(dom);
			}
		};
		dom.onblur = function() {
			if (typeof (success) === 'function') {
				success(dom);
			}
		};
	},
	numberKeyup : function(dom, success) {
		dom.onkeyup = function() {
			if (dom.value !== "") {
				dom.value = this.value.replace(/[^\d]/g, ""); // 清除“数字”以外的字符
				if (this.value === "0") {
					this.value = 1;
				} else if (this.value.trim() === "") {
					this.value = 1;
				}
				if (typeof (success) === 'function') {
					success(dom);
				}
			}
		};
		dom.onblur = function() {
			if (dom.value === "") {
				dom.value = 1;
				if (typeof (success) === 'function') {
					success(dom);
				}
			}
		};
	},
	numberKeyupMinMax : function(dom, min, max, success) {
		dom.onkeyup = function() {
			if (dom.value !== "") {
				dom.value = this.value.replace(/[^\d]/g, ""); // 清除“数字”以外的字符
				var _nValue = Helper.doms.parseInt(this.value, 10);
				if (_nValue < min) {
					//this.value = min;
				} else if (_nValue > max) {
					this.value = max;
				}
				if (typeof (success) === 'function') {
					success(dom);
				}
			}
		};
		dom.onblur = function() {
			if (dom.value === "") {
				dom.value = min;
				if (typeof (success) === 'function') {
					success(dom);
				}
			}else {
				var _nValue = Helper.doms.parseInt(this.value, 10);
				if (_nValue < min) {
					dom.value = min;
					if (typeof (success) === 'function') {
						success(dom);
					}
				}
			}
		};
	},
	lotCode:function(dom, min, max,numberLength,success){
		dom.onkeyup = function() {
			if (dom.value !== "") {
				dom.value = this.value.replace(/[^\d]/g, ""); // 清除“数字”以外的字符
				var _nValue = Helper.doms.parseInt(this.value, 10);
				if (_nValue < min) {
					this.value = "";
				} else if (_nValue > max) {
					this.value = "";
				}
			}
		};
		dom.onblur = function() {
			if(numberLength && numberLength===2 && dom.value.length===1) {
				dom.value = "0"+dom.value;
			}
			if (typeof (success) === 'function') {
				success(dom);
			}
		};
	},
	enterSub : function(domId, success) {
		Helper.id(domId).onkeydown = function(event) {
			event = (event == null) ? window.event : event;
			if (event.keyCode == 13) {
				success();
			}
		};
	},
	parseInt : function(value, radio) {
		if (value.toString().trim() === "") {
			return 0;
		} else {
			return parseInt(value, radio ? radio : 10);
		}
	}
};

Helper.paramsHtml = function(item) {
	var _sValue = location.search.match(new RegExp("[\?\&]" + item
			+ "=([^\&]*)(\&?)", "i"));
	return _sValue ? _sValue[1] : _sValue;
};

Helper.id = function(id, target) {
	if (id) {
		target = target || "self";
		return window[target].document.getElementById(id);
	} else {
		return undefined;
	}
};

// 判断是否为null
Helper.isNull = function(value) {
	if (value === undefined || value === null) {
		return true;
	}
	return false;
};
Helper.isNotNull = function(value) {
	return !Helper.isNull(value);
};
Helper.isEmpty = function(value) {
	if (Helper.isNull(value) || value.trim() === "") {
		return true;
	} else {
		return false;
	}
};
Helper.parseInt = function(value, radio) {
	return Helper.doms.parseInt(value,radio);
};

Helper.getTextInt = function(id) {
	var value = Helper.id(id).value.trim();
	if(value==="") {
		return 0;
	}else {
		return Helper.parseInt(value);
	}
};
Helper.getHtmlInt=function(id) {
	var value = $("#"+id).text().trim();
	if(value==="") {
		return 0;
	}else {
		return Helper.parseInt(value);
	}
};

//字符校验
Helper.validata = {};
Helper.validata.getByteLength = function(text) {
	if (Helper.isNull(text)) {
		return 0;
	}
	return text.replace(/[^\u0000-\u00ff]/g, "aa").length;
};
// 验证中文
Helper.validata.isChinese = function(obj) {
	r = /[^\u4E00-\u9FA5]/g;
	return !r.test(obj);
};
Helper.validata.isUsername = function(obj) {
	r = /^[A-Za-z0-9\u4E00-\u9FA5]+$/;
	return r.test(obj);
};
Helper.validata.isUserName = function(obj) {
    r = /^[A-Za-z0-9_\u4E00-\u9FA5]+$/;
    return r.test(obj);
};
// --身份证号码验证-支持新的带x身份证
Helper.validata.isIdCardNo = function(pId) {
	if (pId.length != 15 && pId.length != 18)
		return false;
	var Ai = pId.length == 18 ? pId.substring(0, 17) : pId.slice(0, 6) + "19"
			+ pId.slice(6, 16);
	if (!/^\d+$/.test(Ai))
		return false;
	var yyyy = Ai.slice(6, 10), mm = Ai.slice(10, 12) - 1, dd = Ai
			.slice(12, 14);
	var d = new Date(yyyy, mm, dd), year = d.getFullYear(), mon = d.getMonth(), day = d
			.getDate(), now = new Date();
	if (year != yyyy || mon != mm || day != dd || d > now
			|| !Helper.validata.isValidData(dd, mm, yyyy))
		return false;
	return Helper.validata.isIdcardCheckno(pId);
};
// 身份证最后一位验证码验证
Helper.validata.isIdcardCheckno = function(idNo) {
	if (idNo.length == 15)
		return true;
	else {
		var a = [];
		for ( var i = 0; i < idNo.length - 1; i++) {
			a[a.length] = idNo.substring(i, i + 1);
		}
		var w = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]; //
		var sum = 0; // 和
		var model = 0; // 模
		var result; // 结果
		var map = [ 1 ]; // 映射
		// 对应替换
		map[0] = 1;
		map[1] = 0;
		map[2] = 'X';
		map[3] = 9;
		map[4] = 8;
		map[5] = 7;
		map[6] = 6;
		map[7] = 5;
		map[8] = 4;
		map[9] = 3;
		map[10] = 2;
		// 求和
		for ( var i = 0; i < a.length; i++) {
			sum += w[i] * a[i];
		}
		// 取模
		model = sum % 11;
		// 对应替换
		result = map[model];
		if (idNo.substring(17, 18) != result)
			return false;
		else
			return true;
	}
};
Helper.validata.isValidData = function(day, month, year) {
	if (month == 1) {
		var leap = (year % 4 == 0 || (year % 100 == 0 && year % 400 == 0));
		if (day > 29 || (day == 29 && !leap)) {
			return false;
		}
	}
	return true;
};

/**
 * 判断是否年满18
 */
Helper.validata.suiTableAge = function(pId) {
	var Ai = pId.length == 18 ? pId.substring(0, 17) : pId.slice(0, 6) + "19" + pId.slice(6, 16);
	var yyyy = Ai.slice(6, 10), mm = Ai.slice(10, 12) - 1, dd = Ai.slice(12, 14);
	var time = new Date();
	
	//满足18岁的最低日期
	time.setFullYear(time.getFullYear()-18);
	var now_ms = time.getTime();
	
	//身份证日期
	time.setFullYear(yyyy, mm, dd);
	var idcard_ms = time.getTime();
	
	return (now_ms >= idcard_ms);
};

Helper.validata.isMobile = function(m) {
    var pattern = /^1\d{10}$/;
	return pattern.test(m);
};

Helper.validata.isEmail = function(e) {
	var pattern = /^[_a-zA-Z0-9\-]+(\.[_a-zA-Z0-9\-]*)*@[a-zA-Z0-9\-]+([\.][a-zA-Z0-9\-]+)+$/;
	return pattern.test(e);
};

Helper.validata.isInteger = function(s) {
	var exp = new RegExp(/^\d+$/);
	return exp.test(s);
};
Helper.validata.isTwoFloat = function (s) {
	var exp = new RegExp(/^-?\d+\.?\d{0,2}$/);
	return exp.test(s);
};
Helper.validata.isMoney = function(s) {
	var exp = new RegExp(/^(([1-9]\d*)|0)(\.\d{1,2})?$/);
	return exp.test(s);
};

Helper.validata.isEmpty = function(str) {
	return Helper.isEmpty(str);
};

Helper.validata.isTelephone = function(str) {
	var reg = /^([0-9]|[\-])+$/g;
	if (str.length < 7 || str.length > 18) {
		return false;
	} else {
		return reg.test(str);
	}
};
Helper.validata.isPassword = function(str) {
	var reg = /^[A-Za-z0-9]+$/;
	reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
	return reg.test(str);
};
Helper.validata.validataUname = function(username) {
	var _sErrorMessage = undefined;
	var leng = Helper.validata.getByteLength(username);
	if (Helper.isEmpty(username)) {
		_sErrorMessage = "用户名不能为空";
	} else if (!Helper.validata.isUsername(username)) {
		_sErrorMessage = "用户名含有非法字符";
	} else if (leng < 3 || leng > 16) {
		_sErrorMessage = "用户名字符长度应为3-16之间";
	}
	return _sErrorMessage;
};
Helper.validata.validataPass = function(password) {
	var _sErrorMessage = undefined;
	var len = Helper.validata.getByteLength(password.trim());
	if (password === "") {
		_sErrorMessage = "密码不能为空";
	} else if (len < 6 || len > 16) {
		_sErrorMessage = "密码为6-16位数字和字母组合";
	} else if (!Helper.validata.isPassword(password)){
		_sErrorMessage = "密码为6-16位数字和字母组合";
	}
	return _sErrorMessage;
};
Helper.validata.validataEmail = function(email) {
	var _sErrorMessage = undefined;
	if (email === "") {
		_sErrorMessage = "邮箱地址不能为空";
	} else if (!Helper.validata.isEmail(email)) {
		_sErrorMessage = "邮箱格式不正确";
	} else if (email.length > 50) {
		_sErrorMessage = "邮箱地址过长";
	}
	return _sErrorMessage;
};
Helper.validata.validataMobile = function(mobile) {
	var _sErrorMessage = undefined;
	if (mobile === "") {
		_sErrorMessage = "手机号码不能为空";
	} else if(mobile.length!=11) {
		_sErrorMessage = "请输入11位手机号码";
	}
	else if (!Helper.validata.isMobile(mobile)) {
		_sErrorMessage = "手机号码格式不正确";
	}
	return _sErrorMessage;
};
Helper.custom = {};