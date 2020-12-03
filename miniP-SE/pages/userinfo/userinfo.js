// pages/userinfo/userinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    username: "string",
    sex: [
      {num:"0", name:"女性",checked: false},
      {num:"1", name:"男性",checked: false}
    ],        // 0代表女性，1代表男性4
    userSign: "哪吒憨憨,天天快乐",
    head: '../../icons/avater.jpg',
  },
  //选择图片
  chooseImg:function () {
    var that = this;
    wx.chooseImage({
     count: 1,
     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
     success: function (res) {
      console.log(res.tempFilePaths)
      var tempFilePaths = res.tempFilePaths
      that.setData({
        head: res.tempFilePaths
      })
      console.log(res.tempFilePaths)
      wx.setStorage({ key: "Img", data: tempFilePaths[0] })
     }
    })
  },
  //输入昵称
  inputname: function (e) {
    var name = e.detail.value;
    this.setData({username: e.detail.value})
    wx.setStorage({
      data: name,
      key: 'name',
    })
  },
  //输入个性签名
  inputsign: function (e) {
    var sign = e.detail.value;
    this.setData({ userSign: e.detail.value })
    wx.setStorage({
      data: sign,
      key: 'sign',
    })
  },
  //获得性别
  changeradio: function (e) {
    var gender = e.detail.value;
    wx.setStorage({
      data: gender,
      key: 'gender',
    })
  },
  //提交个人信息
  submit:function () {
    var that = this;
    var name=wx.getStorageSync('name');
    var sex=wx.getStorageSync('gender');
    var sign=wx.getStorageSync('sign');
    sex=parseInt(sex);
    console.log(name+sex+sign)
    var img = wx.getStorageSync('Img');
    wx.uploadFile({
      url: 'https://www.forestj.top:11451/user/uploadHead',
      filePath: img,
      name: 'headImage',
      header: {
       Authorization: wx.getStorageSync("token")
      },
      success: function (res) {
        console.log('头像上传'+res)
      }
    })
    wx.request({
      url: 'https://www.forestj.top:11451/user/updateInfo',
      method: 'POST',
      header: {
        Authorization: wx.getStorageSync("token")
      },
      data:{
        username: name,
        sex: sex,       // 0代表女性，1代表男性
        userSign: sign,
      },
      success(res){
        if(res.data.status==200){
          console.log(res)
          wx.showModal({
            title: '保存成功',
            cancelColor:'#87B5D6',//取消文字的颜色
            confirmColor: '#87B5D6',//确定文字的颜色
            success: function (res) {
               if (res.cancel) {
                  wx.navigateTo({
                    url: '../user/user',
                  })
               } 
               else {
                wx.switchTab({
                  url: '../user/user',
                })
               }
            },
            fail: function (res) { },//接口调用失败的回调函数
            complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
          })
        }
      }
    })

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