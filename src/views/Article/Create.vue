<template>
  <layout>
    <template #site-title>
      <SiteTitle>
        <template #title>
          <h1> 知乎 - 创建文章</h1>
        </template>
      </SiteTitle>
    </template>

    <MyForm ref="formRef">
      <div class="uploader" @click="handleUpload" :style="{backgroundImage:`url(${headerImage.url})`}">
        <p>点击上传文章头图</p>
      </div>
      <my-input
          label="标题"
          v-model="form.title.value"
          :rules="form.title.rules"
          :placeholder="form.title.placeholder"
      />
      <!--      <my-input-->
      <!--          label="摘要"-->
      <!--          v-model="form.description.value"-->
      <!--          :rules="form.description.rules"-->
      <!--          placeholder="请输入摘要"-->
      <!--      />-->
      <my-input
          tag="textarea"
          label="内容"
          v-model="form.content.value"
          type="text"
          rows="10"
          placeholder="请输入文章内容"
          :rules="form.content.rules"
      />
      <template #reset>
        <span style="display: none"></span>
      </template>
    </MyForm>
    <div>
      <el-button type="primary" @click="doSubmit">提交</el-button>
    </div>
  </layout>
</template>
<script setup lang="ts">
import Layout from "@/components/Layout/Layout.vue";
import SiteTitle from "@/components/Layout/SiteTitle.vue";
import MyForm from "@/components/Form/MyForm.vue";
import MyInput, {RuleItem} from "@/components/Form/MyInput.vue";
import {reactive, ref} from "vue";
import store from "@/store";
import {selectFiles} from '@/helper/file'
import {upload, creatArticle, CreateArticleForm} from '@/api/api'
import {Image} from "@/api/responseType";
import router from "@/router";

const commonRules: Array<RuleItem> = [
  {type: 'required', message: '不能为空'}
]
const form = reactive({
  title: {
    value: '',
    rules: commonRules,
    placeholder: '请输入标题'
  },
  // description: {
  //   value: '',
  //   placeholder: '请输入摘要',
  //   rules: commonRules,
  // },
  content: {
    value: '',
    rules: commonRules,
    placeholder: '请输入内容'
  },
})
const headerImage = reactive<Image>({url: '', _id: ""})
const handleUpload = () => {
  selectFiles({accept: 'image/*', multiple: false}).then((files) => {
    console.log(files)
    if (files.length === 0) {
      alert('未选择任何文件')
    }
    const file: File = files[0]
    const limitSize = 2

    console.log('当前文件体积（MB）', file.size / (1024 * 1024))
    if (file.size > limitSize * 1024 * 1024) {
      throw new Error(`文件体积不能大于${limitSize}M`)
    }
    return file
  }).then((file) => {
    const formData = new FormData()
    formData.append(file.name || 'file', file);
    return upload(formData)
  }).then(res => {
    console.log(res)
    const {_id, url} = res.data
    Object.assign(headerImage, {_id, url})
  }).catch(err => {
    console.log(err)
    const message = err.message || '上传失败'
    alert(message)
  })
}
const getFormData = () => {
  const data: CreateArticleForm = {
    title: form.title.value,
    content: form.content.value,
    author: store.state.user._id,
    column: store.state.user.column
  }
  if (headerImage._id) {
    data.image = headerImage._id || ''
  }
  return data
}
const formRef = ref('')
const doSubmit = () => {
  const formCom = formRef.value
  formCom.validate().then(() => {
    const articleData = getFormData()
    return creatArticle(articleData).then(res => {
      console.log('文章创建成功',res)

      const {column} = res.data
      const timer= setTimeout(()=>{
        clearTimeout(timer)
        router.push({name: 'column', params: {id:column}})
      },200)

    })
  }).catch(() => {
    console.log('检验失败')
  })
}

</script>

<style scoped lang="scss">
.uploader {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  border: 1px dotted #999;
  color: #888;
  user-select: none;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
