$(function () {
  // TODO:一、   登录与注册跳转
  // 点击“去注册账号”的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击“去登录”的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  // ------------------------------------
  //TODO:  二 、   自定义检验数据
  // 从layui中获取form对象
  var form = layui.form
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    //校验两次密码是否一致的规则
    repwd: function (pwdval) {
      //通过形参拿到的是确认密码框中的内容,还需要拿到密码框中的内容1然后进行一次等于的判断
      //如果判断失败,则return一个提示消息
      var pwd = $('.reg-box [name = password]').val()
      if (pwd !== pwdval) return '两次密码不一致，重新输入'
    }
  })
  // --------------------

  // TODO:三    注册监听注册的表单的提交事件
  $('#form_reg').on('submit', function (e) {
    //阻止默认事件
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
      },
      success: (res) => {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功，请登录！')
        // 模拟人的点击行为

        $('#link_login').click()
      }
    })
  })
  // TODO: 四   监听登录的表单的提交事件
  $('#form_login').on('submit', function (e) {
    //阻止默认事件
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg('登录成功！')
        console.log(res.token)
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })
})
