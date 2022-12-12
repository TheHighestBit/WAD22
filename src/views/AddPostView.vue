<template>
  <div>
    <form @submit.prevent="updatePost">
      <label>Enter some text:</label>
      <input v-model="text" type="text" />
      <button type="submit">Submit</button>
      <button @click="deletePost">Delete</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "PostEditView",
  data() {
    return {
      text: ''
    };
  },
  methods: {
    updatePost: function () {
      let data = {
        content: this.text,
        date: new Date()
      }
      fetch("http://localhost:3000/posts/add", {
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

</style>

