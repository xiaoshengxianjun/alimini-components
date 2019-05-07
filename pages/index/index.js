Page({
  data: {
    visible: false
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  switchChange(e){
    console.log(e)
    this.setData({
      visible: e
    })
  },
  addressPickerChange(e){
    console.log(e)
    this.setData({
      visible: false
    })
  }
});
