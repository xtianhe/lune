/**

 单选按钮

 author: mebius.ashan
 date  : 2016.2.16

 */
var CheckButton = (function (_super) {
    __extends(CheckButton, _super);
    function CheckButton() {
        _super.call(this);
        this.ID = ""; //当前按钮所代表的服装元素ID
        this.TYPE = ""; //当前按钮所代表的服装元素类型
        this._isCheck = false; //是否被选中
        this._skinBitmap = null; //按钮皮肤
        this._unSkinTexture = null; //按钮未被选中时所显示的皮肤纹理
        this._checkSkinTexture = null; //按钮选中时所显示的皮肤纹理
        this.initSkin();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.click, this);
    }
    var d = __define,c=CheckButton,p=c.prototype;
    d(p, "isCheck"
        ,function () {
            return this._isCheck;
        }
        ,function (val) {
            this._isCheck = val;
            this.change();
        }
    );
    //设置皮肤纹理
    //unSkinName,checkSkinName为纹理ID
    p.setSkin = function (unSkinName, checkSkinName) {
        this._unSkinTexture = RES.getRes(unSkinName);
        this._checkSkinTexture = RES.getRes(checkSkinName);
    };
    //初始化皮肤
    p.initSkin = function () {
        this.initSkinBitmap();
        this.initContext();
    };
    //初始虎皮肤实际显示对象
    p.initSkinBitmap = function () {
        this._skinBitmap = new egret.Bitmap();
        this._skinBitmap.texture = this._unSkinTexture;
        this.addChild(this._skinBitmap);
    };
    //初始化按钮所显示的内容，此Demo中内容为服装Logo
    p.initContext = function () {
        this._context = new egret.Bitmap;
        this.addChild(this._context);
    };
    //设置按钮所显示的内容
    p.setContext = function (textureName) {
        this._context.texture = RES.getRes(textureName);
    };
    //排列按钮中各个元素的位置，此按钮为全居中对齐
    p.arrange = function () {
        this._context.x = (this._checkSkinTexture.textureWidth - this._context.width) / 2;
        this._context.y = (this._checkSkinTexture.textureHeight - this._context.height) / 2;
    };
    //设置大小
    p.setSize = function (size) {
        this._skinBitmap.width = size;
        this._skinBitmap.height = size;
        this._context.width = size - 10;
        this._context.height = size - 10;
    };
    //设置缩放比例
    //参数w并非比例值，而是目标尺寸宽度
    p.setScale = function (w) {
        var scale = w / this._skinBitmap.width;
        this._skinBitmap.scaleX = scale;
        this._skinBitmap.scaleY = scale;
        this._context.scaleX = scale;
        this._context.scaleY = scale;
    };
    //当按钮被点击后，切换显示状态时调用change方法
    p.change = function () {
        if (this._isCheck) {
            this._skinBitmap.texture = this._checkSkinTexture;
        }
        else {
            this._skinBitmap.texture = this._unSkinTexture;
        }
    };
    //按钮点击响应，按钮自身点击操作只在未选择状态下点击进行状态切换
    p.click = function (evt) {
        if (this._isCheck == false) {
            this._isCheck = true;
            this.change();
        }
    };
    return CheckButton;
})(egret.DisplayObjectContainer);
egret.registerClass(CheckButton,'CheckButton');
