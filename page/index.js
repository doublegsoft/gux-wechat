const app = getApp()

Page({
  data: {
    marginTop: 0,
  },

  onLoad() {
    wx.hideHomeButton();

    let navbar = this.selectComponent('#navigationBar');
    this.setData({
      marginTop: navbar.getHeight(),
    });

    // wx.showLoading({
    //   title: '加载中',
    // })
    
    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 2000)
  },

  onShow() {
    let navbar = this.selectComponent('#navigationBar');
    this.setData({
      marginTop: navbar.getHeight(),
    })
  },

  gotoListView_NoData() {
    wx.navigateTo({
      url: '/page/demo/list-view/no-data',
    })
  },

  gotoListView_LoadMore() {
    wx.navigateTo({
      url: '/page/demo/list-view/load-more',
    })
  },

  gotoForm_TwoColumnForm() {
    wx.navigateTo({
      url: '/page/demo/form/two-column-form',
    })
  },

  gotoTabs_Date() {
    wx.navigateTo({
      url: '/page/demo/tabs/date',
    })
  },

  gotoTabs_Image() {
    wx.navigateTo({
      url: '/page/demo/tabs/image',
    })
  },

  gotoTabs_Segment() {
    wx.navigateTo({
      url: '/page/demo/tabs/segment',
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

  gotoSearch() {
    wx.navigateTo({
      url: '/page/common/search/index',
    });
  },

  gotoSuccess() {
    wx.navigateTo({
      url: '/page/common/success/index',
    });
  },

  gotoFailure() {
    wx.navigateTo({
      url: '/page/common/failure/index',
    });
  },

  gotoNoInternet() {
    wx.navigateTo({
      url: '/page/common/no-internet/index',
    });
  },

  gotoThankYou() {
    wx.navigateTo({
      url: '/page/common/thank-you/index',
    });
  },

  gotoCongratulation() {
    wx.navigateTo({
      url: '/page/common/congratulation/index',
    });
  },

  gotoPrivacyPolicy() {
    wx.navigateTo({
      url: '/page/common/privacy-policy/index',
    });
  },

  gotoCertification() {
    wx.navigateTo({
      url: '/page/common/certification/index',
    });
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

  /*!
  ** 底部弹出。
  */
  doShowBottomSheet(ev) {
    let bs = this.selectComponent('#bottomSheet');
    bs.show();
  },

  doHideBottomSheet(ev) {
    console.log(ev);
  }
})
