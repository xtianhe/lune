/**
 * 统计相关
 */
(function(window){
	var document = window.document,location = window.location, navigator = window.navigator;
	window.logUnCookie=0;
	window.logFrame=0;
	window.logpvid="";
	if (!navigator.cookieEnabled)
	{
		window.logUnCookie=1;
	}
	if (top.location != self.location){
		window.logFrame=1;
	}
	var getCookie = function(name){
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		if(arr != null) return unescape(arr[2]); 
		return null;
	};
	var getPvid = function(len){
			var randchar=["0","1","2","3","4","5","6","7","8","9",
				"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
				"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
						];
			var i=0;
			var r="";
			var d=new Date();
			for (i=0;i<len;i++){
							 var index=parseInt(Math.random()*Math.pow(10,6))%randchar.length;
									  r+=randchar[index];
			}
			return d.getTime()+r;
	}
	var getRPvid = function(){
		try{
			var logRPvid = _yCookie("rpvid") || ""; 
			if(logRPvid == ""){
				return "";
			}
			logRPvid = logRPvid.split("-");
			if((new Date()).getTime() - parseInt(logRPvid[1]) > 10*1000){
				return "";
			}
			return logRPvid[0] || "";
		}catch(ex){
			return "";
		}
	}
	window.logPvid=getPvid(6);
	window.logRPvid=getRPvid();
	window.logExt = "mtype="+getMtype()+"&abtest="+(window.pv_abtest||'');
		
	/**
	 * 优酷pv统计代码
	 */
	var _yserv=1; // service mode (0=local,1=remote,2=both)
	//-- UTM User Settings
	var _yfsc=1; // set client info flag (1=on|0=off)
	var _ydn="auto"; // (auto|none|domain) set the domain name for cookies
	var _yhash="on"; // (on|off) unique domain hash for cookies
	var _ytimeout="1800"; // set the inactive session timeout in seconds
	var _ytsp="|"; // transaction field separator
	var _yflash=1; // set flash version detect option (1=on|0=off)
	var _ytitle=1; // set the document title detect option (1=on|0=off)
	var _ylink=0; // enable linker functionality (1=on|0=off)
	var _yanchor=0; // enable use of anchors for campaign (1=on|0=off)
	var _ytcp="/"; // the cookie path for tracking
	var _ysample=100; // The sampling % of visitors to track (1-100).
	var _yff,_ydh,_ydt,_ybl=0,_ydo="",_yu,_yfns=0,_yns=0,_yr="-",_yfno=0,_yst=0,_ybd=document,_ydl=_ybd.location,_ydlh="",_ywv="1";
	
	if (_ydl.hash) _ydlh=_ydl.href.substring(_ydl.href.indexOf('#'));
	if (!_ytcp || _ytcp=="") _ytcp="/";
	
	var a,b,c,xx,v,z,k,x="",s="",f=0;
	var nx=" expires=Sun, 18 Jan 2038 00:00:00 GMT;";
	var dc=_ybd.cookie;
	_ydh=_yDomain();
	_yu=Math.round(Math.random()*2147483647);
	_ydt=new Date();
	a=dc.indexOf("__ytma="+_ydh);
	b=dc.indexOf("___ymb="+_ydh);
	c=dc.indexOf("__ytmc="+_ydh);
	
	if (_ydn && _ydn!="") {
		_ydo=" domain="+_ydn+";";
	}
	if (_ytimeout && _ytimeout!="") {
		x=new Date(_ydt.getTime()+(_ytimeout*1000));
		x=" expires="+x.toGMTString()+";";
	}
	//发送优酷PV
	function _yInfo(videoCategory, page) {
		var p,s="",dm="",pg=_ydl.pathname+_ydl.search;
		if (page && page!="") pg=_yES(page,1);
		_yr=_ybd.referrer;
		if (!_yr || _yr=="") { _yr="-"; }
		else {
			dm=_ybd.domain;
			if(_ytcp && _ytcp!="/") dm+=_ytcp;
			p=_yr.indexOf(dm);
			if ((p>=0) && (p<=8)) { _yr="0"; }
			if (_yr.indexOf("[")==0 && _yr.lastIndexOf("]")==(_yr.length-1)) { _yr="-"; }
		}
		s+="&utmn="+_yu;
		if ((_yserv==1 || _yserv==2) && _ySP()) {
			var i4=new Image(1,1);
			if(_yCookie("xreferrer")){
				var yrefer = _yCookie("xreferrer");
				if(window.canRemoveXrefer)_yCookie("xreferrer", null);
				window.canRemoveXrefer = true;
			}else{
				var yrefer = _ybd.referrer;
			}
			var from = '';
			try{
				var location = window.location.href.split('?');
				if(location.length > 1){
					var params = location[1].split('&');
					for(var ii=0;ii<params.length; ii++){
						var pp = params[ii].split('=');
						if(pp.length>1){
							 if(pp[0]=='from'){
								from = pp[1];
							 }
						}
					}
					
				}
			}catch(ex){}
			if(from==''){
				if( 'undefined' != typeof(window.from)) {
					from = window.from;
				}
			}
			var i5 = new Image(1,1);
			var tempSrc = '';
			if ( videoCategory && videoCategory != "" ) {
				var tmpCate = videoCategory.split("-");
				if(tmpCate.length >= 2){
					tempSrc = "&"+tmpCate[0]+"=" +videoCategory ;
				}else{
					tempSrc = "&vcate=" + videoCategory ;
				}
			}
			window.logExt += "&unCookie="+window.logUnCookie;
			window.logExt += "&frame="+window.logFrame;
			window.logExt += "&ikuIns=0";
			window.logExt += "&from="+from;
			window.logExt += "&mtype="+getMtype();
			if( 'undefined' != typeof(window.navigator)) {
				if( 'undefined' != typeof(window.navigator.platform)) {
					window.logExt += "&device=" + window.navigator.platform ;
				}
			}
			if('undefined' != typeof(window._stat_topics_cpid)){
				window.logExt += "&cpid=" + window._stat_topics_cpid ;
			}
			//阿里acookie
			var cna = _yCookie("cna") || '';
			window.logExt += "&cna="+cna;

			var logRPvid = window.logRPvid || "";
			_yCookie("rpvid", null);
			var imgSrc = 'http://p.l.youku.com/ypvlog?pvid='+window.logPvid+'&rpvid='+logRPvid+'&yrefer='+encodeURIComponent(yrefer)+tempSrc+"&ext=" + encodeURIComponent(window.logExt);
			i5.src = imgSrc ;
			i5.onload=function() { _yVoid(); }
		}
		return false;;
	}
	function _yVoid() { return false; }
	function _yDomain() {
		if (!_ydn || _ydn=="" || _ydn=="none") {
			_ydn="";
			return 1;
		}
		if (_ydn=="auto") {
			var d=_ybd.domain;
			if ( d.indexOf("yoqoo.com") >=0 ) {
				d = "yoqoo.com";
			}else if( d.indexOf("youku.com") >=0 ) {
				d = "youku.com";
			}else if( d.substring(0,4)=="www." ) {
				d=d.substring(4,d.length);
			}
			_ydn=d;
		}
		if (_yhash=="off")
			return 1;
		return _yHash(_ydn);
	}
	function _yHash(d) {
		if (!d || d=="") return 1;
		var h=0,g=0;
		for (var i=d.length-1;i>=0;i--) {
			var c=parseInt(d.charCodeAt(i));
			h=((h << 6) & 0xfffffff) + c + (c << 14);
			if ((g=h & 0xfe00000)!=0) h=(h ^ (g >> 21));
		}
		return h;
	}
	function __ytmVisitorCode(f) {
		var r=0,t=0,i=0,i2=0,m=31;
		var a=_yGC(_ybd.cookie,"__ytma="+_ydh,";");
		if ((i=a.indexOf(".",0))<0)
			return;
		if ((i2=a.indexOf(".",i+1))>0)
			r=a.substring(i+1,i2);
		else
			return "";
		if ((i=a.indexOf(".",i2+1))>0)
			t=a.substring(i2+1,i);
		else
			return "";
		if (f) {
			return r;
		} else {
			var c=new Array('A','B','C','D','E','F','G','H','J','K','L','M','N','P','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9');
			return c[r>>28&m]+c[r>>23&m]+c[r>>18&m]+c[r>>13&m]+"-"+c[r>>8&m]+c[r>>3&m]+c[((r&7)<<2)+(t>>30&3)]+c[t>>25&m]+c[t>>20&m]+"-"+c[t>>15&m]+c[t>>10&m]+c[t>>5&m]+c[t&m];
		}
	}
		function _yIN(n) {
			if (!n)
				return false;
			for (var i=0;i<n.length;i++) {
				var c=n.charAt(i);
				if ((c<"0" || c>"9") && (c!="."))
					return false;
			}
			return true;
		}
	function _yES(s,u) {
		if (typeof(encodeURIComponent) == 'function') {
			if (u)
				return encodeURI(s);
			else
				return encodeURIComponent(s);
		} else {
			return escape(s);
		}
	}
	function _yUES(s) {
		if (typeof(decodeURIComponent) == 'function') {
			return decodeURIComponent(s);
		} else {
			return unescape(s);
		}
	}
	function _yVG() {
		if((_ydn.indexOf("www.google.") == 0 || _ydn.indexOf(".google.") == 0 || _ydn.indexOf("google.") == 0) && _ytcp=='/') {
			return false;
		}
		return true;
	}
	function _ySP() {
		var s=100;
		if (_ysample)
			s=_ysample;
		if(s>=100 || s<=0)
			return true;
		return ((__ytmVisitorCode(1)%10000)<(s*100));
	}
	function _yGUU(){
		var _myd = new Date();
		return _myd.getTime() +'' + ( 10000 + Math.round( Math.random()*89999 ) );
	}
	function _yRandAUU(){
		var v = Math.round( Math.random()*100 );
		return( 0 == v % 20);
	}
	function _yGCK(key){
		var value = document.cookie.match('(?:^|;)\\s*'+key+'=([^;]*)');
		return value ? unescape(value[1]) : false;
	}
	function aliLog(){
		var VERSION = window.version || "";
		var aplusJsSrc = "http://urchin.lstat.youku.com"+VERSION+"/index/js/aplus_o.js";
		var yk_cookie = _yCookie('__ysuid') || '';
		var yk_user = _yCookie("_l_lgi") || '';
		var exparams = '&aplus&asite=910&yk_cookie='+yk_cookie+'&yk_user='+yk_user;
		var script = document.createElement("script");
		script.src = aplusJsSrc;
		script.id = "open-aplus";
		script.setAttribute("exparams", exparams);
		document.getElementsByTagName("head")[0].appendChild(script);
    }
	aliLog();
	_yInfo(window.cateStr||"");//发送优酷PV
	
	function getMtype(){
		var userAgent = navigator.userAgent;
		if(userAgent.indexOf("Android") !== -1){
			return "adr";
		}else if(userAgent.indexOf("iPad") !== -1){
			return "ipa";
		}else if(userAgent.indexOf("iPhone") !== -1){
			return "iph";
		}else if(userAgent.indexOf("iPod") !== -1){
			return "ipo";
		}else{
			return "oth";
		}
	}
	
	/**
	 * 优酷点击日志
	 */
	var Log = {};
	Log.logCookieKey="logCookieKey";
	Log._addScript=function(src) {
		var g = document.createElement("script");
		g.type = "text/javascript";
		g.src = src;
		document.getElementsByTagName('head')[0].appendChild(g);
	};
	Log.addScript=function(src)//此方法解析数字代表的url
	{ var reg1=new RegExp("@"+1+"@","g"); //创建正则RegExp对象    
	  var reg2=new RegExp("@"+2+"@","g");
	  var reg3=new RegExp("@"+3+"@","g");
	  var reg4=new RegExp("@"+4+"@","g");
	  var reg5=new RegExp("@"+5+"@","g");
	  var reg6=new RegExp("@"+6+"@","g");
	  var reg7=new RegExp("@"+7+"@","g");
	  src=src.replace(reg1,"http://hz.youku.com/red/click.php").replace(reg2,"http://hz.youku.com/red/relatedVideoClick.php").replace(reg3,"http://lstat.youku.com/nstay.php").replace(reg4,"http://e.stat.youku.com/hot/click").replace(reg5,"http://r.l.youku.com/recclick").replace(reg6,"http://r.l.youku.com/rec_at_click").replace(reg7,"http://r.l.youku.com/yrecmclick");
	  src+="&="+Math.floor(Math.random()*1000000);
		Log._addScript(src);
	}
	Log.log=function(category,args,sendType)
	{  if(typeof category!="number")
		return;
		var type=sendType?sendType:0//请求处理的方式,0为cookie,1为直接发送请求,默认为0  
		var url="";
		if(type==0)
		{
			var strCookie=document.cookie;
			var arrCookie=strCookie.split("; ");
			for(var i=0;i<arrCookie.length;i++){ 
				var arr=arrCookie[i].split("="); 

				if(Log.logCookieKey==arr[0]){ 
					if(arr[1]!='invalid')

						url=unescape(arrCookie[i].substring(Log.logCookieKey.length+1,arrCookie[i].length));

					break; 
				} 

			} 
		}     
		url+="@"+category+"@";
		if(typeof args=='object')
		{  argUrl="";
			for (arg in args)
			{ 
				argUrl+="&"+arg+"="+args[arg]
			}
			if(category==4)
			{
				document.cookie="__utmarea="+args.charset+";path=/;domain=youku.com";

			}

			url+="?"+argUrl.substring(1,argUrl.length);}
		else
		{
			if(category==4)
			{
				document.cookie="__utmarea="+args.substring(8,args.length)+";path=/;domain=youku.com";

			}

			url+="?"+args;

		}
		if(type==0)
		{
			url+="^";
			document.cookie=Log.logCookieKey+"="+escape(url)+";path=/;domain=youku.com"; 

		}
		else
		{
			Log.addScript(url);  //直接发送的代码 
		}
	}
	Log.readLogCookie=function()
	{
		var strCookie=document.cookie;
		var arrCookie=strCookie.split("; "); 
		var url=""; 

		found=0;
		for(var i=0;i<arrCookie.length;i++){ 
			var arr=arrCookie[i].split("="); 

			if(Log.logCookieKey==arr[0]){ 
				found=1;
				if(arr[1]=='invalid')
				{ 
					break;
				}


				url=unescape(arrCookie[i].substring(Log.logCookieKey.length+1,arrCookie[i].length));

				requestUrl=url.substring(0,url.length-1).split("^");
				for(var i=0;i<requestUrl.length;i++)
				{
					Log.addScript(requestUrl[i]);
				}


				document.cookie=Log.logCookieKey+"=invalid"+";path=/;domain=youku.com";
				break; 
			} 

		}
	}
	
	function charset_click_v(evt){
		if(!evt) evt = window.event;
		var ret=true; 
		var obj = (evt.target)? evt.target:evt.srcElement;
		if(obj.onclick){ret=false;}
		if(obj.tagName!='A')obj = obj.parentNode;
		if(obj && obj.tagName=='A'){
			var _charsets = [];
				_charsets[0] = (obj.charset)? obj.charset:'';
				_charsets[1] = (obj.getAttribute('_hzcharset'))? obj.getAttribute('_hzcharset'):'';
				_charsets[2] = (obj.getAttribute('atcharset'))? obj.getAttribute('atcharset'):'';
			
			for(var i=0;i<_charsets.length; i++){
			
				if(_charsets[i]=='' || _charsets[i] == undefined) continue;
				var _charset = _charsets[i];
				if(_charset.indexOf("hz-")!==-1){
					var cpStr = _charset.replace("hz-","");
					cpStr = cpStr.split('-');
					cp = cpStr[0];
					cpp = '1000217';
					if(cpStr[1])
					{
						cpp = cpStr[1];
					}
					var logParams = "tp=1&cp="+cp+"&cpp="+cpp;
					Log.log(1, logParams);
				}else if(_charset.indexOf("vc-")!==-1){
					var cp 		= _charset.replace("vc-","");
					var logParams = cp;//cp格式为a=1&b=2
					Log.log(5, logParams);
					//Nova.addScript("http://e.stat.youku.com/recommond/log?"+logParams);
				}
				else if(_charset.indexOf("at-")!==-1){
					var at 		= _charset.replace("at-","");
					var logParams = at;//at格式为a=1&b=2
					Log.log(6, logParams);
				}
				else{
					var prefix_charset="";
					_charset=_charset.replace("400-","").replace("401-","").replace("404-","");
					/** 1 普通视频
					  * 2 专辑播放
					  * 3 节目播放
					  * 4 点播单播放*/
					switch(parseInt(playmode)){
						case 2: prefix_charset="401-";break;
						case 3: prefix_charset="404-";break;
						default:
							prefix_charset="400-";
					}
					_charset = prefix_charset+_charset;
					Log.log(4, "charset="+ _charset);
				}

			}
			
			if(obj.onclick){
				ret=false;
			}
			return ret;
		}else{  
				return true;
		}       
	}
	window.addEventListener("click", function(e){charset_click_v(e);}, false);
	Log.readLogCookie();
	window['Log'] = Log;
})(window);

