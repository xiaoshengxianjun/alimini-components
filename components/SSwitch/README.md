# SSwitch
支付宝小程序自定义开关组件

### 使用示例
```
<s-switch label="默认地址" checked="{{true}}" onChange="switchChange"></s-switch>
```

### 参数说明
  参数  |  类型  |  说明  
  ----  |  -----  |  ----  
  label  |  String  |  开关名称，显示在开关组件右侧的名称，不填为空
  checked  |  Boolean  |  开关状态，打开或关闭，控制组件显示结果
  color  |  String  |  开状态颜色，控制组件显示颜色
  type  |  String  |  组件类型，默认胶囊状capsule，可选：方形 square

### 事件说明
  名称 | 说明
  ---- | ----
  onChange | 在这个方法中可以拿到当前组件开关的结果状态
