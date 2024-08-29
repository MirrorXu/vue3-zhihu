<script setup lang="ts">
import { useRouter} from "vue-router";
import UserDropdown from '@/components/UserDropDown.vue'
import {PropType, defineProps} from "vue";
import {User} from '@/api/responseType'
import SiteTitle from "@/components/Layout/SiteTitle.vue";
import {LoginType} from '@/views/Login.vue'
defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  }
})

const router =  useRouter()

const goLogin = ( type:LoginType)=>{
  router.push({name:'login' , query:{type}})
}

</script>

<template>
  <div class="header">
    <slot name="site-title">
      <SiteTitle></SiteTitle>
    </slot>
    <div class="right">
      <template v-if="!user._id">
        <el-button plain type="primary" @click="goLogin('login')">登录</el-button>
        <el-button type="primary" @click="goLogin('register')">注册</el-button>
      </template>
      <template v-else>
        <UserDropdown :user="user"></UserDropdown>
      </template>

    </div>
  </div>
</template>

<style scoped lang="scss">

.header {
  width: 100%;
  height: var(--el-header-height);
  //background-color: darkcyan;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
