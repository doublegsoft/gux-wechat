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
const { parse } = require('@/vendor/htmlparser/htmlparser');

Component({
  properties: {

  },

  data: {
    
    htmlElements: [],

  },

  pageLifetimes: {

    show: function() {
      
    }
},

  /**
   * Component methods
   */
  methods: {

    setRichText(html) {
      let results = parse(html);
      let elements = [];
      for (let i = 0; i < results.length; i++) {
        let res = results[i];
        if (res.children[0].type === 'text') {
          elements.push({
            type: res.name,
            text: res.children[0].content,
          });
        } else if (res.children[0].name === 'img') {
          let attrs = {};
          for (let i = 0; i < res.children[0].attrs.length; i++) {
            attrs[res.children[0].attrs[i].name] = res.children[0].attrs[i].value;
          }
          elements.push({
            type: 'img',
            ...attrs,
          });
        }
      }
      this.setData({
        htmlElements: elements,
      });
    },

  }
})
