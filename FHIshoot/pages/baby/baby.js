import api from '../../js/api.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  formSubmit: function (e) {
    var msg = /^1(3|4|5|6|7|8|9)\d{9}$/
    console.log(e.detail.value);
    if (e.detail.value.name == '') {
      wx.showToast({
        title: '姓名为必填项！',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(e.detail.value.phonenum))) {
      wx.showToast({
        title: '请填写正确的电话号码！',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    var that = this
    app.netRequest({
      url: api.SaveAppointment,
      method: "POST",
      data: {
        linkman: e.detail.value.name,
        phone: e.detail.value.phonenum,
        source:"shoot",
        position:"baby"
      },
      success: function (res) {
        that.setData({
          show: true
        })
      }
    })
  },
  ok: function () {
    this.setData({
      show: false
    });
  },
  callme: function () {
    wx.makePhoneCall({
      phoneNumber: '400-100-6053'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})