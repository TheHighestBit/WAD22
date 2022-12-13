<template>
  <div>
    <form @submit.prevent="addPost">
      <label>Enter some text:</label>
      <input v-model="text" type="text" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddPostView",
  data() {
    return {
      text: ''
    };
  },
  methods: {

    async addPost() {
      let data = {
        content: this.text,
        date: new Date()
      }
      await fetch("http://localhost:3000/posts/add", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', //  Don't forget to specify this if you need cookies
        body: JSON.stringify(data)
      }).then((response) => response.json())
          .then(this.$router.push("/"))
          .catch(err => console.log(err.message))
    },
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
</style>

