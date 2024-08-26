<template>
  <el-container>
    <el-header>
      <GlobalHeader :user="user">
        <template #site-title>
          <slot name="site-title"></slot>
        </template>
      </GlobalHeader>
    </el-header>
    <el-main>
      <Container class="content">
        <slot v-bind:user="user"></slot>
      </Container>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">

import GlobalHeader from "@/components/GlobalHeader.vue";
import Container from "@/components/Container.vue";
import {User} from "@/api/testData";

const isLogin = !!localStorage.getItem('isLogin')
const email = localStorage.getItem('isLogin') || ''
const user: User = {
  isLogin: isLogin,
  name: isLogin ? 'Mirror' : '',
  email: email,
  gender: isLogin ? '男' : '',
}
</script>

<style scoped lang="scss">
.el-container {
  min-height: 100vh;
  //background-color: deeppink;
}
.el-main {
  padding: 0;
  //background-color: darkgoldenrod;
  $height:calc( 100vh - var(--el-header-height) );
  min-height: $height;
  .content{
     min-height: $height !important;
  }
}

::v-deep(.el-header) {
  border-bottom: 1px solid var(--el-color-primary);
}
</style>
