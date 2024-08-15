<template>
  <el-container>
    <el-header>
      <GlobalHeader :user="user"></GlobalHeader>
    </el-header>
    <el-main>
      <div class="banner">
        <img src="../assets/a.svg" class="svgImg" alt="">
        <el-button type="primary" @click="handleCreateArticle">创建文章</el-button>
      </div>
      <ColumnList :list="listData"></ColumnList>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
import ColumnList from "@/components/ColumnList.vue";
import {Column, User} from '@/api/data.type'

const listData: Column[] = Array.from({length: 10}).map((v, i) => {
  const index = i + 1
  return {
    id: index,
    title: '专栏' + index,
    description: "专栏介绍,专栏介绍专栏介绍专栏介绍专栏介绍专栏介绍专栏介绍专栏介绍",
    avatar: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
  }
})

const isLogin = !!localStorage.getItem('isLogin')
const email = localStorage.getItem('isLogin') || ''
const user: User = {
  isLogin: isLogin,
  name: isLogin ? 'Mirror' : '',
  email: email,
  gender: isLogin ? '男' : '',
}

function handleCreateArticle(){
  console.log('创建文章')
}

</script>


<style scoped lang="scss">
::v-deep(.el-header) {
  border-bottom: 1px solid var(--el-color-primary);
}
.banner{
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;

}
.svgImg{

}
</style>
