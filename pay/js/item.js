var setInt;
var info_index = 1;
var info_length = $("#section3 img").length;
function scroll_showimg(){
    $(window).scroll(function(){
        if (info_index == info_length)
            return;
        show_img();
    });
}
function show_img(){
    var offset_bottom = page_top() + window.screen.availHeight;
    var window_height = $("#section3").position().top + $("#section3").height();
    if (window_height - offset_bottom < 20) {
        var img = $("#section3 img").eq(info_index);
        img.attr("src",img.attr("data-src"));
        img.show();
        info_index++;
    };
}
function page_top(){
    return $("html").scrollTop()||$("body").scrollTop()
}
function init_slide(){
    console.log("init_slide start");
    setInt = setInterval(setIntToward,3000);
}
var setIntToward = function(){
    var current = parseInt($("#section1").attr("current"));
    if (current == 2) {
        current = -1;
    }
    current++;
    $(".slide").removeClass("check");
    $(".toslide").removeClass("check");
    $(".slide").eq(current).addClass("check");
    $(".toslide").eq(current).addClass("check");
    $("#section1").attr("current",current);
}
function init_click () {
    console.log("init_click start");
    $(".toslide").click(function(){
        clearInterval(setInt);
        setInt = setInterval(setIntToward,3000);
        $(".slide").removeClass("check");
        $(".toslide").removeClass("check");
        var current = $(this).attr("data-index");
        $(".slide").eq(current).addClass("check");
        $(this).addClass("check");
        $("#section1").attr("current",current);
    });
    $("#buyit").click(function(){
        window.location.href = "order/confirm.html";
    });
}