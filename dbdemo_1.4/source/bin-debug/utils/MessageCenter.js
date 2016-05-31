/**

 消息中心

 author: mebius.ashan
 date  : 2016.2.16

 */
var MessageCenter = (function (_super) {
    __extends(MessageCenter, _super);
    function MessageCenter() {
        if (MessageCenter._isInit) {
            throw new Error("MessageCenter为单例模式，请使用 MessageCenter.getInstance()获取实例！");
        }
        _super.call(this);
    }
    var d = __define,c=MessageCenter,p=c.prototype;
    //获取单例
    MessageCenter.getInstance = function () {
        if (MessageCenter._this == null) {
            MessageCenter._isInit = false;
            MessageCenter._this = new MessageCenter();
            MessageCenter._isInit = true;
        }
        return MessageCenter._this;
    };
    //发送消息
    p.sendMessage = function (message, data) {
        var event = new egret.Event(message);
        event.data = data;
        this.dispatchEvent(event);
    };
    MessageCenter.CHANGE_UI_GROUP = "changeUIGroup"; //改变UI组数据
    MessageCenter.CHANGE_PEOPLE_ELEMENT = "changePeopleElement"; //改变人物服装
    MessageCenter._this = null; //私有对象，为单例模式提供支持
    MessageCenter._isInit = true; //私有对象，为单例模式提供支持
    return MessageCenter;
})(egret.EventDispatcher);
egret.registerClass(MessageCenter,'MessageCenter');
