const app = getApp();

Page({

  data: {
    questionnaireQuestions: [{
      questionnaireQuestionName: '解决第一个问题的关键就是要找到关键的问题？',
      questionnaireQuestionType: 'single',
      options: [{
        questionnaireQuestionOptionId: '1',
        questionnaireQuestionOptionName: '第一个选项',
      },{
        questionnaireQuestionOptionId: '2',
        questionnaireQuestionOptionName: '第二个选项',
      },{
        questionnaireQuestionOptionId: '3',
        questionnaireQuestionOptionName: '第三个选项',
      },{
        questionnaireQuestionOptionId: '4',
        questionnaireQuestionOptionName: '第四个选项',
      }],
    },{
      questionnaireQuestionName: '解决第二个问题的关键就是要找到关键的问题？',
      questionnaireQuestionType: 'single',
      options: [{
        questionnaireQuestionOptionId: '1',
        questionnaireQuestionOptionName: '第一个选项',
      },{
        questionnaireQuestionOptionId: '2',
        questionnaireQuestionOptionName: '第二个选项',
      },{
        questionnaireQuestionOptionId: '3',
        questionnaireQuestionOptionName: '第三个选项',
      },{
        questionnaireQuestionOptionId: '4',
        questionnaireQuestionOptionName: '第四个选项',
      }],
    },{
      questionnaireQuestionName: '解决第三个问题的关键就是要找到关键的问题？',
      questionnaireQuestionType: 'single',
      options: [{
        questionnaireQuestionOptionId: '1',
        questionnaireQuestionOptionName: '第一个选项',
      },{
        questionnaireQuestionOptionId: '2',
        questionnaireQuestionOptionName: '第二个选项',
      },{
        questionnaireQuestionOptionId: '3',
        questionnaireQuestionOptionName: '第三个选项',
      },{
        questionnaireQuestionOptionId: '4',
        questionnaireQuestionOptionName: '第四个选项',
      }],
    },{
      questionnaireQuestionName: '解决第四个问题的关键就是要找到关键的问题？',
      questionnaireQuestionType: 'single',
      options: [{
        questionnaireQuestionOptionId: '1',
        questionnaireQuestionOptionName: '第一个选项',
      },{
        questionnaireQuestionOptionId: '2',
        questionnaireQuestionOptionName: '第二个选项',
      },{
        questionnaireQuestionOptionId: '3',
        questionnaireQuestionOptionName: '第三个选项',
      },{
        questionnaireQuestionOptionId: '4',
        questionnaireQuestionOptionName: '第四个选项',
      }],
    },{
      questionnaireQuestionName: '解决第五个问题的关键就是要找到关键的问题？',
      questionnaireQuestionType: 'single',
      options: [{
        questionnaireQuestionOptionId: '1',
        questionnaireQuestionOptionName: '第一个选项',
      },{
        questionnaireQuestionOptionId: '2',
        questionnaireQuestionOptionName: '第二个选项',
      },{
        questionnaireQuestionOptionId: '3',
        questionnaireQuestionOptionName: '第三个选项',
      },{
        questionnaireQuestionOptionId: '4',
        questionnaireQuestionOptionName: '第四个选项',
      }],
    }]
  },

  onShow() {
    app.onShowPage(this);
  },

  doContinue(ev) {
    if (this.data.optionTapped !== true) {
      return;
    }
    let quiz = this.selectComponent('#quiz');
    quiz.next();
    this.setData({
      optionTapped: false,
    })
  },

  didTapOption(ev) {
    this.setData({
      optionTapped: true,
    });
  }

})