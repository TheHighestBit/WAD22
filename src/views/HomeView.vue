<template>
  <div class="home" id="middle">
    <div id="leftcolumn"></div>
    <div id="middlecolumn">
      <Post v-for="id in ids" :postId="id" :triggerProp="trigger" :key="id"/>
    </div>
    <div id="rightcolumn"></div>
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

  body {
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      margin: 0;
      height: 100%;
  }

  #middle {
      position: relative;
      top: 3em;
      display: flex;
      overflow: scroll;
  }

  #leftcolumn, #rightcolumn {
      flex-grow: 1;
  }

  #middlecolumn {
      width: 100%;
      max-width: 600pt;
  }

  #footer {
      display: flex;
      width: 100%;
      position: static;
      bottom:0;
      background-color: rgb(248, 248, 248);
  }


  #reset-button {
    margin-top: 50px;
    margin-bottom: 50px; /*not the best solution, but otherwise reset button gets covered by footer*/
  }

  .home {
    margin: 0 auto; /*aligns posts center*/
    max-width: 80rem; /*so items wont scale too big with widescreen displays*/
  }
</style>
