/**

 Demo场景

 author: mebius.ashan
 date  : 2016.2.16

 */
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        _super.call(this);
        this._borderSpace = 15; //距边界距离
        this._typeBannerBackGround = null; //分类按钮背景图
        this._checkGroupButton = null; //单选按钮组，该按钮组用于显示分类按钮
        this._elementLayer = null; //元素显示层级
        this._allEleCheckGroupButton = null; //整套服装单选按钮组
        this._eleCheckGroupButton = null; //服装单选按钮组
    }
    var d = __define,c=Scene,p=c.prototype;
    //开始渲染场景，此渲染为初始化操作，只执行一次。
    p.renderScene = function () {
        this.createBackGround();
        this.createButtons();
        this.createTypeBannerBg();
    };
    //设置骨骼动画人物显示对象
    p.setPeople = function (val) {
        val.x = 230;
        val.y = 250;
        var scale = 200 / val.height;
        val.scaleX = scale;
        val.scaleY = scale;
        this.addChild(val);
    };
    //创建背景
    p.createBackGround = function () {
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("shiyijianbeijing_png");
        bg.x = (this.stage.stageWidth - bg.width) / 2;
        bg.y = -220;
        this.addChild(bg);
    };
    //创建场景中按钮和其他元素
    p.createButtons = function () {
        //返回按钮
        var backBtn = new Button();
        backBtn.setSkin("fanhui_png", "fanhui_0_png");
        backBtn.x = 0;
        backBtn.y = 0;
        this.addChild(backBtn);
        //钻石背景
        var moneybg = new egret.Bitmap();
        moneybg.texture = RES.getRes("shuzidiban_png");
        moneybg.x = 280;
        moneybg.y = 0;
        this.addChild(moneybg);
        //钻石Logo
        var moneylogo = new egret.Bitmap();
        moneylogo.texture = RES.getRes("zuanshi_png");
        moneylogo.x = 300;
        moneylogo.y = 25;
        this.addChild(moneylogo);
        //钻石数量文本
        var moneyText = new egret.TextField();
        moneyText.textColor = 0;
        moneyText.text = "2008";
        moneyText.x = 360;
        moneyText.y = 30;
        this.addChild(moneyText);
        //购买按钮
        var buyBtn = new Button();
        buyBtn.setSkin("gouwu_png", "gouwu_0_png");
        buyBtn.x = (this.stage.stageWidth - buyBtn.width) / 2;
        buyBtn.y = 700;
        this.addChild(buyBtn);
    };
    //创建分类按钮组
    p.createTypeBannerBg = function () {
        this._typeBannerBackGround = new egret.Bitmap();
        this._typeBannerBackGround.texture = RES.getRes("xitongtubiaodiban_png");
        this._typeBannerBackGround.width = (this.stage.stageWidth - this._borderSpace * 2);
        this._typeBannerBackGround.x = this._borderSpace;
        this._typeBannerBackGround.y = 340;
        this.addChild(this._typeBannerBackGround);
        this.createElementLayer();
    };
    //设置分类数据信息
    p.setGroupData = function (val) {
        this._checkGroupButton = new CheckGroupButton();
        this._checkGroupButton.groupWidth = this._typeBannerBackGround.width - this._borderSpace * 2;
        this._checkGroupButton.setSkin("", "tubiaoxuanzhong_png");
        this._checkGroupButton.addData(val);
        this._checkGroupButton.display.x = this._typeBannerBackGround.x + this._borderSpace;
        this._checkGroupButton.display.y = this._typeBannerBackGround.y + 10;
        this.addChild(this._checkGroupButton.display);
    };
    //创建元素显示层级，不同分类的服装显示对象均放置于_elementLayer对象中
    p.createElementLayer = function () {
        this._elementLayer = new egret.DisplayObjectContainer();
        this._elementLayer.x = this._typeBannerBackGround.x;
        this._elementLayer.y = this._typeBannerBackGround.y + this._typeBannerBackGround.height + 10;
        this.addChild(this._elementLayer);
    };
    //设置整套服装按钮数据
    p.setAllData = function (val) {
        this._allEleCheckGroupButton = new AllElementCheckGroupButton();
        this._allEleCheckGroupButton.groupWidth = this._typeBannerBackGround.width;
        this._allEleCheckGroupButton.setSkin("", "xuanzhong2_png");
        this._allEleCheckGroupButton.addData(val);
        this._elementLayer.removeChildren();
        this._elementLayer.addChild(this._allEleCheckGroupButton.display);
    };
    //设置服装按钮数据
    p.setElesData = function (val) {
        this._eleCheckGroupButton = new ElementCheckGroupButton();
        this._eleCheckGroupButton.groupWidth = this._typeBannerBackGround.width;
        this._eleCheckGroupButton.setSkin("", "xuanzhong_png");
        this._eleCheckGroupButton.addData(val);
        this._elementLayer.removeChildren();
        this._elementLayer.addChild(this._eleCheckGroupButton.display);
    };
    return Scene;
})(egret.DisplayObjectContainer);
egret.registerClass(Scene,'Scene');
