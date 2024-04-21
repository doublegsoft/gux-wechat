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

    value: {
      type: Number,
      value: 0,
    },

    title: {
      type: String,
      value: '',
    },

    startColor: {
      type: String,
      value: 'var(--color-success)',
    },

    endColor: {
      type: String,
      value: 'var(--color-error)',
    },
  },

  data: {
    left: '0',

    bgColor: '#ffffff',
  },

  lifetimes: {
    attached() {
      this.calculateLeft();
    }
  },

  methods: {
    
    calculateLeft() {
      let value = this.data.value;
      let sr = Number("0x" + this.data.startColor.substring(1, 3));
      let sg = Number("0x" + this.data.startColor.substring(3, 5));
      let sb = Number("0x" + this.data.startColor.substring(5, 7));
      
      let er = Number("0x" + this.data.endColor.substring(1, 3));
      let eg = Number("0x" + this.data.endColor.substring(3, 5));
      let eb = Number("0x" + this.data.endColor.substring(5, 7));

      let ratio = value / 100;
      let nr = Math.round(sr + (er - sr) * ratio);
      let ng = Math.round(sg + (eg - sg) * ratio);
      let nb = Math.round(sb + (eb - sb) * ratio);
      
      const bgColor = '#' + [nr, ng, nb].map(c => {
          const hex = c.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
      }).join('');
      
      var query = wx.createSelectorQuery();
      query.select('#gxHeatBar').boundingClientRect(rect => {
        this.setData({
          bgColor: bgColor,
          left: (rect.width * ratio - 10) + 'px',
        });
      }).exec();
    },

  }
})