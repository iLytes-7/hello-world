import api from '../../js/api.js';
const app = getApp();
Page({
  data: {
    show: false,
  },
  onLoad: function () {
  },
  callme: function () {
    wx.makePhoneCall({
      phoneNumber: '400-100-6053'
    })
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
        source: "shoot",
        position: "index"
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
  gohunsha:function(){
    wx.navigateTo({
      url: '../hunsha/hunsha',
    })
  },
  goperson: function () {
    wx.navigateTo({
      url: '../person/person',
    })
  },
  goyunfu: function () {
    wx.navigateTo({
      url: '../yunfu/yunfu',
    })
  },
  gobaby: function () {
    wx.navigateTo({
      url: '../baby/baby',
    })
  },

})
