<template>
  <div class="home">
    <Post v-for="id in ids" :postId="id" :key="id" />
  </div>
  <button @click="resetAll" id="reset-button">Reset likes</button>
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

<style scoped>

  #reset-button {
    margin-bottom: 50px; /*not the best solution, but otherwise reset button gets covered by footer*/
  }
 .home {
   margin: 0 auto; /*aligns posts center*/
   max-width: 80rem; /*so items wont scale too big with widescreen displays*/
 }
</style>
