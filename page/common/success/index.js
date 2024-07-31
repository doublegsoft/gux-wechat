const app = getApp();
const { sdk } = require('@/sdk/' + app.sdk)
const { gx } = require('@/vendor/gux/common/gx');

Page({

  data: {
    image: sdk.getSuccessImage(),
  },

  onLoad(options) {
    options = options || {};
    let detailPage = options.detailPage;
    this.setData({
      image: options.image,
      title: options.title || '成功消息标题',
      description: options.description || '',
      detailPage: detailPage,
      detailParams: options,
    });
  },

  gotoHome() {
    wx.reLaunch({
      url: '/page/main/index',
    });
  },

  gotoDetail() {
    gx.navigateTo({
      url: this.data.detailPage,
    })
  },

})