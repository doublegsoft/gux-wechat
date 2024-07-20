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
    ** the height of dialog
    */
    height: {
      type: Number,
      value: 200,
    },

    top: {
      type: Number,
      value: 100,
    },

  },

  data: {

    animationData: {},

    isOpen: false,

    contentHeight: 0,
  },

  methods: {

    show: function(callback) {
      let animation = wx.createAnimation({
        duration: 600,
        timingFunction: 'ease',
      })
      this.animation = animation;
      animation.translateY(this.data.top + this.data.height).step();
      this.setData({
        animationData: animation.export(),
        isOpen: true,
        height: this.data.height,
      });

      if (callback) callback();
    },

    hide: function() {
      let info = wx.getSystemInfoSync();
      let animation = wx.createAnimation({
        duration: 600,
        timingFunction: 'ease',
      })
      this.animation = animation
      animation.translateY(-this.data.height).step()
      this.setData({
        animationData: animation.export(),
        isOpen: false,
      })
    },

    doHideDialog(ev) {
      this.hide();
    },

    doNothing(ev) {
      
    }
  },
})