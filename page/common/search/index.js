Page({

  data: {
    marginTop: 0,

    title: '搜索',
    tooltip: '搜索任意东西',
  },

  onLoad(opts) {
    let changed = {};
    if (opts.title) {
      changed.title = opts.title;
    }
    if (opts.tooltip) {
      changed.tooltip = opts.tooltip;
    }
    this.setData(changed);
  },

  onShow() {
    let navbar = this.selectComponent('#navigationBar');
    if (navbar != null) {
      this.setData({
        marginTop: navbar.getHeight(),
      });
    }
  },

})