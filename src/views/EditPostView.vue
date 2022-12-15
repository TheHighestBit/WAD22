<template>
<!--  <div >
    <Post v-if="posts" :post="posts" :key="posts.id"/>
  </div>-->

  <div class="limiter">
    <form @submit.prevent="" class="post">
      <label>Edit the post: </label>
      <textarea rows="15" cols="50" v-model="text" type="text" ></textarea>
      <div class="buttons">

        <button @click="deletePost" class="delete-button"> Delete</button>
        <button @click="updatePost" class="submit-button">Submit</button>
      </div>
    </form>

  </div>
</template>

<script>
//import Post from "@/components/Post";

export default {
  components: {
    //Post
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
    font-size: 20px;
    border: 1px solid gray;
    border-radius: 5px;
  }

  form {
    display: flex; 
    align-items: center; 
    justify-content: center;
  }

  textarea {
    resize: none;
  }

  .limiter {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }

  .post {
    margin-top: 10px;
    padding: 20px;
    border-radius: 15px;
    background: rgb(196, 196, 196);;
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 40vw;
    gap: 5px;
  }

  .buttons {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  .submit-button {
    background: rgba(24,173,53,0.2);
  }

  .delete-button {
    background: rgba(179,70,67,0.2);
  }
</style>
