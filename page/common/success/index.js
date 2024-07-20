Page({

  data: {

  },

  onLoad(options) {
    options = options || {};
    this.setData({
      title: options.title || '成功消息标题',
      description: options.description || '',
    });
  },

  gotoHome() {
    wx.reLaunch({
      url: '/page/index',
    });
  }

})