Crafty.c('PANEL', {
    init: function(){
        this.requires('2D, Text, DOM')
        .attr({
            w: 50,
            h: 20,
            x: Crafty.viewport.width - this.w,
            y: 0
        })
        .css({"text-align": "center"})
        .textColor("#FFFFF");

    }
});