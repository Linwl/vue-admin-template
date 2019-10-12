<template>
  <div class="login-vue" :style="bg">
    <div class="container">
      <p class="title">vue-admin-template</p>
      <div class="input-c">
        <Input
          prefix="ios-contact"
          v-model="account"
          placeholder="员工编号"
          clearable
          @on-blur="verifyAccount"
        />
        <p class="error">{{accountError}}</p>
      </div>
      <div class="input-c">
        <Input
          type="password"
          v-model="pwd"
          prefix="md-lock"
          placeholder="密码"
          clearable
          @on-blur="verifyPwd"
          @keyup.enter.native="submit"
        />
        <p class="error">{{pwdError}}</p>
      </div>
      <Button :loading="isShowLoading" class="submit" type="primary" @click.native="submit">登陆</Button>
      <p class="account">
        <span @click="forgetPwd">忘记密码</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      account: '',
      pwd: '',
      accountError: '',
      pwdError: '',
      isShowLoading: false,
      bg: {}
    }
  },
  created() {
    this.bg.backgroundImage =
      'url(' +
      require('../assets/imgs/bg0' + new Date().getDay() + '.jpg') +
      ')'
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    verifyAccount(e) {
      if (this.account == '') {
        this.accountError = '账号不能空!'
      } else {
        this.accountError = ''
      }
    },
    verifyPwd(e) {
      if (this.pwd === '') {
        this.pwdError = '密码不能为空'
      } else {
        this.pwdError = ''
      }
    },
    forgetPwd() {
      console.log('忘记密码')
    },
    submit() {
      if (this.account != '' && this.pwd != '') {
        this.$store
          .dispatch('user/login', {
            username: this.account,
            password: this.pwd
          })
          .then(res => {
            this.$Message.info('登录成功!')
            this.$router.push({ path: this.redirect || '/' })
          })
      } else {
        this.$Message.error('请输入账号跟密码不能为空!')
      }
    }
  }
}
</script>

<style>
.login-vue {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.login-vue .container {
  background: rgba(255, 255, 255, 0.5);
  width: 300px;
  text-align: center;
  border-radius: 10px;
  padding: 30px;
}
.login-vue .ivu-input {
  background-color: transparent;
  color: #fff;
  outline: #fff;
  border-color: #fff;
}
.login-vue ::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: rgba(255, 255, 255, 0.8);
}
.login-vue :-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgba(255, 255, 255, 0.8);
}
.login-vue ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(255, 255, 255, 0.8);
}
.login-vue :-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgba(255, 255, 255, 0.8);
}
.login-vue .title {
  font-size: 16px;
  margin-bottom: 20px;
}
.login-vue .input-c {
  margin: auto;
  width: 200px;
}
.login-vue .error {
  color: red;
  text-align: left;
  margin: 5px auto;
  font-size: 12px;
  padding-left: 30px;
  height: 20px;
}
.login-vue .submit {
  width: 200px;
}
.login-vue .account {
  margin-top: 30px;
}
.login-vue .account span {
  cursor: pointer;
}
.login-vue .ivu-icon {
  color: #eee;
}
.login-vue .ivu-icon-ios-close-circle {
  color: #777;
}
</style>


