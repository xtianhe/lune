/**

 单选按钮组

 author: mebius.ashan
 date  : 2016.2.16

 */
var CheckGroupButton = (function () {
    function CheckGroupButton() {
        this._checkBtns = null; //当前组内单选按钮
        this._unSkinName = ""; //未选中时按钮麸皮纹理名称
        this._checkSkinName = ""; //选中时按钮皮肤纹理名称
        this.groupWidth = 0; //当前按钮组所显示的宽度
        this._space = 0; //边距距离
        this._display = null; //当前按钮组显示对象
        this._currentCheckButton = null; //当前选中的单选按钮对象
        this._checkBtns = [];
        this._display = new egret.DisplayObjectContainer();
    }
    var d = __define,c=CheckGroupButton,p=c.prototype;
    //设置皮肤纹理
    p.setSkin = function (unSkinName, checkSkinName) {
        this._unSkinName = unSkinName;
        this._checkSkinName = checkSkinName;
    };
    //添加数据
    p.addData = function (val) {
        var len = val.length;
        for (var i = 0; i < len; i++) {
            var cb = new CheckButton();
            cb.setSkin(this._unSkinName, this._checkSkinName);
            cb.setContext(val[i].icon);
            cb.ID = val[i].id;
            cb.TYPE = val[i].type;
            this._checkBtns.push(cb);
            this._display.addChild(cb);
            cb.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.checkBtnClick, this);
        }
        this._checkBtns[0].isCheck = true;
        this._currentCheckButton = this._checkBtns[0];
        this.arrange();
    };
    //显示布局排列
    //此排列方法未横向顺序排列
    p.arrange = function () {
        var len = this._checkBtns.length;
        this._space = (this.groupWidth - this._checkBtns[0].width * len) / (len + 1);
        var w = this._space + this._checkBtns[0].width;
        for (var i = 0; i < len; i++) {
            this._checkBtns[i].arrange();
            this._checkBtns[i].x = w * i;
        }
    };
    d(p, "display"
        ,function () {
            return this._display;
        }
    );
    //按钮点击后，进行状态切换
    p.checkBtnClick = function (evt) {
        if (this._currentCheckButton != evt.currentTarget) {
            if (this._currentCheckButton) {
                this._currentCheckButton.isCheck = false;
            }
            this._currentCheckButton = evt.currentTarget;
            this.sendMessage(evt.currentTarget.ID, evt.currentTarget.TYPE);
        }
    };
    //发送消息到消息中心
    p.sendMessage = function (id, type) {
        MessageCenter.getInstance().sendMessage(MessageCenter.CHANGE_UI_GROUP, type);
    };
    return CheckGroupButton;
})();
egret.registerClass(CheckGroupButton,'CheckGroupButton');
