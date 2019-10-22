//index.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {

  },

  onLoad: function() {
    this.getPotato()
    this.getFont()

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  go(e) {
    let location = e.currentTarget.dataset.geo
    let name = e.currentTarget.dataset.name
    let address = e.currentTarget.dataset.address
    let latitude = location.latitude
    let longitude = location.longitude
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      name: name,
      address: address
    })
  },

  tel(e) {
    let phone = e.currentTarget.dataset.tel
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },

  

  order() {
    wx.showToast({
      title: '直接扫码就行哦',
      image: '/images/potato.png',
      duration: 2000
    })
  },

  delivery() {
    let wechat = this.data.potato.wechat
    wx.showToast({
      title: wechat,
      icon:'none',
      duration: 3000
    })
  },


  async getFont() {
    wx.loadFontFace({
      family: 'SourceHanSansCN',
      source: 'url("https://cdn.ikeeplearn.cn/SourceHanSansCN-Normal.ttf")',
      success: console.log
    })
  },
  getPotato() {
    db.collection('potato')
      .field({
        _id: false
      })
      .get()
      .then(res => {
        this.setData({
          potato: res.data[0]
        })
      })
  },

  onShareAppMessage: function () {
    let {shareMessage, shareImage}  = this.data.potato.share
    return {
      title: shareMessage,
      path: '/pages/index/index',
      imageUrl: shareImage
    }
  },

  onPullDownRefresh(){
    this.onLoad()
    wx.stopPullDownRefresh()
  }
})