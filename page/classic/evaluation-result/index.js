Page({

  data: {
    heightOfPage: 0,
    topOfBack: 0,
    heightOfBack: 0,
    bottomOfOrder: 0,
  },

  onShow() {
    let info = wx.getSystemInfoSync();
    let rect = wx.getMenuButtonBoundingClientRect();
    
    this.setData({
      heightOfPage: info.screenHeight + info.statusBarHeight,
      topOfPage: -info.statusBarHeight,
      topOfBack: rect.top,
      topOfContent: info.safeArea.top + rect.top + rect.height,
      heightOfBack: rect.height,
      bottomOfOrder: info.screenHeight - info.safeArea.height - info.safeArea.top,
    });
  },

  onNavigateBack() {
    wx.navigateBack();
  },
})