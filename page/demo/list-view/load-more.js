const { util } = require("../../../vendor/gux/common/util");

Page({

  /**
   * Page initial data
   */
  data: {
    items: [],
  },

  onLoad() {
    let items = [];
    for (let i = 0; i < 15; i++) {
      items.push({
        id: (i + 1), name: '编号' + (i + 1),
      });
    }
    this.setData({items: items});
  },

  onShow() { 
    let navbar = this.selectComponent('#navigationBar');
    if (navbar != null) {
      this.setData({
        marginTop: navbar.getHeight(),
      });
    }
    this.setData({
      height: util.height(64) + 'px',
    });
  },

})