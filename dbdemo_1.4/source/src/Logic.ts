/**

 主逻辑

 author: mebius.ashan
 date  : 2016.2.16

 */


class Logic
{

    private _pm       : PeopleManage = null;  //骨骼动画人物控制器
    private _skinData : SkinData     = null;  //皮肤数据
    private _scene    : Scene        = null;  //场景

    //启动逻辑模块
    //root参数为显示列表根，当前Demo所有显示内容全部放置于root中
    public start( root:egret.DisplayObjectContainer )
    {
        this.createSkinData();
        this.createPeople();
        this.createScene( root );
        this.createMessageListener();
    }

    //创建骨骼动画人物
    private createPeople()
    {
        this._pm = new PeopleManage();
    }

    //创建皮肤数据
    private createSkinData()
    {
        this._skinData = new SkinData();
        SkinParse.parse( RES.getRes("ele_json"), this._skinData );
    }

    //创建场景
    private createScene( root:egret.DisplayObjectContainer )
    {
        this._scene = new Scene();
        root.addChild( this._scene );
        this._scene.renderScene();
        this._scene.setPeople( this._pm.display );
        this._scene.setGroupData( this._skinData.groupData );
        this._scene.setAllData( this._skinData.getEleDataByType("all") );
    }

    //监听消息中心
    private createMessageListener()
    {
        MessageCenter.getInstance().addEventListener( MessageCenter.CHANGE_UI_GROUP, this.changeGroupData, this );
        MessageCenter.getInstance().addEventListener( MessageCenter.CHANGE_PEOPLE_ELEMENT, this.changePeopleElement, this );
    }

    //改变UI组数据，UI组为Demo中的服装选择按钮
    private changeGroupData( evt:egret.Event )
    {
        if( evt.data=="all" )
        {
            this._scene.setAllData( this._skinData.getEleDataByType(evt.data) );
        }
        else
        {
            this._scene.setElesData( this._skinData.getEleDataByType(evt.data) );
        }
    }

    //修改骨骼动画人物服装
    private changePeopleElement( evt:egret.Event )
    {
        var data:any = evt.data;
        switch( data.type )
        {
            case "head" :  //头发
                this._pm.setHead(  this._skinData.getResNamesDataByID(data.id)        );
                break;
            case "cloth":  //上衣
                this._pm.setCloth( this._skinData.getResNamesDataByID(data.id)        );
                break;
            case "pants":  //裤子
                this._pm.setPants( this._skinData.getResNamesDataByID(data.id)        );
                break;
            case "shoe" :  //鞋子
                this._pm.setShoe(  this._skinData.getResNamesDataByID(data.id)        );
                break;
            case "all"  :  //全身
                this._pm.setAll(   this._skinData.getResNamesDataByIDWithAll(data.id) );
                break;
        }
    }
}