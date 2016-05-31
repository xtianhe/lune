/**

 消息中心

 author: mebius.ashan
 date  : 2016.2.16

 */

class MessageCenter extends egret.EventDispatcher
{

    public static CHANGE_UI_GROUP       : string = "changeUIGroup";       //改变UI组数据
    public static CHANGE_PEOPLE_ELEMENT : string = "changePeopleElement"; //改变人物服装

    private static _this   : MessageCenter = null ; //私有对象，为单例模式提供支持
    private static _isInit : boolean       = true ; //私有对象，为单例模式提供支持

    public constructor()
    {
        if( MessageCenter._isInit )
        {
            throw new Error( "MessageCenter为单例模式，请使用 MessageCenter.getInstance()获取实例！" );
        }
        super();
    }

    //获取单例
    public static getInstance():MessageCenter
    {
        if( MessageCenter._this==null )
        {
            MessageCenter._isInit = false;
            MessageCenter._this = new MessageCenter();
            MessageCenter._isInit = true;
        }
        return MessageCenter._this
    }

    //发送消息
    public sendMessage( message:string, data:any ):void
    {
        var event:egret.Event = new egret.Event( message );
        event.data = data;
        this.dispatchEvent( event );
    }
}