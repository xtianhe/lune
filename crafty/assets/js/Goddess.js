Crafty.c("Goddess", {
    hp: 5,
    move: 0,
    say: null,
    _direction: 'RIGHT_UP',
    direction: [
        'LEFT',
        'RIGHT',
        'RIGHT_UP',
        'LEFT_UP'
    ],

    distance: 38.4,
    cur_distance: 38.4,
    progress: 0,

    init: function(){
        var me = this,
            rotation = 0,
            x = Crafty.math.randomInt(80, 100),
            y = Crafty.math.randomInt(80, 100);


        this.requires("2D, DOM, Canvas, mygoddess, Collision, Tween")
        .attr({
            w: 80,
            h: 80,
            z: 150,
            rotation: rotation
        })
        .bind("EnterFrame", function(frame){
            // return;

            if(this._x < -this.w || this._y < -this.h || 
                this._x > Crafty.viewport.width - this.w ||
                this._y > Crafty.viewport.height + this.h
            ){
                this._direction = 'LEFT_UP';
            }


            if(this.move){

                if(this._x > Crafty.viewport.width-this.w){
                    this._direction = "LEFT_UP";
                }else if(this._x < 0){
                    this._direction = "RIGHT_UP";
                }

                
                this.cur_distance = this.cur_distance - Crafty.math.randomNumber(0.05, 0.08);
                this.progress = (1-this.cur_distance/this.distance)*100;
                
                Crafty.trigger("updateProgress", {
                    p: this.progress, 
                    d:this.cur_distance
                });

                if(this.cur_distance <= 0){
                    this.cur_distance = 0;
                    Crafty.trigger('GameOver');
                    return;
                }
                



                switch(this._direction){
                    case 'RIGHT_UP':
                        this.xspeed = Crafty.math.randomInt(5, 8) * Math.sin(100 / (180/Math.PI) );
                        this.yspeed = Crafty.math.randomInt(1, 3) * Math.cos(100 / (180/Math.PI) );
                        this.x += this.xspeed;
                        this.y -= this.yspeed;
                        break;

                    case 'LEFT_UP':
                        this.xspeed = Crafty.math.randomInt(5, 8) * Math.sin(70 / (180/Math.PI) );
                        this.yspeed = Crafty.math.randomInt(1, 3) * Math.cos(70 / (180/Math.PI) );
                        this.x -= this.xspeed;
                        this.y -= this.yspeed;
                        break;
                }

            }
        })
        .bind("UpdateGoddessHP", function(){
            this.hp--;
        })

    }
});


Crafty.c('Goddess0', {
    init: function(){
        this.requires("2D, DOM, Canvas, mygoddess, Tween")
        .attr({
            w: 150,
            h: 150,
            z: 150
        })
    }
});

Crafty.c('Goddess1', {
    init: function(){
        this.requires("2D, DOM, Canvas, ce1, Tween")
        .attr({
            w: 150,
            h: 150,
            z: 150
        })
    }
});
Crafty.c('Goddess2', {
    init: function(){
        this.requires("2D, DOM, Canvas, ce2, Tween")
        .attr({
            w: 150,
            h: 150,
            z: 100
        })
    }
});
Crafty.c('Goddess3', {
    init: function(){
        this.requires("2D, DOM, Canvas, ce3, Tween")
        .attr({
            w: 150,
            h: 150,
            z: 100
        })
    }
});