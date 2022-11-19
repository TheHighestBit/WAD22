<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
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
