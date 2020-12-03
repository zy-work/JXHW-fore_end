// pages/message/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: [],
  },
  timestampToTime: function(timestamp) {
    var date = new Date();//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
    
    var strDate = Y+M+D+h+m+s;
    return strDate; 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    wx.request({
      url: 'https://www.forestj.top:11451/notice/show',
      method: 'GET',
      header: {
        Authorization: wx.getStorageSync("token")
      },
      success: function (res) {
        if(res.data.status==200){
          console.log(res.data.msg)
          console.log(res.data.data)
          for(var i=0;i<res.data.data.length;i++){
            res.data.data[i].release_time=that.timestampToTime(res.data.data[i].release_time);
            console.log(res.data.data[i].release_time)
          }
          that.setData({
            info: res.data.data
          })
        }
      },
      fail: function (res) {
        
          console.log(res)
        
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