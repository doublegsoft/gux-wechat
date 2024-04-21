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
  /**
   * Component properties
   */
  properties: {

    navigators: {
      type: Array,
      value: [],
    },

    activeIndex: {
      type: Number,
      value: 0
    },

  },

  /**
   * Component initial data
   */
  data: {
    cssWidth: '',
    activeClass: 'active-0',
  },

  pageLifetimes: {
    show: function() {
      this.setData({
        cssWidth: (100 / this.data.navigators.length) + '%',
        activeClass: 'active-' + this.data.activeIndex,
      });
      wx.setNavigationBarTitle({
        title: this.data.navigators[this.data.activeIndex].text,
      });
    },
  },

  methods: {
    
    doNavigate: function(ev) {
      let index = parseInt(ev.currentTarget.dataset.index);
      this.setData({
        activeIndex: index,
        activeClass: 'active-' + index,
      });
      this.triggerEvent('active-changed', {
        ...this.data.navigators[this.data.activeIndex],
        activeIndex: this.data.activeIndex,
      });
    },
  }
})
