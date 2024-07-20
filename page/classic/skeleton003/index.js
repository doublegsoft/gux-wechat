const { util } = require("../../../vendor/gux/common/util");

Page({
  data: {
    icons: [1, 2, 3, 4, 5], // 图标占位符
    listItems: [
      { mainText: 'Item 1', subText: 'Description 1' },
      { mainText: 'Item 2', subText: 'Description 2' },
      { mainText: 'Item 3', subText: 'Description 3' },
      { mainText: 'Item 4', subText: 'Description 4' },
      { mainText: 'Item 5', subText: 'Description 5' },
    ],
    navItems: [1, 2, 3, 4, 5] // 底部导航栏占位符
  },
  // 其他逻辑或事件处理可以在此处添加

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
});
