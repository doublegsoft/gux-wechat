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
const { gx } = require('../../common/gx');

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
    },

    background: {
      type: String,
      value: 'var(--color-background)',
    },

    foreground: {
      type: String,
      value: 'var(--color-text-primary)',
    },
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
        height: this.getHeight(),
        topOfTitle: rect.top + (rect.height - 22) / 2,
        topOfBack: rect.top,
        heightOfBack: rect.height,
        bottomOfOrder: info.screenHeight - info.safeArea.height - info.safeArea.top,
      });
    },
  },

  methods: {
    
    doNavigateBack(ev) {
      gx.navigateBack();
    },

    getHeight() {
      let info = wx.getSystemInfoSync();
      let rect = wx.getMenuButtonBoundingClientRect();
      return info.safeArea.top + rect.height + 6 + this.data.bottom + 8;
    }

  }
})