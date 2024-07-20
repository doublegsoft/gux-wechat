Component({
  properties: {
    item: {
      type: Object,
      value: {},
      observer: "_setValue",
    },
    pointerColor: {
      type: String,
      value: "#FC6496",
    },
    valueColor: {
      type: String,
      value: "#50D0C6",
    },
  },
  data: {
    title: '标题',
    unit: '',
    value: 50, //当前值
    minValue: 30, //最小值
    maxValue: 200, //最大值

    onClosed: null,

    isOpen: false,
    height: 0,
    canvasWidth: 750,
    canvasHeight: 152,
    
    ratio: 10,
    screenHeight: 1334,
    pixelRatio: 2,
    touchStart: 0,
    canvasId: "canvas",
  },
  lifetimes: {
    attached: function (page) {},

    created() {
      this.getSystemInfo();
    },

    ready() {
      
    },
  },
  methods: {
    _setValue: function (newData, oldData) {
      this.setData({
        value: newData.value,
        canvasId: newData.name + "Canvas",
      });
    },

    setOnClosed(onClosed) {
      this.data.onClosed = onClosed;
    },

    /*!
     ** 显示选择弹窗。
     */
    async show(params) {
      this.setData({
        title: params.title,
        unit: params.unit,
        value: params.value || 50,
      });
      this.drawRuler();
      let res = await wx.getSystemInfo();
      let height = res.windowHeight * res.pixelRatio;
      // 背景遮罩层
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0,
      });
      height = 100 - (240 / (res.windowHeight * 0.9)) * 100 - 6;
      animation.translateY(1000).step();

      this.setData({
        animationData: animation.export(),
        isOpen: true,
        height: height,
      });

      setTimeout(function () {
        animation.translateY(0).step();
        this.setData({
          animationData: animation.export(),
        });
      }.bind(this), 0);
    },

    hide(value) {
      this.setData({
        animationData: null,
        isOpen: false,
      });
      if (value && this.data.onClosed) {
        this.data.onClosed(value);
      }
    },
    
    /*!
     ** 隐藏选择弹窗。
     */
    onHide() {
      this.hide();
    },

    onConfirm() {
      this.hide(this.data.value);
    },

    //获取系统信息
    getSystemInfo: function () {
      let _this = this;
      wx.getSystemInfo({
        success: function (res) {
          let canvasWidth = res.windowWidth;
          let screenHeight = res.windowHeight;
          let pixelRatio = res.pixelRatio;
          _this.setData({
            canvasWidth,
            screenHeight,
            pixelRatio,
          });
        },
      });
    },

    drawRuler: function () {
      let _this = this;
      let pixelRatio = this.data.pixelRatio;
      let canvasHeight = this.data.canvasHeight - 59; //canvas高度
      let ratio = this.data.ratio; //偏移量
      let ruleOrigin = 0; //rule起点
      let color = "177,177,177"; //渐变颜色
      let opacityRange = [
        { range: 0, color: "rgba(" + color + ",0)" },
        { range: 0.4, color: "rgba(" + color + ",1)" },
        { range: 0.6, color: "rgba(" + color + ",1)" },
        { range: 1, color: "rgba(" + color + ",0)" },
      ];

      let canvasWidth = _this.data.canvasWidth;
      let canvas = wx.createSelectorQuery().select('#canvas');
      console.log(canvas);
      // let ctx = canvas.getContext('2d');
      let ctx = wx.createCanvasContext('canvas', this);
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      const grd = ctx.createLinearGradient(
        ruleOrigin,
        canvasHeight,
        canvasWidth,
        canvasHeight
      );
      grd.addColorStop(opacityRange[0].range, opacityRange[0].color);
      grd.addColorStop(opacityRange[1].range, opacityRange[1].color);
      grd.addColorStop(opacityRange[2].range, opacityRange[2].color);
      grd.addColorStop(opacityRange[3].range, opacityRange[3].color);
      ctx.setStrokeStyle(grd);

      let value = _this.data.value * 10;
      //误差修正
      if (2 < pixelRatio && pixelRatio < 3) {
        pixelRatio = 4;
      }
      let centerPoint = Math.ceil(canvasWidth / 2 + pixelRatio); //中心点
      let preScale = Math.ceil(centerPoint / ratio); //中心点左边平均刻度份数
      let maxVal = Math.ceil(value - centerPoint) + canvasWidth; //最大刻度
      let minVal = Math.ceil(value - preScale); //最小刻度
      ctx.setLineWidth(1);
      ctx.setTextAlign("center");
      //中间线
      ctx.beginPath();
      ctx.setFontSize(36);
      ctx.setFillStyle(this.data.valueColor); //顶部颜色
      let metrics = ctx.measureText(this.data.value);
      ctx.fillText(this.data.value, centerPoint, 30);
      ctx.setFontSize(14);
      ctx.fillText(this.data.unit, centerPoint + 15 + metrics.width / 2, 30);
      ctx.setStrokeStyle(this.data.pointerColor); //选中刻度线颜色-红色
      ctx.moveTo(centerPoint, 59);
      ctx.lineTo(centerPoint, 152);
      ctx.stroke();
      ctx.closePath();

      //刻度值
      ctx.beginPath();
      ctx.setFontSize(12);
      ctx.setStrokeStyle(grd);
      ctx.setFillStyle("rgb(177,177,177)");
      let n = 0;
      let drawX = "";
      for (let i = minVal; i <= maxVal; i++) {
        drawX = n.toFixed(1) * ratio + ruleOrigin;
        if (i % ratio == 0) {
          ctx.fillText(i > 30 ? i / ratio : "", i >= 30 ? drawX : "", 80);
          ctx.moveTo(i > 30 ? drawX : "", 86);
          ctx.lineTo(i > 30 ? drawX : "", 132);
        } else {
          if (i % 2 == 0) {
            ctx.moveTo(i > 30 ? drawX : "", 97);
            ctx.lineTo(i > 30 ? drawX : "", 122);
          }
        }
        n++;
      }
      ctx.stroke();
      ctx.closePath();
      ctx.draw();
    },

    start: function (e) {
      this.touchStart = e.touches[0].x;
      this.data.touchEnd = this.data.value; //记录鼠标按下时当前的值
    },

    move: function (e) {
      let min = e.touches[0].x - this.touchStart;
      let value = (Number(this.data.touchEnd * 10) + Number(-min)).toFixed(
        1
      );
      let minValue = this.data.minValue * 10;
      let maxValue = this.data.maxValue * 10;

      if (value < minValue) {
        value = minValue;
      }
      if (value > maxValue) {
        value = maxValue;
      }
      value = (value / 10).toFixed(1);
      this.setData({
        value,
      });
      this.drawRuler();
    },
  },
});
