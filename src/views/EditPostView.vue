<template>
  <form @submit.prevent="">
    <label>Enter some text:</label>
    <input v-model="text" type="text" />
    <button @click="updatePost">Submit</button>
    <button @click="deletePost"> Delete</button>
  </form>
</template>

<script>
export default {
  name: "EditPostView",
  data(){
    return {
      postId: this.$route.params.id,
      text: '',
      post: ''
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
  mounted() {
    fetch('http://localhost:3000/posts/get/'+ this.postId)
        .then((response) => response.json())
        .then(data => this.post = data)
        .then((data) => console.log(data))
        .catch(err => console.log(err.message));
  },
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
</style>
