Page({

  data: {

    dates: [],

    doClick(ev) {
      
    },
  },

  onLoad() {
    let dates = [];
    for (let i = 0; i < 3; i++) {
      dates.push({
        text: (i + 1),
        checked: i == 0 ? true : false,
      });
    }
    this.setData({
      dates: dates,
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