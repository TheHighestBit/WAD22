<template>
  <div class="post">
    <div class="postheader">
      <img src="@/assets/profile.jpg">
      <span>
        {{ date }}
      </span>
    </div>
    <img v-if="image != null" :src="require(`@/assets/${image}`)">
    <p class="posttext" v-if="content != null">
      {{ content }}
    </p>
    <p>{{ likeCount }} likes</p>
    <a class="likebutton" @click="addLike">
      <img src="@/assets/likebutton.svg">
    </a> 
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'HelloWorld',
  props: {
    postId: Number
  },
  data: function() {
    let postInfo = store.getters.getPostByID(Number(this.postId));
    return {
      id: postInfo.id,
      content: postInfo.content,
      date: postInfo.date,
      image: postInfo.image
    }
  },
  computed: {
    likeCount() {
      return store.getters.getPostLikesByID(Number(this.postId));
    }
  },
  methods: {
    addLike: function() {
      store.commit('addLike', Number(this.postId));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.post {
    padding: 20px;
    margin: 20px;
    background-color: rgb(248, 248, 248);
    border-radius: 3px;
}

.postheader {
    display: flex;
    width: 100%;
    margin-bottom: 7px;
}

.postheader > img {
    width: 100%;
    max-width: 40px;
}

img + span {
    margin-left: auto;
}

.postheader ~ img {
    width: 100%;
}

.posttext {
    padding: 1em 2em;
}

.likebutton > img {
    width: 100%;
    max-width: 20px;
}

.likebutton:hover::after {
    content: "like";
}
</style>
