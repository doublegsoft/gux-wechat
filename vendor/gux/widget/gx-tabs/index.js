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
    ** 是否滚动到顶部就粘黏。
    */
    alwaysOnTop: {
      type: Boolean,
      value: false,
    },

    items: {
      type: Array,
      value: [],
    },

    align: {
      type: String,
      value: 'center',
    },

    onClick: {
      type: Function,
    },

  },

  data: {

  },

  lifetimes: {
    attached() {
      // console.log(this.data.onClick, typeof this.data.onClick);
    }
  },

  methods: {

    onClick(ev) {
      if (this.data.onClick) {
      this.data.onClick(ev);
      }
    }
    
  }
});