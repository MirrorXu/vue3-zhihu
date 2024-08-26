<script setup lang="ts">
import Layout from "@/components/Layout/Layout.vue";
import SiteTitle from "@/components/Layout/SiteTitle.vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()
import {columnList, articleList} from '@/api/testData'
import {reactive} from "vue";
import {formatTime} from '@/util'
const id = route.params.id

function loadColumnDataById(id: number | string) {
  const column = columnList.find(column => column.id === id)
  const articles = articleList.filter(article => article.columnId === id)
  return {
    column,
    articles
  }
}

const res = loadColumnDataById(Number(id))
const columnRef = reactive(res)

function handleClick(data: { id: number | string, [key: string]: any }) {
  console.log(data)
  const currentId = data.id
  router.push({name: 'column', params: {id: currentId}});
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
    <h2>专栏：{{ id }}</h2>
    <div>
      <div class="article" v-for="article in columnRef.articles" :key="article.id" @click="handleClick(article)">
        <el-image fit="cover" :src="article.avatar" round></el-image>
       <div>
         <h3>{{ article.title }}</h3>
         <p>{{ article.description }}</p>
         <p>发布时间:{{formatTime(article.time , 'YYYY-MM-DD HH:mm:ss')}}</p>
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
