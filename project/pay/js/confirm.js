var app_id;
var addrSign;
var timestamp;
var nonce_str;
var signType = "sha1";
var pack;
var pay_sign;
var order_id;
var inventory = 1000;
function init_resize(){
    $(window).resize(function() {
        init_section();
    });
}
function get_addrSign(){
    $.ajax({
        url: "/api/weixin/pay/address",
        type: 'POST',
        data: {
            url: window.location.href
        },
        success: function(res){
            app_id = res.app_id;
            addrSign = res.sign;
            timestamp = res.timestamp;
            nonce_str = res.nonce_str;
            checkb();
        },
        error : function(res){
            var invalid = JSON.parse(res.responseText);
            console.log("get_payid_request code,message:"+invalid.code+","+invalid.message);
            $("#payit").one("click",get_payid_request);
        }
    });
}
function init_section(){
    var st2_height = $("#section2").height();
    $(".tag").css("height",st2_height);
    $("#total").css("line-height",st2_height+"px");
}
function init_click(){
    $("#decrease").click(function(){
        var num = parseInt($("#num").val());
        if (num > 0) {
            num--;
        }
        $("#num").val(num);
        $("#total").text("共￥"+(199.00 * num).toFixed(2));
    })
    $("#increase").click(function(){
        var num = parseInt($("#num").val())
        if (num < inventory) {
            num++;
        }else{
            alert("每单上额为"+inventory+"个");
        }
        $("#num").val(num);
        $("#total").text("共￥"+(199.00 * num).toFixed(2));
    })
    $("#num").blur(function(){
        var num = $("#num").val();
        var reg = /^\d+$/;   //判断字符串是否为数字
        if (!reg.test(num))
        {
            num = 0;
            $("#num").val(0);
        }
        if (num > inventory) {
            alert("每单上额为"+inventory+"个");
            num = inventory;
            $("#num").val(num);
        }
        $("#total").text("共￥"+(199.00 * num).toFixed(2));
    });
    $("#payit").one("click",get_payid_request);
}
function checkb () {
    console.log("checkb start");
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    } else {
        console.log("checkb WeixinJSBridge");
        onBridgeReady();
    }
}
function onBridgeReady() {
    console.log("onBridgeReady start");
    var data = {
        "appId": app_id,
        "scope": "jsapi_address",
        "signType": "sha1",
        "addrSign": addrSign,
        "timeStamp": timestamp,
        "nonceStr": nonce_str
    };
    console.log(data)
    WeixinJSBridge.invoke('editAddress', data,
        function (res) {
            //若res 中所带的返回值不为空，则表示用户选择该返回值作为收货地址。
            //否则若返回空，则表示用户取消了这一次编辑收货地址。
            console.log("WeixinJSBridge err_msg:"+res.err_msg)
            if (res.err_msg == "edit_address:ok") {
                console.log("WeixinJSBridge edit_address:ok")
                $("#username").val(res.userName);
                $("#photo").val(res.telNumber)
                var address = res.proviceFirstStageName
                            + res.addressCitySecondStageName
                            + res.addressCountiesThirdStageName
                            + res.addressDetailInfo;
                $("#address").val(address);
                $("#num").focus();
                $("#num").blur();
            }else{
                console.log("WeixinJSBridge edit_address:fail");
                $("#num").focus();
                $("#num").blur();
            }
        }
    );
}
function get_payid_request(){
    if (!check_input()){
        $("#payit").one("click",get_payid_request);
        return;
    }
    $.ajax({
        url: "/api/orders/create",
        type: "POST",
        data: {
            item_id: "10001:"  + $("#num").val(),
            nickname: $("#username").val(),
            mobile: $("#photo").val(),
            address: $("#address").val(),
            leave_message: $("#desc").val()
        },
        success: function(res){
            order_id = res.id;
            console.log("order_id" + order_id);
            allow_wcpay(order_id);
        },
        error: function(res){
            var invalid = JSON.parse(res.responseText);
            console.log("get_payid_request code,message:"+invalid.code+","+invalid.message);
            $("#payit").one("click",get_payid_request);
        }
    });
}
function check_input(){
    var username = $("#username").val();
    var telNumber = check_photo();
    var address = check_address();
    var number = $("#num").val();
    if (!username) {
        alert("请填写收件人");
        console.log("请填写收件人");
        return false;
    };
    if (!telNumber) {
        alert("请填写准确手机号码");
        console.log("请填写准确手机号码");
        return false;
    };
    if (!address) {
        alert("请填写准确收货地址");
        console.log("请填写准确收货地址");
        return false;
    };
    if (!number) {
        alert("请填写购买数量");
        console.log("请填写购买数量");
        return false;
    };
    console.log("all input is ok");
    return true;
}
function check_photo(){
    var telNumber = $("#photo").val();
    var reg = /^1\d{10}$/;
    if (reg.test(telNumber)) {
         return true;
    }else{
         return false;
    };
}
function check_address(){
    var address = $("#address").val();
    if (address.length < 10 || address.length > 60) {
        return false;
    }else{
        return true;
    }
}
function allow_wcpay(order_id){
    $.ajax({
        url: "/api/weixin/pay/create",
        type: 'POST',
        data: {
            "order_id": order_id
        },
        success: function(res){
            app_id = res.app_id;
            nonce_str = res.nonce_str;
            pay_sign = res.sign;
            timestamp = res.timestamp;
            pack = res.package;
            get_brand_wcpay_request();
        },
        error : function(res){
            var invalid = JSON.parse(res.responseText);
            console.log("get_payid_request code,message:"+invalid.code+","+invalid.message);
            $("#payit").one("click",get_payid_request);
            $("#payit").one("click",get_payid_request);
        }
    });
}
function get_brand_wcpay_request(){
    var data = {
       "appId" : app_id,     //公众号名称，由商户传入
       "timeStamp":timestamp,         //时间戳，自1970年以来的秒数
       "nonceStr" : nonce_str, //随机串
       "package" : pack,
       "signType" : "MD5",         //微信签名方式:
       "paySign" : pay_sign //微信签名
    };
    console.log(data);
    WeixinJSBridge.invoke('getBrandWCPayRequest', data,
        function(res){
            console.log(res);
            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                console.log("pay success and order_id:"+order_id);
                window.location.href = "finish.html?order_id=" + order_id;
            }else{
                console.log("WeixinJSBridge get_brand_wcpay_request:fail");
                $("#payit").one("click",get_payid_request);
            }
        }
   );
}