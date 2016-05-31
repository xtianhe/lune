/**

 主逻辑

 author: mebius.ashan
 date  : 2016.2.16

 */
var Logic = (function () {
    function Logic() {
        this._pm = null; //骨骼动画人物控制器
        this._skinData = null; //皮肤数据
        this._scene = null; //场景
    }
    var d = __define,c=Logic,p=c.prototype;
    //启动逻辑模块
    //root参数为显示列表根，当前Demo所有显示内容全部放置于root中
    p.start = function (root) {
        this.createSkinData();
        this.createPeople();
        this.createScene(root);
        this.createMessageListener();
    };
    //创建骨骼动画人物
    p.createPeople = function () {
        this._pm = new PeopleManage();
    };
    //创建皮肤数据
    p.createSkinData = function () {
        this._skinData = new SkinData();
        SkinParse.parse(RES.getRes("ele_json"), this._skinData);
    };
    //创建场景
    p.createScene = function (root) {
        this._scene = new Scene();
        root.addChild(this._scene);
        this._scene.renderScene();
        this._scene.setPeople(this._pm.display);
        this._scene.setGroupData(this._skinData.groupData);
        this._scene.setAllData(this._skinData.getEleDataByType("all"));
    };
    //监听消息中心
    p.createMessageListener = function () {
        MessageCenter.getInstance().addEventListener(MessageCenter.CHANGE_UI_GROUP, this.changeGroupData, this);
        MessageCenter.getInstance().addEventListener(MessageCenter.CHANGE_PEOPLE_ELEMENT, this.changePeopleElement, this);
    };
    //改变UI组数据，UI组为Demo中的服装选择按钮
    p.changeGroupData = function (evt) {
        if (evt.data == "all") {
            this._scene.setAllData(this._skinData.getEleDataByType(evt.data));
        }
        else {
            this._scene.setElesData(this._skinData.getEleDataByType(evt.data));
        }
    };
    //修改骨骼动画人物服装
    p.changePeopleElement = function (evt) {
        var data = evt.data;
        switch (data.type) {
            case "head":
                this._pm.setHead(this._skinData.getResNamesDataByID(data.id));
                break;
            case "cloth":
                this._pm.setCloth(this._skinData.getResNamesDataByID(data.id));
                break;
            case "pants":
                this._pm.setPants(this._skinData.getResNamesDataByID(data.id));
                break;
            case "shoe":
                this._pm.setShoe(this._skinData.getResNamesDataByID(data.id));
                break;
            case "all":
                this._pm.setAll(this._skinData.getResNamesDataByIDWithAll(data.id));
                break;
        }
    };
    return Logic;
})();
egret.registerClass(Logic,'Logic');
