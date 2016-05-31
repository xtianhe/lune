/**

 服装数据解析器

 author: mebius.ashan
 date  : 2016.2.16

 */

class SkinParse
{
    //解析数据
    //data为加载的自定义格式json数据
    //dataC为数据容器，所解析后的数据放入到dataC中
    public static parse( data:any, dataC:SkinData )
    {
        SkinParse.parseEles( data.eles, dataC );
        SkinParse.parseAll( data.all, dataC );
        SkinParse.parseGroup( data.group, dataC );
    }

    //解析服装元素数据
    private static parseEles( data:any,dataC:SkinData )
    {
        var eles:ElementData[] = [];
        var len:number = data.length;
        for( var i:number=0; i<len; i++ )
        {
            var d:ElementData = new ElementData();
            d.id = data[i].id;
            d.type = data[i].type;
            d.icon = data[i].icon;
            d.resNames = data[i].resNames;
            eles.push(d);
        }
        dataC.setEleData(eles);
    }

    //解析整套服装数据
    private static parseAll( data:any, dataC:SkinData )
    {
        var eles:ElementData[] = [];
        var len:number = data.length;
        for( var i:number=0; i<len; i++ )
        {
            var d:ElementData = new ElementData();
            d.id = data[i].id;
            d.icon = data[i].icon;
            d.resNames = data[i].resNames;
            d.type = "all";
            eles.push(d);
        }
        dataC.setAllData(eles);
    }

    //解析组数据
    private static parseGroup( data:any, dataC:SkinData )
    {
        var eles:ElementData[] = [];
        var len:number = data.length;
        for( var i:number=0; i<len; i++ )
        {
            var d:ElementData = new ElementData();
            d.id = data[i].id;
            d.icon = data[i].icon;
            d.type = data[i].type;
            eles.push(d);
        }
        dataC.setGroupData(eles);
    }
}