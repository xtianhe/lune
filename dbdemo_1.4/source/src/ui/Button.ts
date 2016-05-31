/**

 简单按钮

 author: mebius.ashan
 date  : 2016.2.19

 */


class Button extends egret.DisplayObjectContainer
{
    public constructor()
    {
        super();
        this.touchEnabled = true;
    }

    private _upSkin   : egret.Bitmap = null;  //抬起状态皮肤
    private _downSkin : egret.Bitmap = null;  //按下状态皮肤

    //设置皮肤
    //upSkinName 与 downSkinName 为抬起和按下状态时皮肤纹理名称
    public setSkin( upSkinName:string, downSkinName:string )
    {
        this._upSkin = new egret.Bitmap();
        this._upSkin.texture = RES.getRes(upSkinName);
        this._downSkin = new egret.Bitmap();
        this._downSkin.texture = RES.getRes(downSkinName);
        this.renderSkin();
    }

    //渲染皮肤
    private renderSkin()
    {
        this.addChild(this._upSkin);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchDown,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchUp,this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchUp,this);
    }

    private touchDown(evt:egret.TouchEvent)
    {
        this.removeChild(this._upSkin);
        this.addChild(this._downSkin);
    }
    private touchUp(evt:egret.TouchEvent)
    {
        this.removeChild(this._downSkin);
        this.addChild(this._upSkin);
    }
}