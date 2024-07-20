const app = getApp();
Component({

  properties: {
    
    images: {
      type: Array,
      value: [],
    },

    name: {
      type: String,
    },

    readonly: {
      type: Boolean,
      value: false,
    },

    onAddImage: {
      type: Function,
    },

    onDelImage: {
      type: Function,
    },

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
          });
          let detail = {};
          detail[this.data.name] = imgs[imgs.length - 1];
          this.triggerEvent('didAddImage', detail);
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