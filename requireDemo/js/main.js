require.config({
    paths: {
        "jquery": ["http://cdn.staticfile.org/jquery/1.9.1/jquery.min", "js/jquery.min"],
        "a": ["a"]
    }
})
require(["jquery","a"],function($){
    $(function(){
        alert("load finished");
    })
})