<template>
  <layout>
    <div class="banner">
      <img src="../assets/a.svg" class="svgImg" alt="">
      <el-button type="primary" @click="handleCreateArticle">开始写文章</el-button>
    </div>
    <ColumnList :list="pageData.list"></ColumnList>
  </layout>
</template>

<script setup lang="ts">
import {onBeforeMount, reactive} from "vue";
import ColumnList from "@/components/ColumnList.vue";
import Layout from "@/components/Layout/Layout.vue";
import {useRouter} from "vue-router";
import {fetchColumns, ColumnListChunk} from "@/api/api";

const router = useRouter()

function handleCreateArticle() {
  console.log('创建文章')
  router.push({name: 'createArticle'})
}

const pageData = reactive<ColumnListChunk>({} as ColumnListChunk)
onBeforeMount(() => {
  fetchColumns({page: 1, size: 20}).then(res => {
    Object.assign(pageData, res.data)
  })
})

</script>


<style scoped lang="scss">

.banner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .svgImg {
    width: 200px;
  }

  .el-button {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}

</style>
