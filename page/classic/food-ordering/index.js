// page/classic/food-ordering/index.js
Page({

  data: {
    topOfBack: 0,
    heightOfBack: 0,
    bottomOfOrder: 0,
  },

  onShow() {
    let info = wx.getSystemInfoSync();
    let rect = wx.getMenuButtonBoundingClientRect();
    
    this.setData({
      topOfBack: rect.top,
      heightOfBack: rect.height,
      bottomOfOrder: info.screenHeight - info.safeArea.height - info.safeArea.top,
    });
  },

  onNavigateBack() {
    wx.navigateBack();
  },
  
})