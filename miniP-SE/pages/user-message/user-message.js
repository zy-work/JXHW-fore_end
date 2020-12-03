// pages/user-message/user-message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    // userId:1234
    // username: abc
    // user_sign: hello
    // head_link: www.baidu.com
    // share_num: 111
    // fan_num: 111
    record: [],
    // postId: 0,
    // title: faefea,
    // content: dsad,
    // coverLink: www.baidu.com
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = 1;   //将1改为option.id
    //加载时获取用户信息
    wx.request({
      url: 'https://www.forestj.top:11451/user/otherInfo',
      method: 'GET',
      data:{
        userId: id
      },
      success: function (res) {
        if(res.data.status==200){
          console.log('success')
          console.log(res.data)
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
    //获取用户发帖历史
    wx.request({
      url: 'https://www.forestj.top:11451/post/self',
      method: 'GET',
      data:{
        userId: id
      },
      success: function (res) {
        if(res.data.status==200){
          console.log('成功')
          console.log(res.data)
          that.setData({
            record: res.data.data.records
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