
function check_order_statue(){
    var order_id = get_query_string("order_id");
    console.log("order_id:"+order_id);
    $.ajax({
        url: "/api/orders/show?order_id=" + order_id,
        type: "GET",
        success: function(res){
            console.log(res);
            if (res.status == "paid") {
                $("#address").text(res.address);
                if (res.leave_message == "") {
                    $("#leave_message").text("无");
                }else {
                    $("#leave_message").text(res.leave_message);
                };
                $("#nickname").text(res.nickname);
                $("#count").text(res.order_items[0].count + "个");
                $("#mobile").text(res.mobile);
                $("#order_id").text("订单号"+res.id);
                $("#price").text(res.price+"元");
            }else{
                $(".success_content").hide();
                $(".fail_content").show();
                $("#section2").hide();
            }
        },
        error: function(res){
            console.log(res);
        }
    })
}
function get_query_string(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}