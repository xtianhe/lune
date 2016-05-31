/**

 Demo场景

 author: mebius.ashan
 date  : 2016.2.16

 */

class Scene extends egret.DisplayObjectContainer
{
    public constructor()
    {
        super();
    }

    //开始渲染场景，此渲染为初始化操作，只执行一次。
    public renderScene()
    {
        this.createBackGround();
        this.createButtons();
        this.createTypeBannerBg();
    }

    //设置骨骼动画人物显示对象
    public setPeople( val:egret.DisplayObject )
    {
        val.x = 230;
        val.y = 250;
        var scale:number = 200/val.height;
        val.scaleX = scale;
        val.scaleY = scale;
        this.addChild( val );
    }

    //创建背景
    private createBackGround()
    {
        var bg:egret.Bitmap = new egret.Bitmap();
        bg.texture = RES.getRes( "shiyijianbeijing_png" );
        bg.x = (this.stage.stageWidth - bg.width)/2;
        bg.y = -220;
        this.addChild(bg);
    }

    //创建场景中按钮和其他元素
    private createButtons()
    {
        //返回按钮
        var backBtn:Button = new Button();
        backBtn.setSkin( "fanhui_png", "fanhui_0_png" );
        backBtn.x = 0;
        backBtn.y = 0;
        this.addChild(backBtn);

        //钻石背景
        var moneybg:egret.Bitmap = new egret.Bitmap();
        moneybg.texture = RES.getRes( "shuzidiban_png" );
        moneybg.x = 280;
        moneybg.y = 0;
        this.addChild(moneybg);

        //钻石Logo
        var moneylogo:egret.Bitmap = new egret.Bitmap();
        moneylogo.texture = RES.getRes( "zuanshi_png" );
        moneylogo.x = 300;
        moneylogo.y = 25;
        this.addChild(moneylogo);

        //钻石数量文本
        var moneyText:egret.TextField = new egret.TextField();
        moneyText.textColor = 0;
        moneyText.text = "2008";
        moneyText.x = 360;
        moneyText.y = 30;
        this.addChild(moneyText);

        //购买按钮
        var buyBtn:Button = new Button();
        buyBtn.setSkin( "gouwu_png", "gouwu_0_png" );
        buyBtn.x = (this.stage.stageWidth - buyBtn.width)/2;
        buyBtn.y = 700;
        this.addChild(buyBtn);
    }

    private _borderSpace          : number       = 15;   //距边界距离
    private _typeBannerBackGround : egret.Bitmap = null; //分类按钮背景图

    //创建分类按钮组
    private createTypeBannerBg()
    {
        this._typeBannerBackGround = new egret.Bitmap();
        this._typeBannerBackGround.texture = RES.getRes( "xitongtubiaodiban_png" );
        this._typeBannerBackGround.width = ( this.stage.stageWidth - this._borderSpace*2 );
        this._typeBannerBackGround.x = this._borderSpace;
        this._typeBannerBackGround.y = 340;
        this.addChild(this._typeBannerBackGround);
        this.createElementLayer();
    }

    private _checkGroupButton:CheckGroupButton = null;  //单选按钮组，该按钮组用于显示分类按钮

    //设置分类数据信息
    public setGroupData(val:ElementData[])
    {
        this._checkGroupButton = new CheckGroupButton();
        this._checkGroupButton.groupWidth = this._typeBannerBackGround.width-this._borderSpace*2;
        this._checkGroupButton.setSkin( "", "tubiaoxuanzhong_png" );
        this._checkGroupButton.addData( val );

        this._checkGroupButton.display.x = this._typeBannerBackGround.x + this._borderSpace;
        this._checkGroupButton.display.y = this._typeBannerBackGround.y + 10;
        this.addChild(this._checkGroupButton.display);
    }

    private _elementLayer:egret.DisplayObjectContainer = null;  //元素显示层级

    //创建元素显示层级，不同分类的服装显示对象均放置于_elementLayer对象中
    private createElementLayer()
    {
        this._elementLayer = new egret.DisplayObjectContainer();
        this._elementLayer.x = this._typeBannerBackGround.x;
        this._elementLayer.y = this._typeBannerBackGround.y+this._typeBannerBackGround.height+10;
        this.addChild(this._elementLayer);
    }

    private _allEleCheckGroupButton:AllElementCheckGroupButton = null;  //整套服装单选按钮组

    //设置整套服装按钮数据
    public setAllData( val:ElementData[] )
    {
        this._allEleCheckGroupButton = new AllElementCheckGroupButton();
        this._allEleCheckGroupButton.groupWidth = this._typeBannerBackGround.width;
        this._allEleCheckGroupButton.setSkin( "", "xuanzhong2_png" );
        this._allEleCheckGroupButton.addData( val );

        this._elementLayer.removeChildren();
        this._elementLayer.addChild( this._allEleCheckGroupButton.display );
    }

    private _eleCheckGroupButton:ElementCheckGroupButton = null; //服装单选按钮组

    //设置服装按钮数据
    public setElesData( val:ElementData[] )
    {
        this._eleCheckGroupButton = new ElementCheckGroupButton();
        this._eleCheckGroupButton.groupWidth = this._typeBannerBackGround.width;
        this._eleCheckGroupButton.setSkin( "", "xuanzhong_png" );
        this._eleCheckGroupButton.addData( val );

        this._elementLayer.removeChildren();
        this._elementLayer.addChild( this._eleCheckGroupButton.display );
    }

}