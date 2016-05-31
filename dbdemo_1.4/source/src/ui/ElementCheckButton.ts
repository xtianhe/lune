/**

 服装元素单选按钮

 author: mebius.ashan
 date  : 2016.2.16

 */

class ElementCheckButton extends CheckButton
{
    public constructor()
    {
        super();
    }

    protected _backGroundBitmap:egret.Bitmap ; //背景图

    //初始化皮肤
    protected initSkin()
    {
        this.initBackground();
        this.initContext();
        this.initSkinBitmap();
    }

    //初始化背景
    private initBackground()
    {
        this._backGroundBitmap = new egret.Bitmap();
        this.addChild( this._backGroundBitmap );
    }

    //设置背景图纹理
    public setBackground( textureName:string )
    {
        console.log(this._backGroundBitmap);
        this._backGroundBitmap.texture = RES.getRes( textureName );
    }

    //设置尺寸
    public setSize( size:number )
    {
        this._backGroundBitmap.width = size;
        this._backGroundBitmap.height = size;

        this._skinBitmap.width = size;
        this._skinBitmap.height = size;

        this._context.width = size - 10;
        this._context.height = size - 10;
    }

    //对按钮内部元素进行布局排列，全居中对齐
    public arrange()
    {
        this._context.x = (this._skinBitmap.width - this._context.width)/2;
        this._context.y = (this._skinBitmap.height - this._context.height)/2;
    }

    //设置按钮缩放比例
    //参数w为目标宽度
    public setScale( w:number )
    {
        var scale:number = w/this._checkSkinTexture.textureWidth;
        var ww:number = this._checkSkinTexture.textureWidth*scale;
        var hh:number = this._checkSkinTexture.textureHeight*scale;

        this._backGroundBitmap.width = ww;
        this._backGroundBitmap.height = hh;

        this._skinBitmap.width = ww;
        this._skinBitmap.height = hh;
    }

}