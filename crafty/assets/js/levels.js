/**
 * This file describe different scenes
 */
//Loading Scene
Crafty.scene("Loading",function(){
    console.log("Loading...");
    Crafty.background("url("+game_path+"assets/img/a/startbg.png?rnd=1102) no-repeat");
    Crafty.stage.elem.style.backgroundSize = "100%";
    Crafty.stage.elem.style.backgroundColor = "#0D1A36";

    //load source
    var toLoad = [];
    for(var i in Crafty.assets){
        toLoad.push(i);
    }
    var log = Crafty.e('PANEL');
    log.css({"text-align": "left"});
    log.attr({
        w: 150,
        x: 0,
        y: Crafty.viewport.height - log.h
    });

    $(".start-btn").on("tap", function(){
        Crafty.scene("Start");
        $(".start-btn").hide();
        $(".ce").hide();
    });


    Crafty.load(toLoad,
        function(){
            ////Everything is loaded
            $(".start-btn").show();
            // log.destroy();
        },
        function(e){
            // alert(e.loaded + "|" + e.total);
            log.text(" Loaded: "+ parseInt(e.percent) +"%");
        },
        function(e){
            // alert("error: " + e.loaded);
            Crafty.load([e.src]);
        }
    );

});


// Crafty.scene("Start",function(){

//     var Game = {
//         ismsg: 0,
//         Timer: 0,
//         msg: null,

//         hit_log_panel: Crafty.e("hit_log_panel"),

//         Goddess: null,
//         NGoddess: null,
//         Player: null,
//         jian: null,
//         gong:null,
//         moon: null,
//         earth: null,
//         zhiyin: null,

//         $gprogress: $(".game-progress"),
//         $progress: $('.progress'),
//         $bar: $('.progress__bar'),
//         $text: $('.progress__text'),
//         $result_text: $(".result .mess"),


//         isover: 0,

//         begin: function(){
//             var me = this;
//             setTimeout(function(){
//                 me.moon.tween({y: -me.moon.h}, 100);
//                 me.earth.gravity();
//                 me.Player.start = 1;
//                 me.Goddess.move = 1;
//             }, 1e3);

//         },

//         init_game: function(){
//             this.isover = 0;

//             if(this.Goddess){
//                 this.Goddess.destroy();
//             }
//             if(this.NGoddess){
//                 this.NGoddess.destroy();
//             }

//             this.$gprogress.show();
//             this.$progress.addClass('progress--active');
//             this.$bar.addClass('progress__bar--green');


//             this.Goddess = Crafty.e('Goddess');
//             var max_x = Crafty.viewport.width/2 + this.Goddess.w;
//             var max_y = Crafty.viewport.height/2 - this.Goddess.h
//             this.Goddess.move = 0;

//             this.Goddess.x = Crafty.math.randomInt(0, parseInt(max_x));
//             this.Goddess.y = max_y;

//             if(this.msg){
//                 this.msg.destroy();
//             }
//             this.msg = Crafty.e("viewport_mid_msg");

//             if(this.hit_log_panel){
//                 this.hit_log_panel.destroy();
//             }
//             this.hit_log_panel = Crafty.e("hit_log_panel");
//             this.hit_log_panel.attr({x: Crafty.viewport.width - this.hit_log_panel.w});
//             this.hit_log_panel.css({"text-align": 'right'});


//             if(this.zhiyin){
//                 this.zhiyin.destroy();
//             }

//             if(window.localStorage["hand_zhiyin"] != 1){
//                 this.zhiyin = Crafty.e('HAND');
//             }


//             if(this.Player){
//                 this.Player.destroy();
//             }
//             this.Player = Crafty.e('Player');

//             if(this.gong){
//                 this.gong.destroy();
//             }
//             this.gong = Crafty.e('GONG');

//             if(this.moon){
//                 this.moon.destroy();
//             }
//             if(this.earth){
//                 this.earth.destroy();
//             }

//             if(this.jian){
//                 this.jian.destroy();
//             }

