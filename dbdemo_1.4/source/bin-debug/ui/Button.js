/**

 简单按钮

 author: mebius.ashan
 date  : 2016.2.19

 */
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        _super.call(this);
        this._upSkin = null; //抬起状态皮肤
        this._downSkin = null; //按下状态皮肤
        this.touchEnabled = true;
    }
    var d = __define,c=Button,p=c.prototype;
    //设置皮肤
    //upSkinName 与 downSkinName 为抬起和按下状态时皮肤纹理名称
    p.setSkin = function (upSkinName, downSkinName) {
        this._upSkin = new egret.Bitmap();
        this._upSkin.texture = RES.getRes(upSkinName);
        this._downSkin = new egret.Bitmap();
        this._downSkin.texture = RES.getRes(downSkinName);
        this.renderSkin();
    };
    //渲染皮肤
    p.renderSkin = function () {
        this.addChild(this._upSkin);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDown, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchUp, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchUp, this);
    };
    p.touchDown = function (evt) {
        this.removeChild(this._upSkin);
        this.addChild(this._downSkin);
    };
    p.touchUp = function (evt) {
        this.removeChild(this._downSkin);
        this.addChild(this._upSkin);
    };
    return Button;
})(egret.DisplayObjectContainer);
egret.registerClass(Button,'Button');
