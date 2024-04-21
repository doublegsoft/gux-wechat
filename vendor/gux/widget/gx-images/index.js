const app = getApp();
Component({

  properties: {
    
    images: {
      type: Array,
      value: [],
    },

    readonly: {
      type: Boolean,
      value: false,
    }

  },

  data: {
    
    images: [],

  },

  methods: {
    onChooseImage(e) {
      wx.chooseMedia({
        mediaType: ['image'],
        success: res => {
          if (!res.tempFiles) return;
          let imgs = [...this.data.images];
          for (let image of res.tempFiles) {
            imgs.push({
              url: image.tempFilePath,
            })
          } 
          this.setData({
            images: imgs,
          })
        },
      });
    },

    onViewImage(e) {
      wx.previewImage({
        urls: [
          e.currentTarget.dataset.url,
        ],
      })
    },

  },
});