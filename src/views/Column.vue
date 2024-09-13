<script setup lang="ts">
import Layout from "@/components/Layout/Layout.vue";
import SiteTitle from "@/components/Layout/SiteTitle.vue";
import {useRoute, useRouter} from "vue-router";
import store from "@/store";
const route = useRoute()
const router = useRouter()
import {formatTime} from '@/helper'
import {computed, onBeforeMount} from "vue";
import {Article} from "@/api/responseType";
const id = route.params.id

onBeforeMount(()=>{
  store.dispatch('fetchColumnDetail' , id)
  store.dispatch('fetchColumnArticles' , id)
  console.log('sdsd')
})
const columnDetail = computed(()=> store.state.columnDetail)
const columnArticles = computed(()=> store.state.columnArticles)
function handleClick(article:Article) {
  router.push({name: 'articleDetails', params: {id: article._id}});
}

</script>

<template>
  <Layout>
    <template #site-title>
      <SiteTitle>
        <template #title>
          <h2 class="title">知乎 - 专栏</h2>
        </template>
      </SiteTitle>
    </template>
    <div>
      <h2>专栏：{{ columnDetail.title }}</h2>
      <p>{{columnDetail.description}}</p>
    </div>

    <div>
      <div class="article" v-for="article in columnArticles" :key="article._id" @click="handleClick(article)">
        <el-image fit="cover" :src="article.image?.url" round></el-image>
       <div style="margin-left: 20px">
         <h3>{{ article.title }}</h3>
         <p>作者：{{ article.author }}</p>
         <p>发布时间: {{formatTime(article.createdAt , 'YYYY-MM-DD HH:mm:ss')}}</p>
       </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped lang="scss">
.title {
  color: var(--jjext-color-font-2);
}
.article{
  display: flex;
  justify-content: stretch;
  box-sizing: border-box;
  box-shadow: 0px 0px 2px 2px var(--jjext-color-shadow);
  margin-bottom: 10px;
  padding: 10px;
  &:hover{
    background-color: var(--jjext-color-hover-bg);
  }
  .el-image{
    width: 30%;
  }
}
</style>
