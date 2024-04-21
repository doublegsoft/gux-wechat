const { xhr } = require("../../common/xhr");

Component({
  /**
   * Component properties
   */
  properties: {
    title: {
      type: String,
      value: "中国地区",
    },
  },

  /**
   * Component initial data
   */
  data: {
    value: {},

    isOpen: false,

    districts: [],

    selectedProvinceCode: null,

    selectedProvinceName: "省份",

    selectedCityCode: null,

    selectedCityName: "城市",

    selectedCountyCode: null,

    selectedCountyName: "区县",

    selectedTownCode: null,

    selectedTownName: "街道/乡镇",

    height: 0,

    onClosed: null,
  },

  methods: {
    getValue() {
      return {
        provinceCode: this.data.selectedProvinceCode,
        provinceName: this.data.selectedProvinceName,
        cityCode: this.data.selectedCityCode,
        cityName: this.data.selectedCityName,
        countyCode: this.data.selectedCountyCode,
        countyName: this.data.selectedCountyName,
        townCode: this.data.selectedTownCode,
        townName: this.data.selectedTownName,
      };
    },
    setValue(value) {
      this.setData({
        selectedProvinceCode: value.provinceCode,
        selectedProvinceName: value.provinceName,
        selectedCityCode: value.cityCode,
        selectedCityName: value.cityName,
        selectedCountyCode: value.countyCode,
        selectedCountyName: value.countyName,
        selectedTownCode: value.townCode,
        selectedTownName: value.townName,
      });
    },
    setOnClosed(onClosed) {
      this.data.onClosed = onClosed;
    },
    /*!
     ** 显示地区选择弹窗。
     */
    async show(value) {
      if (typeof value !== "undefined") {
        this.setValue(value);
      }
      let res = await wx.getSystemInfo();
      let height = res.windowHeight * res.pixelRatio;  
      // 背景遮罩层
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      height = 100 - (240 / (res.windowHeight * 0.9)) * 100;
      //this.animation = animation
      animation.translateY(1000).step();
      this.setData({
        animationData: animation.export(),
        isOpen: true,
        height: height,
      })
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export()
        })
      }.bind(this), 0)
    },
    
    hide(val) {
      this.setData({
        animationData: null,
        isOpen: false,
      });
      if (val !== false) {
        if (this.data.onClosed) {
          this.data.onClosed(val);
        }
      }
    },

    /*!
     ** 隐藏地区选择弹窗。
     */
    onHide() {
      this.hide(false);
    },

    onClear() {
      this.hide({});
    },

    onConfirm() {
      this.hide(this.getValue());
    },

    async onSelectProvince() {
      let districts = await xhr.promise2({
        url: "/api/v3/common/script/stdbiz/gb/chinese_district/find",
        params: {
          _and_condition: "and length(chndistcd) = 2",
        },
      });
      this.setData({ districts: districts });
    },
    async onSelectCity() {
      if (!this.data.selectedProvinceCode) {
        return;
      }
      let districts = await xhr.promise2({
        url: "/api/v3/common/script/stdbiz/gb/chinese_district/find",
        params: {
          _and_condition:
            "and length(chndistcd) = 4 and substring(chndistcd, 1, 2) = '" +
            this.data.selectedProvinceCode +
            "'",
        },
      });
      this.setData({districts: districts});
    },
    async onSelectCounty() {
      if (!this.data.selectedCityCode) {
        return;
      }
      let districts = await xhr.promise2({
        url: "/api/v3/common/script/stdbiz/gb/chinese_district/find",
        params: {
          _and_condition:
            "and length(chndistcd) = 6 and substring(chndistcd, 1, 4) = '" +
            this.data.selectedCityCode +
            "'",
        },
      });
      this.setData({ districts: districts });
    },
    async onSelectTown() {
      if (!this.data.selectedCountyCode) {
        return;
      }
      let districts = await xhr.promise2({
        url: "/api/v3/common/script/stdbiz/gb/chinese_district/find",
        params: {
          _and_condition:
            "and length(chndistcd) = 9 and substring(chndistcd, 1, 6) = '" +
            this.data.selectedCountyCode +
            "'",
        },
      });
      this.setData({ districts: districts });
    },
    onSelectDistrict(ev) {
      let district = ev.currentTarget.dataset.district;
      if (district.chineseDistrictCode.length == 2) {
        this.setData({
          selectedProvinceCode: district.chineseDistrictCode,
          selectedProvinceName: district.chineseDistrictName,
          selectedCityCode: null,
          selectedCityName: '城市',
          selectedCountyCode: null,
          selectedCountyName: '区县',
          selectedTownCode: null,
          selectedTownName: '街道/乡镇',
        });
        this.onSelectCity();
      } else if (district.chineseDistrictCode.length == 4) {
        this.setData({
          selectedCityCode: district.chineseDistrictCode,
          selectedCityName: district.chineseDistrictName,
          selectedCountyCode: null,
          selectedCountyName: '区县',
          selectedTownCode: null,
          selectedTownName: '街道/乡镇',
        });
        this.onSelectCounty();
      } else if (district.chineseDistrictCode.length == 6) {
        this.setData({
          selectedCountyCode: district.chineseDistrictCode,
          selectedCountyName: district.chineseDistrictName,
          selectedTownCode: null,
          selectedTownName: '街道/乡镇',
        });
        this.onSelectTown();
      } else if (district.chineseDistrictCode.length == 9) {
        this.setData({
          selectedTownCode: district.chineseDistrictCode,
          selectedTownName: district.chineseDistrictName,
        });
      }
    },
  },
});
