$(function(){
    bind_menu();
});
function bind_menu(){
    $("#recommend, #new, #hot, #near").on("touchstart",function(){
        if ($(this).hasClass("active"))
            return;
        $(".menu_li").removeClass("active");
        $(this).addClass("active");
        $(".section").hide();
        $("#"+$(this).attr("data-id")).show();
    });
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