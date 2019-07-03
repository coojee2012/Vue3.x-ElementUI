const SystemConfig = {
    product: {
        version: '1.0.0'
    },
    /////////////接口地址
    jybApiCommParams: 'network=wifi&version=6.0&org=org_jyb_mob&source=web',
    
    //////////////////////////////////////////uat配置
    jybApi: 'http://211.154.132.84:8701',
    


    //////////////////////////////////////////生产配置
    // jybApi: 'https://jybdata.iqdii.com'



    //==============================================================
    langDic:{
        ApplyStocks:["Request for today's subscription error!","请求今日认购错误！",'請求今日認購接口錯誤！'],
        tipTitle:['Message','消息提示','消息提示'],
        OK:['OK',"确定",'確定'],
        IssuanceInfo:['Error Requesting Distribution Data!','请求发行资料错误！','請求發行資料錯誤！']
    },
    getLangDic:function(key,lang){
        let idx = -1;
        switch(lang){
            case 'en-US':idx=0;break;
            case 'zh-CN':idx=1;break;
            case 'zh-TW':idx=2;break;
            default: idx = 2;
        }
        return this.langDic[key][idx];
    }





}

window.SystemConfig = SystemConfig;
