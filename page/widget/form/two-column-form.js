Page({

  /**
   * Page initial data
   */
  data: {

    fields: [{
      title: '身份证号',
      name: 'idcard',
      input: 'id',
    },{
      title: '手机',
      name: 'mobile',
      input: 'mobile',
    },{
      title: '金额',
      name: 'amount',
      input: 'number',
    },{
      title: '日期',
      name: 'date',
      input: 'date',
    },{
      title: '时间',
      name: 'time',
      input: 'time',
    },{
      title: '地区',
      name: 'district',
      input: 'district',
    },{
      title: '身高',
      name: 'height',
      input: 'ruler',
      unit: 'cm',
    },{
      title: '文本',
      name: 'text',
      input: 'text',
    },{
      title: '下拉选择',
      name: 'select',
      input: 'select',
      options: {
        values: [
          {text: '首先', value: 'A'},
          {text: '其次', value: 'B'},
          {text: '再次', value: 'C'}
        ],
      }, 
    },{
      title: '分隔',
      name: 'segment',
      input: 'segment',
      options: {
        values: [
          {text: '首先', value: 'A'},
          {text: '其次', value: 'B'},
          {text: '再次', value: 'C'}
        ],
      }, 
    },{
      title: '图标单个',
      name: 'single_icon',
      input: 'single',
      options: {
        type: 'icon',
        values: [{
          value: 'A', icon: 'fas fa-frown gx-text-secondary', 
          active: 'fas fa-frown gx-color-primary'
        },{
          value: 'B', icon: 'fas fa-meh gx-text-secondary', 
          active: 'fas fa-meh gx-color-primary'
        },{
          value: 'C', icon: 'fas fa-smile gx-text-secondary', 
          active: 'fas fa-smile gx-color-primary'
        }],
      }, 
    },{
      title: '文本单个',
      name: 'single_text',
      input: 'single',
      options: {
        values: [
          {text: 'S', value: 'A'},
          {text: 'M', value: 'B'},
          {text: 'L', value: 'C'}
        ],
      }, 
    },{
      title: '布尔',
      name: 'bool',
      input: 'bool',
    },{
      title: '图片',
      name: 'images',
      input: 'images',
      value: [],
    },{
      title: '长文本',
      name: 'longtext',
      input: 'longtext',
    }]
  },

  onLoad() {
    let navbar = this.selectComponent('#navigationBar');
    this.setData({
      marginTop: navbar.getHeight(),
    });
  },

  doSave() {
    let form = this.selectComponent('#form');
    let values = form.getValues();
    console.log(values);
  },
})