//监听全站的链接点击事件，检查是否存在data-from属性,并添加from参数至href属性中
(function(o){
	document.addEventListener("click",  function(ev){
		if(!ev) ev = o.event;
		var target = ev.target || ev.srcElement;
		if(!target) {return;} 
		_yCookie("rpvid", window.logPvid  + "-" + (new Date()).getTime());
		if(target.tagName == 'A') {
			var data_from = target.getAttribute("data-from");
			var href = target.getAttribute("href");
			if(data_from && data_from != '') {
				if(href && href.indexOf('http') === 0 && href.indexOf('?from') === -1 && href.indexOf('&from') === -1) {
					data_from = encodeURIComponent(data_from);
					if(href.indexOf('?') !== -1){
						target.setAttribute("href", href+'&from='+data_from);
					}else{
						target.setAttribute("href", href+'?from='+data_from);
					}
				}
			}
		}
	}); 
 })(window);

function _yCookie(name, value, options) {
	if (typeof value != 'undefined') {
		var options = options || {};
		if (value === null) {
				value = '';
				options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString();
		}
		if(!options.path) options.path = '/';
		if(!options.domain) options.domain = 'youku.com';
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else {
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = _yTrim(cookies[i]);
				if (cookie.substring(0, _yTrim(name).length + 1) == (name + '=')) {
					try{
						cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					}catch(ex){}
					break;
				}
			}
		}
		return cookieValue;
	}
}

function _yTrim(s){
	s = s.replace( /(\s*|　*)$/, "");
	s = s.replace( /^(\s*|　*)/, "");
	return s;
}
