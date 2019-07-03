import { ajax } from 'rxjs/ajax';
import { Observable, Subject,throwError, of} from 'rxjs'
import {map, switchMap} from 'rxjs/operators'
import Vue from 'vue'
import store from './store'

let ipoListData: any[];//ipo股票列表數據
let ipoMateData: any[] = []; //发行资料  
const sysConfig = store.getters.settings;


const langJYB = () => {
    switch (store.state.lang) {
      case 'zh-TW': return 'cht';
      case 'zh-CN': return 'chs';
      case 'en-US': return 'en';
      default: return 'chs';
    }
}

//获取ipo列表
function ipoList(mk: string): Observable<any> {
  if(ipoListData) {
    return of(ipoListData);
  }
//  IPOService/GetNewStockList
      const loc = `${sysConfig.jybApi}/jybapp/F10Service/NewStocksHome?lang=${langJYB()}&${sysConfig.jybApiCommParams}`
      const  pm = {
        market:mk,//A: "mkt_hs"; HK: "mkt_hk"; HGT: "mkt_hgt"; US:"mkt_us"; OTHER: "mkt_glob"
        type:0
      };
      return   ajax.post(loc, JSON.stringify(pm)).pipe(
        map(res => {
          if(res.response.result === 1) {
            return res.response.data;
          } else {
            console.error('NewStocksHome:',res.response);
            alertTips(sysConfig.getLangDic('ApplyStocks',store.state.lang));
            return throwError(new Error(`${res.response}(${res.response.result})`));
          }
        })

      )
    
}

  //获取发行资料
  function getMaterials(curcode: string): Observable<any> {
    if(ipoMateData) {
      for (const i in ipoMateData) {
        if (ipoMateData[i].code === curcode) {
          return of(ipoMateData[i].data);
        }
      }
    }
    const loc = `${sysConfig.jybApi}/jybapp/F10Service/IssuanceInfo?lang=${langJYB()}&${sysConfig.jybApiCommParams}`;

    return   ajax.post(loc, JSON.stringify({code: curcode})).pipe(
      map(res => {
        if(res.response.result === 1) {
          ipoMateData.unshift({code: curcode,data: res.response.data});
          if(ipoMateData.length > 20) {
            ipoMateData.pop();
          }
          return res.response.data;
        } else {
          console.error('IssuanceInfo:',res.response);
          alertTips(sysConfig.getLangDic('IssuanceInfo',store.state.lang));
          return throwError(new Error(`${res.response}(${res.response.result})`));
        }
      })
    )
  
            
        
    }

  function alertTips(msg: string,title?: string,callback?: any) {
    const theme = store.state.theme;
    const titles = title || sysConfig.getLangDic('tipTitle',store.state.lang);
    Vue.prototype.$alert(msg, titles, {
      confirmButtonText: sysConfig.getLangDic('OK',store.state.lang),
      // customClass:`theme-${theme}`,//添加類名
      callback: (action: any) => {
        if(callback) {
          callback(action);
        }
      }
    });
  }

export  {
    ipoList,
    alertTips,
    getMaterials

}