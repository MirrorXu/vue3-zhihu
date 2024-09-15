<script setup lang="ts">

import {PropType, defineProps} from "vue";
import {User} from '@/api/responseType'
import {useStore} from "vuex";
import {createMessage} from '@/components/Message/createMessage'
import router from "@/router";
const store = useStore()
defineProps({
  user: {
    type: Object as PropType<User>,
    required: true
  }
})

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
      // console.log(store.state.user)
      router.push({name: 'column' , params: {id: store.state.user.column}})
      break
  }
}

function doExit() {
  store.dispatch('logout').then(() => {
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
    您好，{{ user.nickName }}
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="DocumentAdd" command="d" >我的专栏</el-dropdown-item>
        <el-dropdown-item icon="DocumentAdd" command="a">创建文章</el-dropdown-item>
        <el-dropdown-item icon="UserFilled" command="b">编辑资料</el-dropdown-item>
        <el-dropdown-item icon="Close" command="c">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>


<style scoped lang="scss">

</style>
