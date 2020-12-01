//Page Object
Page({
  data: {
    // 轮播图数据
    swipper_list: [],
    // 楼层数据——推荐
    floor_list: [
      {
        id: 0,
        src: "https://pic4.zhimg.com/80/v2-467c992d6a2dd5739f1bd1b381b03b57_1440w.jpg",
        recommend:"⌚超好用的计时器"
      },
      {
        id: 1,
        src: "https://ci.xiaohongshu.com/60ee5f2f-9e02-81b7-1ef8-53145544cf7d?imageView2/2/w/540/format.jpg",
        recommend:"💄各色口红"
      },
      {
        id: 2,
        src: "//img.alicdn.com/imgextra/i4/1980545515/TB2r2RUo3ZC2uNjSZFnXXaxZpXa_!!1980545515-0-beehive-scenes.jpg_360x360xzq90.jpg_.webp",
        recommend:"💄一眼就爱上的口红"
      },
      {
        id: 3,
        src: "https://ci.xiaohongshu.com/96f4bbb6-b927-a734-11f4-98894a8bfc4e?imageView2/2/w/540/format.jpg",
        recommend:"🍼男士防坑洗面奶"
      },
      {
        id: 4,
        src: "https://pic2.zhimg.com/80/v2-9aa5c0ca5c5709824e54e14d0bfc0c5d_1440w.jpg",
        recommend:"超好用的书支架"
      }
    ]
    // floor_list: []
  },
  //options(Object)
  onLoad: function(options){
    wx.request({
      // url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      url: 'http://106.14.209.11:11451/post/search',
      method: 'GET',
      header: {
        Authorization: wx.getStorageSync("token")
      },
      // dataType: 'json',
      // responseType: 'text',
      success: (result)=>{
        console.log(result)
        var list = result.data.data.records
        var url_pre = 'http://forestj.oss-cn-beijing.aliyuncs.com/'
        for(var i=0; i < list.length; i++){
          list[i].coverLink = url_pre + list[i].coverLink;
        }
        this.setData({
          swipper_list: list
        })
      }
    });
  }
});