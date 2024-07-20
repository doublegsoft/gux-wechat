const { util } = require("../../../vendor/gux/common/util");

Page({
  data: {
    daysOfWeek: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
    calendarRows: [
      ['1', '2', '3', '4', '5', '6', '7'],
      ['8', '9', '10', '11', '12', '13', '14'],
      ['15', '16', '17', '18', '19', '20', '21'],
      ['22', '23', '24', '25', '26', '27', '28'],
      ['29', '30', null, null, null, null, null]
    ],
    selectedDate: null
  },

  onShow() { 
    let navbar = this.selectComponent('#navigationBar');
    if (navbar != null) {
      this.setData({
        marginTop: navbar.getHeight(),
      });
    }
    this.setData({
      height: util.height(64) + 'px',
    });
  },

  onDateSelect: function (event) {
    const date = event.currentTarget.dataset.date;
    this.setData({
      selectedDate: date
    });
  },

  onToggleSwitch: function () {
    // 示例切换开关逻辑
    wx.showToast({
      title: 'Switch toggled',
      icon: 'success'
    });
  }
})
