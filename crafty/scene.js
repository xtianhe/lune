Crafty.scene("Loading",function(){
    console.log("Loading...");
    Crafty.background("url("+game_path+"assets/img/a/startbg.png?rnd=1102) no-repeat");
    Crafty.stage.elem.style.backgroundSize = "100%";
    Crafty.stage.elem.style.backgroundColor = "#0D1A36";

    $(".start-btn").on("click", function(){
        Crafty.scene("Start");
        $(".start-btn").hide();
        $(".ce").hide();
    });

});

Crafty.scene("Start", function(){
    var Game = {
        isover: false,
        Goddess: null,
        NGoddess: null,
        Player: null,
        jian: null,
        gong:null,
        moon: null,
        earth: null,
        zhiyin: null,
        hit_log_panel: null,
        $gprogress: $(".game-progress"),
        $progress: $('.progress'),
        $bar: $('.progress__bar'),
        $text: $('.progress__text'),
        $result_text: $(".result .mess"),
        init: function(){
            console.log("Start.init");
            Crafty.background("url("+ game_path +"assets/img/a/background2.png)");
            Crafty.stage.elem.style.backgroundSize = "100%";

            Crafty.e("logo").attr({x:5,y:5});

            this.initGame();
        },
        initGame: function(){
            this.isover = false;
            if (this.Goddess) {
                this.Goddess.destroy();
            }
            if (this.NGoddess) {
                this.NGoddess.destroy();
            }

            this.$gprogress.show();
            this.$progress.addClass('progress--active');
            this.$bar.addClass('progress__bar--green');

            this.Goddess = Crafty.e("Goddess");
            var max_x = Crafty.viewport.width/2 + this.Goddess.w;
            var max_y = Crafty.viewport.height/2 - this.Goddess.h;
            this.Goddess.move = 0;

            this.Goddess.x = Crafty.math.randomInt(0, parseInt(max_x));
            this.Goddess.y = max_y;

            if(this.msg){
                this.msg.destroy();
            }
            this.msg = Crafty.e("viewport_mid_msg");

            if(this.hit_log_panel){
                this.hit_log_panel.destroy();
            }
            this.hit_log_panel = Crafty.e("hit_log_panel");
            this.hit_log_panel.attr({x: Crafty.viewport.width - this.hit_log_panel.w});
            this.hit_log_panel.css({"text-align": 'right'});

            if (this.zhiyin) {
                this.zhiyin.destroy();
            }

            if (window.localStorage['hand_zhiyin' != 1] {
                this.zhiyin = Crafty.e('HAND');
            }

            if(this.Player){
                this.Player.destroy();
            }
            this.Player = Crafty.e('Player');

            if(this.gong){
                this.gong.destroy();
            }
            this.gong = Crafty.e('GONG');
        }
    }

    console.log("Game Start...");
    Game.init();
})