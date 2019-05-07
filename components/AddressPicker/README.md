# AddressPicker
支付宝小程序省市区三级联动地址选择器组件    
引用方式：按照正常小程序组件引用方式引用即可

### 示例图片
![index](https://github.com/xiaoshengxianjun/alimini-components/blob/master/demo/addressPicker.png)

### 使用示例
```
<address-picker visible="{{pickerVisible}}" onChange="addressPickerChange"></address-picker>
```

### 参数说明
  参数  |  类型  |  说明  
  ----  |  -----  |  ----  
  visible  |  Boolean  |  显示隐藏控制，需要在引用此组件的父组件中控制此参数的true/false

### 事件说明
  名称 | 说明
  ---- | ----
  onChange | 在这个方法中可以拿到当前省市区选择的结果，点击取消，返回空，点击确定，返回省市区

