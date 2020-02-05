<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">传感器信息平台</div>
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-s-custom"/>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="loginForm.password"
            @keyup.enter.native="login"
          >
            <el-button slot="prepend" icon="el-icon-lock"/>
          </el-input>
        </el-form-item>
        <el-form-item class="buttons">
          <el-button type="primary" round @click="login" :loading="loading">登 录</el-button>
          <el-button type="info" round @click="resetLoginForm">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      loading: false,
      loginForm: {
        username: 'kangyuxin',
        password: 'admin'
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 重置按钮
    resetLoginForm () {
      // eslint-disable-next-line no-unused-expressions
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          this.loading = true
          let loginParam = {
            username: this.loginForm.username,
            password: this.loginForm.password
          }
          const { data: res } = await this.$http.post('/user/login', loginParam)
          console.log(res)
          if (res.code !== 200) this.$message.error('账号或密码有误')
          this.$message.success('登录成功')
          window.sessionStorage.setItem('token', res.token)
          window.sessionStorage.setItem('user', this.loginForm.username)
          localStorage.setItem('ms_username', this.loginForm.username)
          this.$router.push('/')
        } else {
          this.$message.error('请输入账号和密码')
          console.log('error submit!!')
          return false
        }
      })
      // this.$refs.loginFormRef.validate(valid => {
      //   if (valid) {
      //     this.$message.success('登录成功')
      //     localStorage.setItem('ms_username', this.loginForm.username)
      //     this.$router.push('/')
      //   } else {
      //     this.$message.error('请输入账号和密码')
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    }
  }
}
</script>

<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/login_bg.jpg);
    background-size: 100%;
  }
  .ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
  }
  .ms-content {
    padding: 30px 30px;
  }
  .buttons {
    text-align: center;
  }
  .login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
  }
  .login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
  }
</style>
