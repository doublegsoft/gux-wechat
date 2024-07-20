const app = getApp()

Page({
  data: {
    marginTop: 0,
  },

  onShow() {
    wx.hideHomeButton();
    let navbar = this.selectComponent('#navigationBar');
    this.setData({
      marginTop: navbar.getHeight(),
    })
  },

  gotoListView_NoData() {
    wx.navigateTo({
      url: '/page/widget/list-view/no-data',
    })
  },

  gotoListView_LoadMore() {
    wx.navigateTo({
      url: '/page/widget/list-view/load-more',
    })
  },

  gotoForm_TwoColumnForm() {
    wx.navigateTo({
      url: '/page/widget/form/two-column-form',
    })
  },

  gotoTabs_Date() {
    wx.navigateTo({
      url: '/page/widget/tabs/date',
    })
  },

  gotoTabs_Image() {
    wx.navigateTo({
      url: '/page/widget/tabs/image',
    })
  },

  gotoTabs_Segment() {
    wx.navigateTo({
      url: '/page/widget/tabs/segment',
    })
  },

  gotoTestReadonly() {
    wx.navigateTo({
      url: 'test/readonly',
    })
  },
  gotoTestChartBar() {
    wx.navigateTo({
      url: 'test/chart/bar',
    })
  },
  gotoTestCalendar() {
    wx.navigateTo({
      url: 'test/calendar',
    })
  },
  gotoTestGridsGridOne() {
    wx.navigateTo({
      url: 'test/grids/grid_one',
    })
  },
  gotoTestSpecificPayment() {
    wx.navigateTo({
      url: 'test/specific/payment',
    })
  },
  gotoTestSpecificProduct() {
    wx.navigateTo({
      url: 'test/specific/product',
    })
  },
  gotoTestSpecificThree() {
    wx.navigateTo({
      url: 'test/specific/three',
    })
  },
  gotoTestTilesTileOne() {
    wx.navigateTo({
      url: 'test/tiles/tile_one',
    })
  },
  gotoTestTilesTileTwo() {
    wx.navigateTo({
      url: 'test/tiles/tile_two',
    })
  },
  gotoTestTilesTileThree() {
    wx.navigateTo({
      url: 'test/tiles/tile_three',
    })
  },
  gotoTestCardBlankOne() {
    wx.navigateTo({
      url: 'test/card/blank_one',
    })
  },
  gotoTestCardBlankTwo() {
    wx.navigateTo({
      url: 'test/card/blank_two',
    })
  },
  gotoTestForm() {
    wx.navigateTo({
      url: 'test/form',
    })
  },
  gotoTestStyled() {
    wx.navigateTo({
      url: 'test/styled',
    })
  },
  gotoTestTabs() {
    wx.navigateTo({
      url: 'test/tabs',
    })
  },
  gotoTestTabsFamily() {
    wx.navigateTo({
      url: 'test/tabs/family',
    })
  },
  gotoTestTabsTeam() {
    wx.navigateTo({
      url: 'test/tabs/team',
    })
  },
  gotoTestTabsLife() {
    wx.navigateTo({
      url: 'test/tabs/life',
    })
  },
  gotoTestHome() {
    wx.navigateTo({
      url: 'test/home',
    })
  },

  gotoFoodOrdering() {
    wx.navigateTo({
      url: '/page/classic/food-ordering/index',
    });
  },

  gotoEvaluationResult() {
    wx.navigateTo({
      url: '/page/classic/evaluation-result/index',
    });
  },

  gotoMyOrder() {
    wx.navigateTo({
      url: '/page/classic/my-order/index',
    });
  },

  gotoOrderList() {
    wx.navigateTo({
      url: '/page/classic/order-list/index',
    });
  },

  gotoDisplayWindow() {
    wx.navigateTo({
      url: '/page/classic/display-window/index',
    });
  },

  gotoCreditCard() {
    wx.navigateTo({
      url: '/page/classic/credit-card/index',
    });
  },

  /*!
  ** 底部弹出。
  */
  doShowBottomSheet(ev) {
    let bs = this.selectComponent('#bottomSheet');
    bs.show();
  },

  doShowDrawer(ev) {
    let d = this.selectComponent('#drawer');
    d.show();
  },

  doShowAd(ev) {
    let ad = this.selectComponent('#ad');
    ad.show({
      title: '我是标题',
      content: '我是主要内容\n还支持反斜杠n手动换行',
    });
  },
})
