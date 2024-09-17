<script setup lang="ts">
import Layout from "@/components/Layout/Layout.vue";
import SiteTitle from "@/components/Layout/SiteTitle.vue";
import {reactive} from "vue";
import {useRoute, useRouter} from "vue-router";
const route = useRoute()
const router = useRouter()
import {formatTime} from '@/helper'
import {Article, Column} from "@/api/responseType";
import {fetchColumnArticles, fetchColumnDetail} from '@/api/api'

// 专栏id
const id = route.params.id

interface RES_ARTICLE {
  list: Array<Article>,
  count: number,
  currentPage: number,
}

const columnDetail = reactive<Column>({} as Column)
const columnArticles = reactive<RES_ARTICLE>({
  list: [],
  count: 20,
  currentPage: 0,
})

fetchColumnDetail<Column>(id as string).then(response => {
  Object.assign(columnDetail, response.data)
})

fetchColumnArticles<RES_ARTICLE>(id as string).then(response => {
  Object.assign(columnArticles, response.data)
})


function handleClick(article: Article) {
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
      <p>{{ columnDetail.description }}</p>
    </div>

    <div>
      <div class="article" v-for="article in columnArticles.list" :key="article._id" @click="handleClick(article)">
        <el-image fit="cover" :src="article.image?.url" round></el-image>
        <div style="margin-left: 20px">
          <h3>{{ article.title }}</h3>
          <p>作者：{{ article.author }}</p>
          <p>发布时间: {{ formatTime(article.createdAt, 'YYYY-MM-DD HH:mm:ss') }}</p>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped lang="scss">
.title {
  color: var(--jjext-color-font-2);
}

.article {
  display: flex;
  justify-content: stretch;
  box-sizing: border-box;
  box-shadow: 0px 0px 2px 2px var(--jjext-color-shadow);
  margin-bottom: 10px;
  padding: 10px;

  &:hover {
    background-color: var(--jjext-color-hover-bg);
  }

  .el-image {
    width: 30%;
  }
}
</style>
