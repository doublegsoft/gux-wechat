const app = getApp();
const { sdk } = require('@/sdk/' + app.sdk)
const { gux } = require('@/vendor/gux/common/gux');

Page({

  data: {
    image: sdk.getUnderConstructionImage(),
    title: '正在建设中...',
  },

  onShow() {
    app.onShowPage(this);
  },

  onLoad(options) {
    options = options || {};
  },

  gotoBack() {
    gux.navigateBack();
  },

  gotoHome() {
    wx.reLaunch({
      url: '/page/main/index',
    });
  },
})