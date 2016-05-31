/**

 服装数据

 author: mebius.ashan
 date  : 2016.2.16

 */

class SkinData
{
    private _eleData   :ElementData[] = null;   //服装数据
    private _groupData :ElementData[] = null;   //组数据
    private _allData   :ElementData[] = null;   //全身服装数据

    //设置服装数据
    public setEleData(val:ElementData[])
    {
        this._eleData = val;
    }

    //获取服装数据
    public get eleData():ElementData[]
    {
        return this._eleData;
    }

    //设置组数据
    public setGroupData(val:ElementData[])
    {
        this._groupData = val;
    }

    //获取组数据
    public get groupData():ElementData[]
    {
        return this._groupData;
    }

    //设置全身服装数据
    public setAllData(val:ElementData[])
    {
        this._allData = val;
    }

    //获取全身服装数据
    public get allData():ElementData[]
    {
        return this._allData;
    }

    //通过ID获取其资源中的resNames数据项
    public getResNamesDataByID( id:string ):string[]
    {
        var len:number = this._eleData.length;
        for( var i:number=0; i<len; i++ )
        {
            if( this._eleData[i].id==id )
            {
                return this._eleData[i].resNames;
            }
        }
        return null;
    }

    //通过type类型，获取element数据
    public getEleDataByType( type:string ):ElementData[]
    {
        if( type=="all" )
        {
            return this._allData;
        }
        var eles:ElementData[] = [];
        var len:number = this._eleData.length;
        for( var i:number=0; i<len; i++ )
        {
            if( this._eleData[i].type==type )
            {
                eles.push( this._eleData[i] );
            }
        }
        return eles;
    }

    //根据ID搜索全身服装中的资源名
    public getResNamesDataByIDWithAll( id:string ):string[][]
    {
        var eleids:string[] ;
        var len:number = this._allData.length;
        for(var i:number=0;i<len;i++)
        {
            if( this._allData[i].id==id )
            {
                eleids = this._allData[i].resNames;
                break;
            }
        }

        var strs:string[][] = [];
        len = eleids.length;
        for( var i:number=0; i<len; i++ )
        {
            strs.push( this.getResNamesDataByID(eleids[i]) );
        }
        return strs;
    }
}