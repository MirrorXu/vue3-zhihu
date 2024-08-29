<template>
  <layout>
    <div class="banner">
      <img src="../assets/a.svg" class="svgImg" alt="">
      <el-button type="primary" @click="handleCreateArticle">开始写文章</el-button>
    </div>
    <ColumnList :list="columnList"></ColumnList>
  </layout>
</template>

<script setup lang="ts">
import {computed, onBeforeMount} from "vue";
import ColumnList from "@/components/ColumnList.vue";
import Layout from "@/components/Layout/Layout.vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
const store = useStore()
const columnList = computed(()=> store.state.columnData.list)
const router = useRouter()
function handleCreateArticle() {
  console.log('创建文章')
  router.push({name: 'createArticle'})
}
onBeforeMount(()=>{
  store.dispatch('fetchColumnData' , {page: 1, size: 20}).then(() => {
    console.log(store.state.columnData)
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
