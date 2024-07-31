const app = getApp();
const Charts = require('@/vendor/gcharts/gcharts-min');

Page({

  data: {
    ec0: {
      lazyLoad: true,
    },
    ec1: {
      lazyLoad: true,
    },
  },

  onLoad() {
    app.onShowPage(this);
    let dpr = wx.getSystemInfoSync().pixelRatio;

    wx.createSelectorQuery().in(this)
    .select('#pie_chart_1').fields({ node: true, size: true }).exec(res => {
      this.canvas = res[0].node
      let ctx = this.canvas.getContext('2d');
      this.canvas.width = res[0].width * dpr;
      this.canvas.height = res[0].height * dpr;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
      new Charts({
        animation: true,
        type: 'pie',
        series: [{
          name: '成交量1',
          data: 15,
        },{
          name: '成交量2',
          data: 35,
        },{
          name: '成交量3',
          data: 78,
        },{
          name: '成交量4',
          data: 63,
        }],
        context: ctx,
        width: this.data.viewWidth,
        height: 300,
        dataLabel: false,
      });
    });

    wx.createSelectorQuery().in(this)
    .select('#pie_chart_2').fields({ node: true, size: true }).exec(res => {
      this.canvas = res[0].node
      let ctx = this.canvas.getContext('2d');
      this.canvas.width = res[0].width * dpr;
      this.canvas.height = res[0].height * dpr;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
      new Charts({
        animation: true,
        type: 'ring',
        series: [{
          name: '成交量1',
          data: 15,
        },{
          name: '成交量2',
          data: 35,
        },{
          name: '成交量3',
          data: 78,
        },{
          name: '成交量4',
          data: 63,
        }],
        context: ctx,
        width: this.data.viewWidth,
        height: 300,
        dataLabel: false,
      });
    });

  },
})