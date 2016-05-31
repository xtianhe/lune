/**

 元素数据

 author: mebius.ashan
 date  : 2016.2.16

 */


class ElementData
{
    public id:string         = "";     //元素唯一ID编号
    public icon:string       = "";     //元素ICON纹理所对应的纹理ID
    public resNames:string[] = null;   //当前元素所包含的资源ID，资源ID来自于纹理集中的资源ID
    public type:string       = "";     //元素类型,head：头发，cloth：上衣，pants：裤子，shoe：鞋子，all：整套服装
}