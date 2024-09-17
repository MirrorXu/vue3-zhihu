<script setup lang="ts">

import {createMessage} from '@/components/Message/createMessage'
import router from "@/router";
import {useUserStore} from "@/store/pinia";

const userStore = useUserStore();


function handleCommand(command: string) {
  console.log(command)
  switch (command) {
    case 'a':
      router.push({name: 'createArticle'})
      break
    case 'c':
      doExit()
      break
    case 'd':
      router.push({name: 'column', params: {id: userStore.user.column}})
      break
  }
}

function doExit() {
  userStore.logout().then(() => {
    createMessage('退出登录成功')
    setTimeout(() => {
      router.replace('/')
    })
  })
}
</script>

<template>
  <div>

  </div>
  <el-dropdown
      size="large"
      placement="bottom-end"
      trigger="click"
      split-button
      type="primary"
      :hide-on-click="false"
      @command="handleCommand"
  >
    您好，{{ userStore.user.nickName }}
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="DocumentAdd" command="d">我的专栏</el-dropdown-item>
        <el-dropdown-item icon="DocumentAdd" command="a">创建文章</el-dropdown-item>
        <el-dropdown-item icon="UserFilled" command="b">编辑资料</el-dropdown-item>
        <el-dropdown-item icon="Close" command="c">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>


<style scoped lang="scss">

</style>
