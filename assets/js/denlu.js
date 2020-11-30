$(function () {
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
    var form = layui.form
    var layer = layui.layer
    form.verify({

        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        rpwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '密码不一致'
            }

        }
    })
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }

        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('成功')
                $('#link_login').click()
            }
        })

    })
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('#form_login [name=username]').val(),
            password: $('#form_login [name=password]').val()
        }
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('成功')
                localStorage.setItem('token', res.token)
                location.href = "login.html"
            }
        })
    })

})