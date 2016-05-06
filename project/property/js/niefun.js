/*---------------通用方法----------------*/

//获取当天时间
function getDate() {
	var sDate;
	var d = new Date();
	var day = d.getDate();
	var month = d.getMonth() + 1;
	var year = d.getFullYear();
	sDate = year + "-" + checkNum(month) + "-" + checkNum(day);
	return sDate;
}

function checkNum(val) {
	if (val < 10) {
		val = "0" + val;
	}
	return val;
}

//获取域名
function getHost() {
	var host = "null"
	var url = window.location.href;
	var regex = /.*\:\/\/([^\/]*).*/;
	var match = url.match(regex);
	if (typeof match != "undefined" && null != match) host = match[1];
	return host;
}

//获取一级域名
function getTopHost() {
	var url = window.location.href;
	return url.replace(/http:\/\/.*?([^\.]+\.(com\.cn|org\.cn|net\.cn|[^\.]+))\/.+/, "$1").split("/")[0];
}

//判断网页是否在微信中打开
function is_weixn() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
}

//判断网页是否在新浪微博客户端中打开
function is_weibo() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/WeiBo/i) == "weibo") {
		return true;
	} else {
		return false;
	}
}
//判断网页是否在qq中打开
function is_qq() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/QQ\//i) == "qq/") {
		return true;
	} else {
		return false;
	}
}
//判断操作系统
function Env() {
	var ua = navigator.userAgent.toLowerCase();
	function check(r) {
		return r.test(ua);
	}
	return {
		//操作系统
		mobile: check(/applewebkit.*mobile.*/),
		isWindows: check(/windows|win32/),
		isMac: check(/macintosh|mac os x/)
	}
}

//乱序排序
function sortorder(o) {
	for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

//清除所有cookie
function deleteAllCookie() {
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
		var spcook = cookies[i].split("=");
		if(spcook[0].indexOf('packet_accid')>-1 || spcook[0].indexOf('packet_img')>-1 || spcook[0].indexOf('packet_id')>-1){
			continue;
		}else{
			document.cookie = spcook[0] + "=; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/; domain=" + oDomain;
		}
	}
}

//获取Url参数
function getpara() {
	var url = document.URL;
	var para = "";
	if (url.lastIndexOf("?") > 0) {
		para = url.substring(url.lastIndexOf("?") + 1, url.length);
		var arr = para.split("&");
		para = "";
		for (var i = 0; i < arr.length; i++) {
			var name = arr[i].split("=")[0];
			var key = arr[i].split("=")[1];
			if (name == 'name') {
				sName = decodeURIComponent(key);
			}
			if (name == 'id') {
				sId = decodeURIComponent(key);
				$.cookie('packet_accid', sId, { expires: 1 ,path:'/',domain:oDomain});
			}
			if (name == 'date') {
				sDate = decodeURIComponent(key);
			}
			if (name == 'year') {
				sYear = decodeURIComponent(key);
			}
			if (name == 'place') {
				sPlace = decodeURIComponent(key);
			}
			if (name == 'bs') {
				sBs = decodeURIComponent(key);
			}
			if (name == 'score') {
				sScore = decodeURIComponent(key);
			}
			if (name == 'sex') {
				sSex = decodeURIComponent(key);
			}
			if (name == 'img') {
				if (key != '' && key != 'undefined') {
					sImg = decodeURIComponent(key);
					$.cookie('packet_img', sImg, { expires: 1 ,path:'/',domain:oDomain});
				}
			}
			if (name == 'num') {
				sNum = decodeURIComponent(key);
				$.cookie('packet_id', sNum, { expires: 1 ,path:'/',domain:oDomain});
			}
			if (name == 'level') {
				sLevel = decodeURIComponent(key);
			}
			if (name == 'food') {
				sFood = decodeURIComponent(key);
			}
			if (name == 'frid') {
				sFrid = decodeURIComponent(key);
			}
			if (name == 'api') {
				nowapi = decodeURIComponent(key);
			}
			if (name == 'logflag') {
				logflag = decodeURIComponent(key);
			}
		}
	} else {
		// document.write("没有参数!");
	}
}

//随机1个不重复的数
/*
 * all:总个数
 * count:要随机出来的个数
 * current:当前数
 * 返回Array,eg: [2]
 * */
function createArray(all, count, current) {
	var ary = [];
	ary.push(current);
	while (ary.length < (count + 1)) {
		var tmp = parseInt(Math.random() * all);
		var b = false;
		for (var i = 0; i < ary.length; i++) {
			if (ary[i] == tmp) {
				b = true;
				break;
			}
		}
		if (!b) {
			ary[ary.length] = tmp;
		}
	}
	ary.shift();
	return ary;
}

