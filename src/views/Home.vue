<template>
  <layout>
    <div class="banner">
      <img src="../assets/a.svg" class="svgImg" alt="">
      <el-button type="primary" @click="handleCreateArticle">开始写文章</el-button>
    </div>
    <ColumnList :list="listData"></ColumnList>
  </layout>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import ColumnList from "@/components/ColumnList.vue";
import {columnList } from '@/api/testData'
import Layout from "@/components/Layout/Layout.vue";
import {useRouter} from "vue-router";
const listData = reactive(columnList)
console.log(listData)
const router  = useRouter()
function handleCreateArticle() {
  console.log('创建文章')
  router.push({name:'createArticle'})
}

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
