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
Component({

  properties: {

  },

  data: {
    content: [], 

    shown: false,
    
    input: 'number',

    headless: false,
    
    /*!
    ** 关闭时的回调函数。
    */
    onClosed: null,

    cursorIndex: '', // 插入光标位置

    contentLengthMax: 18, // 最大长度6(不包含.)

    keyWidth: 0,
  },
  
  methods: {

    /*!
    ** 隐藏键盘。
    */
    hide() {
      if (this.data.shown === false) {
        return;
      }
      this.setData({
        shown: false,
        height: 0,
        content: [],
      });
    },

    /*!
    ** 显示键盘。
    */
    show(opt) {
      let info = wx.getSystemInfoSync();
      this.setData({
        input: opt.input,
        headless: opt.headless || false,
        shown: true,
        height: 261 + (info.screenHeight - info.safeArea.bottom) - (opt.headless === true ? 45 : 0) + 8,
        content: [],
        keyWidth: ((info.screenWidth - 32) / 3),
      });
    },

    /*!
    ** 关闭窗口的回调函数。
    */
    setOnClosed(callback) {
      this.onClosed = callback;
    },

    /*!
    ** 点击确认后，回调onClosed
    */
    doConfirm() {
      if (this.onClosed) {
        this.onClosed(this.data.content.join(''));
      }
      this.setData({
        shown: false,
        height: 0,
      });
      this.onClosed = null;
    },

    /*!
    ** 点击确认后，回调onClosed
    */
    doClear() {
      if (this.onClosed) {
        this.onClosed('');
      }
      this.setData({
        shown: false,
        height: 0,
      });
      this.onClosed = null;
    },

    // 获取插入光标位置
    getStrPosition(e) {
      let {
        strIndex
      } = e.currentTarget.dataset
      this.setData({
        cursorIndex: strIndex
      })
    },

    doTapKey(e) {
      let { key } = e.currentTarget.dataset,
      content = this.data.content.join(''), // 转为字符串
      strLen = content.length, {
        cursorIndex,
        contentLengthMax
      } = this.data
      switch (key) {
        case '.':
          if (strLen < contentLengthMax && content.indexOf('.') === -1) { 
            content.length < 1 ? content = '0.' : content += '.'
          }
          break
        case 'backspace':
          if (cursorIndex > 0 && cursorIndex !== strLen) {
            // 从插入光标开始删除元素
            this.data.content.splice(cursorIndex - 1, 1)
            content = this.data.content.join('')
          } else {
            content = content.substr(0, content.length - 1)
          }
          if (!strLen || cursorIndex === strLen) { // 插入光标位置重置
            this.setData({
              cursorIndex: ''
            })
          }
          // 删除点 组件中可以用Observer监听删除点和删除0的情况
          if (content[0] === '0' && content[1] !== '.') {
            content = content.substr(1, content.length - 1)
          }
          if (content[0] === '.') {
            content = '0' + content
          }
          break
        default:
          let spotIndex = content.indexOf('.') //小数点的位置
          if (content[0] === '0' && content[1] !== '.') {
            content = content.substr(1, content.length - 1)
          }
          if (strLen < contentLengthMax && (spotIndex === -1 || strLen - spotIndex !== 3)) { //小数点后只保留两位
            content += key
          }
          break
      }
      this.setData({
        content: content.split('')
      }) // 转为数组

      this.triggerEvent('didTapKey', {
        key: key,
      })
    },
  },
})