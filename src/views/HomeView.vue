<template>
  <div class="home" id="middle">
    <div id="leftcolumn"></div>
    <div id="middlecolumn">
      <button @click="logout">Logout</button>
      <Post @click="redirectToPost(post.id)" v-for="post in posts"  :post="post" :key="post.id"/>
      <div class="spacer">
        <p class="no-posts" v-if="posts.length < 1">
          You have no posts
        </p>
      </div>
    </div>
    <div id="rightcolumn"></div>
  </div>
  <div class="buttons">
    <button @click="addPost" id="reset-button">add post</button>
    <button @click="deleteAllPosts" id="reset-button">Delete All</button>
  </div>
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
    },
    logout() {
      fetch("http://localhost:3000/auth/logout", {
        credentials: 'include', //  Don't forget to specify this if you need cookies
      })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            //console.log('jwt removed');
            //console.log('jwt removed:' + auth.authenticated());
            this.$router.push("/login");
            //location.assign("/");
          })
          .catch((e) => {
            console.log(e);
            console.log("error logout");
          });
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
  button {
    border: none;
    background-color: white;
    font-size: 20px;
    text-decoration: underline;
    margin: 0px;
  }

  body {
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      margin: 0;
      height: 100%;
  }

  #middle {
      position: relative;
      top: 3em;
      display: flex;
      overflow-y: auto;
  }

  #leftcolumn, #rightcolumn {
      flex-grow: 1;
  }

  #middlecolumn {
      width: 100%;
      max-width: 600pt;
  }

  #middlecolumn > .spacer {
    height: 50px;
    margin-bottom: 10px;
  }
  #footer {
      display: flex;
      width: 100%;
      position: static;
      bottom:0;
      background-color: rgb(248, 248, 248);
  }


  .home {
    margin: 0 auto; /*aligns posts center*/
    max-width: 80rem; /*so items wont scale too big with widescreen displays*/
  }

  .no-posts {
    font-size: 2rem;
  }

  .buttons {
    position: fixed;
    bottom: 30px;
    padding-bottom: 10px;
    width: 100%;
    background: white;
  }
</style>
