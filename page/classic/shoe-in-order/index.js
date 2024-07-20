const app = getApp();

Page({
  data: {
    quantity: 1
  },

  onShow() { 
    app.onShowPage(this);
  },
  
  increaseQuantity: function() {
    this.setData({
      quantity: this.data.quantity + 1
    });
  },
  decreaseQuantity: function() {
    if (this.data.quantity > 1) {
      this.setData({
        quantity: this.data.quantity - 1
      });
    }
  },
  deleteProduct: function() {
    wx.showToast({
      title: 'Product deleted',
      icon: 'success',
      duration: 2000
    });
  }
})
