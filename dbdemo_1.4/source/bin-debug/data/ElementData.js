/**

 元素数据

 author: mebius.ashan
 date  : 2016.2.16

 */
var ElementData = (function () {
    function ElementData() {
        this.id = ""; //元素唯一ID编号
        this.icon = ""; //元素ICON纹理所对应的纹理ID
        this.resNames = null; //当前元素所包含的资源ID，资源ID来自于纹理集中的资源ID
        this.type = ""; //元素类型,head：头发，cloth：上衣，pants：裤子，shoe：鞋子，all：整套服装
    }
    var d = __define,c=ElementData,p=c.prototype;
    return ElementData;
})();
egret.registerClass(ElementData,'ElementData');
