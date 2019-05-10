var ctx = "";
Component({
  mixins: [],
  data: {
    direction: "", // 画板方向 vertical horizontal
    colors: [{ color: 'black', active: true }, { color: 'red', active: false }, { color: 'blue', active: false }], // 可选颜色
    ctx: "", // canvas对象
    canvasWidth: "", // canvas宽度
    canvasHeight: "", // canvas高度
    lineColor: "black", // 线条的颜色
    lineWidth: 3, // 线条宽度
    filePath: "", // 生成的图片地址
  },
  props: {
    showColor: true,
    mode: "mini" // 三种模式 缩小版mini,全屏版full,两种模式都有two
  },
  didMount() {
    // 如果mode为全屏模式，设置direction为horizontal
    if (this.props.mode === 'full') {
      this.setData({
        direction: "horizontal"
      })
    }
    this.initCanvas();
  },
  didUpdate() { },
  didUnmount() {
    ctx = ""; // 清空ctx元素
  },
  methods: {
    /**
     * 初始化画板，获取canvas节点对象，设置画板的宽高，线条宽度，样式
     */
    initCanvas() {
      // 获取到当前canvas节点的信息，包含宽，高，top，left等
      my.createSelectorQuery().select("#boardCanvas").boundingClientRect().exec((res) => {
        this.setData({
          canvasWidth: res[0].width,
          canvasHeight: res[0].height
        })
      })
      ctx = my.createCanvasContext("boardCanvas");
      ctx.beginPath();
      ctx.setLineWidth(this.data.lineWidth); // 设置线条的宽度
      ctx.setLineCap('round'); // 设置线条的结束端点样式
      ctx.setLineJoin('round'); // 设置线条的交点样式
    },
    /**
     * 触摸动作开始
     */
    onTouchStart(e) {
      ctx.beginPath();
      ctx.setStrokeStyle(this.data.lineColor); // 设置线条的颜色
      ctx.lineTo(e.touches[0].x, e.touches[0].y);
      ctx.stroke();
      ctx.draw(true);
    },
    /**
     * 触摸后移动
     */
    onTouchMove(e) {
      ctx.lineTo(e.touches[0].x, e.touches[0].y);
      ctx.stroke();
      ctx.draw(true);
    },
    /**
     * 触摸动作结束
     */
    onTouchEnd(e) {

    },
    /**
     * 颜色选项点击事件
     * 将当前点击的颜色选项置为选中状态，其他选项置为未选中状态
     */
    clickColorItem(e) {
      let clickColor = e.currentTarget.dataset.color;
      let colors = this.data.colors;
      colors.forEach(item => {
        if (clickColor === item.color) {
          item.active = true;
        } else {
          item.active = false;
        }
      })
      this.setData({
        colors: colors,
        lineColor: clickColor
      })
    },
    /**
     * 重写按钮点击事件，清空画板内容
     */
    clickReset() {
      // 清空图片
      this.setData({
        filePath: ''
      })
      // 清空画板
      ctx.clearRect(0, 0, this.data.canvasWidth, this.data.canvasHeight);
      ctx.draw();
      // 重新设置canvas画板节点对象，否则绘画会出问题
      setTimeout(() => {
        this.initCanvas();
      }, 100);
    },
    /**
     * 点击“横版”“返回”,如果当前是缩小版，改为横版，否则返回为缩小版
     * 清空画板内容
     */
    clickOrientation() {
      if (this.data.direction === 'horizontal') {
        this.setData({
          direction: ''
        })
      } else {
        this.setData({
          direction: "horizontal"
        })
      }
      // 清空画板内容后后修改样式, 重置canvas
      this.clickReset();

    },
    /**
     * 点击完成，生成画板图片，隐藏canvas画板区域，将生成的图片显示出来
     */
    clickFinish() {
      var that = this;
      ctx.toTempFilePath({
        width: this.data.canvasWidth,
        height: this.data.canvasHeight,
        success(e) {
          that.setData({
            filePath: e.apFilePath
          })
          that.props.onComplete({ filePath: e.apFilePath });
        }
      })
    }
  },
});
