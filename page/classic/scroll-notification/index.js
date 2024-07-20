const { util } = require("@/vendor/gux/common/util");
Page({
  data: {
    scrollLeft: 0,
    notificationText: 'This is an example of a scrolling notification text that will move from right to left continuously.'
  },

  onLoad() {
    this.startScroll();
  },

  onUnload() {
    // Clean up the timer when the page is unloaded
    clearInterval(this.scrollTimer);
  },

  startScroll() {
    let that = this;
    const scrollSpeed = 1; // Adjust the scroll speed here
    const scrollStep = 1; // Distance to move each interval
    const resetPosition = -100; // Reset position if it scrolls out of view

    // Calculate the content width
    const query = wx.createSelectorQuery();
    query.select('.scroll-content').boundingClientRect();
    query.exec((res) => {
      const contentWidth = res[0].width;

      // Start the scrolling
      this.scrollTimer = setInterval(() => {
        that.setData({
          scrollLeft: that.data.scrollLeft + scrollStep
        });

        // Reset scroll position if it exceeds the content width
        if (that.data.scrollLeft > contentWidth) {
          that.setData({
            scrollLeft: resetPosition
          });
        }
      }, 30); // Adjust the interval time for smoother scrolling
    });
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
});