const app = getApp();
const { xhr } = require("@/vendor/gux/common/xhr");

Page({

  data: {

  },

  onShow() {

  },

  gotoHome() {
    wx.redirectTo({
      url: '/page/index',
    })
  }
})