//             this.moon = Crafty.e('MOON1');
//             this.earth = Crafty.e('EARTH');

//             this.$result_text.html("");
//             $(".result").hide();
//             this.begin();
//         },

//         bind_event: function(){
//             var me = this;
//             $("body").on("swipeUp", function(){

//                 if(me.zhiyin){
//                     me.zhiyin.destroy();
//                     try{
//                         //iOS的Safari在无痕模式下搜索，sessionStorage操作产生异常
//                         window.localStorage['hand_zhiyin'] = 1;
//                     }catch(e){}
//                 }

//                 if(me.jian && me.Player.start){
//                     me.jian.fire = 1;
//                 }
//             }).on("swipeLeft", function(){
//                 if(me.jian && me.jian.fire == 0 && me.jian._rotation > -24){
//                     me.jian.rotation -= 6;
//                     me.gong.rotation = me.jian._rotation;
//                 }
//             }).on("swipeRight", function(){
//                 if(me.jian && me.jian.fire == 0 && me.jian._rotation < 24){
//                     me.jian.rotation += 6;
//                     me.gong.rotation = me.jian._rotation;
//                 }
//             });


//             $(".result .again").on("tap", function(){
//                 if(me.Player.end){
//                     console.log("init_game again");
//                     me.init_game();
//                 }
//             });

//             $(".result .share").on("tap", function(){
//                 var ua = navigator.userAgent.toLowerCase();
//                 if(ua.indexOf("micromessenger") > -1){
//                     $(".for-weixin").show();
//                 }else{
//                     alert("请在微信中使用分享功能");
//                 }
//             });

//             $(".for-weixin").on("tap", function(){
//                 $(this).hide();
//             })




//             Crafty.bind("EnterFrame", function(frame){
//                 if(Crafty('JIAN').length < 1){
//                     me.jian = Crafty.e("JIAN");
//                     me.gong.rotation = me.jian._rotation;
//                 }

//                 if(!me.Player.end){
//                     Crafty.stage.elem.style.backgroundPosition ="0px "+frame.frame+"px";
//                 }
//             });


//             Crafty.bind("updateProgress", function(d){
//                 var percent = parseFloat(d.p.toFixed(2));
//                 var distance = parseFloat(d.d.toFixed(2));
//                 me.$text.find('em').text(distance + '万千米');
//                 if (percent >= 100) {
//                     percent = 100;
//                     me.$progress.addClass('progress--complete');
//                     me.$text.find('em').text('0米');
//                 } else {
//                     if (percent >= 60) {
//                         me.$bar.removeClass("progress__bar--green");
//                         me.$bar.addClass('progress__bar--orange');
//                     }
//                     // else if (percent >= 100) {
//                     //     // me.$bar.removeClass('progress__bar--yellow');
//                     //     // me.$bar.addClass('progress__bar--blue');
//                     // } else if (percent >= 90) {
//                     //     // me.$bar.removeClass('progress__bar--blue');
//                     //     // me.$bar.addClass('progress__bar--orange');
//                     // }
//                 }
//                 me.$bar.css({ width: percent + '%' });
//             });

//             //game over
//             Crafty.bind("GameOver", function(){
//                 if(me.isover){
//                     return;
//                 }

//                 var status = "Success";

//                 me.isover = 1;
//                 me.Player.start = 0;
//                 me.Player.end = 1;

//                 me.moon.tween({y: 0}, 50);
//                 me.Goddess.move = 0;
//                 me.Goddess.tween({x: me.moon._x + 10, y: me.moon.h - me.Goddess.h}, 40);



//                 me.Player.end = 1;
//                 console.log("GameOver");
//                 me.msg.destroy();
//                 me.msg = Crafty.e("viewport_mid_msg");

//                 // $(".for-weixin").show();

//                 if(me.Goddess.hp> 0){
//                     status = "Fail";
//                     //成功奔月
//                     me.Goddess.bind('TweenEnd', function(){
//                         // me.msg.text('你的箭术太烂啦，<br/>嫦娥已经成功奔月了!');
//                         me.$result_text.html('你的箭术太烂啦，<br/>嫦娥已经成功奔月了!');

