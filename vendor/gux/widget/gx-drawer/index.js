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

    /*!
    ** the height of bottom sheet
    */
    width: {
      type: Number,
      value: 200,
    },

  },

  data: {

    animationData: {},

    isOpen: false,

    contentHeight: 0,
  },

  methods: {

    show: function() {
      let info = wx.getSystemInfoSync();
      let marginBottom = info.screenHeight - info.safeArea.bottom;

      let animation = wx.createAnimation({
        duration: 600,
        timingFunction: 'ease',
      })
      this.animation = animation
      animation.translateX(0).step();
      this.setData({
        animationData: animation.export(),
        isOpen: true,
        contentWidth: this.data.width,
      });
    },

    hide: function() {
      let info = wx.getSystemInfoSync();
      let animation = wx.createAnimation({
        duration: 600,
        timingFunction: 'ease',
      })
      this.animation = animation
      animation.translateX(-this.data.width).step()
      this.setData({
        animationData: animation.export(),
        isOpen: false,
      })
    },

    doHideDrawer(ev) {
      this.hide();
    },

    doNothing(ev) {
      
    }
  },
})