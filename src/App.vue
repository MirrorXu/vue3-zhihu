<template>
  <div id="app" v-loading="loading">
    <Message message="xxxxxxx" type="error" @close="handleClose"></Message>
    <router-view/>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, watch} from "vue";
import {useStore} from "vuex";
import  Message  from "@/components/Message/Message.vue";

export default defineComponent({
  name:'App',
  components:{
    Message:Message
  },
  setup(props, context) {
    console.log(props, context)
    const store = useStore()
    const loading = computed(() => store.state.loading)
    watch(loading, (newVal, oldVal) => {
      console.log('loading:', newVal, oldVal)
    })
    if(store.state.token){
      store.dispatch('getCurrentUser').then(res=>{
        console.log(res)
      })
    }
    return {
      loading
    }
  },
  methods:{
    handleClose(){
      console.log('message com close')
    }
  }
})
</script>

<style lang="scss">
html, body {
  padding: 0;
  margin: 0;
}

#app {
  min-height: 100vh;
  //background-color: darkgoldenrod;
}
</style>
