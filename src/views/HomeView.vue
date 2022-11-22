<template>
  <div class="home">
    <Post v-for="id in ids" :postId="id" :triggerProp="trigger" :key="id"/>
  </div>
  <button @click="resetAll">Reset likes</button>
</template>

<script>
// @ is an alias to /src
import Post from '@/components/Post.vue'
import store from '@/store';

export default {
  name: 'HomeView',
  components: {
    Post
  },
  data: function() {
    return {
      trigger: 0,
      ids: store.getters.getPostIDs
    }
  },
  methods: {
    resetAll: function() {
      this.trigger++;
    }
  }
}
</script>

<style scoped>
 .home {
   margin: 0 auto; /*aligns posts center*/
   max-width: 80rem; /*so items wont scale too big with widescreen displays*/
 }
</style>
