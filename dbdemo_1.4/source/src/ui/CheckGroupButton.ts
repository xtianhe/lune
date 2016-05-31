/**

 单选按钮组

 author: mebius.ashan
 date  : 2016.2.16

 */

class CheckGroupButton
{

    protected _checkBtns:CheckButton[] = null;  //当前组内单选按钮

    public constructor()
    {
        this._checkBtns = [];
        this._display = new egret.DisplayObjectContainer();
    }

    protected _unSkinName    : string = "";  //未选中时按钮麸皮纹理名称
    protected _checkSkinName : string = "";  //选中时按钮皮肤纹理名称

    //设置皮肤纹理
    public setSkin( unSkinName:string, checkSkinName:string )
    {
        this._unSkinName = unSkinName;
        this._checkSkinName = checkSkinName;
    }

    public groupWidth:number = 0; //当前按钮组所显示的宽度

    //添加数据
    public addData( val:ElementData[] )
    {
        var len:number = val.length;
        for( var i:number=0; i<len; i++ )
        {
            var cb:CheckButton = new CheckButton();
            cb.setSkin( this._unSkinName, this._checkSkinName );
            cb.setContext( val[i].icon );
            cb.ID   = val[i].id;
            cb.TYPE = val[i].type;
            this._checkBtns.push( cb );
            this._display.addChild( cb );
            cb.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.checkBtnClick,this);
        }
        this._checkBtns[0].isCheck = true;
        this._currentCheckButton = this._checkBtns[0];
        this.arrange();
    }

    protected _space:number = 0;  //边距距离

    //显示布局排列
    //此排列方法未横向顺序排列
    protected arrange()
    {
        var len:number = this._checkBtns.length;
        this._space = (this.groupWidth - this._checkBtns[0].width*len) / (len+1);
        var w:number = this._space + this._checkBtns[0].width;
        for( var i:number=0; i<len; i++ )
        {
            this._checkBtns[i].arrange();
            this._checkBtns[i].x = w*i;
        }
    }

    protected _display:egret.DisplayObjectContainer = null;  //当前按钮组显示对象
    public get display():egret.DisplayObjectContainer
    {
        return this._display;
    }

    protected _currentCheckButton:CheckButton = null; //当前选中的单选按钮对象

    //按钮点击后，进行状态切换
    protected checkBtnClick( evt:egret.TouchEvent )
    {
        if( this._currentCheckButton!=evt.currentTarget )
        {
            if( this._currentCheckButton )
            {
                this._currentCheckButton.isCheck = false;
            }
            this._currentCheckButton = evt.currentTarget;
            this.sendMessage( evt.currentTarget.ID, evt.currentTarget.TYPE )
        }
    }

    //发送消息到消息中心
    protected sendMessage(id:string, type:string)
    {
        MessageCenter.getInstance().sendMessage(MessageCenter.CHANGE_UI_GROUP, type);
    }

}