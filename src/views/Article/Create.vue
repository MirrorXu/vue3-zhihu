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
          label="文章标题"
          v-model="form.title.value"
          :rules="form.title.rules"
          :placeholder="form.title.placeholder"
      />
      <!--      {{ 'form.content.value:' + form.content.value }}-->
      <my-input
          tag="editor"
          :editor-options="editorOptions"
          label="文章内容"
          v-model="form.content.value"
          placeholder="请输入文章内容"
          :rules="form.content.rules"
      />
    </MyForm>
    <!--    <EasyEditor ref="easyEditorRef" v-model="form.content.value" :options="editorOptions"></EasyEditor>-->
    <div>
    </div>
    <div style="height: 100px ; display: flex; align-items: center;justify-content: center;">
      <el-button-group>
        <el-button type="primary" @click="doSubmit">提交文章</el-button>
      </el-button-group>
    </div>
  </layout>
</template>
<script setup lang="ts">
import Layout from "@/components/Layout/Layout.vue";
import {Options} from "easymde";
import SiteTitle from "@/components/Layout/SiteTitle.vue";
import MyForm from "@/components/Form/MyForm.vue";
import MyInput, {RuleItem} from "@/components/Form/MyInput.vue";
import {reactive, ref} from "vue";
import store from "@/store";
import {selectFiles} from '@/helper/file'
import {upload, creatArticle, CreateArticleForm, fetchArticleDetails, updateArticle} from '@/api/api'
import {Image} from "@/api/responseType";
import router from "@/router";
import {createMessage} from "@/components/Message/createMessage";
import {useRoute} from "vue-router";

const editorOptions: Options = reactive<Options>({spellChecker: false})
const commonRules: Array<RuleItem> = [
  {type: 'required', message: '内容不能为空'}
]
const form = reactive({
  title: {
    value: '',
    rules: commonRules,
    placeholder: '请输入标题'
  },
  content: {
    value: '',
    rules: commonRules,
    placeholder: '请输入内容'
  },
})
const headerImage = reactive<Image>({url: '', _id: ""})
const route = useRoute()
const {type, id} = route.query;
const isUpdate = type === 'update' && id
if (isUpdate) {
  fetchArticleDetails(id as string).then(res => {
    console.log('文章详情：', res)
    const {title, content, image} = res?.data || {}
    if (image && image.url , image._id) Object.assign(headerImage, image)
    if (title) form.title.value = title
    if (content) form.content.value = content
  }).catch(() => {
    createMessage('文章详情获取失败', 'error')
  })
}
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

interface VM {
  validate: {
    (): Promise<void>
  }
}

const formRef = ref<VM | null>(null)

const doSubmit = async () => {
  const formCom = formRef.value as VM
  try {
    await formCom.validate()
  } catch (err) {
    console.error(err)
    createMessage('表单检验失败', 'error')
    return
  }
  createMessage('检验成功', 'success')
  try {
    const articleData = getFormData()
    let res;
    if (isUpdate) {
      res = await updateArticle(id as string, {
        title: articleData.title,
        content: articleData.content,
        image: articleData.image
      })
    } else {
      res = await creatArticle(articleData)
    }
    createMessage(`${isUpdate ? '更新' : '创建'}成功`, 'success')
    const {column} = res.data
    const timer = setTimeout(() => {
      clearTimeout(timer)
      router.push({name: 'column', params: {id: column}})
    }, 200)
  } catch (err) {
    console.log('失败', err)
    createMessage('提交失败')
  }
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
