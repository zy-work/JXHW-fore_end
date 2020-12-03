// pages/question_entry/question_entry.js
Page({
  data: {
    question_list: [],
    options:[]
  },

  onLoad: function (options) {
    wx.request({
      url: 'https://www.forestj.top:11451/post/getCollections',
      method: 'GET',
      header: {
        Authorization: wx.getStorageSync("token")
      },
      success: (result) => {
        console.log(result)
        var list = result.data.data
        var url_pre = 'http://forestj.oss-cn-beijing.aliyuncs.com/'
        for (var i = 0; i < list.length; i++) {
          list[i].coverLink = url_pre + list[i].coverLink;
        }
        this.setData({
          question_list: list
        })
      }
    });

  },

  checkboxChange:function(event){
    var option = event.detail.value;
    for(var o=0; o < option.length; o++){
      option[o]=parseInt(option[o]);
    }
    this.setData({
      options:option
    })
    console.log(option)
    wx.setStorageSync('options', option)
    // console.log(wx.getStorageSync('option1'))
  },
  
  choose_submit:function(){
    wx.navigateTo({
      url: '../question_page1/question_page1',
    });
  }
})