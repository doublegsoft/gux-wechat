const app = getApp();
const { sdk } = require('@/sdk/' + app.sdk);

Page({

  data: {

  },

  onShow() {
    app.onShowPage(this);
  },

  onLoad(options) {
    sdk.fetchArticle({
      articleId: options.articleId,
    }).then(resp => {
      if (!resp) return;
      let richview = this.selectComponent('#article');
      richview.setRichText(resp.content);
    });
  },

})