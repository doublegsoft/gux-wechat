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
    backgroundImage: {
      type: String,
      value: ''
    },
    puzzleImage: {
      type: String,
      value: ''
    },
  },

  data: {
    puzzleLeft: 0,
    puzzleTop: 0,
    sliderValue: 0,
    maxSlide: 200,

    isMoving: false,
  },

  pageLifetimes: {

    show: function() {

    },

  },

  methods: {

    refresh() {
      let info = wx.getSystemInfoSync();
      this.data.left = info.screenWidth * 0.08 + 12;
      this.data.screenWidth = info.screenWidth;

      const query = this.createSelectorQuery();

      query.select('#captchaImage').fields({ node: true, size: true }).exec(res => {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const dpr = wx.getSystemInfoSync().pixelRatio;
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        ctx.scale(dpr, dpr);

        const image = canvas.createImage();
        image.src = '/asset/image/demo/shoe.png'; 
        image.onload = () => {
          const imgWidth = image.width;
          const imgHeight = image.height;
          const canvasWidth = res[0].width;
          const canvasHeight = res[0].height;

          let drawWidth, drawHeight;
          if (imgWidth / imgHeight > canvasWidth / canvasHeight) {
            drawWidth = canvasWidth;
            drawHeight = (imgHeight * canvasWidth) / imgWidth;
          } else {
            drawHeight = canvasHeight;
            drawWidth = (imgWidth * canvasHeight) / imgHeight;
          }

          const xOffset = (canvasWidth - drawWidth) / 2;
          const yOffset = (canvasHeight - drawHeight) / 2;

          ctx.drawImage(image, xOffset, yOffset, drawWidth, drawHeight);
        };
      });

      this.setData({
        sliderValue: 0,
      })
    },

    doTouchStartSlider() {
      this.data.isMoving = true;
    },
  
    doTouchMoveSlider(ev) {
      if (this.data.isMoving !== true)
        return;

      let value = ev.touches[0].clientX - this.data.left;
      if (value < 0) {
        value = 0;
      }
      if (value > this.data.screenWidth * 0.84 - 12 * 2 - 40) {
        value = this.data.screenWidth * 0.84 - 12 * 2 - 40;
      }

      this.setData({
        sliderValue: value,
      })
    },
  
    doTouchEndSlider() {
      this.data.isMoving = false;

      wx.showToast({
        title: '验证通过',
        icon: 'success'
      });
      setTimeout(() => {
        this.triggerEvent('didSucceeded', {});
      }, 600);
    },
  },

});
