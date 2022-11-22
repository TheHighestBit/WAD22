<template>
  <div class="home">
    <Post v-for="id in ids" :postId="id" :key="id" />
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
      ids: store.getters.getPostIDs
    }
  },
  methods: {
    resetAll: function() {
      store.commit('resetAllLikes');
    }
  }
}
</script>
