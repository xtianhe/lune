$(function(){
    bind_event();
    swiper($("#item_info"));
})
function swiper(event) {
    var container = event.find(".swiper_container");
    return new Swipe(event.find(".swiper_container")[0], {
        startSlide: 0,
        speed: 1000,
        mode: "vertical",
        auto: false,
        continuous: false,
        disableScroll: false,
        stopPropagation: false,
        callback: function(o) {
            $("#menu").find("li").removeClass("active").eq(o).addClass("active")
        }
    });
}
function bind_event() {
    $("#mall, #points").on("touchstart",function(){
        if ($(this).hasClass("active"))
            return;
        $(".menu_li").removeClass("active");
        $(this).addClass("active");
        $(".section").hide();
        $("#"+$(this).attr("data-id")).show();
    });

    // setInt = setInterval(setIntToward,3000);
    // $(".toslide").click(function(){
    //     clearInterval(setInt);
    //     setInt = setInterval(setIntToward,3000);
    //     $(".slide").removeClass("check");
    //     $(".toslide").removeClass("check");
    //     var current = $(this).attr("data-index");
    //     $(".slide").eq(current).addClass("check");
    //     $(this).addClass("check");
    //     $("#slidebox").attr("current",current);
    // });
}
var setInt;
var setIntToward = function(){
    var current = parseInt($("#slidebox").attr("current"));
    if (current == 2) {
        current = -1;
    }
    current++;
    $(".slide").removeClass("check");
    $(".toslide").removeClass("check");
    $(".slide").eq(current).addClass("check");
    $(".toslide").eq(current).addClass("check");
    $("#slidebox").attr("current",current);
}


function left_change(){
    $(".section").each(function(){
        if ($(this).is(":visible")) {
            var index = parseInt($(this).attr("data-index"));
            if (index == 1) {
                return;
            }else{
                index -= 2;
                $(".section").hide();
                $(".menu_li").removeClass("active");
                $(".menu_li").eq(index).addClass("active");
                $(".section").eq(index).show();
                return false;
            };
        };
    });
}

function right_change(){
    $(".section").each(function(){
        if ($(this).is(":visible")) {
            var index = parseInt($(this).attr("data-index"));
            if (index == $(".section").length) {
                return;
            }else{
                $(".section").hide();
                $(".menu_li").removeClass("active");
                $(".menu_li").eq(index).addClass("active");
                $(".section").eq(index++).show();
                return false;
            };
        };
    });
}

function reload_page(){
    window.location.reload();
}