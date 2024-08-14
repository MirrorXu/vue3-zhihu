<template>
  <div class="container">
    <h1>登录/注册</h1>
    <div class="form">
      <template v-for="(field , fieldName) in form" :key="fieldName">
        <MyInput
            :type="field.type"
            :label="field.label"
            :placeholder="field.placeholder"
            :rules="field.rules"
            v-model="field.value"
        ></MyInput>
      </template>
      <div class="btns">
        <el-button @click="login" type="primary">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {reactive} from "vue";
import MyInput from "@/components/Form/MyInput.vue";

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
      {type: 'password', message: '密码格式错误，6-8位'}
    ]
  }
})

function login() {
  const {email: {value: emailVal}, password: {value: passwordVal}} = form;

  console.log(emailVal, passwordVal)
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

    .btns {
      display: flex;
      margin-top: 10px;
      justify-content: center;
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
