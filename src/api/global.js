/**
 * 公共方法文件扩展
 */
import qs from 'qs';

export default {
    getPostParams: (obj) => {
        return qs.stringify(obj);
    },
    /**
     * 设置cookie
     * @param name 名称
     * @param value 值
     * @param expires 有效时间（单位：小时）（可选） 默认：24h
     */
    setCookie: function (name, value, expires, domain) {
        let expTimes = expires ? (Number(expires) * 60 * 60 * 1000) : (24 * 60 * 60 * 1000); // 毫秒
        let expDate = new Date();
        expDate.setTime(expDate.getTime() + expTimes);
        let expString = expires ? '; expires=' + expDate.toUTCString() : '';
        let pathString = '; path=/';
        let dm = '; domain=' + domain;
        document.cookie = name + '=' + encodeURI(value) + expString + pathString + dm;
    },
    /**
     * 读cookie
     * @param name
     */
    getCookie: function (name) {
        let cookieStr = '; ' + document.cookie + '; ';
        let index = cookieStr.indexOf('; ' + name + '=');
        if (index !== -1) {
            let s = cookieStr.substring(index + name.length + 3, cookieStr.length);
            return decodeURI(s.substring(0, s.indexOf('; ')));
        } else {
            return null;
        }
    },
    /**
     * 删除cookie
     * @param name
     */
    delCookie: function (name, domain) {
        let exp = new Date(new Date().getTime() - 1);
        let s = this.getCookie(name);
        if (s !== null) {
            document.cookie = name + '=' + s + '; expires=' + exp.toUTCString() + '; path=/; domain=' + domain;
        }
    },
    /**
     * 操作localstorage
     * @param {string} type 传递 set, get, remove
     * @param {string} key
     * @param value
     * @returns {any}
     */
    handleLocalStorage: (type, key, value) => {
        const str = JSON.stringify(value);
        if (type === 'set') {
            window.localStorage.setItem(key, str);
        }
        if (type === 'get') {
            const data = window.localStorage.getItem(key);
            return JSON.parse(data);
        }
        if (type === 'remove') {
            window.localStorage.removeItem(key);
        }
    },
    /**
     * 时间戳转时间
     * @param  {timeArr} 转换的所有字符转对象类型
     * @param  {val} number
     */
    timeStamp(val) {
        const newtime = new Date(val);
        const Y = newtime.getFullYear();
        const M = dataSua(newtime.getMonth() + 1);
        const D = dataSua(newtime.getDate());
        const H = dataSua(newtime.getHours());
        const Mi = dataSua(newtime.getMinutes());
        const S = dataSua(newtime.getSeconds());
        const Ms = newtime.getTime();
        const s = Date.parse(newtime) / 1000;

        function dataSua(dTime) {
            return dTime < 10 ? '0' + dTime : dTime;
        }

        const timeArr = {
            timeOne: M + '月' + D + '日',
            timeTwo: H + ':' + Mi + ':' + S,
            timeThree: Y + '-' + M + '-' + D + ' ' + H + ':' + Mi + ':' + S,
            timefour: Y + '-' + M + '-' + D,
            timeFive: Y + '.' + M + '.' + D,
            timeEleven: Y + '/' + M + '/' + D,
            timeSix: H + ':' + Mi + ':' + S,
            timeSeven: Y + '年' + M + '月' + D + '日',
            timeEight: Y + '.' + M + '.' + D + ' ' + H + ':' + Mi + ':' + S,
            timeNine: Ms,  // 时间戳（毫秒）
            timeTen: s,  // 时间戳（秒）
            timeTwelve: Y + '/' + M + '/' + D,
            timeThirteen: Y + '/' + M + '/' + D + ' ' + H + ':' + Mi + ':' + S,
            timeFourteen: Y + '/' + M + '/' + D + ' ' + H + ':' + Mi
        };
        return timeArr;
    },
    /**
     * 数字或字符串精确到小数点后几位
     * @param  val 参数指传过来的数值
     * @param  num 参数指精确到几位
     */
    numberDecimal(val, num) {
        const numIs = Math.abs(num);
        let nums = 1;
        for (let i = 1; i <= numIs; i++) {
            nums = nums * 10;
        }
        if (typeof val === 'string') {
            const index = val.indexOf('.');
            if (index >= 0) {
                const floatingRight = val.substring(index + 1, index + 1 + numIs);
                const floatLeft = val.substring(0, index);
                if (floatingRight) {
                    return floatLeft + '.' + floatingRight;
                } else {
                    return floatLeft;
                }

            } else {
                // return Number(val).toFixed(numIs);
                return val;
            }
        } else if (typeof val === 'number') {
            const downValue = Math.floor(val * nums) / nums;
            return downValue.toFixed(numIs);
        }
    },
    /**
     * 获取随机6位颜色值
     * @param  val 参数指传过来的数值
     * @param  num 参数指精确到几位
     */
    randomColor() {
        const randomNumOne = Math.floor(Math.random() * 255);
        const randomNumTwo = Math.floor(Math.random() * 255);
        const randomNumThree = Math.floor(Math.random() * 255);
        return this.colorHex(`RGB(${randomNumOne}, ${randomNumTwo}, ${randomNumThree})`);
    },
    /**
     * 浏览器的判断
     * @return {[type]} [description]
     */
    getBrowserType() {
        const agent = navigator.userAgent.toLowerCase();
        let browser_type = '';
        if (agent.indexOf('msie') > 0) {
            browser_type = 'IE';
        }
        if (agent.indexOf('firefox') > 0) {
            browser_type = 'firefox';
        }
        if (agent.indexOf('chrome') > 0 && agent.indexOf('mb2345browser') < 0 && agent.indexOf('360 aphone browser') < 0) {
            browser_type = 'chrome';
        }
        if (agent.indexOf('360 aphone browser') > 0 || agent.indexOf('qhbrowser') > 0) {
            browser_type = '360';
        }
        if (agent.indexOf('ucbrowser') > 0) {
            browser_type = 'UC';
        }
        if (agent.indexOf('micromessenger') > 0) {
            browser_type = 'WeChat';
        }
        if ((agent.indexOf('mqqbrowser') > 0 || agent.indexOf('qq') > 0) && agent.indexOf('micromessenger') < 0) {
            browser_type = 'QQ';
        }
        if (agent.indexOf('miuibrowser') > 0) {
            browser_type = 'MIUI';
        }
        if (agent.indexOf('mb2345browser') > 0) {
            browser_type = '2345';
        }
        if (agent.indexOf('sogoumobilebrowser') > 0) {
            browser_type = 'sogou';
        }
        if (agent.indexOf('liebaofast') > 0) {
            browser_type = 'liebao';
        }
        if (agent.indexOf('weibo') > 0) {
            browser_type = 'weibo';
        }
        if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0 && agent.indexOf('ucbrowser') < 0 && agent.indexOf('micromessenger') < 0 && agent.indexOf('mqqbrowser') < 0 && agent.indexOf('miuibrowser') < 0 && agent.indexOf('mb2345browser') < 0 && agent.indexOf('sogoumobilebrowser') < 0 && agent.indexOf('liebaofast') < 0 && agent.indexOf('qhbrowser') < 0 && agent.indexOf('weibo') < 0) {
            browser_type = 'safari';
        }
        return browser_type;
    },
    /**
     * 科学计数法转换为正常数值
     * @param  num 科学计数法值
     */
    toNonExponential(num) {
        if (num.indexOf('e') !== -1 && num && num.indexOf('.') !== -1) {
            const m = Number(num).toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
            return Number(num).toFixed(Math.max(0, (m[1] || '').length - m[2]));
        } else {
            return num;
        }
    },
    /**
     * 判断客户端是否是IOS或者是Android
     * @param  return 如果返回true 则说明是Android
     */
    is_weixin() {
        const ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 判断是否是电脑端
     * @param  return 如果返回true 则说明是pc端
     */
    IsPC() {
        const userAgentInfo = navigator.userAgent;
        const Agents = ['Android', 'iPhone',
            'SymbianOS', 'Windows Phone',
            'iPad', 'iPod'];
        let flag = true;
        for (let v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
};