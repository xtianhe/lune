//Enable Console log in opera
if(window.opera){ console = {log:window.opera.postError} }
/**
 * This is the Main JS File
 */

$(function(){

    
    Crafty.init();
    //Add Canvas Element
    Crafty.canvas.init();
    Crafty.viewport.init(Crafty.DOM.window.width, Crafty.DOM.window.height);
    //Set canvas under interface
    Crafty.canvas._canvas.style.zIndex = '1';
    
    //play the loading scene
    Crafty.scene("Loading");


});

