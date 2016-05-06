define('app2/e',['require','exports','module'],function(require, exports, module) {
    alert(1);
});
define('app/d',['require','exports','module','app2/e'],function(require, exports, module) {

    var d = require('app2/e');

});
define('app/c',['require','exports','module','app/d'],function(require, exports, module) {

    var d = require('app/d');

});
define('app/b',['require','exports','module','app/c'],function(require, exports, module) {

    var c = require('app/c');

});
define('app/a',["app/b"],function (b) {

      return {

           "name":1

      }

});
require(['app/a'],function(jq){

});
define("app", function(){});

