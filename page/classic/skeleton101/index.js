const { util } = require("../../../vendor/gux/common/util");

Page({
  data: {
    topSwitchChecked: false, // 顶部开关状态
    bottomItems: [
      { mainText: 'Item 1', subText: 'Description 1', checked: false },
      { mainText: 'Item 2', subText: 'Description 2', checked: true },
      { mainText: 'Item 3', subText: 'Description 3', checked: false }
    ]
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
  
  // 顶部开关改变事件处理
  onTopSwitchChange: function(e) {
    this.setData({
      topSwitchChecked: e.detail.value
    });
  },
  // 底部项目开关改变事件处理
  onItemSwitchChange: function(e) {
    const index = e.currentTarget.dataset.index;
    const newBottomItems = [...this.data.bottomItems];
    newBottomItems[index].checked = e.detail.value;
    this.setData({
      bottomItems: newBottomItems
    });
  },
  // 底部按钮点击事件处理
  onButtonTap: function() {
    wx.showToast({
      title: 'Button clicked',
      icon: 'success',
      duration: 2000
    });
  }
});
