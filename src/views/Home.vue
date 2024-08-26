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
import ColumnList from "@/components/ColumnList.vue";
import {Column} from '@/api/data.type'
import Layout from "@/components/Layout/Layout.vue";
const listData: Column[] = Array.from({length: 10}).map((v, i) => {
  const index = i + 1
  return {
    id: index,
    title: '专栏' + index,
    description: "专栏介绍,专栏介绍专栏介绍专栏介绍专栏介绍专栏介绍专栏介绍专栏介绍",
    avatar: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
  }
})


function handleCreateArticle() {
  console.log('创建文章')
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
