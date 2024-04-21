Page({

  data: {

    images: [],
  },

  onLoad() {
    let images = [];
    for (let i = 0; i < 5; i++) {
      images.push({
      });
    }
    this.setData({
      images: images,
    })
  },

  doClick(ev) {
    let val = ev.currentTarget.dataset.value;
    for (let i = 0; i < this.data.dates.length; i++) {
      let dt = this.data.dates[i];
      if (dt.text === parseInt(val)) {
        dt.checked = true;
      } else {
        dt.checked = false;
      }
    }
    this.setData({
      dates: this.data.dates,
    })
  }

})