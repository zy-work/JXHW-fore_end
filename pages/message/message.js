// pages/message/message.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    information: {},
    status:{},
  },
  //收藏/点赞/踩
  add: function (e){
    var that=this;
    var type= parseInt(e.currentTarget.dataset.num);
    var id = wx.getStorageSync('id');
    wx.request({
      url:'https://www.forestj.top:11451/post/op',
      method:'GET',
      header: {
        Authorization: wx.getStorageSync("token")
      },
      data:{
        postId: id,
        operationType:type
      },
      success (res) {
        console.log(res)
          wx.request({
            url: 'https://www.forestj.top:11451/post/get',
            method: 'GET',
            data: {
              postId: id
            },
            success: function (res) {
              if( res.data.status==200 ){
                console.log(res.data)
                that.setData({
                  information: res.data.data,
                })
              }
            }
          })
          wx.request({
            url:'https://www.forestj.top:11451/post/getStatus',
            method:'GET',
            header: {
              Authorization: wx.getStorageSync("token")
            },
            data:{
              postId: id
            },
            success (res) {
              if(res.data.status==200){
                that.setData({
                  status: res.data.data
                })
              }
            }
          })
      }
    })
  },
  //取消收藏/点赞/踩
  delete:function (e){
    var that=this;
    var type= parseInt(e.currentTarget.dataset.num);
    var id = wx.getStorageSync('id');
    wx.request({
      url:'https://www.forestj.top:11451/post/deop',
      method:'GET',
      header: {
        Authorization: wx.getStorageSync("token")
      },
      data:{
        postId: id,
        operationType: type,
      },
      success (res) {
        if(res.data.status==200){
          console.log(res)
          wx.request({
            url: 'https://www.forestj.top:11451/post/get',
            method: 'GET',
            data: {
              postId: id
            },
            success: function (res) {
              if( res.data.status==200 ){
                console.log(res.data)
                that.setData({
                  information: res.data.data,
                })
              }
            }
          })
          wx.request({
            url:'https://www.forestj.top:11451/post/getStatus',
            method:'GET',
            header: {
              Authorization: wx.getStorageSync("token")
            },
            data:{
              postId: id
            },
            success (res) {
              if(res.data.status==200){
                that.setData({
                  status: res.data.data
                })
              }
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({ pid: options.recommend_id })
    // this.setData({information.headLink: '../../icons/head.jpg'})
    var that = this;
    var id = options.pid;
    wx.setStorage({
      data: id,
      key: 'id',
    })
    wx.request({
      url: 'https://www.forestj.top:11451/post/get',
      method: 'GET',
      header: {
        Authorization: wx.getStorageSync("token")
      },
      data: {
        postId: id
      },
      success: function (res) {
        if( res.data.status==200 ){
          console.log(res.data)
          that.setData({
            information: res.data.data,
          })
        }
      },
      fail: function (res) {
        if(res.data.status!=200){
          console.log('failed')
        }
      }
    })
    wx.request({
      url:'https://www.forestj.top:11451/post/getStatus',
      method:'GET',
      header: {
        Authorization: wx.getStorageSync("token")
      },
      data:{
        postId: id
      },
      success (res) {
        if(res.data.status==200){
          console.log(res)
          that.setData({
            status: res.data.data
          })
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