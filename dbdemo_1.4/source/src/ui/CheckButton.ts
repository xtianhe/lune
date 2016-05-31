/**

 单选按钮

 author: mebius.ashan
 date  : 2016.2.16

 */

class CheckButton extends egret.DisplayObjectContainer
{
    public ID   : string = "";  //当前按钮所代表的服装元素ID
    public TYPE : string = "";  //当前按钮所代表的服装元素类型

    public constructor()
    {
        super();
        this.initSkin();
        this.touchEnabled = true;
        this.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.click, this );
    }

    protected _isCheck:boolean = false; //是否被选中
    public get isCheck():boolean
    {
        return this._isCheck;
    }
    public set isCheck( val:boolean )
    {
        this._isCheck = val;
        this.change();
    }

    protected _skinBitmap       : egret.Bitmap  = null; //按钮皮肤
    protected _unSkinTexture    : egret.Texture = null; //按钮未被选中时所显示的皮肤纹理
    protected _checkSkinTexture : egret.Texture = null; //按钮选中时所显示的皮肤纹理

    //设置皮肤纹理
    //unSkinName,checkSkinName为纹理ID
    public setSkin( unSkinName:string, checkSkinName:string )
    {
        this._unSkinTexture = RES.getRes( unSkinName );
        this._checkSkinTexture = RES.getRes( checkSkinName );
    }

    //初始化皮肤
    protected initSkin()
    {
        this.initSkinBitmap();
        this.initContext();
    }

    //初始虎皮肤实际显示对象
    protected initSkinBitmap()
    {
        this._skinBitmap = new egret.Bitmap();
        this._skinBitmap.texture = this._unSkinTexture;
        this.addChild( this._skinBitmap );
    }

    //初始化按钮所显示的内容，此Demo中内容为服装Logo
    protected initContext()
    {
        this._context = new egret.Bitmap;
        this.addChild( this._context );
    }

    protected _context:egret.Bitmap; //按钮所显示的内容

    //设置按钮所显示的内容
    public setContext( textureName:string )
    {
        this._context.texture = RES.getRes( textureName );
    }

    //排列按钮中各个元素的位置，此按钮为全居中对齐
    public arrange()
    {
        this._context.x = (this._checkSkinTexture.textureWidth - this._context.width)/2;
        this._context.y = (this._checkSkinTexture.textureHeight - this._context.height)/2;
    }

    //设置大小
    public setSize( size:number )
    {
        this._skinBitmap.width = size;
        this._skinBitmap.height = size;

        this._context.width = size - 10;
        this._context.height = size - 10;
    }

    //设置缩放比例
    //参数w并非比例值，而是目标尺寸宽度
    public setScale( w:number )
    {
        var scale:number = w/this._skinBitmap.width;

        this._skinBitmap.scaleX = scale;
        this._skinBitmap.scaleY = scale;

        this._context.scaleX = scale;
        this._context.scaleY = scale;
    }

    //当按钮被点击后，切换显示状态时调用change方法
    protected change()
    {
        if(this._isCheck)
        {
            this._skinBitmap.texture = this._checkSkinTexture;
        }
        else
        {
            this._skinBitmap.texture = this._unSkinTexture;
        }
    }

    //按钮点击响应，按钮自身点击操作只在未选择状态下点击进行状态切换
    protected click( evt:egret.TouchEvent )
    {
        if( this._isCheck == false)
        {
            this._isCheck = true;
            this.change();
        }
    }
}