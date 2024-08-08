/*
** ──────────────────────────────────────────────────
** ─██████████████─██████──██████─████████──████████─
** ─██░░░░░░░░░░██─██░░██──██░░██─██░░░░██──██░░░░██─
** ─██░░██████████─██░░██──██░░██─████░░██──██░░████─
** ─██░░██─────────██░░██──██░░██───██░░░░██░░░░██───
** ─██░░██─────────██░░██──██░░██───████░░░░░░████───
** ─██░░██──██████─██░░██──██░░██─────██░░░░░░██─────
** ─██░░██──██░░██─██░░██──██░░██───████░░░░░░████───
** ─██░░██──██░░██─██░░██──██░░██───██░░░░██░░░░██───
** ─██░░██████░░██─██░░██████░░██─████░░██──██░░████─
** ─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░██──██░░░░██─
** ─██████████████─██████████████─████████──████████─
** ──────────────────────────────────────────────────
*/
Component({

  properties: {

  },

  data: {

    mode: '',
    
    value: {},

    columns: [],

    selectedIndexes: [0],

    hours: [],
    minutes: [],

    years: [],
    months: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    days: [],
  },

  lifetimes: {

  },

  methods: {

    /*!
     ** 显示选择弹窗。
     */
    async show(params) {
      for (let i = 0; i < 24; i++) {
        this.data.hours.push(i);
      }
      for (let i = 0; i < 60; i++) {
        this.data.minutes.push(i);
      }
      for (let i = 1900; i < 2200; i++) {
        this.data.years.push(i);
      }
      for (let i = 1; i <= 31; i++) {
        this.data.days.push(i);
      }
      if (params.mode == 'time') {
        this.data.selectedIndexes = [0,0];
      } else if (params.mode == 'date') {
        this.data.selectedIndexes = [100,0,0];
      } else {
        this.data.selectedIndexes = [0];
      }
      
      let res = wx.getSystemInfoSync();
      let height = res.windowHeight * res.pixelRatio;
      // 背景遮罩层
      var animation = wx.createAnimation({
        duration: 400,
        timingFunction: "linear",
        delay: 0,
      });
      height = 100 - (240 / (res.windowHeight * 0.9)) * 100 - 6;
      animation.translateY(res.windowHeight).step();

      this.setData({
        columns: params.columns || [],
        value: params.value,
        onClosed: params.onClosed,
        mode: params.mode,
        selectedIndexes: this.data.selectedIndexes,

        animationData: animation.export(),
        isOpen: true,
        height: height,
        hours: this.data.hours,
        minutes: this.data.minutes,
        years: this.data.years,
        months: this.data.months,
        days: this.data.days,
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
      if (this.data.onClosed) {
        this.data.onClosed(value);
      }
    },
    
    /*!
     ** 隐藏选择弹窗。
     */
    onHide() {
      this.hide();
    },

    onConfirm(ev) {
      let val = {};
      if (this.data.mode == 'time') {
        val.hour = this.data.selectedIndexes[0];
        val.minute = this.data.selectedIndexes[1];
      } else if (this.data.mode == 'date') {
        val.year = this.data.years[this.data.selectedIndexes[0]];
        val.month = this.data.selectedIndexes[1] + 1;
        val.day = this.data.selectedIndexes[2] + 1;
      } else {
        for (let i = 0; i < this.data.selectedIndexes.length; i++) {
          let index = this.data.selectedIndexes[i];
          let column = this.data.columns[i];
          val[column.name] = column.values[index];
        }
      }
      this.hide(val);
    },

    onClear() {
      this.hide('');
    },

    doChangePickerValue(e) {
      let val = e.detail.value
      if (this.data.mode == 'date') {
        let days = 30;
        let year = this.data.years[val[0]];
        let month = val[1] + 1;
        if (month == 2) {
          days = 29;
          if ((year % 4 == 0 && year % 100 > 0) || year % 400 == 0) {
            days = 28;
          }
        } else if (month == 1 || month == 3 || month == 5 || month == 7 || 
                   month == 8 || month == 10 || month == 12) {
          days = 31;
        } 
        this.data.days = [];
        for (let i = 0; i <= days; i++) {
          this.data.days.push(i);
        }
        this.setData({
          selectedIndexes: val,
          days: this.data.days,
        })
      } else {
        this.setData({
          selectedIndexes: val,
        })
      }
    },

  }, 

});
