const app = getApp();
const { util } = require("@/vendor/gux/common/util");
const { sdk } = require("@/sdk/gux");

Page({

  /**
   * Page initial data
   */
  data: {

    oddItems: [],

    evenItems: [],

    start: 0,

    searchCriteria: '',
    
  },

  onLoad(options) {

  },

  onShow() { 
    app.onShowPage(this, 40);
    this.doReload();
  },

  onPullDownRefresh() {
    this.data.items = [];
    this.data.start = 0;
    this.doReload();
  },

  gotoSearch() {
    wx.navigateTo({
      url: '/page/common/search/index',
    });
  },

  doReload(ev) {
    let grid = this.selectComponent('#listMerchandise');
    grid.showLoading();
    let oddItems = this.data.oddItems;
    let evenItems = this.data.evenItems;
    sdk.fetchMerchandises({
      start: this.data.start,
      limit: 20,
    }).then(resp => {
      let items = resp.data;
      for (let i = 0; i < items.length; i++) {
        if (i % 2 == 0) {
          oddItems.push(items[i]);
        } else {
          evenItems.push(items[i]);
        }
      }
      this.setData({
        oddItems: oddItems,
        evenItems: evenItems,
      })
      grid.hideLoading();
      this.data.start += 15;  
    }).catch(err => {
      wx.showToast({
        icon: 'error',
        title: '程序出错了！',
      })
      grid.hideLoading();
    });
  },

  doSearch(criteria) {
    if (criteria == '') return;
    this.setData({
      searchCriteria: criteria,
    });
    this.onPullDownRefresh();
  },
})