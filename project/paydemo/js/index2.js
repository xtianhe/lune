$(function(){
    init_click()
    checkb()
    get_access_token()
    sign()
})

function init_click(){
    $("#getAddress").click(function(){
        console.log("调用共享收货地址")
    })
    $("#pay").click(function(){
        console.log("申请下单")
        location.href = "index3.html"
    })
}

function get_access_token(){
    // var access_token_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx0a7df3d2ad4b3c71&secret=85a36cf64687da60cee78a73f3bd24a1"
    // $.ajax({ 
    //     url:access_token_url, 
    //     type:'GET', 
    //     dataType:'JSONP', 
    //     jsonp: "callback",
    //     jsonpCallback:"flightHandler",
    //     success: function(res){ 
    //         console.log(res)
    //     } 
    // }); 
    return "aZY1SgpTWNOa8QwMJtRsNL5H40KMS4AKh3DShkhKOskJrB3T8OoZCmbQW83ulDjsGGgo-vwx6pkVG59UsPBYrnCK5dB5uEyprD7i5XlWdK8"
}

function sign() {
    var appId = "wx0a7df3d2ad4b3c71"
    var url = window.location.href
    var signType = "sha1"
    var timestamp = ( Date.parse(new Date()) / 1000 ) + ""
    var nonceStr = new Date().getTime() + ""
    var accessToken = get_access_token()
    return creat_addrSign(appId,url,signType,timestamp,nonceStr,accessToken)
}

function creat_addrSign(appId,url,signType,timestamp,nonceStr,accessToken) {
    
}

function checkb () {
    console.log(hex_sha1("abc"))
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    } else {
        onBridgeReady();
    }
}

function onBridgeReady() {
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
            "appId": "wx0a7df3d2ad4b3c71", //公众号名称，由商户传入
            "timeStamp": " 1395712654", //时间戳，自1970年以来的秒数
            "nonceStr": "e61463f8efa94090b1f366cccfbbb444", //随机串
            "package": "prepay_id=u802345jgfjsdfgsdg888",
            "signType": "MD5", //微信签名方式:      
            "paySign": "70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
        },
        function(res) {
            if (res.err_msg == "get_brand_wcpay_request: ok") {} // 使用以上方式判断前端返回,微信团队郑重提示: res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
        }
    );
    WeixinJSBridge.invoke('editAddress', {
        "appId": getAppId(),
        "scope": "jsapi_address",
        "signType": "sha1",
        "addrSign": "xxxxx",
        "timeStamp": "12345",
        "nonceStr": "10000",
    }, function (res) {
        //若res 中所带的返回值不为空，则表示用户选择该返回值作为收货地址。
        //否则若返回空，则表示用户取消了这一次编辑收货地址。
        $("#t_1").text(res.proviceFirstStageName)
        $("#t_2").text(res.addressCitySecondStageName)
        $("#t_3").text(res.addressCountiesThirdStageName)
        $("#t_4").text(res.addressDetailInfo)
        $("#t_5").text(res.telNumber)
    });
}
