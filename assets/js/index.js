$(function () {
  // 模拟点击，进入 index.html 主页之后，让左侧菜单的第一项处于默认选中状态，从而防止右侧主体为空的情况
  $('#firstNavItem').click()
  // 调用 getUserInfo 获取用户基本信息
  getUserInfo()
  //退出功能
  $('#btnLogout').on('click', function () {
    // 1. 弹出确认退出询问框
    var layer = layui.layer
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
      //  1. 强制清空 token
      localStorage.removeItem('token')
      //   2. 强制跳转到登录页面
      location.href = '/login.html'
      // 关闭 confirm 询问框
      layer.close(index)
    })
  })
})
// FIXME:   获取用户基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: (res) => {
      if (res.status !== 0) return layui.layer.msg('获取用户信息失败')
      // console.log(res)
      // 调用renderAvatar()渲染用户头像
      renderAvatar(res.data)
      //   loginOut()
    },
    complete: (res) => {
      console.log(res)
      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //  1. 强制清空 token
        localStorage.removeItem('token')
        //   2. 强制跳转到登录页面
        location.href = '/login.html'
      }
    }
  })
}
// FIXME: 渲染用户头像
function renderAvatar(user) {
  // 1. 获取用户的名称
  var name = user.nickname || user.username
  // 2. 设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  // 3. 渲染头像
  if (user.user_pic !== null) {
    // 3.1   用户有头像
    $('.layui-nav-img').show().attr('src', user.user_pic)
    $('.text-avatar').hide()
  } else {
    // 3.2    用户没有头像,username首字母作为头像
    $('.text-avatar').show().html(user.username[0].toUpperCase())
    $('.layui-nav-img').hide()
  }
}
