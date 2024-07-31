const app = getApp();

Page({
  
  data: {},

  onLoad: function () {
    
  },

  onShow() { 
    app.onShowPage(this);
  },

});
