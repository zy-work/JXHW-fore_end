// pages/upload/upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImgPath: '../../icons/加号.png',
    type:[ '学习类','食品类','衣物类','宿舍用品','其他' ]
  },
  //选择图片
  choose: function () {
    var that = this;
    wx.chooseImage({
     count: 1,
     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
     success: function (res) {
      console.log(res.tempFilePaths)
      var tempFilePaths = res.tempFilePaths
      that.setData({
        ImgPath: res.tempFilePaths
      })
      console.log(res.tempFilePaths)
      wx.setStorage({ key: "Img", data: tempFilePaths[0] })
     }
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this;
    var img = wx.getStorageSync('Img');
    var title = e.detail.value.title;
    var comment = e.detail.value.comment;
    console.log(title+comment)
    wx.uploadFile({
     url: 'https://www.forestj.top:11451/post/add',
     filePath: img,
     name: 'images',
     header: {
      Authorization: wx.getStorageSync("token")
    },
     formData: {
      title: title,
      content: comment,
      beauty: parseInt(e.detail.value.beauty_score),
      price: parseInt(e.detail.value.price_score),
      quality: parseInt(e.detail.value.quality_score),
      type: parseInt(e.detail.value.type),
     },
     success: function (res) {
      console.log(res)
      wx.switchTab({
        url: '../user/index',
      })
     }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})