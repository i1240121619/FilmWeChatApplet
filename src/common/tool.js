export default {
  localCurrentTime() {
    return Date.parse(new Date()) / 1000
  }, //当前时间
  priceCalculation(a, b, c, d) {
    let secondDrop = 1 / 60;// 每秒降了多少钱
    let timeDifference = d - c;// 经过了多少秒
    let thePrice = secondDrop * timeDifference;// 降了多少钱
    let currentPrice = (a - thePrice).toFixed(2);
    if (currentPrice<=b) {
      return b.toFixed(2);
    } else {
      return currentPrice;
    }
  },// 计算当前价格 a:出售价/b:低价/c:开始降价的时间/d:当前时间
  daysRemaining(a) {
    if(a <= 0){
      return "00小时00分钟00秒";
    }
    let days = Math.floor(a / (24 * 3600));
    let days0 = days < 10 ? ('0' + days) : days;// 剩余天数

    let leave1 = a % (24 * 3600);
    let hours = Math.floor(leave1 / 3600);
    let hours0 = hours < 10 ? ('0' + hours) : hours;// 剩余小时

    let leave2 = leave1 % 3600;
    let minutes = Math.floor(leave2 / 60);
    let minutes0 = minutes < 10 ? ('0' + minutes) : minutes;// 剩余分钟

    let leave3 = leave2 % 60;
    let seconds = Math.round(leave3);
    let seconds0 = seconds < 10 ? ('0' + seconds) : seconds;// 剩余秒

    if (days == 0 && hours !== 0) {
      return hours0 + "小时" + minutes0 + "分钟" + seconds0 + "秒";
    } else if (days == 0 && hours == 0 && minutes0 !== 0) {
      return minutes0 + "分钟" + seconds0 + "秒";
    } else {
      return days0 + "天"+ hours0 + "小时" + minutes0 + "分钟" + seconds0 + "秒";
    }
  },// 返回剩下天数 a:时间差
  query(a, b, c, d) {
    for (let i = 0; i < a.length; i++) {
      if (a[i][c] === b) {
        return a[i][d];
        break;
      }
    }
  } // 查询数组子元素对象 a:数组/b:被查询的键
}
