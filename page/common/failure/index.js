const { gx } = require('@/vendor/gux/common/gx');

Page({

  data: {

  },


  onLoad(options) {
    options = options || {};
    this.setData({
      title: options.title || '错误消息标题',
      description: options.description || '说明具体的错误原因',
    });
  },

  gotoBack() {
    gx.navigateBack();
  },

  gotoHome() {
    wx.reLaunch({
      url: '/page/index',
    });
  },
})