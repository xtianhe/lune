/**

 服装元素单选按钮组

 author: mebius.ashan
 date  : 2016.2.16

 */
var ElementCheckGroupButton = (function (_super) {
    __extends(ElementCheckGroupButton, _super);
    function ElementCheckGroupButton() {
        _super.call(this);
        this._space = 5;
    }
    var d = __define,c=ElementCheckGroupButton,p=c.prototype;
    //设置数据
    p.addData = function (val) {
        var len = val.length;
        for (var i = 0; i < len; i++) {
            var cb = new ElementCheckButton();
            cb.setSkin(this._unSkinName, this._checkSkinName);
            cb.setContext(val[i].icon);
            cb.setBackground("wupinge_png");
            cb.ID = val[i].id;
            cb.TYPE = val[i].type;
            this._checkBtns.push(cb);
            this._display.addChild(cb);
            cb.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.checkBtnClick, this);
        }
        this.arrange();
    };
    //对按钮进行布局排列
    //排列规则为多行4列
    p.arrange = function () {
        var len = this._checkBtns.length;
        if (len != 0) {
            var w = (this.groupWidth - this._space * 3) / 4;
            for (var i = 0; i < len; i++) {
                this._checkBtns[i].setSize(w);
                this._checkBtns[i].arrange();
                this._checkBtns[i].x = (i % 4) * (w + this._space);
                this._checkBtns[i].y = Math.floor(i / 4) * (w + this._space);
            }
        }
    };
    //按钮点击后，发送消息到消息中心
    p.sendMessage = function (id, type) {
        MessageCenter.getInstance().sendMessage(MessageCenter.CHANGE_PEOPLE_ELEMENT, { id: id, type: type });
    };
    return ElementCheckGroupButton;
})(CheckGroupButton);
egret.registerClass(ElementCheckGroupButton,'ElementCheckGroupButton');
