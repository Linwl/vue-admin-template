<template>
  <div>
    <Row>
      <Form
        ref="baseFrom"
        :model="passwdData"
        label-position="left"
        :label-width="100"
        :rules="fromValidate"
      >
        <FormItem label="旧密码:" prop="oldPassword">
          <Input
            v-model="passwdData.oldPassword"
            placeholder="请输入旧密码!"
            type="password"
            prefix="icon iconfont icon-mima"
            clearable
            style="width: 350px"
          />
        </FormItem>
        <FormItem label="新密码:" prop="newPassword">
          <Input
            v-model="passwdData.newPassword"
            placeholder="请输入新密码!"
            type="password"
            prefix="icon iconfont icon-mima"
            clearable
            style="width: 350px"
          />
        </FormItem>
        <FormItem label="新密码:" prop="repeatPassword">
          <Input
            v-model="passwdData.repeatPassword"
            placeholder="请再一次输入新密码!"
            type="password"
            prefix="icon iconfont icon-mima"
            clearable
            style="width: 350px"
            @keyup.enter.native="ok()"
          />
        </FormItem>
      </Form>
    </Row>

    <Row>
      <Col span="2" offset="2">
        <div>
          <Button type="info" @click="cancel">取消</Button>
        </div>
      </Col>
      <Col span="2" offset="1">
        <div>
          <Button type="success" @click.native="ok()">确定</Button>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import { changePasswd } from '@/api/user.js'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'password',
  data() {
    const validatePasswd = (rule, value, callback) => {
      if (!value) {
        callback('密码不能为空!')
      } else if (value.length < 6) {
        callback('请最少输入6位密码!')
      } else {
        callback()
      }
    }
    const validateNewPasswd = (rule, value, callback) => {
      if (value != this.passwdData.newPassword) {
        callback('输入的两次新密码不一致,请重新输入!')
      } else {
        callback()
      }
    }
    return {
      passwdData: {
        oldPassword: null,
        newPassword: null,
        repeatPassword: null
      },
      fromValidate: {
        oldPassword: [
          {
            required: true,
            validator: validatePasswd,
            trigger: 'blur'
          }
        ],
        newPassword: [
          {
            required: true,
            validator: validatePasswd,
            trigger: 'blur'
          }
        ],
        repeatPassword: [
          {
            required: true,
            validator: validatePasswd,
            trigger: 'blur'
          },
          {
            required: true,
            validator: validateNewPasswd,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    loginUser() {
      return JSON.parse(this.userInfo)
    }
  },
  methods: {
    ...mapActions({ actLogout: 'user/logout' }),
    ok() {
      this.$refs.baseFrom.validate(valid => {
        if (valid) {
          let passwdDto = {
            userNum: this.loginUser.userNum,
            oldPassword: this.passwdData.oldPassword,
            newPassword: this.passwdData.newPassword
          }
          changePasswd(passwdDto).then(res => {
            this.$Message.info('修改密码成功!')
            this.$Spin.show({
              render: h => {
                return h('div', [
                  h('Icon', {
                    class: 'spin-icon-loading',
                    props: {
                      type: 'icon iconfont icon-jiazai',
                      size: 18
                    }
                  }),
                  h('div', '正在跳转到登录页面')
                ])
              }
            })
            setTimeout(() => {
              this.$Spin.hide()
              this.actLogout()
              this.$router.replace('/login')
            }, 3000)
          })
        } else {
          this.$Message.error('请输入必填项!')
        }
      })
    },
    cancel() {
      this.$refs.baseFrom.resetFields()
    }
  }
}
</script>

<style>
.spin-icon-loading {
  animation: rotating 1s linear infinite;
}
@keyframes rotating{
from{transform:rotate(0)}
to{transform:rotate(360deg)}
}
</style>