
const app = getApp();
const { util } = require("@/vendor/gux/common/util");
const { gx } = require("@/vendor/gux/common/gx");
const { sdk } = require("@/sdk/gux");

Page({

  data: {
    
    currentIndex: 0,

    countdown: 60,

    checked: false,
  },

  onLoad(options) {
    
  },

  onUnload() {
    if (this.interval4Pin) {
      clearInterval(this.interval4Pin);
    }
  },

  onShow() { 
    app.onShowPage(this);
  },

  didSucceeded() {
    let dialog = this.selectComponent('#dialogCaptcha');
    dialog.hide();

    this.interval4Pin = setInterval(() => {
      this.setData({
        waiting4Pin: true,
        countdown: this.data.countdown - 1,
      });
      if (this.data.countdown <= 0) {
        this.setData({
          waiting4Pin: false,
          countdown: 60,
        });
      }
    }, 1000);
  },

  doRequest() {
    let dialog = this.selectComponent('#dialogCaptcha');
    dialog.show(() => {
      let captcha = this.selectComponent('#captcha');
      captcha.refresh();
    });
  },

  doInputMobile() {
    let typepad = this.selectComponent('#typepad4mobile');
    typepad.show({
      input: 'mobile',
    });
    typepad.setOnClosed((val) => {
      this.setData({
        mobile: val,
      })
    });
  },

  doInputPin() {
    let dialog = this.selectComponent('#dialogPin');
    dialog.show();

    let typepad = this.selectComponent('#typepad4pin');
    typepad.show({
      headless: true,
      input: 'mobile',
    });

    this.setData({
      code0: '',
      code1: '',
      code2: '',
      code3: '',
    });
  },

  doInputId() {
    let typepad = this.selectComponent('#typepad4id');
    typepad.show({
      input: 'id',
    });

    typepad.setOnClosed((val) => {
      this.setData({
        id: val,
      })
    });
  },

  doCancelInputPin() {
    let dialog = this.selectComponent('#dialogPin');
    dialog.hide();

    let typepad = this.selectComponent('#typepad4pin');
    typepad.hide();
  },

  didTapKey4Pin(ev) {
    let key = ev.detail.key;
    if (key == 'backspace') {
      this.data.currentIndex -= 1;
      this.data['code' + this.data.currentIndex] = '';
      if (this.data.currentIndex < 0) {
        this.data.currentIndex = 0;
      }
      this.setData(this.data);
      return;
    } 
    this.data['code' + this.data.currentIndex] = key;
    this.setData(this.data);

    if (this.data.currentIndex == 3) {
      this.complete();
      return;
    }
    this.data.currentIndex += 1;
  },

  gotoPrivacyPolicy() {
    gx.navigateTo({
      url: '/page/common/privacy-policy/index',
    });
  },

  toggleCheck() {
    const newChecked = !this.data.checked;
    this.setData({
      checked: newChecked,
    });
    this.triggerEvent('change', { checked: newChecked });
  },

  complete() {
    wx.showLoading({
      title: '验证中',
    });
    setTimeout(() => {
      // Hide the loading dialog after 2 seconds
      wx.hideLoading();
      let dialog = this.selectComponent('#dialogPin');
      dialog.hide();
      gx.navigateTo({
        url: '/page/common/success/index',
      });
    }, 3000);
  }
})