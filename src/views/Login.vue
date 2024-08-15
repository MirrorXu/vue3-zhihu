<template>
  <div class="container">
    <h1>登录/注册</h1>
    <div class="form">
      <MyForm ref="refForm">
        <template v-for="(field , fieldName) in form" :key="fieldName">
          <MyInput
              :type="field.type"
              :label="field.label"
              :placeholder="field.placeholder"
              :rules="field.rules"
              v-model="field.value"
          ></MyInput>
        </template>
        <template #submit>
          <el-button type="success" @click="doSubmit">提交</el-button>
        </template>
        <template #reset>
          <el-button type="danger" @click="doRest">重置</el-button>
        </template>
      </MyForm>
    </div>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref} from "vue";
import MyInput from "@/components/Form/MyInput.vue";
import MyForm from "@/components/Form/MyForm.vue";
import {useRouter, useRoute} from 'vue-router'

const router = useRouter()
const route = useRoute()

console.log('router:', router)
console.log('route:', route)

const form = reactive({
  email: {
    value: '',
    label: '邮箱',
    placeholder: '请输入邮箱',
    type: 'email',
    rules: [
      {type: 'required', message: '请输入邮箱地址'},
      {type: 'email', message: '邮箱格式不合法'}
    ]
  },
  password: {
    value: '',
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
const refForm = ref<any>()

function handleSubmit(e) {
  console.log(e)
}

function doSubmit() {
  refForm.value.submit().then(res => {
    console.log(res)
    if (res.success) {
      console.log('检验成功')
      const {redirect} = route.query
      localStorage.setItem('isLogin', '1')
      localStorage.setItem('email', form.email.value)
      localStorage.setItem('password', form.password.value)
      if (redirect) {
        router.push({name: redirect})
      } else {
        router.push({name: 'home'})
      }
      console.log()
    } else {
      console.log('检验失败')
    }
  })
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
