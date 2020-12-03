// pages/question_page1/question_page1.js
Page({
  data: {

  },
  onLoad: function (options) {

  },

  handleTap:function(event){
    var criterion1 = event.currentTarget.id
    console.log(criterion1)
    wx.navigateTo({
      url: '../question_page2/question_page2',
    });
    wx.setStorageSync('criterion1', parseInt(criterion1))
    console.log(wx.getStorageSync('criterion1'))
  }
})