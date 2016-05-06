var holdPosition = 0, pullPosition = 0;
var mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    mode: 'vertical',
    watchActiveIndex: true,
    onTouchStart: function() {
        holdPosition = 0;
        pullPosition = 0;
    },
    onResistanceBefore: function(s, pos) {
        holdPosition = pos;
    },
    onResistanceAfter: function(s, pos) {
        pullPosition = pos;
    },
    onTouchEnd: function() {
        if (holdPosition > 100) {
            mySwiper.setWrapperTranslate(0, 100, 0)
            mySwiper.params.onlyExternal = true
            $('.preloader').addClass('visible');
            loadNewSlides();
        }else if (pullPosition > 100) {
            mySwiper.setWrapperTranslate(0,-100,0);
            mySwiper.params.onlyExternal = true;
            $('.preloader').addClass('visible');
            loadMoreSlides();
        }
    }
})
var slideNumber = 0;

function loadNewSlides() {
    setTimeout(function() {
        //Prepend new slide
        var colors = ['red', 'blue', 'green', 'orange', 'pink'];
        var color = colors[Math.floor(Math.random() * colors.length)];
        mySwiper.prependSlide('<div class="title">sucai.com ' + slideNumber + '</div>', 'swiper-slide ' + color + '-slide');
        //Release interactions and set wrapper
        mySwiper.setWrapperTranslate(0, 0, 0)
        mySwiper.params.onlyExternal = false;
        //Update active slide
        mySwiper.updateActiveSlide(0)
            //Hide loader
        $('.preloader').removeClass('visible');
    }, 2000)
    slideNumber++;
}

function loadMoreSlides() {
    setTimeout(function() {
        //Prepend new slide
        var colors = ['red', 'blue', 'green', 'orange', 'pink'];
        var color = colors[Math.floor(Math.random() * colors.length)];
        mySwiper.appendSlide('<div class="title">jiayuan.com ' + slideNumber + '</div>', 'swiper-slide ' + color + '-slide');
        //Release interactions and set wrapper
        mySwiper.setWrapperTranslate(0, 0, 0)
        mySwiper.params.onlyExternal = false;
        //Update active slide
        mySwiper.updateActiveSlide(0)
            //Hide loader
        $('.preloader').removeClass('visible');
    }, 2000)
    slideNumber++;
}
