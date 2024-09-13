<template>
  <layout>
    <template #site-title>
      <SiteTitle>
        <template #title>
          <h1> 知乎 - 文章详情</h1>
        </template>
      </SiteTitle>
    </template>
    <!--    <div class="image" :style="{backgroundImage:`url(${article.image?.url})`}"></div>-->
    <!--    <h1 class="title">{{article.title}}</h1>-->
    <!--    <div class="">{{article.content}}</div>-->
    <!--    <div class="content" v-html="article.content"></div>-->
    <!--    <div style="display: flex; align-items: center; justify-content: center;" v-show="isAuthor">-->
    <!--      <el-button-group>-->
    <!--        <el-button type="primary" @click="handleEdit">编辑</el-button>-->
    <!--        <el-button type="danger" @click="handleDel">删除</el-button>-->
    <!--      </el-button-group>-->
    <!--    </div>-->
    <div>
        <pre>
          {{ article }}
        </pre>
    </div>
    <div v-if="isAuthor">
      <el-button-group>
        <el-button type="primary" @click="handleEdit">编辑</el-button>
        <el-button type="success" @click.stop="handleDel">删除</el-button>
      </el-button-group>
    </div>
    <model :show="showModel" @cancel="showModel = false" @confirm="handleDeleteConfirm">
      确定删除该文章吗？
    </model>
  </layout>
</template>
<script setup lang="ts">
import {fetchArticleDetails, deleteArticle , RES_CreateArticle} from '@/api/api'
import {createMessage} from '@/components/Message/createMessage'
import {reactive, computed, ref} from 'vue'
import {useRoute} from "vue-router";
import Layout from "@/components/Layout/Layout.vue";
import model from '@/components/Model/Model.vue'
import SiteTitle from "@/components/Layout/SiteTitle.vue";
import store from "@/store";
import router from "@/router";

const article = reactive<RES_CreateArticle>({} as RES_CreateArticle)
const isAuthor = computed(() => {
  // console.log(article.author._id  , store.state.user._id)
  return article?.author?._id === store?.state?.user?._id
})
const route = useRoute();
const {id} = route.params;
if (!id) {
  alert('缺少必要参数，文章ID')
} else {
  fetchArticleDetails(id as string).then(res => {
    console.log(res)
    Object.assign(article, res.data)
  }).catch(err=>{
     createMessage('文章详情获取失败','error'  )
  })
}

const showModel = ref(false)
const handleEdit = () => {
  console.log('handleEdit')
};
const handleDel = () => {
  console.log('handleDel')
  showModel.value = true
}
const handleDeleteConfirm = ()=> {

  deleteArticle(article._id).then(res=>{
    console.log(res)
    createMessage('文章删除成功' )
    const timer = setTimeout(()=>{
      clearTimeout(timer)
      router.back()
    })
  }).catch(err=>{
    createMessage('文章删除失败'  , 'warning')
    console.log(err)
  }).finally(()=>{
    showModel.value =false
  })
}
</script>


<style scoped lang="scss">
.image {
  display: flex;
  height: 100px;
  width: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.test {
  display: flex;
  width: 300px;
  height: 300px;
  background-color: deeppink;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
