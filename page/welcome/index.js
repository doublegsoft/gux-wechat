const app = getApp();
const { sdk } = require("@/sdk/" + app.sdk);

Page({

  data: {
    welcomeImage: sdk.getWelcomeImage(),
  },

  onShow() {

  },

  gotoHome() {
    wx.redirectTo({
      url: '/page/main/index',
    })
  }
})