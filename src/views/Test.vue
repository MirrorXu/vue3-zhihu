<script setup lang="ts">
import UpLoad from '@/components/Upload/Upload.vue'
import {useTestStore} from '@/store/pinia'
const store = useTestStore()
console.log('### store:', store)

const {firstName} = store
const name = store.firstName
console.log('#### name:' , name)
console.log('### firstName:', firstName)

const changeNumArr = ()=>{
  store.numArr.push(2)
}
</script>

<template>
<div>
  <h1>test page</h1>
  <UpLoad></UpLoad>
  <div style="border: 1px solid red">
    <h1>pinia</h1>
    <el-card>
      store:<pre>{{store}}</pre>
     <pre> firstName:{{firstName}}</pre>
      <el-button size="small" plain type="primary" @click="changeNumArr">push num to numArr</el-button>
      <el-button size="small" plain type="primary" @click="firstName = 'zhang'">change firstName</el-button>
    </el-card>

  </div>
</div>
</template>

<style scoped lang="scss">

</style>
