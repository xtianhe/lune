/**

 骨骼动画人物控制器

 author: mebius.ashan
 date  : 2016.2.16

 */
var PeopleManage = (function () {
    function PeopleManage() {
        this._armature = null; //人物骨架
        this.init();
    }
    var d = __define,c=PeopleManage,p=c.prototype;
    //初始化人物骨骼动画
    p.init = function () {
        var dbdata = RES.getRes("man_json");
        var texturedata = RES.getRes("texture_json");
        var texture = RES.getRes("texture_png");
        var dbf = new dragonBones.EgretFactory();
        dbf.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(dbdata));
        dbf.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, texturedata));
        var arm = dbf.buildArmature("man");
        arm.animation.gotoAndPlay("runFront", 0, -1, 0);
        dragonBones.WorldClock.clock.add(arm);
        this._armature = arm;
        egret.startTick(this.dbrun, this);
    };
    //由tick驱动，刷新DragonBones世界时钟
    p.dbrun = function (timeStamp) {
        dragonBones.WorldClock.clock.advanceTime(0.01);
        return true;
    };
    d(p, "display"
        //获取骨架中的display显示对象
        ,function () {
            return this._armature.display;
        }
    );
    //设置头发slot
    //参数为即将替换的纹理集ID
    p.setHead = function (val) {
        this.setNewSlot("Atoufa", val[0]);
    };
    //设置上衣
    //参数为即将替换的纹理集ID
    p.setCloth = function (val) {
        this.setNewSlot("Ayifu", val[0]);
        this.setNewSlot("Axiuzi11", val[1]);
        this.setNewSlot("Axiuzi21", val[2]);
        this.setNewSlot("Axiuzi12", val[3]);
        this.setNewSlot("Axiuzi22", val[4]);
    };
    //设置裤子
    //参数为即将替换的纹理集ID
    p.setPants = function (val) {
        this.setNewSlot("Akuzi", val[0]);
        this.setNewSlot("Akuzi12", val[1]);
        this.setNewSlot("Akuzi22", val[2]);
        this.setNewSlot("Akuzi11", val[3]);
        this.setNewSlot("Akuzi21", val[4]);
    };
    //设置鞋子
    //参数为即将替换的纹理集ID
    p.setShoe = function (val) {
        this.setNewSlot("Axiezi1", val[0]);
        this.setNewSlot("Axiezi2", val[1]);
    };
    //设置整套服装
    //参数为即将替换的整套服装的资源ID，数据为二维数组，第一维顺序依次表示，头发，上衣，裤子，鞋子
    p.setAll = function (val) {
        this.setHead(val[0]);
        this.setCloth(val[1]);
        this.setPants(val[2]);
        this.setShoe(val[3]);
    };
    //针对slot设置其新内容
    p.setNewSlot = function (slotName, textureName) {
        //方法1
        var slot = this._armature.getSlot(slotName);
        var b = new egret.Bitmap();
        b.texture = RES.getRes(textureName);
        b.x = slot.display.x;
        b.y = slot.display.y;
        b.anchorOffsetX = b.width / 2;
        b.anchorOffsetY = b.height / 2;
        slot.setDisplay(b);
        //方法2，仅限于slot中内容为Bitmap
        //var slot:dragonBones.Slot = this._armature.getSlot(slotName);
        //slot.display.texture = RES.getRes(textureName);
    };
    return PeopleManage;
})();
egret.registerClass(PeopleManage,'PeopleManage');
