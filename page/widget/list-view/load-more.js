const app = getApp();
const { util } = require("@/vendor/gux/common/util");
const { sdk } = require("@/sdk/gux");

Page({

  /**
   * Page initial data
   */
  data: {

    items: [],

    start: 0,
  },

  onLoad(options) {
    
  },

  onShow() { 
    app.onShowPage(this);
    this.doReload();
  },

  onPullDownRefresh() {
    this.data.items = [];
    this.data.start = 0;
    this.doReload();
  },

  doReload(ev) {
    let list = this.selectComponent('#listEmployee');
    list.showLoading();
    let items = this.data.items;
    sdk.fetchEmployees({
      start: this.data.start,
    }).then(resp => {
      items = items.concat(resp.data);
      this.setData({items: items});
      list.hideLoading();
      this.data.start += 15;  
    }).catch(err => {
      wx.showToast({
        icon: 'error',
        title: '程序出错了！',
      })
      list.hideLoading();
    });
  },

  gotoSearch() {
    wx.navigateTo({
      url: '/page/common/search/index',
    });
  },
})