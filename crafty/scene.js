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