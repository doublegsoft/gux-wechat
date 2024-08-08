const app = getApp();
const Charts = require('@/vendor/gcharts/gcharts-min');

Page({

  data: {
    items: [{
      text: '随随便便',
    },{
      text: '匆匆忙忙',
    },{
      text: '高高兴兴',
    },{
      text: '安安静静',
    },{
      text: '热热闹闹',
    },{
      text: '清清楚楚',
    },{
      text: '随随便便',
    },{
      text: '匆匆忙忙',
    },{
      text: '高高兴兴',
    },{
      text: '安安静静',
    },{
      text: '热热闹闹',
    },{
      text: '清清楚楚',
    }],

    colors: ['red','green','black','blue'],

    segmentIndex: 3,
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
        legend: false,
        type: 'ring',
        series: [{
          name: '成交量1',
          data: 15,
          color: 'red',
        },{
          name: '成交量2',
          data: 35,
          color: 'green',
        },{
          name: '成交量3',
          data: 78,
          color: 'black',
        },{
          name: '成交量4',
          data: 63,
          color: 'blue',
        }],
        context: ctx,
        width: this.data.viewWidth,
        height: 200,
        dataLabel: false,
      });
    });
  },

  doClickSegment(ev) {
    this.setData({
      segmentIndex: ev.target.dataset.segmentIndex,
    });
    wx.showLoading({
      title: '数据加载中...',
    });
    this.data.items = this.data.items.concat(this.data.items);
    setTimeout(() => {
      wx.hideLoading();
      this.setData({
        items: this.data.items,
      })
    }, 1000);
  }
})