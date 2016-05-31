/**

 全套服装单选按钮组

 author: mebius.ashan
 date  : 2016.2.16

 */

class AllElementCheckGroupButton extends CheckGroupButton
{
    public constructor()
    {
        super();
    }

    //添加按钮数据
    public addData( val:ElementData[] )
    {
        var len:number = val.length;
        for(var i:number=0;i<len;i++)
        {
            var cb:ElementCheckButton = new ElementCheckButton();
            cb.setSkin( this._unSkinName, this._checkSkinName );
            cb.setContext( val[i].icon );
            cb.setBackground( "fuzhuangge_png" );
            cb.ID   = val[i].id;
            cb.TYPE = val[i].type;
            this._checkBtns.push( cb );
            this._display.addChild( cb );
            cb.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.checkBtnClick,this);
        }
        this.arrange();
    }

    //对按钮进行位置排列，当前排列样式为横向排列
    protected arrange()
    {
        var len:number = this._checkBtns.length;
        if(len!=0)
        {
            var w:number = (this.groupWidth - this._space*3)/4;
            for(var i:number=0;i<len;i++) {
                this._checkBtns[i].setScale(w);
                this._checkBtns[i].arrange();
                this._checkBtns[i].x = (i%4)*(w+this._space);
            }
        }
    }

    //当某一单选按钮被点击，则通过消息中心发送消息
    protected sendMessage( id:string, type:string )
    {
        MessageCenter.getInstance().sendMessage(MessageCenter.CHANGE_PEOPLE_ELEMENT, {id:id,type:type});
    }
}