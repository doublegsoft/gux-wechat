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
const { util } = require("../../common/util");

Component({

  externalClasses: ['input-group-ex', 'field-ex'],
  
  properties: {

    fields: {
      type: Array,
      value: [],
      observer: "setFields",
    },
    
    readonly: {
      type: Boolean,
      value: false,
      observer: "setReadonly"
    },

    labelWidth: {
      type: Number,
      value: 120,
    },
  },

  data: {

    fields: [],

  },

  lifetimes: {

    attached: async function (page) {
      
    },
  },

  attached: function () {},

  ready: function () {
    
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {

    },
    hide: function () {},
    resize: function () {},
  },

  methods: {
    setValues(values) {
      for (let i = 0; i < this.data.fields.length; i++) {
        let field = this.data.fields[i];
        field.value = values[field.name];
        // 转换
        if (field.input === 'select') {
          if (!field.options) field.options = {values:[]};
          for (let i = 0; i < field.options.values.length; i++) {
            if (field.value === field.options.values[i].value) {
              field.text = field.options.values[i].text;
            }
          }
        }
        if (field.input === 'district' && field.value) {
          field.value.districtName = util.convertDistrictName(field.value);
        }
        if (Array.isArray(field.value)) {
          if (!field.values) field.values = {};
          for (let v of field.value) {
            field.values[v] = true;
          }
        } 
      }
      
      this.setData({
        fields: this.data.fields,
      });
    },

    getValues() {
      let ret = {};
      for (let i = 0; i < this.data.fields.length; i++) {
        let field = this.data.fields[i];
        ret[field.name] = field.value;
      }
      return ret;
    },

    setFields(newData, oldData) {
      if (newData != oldData) {
        this.setData({
          fields: newData,
        });
      }
    },

    setValue(name, value) {
      let fields = [...this.data.fields]
      for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        if (field.name === name) {
          if (field.input == 'select') {
            let index = parseInt(value);
            value = field.options.values[index].value;
            field.text = field.options.values[index].text;
          }
          if (Array.isArray(field.value)) {
            if (Array.isArray(value)) {
              field.value.concat(value);
            } else {
              field.value.push(value);
            }
          } else {
            field.value = value;
          }
        }
      }
      this.setData({
        fields: fields,
      });
    },
    
    setReadonly(readonly) {
      this.setData({
        readonly: readonly,
      });
    },

    onSelectValue(e) {
      this.setValue(e.currentTarget.id, e.detail.value);
    },

    onChangeSwitch(e) {
      let fields = [...this.data.fields]
      for (let field of fields) {
        if (field.name == e.currentTarget.id) {
          if (!field.value || field.value == 'F') {
            field.value = 'T';
          } else if (field.value == 'T') {
            field.value = 'F';
          }
          break;
        }
      }
      this.setData({
        fields: fields,
      });
    },

    onChangeValue(e) {
      this.setValue(e.target.id, e.detail.value);
    },

    onChangeRuler(e) {
      let select = this.selectComponent('#selectRuler');
      select.setOnClosed(val => {
        this.setValue(e.target.id, val);
      });
      select.show({
        ...e.target.dataset,
      })
    },

    /*!
    ** 点击【segment】类型的单选按钮触发事件。
    */
    doClickSegment(ev) {
      const name = ev.currentTarget.dataset.name;
      const value = ev.currentTarget.dataset.value;
      this.setValue(name, value);
    },

    /*!
    ** 点击【single】类型的单选按钮触发事件。
    */
    doClickSingle(ev) {
      const name = ev.currentTarget.dataset.name;
      const value = ev.currentTarget.dataset.value;
      this.setValue(name, value);
    },

    /*!
    ** 显示中国地区选择器。
    */
    async doChangeDistrict(e) {
      let select = this.selectComponent(
        "#selectChineseDistrict"
      );
      select.setOnClosed((res) => {
        let fields = [...this.data.fields]
        for (let i = 0; i < fields.length; i++) {
          let field = fields[i];
          if (field.name === e.target.id) {
            field.value = res;
            if (field.value) {
              field.value.districtName = util.convertDistrictName(res);
            }
            break;
          }
        }
        this.setData({
          fields: fields,
        });
      });
      let defaultValue = {
        provinceCode: null,
        cityCode: null,
        countyCode: null,
        townCode: null,
        provinceName: '省份',
        cityName: '城市',
        countyName: '区县',
        townName: '街道/乡镇',
      };
      await select.show(defaultValue);
    },

    /*!
    ** 隐藏表单组件所有的自定义输入面板。
    */
    hideAllCustomInputs() {
      let input = this.selectComponent('#inputCustomText');
      input.hide();
      // let select = this.selectComponent("#selectChineseDistrict");
      // select.hide();
    },

    /*!
    ** 显示自定义的输入面板。MUST BE catch:tap.
    */
    doShowTypepad(ev) {
      this.hideAllCustomInputs();
      let input = this.selectComponent('#inputCustomText');
      input.setOnClosed(val => {
        this.setValue(ev.target.id, val);
      });
      input.show({
        ...ev.target.dataset,
      });
    },

    didAddImage(ev) {
      let name = '';
      let value = '';
      for (let k in ev.detail) {
        name = k;
        value = ev.detail[k];
      }
      this.setValue(name, value);
    },

  }, /* methods */
});
