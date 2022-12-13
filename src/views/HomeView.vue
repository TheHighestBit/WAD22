<template>
  <div class="home" id="middle">
    <div id="leftcolumn"></div>
    <div id="middlecolumn">
      <Post @click="redirectToPost(post.id)" v-for="post in posts"  :post="post" :key="post.id"/>
    </div>
    <div id="rightcolumn"></div>
  </div>
  <button @click="addPost" id="reset-button">add post</button>
  <button @click="deleteAllPosts" id="reset-button">Delete All</button>
</template>

<script>
// @ is an alias to /src
import Post from '@/components/Post.vue';

export default {
  name: 'HomeView',
  components: {
    Post
  },
  data: function() {
    return {
      posts:[],
    }
  },
  methods: {

    addPost: function() {
      this.$router.push("/post/new");
    },
    async deleteAllPosts () {
      await fetch('http://localhost:3000/posts/delete/all', {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(response => console.log(response))
          .then(() => this.posts = [])
          .catch(err => console.log(err));
    },
    redirectToPost(postId){
      this.$router.push("/post/" + postId);
    }
  },
  mounted() {
    fetch('http://localhost:3000/posts/get/all')
        .then((response) => response.json())
        .then(data => this.posts = data)
        .then((data) => console.log(data))
        .catch(err => console.log(err.message));
  },
  props: {
    post: Post
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
