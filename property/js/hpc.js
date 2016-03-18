
//配置微信分享
function setWxShare(sName){
    var currentUrl = window.location.href;

	descTxt ="房产证生成器";
	imgUrl = currentUrl.substr(0,currentUrl.indexOf("index.html")) + 'images/s/fico/sico.png';
	titleTxt = "房产证生成器";

    console.log(titleTxt);
    console.log(descTxt);
    console.log(imgUrl);
    console.log("title:"+$(document).attr("title"));

}

var NowId = "-10";
var NowStr = "wx_hpc";
var NowSwitch,NowWxshare, NowTurnurl, chooseli=1;
indexshare = false;//index页面的自动分享语去掉
$(function(){
	//子页面的变量前缀加Now，用来区分其他的JS内的变量。
	NowSwitch = recommendJSON[NowId].switch;//如果为0则正常跳转，为1跳转到微信平台，为2为跳转到二级域名
	NowWxshare = recommendJSON[NowId].wxurl;//微信分享页面的链接,如果有此链接则微信分享的时候自定义链接为此链接。如果没有则微信页面需要跳转到turnurl表示的二级域名链接。
	NowTurnurl = "http://"+recommendJSON[NowId].turnurl;//微信跳转链接的二级域名

	$("#submit").click(function(){
			var nameTxt = $("#insert-name2").val();
			if(nameTxt == ""){
				alert("请输入您的姓名"); return;
			}
            var nameTxt2 = $("#insert-name3").val();
            var posIndex = $(".static.mover").attr("data-index");
			//var newstr = pinyin.getFullChars2(nameTxt).toUpperCase();
			// var floornum = Math.round(Math.random() *30) + 1;
			//取图片
			var newurl = "/event/fang/img?user="+nameTxt+"&user2="+nameTxt2+"&pos="+posIndex;
			$("#newpic").attr("src",newurl);
			$("#newpic").attr("onerror",'$(".rich_media_bg").html("图片生成失败，请稍后再试~")');
			$("#lxcftg").removeAttr("class");
			$(".rich_media_inner").hide();
			$(".rich_media_bg").show();
	});

	//$(".title").css('height', $(window).height());
	if($(window).height() > ($(".ggggg").height() + $(".ggggg").offset().top)){
		$(".title").css('height', $(window).height());
	}else{
		$(".title").css('height', $(".ggggg").height() + $(".ggggg").offset().top);
	}

	setWxShare();
});

function MathRand(){
	var Num="";
	for(var i=0;i<8;i++){
		Num	+= Math.floor(Math.random()*10);
	}
	return Num;
}

function getScrollTop(){
	var scrollTop=0;
	if(document.documentElement&&document.documentElement.scrollTop){
		scrollTop=document.documentElement.scrollTop;
	}else if(document.body){
		scrollTop=document.body.scrollTop;
	}
	return scrollTop;
}

function check(num){
	// for (var i = 1; i < 3; i++) {
 //    	$('#textchoice'+i).removeClass("mover");
	// };
    $(".static").removeClass("mover");
	$("#textchoice"+num).addClass("mover");
}