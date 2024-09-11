<template>
  <layout>
    <template #site-title>
      <SiteTitle>
        <template #title>
          <h1> 知乎 - 创建文章</h1>
        </template>
      </SiteTitle>
    </template>
    <div class="">
      <uploader accept="image/jpg" @upload-success="uploadSuccess"></uploader>
      <ul>
        <li v-for="(res , i) in uploaded.resArr" :key="i">
          <img style="width: 80px;height: 80px;" :src="res?.data?.url" alt="">
          {{ res?.data?.url }}
        </li>
      </ul>
    </div>
    <MyForm ref="formRef">
      <my-input
          label="标题"
          v-model="form.title.value"
          :rules="form.title.rules"
          :placeholder="form.title.placeholder"
      />
      <my-input
          label="摘要"
          v-model="form.description.value"
          :rules="form.description.rules"
          placeholder="请输入摘要"
      />
      <my-input
          tag="textarea"
          label="内容"
          v-model="form.description.value"
          type="text"
          rows="10"
          placeholder="请输入文章内容"
          :rules="form.title.rules"
      />
      <template #submit>
        <el-button type="primary" @click="doSubmit">提交</el-button>
      </template>
      <template #reset>
        <span style="display: none"></span>
      </template>
    </MyForm>
  </layout>
</template>
<script setup lang="ts">
import Layout from "@/components/Layout/Layout.vue";
import uploader from "@/components/Upload/Upload.vue";
import SiteTitle from "@/components/Layout/SiteTitle.vue";
import MyForm from "@/components/Form/MyForm.vue";
import MyInput, {RuleItem} from "@/components/Form/MyInput.vue";
import {reactive, ref} from "vue";
import {useStore} from "vuex";
import {download} from "@/helper/file";

const commonRules: Array<RuleItem> = [
  {type: 'required', message: '不能为空'}
]
const form = reactive({
  title: {
    value: '',
    rules: commonRules,
    placeholder: '请输入标题'
  },
  description: {
    value: '',
    placeholder: '请输入摘要',
    rules: commonRules,
  },
  content: {
    value: '',
    rules: commonRules,
    placeholder: '请输入内容'
  }
})
const getFormData = () => {
  return {
    title: form.title.value,
    description: form.description.value,
    content: form.content.value,
    time: Date.now(),
    avatar: '',
  }
}
const submitFormData = () => {
  const store = useStore()
  store.dispatch('createArticle', getFormData())
}
const formRef = ref('')
const doSubmit = () => {
  const formCom = formRef.value
  console.log(formCom)
  formCom.validate().then(() => {
    submitFormData()
  }).catch(() => {
    console.log('检验失败')
  })
}

interface Res {
  data: {
    url: string
  }
}
let uploaded = reactive<{ resArr: Res[] }>({resArr: []})

function uploadSuccess(resArr: Res[]) {
  if (Array.isArray(resArr)) {
    uploaded.resArr = resArr
  }
}

function doDownload() {
  const  url = 'http://typescript-vue.oss-cn-beijing.aliyuncs.com/vue-marker/66dffcf2b558154f03934285.jpg'
  if(url){
    const href  = url as string
    download(href , 'a.jpg')
  }
}
</script>

<style scoped lang="scss">

</style>
