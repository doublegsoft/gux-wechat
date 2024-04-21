
Page({

  data: {

  },


  onLoad(options) {

  },

  gotoHome() {
    wx.reLaunch({
      url: '/page/index',
    });
  },
})