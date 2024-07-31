const { util } = require("@/vendor/gux/common/util");

App({
  
  sdk: 'gux',

  host: 'http://localhost:8888',

  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });
  },

  globalData: {
    userInfo: null
  },

  sysinfo: null,

  onShowPage(page, offset) {
    offset = offset || 0;
    if (!this.sysinfo) {
      this.sysinfo = wx.getSystemInfoSync();
    }
    let navbar = page.selectComponent('#navigationBar');
    if (navbar != null) {
      page.setData({
        top: navbar.getHeight(),
        viewHeight: this.sysinfo.safeArea.bottom - navbar.getHeight() - offset,
        viewWidth: this.sysinfo.screenWidth,
      });
    } else {
      let rect = wx.getMenuButtonBoundingClientRect();
      page.setData({
        topOfBack: rect.top,
        heightOfBack: rect.height,
        top: this.sysinfo.safeArea.top,
        viewHeight: this.sysinfo.safeArea.bottom - offset,
        bottonHeight: this.sysinfo.screenHeight - this.sysinfo.safeArea.height - this.sysinfo.safeArea.top,
        viewWidth: this.sysinfo.screenWidth,
        screenHeight: this.sysinfo.screenHeight,
      });
    } 
  },
})
