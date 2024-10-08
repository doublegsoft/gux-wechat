const app = getApp();
const sdk = {
  host4Image: app.host,
  host4Api: app.host,
};
const { xhr } = require('@/vendor/gux/common/xhr');

sdk.fetchEmployees = function (params) {
  let start = params.start;
  let limit = params.limit || 15;
  let resp = {
    total: start + limit,
    data: [],
  };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      for (let i = 0; i < limit; i++) {
        resp.data.push({
          employeeName: '魏东-' + (start + i + 1),
          avatar: 'https://i.pravatar.cc/64',
          salary: '1200.00',
          adjustmentDate: '2024年01月17日',
        });
      }
      resolve(resp);
    }, 2000);
  });
};

sdk.fetchMerchandises = function (params) {
  let start = params.start;
  let limit = params.limit || 15;
  let resp = {
    total: start + limit,
    data: [],
  };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      for (let i = 0; i < limit; i++) {
        resp.data.push({
          merchandiseName: 'Nike霸王鞋',
          description: '能够飞得很高',
          image: 'https://i.pravatar.cc/64',
          price: '1500.00',
        });
      }
      resolve(resp);
    }, 2000);
  });
};

/*!
** 获取应用程序【历史搜索】信息。
*/
sdk.fetchSearchCriteria = async function (params) {
  let ret = {
    history: [{
      text: '历史搜索1',
    },{
      text: '历史搜索2',
    },{
      text: '历史搜索3',
    },{
      text: '历史搜索4',
    }],
    category: [{
      text: '类别搜索1',
    },{
      text: '类别搜索2',
    },{
      text: '类别搜索3',
    },{
      text: '类别搜索4',
    }],
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ret);
    }, 500);
  });
};

sdk.getWelcomeImage = () => {
  return sdk.host4Image + '/img/demo/gux/welcome.png';
};

sdk.getSuccessImage = () => {
  return sdk.host4Image + '/img/app/success.png';
};

sdk.getFailureImage = () => {
  return sdk.host4Image + '/img/app/failure.png';
};

sdk.getUnderConstructionImage = () => {
  return sdk.host4Image + '/img/app/under-construction.png';
};

sdk.fetchArticle = async (params) => {
  if (!params.articleId) return;
  return xhr.post({
    url: sdk.host4Api + '/api/v3/common/script/stdbiz/cm/article/find',
    params: {
      articleId: params.articleId,
    },
  });
};

module.exports = { sdk };