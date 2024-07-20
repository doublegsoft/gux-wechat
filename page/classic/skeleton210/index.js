const { util } = require("../../../vendor/gux/common/util");

Page({
  data: {
    // 卡片数据
    cards: [
      { title: 'Card 1', subtitle: 'Subtitle 1' },
      { title: 'Card 2', subtitle: 'Subtitle 2' }
    ],
    // 底部项目数据
    items: [
      { mainText: 'Item 1', subText: 'Description 1', checked: true, count: 1 },
      { mainText: 'Item 2', subText: 'Description 2', checked: false, count: 2 },
      { mainText: 'Item 3', subText: 'Description 3', checked: true, count: 3 },
      { mainText: 'Item 4', subText: 'Description 4', checked: false, count: 4 }
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

  // 返回按钮事件处理
  onBackTap: function() {
    wx.navigateBack();
  },
  // 菜单按钮事件处理
  onMenuTap: function() {
    wx.showToast({ title: 'Menu tapped', icon: 'none' });
  },
  // 下一页按钮事件处理
  onNextTap: function() {
    wx.showToast({ title: 'Next tapped', icon: 'none' });
  },
  // 增加数量事件处理
  onIncrease: function(e) {
    const index = e.currentTarget.dataset.index;
    const items = [...this.data.items];
    items[index].count += 1;
    this.setData({ items });
  },
  // 减少数量事件处理
  onDecrease: function(e) {
    const index = e.currentTarget.dataset.index;
    const items = [...this.data.items];
    if (items[index].count > 0) {
      items[index].count -= 1;
      this.setData({ items });
    }
  },
  // 刷新项目事件处理
  onRefresh: function(e) {
    wx.showToast({ title: 'Item refreshed', icon: 'none' });
  },
  // 底部导航事件处理
  onHomeTap: function() {
    wx.showToast({ title: 'Home tapped', icon: 'none' });
  },
  onCartTap: function() {
    wx.showToast({ title: 'Cart tapped', icon: 'none' });
  },
  onProfileTap: function() {
    wx.showToast({ title: 'Profile tapped', icon: 'none' });
  },
  onShopTap: function() {
    wx.showToast({ title: 'Shop tapped', icon: 'none' });
  }
});
