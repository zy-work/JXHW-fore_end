// pages/userinfo/userinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    username: "string",
    sex: 1,        // 0代表女性，1代表男性
    birth: "2000-10-01",    //注意月或日只有个位数时如5月要写成05而不是5
    userSign: "哪吒憨憨,天天快乐",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取用户信息
    wx.request({
      url: 'https://www.forestj.top:11451/user/getUserInfo',
      method: 'GET',
      header: {
        Authorization: wx.getStorageSync("token")
      },
      success: function (res) {
        if(res.data.status==200){
          console.log(res.data.msg)
          console.log(res.data.data)
          that.setData({
            info: res.data.data
          })
        }
      },
      fail: function (res) {
        if(res.data.status!=200){
          console.log(res.data.msg)
        }
      }
    })
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