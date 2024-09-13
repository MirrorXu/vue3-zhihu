<template>
  <div class="container">
    <h1 v-if="formType === 'register'">注册</h1>
    <h1 v-else>登录</h1>
    <div class="form">
      <MyForm ref="refForm">
        <MyInput
            :type="form.email.type"
            :label="form.email.label"
            :placeholder="form.email.placeholder"
            :rules="form.email.rules"
            v-model="form.email.value"
        ></MyInput>
        <MyInput
            v-if="formType === 'register'"
            :type="form.nickName.type"
            :label="form.nickName.label"
            :placeholder="form.nickName.placeholder"
            :rules="form.nickName.rules"
            v-model="form.nickName.value"
        ></MyInput>
        <MyInput
            :type="form.password.type"
            :label="form.password.label"
            :placeholder="form.password.placeholder"
            :rules="form.password.rules"
            v-model="form.password.value"
        ></MyInput>
      </MyForm>
      <div style="display: flex;align-content: center;justify-content: center">
        <el-button type="success" @click="doSubmit">提交</el-button>
        <el-button type="danger" @click="doRest">重置</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref ,watch} from "vue";
import {useStore} from "vuex";
import MyInput from "@/components/Form/MyInput.vue";
import MyForm from "@/components/Form/MyForm.vue";
import {useRouter, useRoute} from 'vue-router'
import {isAxiosError} from "axios";
import {createMessage} from "@/components/Message/createMessage";

const router = useRouter()
const route = useRoute()
console.log('router:', router)
console.log('route:', route)
export type LoginType = 'login' | 'register'

const type = (route.query.type as LoginType) || 'login'
const formType = ref<string>(type)
watch(()=> route.query.type , (newVal)=>{
  formType.value = newVal as string
})

const form = reactive({
  email: {
    value: 'mirror@test.com',
    label: '邮箱',
    placeholder: '请输入邮箱',
    type: 'email',
    rules: [
      {type: 'required', message: '请输入邮箱地址'},
      {type: 'email', message: '邮箱格式不合法'}
    ]
  },
  nickName: {
    value: 'Mirror',
    label: '昵称',
    type: 'text',
    placeholder: '请输入昵称',
    rules: [
      {type: 'required', message: "昵称不能为空"},
      {type: 'range', message: '密码长度2-12位', min: {length: 2, message: '密码长度不能小于2位'}, max: {length: 12},}
    ]
  },
  password: {
    value: '111111',
    label: "密码",
    type: 'password',
    placeholder: '请输入密码',
    rules: [
      {
        type: 'required', message: "请输入密码"
      },
      {type: 'range', message: '密码长度6-8位', min: {length: 6, message: '密码长度不能小于6位'}, max: {length: 8},}
    ]
  }
})


// eslint-disable
const refForm = ref()

// function handleSubmit(e) {
//   console.log(e)
// }

const store = useStore()

function doSubmit() {
  refForm.value.validate().then(
      () => {
        const user = {
          email: form.email.value,
          password: form.password.value,
        }
        if (formType.value === 'register') {
          Object.assign(user, {nickName: form.nickName.value})
          return store.dispatch('register', user).then(
              () => {
                console.log('注册成功，请登录')
                let url = '/login?type=login'
                createMessage('注册成功,请登录' ,'success')
                setTimeout(()=>{
                  router.replace(url)
                },1000)
              },
              function (err){
                const {data} = err.response
                const {error: message} = data
                createMessage(message || '注册失败' , 'error' )
              }
          )
        } else if (formType.value=== 'login') {
          store.dispatch('loginAndFetchUerData', user).then(
              () => {
                console.log('登录成功')
                const redirect = localStorage.getItem('login_redirect') || '/'
                router.replace(redirect)
              },
              err => {
                console.log('loginAndFetchUerData error', err)
                if (isAxiosError(err)) {
                  const errorData = err?.response?.data
                  if (errorData) {
                    console.log(errorData.error)
                    createMessage(errorData.error, 'warning', 2000)
                  }
                }
              }
          )
        }
      },
      (err: unknown) => {
        console.log()
        console.log(err)
      }
  )
}

function doRest() {
  refForm.value.reset()
}


</script>


<style scoped lang="scss">
.container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //border: 10px solid red;
  height: 100vh;

  .form {
    max-width: 400px;
    box-shadow: 0 2px 2px 4px var(--el-border-color);
    padding: 10px;
    border-radius: 2px;
    width: 300px;

    ::v-deep(.btns) {
      display: flex;
      margin-top: 10px;
      justify-content: center;
      //background-color: darkcyan;
    }
  }

  h1 {
    padding: 0;
    margin: 0;
  }


  .err-message {
    font-size: 12px;
    font-weight: 200;
    color: red;
  }
}
</style>
