# HandwritingBoard
支付宝小程序手写板组件   
此组件主要用于小程序内签字手写功能，可显示缩小版，全屏版两种类型，三种笔画颜色可选择，手写完成可获取手写结果。  
点击“重写”，会清空手写板内容；
点击“完成”，会将手写板内容生成图片，此时，不可以再进行手写操作，点击重写可重新进行手写，可以在此方法中获取生成的图片信息；  
点击“横版/返回”，可以进行手写板缩小版和全屏版模式切换。

### 示例图片
![index](https://github.com/xiaoshengxianjun/alimini-components/blob/master/demo/handwritingBoard.png)
 
### 使用示例
```
<handwriting-board showColor="{{true}}" mode="two" onComplete="onComplete"></handwriting-board>
```

### 参数说明
  参数  |  类型  |  说明  
  ----  |  -----  |  ----  
  showColor  |  Boolean  |  控制笔画颜色模块的显示隐藏，默认显示
  mode  |  String  |  手写板模式，共三种类型，默认显示缩小版：mini（缩小版），full（全屏版），two（两种模式共存）

### 事件说明
  名称 | 说明
  ---- | ----
  onComplete | 点击完成会触发此方法，可以在此方法中拿到生成的图片信息

