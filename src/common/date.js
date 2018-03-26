/**
 * Created by aries.chen on 2017/2/15.
 */
var timeFormatRegList = ['Y', 'm', 'j', 'd', 'H', 'h', 'g', 'i', 's', 'A', 'a', 'M', 'P'];
var timeMonthShortArr = {1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'};
var ObjValue = {};
export function formatDate(time, formatStr, addDays) {
  if (!time) {
    return '';
  }
  var nowTime = '';
  if (time === 'now') {
    nowTime = new Date();
    time = Date.parse(nowTime);
  } else if (time === 'nowDate') {
    var nowDateStr = this.formatTime('now', 'Y/m/d');
    nowTime = new Date(nowDateStr);
    time = Date.parse(nowTime);
  } else {
    if (isNaN(time)) {
      var datePeriodList = getObj('datePeriodList');
      for (var key in datePeriodList) {
        time = time.replace(new RegExp(key, 'gm'), datePeriodList[key]);
      }
      time = time.replace(new RegExp('-', 'gm'), '/');
      time = Date.parse(time);
    } else {
      time = parseInt(time) * 1000;
    }
  }
  var formatTime = new Date(time);
  if (addDays) {
    formatTime.setDate(formatTime.getDate() + addDays);
  }
  if (formatStr === 'integer') {
    return formatTime / 1000;
  }
  var year = formatTime.getFullYear();
  var month = formatTime.getMonth() + 1;
  var day = formatTime.getDate();
  var hour = formatTime.getHours();
  var minutes = formatTime.getMinutes();
  var second = formatTime.getSeconds();
  var timeRegArr = {
    '{Y}': year, // month
    '{m}': month < 10 ? '0' + month : month,
    '{j}': day,
    '{d}': day < 10 ? '0' + day : day,
    '{H}': hour < 10 ? '0' + hour : hour,
    '{h}': hour > 12 ? hour - 12 : hour,
    '{g}': hour > 12 ? hour - 12 : hour,
    '{i}': minutes < 10 ? '0' + minutes : minutes,
    '{s}': second < 10 ? '0' + second : second,
    '{A}': hour > 12 ? 'PM' : 'AM',
    '{a}': hour > 12 ? 'pm' : 'am',
    '{M}': timeMonthShortArr[month],
    '{P}': getDatePeriod(hour)
  };
  for (var idx = 0, len = timeFormatRegList.length; idx < len; idx++) {
    var regChar = timeFormatRegList[idx];
    formatStr = formatStr.replace(regChar, '{' + regChar + '}');
  }
  for (var reg in timeRegArr) {
    var regExp = new RegExp(reg, 'gm');
    formatStr = formatStr.replace(regExp, timeRegArr[reg]);
  }
  return formatStr;
};
var getDatePeriod = function(hour) {
  if (hour >= 9 && hour <= 12) {
    return '上午';
  } else if (hour >= 13 && hour <= 18) {
    return '下午';
  } else {
    return '';
  }
  return '';
};
var getObj = function (key) {
  return ObjValue[key];
};
