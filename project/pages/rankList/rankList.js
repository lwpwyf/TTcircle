// pages/rankList/rankList.js
Page({
  data:{
    active: false,
    rankList:[
      {
        number:1,
        img:'',
        nickName:'我',
        rank:'第1名',
        level:'达人3段',
        score:'3126分'
      },
      {
        number: 2,
        img: '',
        nickName: 'aliesda',
        rank: '第2名',
        level: '新晋达人',
        score: '2500分'
      },
      {
        number: 3,
        img: '',
        nickName: 'crown',
        rank: '第3名',
        level: '业余10段',
        score: '2281分'
      },
      {
        number: 4,
        img: '',
        nickName: '40\'',
        rank: '第4名',
        level: '业余8段',
        score: '1800分'
      },
      {
        number: 5,
        img: '',
        nickName: '北京吴彦祖',
        rank: '第5名',
        level: '业余5段',
        score: '1266分'
      },
      {
        number: 6,
        img: '',
        nickName: '留一手',
        rank: '第6名',
        level: '业余4段',
        score: '1050分'
      }
    ]
  },
  tapDown(evt){
    this.setData({active:evt.currentTarget.id})
  },
  tapEnd(){
    setTimeout(()=>{
      this.setData({ active: false })
    },100)
  }
})