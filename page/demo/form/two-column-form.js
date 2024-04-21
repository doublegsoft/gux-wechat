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
      title: '图片',
      name: 'images',
      input: 'images',
    },{
      title: '地区',
      name: 'district',
      input: 'district',
    }]
  },

  onLoad() {
    let navbar = this.selectComponent('#navigationBar');
    this.setData({
      marginTop: navbar.getHeight(),
    });
  },
})