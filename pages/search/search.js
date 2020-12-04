// pages/search/search.js
var sectionData = [];
var ifLoadMore = null;
var page = 1;//默认第一页

Page({

  data: {
    keyword:"",
    items_list:[],

    sectionData: [],
    ifLoadMore: null,
    page: 1,
    hidden: false,
  },

  onLoad: function (options) {

  },
  input_keyword:function(res){
    var keyword = res.detail.value
    wx.setStorageSync('keyword', keyword);
    console.log(keyword)
  },

  submit:function(){
    this.setData({
      items_list:[]
    })
    var that = this
    that.newGoodsShow()
  },

  newGoodsShow: function (success) {
    var that = this;
    wx.request({
      url: 'https://www.forestj.top:11451/post/search?pageSize=2&pageNum=' + page,
      method: 'GET',
      header: {
        Authorization: wx.getStorageSync("token")
      },
      data:{
        keyword:wx.getStorageSync('keyword')
      },
      success: (result) => {
        console.log(result)
        var list = result.data.data.records
        if (list.length == 0) {
          wx.showToast({
            title: '暂无更多内容！',
            icon: 'loading',
            duration: 1500
          })
          ifLoadMore = false;
          wx.stopPullDownRefresh();
        }
        page += 1;
        if (ifLoadMore == null) ifLoadMore = true;
        var url_pre = 'http://forestj.oss-cn-beijing.aliyuncs.com/'
        for (var i = 0; i < list.length; i++) {
          list[i].coverLink = url_pre + list[i].coverLink;
        }
        var items_list = that.data.items_list
        that.setData({
          items_list: items_list.concat(list)
        })
      }
    });
  },
  onReachBottom: function () {
    console.log("上拉");
    var that = this;
    console.log('加载更多');
    if (ifLoadMore != null) {
      that.newGoodsShow();

    }
  }
})