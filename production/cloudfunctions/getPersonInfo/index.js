// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const personinfo = db.collection("pingpang_personinfo")
const _=db.command;
// 云函数入口函数
exports.main = async(event, context) => {
  let {openIdarr,openId}=event;
  if(openIdarr){
    return await personinfo.where({
      openId:_.in(openIdarr)
    })
  }else{
    return await personinfo.where({
      openId: openId || event.userInfo.openId
    }).get()
  }
}