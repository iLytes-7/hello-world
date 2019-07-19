//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  netRequest: function ({ url, data, success, method = "POST" }) {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    let server = 'https://cloud.fhi365.cn/fhi/api';//正式域名
    var header = { 'content-type': 'application/json' };
    wx.request({
      url: server + url,
      method: method,
      data: data,
      header: header,
      success: (res) => {
        let data = res.data;
        res['statusCode'] === 200 ? success(data) : that.fail();
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '请求超时',
          icon: 'loading',
          duration: 3000
        })
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  globalData: {
    userInfo: null
  }
})