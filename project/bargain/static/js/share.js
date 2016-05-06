$(function(){
    init_click();
})

function init_click(){
    $("#buy").on("touchstart",function(){
        alert("购买");
    });
}