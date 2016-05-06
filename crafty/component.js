Crafty.c('PANEL', {
    init: function() {
        this.requires('2D, Text, DOM')
            .attr({
                w: 50,
                h: 20,
                x: Crafty.viewport.width - this.w,
                y: 0
            })
            .css({ "text-align": "center" })
            .textColor("#FFFFF");

    }
});

Crafty.c('logo', {
    init: function() {
        this.requires('2D, Canvas, sprites_logo')
            .attr({
                x: 0,
                y: 0,
                w: 70,
                h: 15,
                z: 99
            });
    }
});

Crafty.c("viewport_mid_msg", {
    init: function() {
        this.requires("PANEL")
            .attr({
                w: 300,
                h: 20,
                x: Crafty.viewport.width / 2 - 150,
                y: Crafty.viewport.height / 2 + 20
            });
    }
});

Crafty.c("hit_log_panel", {
    init: function() {
        this.requires('PANEL')
            .attr({
                w: 100,
                h: 20,
                x: 0,
                y: 0
            })
            .css({ "text-align": 'left' });
    }
});

Crafty.c("HAND", {
    init: function() {
        this.requires("2D, Canvas, hand, Tween")
            .attr({
                w: 100,
                h: 200,
                x: Crafty.viewport.width / 2,
                y: Crafty.viewport.height / 2 - 100,
                z: 100
            });
    }
})

Crafty.c('Player', {
    init: function() {
        start: 0,
        end: 0,
        hit: 0,
        arrow_count: 0, //hit counts
        init: function() {

        }
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

Crafty.c('Goddess', {
    hp: 5,
    move: 0,
    say: null,
    _direction: "RIGHT_UP",
    direction: [
        'LEFT',
        'RIGHT',
        'RIGHT_UP',
        'LEFT_UP'
    ],
    distance: 38.4,
    cur_distance: 38.4,
    progress: 0,
    init: function() {
        var me = this,
            rotation = 0,
            x = Crafty.math.randomInt(80, 100),
            y = Crafty.math.randomInt(80, 100);
        this.requires("2D, Canvas, mygoddess, Collision, Tween")
            .attr({
                w: 80,
                h: 80,
                z: 150,
                rotation: rotation
            })
            .bind("EnterFrame", function(frame) {
                if (this._x < -this.w || this._y < -this.h ||
                    this._x > Crafty.viewport.width - this.w ||
                    this._y > Crafty.viewport.height + this.h
                ) {
                    this._direction = 'LEFT_UP';
                }
                if (this.move) {
                    if (this._x > Crafty.viewport.width - this.w) {
                        this._direction = "LEFT_UP";
                    } else if (this._x < 0) {
                        this._direction = "RIGHT_UP";
                    }

                    this.cur_distance = this.cur_distance - Crafty.math.randomNumber(0.05, 0.08);
                    this.progress = (1 - this.cur_distance / this.distance) * 100;

                    if (this.cur_distance <= 0) {
                        this.cur_distance = 0;
                        Crafty.trigger('GameOver');
                        return;
                    }

                    Crafty.trigger("updateProgress", {
                        p: this.progress,
                        d: this.cur_distance
                    });

                    switch (this._direction) {
                        case 'RIGHT_UP':
                            this.xspeed = Crafty.math.randomInt(5, 8) * Math.sin(100 / (180 / Math.PI));
                            this.yspeed = Crafty.math.randomInt(1, 3) * Math.cos(100 / (180 / Math.PI));
                            this.x += this.xspeed;
                            this.y -= this.yspeed;
                            break;
                        case 'LEFT_UP':
                            this.xspeed = Crafty.math.randomInt(5, 8) * Math.sin(70 / (180 / Math.PI));
                            this.yspeed = Crafty.math.randomInt(1, 3) * Math.cos(70 / (180 / Math.PI));
                            this.x -= this.xspeed;
                            this.y -= this.yspeed;
                            break;
                    }

                }
            })
            .bind('UpdateGoddessHP', function() {
                this.hp--;
            });
    }
});