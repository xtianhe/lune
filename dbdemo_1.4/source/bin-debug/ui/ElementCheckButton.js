/**

 服装元素单选按钮

 author: mebius.ashan
 date  : 2016.2.16

 */
var ElementCheckButton = (function (_super) {
    __extends(ElementCheckButton, _super);
    function ElementCheckButton() {
        _super.call(this);
    }
    var d = __define,c=ElementCheckButton,p=c.prototype;
    //初始化皮肤
    p.initSkin = function () {
        this.initBackground();
        this.initContext();
        this.initSkinBitmap();
    };
    //初始化背景
    p.initBackground = function () {
        this._backGroundBitmap = new egret.Bitmap();
        this.addChild(this._backGroundBitmap);
    };
    //设置背景图纹理
    p.setBackground = function (textureName) {
        console.log(this._backGroundBitmap);
        this._backGroundBitmap.texture = RES.getRes(textureName);
    };
    //设置尺寸
    p.setSize = function (size) {
        this._backGroundBitmap.width = size;
        this._backGroundBitmap.height = size;
        this._skinBitmap.width = size;
        this._skinBitmap.height = size;
        this._context.width = size - 10;
        this._context.height = size - 10;
    };
    //对按钮内部元素进行布局排列，全居中对齐
    p.arrange = function () {
        this._context.x = (this._skinBitmap.width - this._context.width) / 2;
        this._context.y = (this._skinBitmap.height - this._context.height) / 2;
    };
    //设置按钮缩放比例
    //参数w为目标宽度
    p.setScale = function (w) {
        var scale = w / this._checkSkinTexture.textureWidth;
        var ww = this._checkSkinTexture.textureWidth * scale;
        var hh = this._checkSkinTexture.textureHeight * scale;
        this._backGroundBitmap.width = ww;
        this._backGroundBitmap.height = hh;
        this._skinBitmap.width = ww;
        this._skinBitmap.height = hh;
    };
    return ElementCheckButton;
})(CheckButton);
egret.registerClass(ElementCheckButton,'ElementCheckButton');
