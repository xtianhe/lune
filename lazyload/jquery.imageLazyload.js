/*
 * image lazy load - jQuery plugin for lazy loading images
 * Copyright (c) 2016 Liang Yu
 *
 * Version: 1.0
 *
 */

(function($) {
    $.fn.imageLazyload = function(opt) {
        var self = this,
            setDelay,
            opt = opt || {},
            options = {
                offset: opt.offset || 0,
                delay: opt.delay || 0,
                container: opt.container || window
            };

        _delay();
        $(options.container).scroll(function() {
            _delay();
        });

        function _delay() {
            clearTimeout(setDelay);
            setDelay = setTimeout(function() {
                _loadImage();
            }, options.delay);
        }

        function _loadImage() {
            self.each(function() {
                if (!this.loaded && _isShow(this)) {
                    $(this).attr("src", $(this).attr("data-src"));
                    this.loaded = true;
                }
            });
        }

        function _isShow(el) {
            var con = options.container,
                top = con == window ? $(con).scrollTop() : $(con).offset().top;
            return $(con).height() + top > $(el).offset().top - options.offset;
        }
    }
})(jQuery);