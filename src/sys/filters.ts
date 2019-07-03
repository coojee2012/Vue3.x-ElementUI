const formats = {
    // 读取交易宝市场代码 E00001 => E
    getMarket(code: string) {
        if (code === undefined || code === '' || code === null) {
            return '';
        }
        const  x = code.substr(0, 1);
        return x;
    },
    // 格式化数据 len 总长度, dig  小数位数
    formatNum(num: any, len: number , dig: number) {
        if (num < 0) { dig++; }
        let   s = num.toFixed(dig) + '';
        let  i = 1;
        while (s.length > len && i <= dig) {
            const  d = num.toFixed(dig - i);
            s = d + '';
            i++;
        }
        return s;
    }
}



const Filters: any = {
    stockCode(code: string): string {
        if(code) {
            return code.substr(1,code.length-1);
        } else {
            return code;
        }
    },
    // 格式化数据 len 总长度, dig  小数位数
    formatNum(num: number, len: number , dig: number): string {
        if (num < 0) { dig++; }
        let   s: string = num.toFixed(dig) + "";
        let  i: number = 1;
        while (s.length > len && i <= dig) {
            const  d: string = num.toFixed(dig - i);
            s = d + "";
            i++;
        }
        return s;
    },
    // 读取交易宝市场代码 E00001 => E
    getMarket(code: string): string {
        if (code === undefined || code === "" || code === null) {
            return "";
        }
        const  x: string = code.substr(0, 1);
        return x;
    },
    price(input: any, stockCode: string, type: string): string {
        if (isNaN(input)) {
            return "--";
        }
        const num: number = Number(input);
        const  market: string = formats.getMarket(stockCode);
        switch (market) {
            case "N":
            case "F":
            case "G":
                if (num < 1) {
                    return num.toFixed(4);
                }  else {
                    return num.toFixed(2);
                }
            case "X":
                if (num >= 1000) {
                    return num.toFixed(0);
                }  else if (num >= 10) {
                    return num.toFixed(2);
                } else {
                    return formats.formatNum(num, 6, 4);
                }
            case "A":
            case "B":
                // 深沪基金、权证 与 上海 B 股
                if (type === "J" || type === "W" || (market === "B" && type === "B")) {
                    return num.toFixed(3);
                } else {
                    return num.toFixed(2);
                }
            default:
                // 非深圳,上海,三板市场, 按港股的做法处理
                if (num >= 100) {
                    return num.toFixed(2);
                } else if (num >= 10) {
                    return num.toFixed(3);
                 } else {
                    return formats.formatNum(num, 6, 4);
                     }
        }
    },
    // 格式化数据
    formatData(input: any, fractionSize: number): string {
        const  re: any = /(\.0+$)/;
        if (isNaN(input)) {
            return "--";
        } else {
            let  x: string = "0";

            const isDigit: any = /\.[0-9]+$/.test(input + ""); // 数据是小数
            if (isDigit && /\.[1-9]+$/.test(input + "")) {
                console.log("小数不能用Adata过滤器", input);
            }

            const num: number = Number(input);
            if (Math.abs(num) >= 1000000000) {
                x = (num / 1000000000).toFixed(fractionSize) + "";
                if (re.test(x)) {
                    return x.replace(/(\.0+$)/, "") + "B";
                }  else {
                    return x.replace(/(0+$)/, "") + "B";
                }
            } else if (Math.abs(num) >= 1000000) {
                x = (num / 1000000).toFixed(fractionSize) + "";
                if (re.test(x)) {
                    return x.replace(/(\.0+$)/, "") + "M";
                }  else {
                    return x.replace(/(0+$)/, "") + "M";
                }
            }  else if (Math.abs(num) >= 1000) {
                if(!isDigit) {
                    if (num < 0 && (input + "").length <= 5) {
                        return input + "";
                    } else if (num > 0 && (input + "").length <= 4) {
                        return input + "";
                    }
                }


                x = (num / 1000).toFixed(fractionSize) + "";
                if (re.test(x)) {
                    return x.replace(/(\.0+$)/, "") + "K";
                }  else {
                    return x.replace(/0+$/, "") + "K";
                }

            } else {
                x = num.toFixed(fractionSize) + "";
                if (re.test(x)) {
                    return x.replace(/(\.0+$)/, "");
                }   else {
                    return x;
                }
            }
        }
    },
    // 格式化涨跌幅数据
    formatZdData(input: any, zd: any, stockCode: string, type: string): string {
        if (isNaN(input) || isNaN(zd)) {
            return "--";
        }

        const  num: number = Number(input);
        const  zdnum: number = Number(zd);
        let  result: string = "";

        const  market: string = formats.getMarket(stockCode);
        switch (market) {
            case "N":
            case "F":
            case "G":
                if (num < 1) {
                    result = zdnum.toFixed(4);
                }  else {
                    result = zdnum.toFixed(2);
                }
                break;
            case "X":
                if (num >= 1000) {
                    result = zdnum.toFixed(0);
                }   else if (num >= 10) {
                    result = zdnum.toFixed(2);
                }  else {
                    result = formats.formatNum(zdnum, 6, 4);
                }
                break;
            case "A":
            case "B":
                // 深沪基金、权证 与 上海 B 股
                if (type === "J" || type === "W" || (market === "B" && type === "B")) {
                    result = zdnum.toFixed(3);
                }  else {
                    result = zdnum.toFixed(2);
                }
                break;
            default:
                // 非深圳,上海,三板市场, 按港股的做法处理
                if (num >= 10000) {
                    result = zdnum.toFixed(0);
                }  else if (num >= 1000) {
                    result = zdnum.toFixed(1);
               }  else if (num >= 100) {
                    result = zdnum.toFixed(2);
                }  else if (num >= 10) {
                    result = zdnum.toFixed(3);
                }  else {
                    result = formats.formatNum(zdnum, 6, 4);
                }
                break;
        }
        if (Number(result) > 0) {
            return "+" + result;
        }   else {
            return "" + result;
        }
    },
    // 格式化成正负数
    fortmatPlus(input: any, key?: string): string {
        if (isNaN(input) || input === null) {
            return "--";
        }
        const   num: number = Number(input);
        let str: string = num.toString();
        if (num > 0) {
            if (arguments[1] && arguments[1] === "zdf") {
                str = num.toFixed(2);
                return "+" + str;
            }
            return "+" + input;
        } else {
            if (arguments[1] && arguments[1] === "zdf") {
                str = num.toFixed(2);
                return "" + str;
            }
            return "" + input;
        }

    },
    formatDate(date: any, fmt: string): string {
        if(typeof(date) === "string") {
            date = date.replace(/-/g,"/");
            date = new Date(date);
        }
        const o: any = {
            "M+" : date.getMonth()+1, // 月份
            "d+" : date.getDate(), // 日
            "h+" : date.getHours()%12 === 0 ? 12 : date.getHours()%12, // 小时
            "H+" : date.getHours(), // 小时
            "m+" : date.getMinutes(), // 分
            "s+" : date.getSeconds(), // 秒
            "q+" : Math.floor((date.getMonth()+3)/3), // 季度
            "S" : date.getMilliseconds() // 毫秒
            };
            const week: any = {
            "0" : "/u65e5",
            "2" : "/u4e8c",
            "3" : "/u4e09",
            "4" : "/u56db",
            "5" : "/u4e94",
            "6" : "/u516d"
            };
            if(/(y+)/.test(fmt)) {         
                fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));         
            }         
            if(/(E+)/.test(fmt)) {         
                fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+ week[date.getDay()+""]);         
            }         
            for(let k in o) {         
                if(new RegExp("("+ k +")").test(fmt)) {         
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
                }         
            }         
            return fmt;         
    }
    
}

export default Filters;