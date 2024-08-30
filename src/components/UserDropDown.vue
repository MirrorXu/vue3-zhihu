<script setup lang="ts">

import {PropType, defineProps} from "vue";
import {useRoute, useRouter} from "vue-router";
import {User} from '@/api/responseType'
import {useStore} from "vuex";
const store = useStore()
const router = useRouter();
defineProps({
  user: {
    type: Object as PropType<User>,
    required: true
  }
})

function handleCommand(command: string) {
  console.log(command)
  switch (command) {
    case 'c':
      doExit()
      break
  }
}
const currentRoute = useRoute()
function doExit() {
  console.log(router)
  localStorage.removeItem('token')
  store.commit('setToken' , '')
  if(currentRoute.name === 'home'){
    window.location.reload()
  }else{
    router.push({name: 'home'})
  }
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
        <el-dropdown-item icon="DocumentAdd" command="a">创建文章</el-dropdown-item>
        <el-dropdown-item icon="UserFilled" command="b">编辑资料</el-dropdown-item>
        <el-dropdown-item icon="Close" command="c">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>


<style scoped lang="scss">

</style>
