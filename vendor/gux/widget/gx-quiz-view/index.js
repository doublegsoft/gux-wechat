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

    questionnaireQuestions: {
      type: Array,
      value: [],
    }
  },

  data: {

    currentIndex: 0,
    currentQuestion: {},

    completed: 0,
  },

  pageLifetimes: {

    show() {
      if (this.data.questionnaireQuestions.length > 0) {
        this.setData({
          currentQuestion: this.data.questionnaireQuestions[this.data.currentIndex],
        });
      }
    },

  },

  methods: {

    show() {
      if (this.data.questionnaireQuestions.length > 0) {
        this.setData({
          currentQuestion: this.data.questionnaireQuestions[this.data.currentIndex],
        });
      }
    },

    next(ev) {
      if (this.data.currentIndex >= this.data.questionnaireQuestions.length) {
        return;
      }
      this.data.currentIndex += 1;
      this.setData({
        currentQuestion: this.data.questionnaireQuestions[this.data.currentIndex],
        completed: this.data.completed + 1,
      });
      if (this.data.currentIndex >= this.data.questionnaireQuestions.length) {
        wx.showLoading({
          title: '正在提交数据',
        });
        setTimeout(() => {
          wx.hideLoading();
          wx.navigateBack();
        }, 3000);
      }
    },

    doTapOption(ev) {
      for (let option of this.data.currentQuestion.options) {
        option.checked = false;
        if (option.questionnaireQuestionOptionId === ev.currentTarget.dataset.questionnaireQuestionOptionId) {
          option.checked = true;
          this.triggerEvent('didTapOption', {
            questionnaireQuestionOptionId: ev.currentTarget.dataset.questionnaireQuestionOptionId,
          });
        }
      }
      this.setData({
        currentQuestion: this.data.currentQuestion,
      })
    },

  }
})