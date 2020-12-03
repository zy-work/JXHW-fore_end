// pages/question_page1/question_page1.js
Page({
  data: {

  },
  onLoad: function (options) {

  },

  handleTap:function(event){
    var criterion3 = event.currentTarget.id
    console.log(criterion3)
    wx.navigateTo({
      url: '../recommend_after_chosen/recommend_after_chosen',
    });
    wx.setStorageSync('criterion3', parseInt(criterion3))
    console.log(wx.getStorageSync('criterion3'))
  }
})