//动态加载JS CSS 此方法在执行回退页面的时候会出问题，导致js css 不加载的情况。
function include_js(path) {
	var sobj = document.createElement('script');
	sobj.type = "text/javascript";
	sobj.src = path;
	var headobj = document.getElementsByTagName('head')[0];
	headobj.appendChild(sobj);
}
function include_css(path) {
	var fileref = document.createElement("link");
	fileref.rel = "stylesheet";
	fileref.type = "text/css";
	fileref.href = path;
	var headobj = document.getElementsByTagName('head')[0];
	headobj.appendChild(fileref);
}

//随机生成len个字母
function randomString(len) {
	len = len || 32;
	var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
	/****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	var maxPos = $chars.length;
	var pwd = '';
	for (i = 0; i < len; i++) {
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));　　
	}
	return pwd;
}

/*--------------------nieio--------------------*/
//tiping提示框
function tipshow(val) {
	$("#tiptxt").html(val);
	$("#tiping").fadeIn();
	setTimeout(function() {
		$("#tiping").fadeOut();
	},
	2000);
}

//页面访问量超过90W次之后更换新域名。-- 新域名已弃用
function seturl(val) {
	var vals = "";
	if (val < 10) {
		vals = "act0" + val;
	} else {
		vals = "act" + val;
	}
	if (val > 20) {
		vals = "act20";
	}
	for (var key in recommendJSON) {
		recommendJSON[key]["turnurl"] = vals;
	}
}

function getvisitnum() {
	var str = '{"key":"visits"}';
	$.jsonp({
		url: getviewapi,
		data: {
			"req": str
		},
		callback: "success",
		success: function(response) {
			var newnum = Number(response.num);
			console.log(newnum);
			console.log(response);
			seturl(Number(response.typ));
		},
		error: function(xOptions, textStatus) {
			console.log(textStatus);
		}
	});
}

//获取当前页面的id
function getNowNum(val) {
	var urlarr = nowurl.split("?")[0].split("?")[0].split("/");
	var str = urlarr[urlarr.length - 2];
	if (val != undefined) str = val;
	for (var ii = recommendJSON.initialnum; ii < recommendJSON.count; ii++) {
		if (str == recommendJSON[ii].main) {
			thistitle = recommendJSON[ii].main;
			return ii;
			break;
		}
	}
}

//获取当前页面的名称
function getMainName() {
	var urlarr = nowurl.split("?")[0].split("?")[0].split("/");
	var strtitle = urlarr[urlarr.length - 2];
	return strtitle;
}

// 页面访问量 如果flag==5 则表示为结果页面
function getFoodCount(val, flag) {
	var str = "";
	if (flag == 1 || flag == 2) {
		str = '{"key":"' + val + '","typ":"main"}';
	} else if (flag == 5) {
		str = '{"key":"' + val + '","typ":"result"}';
	}
	$.jsonp({
		url: getcountapi,
		data: {
			"req": str
		},
		callback: "success",
		success: function(response) {
			var newnum = Number(recommendJSON[currentNum].num);
			console.log(newnum);
			console.log(response);
			if (flag == 1) { //首页
				$(".participation-status .count").text((Number(response.num) * 3 + newnum));
				descTxt = (Number(response.num) * 3 + newnum) + "人已参加该测试";
				//change(titleTxt,sgUrl,descTxt,imgUrl);
			}
			if (flag == 2) { //结果
				$(".participation-status .count").text((Number(response.num) * 3 + newnum));
				dealResult(response, 2);
			}
			if (flag == 3) { //点赞
				if ((Number(response.num) + Math.ceil(newnum / 10)) > 100000) {
					$("#prase-result span.count").html("10万+");
				} else {
					$("#prase-result span.count").html(Number(response.num) + Math.ceil(newnum / 10));
					// $("#prase-result span.count").html("99992");
				}
			}
			if (flag == 5) { //分结果页面处理
				dealResult(response, 5);
			}
		},
		error: function(xOptions, textStatus) {
			console.log(textStatus);
		}
	});
}

//判断是否IE,如果为IE则动态更改result loading的位置
function isIE() {
	if ( !! window.ActiveXObject || "ActiveXObject" in window) {
		var num = (document.getElementsByTagName('body')[0].offsetWidth - document.getElementById('loadADs').offsetWidth) / 2;
		$("#loadADs").css("left", num + "px");
		$(window).resize(function() {
			var num = (document.getElementsByTagName('body')[0].offsetWidth - document.getElementById('loadADs').offsetWidth) / 2;
			$("#loadADs").css("left", num + "px");
		});
	}
}