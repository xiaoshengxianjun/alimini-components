# SSwiper
支付宝小程序自定义轮播图组件，暂时共两种模式：normal(普通模式)，zoom(缩放模式),普通模式为宽度占满全屏的常见轮播图形式，缩放模式为轮播图之间有间隔，且当前显示轮播图偏大的形式。

### 示例图片
![index](https://github.com/xiaoshengxianjun/alimini-components/blob/master/demo/s_swiper.png)  
![index](https://github.com/xiaoshengxianjun/alimini-components/blob/master/demo/s_swiper.gif)  

### 使用示例
```
<s-swiper list="{{banners}}" options="{{swiperOptions}}" height="300rpx" effect="zoom"></s-swiper>
```

### 参数说明
  参数  |  类型  |  说明  
  ----  |  -----  |  ----  
  list  |  Array  |  轮播图数据列表
  options  |  Object  |  轮播图配置项
  height  |  String  |  控制显示轮播图的高度，默认300rpx
  effect  |  String  |  轮播图显示效果，两种类型：normal，zoom

### options参数说明  
  参数  |  类型  |  说明  
  ----  |  ----  |  ----  
  showDots  |  Boolean  |  控制是否显示分页器  
  autopaly  |  Boolean  |  控制是否自动播放
  interval  |  Number  |  轮播间隔时间，默认3000

### 事件说明
  名称 | 说明
  ---- | ----
  onClick | 在这个方法中可以拿到当前点击的轮播图的数据

