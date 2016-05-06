function swiper(e) {
    {
        var o = e.find(".swiper_container"),
            n = o.find(".swiper_slide").length;
    }
    var a = new Swipe(e.find(".swiper_container")[0], {
        startSlide: 0,
        speed: 1000,
        mode: "vertical",
        auto: false,
        continuous: false,
        disableScroll: false,
        stopPropagation: false,
        height : window.innerHeight
    });
    return a;
}
swiper($("#item_info"));
