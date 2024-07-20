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
    height: {
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
      animation.translateY(info.screenHeight - this.data.height).step();
      this.setData({
        animationData: animation.export(),
        isOpen: true,
        contentHeight: this.data.height - marginBottom,
      });
    },

    hide: function() {
      let info = wx.getSystemInfoSync();
      let animation = wx.createAnimation({
        duration: 600,
        timingFunction: 'ease',
      })
      this.animation = animation
      animation.translateY(info.screenHeight).step()
      this.setData({
        animationData: animation.export(),
        isOpen: false,
      })
    },

    doHideBottomSheet(ev) {
      this.hide();
    },

    doNothing(ev) {
      
    }
  },
})