<script setup lang="ts">
import Layout from "@/components/Layout/Layout.vue";
import SiteTitle from "@/components/Layout/SiteTitle.vue";
import {useRoute , useRouter} from "vue-router";
const route = useRoute()
const router = useRouter()
const id = route.params.id;

</script>

<template>
  <Layout>
    <template #site-title>
      <SiteTitle>
        <template  #title >
          <h2 class="title">知乎 - 专栏</h2>
        </template>
      </SiteTitle>
    </template>
    <h2>专栏：{{id}}</h2>
  </Layout>
</template>

<style scoped lang="scss">
.title{
  color: var(--jjext-color-font-2);
}
</style>
