<template>
  <div class="limiter">
    <form @submit.prevent="addPost" class="post">
      <label style="margin-right: 2em;">Post content: </label>
      <textarea rows="15" cols="50" v-model="text" type="text" ></textarea>
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
  font-size: 20px;
  border: 1px solid gray;
  border-radius: 5px;
}

  textarea {
    margin-top: 3em;
    resize: none;
  }

  form {
    display: flex; 
    align-items: center; 
    justify-content: center;
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
  

</style>

