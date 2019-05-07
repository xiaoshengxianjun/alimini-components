import chinaAddress from "./china_address";

Component({
  mixins: [],
  data: {
    value: [0, 0, 0], // 当前组件的结果值，记录的各列索引
    addressList: chinaAddress // 所有的地址信息数据
  },
  props: {
    visible: true, // 控制组件显示隐藏
  },
  didMount() {
  },
  didUpdate() {
  },
  didUnmount() { },
  methods: {
    /**
     * 监听选择器内容修改
     * 当省市列修改后，将市区列的索引置为0
     * @param {*} e 返回每列选中项的索引
     */
    onChange(e) {
      let currentValue = e.detail.value;
      let oldValue = this.data.value;
      let resultValue = [];
      if (currentValue[0] != oldValue[0]) {
        resultValue = [currentValue[0], 0, 0];
      } else if (currentValue[1] != oldValue[1]) {
        resultValue = [currentValue[0], currentValue[1], 0];
      } else {
        resultValue = currentValue;
      }
      this.setData({
        value: resultValue
      });
    },
    /**
     * 点击取消操作，返回cancel操作，value为空，不返回任何值
     */
    clickCancel() {
      let obj = {
        type: 'cancel',
        value: ''
      }
      this.props.onChange(obj);
    },
    /**
     * 点击确定操作，根据当前结果值，返回对应的name
     */
    clickConfirm() {
      // 遍历当前结果值，根据当前结果值索引，拿到地址数据
      let addressList = this.data.addressList;
      let value = this.data.value;
      let province = addressList[value[0]].name; // 省
      let city = addressList[value[0]].sublist[value[1]].name; // 市
      let county = addressList[value[0]].sublist[value[1]].sublist[value[2]].name; // 区

      let obj = {
        type: 'confirm',
        value: {
          province: province,
          city: city,
          county: county
        }
      }
      this.props.onChange(obj);
    }
  },
});
