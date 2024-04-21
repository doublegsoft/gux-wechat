/*
** ──────────────────────────────────────────────────
** ─██████████████─██████──██████─████████──████████─
** ─██░░░░░░░░░░██─██░░██──██░░██─██░░░░██──██░░░░██─
** ─██░░██████████─██░░██──██░░██─████░░██──██░░████─
** ─██░░██─────────██░░██──██░░██───██░░░░██░░░░██───
** ─██░░██─────────██░░██──██░░██───████░░░░░░████───
** ─██░░██──██████─██░░██──██░░██─────██░░░░░░██─────
** ─██░░██──██░░██─██░░██──██░░██───████░░░░░░████───
** ─██░░██──██░░██─██░░██──██░░██───██░░░░██░░░░██───
** ─██░░██████░░██─██░░██████░░██─████░░██──██░░████─
** ─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░██──██░░░░██─
** ─██████████████─██████████████─████████──████████─
** ──────────────────────────────────────────────────
*/
Component({

  properties: {
    title: {
      type: String,
      value: '',
    },

    backable: {
      type: Boolean,
      value: true,
    },

    transparent: {
      type: Boolean,
      value: false,
    },

    custom: {
      type: Boolean,
      value: false,
    },

    bottom: {
      type: Number,
      value: 0,
    }
  },
  
  data: {
    topOfBack: 0,
    heightOfBack: 0,
    bottomOfOrder: 0,
    height: 0,
  },

  pageLifetimes: {
    show() {
      let info = wx.getSystemInfoSync();
      let rect = wx.getMenuButtonBoundingClientRect();
      
      this.setData({
        height: info.safeArea.top + rect.height + 4 + this.data.bottom,
        topOfTitle: rect.top + (rect.height - 22) / 2,
        topOfBack: rect.top,
        heightOfBack: rect.height,
        bottomOfOrder: info.screenHeight - info.safeArea.height - info.safeArea.top,
      });
    },
  },

  methods: {
    
    doNavigateBack(ev) {
      wx.navigateBack();
    },

    getHeight() {
      let info = wx.getSystemInfoSync();
      let rect = wx.getMenuButtonBoundingClientRect();
      return info.safeArea.top + rect.height + 4 + this.data.bottom;
    }

  }
})