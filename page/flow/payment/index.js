
const app = getApp();
const { util } = require("@/vendor/gux/common/util");
const { sdk } = require("@/sdk/gux");

Page({

  data: {
    currentIndex: 0,
  },

  onLoad(options) {
    
  },

  onShow() { 
    app.onShowPage(this);
  },

  doPay() {
    let dialog = this.selectComponent('#dialog');
    dialog.show();

    let typepad = this.selectComponent('#typepad');
    typepad.show({
      input: 'mobile',
      headless: true,
    });

    this.setData({
      focused0: true,
      password0: '',
      password1: '',
      password2: '',
      password3: '',
      password4: '',
      password5: '',
    });
  },

  doCancel() {
    let dialog = this.selectComponent('#dialog');
    dialog.hide();

    let typepad = this.selectComponent('#typepad');
    typepad.hide();
  },

  didTapKey(ev) {
    let key = ev.detail.key;
    if (key == 'backspace') {
      this.data.currentIndex -= 1;
      this.data['password' + this.data.currentIndex] = '';
      if (this.data.currentIndex < 0) {
        this.data.currentIndex = 0;
      }
      this.setData(this.data);
      return;
    } 
    this.data['password' + this.data.currentIndex] = key;
    this.setData(this.data);

    if (this.data.currentIndex == 5) {
      this.pay();
      return;
    }
    this.data.currentIndex += 1;
  },

  pay() {
    wx.showLoading({
      title: '支付中',
    });
    setTimeout(() => {
      // Hide the loading dialog after 2 seconds
      wx.hideLoading();
      let dialog = this.selectComponent('#dialog');
      dialog.hide();
      wx.navigateTo({
        url: '/page/common/success/index',
      });
    }, 3000);
  }
})