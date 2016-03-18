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

Crafty.c('hit_log_panel', {
    init: function(){
        this.requires('PANEL')
        .attr({
            w: 100,
            h: 20,
            x: 0,
            y: 0
        })
        .css({"text-align": 'left'})
    }
});

Crafty.c('viewport_mid_msg', {
    init: function(){
        this.requires("PANEL")
        .attr({
            w:300,
            h:20,
            x: Crafty.viewport.width/2 - 150,
            y: Crafty.viewport.height/2 + 20
        })
    }
});

Crafty.c("logo", {
    init: function(){
        this.requires("2D, Canvas, sprites_logo")
        .attr({
            w: 70,
            h: 15,
            x: 0,
            y: 0,
            z: 99
        })
    }
});


Crafty.c('GONG', {
    init: function(){
        this.requires("2D, Canvas, sprites_gong")
        .attr({
            w: 160,
            h: 50,
            z: 97,
            x: Crafty.viewport.width/2 - 160/2,
            y: Crafty.viewport.height - 35
        })
        .origin("center")
    }
});

Crafty.c("JIAN_BING", {
    init: function(){
        this.requires("2D, Canvas, sprites_jian")
        .attr({
            w: 10,
            h: 50,
            z: 98,
            x: 0,
            y: 0,
        })
    }
});

Crafty.c("JIAN_TOU", {
    bing: null,
    init: function(){
        if(!this.bing){
            var b = Crafty.e("JIAN_BING");
        }else{
            var b = this.bing;
        }

        b._cascade(this);
        this.requires("2D, Canvas, sprites_jiantou, Collision, Gravity")
        .attr({
            w: 10,
            h: 14,
            z: 99,
            x: 0,
            y: 0,
            rotation: this.rotation
        })
        .attach(b)
        .bind("EnterFrame", function(){
            b.rotation = this._rotation;
        })
        .onHit("Goddess", function(ent){
            this.destroy();
            Crafty.trigger('UpdateStatus', 'hit');
        })
    }
});



Crafty.c('JIAN', {
    fire: 0,
    init: function(){
        var c = this.requires("2D, Canvas, JIAN_TOU");
        var speed = Crafty.math.randomInt(10, 15);
        c.attr({
            x: Crafty.viewport.width/2 - this.w/2,
            y: Crafty.viewport.height - 40,
            rotation: 0
        })
        .origin("center")
        .bind("EnterFrame", function(frame){
            if(this.x < 0 ||
                this.y < 0 ||
                this.x > Crafty.viewport.width ||
                this.y > Crafty.viewport.height
            ){
                this.destroy();
                Crafty.trigger("UpdateStatus", 'nothit');
            }

            if(this.fire){
                this.xspeed = speed * Math.sin(this._rotation / (180/Math.PI) );
                this.yspeed = speed * Math.cos(this._rotation / (180/Math.PI) );
                this.x += this.xspeed;
                this.y -= this.yspeed;
            }
        })
    }
});




Crafty.c("MOON", {
    init: function(){
        this.requires("2D, Canvas, sprites_moon, Tween")
        .attr({
            w: 130,
            h: 120,
            x: Crafty.viewport.width - 150,
            y: 120,
            z: 1,
            alpha: 0.5
        })
    }
});

Crafty.c("MOON1", {
    init: function(){
        this.requires("2D, Canvas, sprites_moon1, Tween")
        .attr({
            w: 130,
            h: 120,
            x: Crafty.viewport.width/2 - 130/2,
            y: 0,
            z: 1,
            alpha: 0.5
        })
    }
});



Crafty.c("EARTH", {
    init: function(){
        this.requires("2D, Canvas, sprites_earth, Gravity")
        .attr({
            w: Crafty.viewport.width,
            h: 100,
            x: 0,
            y: Crafty.viewport.height - 100,
            z: 1,
            alpha: 0.5
        })
        .bind('EnterFrame', function(){
            if( this.y > Crafty.viewport.height + this.h){
                this.destroy();
            }
        })
    }
});



Crafty.c("HAND", {
    init: function(){
        this.requires("2D, Canvas, hand, Tween")
        .attr({
            w: 100,
            h: 200,
            x: Crafty.viewport.width/2,
            y: Crafty.viewport.height/2 - 100,
            z: 100
        })
    }
});


Crafty.c("XIN", {
    init: function(){
        this.requires("2D, Canvas, xin, Gravity")
        .attr({
            w: 20,
            h: 20,
            z: 99
        })
        .gravityConst(1)
        .bind('EnterFrame', function(){
            if( this.y > Crafty.viewport.height + this.h){
                this.destroy();
            }
        })
    }
});
