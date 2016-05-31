/**

 服装数据

 author: mebius.ashan
 date  : 2016.2.16

 */
var SkinData = (function () {
    function SkinData() {
        this._eleData = null; //服装数据
        this._groupData = null; //组数据
        this._allData = null; //全身服装数据
    }
    var d = __define,c=SkinData,p=c.prototype;
    //设置服装数据
    p.setEleData = function (val) {
        this._eleData = val;
    };
    d(p, "eleData"
        //获取服装数据
        ,function () {
            return this._eleData;
        }
    );
    //设置组数据
    p.setGroupData = function (val) {
        this._groupData = val;
    };
    d(p, "groupData"
        //获取组数据
        ,function () {
            return this._groupData;
        }
    );
    //设置全身服装数据
    p.setAllData = function (val) {
        this._allData = val;
    };
    d(p, "allData"
        //获取全身服装数据
        ,function () {
            return this._allData;
        }
    );
    //通过ID获取其资源中的resNames数据项
    p.getResNamesDataByID = function (id) {
        var len = this._eleData.length;
        for (var i = 0; i < len; i++) {
            if (this._eleData[i].id == id) {
                return this._eleData[i].resNames;
            }
        }
        return null;
    };
    //通过type类型，获取element数据
    p.getEleDataByType = function (type) {
        if (type == "all") {
            return this._allData;
        }
        var eles = [];
        var len = this._eleData.length;
        for (var i = 0; i < len; i++) {
            if (this._eleData[i].type == type) {
                eles.push(this._eleData[i]);
            }
        }
        return eles;
    };
    //根据ID搜索全身服装中的资源名
    p.getResNamesDataByIDWithAll = function (id) {
        var eleids;
        var len = this._allData.length;
        for (var i = 0; i < len; i++) {
            if (this._allData[i].id == id) {
                eleids = this._allData[i].resNames;
                break;
            }
        }
        var strs = [];
        len = eleids.length;
        for (var i = 0; i < len; i++) {
            strs.push(this.getResNamesDataByID(eleids[i]));
        }
        return strs;
    };
    return SkinData;
})();
egret.registerClass(SkinData,'SkinData');
