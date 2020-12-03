Page({
  data: {
    info: {},
    // username: abc
    // sex: 1
    // birth: 2000-01-01
    // userSign: hello
    // headLink: www.baidu.com
    // shareNum: 111
    // fanNum: 111
    record: [],
    id: '1',
  },
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
    wx.request({
      url: 'https://www.forestj.top:11451/user/authInfo',
      method: 'GET',
      header: {
        Authorization: wx.getStorageSync("token")
      },
      success: function (res) {
        console.log(res.data)
        var id1 = res.data.data.userId;
        wx.setStorage({
          data: id1,
          key: 'userId',
        })
      },
      fail: function (res) {
        console.log(res.data)
      }
    })
    var id = wx.getStorageSync('userId');
    console.log(id)
    //获取发帖历史
    wx.request({
      url: 'https://www.forestj.top:11451/post/self',
      method: 'GET',
      data:{
        userId: id,
        pageNum: 2,
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
  }
})