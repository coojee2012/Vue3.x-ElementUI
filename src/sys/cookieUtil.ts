export const CookieConst = {
    cookie_theme:'theme',
    cookie_lang:'lang'
};

//获取cookie
export function getCookie(name: string): any {
    let arr: any;
    const reg: any = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr === document.cookie.match(reg)) {
      return (arr[2]);
    }  else {
      return null;
    }
      
}
  
//存入cookie
export function setCookie(c_name: string, value: string, expiredays?: any) {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());
};

//删除cookie
export function delCookie(name: string) {
 let exp = new Date();
 exp.setTime(exp.getTime() - 1);
 const cval = getCookie(name);
 if (cval != null) {
  document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
 }
};