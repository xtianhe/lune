/**

 服装数据解析器

 author: mebius.ashan
 date  : 2016.2.16

 */
var SkinParse = (function () {
    function SkinParse() {
    }
    var d = __define,c=SkinParse,p=c.prototype;
    //解析数据
    //data为加载的自定义格式json数据
    //dataC为数据容器，所解析后的数据放入到dataC中
    SkinParse.parse = function (data, dataC) {
        SkinParse.parseEles(data.eles, dataC);
        SkinParse.parseAll(data.all, dataC);
        SkinParse.parseGroup(data.group, dataC);
    };
    //解析服装元素数据
    SkinParse.parseEles = function (data, dataC) {
        var eles = [];
        var len = data.length;
        for (var i = 0; i < len; i++) {
            var d = new ElementData();
            d.id = data[i].id;
            d.type = data[i].type;
            d.icon = data[i].icon;
            d.resNames = data[i].resNames;
            eles.push(d);
        }
        dataC.setEleData(eles);
    };
    //解析整套服装数据
    SkinParse.parseAll = function (data, dataC) {
        var eles = [];
        var len = data.length;
        for (var i = 0; i < len; i++) {
            var d = new ElementData();
            d.id = data[i].id;
            d.icon = data[i].icon;
            d.resNames = data[i].resNames;
            d.type = "all";
            eles.push(d);
        }
        dataC.setAllData(eles);
    };
    //解析组数据
    SkinParse.parseGroup = function (data, dataC) {
        var eles = [];
        var len = data.length;
        for (var i = 0; i < len; i++) {
            var d = new ElementData();
            d.id = data[i].id;
            d.icon = data[i].icon;
            d.type = data[i].type;
            eles.push(d);
        }
        dataC.setGroupData(eles);
    };
    return SkinParse;
})();
egret.registerClass(SkinParse,'SkinParse');
