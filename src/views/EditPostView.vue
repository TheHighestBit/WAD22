<template>
  <div >
    <Post v-if="posts" :post="posts" :key="posts.id"/>
  </div>
  <form @submit.prevent="">
    <label>Enter some text:</label>
    <textarea rows="15" cols="50" v-model="text" type="text" ></textarea>
    <button @click="updatePost">Submit</button>
    <button @click="deletePost"> Delete</button>
  </form>
</template>

<script>
import Post from "@/components/Post";

export default {
  components: {
    Post
  },
  name: "EditPostView",
  data(){
    return {
      postId: this.$route.params.id,
      text: '',
      posts: null
    }
  },
  methods: {


    async updatePost() {
      let data = {
        content: this.text
      }
      console.log(this.postId)
      await fetch("http://localhost:3000/posts/edit/" + this.postId, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', //  Don't forget to specify this if you need cookies
        body: JSON.stringify(data)
      }).then((response) => response.json())
          .then(this.$router.push("/"))
          .catch(err => console.log(err.message))
    },
    async deletePost (){
      await fetch('http://localhost:3000/posts/delete/' + this.postId, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(response => console.log(response))
          .then(this.$router.push("/"))
          .catch(err => console.log(err));

    }
  },
   created: async function() {
     await fetch('http://localhost:3000/posts/get/'+ this.postId)
         .then((response) => response.json())
         .then(data => {
          this.posts = data[0]; 
          this.text = data[0].content;
         })
         .catch(err => console.log(err.message));
   }

}
</script>

<style scoped>
  button {
    border: none;
    background-color: white;
    font-size: 20px;
    text-decoration: underline;
    margin-left: 20px;
  }

  form {
    display: flex; 
    align-items: center; 
    justify-content: center;
  }
</style>
