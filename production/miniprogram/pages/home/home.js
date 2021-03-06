const app = getApp();
Page({
  data: {
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    circleLise: [{
      id: '活动圈',
      slogan: '乒乓好手带你提升',
      name: 'activity'
    },
    {
      id: '赛事圈',
      slogan: '以球会友交流互娱',
      name: 'competition'
    },
    {
      id: '同城圈',
      slogan: '我们相遇在一个城市',
      name: 'sameCity'
    },
    {
      id: '达人圈',
      slogan: '乒乓好手带你提升',
      name: 'star'
    },
    ],
    notice: [
      '小提示:段位积分越高，排行榜排名也越高',
      '同城圈具有一键约球功能，快去寻找你的球友吧',
      '欢迎进入乒乓圈，这里有你想要的',
      '小提示:连续多日打卡，可以获得更多积分哦'
    ],
    login: false
  },
  onLoad() {
    this.towerSwiper('circleLise');
    // 初始化towerSwiper 传已有的数组名即可
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.setData({ login: true })
        }
      }
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      circleLise: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.circleLise;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        circleLise: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        circleLise: list
      })
    }
  },
  toRankList() {
    wx.navigateTo({
      url: '../rankList/rankList',
    })
  },
  toSign() {
    wx.navigateTo({
      url: '../sign/sign',
    })
  },
  settingInfo() {
    this.setData({
      login: true
    })
    let the_first = false;
    // 掉用获取用户信息函数，用openId作为唯一标识符
    wx.cloud.callFunction({
      name: "getPersonInfo",
    }).then(res => {
      // 判断是否为空，空则代表第一次进入
      if (res.result.data.length == 0) {
        the_first = true
      } else {
        // 不为空则为注册过了，将数据放入globalDate
        app.globalData.personInfo = res.result.data[0];
        console.log(app.globalData.personInfo);
      }
    }).then(() => {
      // 进入注册流程，
      return new Promise((resolve, reject) => {
        if (the_first) {
          // 获取用户的信息
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo;
              resolve();
            },
          })
        }
      })
    }).then(() => {
      if (the_first) {
        // 用户注册所需昵称和头像
        const data = {
          name: app.globalData.userInfo.nickName,
          avatarUrl: app.globalData.userInfo.avatarUrl,
        };
        // 显示加载
        wx.showLoading({
          title: '注册中',
        })
        // 用户注册函数，除了昵称和头像，全置为最低或空
        wx.cloud.callFunction({
          name: "pingpang_init",
          data: data
        }).then(res => {
          // 数据库已经注册完成
          console.log("注册完成")
        })
          .then(() => {
            // 注册完成后获取一遍用户信息
            wx.cloud.callFunction({
              name: "getPersonInfo"
            }).then(res => {
              app.globalData.personInfo = res.result.data[0];
              console.log(res.result.data[0])
              // 隐藏加载
              wx.hideLoading();
              // 提示注册完成
              wx.showModal({
                title: '注册',
                content: '注册完成',
              })
            })
          })
      }
    })

    app.globalData = {
      personInfo: {
      }
    }
  }
})