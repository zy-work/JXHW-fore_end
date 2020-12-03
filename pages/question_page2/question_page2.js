// pages/question_page1/question_page1.js
Page({
  data: {

  },
  onLoad: function (options) {

  },

  handleTap:function(event){
    var criterion2 = event.currentTarget.id
    console.log(criterion2)
    wx.navigateTo({
      url: '../question_page3/question_page3',
    });
    wx.setStorageSync('criterion2', parseInt(criterion2))
    console.log(wx.getStorageSync('criterion2'))
  }
})