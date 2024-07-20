// page/demo/list-view/no-data.js
Page({
  
  onShow() {
    let navbar = this.selectComponent('#navigationBar');
    if (navbar != null) {
      this.setData({
        marginTop: navbar.getHeight(),
      });
    }
  },

  gotoSearch() {
    wx.navigateTo({
      url: '/page/common/search/index',
    });
  },
})