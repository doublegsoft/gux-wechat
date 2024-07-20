Page({
  data: {
    quantity: 1,

    podcasts: [
      {
        id: 1,
        image: '/images/podcast1.png',
        title: 'Sunday Summer - Ep3',
        category: 'Entertainment',
        duration: '15 min'
      },
      {
        id: 2,
        image: '/images/podcast2.png',
        title: 'Musical Soul - Vol. 1',
        category: 'Lifestyle',
        duration: '35 min'
      },
      {
        id: 3,
        image: '/images/podcast3.png',
        title: 'Talk Show - Ep4',
        category: 'Business',
        duration: '20 min'
      },
      {
        id: 4,
        image: '/images/podcast4.png',
        title: 'Musical Soul - Vol. 2',
        category: 'Lifestyle',
        duration: '30 min'
      },
      {
        id: 5,
        image: '/images/podcast5.png',
        title: 'Unravelling The Mind',
        category: 'Healthy Lifestyle',
        duration: '10 min'
      },
      {
        id: 6,
        image: '/images/podcast6.png',
        title: 'Talk Show - Ep8',
        category: 'Business',
        duration: '20 min'
      }
    ],
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
  
})
