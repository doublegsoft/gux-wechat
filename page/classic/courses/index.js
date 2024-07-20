const app = getApp();

Page({
  
  data: {
    currentTab: 1,
  },

  onShow() {
    app.onShowPage(this);
  },

  switchTab(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.current
    });
  }
})
