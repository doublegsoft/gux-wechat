const { xhr } = require("../../vendor/gux/common/xhr");

Page({

  data: {

  },

  onShow() {
    // xhr.promise({
    //   url: 'https://gitee.com/alltobenice/COVID-19/raw/master/README.md',
    // }).then(resp => {
    //   console.log(resp);
    // })
  },

  gotoHome() {
    wx.redirectTo({
      url: '/page/index',
    })
  }
})