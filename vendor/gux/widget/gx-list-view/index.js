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
const { xhr } = require('../../common/xhr');
const { util } = require('../../common/util');

Component({

  properties: {
    
    /*!
    ** 每次从服务器端获取的最大数目。 
    */
    limit: {
      type: Number,
      value: -1,
    },
    
    /*!
    ** 列表的自定义高度，如果不设置，则是从起始位置到屏幕底端。
    */
    height: {
      type: String,
      value: '100%',
    },

    url: {
      type: String,
    },

    getParameters: {
      type: Function,
    },

    local: {
      type: Array,
      value: [],
    },

    enablePullToRefresh: {
      type: Boolean,
      value: false,
    },

    enableLoadMore: {
      type: Boolean,
      value: false,
    },

  },

  data: {

    items: [],

    isLoading: false,

    isRefreshing: false,

    noMoreData: false,

    top: 0,

    // 起始加载序号
    start: 0,

    touchedStartY: -1,

    touchedEndY: -1,

    onDataLoaded: null,

  },

  pageLifetimes: {

  },

  /**
   * Component methods
   */
  methods: {

    async doFetch(start, limit) {
      let params = util.getParamsFromUrl(this.data.url);
      params.start = start;
      params.limit = limit;
      if (this.data.getParameters) {
        params = {
          ...params,
          ...this.data.getParameters(),
        }
      }
      this.setData({
        isLoading: true,
      })
      let ret = [];
      if (this.data.url) {
        ret = await xhr.promise2({
          url: util.getUriFromUrl(this.data.url),
          params: params,
        });
      } else {
        ret = this.data.local;
      }
      this.setData({
        isLoading: false,
      });
      return ret;
    },

    async doRefresh() {
      this.data.start = 0;
      this.setData({
        noMoreData: false,
      });
      let ret = await this.doFetch(this.data.start, this.data.limit);
      this.setData({
        items: ret,
      });
      if (this.data.onDataLoaded) {
        this.data.onDataLoaded(this.data.items);
      }
      
      return ret;
    },
    
    /*!
    ** @spec 加载更多，load-more
    */
    async doLoadMore() {
      // 没有更多数据则不需要再发起请求。
      if (this.data.noMoreData) return;

      if (this.data.limit != -1) {
        this.data.start += this.data.limit;
      }
      let ret = await this.doFetch(this.data.start, this.data.limit);
      ret.forEach((val, idx) => {
        this.data.items.push(val);
      });
      if (this.data.limit != -1 && ret.length < this.data.limit) {
        this.setData({
          noMoreData: true,
        });
      }
      if (this.data.onDataLoaded) {
        this.data.onDataLoaded(this.data.items);
      }
      return this.data.items;
    },

    setOnDataLoaded(cb) {
      this.data.onDataLoaded = cb;
    },

    async onTouchStart(ev) {
      if (this.data.isRefreshing || this.data.isLoading) 
        return;
      
      this.data.touchedStartY = ev.touches[0].clientY;
    },

    async onTouchEnd(ev) {
      if (this.data.isRefreshing === true || this.data.isLoading === true || this.data.touchedEndY === -1) {
        return;
      }
    
      let offset = this.data.touchedEndY - this.data.touchedStartY;
      if (offset > 100) {
        if (this.data.enablePullToRefresh === true) {
          this.setData({
            isRefreshing: true, 
          });
        }
      } else if (offset < 0 && offset < -100) {
        if (this.data.enableLoadMore === true) {
          this.setData({
            isLoading: true, 
          });
          setTimeout(() => {
            this.doLoadMore();
          }, 600);
        }
      }
      // 恢复初始值
      this.data.touchedStartY = -1;
      this.data.touchedEndY = -1;
    },

    async onTouchMove(ev) {
      this.data.touchedEndY = ev.touches[0].clientY;

      let top = this.data.touchedEndY - this.data.touchedStartY;
      if (this.data.enablePullToRefresh === true) {
        if (top >= 50) {
          this.setData({
            top: 0,
            isRefreshing: true,
          });
          setTimeout(() => {
            this.setData({
              top: 0,
              isRefreshing: false,
            });
          }, 1000);
        } else {
          this.setData({
            top: top,
          });
        }
      }
    },

    onScroll(ev) {
      
    },

    onScrollToUpper(ev) {
      
    },

    /*!
    ** 滚动条滑动到底部触发的事件。
    */
    onScrollToLower(ev) {
      if (this.data.enableLoadMore !== true) {
        return;
      }
      this.triggerEvent('doLoad', {});
    },

    /*!
    ** 显示加载数据的进度栏。
    **
    ** @public
    */
    showLoading(items) {
      this.setData({isLoading: true});
    },

    /*!
    ** 隐藏加载数据的进度栏。
    **
    ** @public
    */
    hideLoading(items) {
      this.setData({isLoading: false});
    },

    /*!
    ** 显示刷新数据的进度栏。
    **
    ** @public
    */
    showRefreshing(items) {
      this.setData({isRefreshing: true});
    },

    /*!
    ** 隐藏刷新数据的进度栏。
    **
    ** @public
    */
    hideRefreshing(items) {
      this.setData({isRefreshing: false});
    },

  },
})


