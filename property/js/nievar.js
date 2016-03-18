/* -------------定义变量 -------------*/

//全局变量
var debugboo = false;//是否测试环境
var titleTxt="理想财富55188.com";
var descTxt="股市论坛";
var nowurl = window.location.href;

//登录
var mainName = getMainName(); //页面名称
var oDomain = getTopHost();//获取一级域名

//推荐
var hotrecommendJSON = new Object();//热推荐obj

//分享和域名跳转

var shareran,newdomain,newurl;//微信分享使用ticket , 新跳转域名,新跳转前缀
var subdomain = '55188.com';


if(getHost()=="test.nie.io" || debugboo){
	shareran = 0;
	newurl = "";
}else{
	newdomain = '55188.com';
	newurl = 'http://55188.com';
}

var recommendJSON = {
	"initialnum":-10,
	"-10":{"switch":2,"turnurl":subdomain,"red":0,"psw":"","num":"54264","title":"房产证生成器","main":"wx_hpc","status":"","wxurl":""}
};
