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

      var animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease',
      })
      this.animation = animation
      animation.translateY(100).step();
      this.setData({
        animationData: animation.export(),
        isOpen: true,
        contentHeight: this.data.height - marginBottom,
      });
      console.log(this.data.contentHeight);
    },

    hide: function() {
      var animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease',
      })
      this.animation = animation
      animation.translateY(0).step()
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