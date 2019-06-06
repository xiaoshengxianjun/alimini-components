Component({
  mixins: [],
  intervalTime: "", // 循环轮播定时器
  data: {
    itemWidth: 750, // 单个轮播图容器的宽度，默认屏幕宽度,
    swiperStyle: {
      width: "750rpx", // 轮播图容器宽度
      paddingLeft: "40rpx"
    }, // 控制轮播的样式
    index: 0, // 当前显示的轮播图索引，默认第一张
    touchStart: {}, // 触摸开始点位
    touchEnd: {}, // 触摸结束点位
    intervalTime: "" // 循环轮播定时器
  },
  props: {
    list: [],
    options: {
      showDots: true, // 是否显示分页器
      interval: 3000, // 轮播间隔时间，默认3s
      autoplay: true // 是否自动播放
    },
    effect: "normal", // 轮播图模式 normal正常累心，zoom缩放模式
    height: "300rpx", // 轮播图高度，默认300rpx
  },
  didMount() {
    my.getSystemInfo({
      success: (res) => {
        let tempItemWidth = res.windowWidth; // 获取屏幕的宽度
        let paddingLeft = '40rpx';
        if (this.props.effect === "normal") {
          // 如果是正常模式，一张图的宽度为屏幕宽度
          tempItemWidth = res.windowWidth;
          paddingLeft = '0rpx';
        } else if (this.props.effect === "zoom") {
          // 如果是缩放模式，控制轮播图显示的宽度，两边流出空隙
          tempItemWidth = res.windowWidth - 40; // 获取屏幕的宽度
          paddingLeft = '40rpx';
        }
        this.handleType();
        var length = this.props.list.length; // 获取列表的个数
        let swiperWidth = parseInt((tempItemWidth + 40) * length) + "px"; // 容器总宽度
        this.setData({
          itemWidth: tempItemWidth,
          swiperStyle: {
            width: swiperWidth,
            paddingLeft: paddingLeft
          }
        })

        this.handleLoopMove();
      }
    })
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    /**
     * 轮播图点击事件
     */
    handleClick(e){
      this.props.onClick(e);
    },
    /**
     * 判断轮播类型，根据类型执行对应的操作
     */
    handleType() {
      if (this.props.effect === "normal") {
        // 将起始位置左侧的padding置为0
        this.setData({
          'swiperStyle.paddingLeft': 0
        })
      } else if (this.props.effect === "zoom") {
        // 保证左侧有一定的位移
        this.setData({
          'swiperStyle.paddingLeft': '40rpx'
        })
      }
    },
    /**
     * 移动处理
     */
    handleMove() {
      let moveX = this.data.itemWidth * this.data.index;
      if (this.data.index === 0) {
        moveX = 0;
        this.handleType();
      } else {
        // 将起始位置左侧的padding置为0
        this.setData({
          'swiperStyle.paddingLeft': 0
        })
        if (this.props.effect === "zoom") {
          moveX = moveX - 20;
        }
      }
      this.setData({
        swiperStyle: {
          ...this.data.swiperStyle,
          transform: "translateX(-" + moveX + "px)"
        }
      })
    },
    /**
     * 循环移动处理
     */
    handleLoopMove() {
      // 当设置自动播放时，执行自动循环播放操作，否则，只执行下一次轮播效果
      if (this.props.options.autoplay) {
        let interval = this.props.options.interval ? this.props.options.interval : 3000;
        this.intervalTime = setInterval(() => {
          let index = this.data.index;
          this.setData({
            index: ++index
          })
          if (this.data.index > this.props.list.length - 1) {
            // 置为-1,下次轮播时index就会变成0，图片定位到起始位置
            this.setData({
              index: 0
            })
          }
          this.handleMove();
        }, interval);
      }
    },
    /** 
     * 触摸开始事件，记录触摸开始点
     */
    onTouchStart(e) {
      // 记录开始触摸点
      this.setData({
        touchStart: e.changedTouches[0]
      })
      // 清除定时器
      clearInterval(this.intervalTime);
    },
    /**
     * 触摸结束事件，记录触摸结束点，根据结束点和开始点判断滑动方向 
     */
    onTouchEnd(e) {
      // 记录结束触摸点
      this.setData({
        touchEnd: e.changedTouches[0]
      })
      // 比较移动的点位差，正数就是右滑，负数就是左滑
      let index = this.data.index;
      if (this.data.touchEnd.clientX - this.data.touchStart.clientX > 60) {
        this.setData({
          index: --index
        })
        if (this.data.index <= 0) {
          this.setData({
            index: 0
          })
        }
      } else if (this.data.touchEnd.clientX - this.data.touchStart.clientX < -60) {
        this.setData({
          index: ++index
        })
        if (this.data.index >= this.props.list.length - 1) {
          this.data.index = this.props.list.length - 1;
        }
      }
      // 处理当前的滑动
      this.handleMove();
      // 同时开启自动轮播
      this.handleLoopMove();
    },
  },
});
