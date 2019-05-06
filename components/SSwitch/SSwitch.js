Component({
  mixins: [],
  data: {
    bgcolor: '#fff',
    bdcolor: '#ccc'
  },
  props: {
    disabled: false, // 是否禁用
    checked: false, // 是否选中
    color: "#f5686f", // 激活状态颜色
    type: "capsule" // 形状，默认胶囊状，可选：方形 square
  },
  didMount() {
    let checked = false;
    if (this.props.checked) {
      checked = true;
    } else {
      checked = false;
    }
    this.setData({
      checked: checked
    })
    if (this.data.checked) {
      this.setData({
        bgcolor: this.props.color,
        bdcolor: this.props.color
      })
    }
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    handleSwitch(e) {
      if (!this.props.disabled || this.props.disabled === 'false') {
        this.setData({
          checked: !e.currentTarget.dataset.checked
        })
        if (this.data.checked) {
          this.setData({
            bgcolor: this.props.color,
            bdcolor: this.props.color
          })
        } else {
          this.setData({
            bgcolor: "#fff",
            bdcolor: "#ccc"
          })
        }
        if (this.props.onChange) {
          this.props.onChange(this.data.checked);
        }
      }
    }
  },
});
