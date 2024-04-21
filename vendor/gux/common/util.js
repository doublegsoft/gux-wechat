const util = {};

util.formatTime = function (
  date,
  connector = "/",
  type = "string",
  mode = "datetime"
) {
  if (
    typeof date == "number" ||
    (typeof date == "string" && date.indexOf("-") > -1)
  ) {
    date = new Date(date);
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  let _str = `${[year, month, day].map(util.formatNumber).join(connector)} ${[
    hour,
    minute,
    second,
  ]
    .map(util.formatNumber)
    .join(":")}`;
  let _obj = {
    y: year,
    m: month,
    d: day,
    h: hour,
    n: minute,
    s: second,
  };
  if (mode == "date") {
    _str = `${[year, month, day].map(util.formatNumber).join(connector)}`;
  }
  if (mode == "time") {
    _str = `${[hour, minute, second].map(util.formatNumber).join(":")}`;
  }
  if (type == "string") {
    return _str;
  } else {
    return _obj;
  }
};

util.formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};
util.getBMI = (height, weight) => {
  return (weight / Math.pow(height / 100, 2)).toFixed(2);
};

util.mergeFormFields = function (fields, values) {
  for (let i = 0; i < values.length; i++) {
    let value = values[i];
    for (let j = 0; j < fields.length; j++) {
      let field = fields[j];
      if (field.name == value.propertyName) {
        field.value = value.propertyValue;
        break;
      }
    }
  }
};
util.getSameMonth = function (year, month) {
  if (!year || year == "undefined") {
    year = new Date().getFullYear();
  }
  if (!month || month == "undefined") {
    month = new Date().getMonth() + 1;
  }
  let d = new Date(year, month, 0).getDate();
  let start = year + "-" + util.formatNumber(month) + "-01 00:00:00";
  let end = year + "-" + util.formatNumber(month) + "-" + d + " 23:59:59";
  return [start, end];
};

//比较函数
util.compare = function (x, y) {
  if (x < y) {
    return -1;
  } else if (x > y) {
    return 1;
  } else {
    return 0;
  }
};

util.compareElement = function (property) {
  return function (a, b) {
    var value1 = a[property];
    var value2 = b[property];
    return value1 - value2;
  };
};

util.image2Base64 = async function (imagePath, callback) {
  wx.getFileSystemManager().readFile({
    filePath: imagePath,
    encoding: "base64",
    success: async (res) => {
      callback("data:image/jpg;base64," + res.data);
    },
  });
};

util.getAgeNum = function (birthday, now, idCardNumber) {
  if (idCardNumber && idCardNumber.length > 0) {
    var _date = idCardNumber.slice(6, 14);
    var _arr = _date.split("");
    var BirthDate = "";
    _arr.forEach(function (item, index) {
      if (index == 4 || index == 6) {
        BirthDate = BirthDate + "-" + item;
      } else {
        BirthDate = BirthDate + item;
      }
    });
    var _year = BirthDate.split("-"),
      age = 0;
    var nowdate = new Date();
    var nowy = nowdate.getFullYear();
    var nowm = nowdate.getMonth() + 1;
    var nowd = nowdate.getDate();
    age = nowy - Number(_year[0]) - 1;
    if (nowm > _year[1] || (nowm == _year[1] && nowd > _year[2])) {
      age = age + 1;
    }
    return { age: age, BirthDate: BirthDate };
  } else {
    //出生时间 毫秒
    var birthDayTime = new Date(birthday).getTime();
    //当前时间 毫秒
    var nowTime;
    if (typeof now === "undefined") {
      nowTime = new Date().getTime();
    } else {
      nowTime = new Date(now).getTime();
    }
    //一年毫秒数(365 * 86400000 = 31536000000) Math.ceil
    return Math.floor((nowTime - birthDayTime) / 31536000000);
  }
};

util.getParamsFromUrl = function (url) {
  let questionMarkIndex = url.indexOf("?");
  if (questionMarkIndex == -1) return {};
  let params = url.substring(questionMarkIndex + 1);
  let strs = params.split("&");
  let ret = {};
  strs.forEach((str, idx) => {
    let kv = str.split("=");
    ret[kv[0]] = kv[1];
  });
  return ret;
};

util.getUriFromUrl = function (url) {
  let questionMarkIndex = url.indexOf("?");
  if (questionMarkIndex == -1) return url;
  return url.substring(0, questionMarkIndex);
};

util.convertDistrictName = function (value) {
  if (value == null) {
    return null;
  }
  let ret = '';
  if (value.provinceName && value.provinceCode) {
    ret = value.provinceName;
  }
  if (value.cityName && value.cityCode && 
    value.cityName !== '市辖区' && value.cityName !== '县') {
      ret = ret + ' ' + value.cityName;
  }
  if (value.countyName && value.countyCode) {
    ret = ret + ' ' + value.countyName;
  }
  if (value.townName && value.townCode) {
    ret = ret + ' ' + value.townName;
  }
  return ret;
},

util.height = function (offset) {
  const res = wx.getSystemInfoSync();
  return res.windowHeight - offset;
},

module.exports = { util };