//                         me.Goddess.tween({
//                             w: 150,
//                             h: 150
//                         }, 50);

//                         me.moon.tween({
//                             w: 250,
//                             h: 250,
//                             x: Crafty.viewport.width/2 - 125,
//                             y: -80,
//                             alpha: 1
//                         }, 50);


//                     });
//                 }else if(me.Goddess.hp <= 0){
//                     status = "Success";

//                     me.moon.destroy();
//                     me.Goddess.tween({
//                         w: 150,
//                         h: 150,
//                         x: Crafty.viewport.width/2 - me.Goddess.w,
//                         y: 100
//                     }, 30);

//                     var gods = "Goddess0";
//                     //成功阻止奔月
//                     if(me.Player.arrow_count<6){
//                         gods = "Goddess0";
//                         me.$result_text.html("太棒了，"+me.Player.arrow_count+"箭就留住了嫦娥，<br/>简直神一样的存在！");
//                     }else if(me.Player.arrow_count >=6 && me.Player.arrow_count <=10){
//                         gods = "Goddess1";
//                         me.$result_text.html(me.Player.arrow_count+"箭才留住嫦娥，天上太冷，<br/>嫦娥都冻成凤姐啦！");
//                     }else if(me.Player.arrow_count > 10){
//                         gods = "Goddess2";
//                         me.$result_text.html(me.Player.arrow_count+"箭终于留住嫦娥，<br/>等你太久，嫦娥已老！");
//                     }

//                     me.Goddess.bind("TweenEnd", function(){
//                         var x = me.Goddess.x, y = me.Goddess.y;
//                         me.Goddess.destroy();
//                         me.NGoddess = Crafty.e(gods);
//                         me.NGoddess.attr({
//                             x:x,
//                             y: y,
//                             w:180,
//                             h:180
//                         });
//                     });

//                 }

//                 //notice share
//                 share_fun(status, me.Player.arrow_count);


//                 setTimeout(function(){
//                     $(".result").show();
//                 }, 100);

//             });

//             //update status
//             Crafty.bind("UpdateStatus", function(status){
//                 me.Player.arrow_count++;

//                 if(status == 'hit'){
//                     me.Player.hit++;
//                     // me.Goddess.hp--;
//                     Crafty.trigger("UpdateGoddessHP");

//                     //DIAO XIN
//                     var x = Crafty.e("XIN");
//                     x.attr({x: me.Goddess._x, y: me.Goddess._y});
//                     x.gravity();




//                     if(me.Goddess.hp == 0){
//                         Crafty.trigger('GameOver');
//                     }
//                 }
//                 // me.hit_log_panel.text('Hit: '+ me.Player.hit +'/' + me.Player.arrow_count);
//                 if(!me.ismsg && me.Player.hit ==0 && me.Player.arrow_count == 1 && me.Player.start){
//                     me.ismsg = 1;
//                     me.msg.text('射歪了，不够给力哦，继续努力吧！');
//                     setTimeout(function(){
//                         me.msg.destroy();
//                     }, 2e3);
//                 }else if(!me.ismsg && me.Player.hit ==1 && me.Player.arrow_count ==1 && me.Player.start){
//                     me.ismsg = 1;
//                     me.msg.text('果然很牛，第一次就射中了');
//                     setTimeout(function(){
//                         me.msg.destroy();
//                     }, 2e3);
//                 }
//             });

//         },


//         init: function(){
//             Crafty.background("url("+game_path+"assets/img/a/background2.png)");
//             Crafty.stage.elem.style.backgroundSize = "100%";


//             Crafty.e('logo').attr({x: 5, y: 5});

//             this.init_game();
//             this.bind_event();
//         }

//     };







//     console.log("Start Game");
//     Game.init();
// });



// Crafty.scene("Success",function(){
//     Crafty.background("url("+game_path+"assets/img/a/startbg.png)");
//     Crafty.stage.elem.style.backgroundSize = "100%";
//     Crafty.e('START_BTN');
// });